"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ArrowDown, ArrowUp, GripVertical, Search } from "lucide-react"
import type { ResourceConfig } from "@/lib/admin/resources"
import { emptyRow } from "@/lib/admin/resources"
import { rowIssues, type Issue } from "@/lib/admin/health"
import { getSupabase } from "@/lib/supabase/client"
import { clean, cn } from "@/lib/utils"
import { useAdminData } from "@/components/admin/admin-context"
import { FormFields, SaveBar } from "@/components/admin/form"
import {
  Button,
  Callout,
  ConfirmButton,
  EmptyState,
  PageHeader,
  SkeletonRows,
  useLeaveGuard,
  useSaveShortcut,
  useToast,
} from "@/components/admin/ui"

type Row = Record<string, any>
type Pending = { kind: "select"; id: string } | { kind: "new" } | { kind: "close" } | { kind: "duplicate" }

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

/** Ajustements automatiques avant enregistrement. */
function normalize(table: string, row: Row): Row {
  const r = { ...row }
  if (table === "certifications" && typeof r.certificateUrl === "string" && r.certificateUrl) {
    r.certificateType = /\.pdf($|\?)/i.test(r.certificateUrl) ? "pdf" : "image"
  }
  for (const [k, v] of Object.entries(r)) {
    if (Array.isArray(v) && v.every((x) => typeof x === "string")) r[k] = v.map((x) => x.trim()).filter(Boolean)
  }
  return r
}

