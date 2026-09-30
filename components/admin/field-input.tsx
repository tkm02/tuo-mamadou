"use client"

import type React from "react"
import { useId, useRef, useState } from "react"
import { ArrowDown, ArrowUp, GripVertical, Loader2, X } from "lucide-react"
import type { Field } from "@/lib/admin/resources"
import { emptyValue } from "@/lib/admin/resources"
import { uploadToMedia } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

export const inputClass =
  "block w-full rounded-[2px] border border-hairline bg-night px-3 text-[0.9375rem] text-ink placeholder:text-muted/80 transition-colors focus:border-amber focus:outline-none"

type Props = {
  field: Field
  value: any
  onChange: (value: any) => void
  id?: string
}

/** Libellé + aide + contrôle. */
export function FieldRow({ field, value, onChange }: Omit<Props, "id">) {
  const id = useId()
  const helpId = `${id}-help`
  const isGroupControl = ["boolean", "list", "tags", "imageList", "objectList"].includes(field.type)
  return (
    <div className={cn(field.half ? "sm:col-span-1" : "sm:col-span-2")}>
      {field.type === "boolean" || field.group === field.label ? null : isGroupControl ? (
        <p id={`${id}-label`} className="mb-2 text-[0.8125rem] font-bold text-dawn">
          {field.label}
        </p>
      ) : (
        <label htmlFor={id} className="mb-2 block text-[0.8125rem] font-bold text-dawn">
          {field.label}
        </label>
      )}
      <div aria-describedby={field.help ? helpId : undefined} aria-labelledby={isGroupControl ? `${id}-label` : undefined} role={isGroupControl && field.type !== "boolean" ? "group" : undefined}>
        <FieldInput field={field} value={value} onChange={onChange} id={id} />
      </div>
      {field.help ? (
        <p id={helpId} className="mt-1.5 text-[0.8125rem] leading-snug text-muted">
          {field.help}
        </p>
      ) : null}
    </div>
  )
}

export default function FieldInput({ field, value, onChange, id }: Props) {
  switch (field.type) {
    case "text":
      return (
        <input
          id={id}
          type="text"
          className={cn(inputClass, "h-10")}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case "number":
      return (
        <input
          id={id}
          type="number"
          className={cn(inputClass, "h-10 w-32")}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )
    case "textarea":
      return (
        <textarea
          id={id}
          rows={4}
          className={cn(inputClass, "min-h-24 py-2.5 leading-relaxed [field-sizing:content]")}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case "boolean":
      return <Switch id={id} label={field.label} checked={Boolean(value)} onChange={onChange} />
    case "color":
      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            aria-label={`${field.label} : sélecteur`}
            className="h-10 w-12 shrink-0 cursor-pointer rounded-[2px] border border-hairline bg-night p-1"
            value={/^#[0-9a-f]{6}$/i.test(value ?? "") ? value : "#000000"}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
          />
          <input
            id={id}
            type="text"
            spellCheck={false}
            className={cn(inputClass, "h-10 w-32 font-mono uppercase")}
            value={value ?? ""}
            placeholder="#FF6A13"
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )
    case "select":
      return <Choice id={id} field={field} value={value ?? ""} onChange={onChange} />
    case "list":
      return <TextList value={Array.isArray(value) ? value : []} onChange={onChange} placeholder={field.placeholder} />
    case "tags":
      return <TagInput value={Array.isArray(value) ? value : []} onChange={onChange} placeholder={field.placeholder} />
    case "image":
      return <FileInput id={id} value={value ?? ""} onChange={onChange} kind="image" />
    case "file":
      return <FileInput id={id} value={value ?? ""} onChange={onChange} kind="file" />
    case "imageList":
      return <ImageList value={Array.isArray(value) ? value : []} onChange={onChange} />
    case "objectList":
      return <ObjectList field={field} value={Array.isArray(value) ? value : []} onChange={onChange} />
    default:
      return null
  }
}

/* ------------------------------------------------------------------ */

function Switch({ id, label, checked, onChange }: { id?: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex h-10 items-center gap-3 text-[0.9375rem] font-bold text-ink"
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 rounded-full border transition-colors duration-150",
          checked ? "border-amber bg-amber" : "border-hairline bg-night group-hover:border-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-[18px] rounded-full transition-transform duration-150",
            checked ? "translate-x-[22px] bg-night" : "translate-x-0.5 bg-muted",
          )}
        />
      </span>
      {label}
    </button>
  )
}

