"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import CertificatePreview from "@/components/certificate-preview"
import { Container, SectionHead, Star as StarIcon, type Accent } from "@/components/kit"
import { burst, glitter, useHolo } from "@/components/motion"
import { useTable } from "@/lib/use-portfolio"
import { awardsFallback, certificationsFallback, type AwardRow, type CertificationRow } from "@/lib/fallback-data"
import { clean, cn, splitRank } from "@/lib/utils"

const CARD_COLORS: Accent[] = ["orange", "bleu", "vert", "sapin", "jaune"]

export default function Awards() {
  const awards = useTable<AwardRow>("awards", awardsFallback)
  const certifications = useTable<CertificationRow>("certifications", certificationsFallback)

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

  return (
    <section ref={section} id="awards" aria-labelledby="awards-title" className="field-noir relative overflow-hidden py-[clamp(5rem,11vw,9rem)]">
      <Container>
        <SectionHead
          id="awards"
          title="Les"
          mark="victoires"
          markColor="orange"
          data={`${awards.length} prix · ${certifications.length} certifications`}
          dataColor="blanc"
        >
          Hackathons, compétitions, concours : la plupart remportés comme chef d&apos;équipe.
        </SectionHead>

        {firsts.length > 0 ? (
          <ol className="grid gap-5 md:grid-cols-2">
            {firsts.map(({ a, r }, i) => (
              <FirstPrize key={`${a.title}-${i}`} award={a} rank={r} index={i} />
            ))}
          </ol>
        ) : null}

        {others.length > 0 ? (
          <ol className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(({ a, r }, i) => (
              <Prize key={`${a.title}-${i}`} award={a} rank={r} color={CARD_COLORS[i % CARD_COLORS.length]} index={i} />
            ))}
          </ol>
        ) : null}

        {certifications.length > 0 ? (
          <div className="mt-24">
            <h3 data-reveal="rise" className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
              Certifications
            </h3>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  data-reveal="rise"
                  style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
                  className={cn(
                    "relative flex flex-col rounded-[22px] bg-blanc p-5 text-noir shadow-[var(--lift)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)]",
                    c.certificateUrl && "cursor-pointer hover:-translate-y-1 hover:shadow-[var(--lift-hi)]",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn("sticker px-3 py-1.5 text-[0.875rem]", `s-${CARD_COLORS[i % CARD_COLORS.length]}`)}
                      style={{ "--cut": "3px", "--r": "-3deg" } as React.CSSProperties}
                    >
                      {clean(c.provider)}
                    </span>
                    <span className="text-[0.875rem] font-bold tabular-nums">{clean(c.year)}</span>
                  </div>
                  <p className="mt-4 font-display text-[1.25rem] font-extrabold leading-tight tracking-[-0.01em]">{clean(c.name)}</p>
                  {c.skills?.length ? <p className="mt-1.5 text-[0.875rem] font-semibold text-gris">{c.skills.map(clean).join(" · ")}</p> : null}
                  <p className="mt-auto flex gap-4 pt-4 text-[1rem] font-bold">
                    {c.certificateUrl ? (
                      // Le bouton couvre toute la carte : un clic n'importe où ouvre l'aperçu.
                      <button
                        type="button"
                        onClick={() => setPreview(c)}
                        className="cursor-pointer underline decoration-orange decoration-[3px] underline-offset-4 after:absolute after:inset-0 after:rounded-[22px] after:content-[''] hover:decoration-noir"
                      >
                        Voir le certificat
                      </button>
                    ) : null}
                    {c.verificationUrl ? (
                      <a href={c.verificationUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 underline decoration-bleu decoration-[3px] underline-offset-4 hover:decoration-noir">
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

/** Premier prix : le dégradé qui dérive doucement, reflet au pointeur, confettis au clic. */
function FirstPrize({ award: a, rank: r, index }: { award: AwardRow; rank: Rank; index: number }) {
  const holo = useHolo<HTMLButtonElement>(4)
  return (
    <li data-reveal="rise" style={{ "--d": `${index * 120}ms` } as React.CSSProperties}>
      <button
        ref={holo}
        type="button"
        onClick={(e) => burst(e.clientX, e.clientY)}
        className="holo holo-clean holo-idle block h-full w-full cursor-pointer rounded-[24px] p-6 text-left shadow-[var(--lift-hi)] transition-transform duration-300 ease-out md:p-7"
        aria-label={`${clean(a.title)}, ${clean(a.date)}. Lancer les confettis`}
      >
        <span className="flex items-start justify-between gap-4">
          <Rank n={1} suffix="er" className="text-[clamp(3.75rem,6vw,5rem)]" />
          <span className="rounded-full bg-noir px-3 py-1.5 text-[0.875rem] font-bold text-blanc tabular-nums">{clean(a.date)}</span>
        </span>
        <span className="mt-5 block font-display text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">
          {r.kind} · {r.rest}
        </span>
        <span className="mt-2 block max-w-[48ch] text-[1rem] font-semibold leading-relaxed">{clean(a.description)}</span>
        {a.details?.length ? (
          <span className="mt-4 flex flex-wrap gap-2">
            {a.details.map((d) => (
              <span key={d} className="rounded-full bg-blanc/75 px-3 py-1 text-[0.8125rem] font-bold">
                {clean(d)}
              </span>
            ))}
          </span>
        ) : null}
      </button>
    </li>
  )
}

/** Autres prix : un aplat de couleur, droit et compact, qui prend la lumière au pointeur. */
function Prize({ award: a, rank: r, color, index }: { award: AwardRow; rank: Rank; color: Accent; index: number }) {
  const card = useHolo<HTMLDivElement>(4)
  return (
    <li data-reveal="rise" style={{ "--d": `${(index % 3) * 100}ms` } as React.CSSProperties}>
      <div
        ref={card}
        className={cn("shine relative h-full overflow-hidden rounded-[22px] p-6 shadow-[var(--lift)] transition-transform duration-300 ease-out", `field-${color}`)}
      >
        <div className="flex items-start justify-between gap-4">
          {r.n ? <Rank n={r.n} suffix={r.suffix} className="text-[3.25rem]" /> : <StarIcon className="size-12" />}
          <p className="text-soft pt-1 text-[0.875rem] font-bold tabular-nums">{clean(a.date)}</p>
        </div>
        <h3 className="mt-5 font-display text-[1.25rem] font-extrabold leading-snug tracking-[-0.01em]">
          {r.n ? `${r.kind} · ${r.rest}` : r.rest}
        </h3>
        <p className="text-soft mt-2 text-[0.9375rem] font-medium leading-relaxed">{clean(a.description)}</p>
        {a.details?.length ? (
          <ul className="mt-3 space-y-1">
            {a.details.map((d) => (
              <li key={d} className="grid grid-cols-[1.1rem_1fr] text-[0.875rem] font-semibold">
                <span aria-hidden="true">→</span>
                {clean(d)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
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