export default function ResourceManager({ config }: { config: ResourceConfig }) {
  const supabase = getSupabase()
  const toast = useToast()
  const { refresh } = useAdminData()
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const editParam = params.get("edit")

  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [query, setQuery] = useState("")
  const [draft, setDraft] = useState<Row | null>(null)
  const [original, setOriginal] = useState<Row | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState("")
  const [pending, setPending] = useState<Pending | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const dirty = draft !== null && !same(draft, original)
  useLeaveGuard(dirty)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const { data, error } = await supabase.from(config.table).select("*").order("sortOrder", { ascending: true })
    if (error) setLoadError(`Impossible de charger la liste : ${error.message}`)
    else {
      setRows(data ?? [])
      setLoadError("")
    }
    setLoading(false)
  }, [config.table, supabase])

  useEffect(() => {
    load()
  }, [load])

  /* ---- Ouverture / fermeture de l'éditeur, synchronisées avec l'URL ---- */

  const setEditParam = useCallback(
    (value: string | null) => {
      const next = new URLSearchParams(params.toString())
      if (value) next.set("edit", value)
      else next.delete("edit")
      const qs = next.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [params, pathname, router],
  )

  useEffect(() => {
    if (loading) return
    if (!editParam) {
      setDraft(null)
      setOriginal(null)
      return
    }
    if (editParam === "new") {
      if (!draft || draft.id) {
        const row = emptyRow(config.fields)
        setDraft(row)
        setOriginal(row)
      }
      return
    }
    if (draft?.id === editParam) return
    const row = rows.find((r) => String(r.id) === editParam)
    if (row) {
      setDraft(row)
      setOriginal(row)
      setFormError("")
      requestAnimationFrame(() => editorRef.current?.scrollTo({ top: 0 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editParam, loading, rows])

  const perform = useCallback(
    (action: Pending) => {
      setPending(null)
      setFormError("")
      if (action.kind === "select") setEditParam(action.id)
      else if (action.kind === "new") {
        const row = emptyRow(config.fields)
        setDraft(row)
        setOriginal(row)
        setEditParam("new")
      } else if (action.kind === "duplicate" && original) {
        const { id: _id, createdAt: _c, ...rest } = original
        const copy = { ...rest, [config.titleField]: `${original[config.titleField] ?? ""} (copie)` }
        setDraft(copy)
        setOriginal(emptyRow(config.fields))
        setEditParam("new")
      } else if (action.kind === "close") {
        setDraft(null)
        setOriginal(null)
        setEditParam(null)
      }
    },
    [config.fields, config.titleField, original, setEditParam],
  )

  const request = (action: Pending) => (dirty ? setPending(action) : perform(action))

  /* ---- Enregistrement ---- */

  const save = useCallback(async (): Promise<boolean> => {
    if (!supabase || !draft) return false
    const title = String(draft[config.titleField] ?? "").trim()
    if (!title) {
      const label = config.fields.find((f) => f.name === config.titleField)?.label ?? "Titre"
      setFormError(`« ${label} » est obligatoire.`)
      return false
    }
    setSaving(true)
    setFormError("")
    const payload: Row = normalize(config.table, draft)
    delete payload.createdAt
    if (!payload.id) {
      delete payload.id
      // Les nouveaux éléments arrivent en tête de liste, donc en premier sur le site.
      const min = rows.reduce((m, r) => Math.min(m, Number(r.sortOrder ?? 0)), 0)
      payload.sortOrder = min - 1
    }
    const { data, error } = await supabase.from(config.table).upsert(payload).select().single()
    setSaving(false)
    if (error || !data) {
      setFormError(`Enregistrement impossible : ${error?.message ?? "réponse vide"}. Tes modifications sont conservées ici.`)
      return false
    }
    const wasNew = !draft.id
    setDraft(data)
    setOriginal(data)
    setRows((prev) => {
      const exists = prev.some((r) => r.id === data.id)
      const next = exists ? prev.map((r) => (r.id === data.id ? data : r)) : [data, ...prev]
      return next.sort((a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0))
    })
    toast(wasNew ? `« ${clean(title)} » ajouté` : "Modifications enregistrées")
    if (wasNew) {
      setEditParam(String(data.id))
      refresh()
    }
    return true
  }, [config.fields, config.table, config.titleField, draft, refresh, rows, setEditParam, supabase, toast])

  useSaveShortcut(() => {
    if (dirty && !saving) save()
  }, draft !== null)

  const remove = async () => {
    if (!supabase || !draft?.id) return
    const title = clean(String(draft[config.titleField] ?? ""))
    const { error } = await supabase.from(config.table).delete().eq("id", draft.id)
    if (error) {
      toast(`Suppression impossible : ${error.message}`, "error")
      return
    }
    setRows((prev) => prev.filter((r) => r.id !== draft.id))
    perform({ kind: "close" })
    toast(`« ${title} » supprimé`)
    refresh()
  }

  /* ---- Réordonnancement ---- */

  const persistOrder = async (next: Row[]) => {
    if (!supabase) return
    const previous = rows
    setRows(next)
    const changed = next.map((r, i) => ({ r, i })).filter(({ r, i }) => Number(r.sortOrder) !== i)
    const results = await Promise.all(
      changed.map(({ r, i }) => supabase.from(config.table).update({ sortOrder: i }).eq("id", r.id)),
    )
    if (results.some((res) => res.error)) {
      setRows(previous)
      toast("L'ordre n'a pas pu être enregistré. Réessaie.", "error")
      return
    }
    setRows(next.map((r, i) => ({ ...r, sortOrder: i })))
    toast("Ordre enregistré")
  }

  const move = (from: number, to: number) => {
    if (to < 0 || to >= rows.length || from === to) return
    const next = [...rows]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    persistOrder(next)
  }

  const [dragFrom, setDragFrom] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)
  const [armed, setArmed] = useState<number | null>(null)

  /* ---- Liste filtrée ---- */

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows.map((row, index) => ({ row, index }))
    return rows
      .map((row, index) => ({ row, index }))
      .filter(({ row }) =>
        [config.titleField, config.subtitleField, config.metaField]
          .filter(Boolean)
          .some((f) => String(row[f!] ?? "").toLowerCase().includes(q)),
      )
  }, [rows, query, config])
  const canReorder = !query.trim()
  const editing = draft !== null
  const plural = rows.length > 1 ? "éléments" : "élément"

  if (!supabase) return <Callout tone="error">Supabase n'est pas configuré.</Callout>

  return (
    <div>
      <PageHeader
        title={config.label}
        meta={loading ? "Chargement…" : `${rows.length} ${plural} · l'ordre ici est l'ordre du site`}
        actions={
          <>
            <a
              href={`/#${config.anchor}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center px-3 text-[0.9375rem] font-bold text-cobalt hover:text-ink"
            >
              Voir sur le site ↗
            </a>
            <Button variant="primary" onClick={() => request({ kind: "new" })}>
              + Ajouter {config.singular}
            </Button>
          </>
        }
      />

      <div className={cn("grid gap-8", editing && "xl:grid-cols-[minmax(0,1fr)_minmax(30rem,38rem)]")}>
        {/* ---------------- Liste ---------------- */}
        <section aria-label={`Liste : ${config.label}`} className={cn("min-w-0", editing && "hidden xl:block")}>
          {rows.length > 6 ? (
            <div className="relative mb-4">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Rechercher dans ${config.label.toLowerCase()}…`}
                aria-label="Rechercher"
                className="h-10 w-full rounded-[2px] border border-hairline bg-night pl-9 pr-3 text-[0.9375rem] text-ink placeholder:text-muted/80 focus:border-amber focus:outline-none"
              />
            </div>
          ) : null}

          {loadError ? (
            <Callout tone="error">
              {loadError}{" "}
              <button type="button" onClick={load} className="font-bold text-amber underline">
                Réessayer
              </button>
            </Callout>
          ) : loading ? (
            <SkeletonRows />
          ) : rows.length === 0 ? (
            <EmptyState
              title={`Aucun élément dans « ${config.label} »`}
              action={
                <Button variant="primary" onClick={() => request({ kind: "new" })}>
                  + Ajouter {config.singular}
                </Button>
              }
            >
              Tant que cette liste est vide, le site affiche le contenu d&apos;origine. Le poste de contrôle peut
              l&apos;importer en un clic.
            </EmptyState>
          ) : filtered.length === 0 ? (
            <EmptyState title="Aucun résultat">Rien ne correspond à « {query} ».</EmptyState>
          ) : (
            <>
              {!canReorder ? (
                <p className="mb-2 text-[0.8125rem] text-muted">Efface la recherche pour réordonner.</p>
              ) : null}
              <ol className="border-t border-hairline">
                {filtered.map(({ row, index }) => {
                  const selected = draft?.id !== undefined && String(draft.id) === String(row.id)
                  const issues = rowIssues(config.table, row)
                  const title = clean(String(row[config.titleField] ?? "")) || "(sans titre)"
                  return (
                    <li
                      key={row.id}
                      draggable={canReorder && armed === index}
                      onDragStart={(e) => {
                        setDragFrom(index)
                        e.dataTransfer.effectAllowed = "move"
                      }}
                      onDragOver={(e) => {
                        if (dragFrom === null) return
                        e.preventDefault()
                        setDragOver(index)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        if (dragFrom !== null) move(dragFrom, index)
                        setDragFrom(null)
                        setDragOver(null)
                        setArmed(null)
                      }}
                      onDragEnd={() => {
                        setDragFrom(null)
                        setDragOver(null)
                        setArmed(null)
                      }}
                      className={cn(
                        "group flex items-stretch border-b border-hairline transition-colors",
                        selected ? "bg-asphalt-raised" : "hover:bg-asphalt",
                        dragOver === index && dragFrom !== index && "bg-amber/10",
                        dragFrom === index && "opacity-50",
                      )}
                    >
                      {canReorder ? (
                        <span
                          aria-hidden="true"
                          title="Glisser pour réordonner"
                          onPointerDown={() => setArmed(index)}
                          onPointerUp={() => setArmed(null)}
                          className="hidden w-7 shrink-0 cursor-grab touch-none place-items-center text-muted hover:text-ink active:cursor-grabbing sm:grid"
                        >
                          <GripVertical className="size-4" />
                        </span>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => request({ kind: "select", id: String(row.id) })}
                        aria-current={selected ? "true" : undefined}
                        className="flex min-w-0 flex-1 items-center gap-4 py-3.5 pl-2 pr-2 text-left sm:pl-1"
                      >
                        <Thumb row={row} config={config} />
                        <span className="min-w-0 flex-1">
                          <span className={cn("block truncate text-[0.9375rem] font-bold", selected ? "text-amber" : "text-ink")}>
                            {title}
                          </span>
                          {config.subtitleField ? (
                            <span className="mt-0.5 block truncate text-[0.8125rem] text-muted">
                              {clean(String(row[config.subtitleField] ?? ""))}
                            </span>
                          ) : null}
                        </span>
                        <Markers issues={issues} />
                        {config.metaField ? (
                          <span
                            className={cn(
                              "hidden w-40 shrink-0 truncate text-right font-mono text-[0.75rem] text-muted",
                              editing ? "2xl:block" : "md:block",
                            )}
                          >
                            {clean(String(row[config.metaField] ?? ""))}
                          </span>
                        ) : null}
                      </button>
                      {canReorder ? (
                        <span className="flex shrink-0 items-center opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => move(index, index - 1)}
                            disabled={index === 0}
                            aria-label={`Monter « ${title} »`}
                            className="grid size-9 place-items-center text-muted hover:text-ink disabled:opacity-25"
                          >
                            <ArrowUp aria-hidden="true" className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => move(index, index + 1)}
                            disabled={index === rows.length - 1}
                            aria-label={`Descendre « ${title} »`}
                            className="grid size-9 place-items-center text-muted hover:text-ink disabled:opacity-25"
                          >
                            <ArrowDown aria-hidden="true" className="size-4" />
                          </button>
                        </span>
                      ) : null}
                    </li>
                  )
                })}
              </ol>
            </>
          )}
        </section>

        {/* ---------------- Éditeur ---------------- */}
        {editing && draft ? (
          <section
            aria-label={draft.id ? `Modifier ${config.singular}` : `Nouvel élément`}
            className="fixed inset-0 z-50 flex flex-col bg-night xl:sticky xl:inset-auto xl:top-6 xl:z-auto xl:max-h-[calc(100vh-3rem)] xl:border xl:border-hairline"
          >
            <div className="flex items-start justify-between gap-4 border-b border-hairline bg-asphalt px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-muted">
                  {config.label} / {draft.id ? "modifier" : "nouveau"}
                </p>
                <p className="mt-1 truncate text-[1.0625rem] font-bold text-ink">
                  {clean(String(draft[config.titleField] ?? "")) || "Sans titre"}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => request({ kind: "close" })}>
                Fermer
              </Button>
            </div>

            {pending ? (
              <div role="alertdialog" aria-label="Modifications non enregistrées" className="border-b border-amber/40 bg-amber/10 px-4 py-3 sm:px-5">
                <p className="text-[0.9375rem] font-bold text-ink">Tu as des modifications non enregistrées.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    loading={saving}
                    onClick={async () => {
                      if (await save()) perform(pending)
                    }}
                  >
                    Enregistrer et continuer
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => perform(pending)}>
                    Abandonner les modifications
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setPending(null)}>
                    Rester ici
                  </Button>
                </div>
              </div>
            ) : null}

            <div ref={editorRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-5">
              {formError ? (
                <div className="mb-6">
                  <Callout tone="error">{formError}</Callout>
                </div>
              ) : null}
              {rowIssues(config.table, draft).length > 0 ? (
                <ul className="mb-6 space-y-1.5">
                  {rowIssues(config.table, draft).map((issue) => (
                    <li key={issue.text} className="flex gap-2 text-[0.8125rem] text-text">
                      <span aria-hidden="true" className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", issueColor(issue.level))} />
                      {issue.text}
                    </li>
                  ))}
                </ul>
              ) : null}
              <FormFields
                fields={config.fields}
                value={draft}
                onFieldChange={(name, v) => setDraft((prev) => (prev ? { ...prev, [name]: v } : prev))}
              />
            </div>

            <SaveBar
              dirty={dirty}
              saving={saving}
              onSave={save}
              onReset={() => {
                setDraft(original)
                setFormError("")
              }}
              savedLabel={draft.id ? "Tout est enregistré" : "Pas encore enregistré"}
            >
              {draft.id ? (
                <>
                  <ConfirmButton label="Supprimer" onConfirm={remove} />
                  <Button variant="ghost" onClick={() => request({ kind: "duplicate" })}>
                    Dupliquer
                  </Button>
                </>
              ) : null}
            </SaveBar>
          </section>
        ) : null}
      </div>
    </div>
  )
}

function issueColor(level: Issue["level"]) {
  return level === "fix" ? "bg-neon" : level === "check" ? "bg-amber" : "bg-cobalt"
}

function Markers({ issues }: { issues: Issue[] }) {
  if (!issues.length) return null
  const worst = issues.find((i) => i.level === "fix") ?? issues.find((i) => i.level === "check") ?? issues[0]
  return (
    <span className="flex shrink-0 items-center gap-1.5" title={issues.map((i) => i.text).join("\n")}>
      <span aria-hidden="true" className={cn("size-2 rounded-full", issueColor(worst.level))} />
      <span className="sr-only">{issues.map((i) => i.text).join(" ")}</span>
    </span>
  )
}

function Thumb({ row, config }: { row: Row; config: ResourceConfig }) {
  const raw = config.imageField ? row[config.imageField] : null
  const src = Array.isArray(raw) ? raw[0] : raw
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" loading="lazy" className="size-10 shrink-0 border border-hairline bg-asphalt object-cover" />
    )
  }
  if (config.imageField) {
    return (
      <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center border border-dashed border-hairline font-mono text-[0.75rem] text-muted">
        —
      </span>
    )
  }
  return null
}
