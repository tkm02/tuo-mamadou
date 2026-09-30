"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { RESOURCES } from "@/lib/admin/resources"
import { CONTENT_SECTIONS } from "@/lib/admin/content-sections"
import { LEVEL_LABEL, LEVEL_ORDER, localAssets, rowIssues, type Level } from "@/lib/admin/health"
import { getSupabase } from "@/lib/supabase/client"
import { clean, cn } from "@/lib/utils"
import { useAdminData } from "@/components/admin/admin-context"
import { Button, Callout, PageHeader, SkeletonRows, useToast } from "@/components/admin/ui"
import {
  aboutFallback,
  awardsFallback,
  certificationsFallback,
  contactFallback,
  educationFallback,
  experiencesFallback,
  galleryFallback,
  heroFallback,
  projectsFallback,
  skillCategoriesFallback,
  socialsFallback,
  toolsFallback,
} from "@/lib/fallback-data"

const IMPORT_SETS: Record<string, Record<string, any>[]> = {
  experiences: experiencesFallback,
  education: educationFallback,
  projects: projectsFallback,
  awards: awardsFallback,
  certifications: certificationsFallback,
  gallery_items: galleryFallback,
  skill_categories: skillCategoriesFallback,
  tools: toolsFallback,
}
const CONTENT_FALLBACKS: Record<string, Record<string, any>> = {
  hero: heroFallback,
  about: aboutFallback,
  contact: contactFallback,
  socials: socialsFallback,
}

type Alert = { level: Level; text: string; where: string; href: string }
type Message = { id: string; name: string; email: string; subject: string; read: boolean; createdAt: string }

const SHORTCUTS = [
  { label: "Ajouter une mission", href: "/admin/experiences?edit=new" },
  { label: "Ajouter un projet", href: "/admin/projets?edit=new" },
  { label: "Changer l'accroche de l'accueil", href: "/admin/contenu?s=hero" },
  { label: "Remplacer le CV ou le portrait", href: "/admin/contenu?s=about" },
  { label: "Ajouter des photos de terrain", href: "/admin/galerie?edit=new" },
]

