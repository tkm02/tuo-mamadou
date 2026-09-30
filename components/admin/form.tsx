"use client"

import type React from "react"
import type { Field } from "@/lib/admin/resources"
import { FieldRow } from "@/components/admin/field-input"
import { Button, isMac } from "@/components/admin/ui"
import { cn } from "@/lib/utils"

/** Champs visibles, regroupés en blocs titrés quand la config le demande. */
export function FormFields({
  fields,
  value,
  onFieldChange,
}: {
  fields: Field[]
  value: Record<string, any>
  onFieldChange: (name: string, v: any) => void
}) {
  const visible = fields.filter((f) => !f.hidden)
  const groups: { title?: string; fields: Field[] }[] = []
  for (const f of visible) {
    const last = groups[groups.length - 1]
    if (last && last.title === f.group) last.fields.push(f)
    else groups.push({ title: f.group, fields: [f] })
  }
  return (
    <div className="space-y-8">
      {groups.map((g, i) => (
        <fieldset key={`${g.title ?? "g"}-${i}`} className={cn(g.title && i > 0 && "border-t border-hairline pt-6")}>
          {g.title ? (
            <legend className="float-left mb-4 w-full text-[0.75rem] font-bold uppercase tracking-[0.16em] text-amber">
              {g.title}
            </legend>
          ) : null}
          <div className="clear-both grid gap-x-4 gap-y-5 sm:grid-cols-2">
            {g.fields.map((f) => (
              <FieldRow key={f.name} field={f} value={value[f.name]} onChange={(v) => onFieldChange(f.name, v)} />
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  )
}

/** Barre d'enregistrement : état, annulation, raccourci clavier. */
export function SaveBar({
  dirty,
  saving,
  onSave,
  onReset,
  savedLabel = "Tout est enregistré",
  children,
  className,
}: {
  dirty: boolean
  saving: boolean
  onSave: () => void
  onReset: () => void
  savedLabel?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3 border-t border-hairline bg-asphalt px-4 py-3 sm:px-5", className)}>
      <p className="mr-auto flex items-center gap-2 text-[0.8125rem]" aria-live="polite">
        <span aria-hidden="true" className={cn("size-2 rounded-full", dirty ? "bg-amber" : "bg-line-teal")} />
        <span className={dirty ? "text-ink" : "text-muted"}>{dirty ? "Modifications non enregistrées" : savedLabel}</span>
      </p>
      {children}
      {dirty ? (
        <Button variant="ghost" onClick={onReset} disabled={saving}>
          Annuler
        </Button>
      ) : null}
      <Button variant="primary" onClick={onSave} loading={saving} disabled={!dirty}>
        Enregistrer
        <kbd className="hidden font-mono text-[0.75rem] font-medium opacity-70 sm:inline">{isMac() ? "⌘S" : "Ctrl S"}</kbd>
      </Button>
    </div>
  )
}
