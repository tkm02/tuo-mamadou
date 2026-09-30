"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import CertificatePreview from "@/components/certificate-preview"
import { Container, Star as StarIcon, Sticker } from "@/components/kit"
import { glitter } from "@/components/motion"
import { TrophyShelf } from "@/components/trophy"
import { useSiteContent, useTable } from "@/lib/use-portfolio"
import { awardsFallback, awardsSectionFallback, certificationsFallback, type AwardRow, type CertificationRow } from "@/lib/fallback-data"
import { clean, cn, splitRank } from "@/lib/utils"

export default function Awards() {
  const awards = useTable<AwardRow>("awards", awardsFallback)
  const certifications = useTable<CertificationRow>("certifications", certificationsFallback)
  const content = useSiteContent("awards", awardsSectionFallback)
  const background = clean(content.backgroundImage ?? "")

  const ranked = awards.map((a) => ({ a, r: splitRank(a.title) }))
  const firsts = ranked.filter(({ r }) => r.n === 1)
  const others = ranked.filter(({ r }) => r.n !== 1)

  // Paillettes à chaque arrivée sur la section, pas plus d'une fois toutes les 8 secondes.
  const [preview, setPreview] = useState<CertificationRow | null>(null)
  const section = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = section.current
    if (!el) return
    let lastFire = -Infinity
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || performance.now() - lastFire < 8000) return
        lastFire = performance.now()
        glitter()
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const stats = [
    { value: awards.length, label: "distinctions" },
    { value: firsts.length, label: firsts.length > 1 ? "premiers prix" : "premier prix" },
    { value: certifications.length, label: "certifications" },
  ].filter((s) => s.value > 0)

  // « 2022 – 2026 » : de la plus ancienne à la plus récente année citée dans les dates.
  const years = awards.flatMap((a) => (clean(a.date).match(/\d{4}/g) ?? []).map(Number))
  const span = years.length ? `${Math.min(...years)} – ${Math.max(...years)}` : ""

  return (
    <section
      ref={section}
      id="awards"
      aria-labelledby="awards-title"
      className="field-orange vitrine relative isolate overflow-hidden py-[clamp(5rem,11vw,9rem)]"
    >
      <Container>
        {/* En-tête sur toute la largeur : le titre à gauche, les chiffres à droite. */}
        <header className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-reveal="rise" className="text-[0.8125rem] font-bold uppercase tracking-[0.22em]">
              Palmarès{span ? ` · ${span}` : ""}
            </p>
            <h2
              id="awards-title"
              data-reveal="rise"
              className="mt-4 font-display text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
            >
              Les{" "}
              <span className="marker" style={{ "--mk": "var(--blanc)" } as React.CSSProperties}>
                victoires
              </span>
            </h2>
            <p data-reveal="rise" style={{ "--d": "100ms" } as React.CSSProperties} className="text-soft mt-5 max-w-[44ch] text-[1.125rem] font-medium leading-[1.5]">
              Hackathons, compétitions, concours : la plupart remportés comme chef d&apos;équipe.
            </p>
          </div>

          {stats.length ? (
            <dl data-reveal="rise" style={{ "--d": "160ms" } as React.CSSProperties} className="flex flex-wrap gap-x-8 gap-y-3 lg:mb-2">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-2">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[clamp(2.5rem,4vw,3.25rem)] font-extrabold leading-none text-blanc tabular-nums [text-shadow:0_2px_0_var(--orange-deep)]">
                    {s.value}
                  </dd>
                  <dd className="text-[0.9375rem] font-bold">{s.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        {/* La scène : les premiers prix à gauche, la photo des trophées à droite dans son cadre blanc. */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {firsts.length > 0 ? (
            <ol className={cn("grid gap-5", !background && "md:grid-cols-2 lg:col-span-2")}>
              {firsts.map(({ a }, i) => (
                <FirstPrize key={`${a.title}-${i}`} award={a} index={i} />
              ))}
            </ol>
          ) : null}

          {background ? (
            <figure data-reveal="rise" style={{ "--d": "200ms" } as React.CSSProperties} className="relative -order-1 lg:order-none">
              <div className="photo-sticker" style={{ "--r": "2deg" } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={background} alt="Les trophées remportés" className="aspect-[4/3] w-full object-cover" />
              </div>
              <Sticker color="noir" tilt={-6} className="absolute -bottom-4 left-6 md:left-10">
                Ma vitrine
              </Sticker>
            </figure>
          ) : null}
        </div>
      </Container>

      <Container>
        {content.trophies?.length ? (
          <div className="mt-20">
            <div className="flex items-center gap-5">
              <h3 data-reveal="rise" className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-none tracking-[-0.02em]">
                Les trophées
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-noir/25" />
            </div>
            <TrophyShelf trophies={content.trophies} className="mt-8" />
          </div>
        ) : null}

        {others.length > 0 ? (
          <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(({ a, r }, i) => (
              <Prize key={`${a.title}-${i}`} award={a} rank={r} index={i} />
            ))}
          </ol>
        ) : null}

        {certifications.length > 0 ? (
          <div className="mt-20">
            <div className="flex items-center gap-5">
              <h3 data-reveal="rise" className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-none tracking-[-0.02em]">
                Certifications
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-noir/25" />
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  data-reveal="rise"
                  style={{ "--d": `${(i % 3) * 80}ms` } as React.CSSProperties}
                  className={cn("plaque flex flex-col p-5", c.certificateUrl && "cursor-pointer")}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-orange-deep">{clean(c.provider)}</span>
                    <span className="text-[0.8125rem] font-semibold text-gris tabular-nums">{clean(c.year)}</span>
                  </div>
                  <p className="mt-3 font-display text-[1.125rem] font-extrabold leading-snug tracking-[-0.01em]">{clean(c.name)}</p>
                  {c.skills?.length ? <p className="mt-1 text-[0.875rem] font-medium text-gris">{c.skills.map(clean).join(" · ")}</p> : null}
                  <p className="mt-auto flex gap-5 pt-4 text-[0.9375rem] font-bold">
                    {c.certificateUrl ? (
                      // Le bouton couvre toute la carte : un clic n'importe où ouvre l'aperçu.
                      <button
                        type="button"
                        onClick={() => setPreview(c)}
                        className="cursor-pointer underline decoration-orange decoration-2 underline-offset-[5px] after:absolute after:inset-0 after:content-[''] hover:text-orange-deep"
                      >
                        Voir le certificat
                      </button>
                    ) : null}
                    {c.verificationUrl ? (
                      <a
                        href={c.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 underline decoration-noir/30 decoration-2 underline-offset-[5px] hover:decoration-noir"
                      >
                        Vérifier ↗
                      </a>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>

      <CertificatePreview cert={preview} onClose={() => setPreview(null)} />
    </section>
  )
}

type Rank = ReturnType<typeof splitRank>

/** Premier prix : plaque au liseré orangé parcouru de lumière, le rang gravé à gauche, le récit à droite. */
function FirstPrize({ award: a, index }: { award: AwardRow; index: number }) {
  const r = splitRank(a.title)
  return (
    <li data-reveal="rise" style={{ "--d": `${200 + index * 120}ms` } as React.CSSProperties}>
      <article className="plaque plaque-vif grid grid-cols-[auto_1fr] gap-x-5 p-5 md:gap-x-6 md:p-6">
        <Rank n={1} suffix="er" className="metal metal-vif pt-1 text-[clamp(3.25rem,5vw,4.25rem)]" />
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-orange-deep">
            {r.kind} · {clean(a.date)}
          </p>
          <h3 className="mt-1.5 font-display text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em]">{r.rest}</h3>
          <p className="mt-1.5 text-[0.9375rem] font-medium leading-relaxed text-gris">{clean(a.description)}</p>
          {a.details?.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] font-semibold text-noir/80">
              {a.details.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-[0.55em] size-1 shrink-0 rounded-full bg-orange" />
                  {clean(d)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    </li>
  )
}

/** Autres prix : carte blanche, rang en noir. */
function Prize({ award: a, rank: r, index }: { award: AwardRow; rank: Rank; index: number }) {
  return (
    <li data-reveal="rise" style={{ "--d": `${(index % 3) * 90}ms` } as React.CSSProperties} className="h-full">
      <article className="plaque flex h-full flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          {r.n ? (
            <Rank n={r.n} suffix={r.suffix} className={cn("metal text-[2.75rem]", r.n === 1 ? "metal-vif" : "metal-noir")} />
          ) : (
            <StarIcon className="size-10 text-orange" />
          )}
          <p className="pt-1 text-[0.8125rem] font-semibold text-gris tabular-nums">{clean(a.date)}</p>
        </div>
        <h3 className="mt-4 font-display text-[1.125rem] font-extrabold leading-snug tracking-[-0.01em]">
          {r.n ? `${r.kind} · ${r.rest}` : r.rest}
        </h3>
        <p className="mt-1.5 text-[0.875rem] font-medium leading-relaxed text-gris">{clean(a.description)}</p>
      </article>
    </li>
  )
}

/** Rang : le chiffre énorme, le suffixe collé en haut à droite. */
function Rank({ n, suffix, className }: { n: number; suffix: string; className?: string }) {
  return (
    <span className={cn("block font-display font-extrabold leading-[0.8] tracking-[-0.05em]", className)}>
      {n}
      {/* Le haut des lettres du suffixe s'aligne sur le haut du chiffre. */}
      <span className="ml-[0.08em] align-[1.3em] text-[0.36em] tracking-normal">{suffix}</span>
    </span>
  )
}