/** Choix : segments quand les valeurs sont fixes et peu nombreuses, sinon saisie libre avec suggestions. */
function Choice({ id, field, value, onChange }: { id?: string; field: Field; value: string; onChange: (v: string) => void }) {
  const options = field.options ?? []
  const listId = useId()
  if (field.optionLabels || options.length <= 3) {
    return (
      <div role="radiogroup" aria-labelledby={id} className="inline-flex flex-wrap border border-hairline">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={value === opt}
            onClick={() => onChange(opt)}
            className={cn(
              "h-9 border-r border-hairline px-3.5 text-[0.8125rem] font-bold transition-colors last:border-r-0",
              value === opt ? "bg-amber text-night" : "text-text hover:bg-asphalt-raised hover:text-ink",
            )}
          >
            {field.optionLabels?.[opt] ?? opt}
          </button>
        ))}
      </div>
    )
  }
  return (
    <>
      <input
        id={id}
        type="text"
        list={listId}
        className={cn(inputClass, "h-10")}
        value={value}
        placeholder={options[0]}
        onChange={(e) => onChange(e.target.value)}
      />
      <datalist id={listId}>
        {options.map((o) => (
          <option key={o} value={o} />
        ))}
      </datalist>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Réordonnancement par glisser-déposer (poignée) + boutons clavier     */
/* ------------------------------------------------------------------ */

function useReorder<T>(value: T[], onChange: (v: T[]) => void) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [armed, setArmed] = useState<number | null>(null)

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length || from === to) return
    const next = [...value]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  const rowProps = (i: number) => ({
    draggable: armed === i,
    onDragStart: (e: React.DragEvent) => {
      setDragIndex(i)
      e.dataTransfer.effectAllowed = "move"
    },
    onDragOver: (e: React.DragEvent) => {
      if (dragIndex === null) return
      e.preventDefault()
      setOverIndex(i)
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault()
      if (dragIndex !== null) move(dragIndex, i)
      setDragIndex(null)
      setOverIndex(null)
      setArmed(null)
    },
    onDragEnd: () => {
      setDragIndex(null)
      setOverIndex(null)
      setArmed(null)
    },
  })

  const handleProps = (i: number) => ({
    onPointerDown: () => setArmed(i),
    onPointerUp: () => setArmed(null),
  })

  return { move, rowProps, handleProps, dragIndex, overIndex }
}

function MoveButtons({ index, count, move, label }: { index: number; count: number; move: (a: number, b: number) => void; label: string }) {
  return (
    <span className="flex shrink-0">
      <button
        type="button"
        onClick={() => move(index, index - 1)}
        disabled={index === 0}
        aria-label={`Monter ${label}`}
        className="grid size-8 place-items-center text-muted hover:text-ink disabled:opacity-25"
      >
        <ArrowUp aria-hidden="true" className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => move(index, index + 1)}
        disabled={index === count - 1}
        aria-label={`Descendre ${label}`}
        className="grid size-8 place-items-center text-muted hover:text-ink disabled:opacity-25"
      >
        <ArrowDown aria-hidden="true" className="size-4" />
      </button>
    </span>
  )
}

function Handle(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      title="Glisser pour réordonner"
      className="hidden size-8 shrink-0 cursor-grab touch-none place-items-center text-muted hover:text-ink active:cursor-grabbing sm:grid"
      {...props}
    >
      <GripVertical className="size-4" />
    </span>
  )
}

