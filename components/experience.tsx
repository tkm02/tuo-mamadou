"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import Lightbox from "@/components/lightbox"
import { Container, FilterChip, SectionHead, Sticker, type Accent } from "@/components/kit"
import { TrophyStand } from "@/components/trophy"
import { useTable } from "@/lib/use-portfolio"
import { educationFallback, experiencesFallback, type EducationRow, type ExperienceRow, type Proof } from "@/lib/fallback-data"
import { clean, cn, isOngoing } from "@/lib/utils"

const LEAD = /chef|lead|président|manager|directeur|coordinat/i
/** Sur l'aplat orange, l'orange disparaîtrait : on le saute. */
const TYPE_COLORS: Accent[] = ["jaune", "bleu", "sapin", "vert", "noir"]

function yearSpan(rows: { period?: string; year?: string }[]) {
  const years = rows.flatMap((r) => (`${r.period ?? ""} ${r.year ?? ""}`.match(/20\d\d/g) ?? []).map(Number))
  if (!years.length) return ""
  return `${Math.min(...years)} → ${Math.max(...years)}`
}

export default function Experience() {
  const experiences = useTable<ExperienceRow>("experiences", experiencesFallback)
  const education = useTable<EducationRow>("education", educationFallback)
  const [filter, setFilter] = useState<string>("all")
  const [selected, setSelected] = useState<number>(0)
  const [proofs, setProofs] = useState<Proof[] | null>(null)
  const [all, setAll] = useState(false)

  const types = useMemo(() => [...new Set(experiences.map((r) => clean(r.type) || "Mission"))], [experiences])
  const colorOf = (e: ExperienceRow) => TYPE_COLORS[Math.max(0, types.indexOf(clean(e.type) || "Mission")) % TYPE_COLORS.length]
  const leadCount = experiences.filter((e) => LEAD.test(e.role)).length

  const matching = experiences
    .map((e, index) => ({ e, index }))
    .filter(({ e }) =>
      filter === "all" ? true : filter === "lead" ? LEAD.test(e.role) : (clean(e.type) || "Mission") === filter,
    )
  // La mission affichée à droite reste dans le filtre courant.
  const current = matching.find((m) => m.index === selected) ?? matching[0]
  // Sur téléphone, la liste se replie après quelques missions ; sur grand écran elle défile.
  const LIMIT = 6
  const hiddenOnPhone = all ? 0 : Math.max(0, matching.length - LIMIT)

  const position = current ? matching.indexOf(current) : -1
  const listRef = useRef<HTMLDivElement>(null)
  const stepped = useRef(false)
  const step = (dir: -1 | 1) => {
    const next = matching[position + dir]
    if (!next) return
    if (position + dir >= LIMIT) setAll(true)
    stepped.current = true
    setSelected(next.index)
  }
  // Après précédent / suivant, la mission choisie reste visible dans la liste.
  useEffect(() => {
    if (!stepped.current) return
    stepped.current = false
    listRef.current
      ?.querySelector<HTMLElement>('[aria-current="true"]')
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [selected])

  return (
    <section id="experience" aria-labelledby="experience-title" className="field-orange py-[clamp(5rem,11vw,9rem)]">
      <Container>
        <SectionHead
          id="experience"
          title="Ce que j'ai"
          mark="mené"
          markColor="blanc"
          data={`${experiences.length} missions · ${yearSpan(experiences)}`}
          dataColor="noir"
        />

        <div
          className="rail -mx-[clamp(1rem,4vw,3rem)] mb-8 flex gap-3 overflow-x-auto px-[clamp(1rem,4vw,3rem)] py-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          role="group"
          aria-label="Filtrer les missions"
        >
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} count={experiences.length}>
            Tout
          </FilterChip>
          {leadCount > 0 ? (
            <FilterChip active={filter === "lead"} onClick={() => setFilter("lead")} count={leadCount}>
              Pilotage
            </FilterChip>
          ) : null}
          {types.map((t) => (
            <FilterChip
              key={t}
              active={filter === t}
              onClick={() => setFilter(t)}
              count={experiences.filter((e) => (clean(e.type) || "Mission") === t).length}
            >
              {t}
            </FilterChip>
          ))}
        </div>

        {/* Liste compacte à gauche, détail de la mission choisie à droite. */}
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-[0.875rem] font-bold tabular-nums" aria-live="polite">
                Mission {position + 1} / {matching.length}
              </p>
              <div className="flex gap-2">
                <StepButton label="Mission précédente" disabled={position <= 0} onClick={() => step(-1)} dir="up" />
                <StepButton label="Mission suivante" disabled={position >= matching.length - 1} onClick={() => step(1)} dir="down" />
              </div>
            </div>
          <div ref={listRef} className="rail lg:-m-2 lg:max-h-[min(46rem,calc(100vh-11rem))] lg:overflow-y-auto lg:p-2">
            <ul className="flex flex-col gap-3" aria-label="Missions">
              {matching.map(({ e, index }, k) => {
                const isOn = current?.index === index
                return (
                  <li key={`${e.company}-${index}`} className={cn(k >= LIMIT && !all && "hidden lg:block")}>
                    <button
                      type="button"
                      aria-current={isOn ? "true" : undefined}
                      aria-controls="mission-detail"
                      onClick={() => setSelected(index)}
                      className={cn(
                        "group flex w-full items-start gap-4 rounded-[22px] p-4 text-left shadow-[var(--lift)] outline-none focus-visible:-translate-y-0.5 focus-visible:shadow-[0_0_0_3px_var(--blanc),var(--lift-hi)] transition-[background-color,color,transform,box-shadow] duration-300 ease-[var(--ease-out-expo)]",
                        isOn ? "bg-noir text-blanc shadow-[var(--lift-hi)]" : "bg-blanc text-noir hover:-translate-y-0.5 hover:shadow-[var(--lift-hi)]",
                      )}
                    >
                      <Initial company={clean(e.company)} color={isOn && colorOf(e) === "noir" ? "blanc" : colorOf(e)} />
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 font-display text-[1.0625rem] font-extrabold leading-snug tracking-[-0.01em]">
                          {clean(e.role)}
                        </span>
                        <span className={cn("mt-0.5 block truncate text-[0.875rem] font-semibold", isOn ? "opacity-75" : "text-gris")}>
                          {clean(e.company)}
                        </span>
                        <span className={cn("mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem] font-semibold", isOn ? "opacity-75" : "text-gris")}>
                          {isOngoing(e.period) ? (
                            <span className={cn("flex items-center gap-1.5 font-bold", isOn ? "text-blanc" : "text-noir")}>
                              <span aria-hidden="true" className="live-dot size-2 rounded-full" />
                              En cours
                            </span>
                          ) : (
                            <span>{clean(e.duration) || clean(e.period)}</span>
                          )}
                          <span aria-hidden="true">·</span>
                          <span>{clean(e.type) || "Mission"}</span>
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1 hidden font-display text-[1.25rem] font-extrabold transition-transform duration-300 lg:block",
                          isOn ? "translate-x-0 text-orange" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                        )}
                      >
                        →
                      </span>
                    </button>

                    {/* Sur téléphone, le détail s'ouvre sous la mission choisie. */}
                    {isOn ? (
                      <div className="mt-3 lg:hidden">
                        <MissionDetail e={e} color={colorOf(e)} onProofs={setProofs} />
                      </div>
                    ) : null}
                  </li>
                )
              })}
            </ul>

          </div>

            {hiddenOnPhone > 0 ? (
              <div className="mt-6 flex justify-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setAll(true)}
                  className="sticker sticker-peel s-noir cursor-pointer px-6 py-3.5 text-[1rem]"
                  style={{ "--r": "-2deg" } as React.CSSProperties}
                >
                  Voir les {hiddenOnPhone} autres missions ↓
                </button>
              </div>
            ) : null}
          </div>

          <div id="mission-detail" aria-live="polite" className="hidden lg:sticky lg:top-28 lg:block">
            {current ? (
              <MissionDetail key={current.index} e={current.e} color={colorOf(current.e)} onProofs={setProofs} />
            ) : (
              <p className="text-[1.25rem] font-semibold">Aucune mission dans ce filtre.</p>
            )}
          </div>
        </div>

        {education.length > 0 ? (
          <div className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h3 data-reveal="rise" className="font-display text-[clamp(2.75rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
                Formation
              </h3>
              <Sticker color="noir" tilt={3} reveal="slap">
                {yearSpan(education)}
              </Sticker>
            </div>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {education.map((ed, i) => {
                const ongoing = isOngoing(ed.status)
                return (
                  <li
                    key={`${ed.degree}-${i}`}
                    data-reveal="toss"
                    className="photo-sticker flex flex-col p-6 text-noir"
                    style={{ "--r": `${[-2, 1.5, -1, 2][i % 4]}deg`, "--d": `${i * 90}ms`, "--tx": `${(i - 1.5) * 30}px` } as React.CSSProperties}
                  >
                    <p className="font-display text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">{clean(ed.degree)}</p>
                    <p className="mt-2 text-[1rem] leading-snug">{clean(ed.fullDegree)}</p>
                    <p className="mt-3 text-[0.875rem] font-semibold text-gris">
                      {clean(ed.school)}, {clean(ed.location)}
                    </p>
                    <p className="mt-auto flex flex-wrap items-center gap-2 pt-5 text-[0.875rem] font-bold tabular-nums">
                      {clean(ed.year)}
                      {ed.status ? (
                        <span
                          className={cn("sticker px-2.5 py-1 text-[0.875rem]", ongoing ? "s-vert" : "s-jaune")}
                          style={{ "--cut": "2px" } as React.CSSProperties}
                        >
                          {clean(ed.status)}
                        </span>
                      ) : null}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </Container>

      <Lightbox images={proofs} heading="Preuves de la mission" onClose={() => setProofs(null)} />
    </section>
  )
}

/** Pastille d'initiale : remplace les emoji-logos par une lettre sur la couleur du type. */
function Initial({ company, color }: { company: string; color: Accent }) {
  const letter = (company.match(/[A-Za-zÀ-ÿ0-9]/)?.[0] ?? "·").toUpperCase()
  return (
    <span
      aria-hidden="true"
      className={cn("grid size-12 shrink-0 place-items-center rounded-[14px] font-display text-[1.25rem] font-extrabold", `s-${color}`)}
      style={{ background: "var(--s-bg)", color: "var(--s-fg)" }}
    >
      {letter}
    </span>
  )
}

/** Fiche détaillée d'une mission : panneau blanc à droite (ou sous la mission sur téléphone). */
function MissionDetail({
  e,
  color,
  onProofs,
}: {
  e: ExperienceRow
  color: Accent
  onProofs: (p: Proof[]) => void
}) {
  const ongoing = isOngoing(e.period)
  return (
    <article data-reveal="rise" className="rounded-[28px] bg-blanc p-6 text-noir shadow-[var(--lift-hi)] md:p-9">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2">
            <span className={cn("sticker px-3 py-1.5 text-[0.875rem]", `s-${color}`)} style={{ "--cut": "3px" } as React.CSSProperties}>
              {clean(e.type) || "Mission"}
            </span>
            {ongoing ? (
              <span className="flex items-center gap-1.5 text-[0.875rem] font-bold">
                <span aria-hidden="true" className="live-dot size-2 rounded-full" />
                En cours
              </span>
            ) : null}
          </p>
          <h3 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">
            {clean(e.role)}
          </h3>
          <p className="mt-1.5 text-[1.0625rem] font-bold">{clean(e.company)}</p>
        </div>
        {e.impact ? (
          <div className="hidden shrink-0 flex-col items-end gap-1.5 text-right sm:flex">
            <span className="sticker s-orange px-3.5 py-2 text-[1.5rem] tracking-[-0.02em]" style={{ "--r": "-3deg", "--cut": "3px" } as React.CSSProperties}>
              {clean(e.impact)}
            </span>
            {e.impactLabel ? <span className="max-w-[9rem] text-[0.875rem] font-semibold leading-tight text-gris">{clean(e.impactLabel)}</span> : null}
          </div>
        ) : null}
      </div>

      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.875rem] font-semibold text-gris">
        {e.period ? <span>{clean(e.period)}{e.duration ? ` · ${clean(e.duration)}` : ""}</span> : null}
        {e.location ? <span>{clean(e.location)}</span> : null}
      </p>

      {e.description ? <p className="mt-6 max-w-[64ch] text-[1.0625rem] leading-relaxed">{clean(e.description)}</p> : null}

      {e.achievements?.length ? (
        <>
          <p className="mt-7 font-display text-[1.0625rem] font-extrabold">Réalisations clés</p>
          <ul className="mt-3 space-y-2.5">
            {e.achievements.map((a) => (
              <li key={a} className="grid grid-cols-[1.5rem_1fr] text-[1rem] leading-relaxed">
                <span aria-hidden="true" className="font-extrabold text-orange-deep">
                  →
                </span>
                {clean(a)}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {e.technologies?.length ? (
        <>
          <p className="mt-7 font-display text-[1.0625rem] font-extrabold">Stack technique</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
            {e.technologies.map((t) => (
              <li key={t} className="rounded-full border-2 border-noir px-3 py-1 text-[0.875rem] font-bold">
                {clean(t)}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {e.proofs?.length ? (
        <button
          type="button"
          onClick={() => onProofs(e.proofs)}
          className="mt-7 rounded-full bg-noir px-5 py-3 font-display text-[1rem] font-extrabold text-blanc transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
        >
          Voir les preuves ({e.proofs.length})
        </button>
      ) : null}

      {/* L'espace du trophée, en bas de la fiche. */}
      {e.trophy ? (
        <TrophyStand
          src={e.trophy}
          title={[clean(e.impact), clean(e.impactLabel)].filter(Boolean).join(" ") || clean(e.role)}
          caption={[clean(e.company), clean(e.period)].filter(Boolean).join(" · ")}
          className="mt-8 border-t-2 border-noir/10 pt-8"
        />
      ) : null}
    </article>
  )
}

/** Bouton carré précédent / suivant, au-dessus de la liste des missions. */
function StepButton({
  label,
  dir,
  disabled,
  onClick,
}: {
  label: string
  dir: "up" | "down"
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-[14px] border-2 border-noir bg-blanc outline-none focus-visible:bg-noir focus-visible:text-blanc text-noir shadow-[var(--lift)] transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:bg-noir hover:text-blanc disabled:pointer-events-none disabled:border-transparent disabled:bg-blanc/35 disabled:text-noir/40 disabled:shadow-none"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-5", dir === "down" && "rotate-180")}>
        <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