export default function ControlRoom() {
  const supabase = getSupabase()
  const toast = useToast()
  const { refresh } = useAdminData()

  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [emptyTables, setEmptyTables] = useState<string[]>([])
  const [missingContent, setMissingContent] = useState<string[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [checkingAssets, setCheckingAssets] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importLog, setImportLog] = useState<{ ok: boolean; text: string }[]>([])
  const [expanded, setExpanded] = useState<Level | null>(null)
  const [now, setNow] = useState<string>("")

  useEffect(() => {
    setNow(
      new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Abidjan" }).format(
        new Date(),
      ),
    )
  }, [])

  const scan = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const found: Alert[] = []
    const empties: string[] = []
    const assets = new Map<string, { where: string; href: string }>()

    await Promise.all(
      RESOURCES.map(async (r) => {
        const { data } = await supabase.from(r.table).select("*").order("sortOrder", { ascending: true })
        const rows = data ?? []
        if (!rows.length) empties.push(r.table)
        for (const row of rows) {
          const title = clean(String(row[r.titleField] ?? "")) || "(sans titre)"
          const href = `/admin/${r.slug}?edit=${row.id}`
          for (const issue of rowIssues(r.table, row)) found.push({ level: issue.level, text: issue.text, where: `${r.label} / ${title}`, href })
          for (const path of localAssets(row)) if (!assets.has(path)) assets.set(path, { where: `${r.label} / ${title}`, href })
        }
      }),
    )

    const { data: content } = await supabase.from("site_content").select("key, value")
    const missing = CONTENT_SECTIONS.filter((s) => !content?.some((c) => c.key === s.key)).map((s) => s.key)
    const about = content?.find((c) => c.key === "about")?.value as Record<string, any> | undefined
    const hero = content?.find((c) => c.key === "hero")?.value as Record<string, any> | undefined
    if (about && !about.cvUrl) found.push({ level: "fix", text: "Aucun CV : le bouton « Télécharger le CV » ne mène nulle part.", where: "À propos", href: "/admin/contenu?s=about" })
    if (hero && !hero.title) found.push({ level: "fix", text: "Pas de titre sous le nom.", where: "Accueil", href: "/admin/contenu?s=hero" })
    for (const c of content ?? []) {
      for (const path of localAssets(c.value ?? {})) {
        const section = CONTENT_SECTIONS.find((s) => s.key === c.key)
        if (!assets.has(path)) assets.set(path, { where: section?.label ?? c.key, href: `/admin/contenu?s=${c.key}` })
      }
    }

    const { data: msgs } = await supabase
      .from("contact_messages")
      .select("id, name, email, subject, read, createdAt")
      .order("createdAt", { ascending: false })
      .limit(4)
    const { count: unreadCount } = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("read", false)
    if (unreadCount) found.push({ level: "check", text: `${unreadCount} message${unreadCount > 1 ? "s" : ""} non lu${unreadCount > 1 ? "s" : ""}.`, where: "Messages", href: "/admin/messages" })

    setMessages((msgs as Message[]) ?? [])
    setEmptyTables(empties)
    setMissingContent(missing)
    setAlerts(found)
    setLoading(false)

    // Vérifie ensuite que les fichiers locaux référencés existent vraiment.
    setCheckingAssets(true)
    const broken: Alert[] = []
    await Promise.all(
      [...assets.entries()].slice(0, 120).map(async ([path, ctx]) => {
        try {
          const res = await fetch(encodeURI(path), { method: "HEAD", cache: "no-store" })
          if (!res.ok) broken.push({ level: "fix", text: `Fichier introuvable : ${path}`, where: ctx.where, href: ctx.href })
        } catch {
          /* réseau indisponible : on ne signale rien */
        }
      }),
    )
    // Dédoublonne : le scan peut tourner deux fois en développement.
    if (broken.length)
      setAlerts((prev) => {
        const seen = new Set(prev.map((a) => a.href + a.text))
        return [...broken.filter((b) => !seen.has(b.href + b.text)), ...prev]
      })
    setCheckingAssets(false)
  }, [supabase])

  useEffect(() => {
    scan()
  }, [scan])

  const runImport = async () => {
    if (!supabase) return
    setImporting(true)
    const log: { ok: boolean; text: string }[] = []
    for (const r of RESOURCES) {
      if (!emptyTables.includes(r.table)) continue
      const rows = (IMPORT_SETS[r.table] ?? []).map((row, i) => ({ ...row, sortOrder: i }))
      const { error } = await supabase.from(r.table).insert(rows)
      log.push({ ok: !error, text: error ? `${r.label} : ${error.message}` : `${r.label} : ${rows.length} éléments importés` })
      setImportLog([...log])
    }
    for (const key of missingContent) {
      const { error } = await supabase.from("site_content").insert({ key, value: CONTENT_FALLBACKS[key] })
      const label = CONTENT_SECTIONS.find((s) => s.key === key)?.label ?? key
      log.push({ ok: !error, text: error ? `${label} : ${error.message}` : `${label} : importé` })
      setImportLog([...log])
    }
    setImporting(false)
    toast(log.every((l) => l.ok) ? "Import terminé" : "Import terminé avec des erreurs", log.every((l) => l.ok) ? "success" : "error")
    refresh()
    scan()
  }

  const byLevel = useMemo(() => {
    const map: Record<Level, Alert[]> = { fix: [], check: [], improve: [] }
    for (const a of alerts) map[a.level].push(a)
    return map
  }, [alerts])

  const needsImport = emptyTables.length > 0 || missingContent.length > 0
  const allEmpty = emptyTables.length === RESOURCES.length && missingContent.length === CONTENT_SECTIONS.length

  if (!supabase) return <Callout tone="error">Supabase n&apos;est pas configuré.</Callout>

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title="Poste de contrôle"
        meta={now ? `Abidjan · ${now}` : undefined}
        actions={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center px-3 text-[0.9375rem] font-bold text-cobalt hover:text-ink"
          >
            Voir le site ↗
          </a>
        }
      />

      {!loading && allEmpty ? (
        <ImportPanel primary emptyCount={emptyTables.length + missingContent.length} importing={importing} log={importLog} onImport={runImport} />
      ) : null}

      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_20rem]">
        {/* À traiter */}
        <section aria-labelledby="todo-title">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="todo-title" className="text-[1.25rem] font-bold text-ink">
              À traiter
            </h2>
            {!loading ? (
              <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-muted" aria-live="polite">
                {LEVEL_ORDER.map((l) => (
                  <span key={l} className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true" className={cn("size-2 rounded-full", dotColor(l))} />
                    {byLevel[l].length} {LEVEL_LABEL[l].toLowerCase()}
                  </span>
                ))}
                {checkingAssets ? <span>· vérification des fichiers…</span> : null}
              </p>
            ) : null}
          </div>

          {loading ? (
            <SkeletonRows rows={6} />
          ) : alerts.length === 0 ? (
            <div className="border border-hairline px-6 py-10">
              <p className="flex items-center gap-2 text-[1.0625rem] font-bold text-ink">
                <span aria-hidden="true" className="size-2 rounded-full bg-line-teal" />
                Rien à signaler.
              </p>
              <p className="mt-2 text-[0.9375rem] text-muted">Toutes les sections ont leur contenu et tous les fichiers répondent.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {LEVEL_ORDER.filter((l) => byLevel[l].length).map((level) => {
                const items = byLevel[level]
                const shown = expanded === level ? items : items.slice(0, 6)
                return (
                  <div key={level}>
                    <h3 className="mb-2 flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-dawn">
                      <span aria-hidden="true" className={cn("size-2 rounded-full", dotColor(level))} />
                      {LEVEL_LABEL[level]}
                      <span className="font-mono font-medium tracking-normal text-muted">{items.length}</span>
                    </h3>
                    <ul className="border-t border-hairline">
                      {shown.map((a, i) => (
                        <li key={`${a.href}-${a.text}-${i}`} className="border-b border-hairline">
                          <Link href={a.href} className="group flex items-center gap-4 py-3 pr-1 transition-colors hover:bg-asphalt">
                            <span className="min-w-0 flex-1 pl-1">
                              <span className="block text-[0.9375rem] text-ink">{a.text}</span>
                              <span className="mt-0.5 block truncate text-[0.8125rem] text-muted">{a.where}</span>
                            </span>
                            <span className="shrink-0 text-[0.8125rem] font-bold text-cobalt group-hover:text-ink">Ouvrir →</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {items.length > 6 ? (
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === level ? null : level)}
                        className="mt-2 text-[0.8125rem] font-bold text-cobalt hover:text-ink"
                      >
                        {expanded === level ? "Réduire" : `Voir les ${items.length}`}
                      </button>
                    ) : null}
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Colonne latérale : raccourcis et messages */}
        <aside className="space-y-12">
          <section aria-labelledby="shortcuts-title">
            <h2 id="shortcuts-title" className="mb-3 text-[1.25rem] font-bold text-ink">
              Raccourcis
            </h2>
            <ul className="border-t border-hairline">
              {SHORTCUTS.map((s) => (
                <li key={s.href} className="border-b border-hairline">
                  <Link href={s.href} className="flex h-11 items-center justify-between px-1 text-[0.9375rem] text-text transition-colors hover:bg-asphalt hover:text-ink">
                    {s.label}
                    <span aria-hidden="true" className="text-amber">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="inbox-title">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 id="inbox-title" className="text-[1.25rem] font-bold text-ink">
                Derniers messages
              </h2>
              <Link href="/admin/messages" className="text-[0.8125rem] font-bold text-cobalt hover:text-ink">
                Tout voir
              </Link>
            </div>
            {loading ? (
              <SkeletonRows rows={3} />
            ) : messages.length === 0 ? (
              <p className="border-t border-hairline pt-4 text-[0.9375rem] text-muted">Aucun message pour l&apos;instant.</p>
            ) : (
              <ul className="border-t border-hairline">
                {messages.map((m) => (
                  <li key={m.id} className="border-b border-hairline">
                    <Link href={`/admin/messages?id=${m.id}`} className="block px-1 py-3 transition-colors hover:bg-asphalt">
                      <span className="flex items-center gap-2">
                        {!m.read ? <span aria-label="non lu" className="size-2 shrink-0 rounded-full bg-amber" /> : null}
                        <span className={cn("truncate text-[0.9375rem]", m.read ? "text-text" : "font-bold text-ink")}>{m.name || m.email}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[0.8125rem] text-muted">{m.subject || "(sans objet)"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

      {!loading && needsImport && !allEmpty ? (
        <div className="mt-16">
          <ImportPanel emptyCount={emptyTables.length + missingContent.length} importing={importing} log={importLog} onImport={runImport}>
            Sections encore vides :{" "}
            {[
              ...RESOURCES.filter((r) => emptyTables.includes(r.table)).map((r) => r.label),
              ...CONTENT_SECTIONS.filter((s) => missingContent.includes(s.key)).map((s) => s.label),
            ].join(", ")}
            .
          </ImportPanel>
        </div>
      ) : null}
    </div>
  )
}

function dotColor(level: Level) {
  return level === "fix" ? "bg-neon" : level === "check" ? "bg-amber" : "bg-cobalt"
}

function ImportPanel({
  primary = false,
  emptyCount,
  importing,
  log,
  onImport,
  children,
}: {
  primary?: boolean
  emptyCount: number
  importing: boolean
  log: { ok: boolean; text: string }[]
  onImport: () => void
  children?: React.ReactNode
}) {
  return (
    <section aria-labelledby="import-title" className={cn("border px-5 py-6 sm:px-6", primary ? "mb-12 border-amber/50 bg-amber/5" : "border-hairline")}>
      <h2 id="import-title" className="text-[1.25rem] font-bold text-ink">
        {primary ? "Première mise en service" : "Importer le contenu d'origine"}
      </h2>
      <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-text">
        {primary
          ? "La base est vide : le site affiche pour l'instant le contenu intégré au code. Importe-le pour pouvoir tout modifier ici."
          : "Copie le contenu intégré au code dans les sections encore vides. Les sections déjà remplies ne sont pas touchées."}{" "}
        {children}
      </p>
      <Button variant={primary ? "primary" : "secondary"} className="mt-5" loading={importing} onClick={onImport}>
        Importer {emptyCount} section{emptyCount > 1 ? "s" : ""}
      </Button>
      {log.length ? (
        <ul className="mt-5 space-y-1 font-mono text-[0.8125rem]" aria-live="polite">
          {log.map((l, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden="true" className={l.ok ? "text-line-teal" : "text-neon"}>
                {l.ok ? "✓" : "✕"}
              </span>
              <span className={l.ok ? "text-text" : "text-neon"}>{l.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
