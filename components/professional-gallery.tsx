"use client"

import type React from "react"
import { useMemo, useState } from "react"
import Lightbox, { type LightboxImage } from "@/components/lightbox"
import { Container, FilterChip, SectionHead, tiltOf, type Accent } from "@/components/kit"
import { useTable } from "@/lib/use-portfolio"
import { galleryFallback, type GalleryRow } from "@/lib/fallback-data"
import { clean, cn } from "@/lib/utils"

const LABELS: Record<string, string> = {
  events: "Événements",
  team: "Leadership",
  mentoring: "Mentorat",
}
const LABEL_COLORS: Accent[] = ["orange", "noir"]

type Open = { images: LightboxImage[]; heading: string; caption: string }

export default function ProfessionalGallery() {
  const items = useTable<GalleryRow>("gallery_items", galleryFallback)
  const [filter, setFilter] = useState("all")
  const [open, setOpen] = useState<Open | null>(null)

  const categories = useMemo(() => [...new Set(items.map((g) => g.category).filter(Boolean))], [items])
  const colorOf = (c: string) => LABEL_COLORS[Math.max(0, categories.indexOf(c)) % LABEL_COLORS.length]
  const list = (filter === "all" ? items : items.filter((g) => g.category === filter)).filter((g) =>
    (g.images ?? []).some(Boolean),
  )
  const photoCount = items.reduce((n, g) => n + (g.images?.length ?? 0), 0)

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="field-blanc overflow-hidden py-[clamp(5rem,11vw,9rem)]">
      <Container>
        <SectionHead id="gallery" title="Sur le" mark="terrain" markColor="orange" data={`${items.length} moments · ${photoCount} photos`} dataColor="orange">
          Hackathons, soutenances, panels et équipes : les moments où le travail est sorti de l&apos;écran.
        </SectionHead>

        {categories.length > 1 ? (
          <div
            className="rail -mx-[clamp(1rem,4vw,3rem)] mb-14 flex gap-3 overflow-x-auto px-[clamp(1rem,4vw,3rem)] py-2"
            role="group"
            aria-label="Filtrer les moments"
          >
            <FilterChip activeColor="orange" active={filter === "all"} onClick={() => setFilter("all")} count={items.length}>
              Tout
            </FilterChip>
            {categories.map((c) => (
              <FilterChip activeColor="orange" key={c} active={filter === c} onClick={() => setFilter(c)} count={items.filter((g) => g.category === c).length}>
                {LABELS[c] ?? c}
              </FilterChip>
            ))}
          </div>
        ) : null}

        {/* Mur de photos : colonnes décalées, chaque photo penche et pivote en traversant l'écran. */}
        <ul className="columns-1 gap-8 sm:columns-2 lg:columns-3">
          {list.map((g, i) => {
            const images = (g.images ?? []).filter(Boolean)
            const tilt = tiltOf(g.title, 4)
            const caption = [clean(g.date), clean(g.location)].filter(Boolean).join(" · ")
            return (
              <li key={`${g.title}-${i}`} className="mb-12 break-inside-avoid">
                <div className="scroll-sway">
                  <button
                    type="button"
                    data-reveal="toss"
                    onClick={() =>
                      setOpen({ images: images.map((url) => ({ url, title: g.title })), heading: clean(g.title), caption })
                    }
                    className="photo-sticker group relative block w-full cursor-zoom-in text-left text-noir shadow-[0_0_0_1px_var(--trait),var(--lift)] hover:[--r:0deg] hover:shadow-[0_0_0_1px_var(--trait),var(--lift-hi)]"
                    style={{ "--r": `${tilt}deg`, "--d": `${(i % 3) * 120}ms`, "--tx": `${(i % 3) - 1 === 0 ? 0 : ((i % 3) - 1) * 80}px` } as React.CSSProperties}
                    aria-label={`Ouvrir les ${images.length} photos : ${clean(g.title)}`}
                  >
                    <span className="relative block overflow-hidden rounded-[14px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={images[0]}
                        alt=""
                        loading="lazy"
                        className={cn(
                          "w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
                          i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]",
                        )}
                      />
                      {images.length > 1 ? (
                        <span className="absolute bottom-3 right-3 rounded-full bg-noir px-3 py-1.5 text-[0.875rem] font-bold text-blanc">
                          {images.length} photos
                        </span>
                      ) : null}
                    </span>
                    <span className="block px-2 pb-2 pt-4">
                      <span
                        className={cn("sticker px-3 py-1.5 text-[0.875rem]", `s-${colorOf(g.category)}`)}
                        style={{ "--cut": "3px", "--r": "-2deg" } as React.CSSProperties}
                      >
                        {LABELS[g.category] ?? g.category}
                      </span>
                      <span className="mt-3 block font-display text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">
                        {clean(g.title)}
                      </span>
                      {g.description ? <span className="mt-1.5 block text-[1rem] leading-relaxed">{clean(g.description)}</span> : null}
                      {caption ? <span className="mt-2 block text-[0.875rem] font-semibold text-gris">{caption}</span> : null}
                    </span>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>

      <Lightbox images={open?.images ?? null} heading={open?.heading} caption={open?.caption} onClose={() => setOpen(null)} />
    </section>
  )
}
