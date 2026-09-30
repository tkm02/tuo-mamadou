"use client"

import type React from "react"
import { useMemo } from "react"
import { Container, SectionHead, accentAt, tiltOf, type Accent } from "@/components/kit"
import { useTable } from "@/lib/use-portfolio"
import {
  experiencesFallback,
  skillCategoriesFallback,
  toolsFallback,
  type ExperienceRow,
  type SkillCategoryRow,
  type ToolRow,
} from "@/lib/fallback-data"
import { clean, cn } from "@/lib/utils"

/** "React.js", "React js" et "React" désignent la même techno. */
function norm(s: string) {
  return clean(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\.js\b|\bjs\b|\borm\b|\bvanilla\b/g, "")
    .replace(/[^a-z0-9]/g, "")
}

type Skill = { name: string; uses: number }
type Sheet = { title: string; description: string; color: Accent; skills: Skill[] }

/** Sur l'aplat bleu, les planches prennent les autres couleurs. */
const SHEET_COLORS: Accent[] = ["orange", "jaune", "sapin", "noir", "vert"]

export default function Skills() {
  const categories = useTable<SkillCategoryRow>("skill_categories", skillCategoriesFallback)
  const tools = useTable<ToolRow>("tools", toolsFallback)
  const experiences = useTable<ExperienceRow>("experiences", experiencesFallback)

  const sheets: Sheet[] = useMemo(() => {
    const usage = new Map<string, number>()
    for (const e of experiences) {
      for (const t of new Set((e.technologies ?? []).map(norm))) usage.set(t, (usage.get(t) ?? 0) + 1)
    }
    return categories.map((c, i) => ({
      title: clean(c.title),
      description: clean(c.description),
      color: SHEET_COLORS[i % SHEET_COLORS.length],
      skills: (c.skills ?? []).map((s) => ({ name: clean(s.name), uses: usage.get(norm(s.name)) ?? 0 })),
    }))
  }, [categories, experiences])

  const count = sheets.reduce((n, s) => n + s.skills.length, 0)
  const toolGroups = useMemo(() => {
    const groups = new Map<string, string[]>()
    for (const t of tools) {
      const k = clean(t.category) || "Autres"
      groups.set(k, [...(groups.get(k) ?? []), clean(t.name)])
    }
    return [...groups.entries()]
  }, [tools])

  return (
    <section id="skills" aria-labelledby="skills-title" className="field-bleu py-[clamp(5rem,11vw,9rem)]">
      <Container>
        <SectionHead id="skills" title="La boîte à" mark="outils" markColor="orange" data={`${count} technos`} dataColor="jaune">
          Une planche par domaine. Les stickers marqués d&apos;un chiffre ont servi sur plusieurs missions réelles.
        </SectionHead>

        <ul className="columns-1 gap-6 md:columns-2 xl:columns-3">
          {sheets.map((sheet, i) => (
            <li
              key={sheet.title}
              data-reveal="rise"
              style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className="mb-6 break-inside-avoid rounded-[28px] bg-blanc p-6 text-noir shadow-[var(--lift-hi)] md:p-7"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={cn("sticker mt-1 size-4 shrink-0 rounded-full p-0", `s-${sheet.color}`)}
                  style={{ "--cut": "0px" } as React.CSSProperties}
                />
                <div>
                  <h3 className="font-display text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">{sheet.title}</h3>
                  {sheet.description ? <p className="mt-1 text-[1rem] font-medium text-gris">{sheet.description}</p> : null}
                </div>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-4" aria-label={sheet.title}>
                {sheet.skills.map((s, k) => {
                  const hub = s.uses >= 2
                  const color: Accent = hub ? sheet.color : k % 3 === 2 ? accentAt(i + k) : "blanc"
                  return (
                    <li
                      key={s.name}
                      data-reveal="slap"
                      className={cn(
                        "sticker sticker-peel px-3.5 py-2 text-[1rem]",
                        `s-${color === "blanc" ? "blanc" : color}`,
                        color === "blanc" && "outline-2 outline-noir",
                      )}
                      style={
                        {
                          "--r": `${tiltOf(s.name, 7)}deg`,
                          "--d": `${150 + k * 55}ms`,
                          "--cut": color === "blanc" ? "0px" : "4px",
                        } as React.CSSProperties
                      }
                    >
                      {s.name}
                      {hub ? (
                        <span
                          className="grid size-6 place-items-center rounded-full bg-blanc text-[0.875rem] text-noir"
                          title={`Utilisé sur ${s.uses} missions`}
                        >
                          <span className="sr-only">, utilisé sur </span>
                          {s.uses}
                          <span className="sr-only"> missions</span>
                        </span>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}

          {toolGroups.length > 0 ? (
            <li data-reveal="rise" className="mb-6 break-inside-avoid rounded-[28px] bg-noir p-6 text-blanc shadow-[var(--lift-hi)] md:p-7">
              <h3 className="font-display text-[1.5rem] font-extrabold leading-tight tracking-[-0.02em]">L&apos;atelier</h3>
              <p className="mt-1 text-[1rem] font-medium opacity-75">{tools.length} outils du quotidien</p>
              <dl className="mt-5 space-y-4">
                {toolGroups.map(([cat, names], i) => (
                  <div key={cat}>
                    <dt className="text-[0.875rem] font-bold opacity-75">{cat}</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {names.map((n) => (
                        <span
                          key={n}
                          className={cn("sticker sticker-peel px-3 py-1.5 text-[0.875rem]", `s-${accentAt(i)}`)}
                          style={{ "--cut": "3px", "--r": `${tiltOf(n, 4)}deg` } as React.CSSProperties}
                        >
                          {n}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ) : null}
        </ul>
      </Container>
    </section>
  )
}
