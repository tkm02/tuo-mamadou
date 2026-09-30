"use client"

import type React from "react"
import { useState } from "react"
import { Container, Sticker, accentAt, tiltOf } from "@/components/kit"
import { useSiteContent } from "@/lib/use-portfolio"
import { aboutFallback } from "@/lib/fallback-data"
import { clean, cn } from "@/lib/utils"

export default function About() {
  const about = useSiteContent("about", aboutFallback)
  const tabs = about.tabs ?? []
  const roles = clean(about.leadershipText)
    .split(/\s*(?:[•·|]|\s\/\s)\s*/)
    .filter(Boolean)
  const [tab, setTab] = useState(0)
  const current = tabs[Math.min(tab, tabs.length - 1)]

  return (
    <section id="about" aria-labelledby="about-title" className="field-papier relative py-[clamp(5rem,11vw,9rem)]">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-14">
        {/* Portrait et engagements */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <figure className="relative mx-auto max-w-[26rem] lg:mx-0">
              <div data-reveal="slap" className="photo-sticker" style={{ "--r": "3deg" } as React.CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={about.profileImage || "/tuo/portrait-kente.jpg"}
                  alt={`Portrait de ${clean(about.name)}`}
                  className="aspect-[4/5] w-full object-cover object-[50%_30%]"
                  loading="lazy"
                />
              </div>
              <figcaption className="absolute -bottom-7 -left-3 right-10 sm:-left-8">
                <Sticker as="span" color="noir" shape="tag" tilt={-4} reveal="slap" delay={250} className="flex-col items-start gap-1.5 whitespace-normal">
                  <span className="text-[clamp(1.5rem,2.4vw,2rem)] tracking-[-0.02em]">{clean(about.name)}</span>
                  <span className="font-sans text-[0.875rem] font-semibold opacity-80">{clean(about.caption)}</span>
                </Sticker>
              </figcaption>
            </figure>

            {roles.length > 0 ? (
              <ul className="mt-16 flex flex-wrap gap-x-3 gap-y-4" aria-label="Engagements">
                {roles.map((r, i) => (
                  <Sticker
                    as="li"
                    key={r}
                    color={accentAt(i + 1)}
                    tilt={tiltOf(r, 4)}
                    reveal="slap"
                    delay={i * 90}
                    className="whitespace-normal text-[0.875rem]"
                  >
                    {r}
                  </Sticker>
                ))}
              </ul>
            ) : null}

            <p className="mt-8 flex flex-wrap gap-3">
              {about.linkedinUrl ? (
                <a href={about.linkedinUrl} target="_blank" rel="noopener noreferrer" className="sticker sticker-peel s-bleu px-4 py-2.5 text-[1rem]" style={{ "--cut": "3px" } as React.CSSProperties}>
                  LinkedIn ↗
                </a>
              ) : null}
              {about.githubUrl ? (
                <a href={about.githubUrl} target="_blank" rel="noopener noreferrer" className="sticker sticker-peel s-noir px-4 py-2.5 text-[1rem]" style={{ "--cut": "3px" } as React.CSSProperties}>
                  GitHub ↗
                </a>
              ) : null}
              {about.cvUrl ? (
                <a href={about.cvUrl} download className="sticker sticker-peel s-orange px-4 py-2.5 text-[1rem]" style={{ "--cut": "3px" } as React.CSSProperties}>
                  CV (PDF) ↓
                </a>
              ) : null}
            </p>
          </div>
        </div>

        {/* Récit */}
        <div className="lg:col-span-7">
          <h2
            id="about-title"
            data-reveal="rise"
            className="font-display text-[clamp(2.75rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
          >
            {clean(about.headingLine1)}{" "}
            <span className="marker" style={{ "--mk": "var(--orange)" } as React.CSSProperties}>
              {clean(about.headingLine2)}
            </span>
          </h2>
          <p data-reveal="rise" style={{ "--d": "120ms" } as React.CSSProperties} className="text-soft mt-7 max-w-[52ch] text-[1.25rem] font-medium leading-[1.45]">
            {clean(about.subtitle)}
          </p>

          {tabs.length > 0 && current ? (
            <div className="mt-12">
              <div
                role="tablist"
                aria-label="À propos"
                className="flex flex-wrap gap-3"
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
                  const next = (tab + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length
                  setTab(next)
                  document.getElementById(`tab-${tabs[next].id}`)?.focus()
                }}
              >
                {tabs.map((t, i) => {
                  const on = i === tab
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      id={`tab-${t.id}`}
                      aria-selected={on}
                      tabIndex={on ? 0 : -1}
                      aria-controls="about-panel"
                      onClick={() => setTab(i)}
                      className={cn("sticker sticker-peel cursor-pointer px-5 py-3 text-[1.0625rem]", on ? `s-${accentAt(i)}` : "s-blanc")}
                      style={{ "--r": on ? `${i % 2 ? 3 : -3}deg` : "0deg", "--cut": "3px" } as React.CSSProperties}
                    >
                      {clean(t.label)}
                    </button>
                  )
                })}
              </div>

              <article
                key={current.id}
                id="about-panel"
                role="tabpanel"
                aria-labelledby={`tab-${current.id}`}
                data-reveal="rise"
                className="mt-6 rounded-[28px] bg-blanc p-7 shadow-[var(--lift)] md:p-10"
              >
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">
                  {clean(current.title)}
                </h3>
                <p className="mt-4 max-w-[64ch] text-[1.0625rem] leading-relaxed">{clean(current.text)}</p>
                {current.highlight ? (
                  <p className="mt-6 text-[1.0625rem] font-bold">
                    <span className="marker" data-in="" style={{ "--mk": `color-mix(in oklab, var(--${accentAt(tab)}) 45%, transparent)` } as React.CSSProperties}>
                      {clean(current.highlight)}
                    </span>
                  </p>
                ) : null}
              </article>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
