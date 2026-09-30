"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Boutons                                                             */
/* ------------------------------------------------------------------ */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md"
  loading?: boolean
}

export function Button({ variant = "secondary", size = "md", loading, className, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-bold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        size === "md" ? "h-10 px-4 text-[0.9375rem]" : "h-8 px-3 text-[0.8125rem]",
        variant === "primary" &&
          "bg-amber text-night hover:bg-amber-deep disabled:bg-asphalt-raised disabled:text-muted disabled:opacity-100",
        variant === "secondary" && "border border-hairline bg-asphalt text-ink hover:border-muted",
        variant === "ghost" && "text-text hover:bg-asphalt-raised hover:text-ink",
        variant === "danger" && "border border-neon/40 text-neon hover:bg-neon hover:text-night",
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : null}
      {children}
    </button>
  )
}

/** Bouton destructif en deux temps : un premier clic arme, le second confirme. */
export function ConfirmButton({
  onConfirm,
  label,
  confirmLabel = "Confirmer la suppression",
  size = "md",
  className,
}: {
  onConfirm: () => void | Promise<void>
  label: string
  confirmLabel?: string
  size?: "sm" | "md"
  className?: string
}) {
  const [armed, setArmed] = useState(false)
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    if (!armed) return
    const t = setTimeout(() => setArmed(false), 4000)
    return () => clearTimeout(t)
  }, [armed])
  return (
    <Button
      size={size}
      variant={armed ? "danger" : "ghost"}
      loading={busy}
      className={cn(!armed && "text-muted hover:text-neon", className)}
      onClick={async () => {
        if (!armed) return setArmed(true)
        setBusy(true)
        await onConfirm()
        setBusy(false)
        setArmed(false)
      }}
    >
      {armed ? confirmLabel : label}
    </Button>
  )
}

/* ------------------------------------------------------------------ */
/* En-tête de page                                                     */
/* ------------------------------------------------------------------ */

export function PageHeader({
  title,
  meta,
  actions,
  children,
}: {
  title: string
  meta?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-[2.5rem] font-extrabold uppercase leading-[0.95] text-ink">{title}</h1>
        {meta ? <p className="mt-2 font-mono text-[0.8125rem] text-muted">{meta}</p> : null}
        {children}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Notifications                                                       */
/* ------------------------------------------------------------------ */

type Toast = { id: number; tone: "success" | "error" | "info"; text: string }
const ToastContext = createContext<(text: string, tone?: Toast["tone"]) => void>(() => {})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)
  const push = useCallback((text: string, tone: Toast["tone"] = "success") => {
    const id = ++nextId.current
    setToasts((t) => [...t, { id, tone, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === "error" ? 7000 : 3000)
  }, [])
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <p
            key={t.id}
            className={cn(
              "pointer-events-auto flex max-w-md items-center gap-3 border bg-night px-4 py-3 text-[0.9375rem] shadow-[0_8px_24px_rgba(0,0,0,0.45)] animate-in fade-in slide-in-from-bottom-2 duration-200",
              t.tone === "success" && "border-line-teal/50 text-ink",
              t.tone === "error" && "border-neon/60 text-ink",
              t.tone === "info" && "border-hairline text-ink",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-2 shrink-0 rounded-full",
                t.tone === "success" && "bg-line-teal",
                t.tone === "error" && "bg-neon",
                t.tone === "info" && "bg-cobalt",
              )}
            />
            {t.text}
          </p>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

/* ------------------------------------------------------------------ */
/* États                                                               */
/* ------------------------------------------------------------------ */

export function SkeletonRows({ rows = 5 }: { rows?: number }) {
  return (
    <ul aria-hidden="true" className="border-t border-hairline">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="flex items-center gap-4 border-b border-hairline py-4">
          <span className="size-10 shrink-0 animate-pulse bg-asphalt-raised" />
          <span className="flex-1 space-y-2">
            <span className="block h-3.5 w-1/2 animate-pulse bg-asphalt-raised" />
            <span className="block h-3 w-1/3 animate-pulse bg-asphalt" />
          </span>
        </li>
      ))}
    </ul>
  )
}

export function EmptyState({ title, children, action }: { title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="border border-dashed border-hairline px-6 py-12 text-center">
      <p className="text-[1.0625rem] font-bold text-ink">{title}</p>
      {children ? <div className="mx-auto mt-2 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted">{children}</div> : null}
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  )
}

export function Callout({ tone = "info", children }: { tone?: "info" | "error"; children: React.ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "border px-4 py-3 text-[0.9375rem] leading-relaxed",
        tone === "error" ? "border-neon/50 bg-neon/5 text-ink" : "border-hairline bg-asphalt text-text",
      )}
    >
      {children}
    </div>
  )
}

/** Raccourci clavier Ctrl/Cmd + S. */
export function useSaveShortcut(onSave: () => void, enabled: boolean) {
  const ref = useRef(onSave)
  ref.current = onSave
  useEffect(() => {
    if (!enabled) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault()
        ref.current()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [enabled])
}

/** Avertit avant de quitter la page avec des modifications non enregistrées. */
export function useLeaveGuard(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return
    const onBefore = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", onBefore)
    return () => window.removeEventListener("beforeunload", onBefore)
  }, [dirty])
}

export const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)