function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Retirer ${label}`}
      className="grid size-8 shrink-0 place-items-center text-muted hover:text-neon"
    >
      <X aria-hidden="true" className="size-4" />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Liste de textes : Entrée ajoute une ligne, Retour arrière la retire  */
/* ------------------------------------------------------------------ */

function TextList({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const { move, rowProps, handleProps, overIndex } = useReorder(value, onChange)

  const focus = (i: number) => requestAnimationFrame(() => refs.current[i]?.focus())
  const insertAfter = (i: number) => {
    const next = [...value]
    next.splice(i + 1, 0, "")
    onChange(next)
    focus(i + 1)
  }

  return (
    <div>
      {value.length > 0 ? (
        <ol className="border border-hairline">
          {value.map((item, i) => (
            <li
              key={i}
              {...rowProps(i)}
              className={cn(
                "flex items-center gap-1 border-b border-hairline pr-1 last:border-b-0",
                overIndex === i && "bg-amber/10",
              )}
            >
              <Handle {...handleProps(i)} />
              <span aria-hidden="true" className="w-6 shrink-0 pl-2 font-mono text-[0.75rem] text-muted sm:pl-0">
                {i + 1}
              </span>
              <input
                ref={(el) => {
                  refs.current[i] = el
                }}
                type="text"
                value={item}
                placeholder={placeholder}
                aria-label={`Élément ${i + 1}`}
                onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    insertAfter(i)
                  } else if (e.key === "Backspace" && item === "" && value.length > 0) {
                    e.preventDefault()
                    onChange(value.filter((_, j) => j !== i))
                    focus(Math.max(0, i - 1))
                  }
                }}
                onBlur={() => {
                  if (item.trim() === "" && i === value.length - 1 && value.length > 1) onChange(value.slice(0, -1))
                }}
                className="h-10 min-w-0 flex-1 bg-transparent px-1 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:outline-none"
              />
              <MoveButtons index={i} count={value.length} move={move} label={`l'élément ${i + 1}`} />
              <RemoveButton onClick={() => onChange(value.filter((_, j) => j !== i))} label={`l'élément ${i + 1}`} />
            </li>
          ))}
        </ol>
      ) : null}
      <button
        type="button"
        onClick={() => insertAfter(value.length - 1)}
        className="mt-2 text-[0.8125rem] font-bold text-cobalt hover:text-ink"
      >
        + Ajouter une ligne
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mots-clés : Entrée ou virgule ajoute, collage multiple accepté       */
/* ------------------------------------------------------------------ */

function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("")
  const add = (raw: string) => {
    const items = raw
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => !value.some((v) => v.toLowerCase() === s.toLowerCase()))
    if (items.length) onChange([...value, ...items])
    setDraft("")
  }
  return (
    <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-[2px] border border-hairline bg-night p-1.5 focus-within:border-amber">
      {value.map((tag, i) => (
        <span key={`${tag}-${i}`} className="inline-flex items-center gap-1 border border-hairline bg-asphalt-raised py-0.5 pl-2 pr-0.5 font-mono text-[0.8125rem] text-ink">
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            aria-label={`Retirer ${tag}`}
            className="grid size-6 place-items-center text-muted hover:text-neon"
          >
            <X aria-hidden="true" className="size-3.5" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={draft}
        placeholder={value.length ? "" : placeholder}
        aria-label={placeholder ?? "Ajouter"}
        onChange={(e) => {
          const v = e.target.value
          if (v.includes(",")) add(v)
          else setDraft(v)
        }}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text")
          if (/[,\n]/.test(text)) {
            e.preventDefault()
            add(text)
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            add(draft)
          } else if (e.key === "Backspace" && draft === "" && value.length) {
            onChange(value.slice(0, -1))
          }
        }}
        onBlur={() => draft.trim() && add(draft)}
        className="h-7 min-w-[10rem] flex-1 bg-transparent px-1.5 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:outline-none"
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Fichiers                                                            */
/* ------------------------------------------------------------------ */

function useUpload(folder: string) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const upload = async (files: File[]): Promise<string[]> => {
    setUploading(true)
    setError("")
    try {
      const urls: string[] = []
      for (const f of files) urls.push(await uploadToMedia(f, folder))
      return urls
    } catch (e: any) {
      setError(`Téléversement impossible : ${e?.message ?? "erreur inconnue"}. Réessaie ou colle une URL.`)
      return []
    } finally {
      setUploading(false)
    }
  }
  return { upload, uploading, error }
}

function DropZone({
  onFiles,
  accept,
  multiple,
  uploading,
  children,
  className,
}: {
  onFiles: (files: File[]) => void
  accept: string
  multiple?: boolean
  uploading: boolean
  children: React.ReactNode
  className?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [over, setOver] = useState(false)
  return (
    <>
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          if (!e.dataTransfer.types.includes("Files")) return
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          if (!e.dataTransfer.files.length) return
          e.preventDefault()
          setOver(false)
          onFiles(Array.from(e.dataTransfer.files))
        }}
        className={cn(
          "grid place-items-center border border-dashed text-center text-[0.8125rem] transition-colors disabled:cursor-wait",
          over ? "border-amber bg-amber/10 text-ink" : "border-hairline text-muted hover:border-muted hover:text-ink",
          className,
        )}
      >
        {uploading ? (
          <span className="flex items-center gap-2">
            <Loader2 aria-hidden="true" className="size-4 animate-spin" /> Envoi…
          </span>
        ) : (
          children
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(Array.from(e.target.files))
          e.target.value = ""
        }}
      />
    </>
  )
}

