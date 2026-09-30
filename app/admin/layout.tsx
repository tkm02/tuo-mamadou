"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client"
import { RESOURCES } from "@/lib/admin/resources"
import { CONTENT_SECTIONS } from "@/lib/admin/content-sections"
import { AdminDataProvider, useAdminData } from "@/components/admin/admin-context"
import { ToastProvider } from "@/components/admin/ui"
import { cn } from "@/lib/utils"

/** Le backoffice garde son monde de nuit : ses jetons ne vivent que sous .theme-night. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement
    const previous = html.style.colorScheme
    html.style.colorScheme = "dark"
    return () => {
      html.style.colorScheme = previous
    }
  }, [])
  return (
    <div className="theme-night font-sans">
      <AdminRoot>{children}</AdminRoot>
    </div>
  )
}

function AdminRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState<string | null>(null)

  const isLogin = pathname === "/admin/login"

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setChecking(false)
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      const session = data.session
      setEmail(session?.user?.email ?? null)
      setChecking(false)
      if (!session && !isLogin) router.replace("/admin/login")
      if (session && isLogin) router.replace("/admin")
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [pathname, isLogin, router])

  if (!isSupabaseConfigured()) return <NotConfigured />
  if (isLogin) return <ToastProvider>{children}</ToastProvider>

  if (checking || !email) {
    return (
      <div className="grid min-h-screen place-items-center bg-night">
        <p className="flex items-center gap-3 text-[0.9375rem] text-muted" role="status">
          <span aria-hidden="true" className="beacon size-2 rounded-full bg-amber" />
          Vérification de la session…
        </p>
      </div>
    )
  }

  return (
    <ToastProvider>
      <AdminDataProvider email={email}>
        <Shell>{children}</Shell>
      </AdminDataProvider>
    </ToastProvider>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  return (
    <div className="min-h-screen bg-night text-text lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <a
        href="#admin-main"
        className="sr-only z-[80] bg-amber px-4 py-2 font-bold text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>

      {/* Barre latérale */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-hairline bg-asphalt lg:flex">
        <Suspense fallback={null}>
          <SideNav />
        </Suspense>
      </aside>

      {/* Barre mobile */}
      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-hairline bg-asphalt/95 px-4 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex items-baseline gap-2">
          <span className="neon font-display text-[1.75rem] font-extrabold leading-none">TUO</span>
          <span className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted">Backoffice</span>
        </Link>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="admin-menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="h-9 border border-hairline px-3 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink"
        >
          {menuOpen ? "Fermer" : "Menu"}
        </button>
      </div>
      {menuOpen ? (
        <div id="admin-menu" className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-y-auto bg-asphalt lg:hidden">
          <Suspense fallback={null}>
            <SideNav mobile />
          </Suspense>
        </div>
      ) : null}

      <main id="admin-main" className="min-w-0 px-4 pb-24 pt-6 sm:px-8 sm:pt-10">
        {children}
      </main>
    </div>
  )
}

function SideNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const { counts, unread, email } = useAdminData()
  const section = params.get("s") ?? "hero"

  const signOut = async () => {
    await getSupabase()?.auth.signOut()
    router.replace("/admin/login")
  }

  return (
    <nav aria-label="Backoffice" className="flex min-h-0 flex-1 flex-col">
      {!mobile ? (
        <Link href="/admin" className="flex items-baseline gap-2.5 px-5 pb-5 pt-6">
          <span className="neon font-display text-[1.75rem] font-extrabold leading-none">TUO</span>
          <span className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted">Backoffice</span>
        </Link>
      ) : null}

      <div className="flex-1 overflow-y-auto px-3 pb-4 pt-2">
        <NavItem href="/admin" active={pathname === "/admin"}>
          Poste de contrôle
        </NavItem>

        <NavGroup title="Le site">
          {CONTENT_SECTIONS.map((s) => (
            <NavItem key={s.key} href={`/admin/contenu?s=${s.key}`} active={pathname === "/admin/contenu" && section === s.key}>
              {s.label}
            </NavItem>
          ))}
        </NavGroup>

        <NavGroup title="Collections">
          {RESOURCES.map((r) => (
            <NavItem key={r.slug} href={`/admin/${r.slug}`} active={pathname === `/admin/${r.slug}`} count={counts[r.table]}>
              {r.label}
            </NavItem>
          ))}
        </NavGroup>

        <NavGroup title="Boîte">
          <NavItem href="/admin/messages" active={pathname === "/admin/messages"} badge={unread ?? 0}>
            Messages
          </NavItem>
        </NavGroup>
      </div>

      <div className="border-t border-hairline px-3 py-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center justify-between px-3 text-[0.9375rem] text-text hover:bg-asphalt-raised hover:text-ink"
        >
          Voir le site <span aria-hidden="true">↗</span>
        </a>
        <p className="truncate px-3 pt-2 font-mono text-[0.75rem] text-muted" title={email}>
          {email}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="mt-1 flex h-9 w-full items-center px-3 text-[0.9375rem] text-muted hover:bg-asphalt-raised hover:text-neon"
        >
          Se déconnecter
        </button>
      </div>
    </nav>
  )
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="px-3 pb-2 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted">{title}</p>
      <ul>{children}</ul>
    </div>
  )
}

function NavItem({
  href,
  active,
  count,
  badge,
  children,
}: {
  href: string
  active: boolean
  count?: number | null
  badge?: number
  children: React.ReactNode
}) {
  return (
    <li className="list-none">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex h-9 items-center justify-between gap-3 px-3 text-[0.9375rem] transition-colors duration-150",
          active ? "bg-night font-bold text-amber" : "text-text hover:bg-asphalt-raised hover:text-ink",
        )}
      >
        <span className="truncate">{children}</span>
        {badge ? (
          <span className="min-w-6 rounded-full bg-amber px-1.5 text-center font-mono text-[0.75rem] font-bold leading-5 text-night">
            {badge}
            <span className="sr-only"> non lus</span>
          </span>
        ) : count !== undefined && count !== null ? (
          <span className="font-mono text-[0.75rem] text-muted">{count}</span>
        ) : null}
      </Link>
    </li>
  )
}

function NotConfigured() {
  return (
    <div className="grid min-h-screen place-items-center bg-night p-6">
      <div className="max-w-lg">
        <p className="neon font-display text-[1.75rem] font-extrabold">TUO</p>
        <h1 className="mt-4 font-display text-[2.5rem] font-extrabold uppercase leading-[0.95] text-ink">Supabase non configuré</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-text">
          Crée un fichier <code className="font-mono text-amber">.env.local</code> à la racine du projet avec{" "}
          <code className="font-mono text-amber">NEXT_PUBLIC_SUPABASE_URL</code> et{" "}
          <code className="font-mono text-amber">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>, puis redémarre le serveur.
          Le guide complet est dans <code className="font-mono text-amber">README-BACKOFFICE.md</code>.
        </p>
      </div>
    </div>
  )
}
