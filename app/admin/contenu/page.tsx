"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getSupabase } from "@/lib/supabase/client"
import { CONTENT_SECTIONS, normalizeContent } from "@/lib/admin/content-sections"
import { FormFields, SaveBar } from "@/components/admin/form"
import { Callout, PageHeader, SkeletonRows, useLeaveGuard, useSaveShortcut, useToast } from "@/components/admin/ui"
import ThemePreview from "@/components/admin/theme-preview"
import { cn } from "@/lib/utils"

type Values = Record<string, Record<string, any>>
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

export default function ContentPage() {
  return (
    <Suspense fallback={<SkeletonRows />}>
      <ContentEditor />
    </Suspense>
  )
}

function ContentEditor() {
  const params = useSearchParams()
  const active = CONTENT_SECTIONS.find((s) => s.key === params.get("s")) ?? CONTENT_SECTIONS[0]
  const supabase = getSupabase()
  const toast = useToast()

  const [values, setValues] = useState<Values>({})
  const [originals, setOriginals] = useState<Values>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const { data, error } = await supabase.from("site_content").select("key, value")
    if (error) setError(`Impossible de charger le contenu : ${error.message}`)
    const next: Values = {}
    for (const s of CONTENT_SECTIONS) {
      const row = data?.find((d) => d.key === s.key)
      next[s.key] = { ...s.fallback, ...((row?.value as Record<string, any>) ?? {}) }
    }
    setValues(next)
    setOriginals(next)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    load()
  }, [load])

  const dirtyKeys = useMemo(
    () => CONTENT_SECTIONS.filter((s) => values[s.key] && !same(values[s.key], originals[s.key])).map((s) => s.key),
    [values, originals],
  )
  const dirty = dirtyKeys.length > 0
  useLeaveGuard(dirty)

  const save = useCallback(async () => {
    if (!supabase || !dirty) return
    setSaving(true)
    setError("")
    const payload = dirtyKeys.map((key) => ({
      key,
      value: normalizeContent(key, values[key]),
      updatedAt: new Date().toISOString(),
    }))
    const { error } = await supabase.from("site_content").upsert(payload)
    setSaving(false)
    if (error) {
      setError(`Enregistrement impossible : ${error.message}. Tes modifications sont conservées ici.`)
      return
    }
    const saved = Object.fromEntries(payload.map((p) => [p.key, p.value]))
    setValues((v) => ({ ...v, ...saved }))
    setOriginals((o) => ({ ...o, ...saved }))
    const names = CONTENT_SECTIONS.filter((s) => dirtyKeys.includes(s.key)).map((s) => s.label)
    toast(`Enregistré : ${names.join(", ")}`)
  }, [dirty, dirtyKeys, supabase, toast, values])

  useSaveShortcut(save, true)

  const current = values[active.key] ?? active.fallback
  const dirtyNames = CONTENT_SECTIONS.filter((s) => dirtyKeys.includes(s.key)).map((s) => s.label)

  if (!supabase) return <Callout tone="error">Supabase n&apos;est pas configuré.</Callout>

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={active.label}
        actions={
          <a
            href={`/#${active.anchor}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center px-3 text-[0.9375rem] font-bold text-cobalt hover:text-ink"
          >
            Voir sur le site ↗
          </a>
        }
      >
        <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-muted">{active.description}</p>
      </PageHeader>

      <nav aria-label="Sections du site" className="rail -mx-4 mb-8 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {CONTENT_SECTIONS.map((s) => {
          const isActive = s.key === active.key
          return (
            <Link
              key={s.key}
              href={`/admin/contenu?s=${s.key}`}
              scroll={false}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-9 shrink-0 items-center gap-2 border px-3.5 text-[0.8125rem] font-bold transition-colors",
                isActive ? "border-amber bg-amber text-night" : "border-hairline text-text hover:border-muted hover:text-ink",
              )}
            >
              {s.label}
              {dirtyKeys.includes(s.key) ? (
                <span
                  aria-label="modifié"
                  className={cn("size-1.5 rounded-full", isActive ? "bg-night" : "bg-amber")}
                />
              ) : null}
            </Link>
          )
        })}
      </nav>

      {error ? (
        <div className="mb-6">
          <Callout tone="error">{error}</Callout>
        </div>
      ) : null}

      {loading ? (
        <SkeletonRows rows={6} />
      ) : (
        <div className="border border-hairline">
          {active.key === "theme" ? <ThemePreview value={current} /> : null}
          <div className="px-4 py-6 sm:px-6">
            <FormFields
              fields={active.fields}
              value={current}
              onFieldChange={(name, v) => setValues((prev) => ({ ...prev, [active.key]: { ...current, [name]: v } }))}
            />
          </div>
          <SaveBar
            className="sticky bottom-0"
            dirty={dirty}
            saving={saving}
            onSave={save}
            onReset={() => setValues(originals)}
          >
            {dirty && dirtyNames.length > 1 ? (
              <span className="text-[0.8125rem] text-muted">{dirtyNames.join(", ")}</span>
            ) : null}
          </SaveBar>
        </div>
      )}
    </div>
  )
}
