"use client"

import { useEffect, useRef, useState } from "react"
import { clean } from "@/lib/utils"

export type LightboxImage = { url: string; title?: string }

/** Visionneuse d'images sur <dialog> natif : focus piégé, Échap et flèches du clavier. */
export default function Lightbox({
  images,
  heading,
  caption,
  light = false,
  onClose,
}: {
  images: LightboxImage[] | null
  heading?: string
  caption?: string
  /** Fond blanc derrière l'image (PNG sans fond, comme les trophées). */
  light?: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [i, setI] = useState(0)
  const count = images?.length ?? 0

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (images && !d.open) {
      setI(0)
      d.showModal()
    } else if (!images && d.open) d.close()
  }, [images])

  useEffect(() => {
    if (!images || count < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((v) => (v + 1) % count)
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + count) % count)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [images, count])

  const img = images?.[i]

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(ev) => ev.target === ref.current && onClose()}
      aria-label={heading ?? "Visionneuse"}
      className="m-auto w-[min(72rem,94vw)] overflow-hidden rounded-[28px] bg-blanc p-0 text-noir shadow-[0_0_0_6px_var(--blanc),var(--lift-hi)] backdrop:bg-noir/80"
    >
      {img ? (
        <div>
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <p className="truncate font-display text-[1.25rem] font-extrabold tracking-[-0.01em]">
              {clean(heading ?? img.title ?? "")}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full bg-noir px-4 py-2 font-display text-[1rem] font-extrabold text-blanc"
            >
              Fermer
            </button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.url} alt={clean(img.title ?? heading ?? "")} className={`max-h-[72vh] w-full object-contain ${light ? "bg-blanc" : "bg-noir"}`} />
          {caption || count > 1 ? (
            <div className="flex items-center justify-between gap-4 px-5 py-4 text-[1rem]">
              {count > 1 ? (
                <button type="button" onClick={() => setI((i - 1 + count) % count)} className="rounded-full px-3 py-2 font-display font-extrabold hover:bg-jaune">
                  ← Précédente
                </button>
              ) : (
                <span />
              )}
              <span className="truncate text-center text-[0.875rem] font-semibold tabular-nums text-gris">
                {caption ? `${caption} · ` : ""}
                {count > 1 ? `${i + 1} / ${count}` : ""}
              </span>
              {count > 1 ? (
                <button type="button" onClick={() => setI((i + 1) % count)} className="rounded-full px-3 py-2 font-display font-extrabold hover:bg-jaune">
                  Suivante →
                </button>
              ) : (
                <span />
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </dialog>
  )
}
