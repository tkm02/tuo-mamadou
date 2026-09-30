"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getSupabase } from "@/lib/supabase/client"
import { useAdminData } from "@/components/admin/admin-context"
import { Button, Callout, ConfirmButton, EmptyState, PageHeader, SkeletonRows, useToast } from "@/components/admin/ui"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" })
const fullFmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full", timeStyle: "short", timeZone: "Africa/Abidjan" })

function shortDate(iso: string) {
  const d = new Date(iso)
  const today = new Date()
  if (d.toDateString() === today.toDateString())
    return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Abidjan" })
  return dateFmt.format(d)
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<SkeletonRows />}>
      <Inbox />
    </Suspense>
  )
}

function Inbox() {
  const supabase = getSupabase()
  const toast = useToast()
  const { refresh } = useAdminData()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const openId = params.get("id")

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const load = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const { data, error } = await supabase.from("contact_messages").select("*").order("createdAt", { ascending: false })
    if (error) setError(`Impossible de charger les messages : ${error.message}`)
    else setMessages((data as Message[]) ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    load()
  }, [load])

  const setRead = useCallback(
    async (msg: Message, read: boolean) => {
      if (!supabase) return
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read } : m)))
      const { error } = await supabase.from("contact_messages").update({ read }).eq("id", msg.id)
      if (error) {
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, read: !read } : m)))
        toast("Le statut n'a pas pu être mis à jour.", "error")
      }
      refresh()
    },
    [refresh, supabase, toast],
  )

  const open = messages.find((m) => m.id === openId) ?? null

  // Ouvrir un message le marque comme lu.
  useEffect(() => {
    if (open && !open.read) setRead(open, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open?.id])

  const select = (id: string | null) => router.replace(id ? `${pathname}?id=${id}` : pathname, { scroll: false })

  const remove = async (msg: Message) => {
    if (!supabase) return
    const { error } = await supabase.from("contact_messages").delete().eq("id", msg.id)
    if (error) {
      toast(`Suppression impossible : ${error.message}`, "error")
      return
    }
    setMessages((prev) => prev.filter((m) => m.id !== msg.id))
    select(null)
    toast("Message supprimé")
    refresh()
  }

  const unread = messages.filter((m) => !m.read).length
  const list = useMemo(() => (filter === "unread" ? messages.filter((m) => !m.read) : messages), [filter, messages])

  if (!supabase) return <Callout tone="error">Supabase n&apos;est pas configuré.</Callout>

  return (
    <div>
      <PageHeader
        title="Messages"
        meta={loading ? "Chargement…" : `${messages.length} message${messages.length > 1 ? "s" : ""} · ${unread} non lu${unread > 1 ? "s" : ""}`}
        actions={
          <div role="radiogroup" aria-label="Filtrer" className="inline-flex border border-hairline">
            {(["all", "unread"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "h-9 px-3.5 text-[0.8125rem] font-bold transition-colors",
                  filter === f ? "bg-amber text-night" : "text-text hover:bg-asphalt-raised hover:text-ink",
                )}
              >
                {f === "all" ? "Tous" : `Non lus (${unread})`}
              </button>
            ))}
          </div>
        }
      />

      {error ? (
        <Callout tone="error">{error}</Callout>
      ) : loading ? (
        <SkeletonRows />
      ) : messages.length === 0 ? (
        <EmptyState title="Aucun message pour l'instant">
          Les messages envoyés depuis le formulaire de contact du site arrivent ici. Tu reçois aussi une copie par email.
        </EmptyState>
      ) : (
        <div className={cn("grid gap-8", open && "xl:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]")}>
          <ol aria-label="Liste des messages" className={cn("border-t border-hairline", open && "hidden xl:block")}>
            {list.length === 0 ? (
              <li className="py-10 text-center text-[0.9375rem] text-muted">Tout est lu.</li>
            ) : (
              list.map((m) => {
                const selected = m.id === openId
                return (
                  <li key={m.id} className="border-b border-hairline">
                    <button
                      type="button"
                      onClick={() => select(m.id)}
                      aria-current={selected ? "true" : undefined}
                      className={cn(
                        "grid w-full grid-cols-[0.75rem_minmax(0,1fr)_auto] items-baseline gap-x-3 px-2 py-3.5 text-left transition-colors",
                        selected ? "bg-asphalt-raised" : "hover:bg-asphalt",
                      )}
                    >
                      <span aria-hidden="true" className={cn("size-2 self-center rounded-full", m.read ? "bg-transparent" : "bg-amber")} />
                      <span className={cn("truncate text-[0.9375rem]", m.read ? "text-text" : "font-bold text-ink")}>
                        {m.name || m.email}
                        {!m.read ? <span className="sr-only"> (non lu)</span> : null}
                      </span>
                      <span className="font-mono text-[0.75rem] text-muted">{shortDate(m.createdAt)}</span>
                      <span />
                      <span className={cn("col-span-2 mt-0.5 truncate text-[0.8125rem]", m.read ? "text-muted" : "text-dawn")}>
                        {m.subject || "(sans objet)"} — {m.message}
                      </span>
                    </button>
                  </li>
                )
              })
            )}
          </ol>

          {open ? (
            <article aria-label={`Message de ${open.name || open.email}`} className="min-w-0 xl:sticky xl:top-6 xl:self-start">
              <div className="flex items-center justify-between gap-4 border-b border-hairline pb-4">
                <Button variant="ghost" size="sm" onClick={() => select(null)}>
                  ← Tous les messages
                </Button>
                <p className="font-mono text-[0.75rem] text-muted">{fullFmt.format(new Date(open.createdAt))}</p>
              </div>
              <h2 className="mt-6 text-[1.25rem] font-bold leading-snug text-ink">{open.subject || "(sans objet)"}</h2>
              <p className="mt-2 text-[0.9375rem] text-text">
                <span className="font-bold text-ink">{open.name}</span>{" "}
                <a href={`mailto:${open.email}`} className="text-cobalt hover:text-ink">
                  &lt;{open.email}&gt;
                </a>
              </p>
              <div className="mt-6 max-w-[68ch] whitespace-pre-wrap border-l border-hairline pl-4 text-[1.0625rem] leading-relaxed text-ink">
                {open.message}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
                <a
                  href={`mailto:${open.email}?subject=${encodeURIComponent(`Re: ${open.subject || "votre message"}`)}&body=${encodeURIComponent(
                    `\n\n---\n${open.name} a écrit :\n${open.message.split("\n").map((l) => `> ${l}`).join("\n")}`,
                  )}`}
                  className="inline-flex h-10 items-center rounded-[2px] bg-amber px-4 text-[0.9375rem] font-bold text-night hover:bg-amber-deep"
                >
                  Répondre par email
                </a>
                <Button
                  variant="secondary"
                  onClick={async () => {
                    await navigator.clipboard.writeText(open.email)
                    toast("Adresse copiée")
                  }}
                >
                  Copier l&apos;adresse
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setRead(open, false)
                    select(null)
                  }}
                >
                  Marquer non lu
                </Button>
                <ConfirmButton label="Supprimer" onConfirm={() => remove(open)} className="ml-auto" />
              </div>
            </article>
          ) : null}
        </div>
      )}
    </div>
  )
}
