"use client"

import type React from "react"
import { useState } from "react"
import Lightbox, { type LightboxImage } from "@/components/lightbox"
import "./trophy.css"
import type { Trophy } from "@/lib/fallback-data"
import { clean, cn } from "@/lib/utils"

/**
 * Socle d'un trophée (PNG sans fond) : le trophée posé sur une étagère éclairée.
 * `compact` : socle étroit avec la légende à côté, pour les colonnes de projets.
 */
export function TrophyStand({
  src,
  title,
  caption,
  compact = false,
  className,
}: {
  src: string
  title: string
  caption?: string
  compact?: boolean
  className?: string
}) {
  return (
    <figure className={cn(compact ? "flex items-center gap-5" : "", className)}>
      <div className={cn("trophy-stage", compact ? "h-44 w-36 shrink-0" : "h-[clamp(15rem,26vw,20rem)]")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`Trophée : ${title}`} loading="lazy" className="trophy-img" />
      </div>
      <figcaption className={cn(compact ? "min-w-0" : "mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1")}>
        <span className="block text-[0.75rem] font-bold uppercase tracking-[0.18em] text-orange-deep">Le trophée</span>
        <span className={cn("font-display font-extrabold leading-snug", compact ? "mt-1 block text-[1.125rem]" : "text-[1rem]")}>
          {title}
        </span>
        {caption ? <span className={cn("text-[0.875rem] font-semibold text-gris", compact && "mt-0.5 block")}>{caption}</span> : null}
      </figcaption>
    </figure>
  )
}

/**
 * Vitrine des trophées (section Victoires) : un panneau blanc, les trophées en grand,
 * centrés, chacun avec son titre. Un clic ouvre la visionneuse pour les voir de près.
 */
export function TrophyShelf({ trophies, className }: { trophies: Trophy[]; className?: string }) {
  const items = trophies.filter((t) => clean(t.image ?? ""))
  const [open, setOpen] = useState<LightboxImage[] | null>(null)
  if (!items.length) return null

  const all = items.map((t) => ({ url: t.image, title: [clean(t.title), clean(t.caption)].filter(Boolean).join(", ") }))
  // La visionneuse s'ouvre sur le trophée cliqué, puis enchaîne sur les suivants.
  const show = (k: number) => setOpen([...all.slice(k), ...all.slice(0, k)])

  return (
    <div className={cn("rounded-[28px] bg-blanc px-5 py-10 text-noir shadow-[var(--lift-hi)] md:px-10 md:py-14", className)}>
      <ul className="flex flex-wrap items-start justify-center gap-x-4 gap-y-12 md:gap-x-8" aria-label="Trophées">
        {items.map((t, k) => (
          <li key={`${t.image}-${k}`} data-reveal="rise" style={{ "--d": `${k * 70}ms` } as React.CSSProperties} className="w-[9rem] md:w-[10rem]">
            <button
              type="button"
              onClick={() => show(k)}
              aria-label={`Voir en grand : ${clean(t.title)}`}
              className="trophy-pick group block w-full cursor-pointer rounded-[18px] outline-none focus-visible:shadow-[0_0_0_3px_var(--orange)]"
            >
              <span className="trophy-foot relative flex h-40 items-end justify-center md:h-52">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt="" loading="lazy" className="max-h-full w-auto object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5" />
              </span>
            </button>
            <p className="mt-4 text-center font-display text-[1rem] font-extrabold leading-snug">{clean(t.title)}</p>
            {t.caption ? <p className="mt-1 text-center text-[0.875rem] font-semibold leading-snug text-gris">{clean(t.caption)}</p> : null}
          </li>
        ))}
      </ul>
      <Lightbox images={open} light onClose={() => setOpen(null)} />
    </div>
  )
}
