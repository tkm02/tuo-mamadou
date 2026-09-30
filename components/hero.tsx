"use client"

import type React from "react"
import { Arrow, Container, PillLink } from "@/components/kit"
import { useSiteContent, useTable } from "@/lib/use-portfolio"
import { aboutFallback, experiencesFallback, heroFallback, type ExperienceRow } from "@/lib/fallback-data"
import { clean, isOngoing } from "@/lib/utils"

/**
 * Premier écran volontairement calme : fond blanc, noir et une touche d'orange,
 * la photo droite dans un cadre simple. Les stickers et les couleurs vives
 * commencent plus bas.
 */
export default function Hero() {
  const hero = useSiteContent("hero", heroFallback)
  const about = useSiteContent("about", aboutFallback)
  const experiences = useTable<ExperienceRow>("experiences", experiencesFallback)

  const current = experiences.find((e) => isOngoing(e.period))
  const stats = (about.stats ?? []).slice(0, 3)
  const full = clean(hero.nameLine2).trim()
  const photo = hero.image || "/tuo/portrait-desk.jpg"

  return (
    <section id="top" aria-labelledby="hero-name" className="field-blanc relative pb-20 pt-32 md:pb-28 md:pt-40">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p data-reveal="rise" className="flex items-center gap-2.5 text-[1rem] font-semibold">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-vert" />
            {clean(hero.availableBadge)}
          </p>

          <h1
            id="hero-name"
            data-reveal="rise"
            style={{ "--d": "80ms" } as React.CSSProperties}
            className="mt-8 font-display font-extrabold"
          >
            <span className="block text-[1.25rem] tracking-[-0.01em] text-gris">{clean(hero.nameLine1)}</span>
            <span className="display-tight mt-2 block text-[clamp(3.75rem,9vw,7.5rem)] leading-[0.88] tracking-[-0.035em]">
              {full}
              <span className="text-orange">.</span>
            </span>
          </h1>

          <p
            data-reveal="rise"
            style={{ "--d": "160ms" } as React.CSSProperties}
            className="mt-8 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]"
          >
            {clean(hero.title)}
          </p>
          <p
            data-reveal="rise"
            style={{ "--d": "220ms" } as React.CSSProperties}
            className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed text-gris md:text-[1.25rem] md:leading-[1.45]"
          >
            {clean(hero.description)}
          </p>

          <div data-reveal="rise" style={{ "--d": "280ms" } as React.CSSProperties} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PillLink href="#contact">
              Me contacter <Arrow />
            </PillLink>
            <a
              href={about.cvUrl}
              download
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-noir px-7 py-4 font-display text-[1.0625rem] font-extrabold transition-colors duration-300 hover:bg-noir hover:text-blanc"
            >
              Télécharger le CV <span aria-hidden="true">↓</span>
            </a>
          </div>

          {stats.length > 0 ? (
            <dl
              data-reveal="rise"
              style={{ "--d": "340ms" } as React.CSSProperties}
              className="mt-14 grid max-w-[36rem] grid-cols-3 gap-6 border-t border-trait pt-6"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{clean(s.label)}</dt>
                  <dd>
                    <span className="block font-display text-[2rem] font-extrabold leading-none tracking-[-0.03em]">
                      {clean(s.value)}
                    </span>
                    <span className="mt-2 block text-[0.875rem] font-semibold leading-snug text-gris">{clean(s.label)}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <figure className="relative lg:col-span-5">
          <div data-reveal="wipe" className="overflow-hidden rounded-[28px] bg-papier">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`Portrait de ${full}`} className="aspect-[4/5] w-full object-cover object-[52%_30%]" />
          </div>
          {current ? (
            <figcaption className="absolute bottom-5 left-5 right-5 flex items-center gap-2.5 rounded-full bg-blanc px-4 py-3 text-[0.875rem] font-semibold shadow-[var(--lift)] sm:right-auto">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-vert" />
              <span>
                En poste chez <strong className="font-extrabold">{clean(current.company)}</strong>
              </span>
            </figcaption>
          ) : null}
        </figure>
      </Container>
    </section>
  )
}