function FileInput({ id, value, onChange, kind }: { id?: string; value: string; onChange: (v: string) => void; kind: "image" | "file" }) {
  const { upload, uploading, error } = useUpload(kind === "image" ? "images" : "documents")
  const isImage = kind === "image" || /\.(png|jpe?g|webp|gif|avif)$/i.test(value)
  return (
    <div>
      <div className="flex gap-3">
        {value && isImage ? (
          <div className="relative size-24 shrink-0 overflow-hidden border border-hairline bg-asphalt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Aperçu" className="size-full object-cover" />
          </div>
        ) : (
          <DropZone
            onFiles={async (files) => {
              const [url] = await upload(files.slice(0, 1))
              if (url) onChange(url)
            }}
            accept={kind === "image" ? "image/*" : "image/*,application/pdf"}
            uploading={uploading}
            className="size-24 shrink-0 px-2"
          >
            {value ? "Remplacer" : "Déposer ou choisir"}
          </DropZone>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            id={id}
            type="text"
            className={cn(inputClass, "h-10 font-mono text-[0.8125rem]")}
            value={value}
            placeholder="/chemin/image.jpg ou https://…"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] font-bold">
            {value ? (
              <>
                <a href={value} target="_blank" rel="noreferrer" className="text-cobalt hover:text-ink">
                  Ouvrir ↗
                </a>
                {isImage ? (
                  <ReplaceLink
                    accept={kind === "image" ? "image/*" : "image/*,application/pdf"}
                    uploading={uploading}
                    onFiles={async (files) => {
                      const [url] = await upload(files.slice(0, 1))
                      if (url) onChange(url)
                    }}
                  />
                ) : null}
                <button type="button" onClick={() => onChange("")} className="text-muted hover:text-neon">
                  Retirer
                </button>
              </>
            ) : (
              <span className="font-normal text-muted">Glisse un fichier sur le cadre, ou colle une adresse.</span>
            )}
          </div>
        </div>
      </div>
      {error ? <p role="alert" className="mt-2 text-[0.8125rem] text-neon">{error}</p> : null}
    </div>
  )
}

function ReplaceLink({ accept, uploading, onFiles }: { accept: string; uploading: boolean; onFiles: (f: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <button type="button" disabled={uploading} onClick={() => ref.current?.click()} className="text-cobalt hover:text-ink disabled:opacity-50">
        {uploading ? "Envoi…" : "Remplacer"}
      </button>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(Array.from(e.target.files))
          e.target.value = ""
        }}
      />
    </>
  )
}

