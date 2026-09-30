"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Container, FilterChip, SectionHead, Star, accentAt, tiltOf, type Accent } from "@/components/kit"
import { burst } from "@/components/motion"
import { TrophyStand } from "@/components/trophy"
import { useTable } from "@/lib/use-portfolio"
import { projectsFallback, type ProjectRow } from "@/lib/fallback-data"
import { clean, cn } from "@/lib/utils"

export default function Projects() {
  const projects = useTable<ProjectRow>("projects", projectsFallback)
  const [filter, setFilter] = useState("all")

  const categories = useMemo(() => [...new Set(projects.map((p) => clean(p.category) || "Autre"))], [projects])
  const colorOf = (p: ProjectRow): Accent => accentAt(Math.max(0, categories.indexOf(clean(p.category) || "Autre")))

  const list = filter === "all" ? projects : projects.filter((p) => (clean(p.category) || "Autre") === filter)
  const [featured, ...rest] = list
  const awarded = projects.filter((p) => p.award).length

  return (
    <section id="projects" aria-labelledby="projects-title" className="field-papier py-[clamp(5rem,11vw,9rem)]">
      <Container>
        <SectionHead
          id="projects"
          title="Projets"
          mark="livrés"
          markColor="jaune"
          data={`${projects.length} projets${awarded ? ` · ${awarded} primés` : ""}`}
          dataColor="jaune"
        />

        <div
          className="rail -mx-[clamp(1rem,4vw,3rem)] mb-14 flex gap-3 overflow-x-auto px-[clamp(1rem,4vw,3rem)] py-2 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          role="group"
          aria-label="Filtrer les projets"
        >
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")} count={projects.length}>
            Tout
          </FilterChip>
          {categories.map((c, i) => (
            <FilterChip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
              color={accentAt(i)}
              count={projects.filter((p) => (clean(p.category) || "Autre") === c).length}
            >
              {c}
            </FilterChip>
          ))}
        </div>

        {featured ? (
          <ProjectCase key={`f-${featured.title}`} project={featured} color={colorOf(featured)} featured />
        ) : (
          <p className="text-[1.25rem] font-semibold">Aucun projet dans cette catégorie.</p>
        )}

        {rest.length > 0 ? (
          <div className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-2">
            {rest.map((p, i) => (
              <div key={`${p.title}-${i}`} className={cn(i % 2 === 1 && "md:mt-28")}>
                <ProjectCase project={p} color={colorOf(p)} />
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  )
}

function ProjectCase({ project: p, color, featured = false }: { project: ProjectRow; color: Accent; featured?: boolean }) {
  const tech = (p.technologies ?? []).map(clean).filter(Boolean)
  const tilt = tiltOf(p.title, featured ? 1.5 : 2.5)
  return (
    <article className={cn("group", featured && "grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14")}>
      {/* Vitrine : un aplat de la couleur de la catégorie, la capture posée dessus. */}
      <div
        data-reveal="wipe"
        className={cn("relative rounded-[28px] p-[clamp(1rem,3vw,2.25rem)]", `field-${color}`, featured && "lg:col-span-7")}
      >
        {p.image ? (
          <div
            className="photo-sticker group-hover:shadow-[var(--lift-hi)] group-hover:[--r:0deg]"
            style={{ "--r": `${tilt}deg` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={`Capture du projet ${clean(p.title)}`}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>
        ) : (
          <StackSheet tech={tech} role={clean(p.role)} />
        )}

        {p.award && p.awardLabel ? (
          <button
            type="button"
            onClick={(e) => burst(e.clientX, e.clientY)}
            className="sticker sticker-peel s-noir absolute -right-3 -top-5 cursor-pointer px-4 py-2.5 text-[1rem] md:-right-5"
            style={{ "--r": "6deg", "--cut": "4px" } as React.CSSProperties}
            aria-label={`${clean(p.awardLabel)} : lancer les confettis`}
          >
            <Star className="size-4 text-jaune" />
            {clean(p.awardLabel)}
          </button>
        ) : null}
      </div>

      <div data-reveal="rise" className={cn(featured ? "lg:col-span-5" : "mt-7")}>
        <p className="flex flex-wrap items-center gap-3 text-[0.875rem] font-bold">
          <span className={cn("sticker px-3 py-1.5 text-[0.875rem]", `s-${color}`)} style={{ "--cut": "3px" } as React.CSSProperties}>
            {clean(p.category) || "Projet"}
          </span>
          <span className="tabular-nums">{clean(p.year)}</span>
          {p.role ? <span className="text-gris">· {clean(p.role)}</span> : null}
        </p>
        <h3
          className={cn(
            "mt-4 font-display font-extrabold tracking-[-0.03em]",
            featured ? "text-[clamp(2rem,4vw,3.5rem)] leading-[0.95]" : "text-[clamp(1.5rem,2.4vw,2rem)] leading-none",
          )}
        >
          {clean(p.title)}
        </h3>
        <p className="mt-4 max-w-[60ch] text-[1.0625rem] leading-relaxed">{clean(p.description)}</p>
        {tech.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {tech.slice(0, featured ? 14 : 8).map((t) => (
              <li key={t} className="rounded-full border-2 border-noir px-3 py-1 text-[0.875rem] font-bold">
                {t}
              </li>
            ))}
          </ul>
        ) : null}
        {p.demoUrl || p.githubUrl ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {p.demoUrl ? (
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-noir px-5 py-3 font-display text-[1rem] font-extrabold text-blanc transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
              >
                Voir le projet ↗
              </a>
            ) : null}
            {p.githubUrl ? (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-noir px-5 py-2.5 font-display text-[1rem] font-extrabold transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5"
              >
                Code source ↗
              </a>
            ) : null}
          </div>
        ) : null}
        {p.trophy ? (
          <TrophyStand
            src={p.trophy}
            title={clean(p.awardLabel) || "Projet primé"}
            caption={clean(p.year)}
            compact
            className="mt-8 [&_.trophy-stage]:[--stage:var(--blanc)] [&_.trophy-stage]:shadow-[var(--lift)]"
          />
        ) : null}
      </div>
    </article>
  )
}

/** Sans capture : une planche de stickers de la pile technique, jamais un rectangle gris. */
function StackSheet({ tech, role }: { tech: string[]; role: string }) {
  const shown = tech.slice(0, 9)
  return (
    <div className="flex aspect-[16/10] w-full flex-wrap content-center items-center justify-center gap-x-4 gap-y-5 p-6">
      {shown.length ? (
        shown.map((t, i) => (
          <span
            key={t}
            className={cn("sticker sticker-peel px-4 py-2.5 text-[clamp(0.875rem,1.6vw,1.25rem)]", `s-${["noir", "blanc", "jaune"][i % 3]}`)}
            style={{ "--r": `${tiltOf(t, 8)}deg` } as React.CSSProperties}
          >
            {t}
          </span>
        ))
      ) : (
        <span className="sticker s-noir px-5 py-3 text-[1.25rem]" style={{ "--r": "-4deg" } as React.CSSProperties}>
          {role || "Projet"}
        </span>
      )}
    </div>
  )
}