function ImageList({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const { upload, uploading, error } = useUpload("gallery")
  const { move, rowProps, handleProps, overIndex } = useReorder(value, onChange)
  return (
    <div>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {value.map((url, i) => (
          <li
            key={`${url}-${i}`}
            {...rowProps(i)}
            {...handleProps(i)}
            className={cn(
              "group relative aspect-[4/3] cursor-grab overflow-hidden border bg-asphalt active:cursor-grabbing",
              overIndex === i ? "border-amber" : "border-hairline",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`Photo ${i + 1}`} className="pointer-events-none size-full object-cover" draggable={false} />
            {i === 0 ? (
              <span className="absolute left-0 top-0 bg-night px-1.5 py-0.5 text-[0.75rem] font-bold text-amber">Couverture</span>
            ) : null}
            <span className="absolute inset-x-0 bottom-0 flex justify-between bg-night/85 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
              <span className="flex">
                <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label={`Avancer la photo ${i + 1}`} className="grid size-7 place-items-center text-ink disabled:opacity-25">
                  <ArrowUp aria-hidden="true" className="size-3.5 -rotate-90" />
                </button>
                <button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1} aria-label={`Reculer la photo ${i + 1}`} className="grid size-7 place-items-center text-ink disabled:opacity-25">
                  <ArrowDown aria-hidden="true" className="size-3.5 -rotate-90" />
                </button>
              </span>
              <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label={`Retirer la photo ${i + 1}`} className="grid size-7 place-items-center text-ink hover:text-neon">
                <X aria-hidden="true" className="size-3.5" />
              </button>
            </span>
          </li>
        ))}
        <li>
          <DropZone
            onFiles={async (files) => {
              const urls = await upload(files)
              if (urls.length) onChange([...value, ...urls])
            }}
            accept="image/*"
            multiple
            uploading={uploading}
            className="aspect-[4/3] w-full px-2"
          >
            + Ajouter des photos
          </DropZone>
        </li>
      </ul>
      {error ? <p role="alert" className="mt-2 text-[0.8125rem] text-neon">{error}</p> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Liste d'objets                                                       */
/* ------------------------------------------------------------------ */

function ObjectList({ field, value, onChange }: { field: Field; value: Record<string, any>[]; onChange: (v: Record<string, any>[]) => void }) {
  const itemFields = field.itemFields ?? []
  const visible = itemFields.filter((f) => !f.hidden)
  const { move, rowProps, handleProps, overIndex } = useReorder(value, onChange)
  const update = (i: number, name: string, v: any) => onChange(value.map((item, j) => (j === i ? { ...item, [name]: v } : item)))
  const add = () => {
    const item: Record<string, any> = {}
    itemFields.forEach((f) => (item[f.name] = emptyValue(f)))
    onChange([...value, item])
  }
  const single = visible.length === 1 && visible[0].type === "text"

  return (
    <div>
      {value.length > 0 ? (
        <ol className="border border-hairline">
          {value.map((item, i) => {
            const name = String(item[visible[0]?.name] ?? "") || `élément ${i + 1}`
            return (
              <li
                key={i}
                {...rowProps(i)}
                className={cn("flex items-start gap-1 border-b border-hairline pr-1 last:border-b-0", overIndex === i && "bg-amber/10")}
              >
                <Handle {...handleProps(i)} className="mt-1 hidden size-8 shrink-0 cursor-grab place-items-center text-muted hover:text-ink sm:grid" />
                {single ? (
                  <input
                    type="text"
                    value={item[visible[0].name] ?? ""}
                    aria-label={`${visible[0].label} ${i + 1}`}
                    placeholder={visible[0].label}
                    onChange={(e) => update(i, visible[0].name, e.target.value)}
                    className="h-10 min-w-0 flex-1 bg-transparent px-2 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:outline-none sm:px-1"
                  />
                ) : (
                  <div className="grid min-w-0 flex-1 gap-3 py-3 pl-2 sm:grid-cols-2 sm:pl-0">
                    {visible.map((f) => (
                      <div key={f.name} className={f.type === "textarea" || f.type === "image" ? "sm:col-span-2" : ""}>
                        <p className="mb-1.5 text-[0.75rem] font-bold text-muted">{f.label}</p>
                        <FieldInput field={f} value={item[f.name]} onChange={(v) => update(i, f.name, v)} />
                      </div>
                    ))}
                  </div>
                )}
                <span className="mt-1 flex">
                  <MoveButtons index={i} count={value.length} move={move} label={name} />
                  <RemoveButton onClick={() => onChange(value.filter((_, j) => j !== i))} label={name} />
                </span>
              </li>
            )
          })}
        </ol>
      ) : null}
      <button type="button" onClick={add} className="mt-2 text-[0.8125rem] font-bold text-cobalt hover:text-ink">
        + Ajouter {field.addLabel ?? "un élément"}
      </button>
    </div>
  )
}
