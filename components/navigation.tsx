"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { accentAt } from "@/components/kit"
import { cn } from "@/lib/utils"

const LINKS = [
  { label: "Parcours", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Victoires", href: "#awards" },
  { label: "Outils", href: "#skills" },
  { label: "Terrain", href: "#gallery" },
]

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "sticker s-noir px-3.5 py-2 font-display text-[1.25rem] font-extrabold tracking-[-0.02em]",
        className,
      )}
      style={{ "--cut": "3px" } as React.CSSProperties}
    >
      <span>
        <span className="text-orange">&lt;/</span>Tuo<span className="text-orange">&gt;</span>
      </span>
    </span>
  )
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.href.slice(1)), "contact"]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <nav aria-label="Navigation principale" className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 rounded-full pl-3 pr-2 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
          scrolled && !open ? "bg-blanc shadow-[var(--lift-hi)]" : "bg-transparent",
        )}
      >
        <a href="#top" aria-label="Retour en haut — Mamadou TUO" className="shrink-0">
          <Wordmark className="sticker-peel" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link, i) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative inline-flex rounded-full px-4 py-2.5 font-display text-[1rem] font-extrabold transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)]",
                    isActive ? `sticker s-${accentAt(i)} -rotate-2` : "text-noir hover:-translate-y-0.5 hover:bg-noir/[0.07]",
                  )}
                  style={isActive ? ({ "--cut": "3px" } as React.CSSProperties) : undefined}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-noir px-5 py-3 font-display text-[1rem] font-extrabold text-blanc transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 sm:inline-flex"
          >
            Me contacter
          </a>
          <button
            type="button"
            className="rounded-full bg-blanc px-5 py-3 font-display text-[1rem] font-extrabold text-noir shadow-[var(--lift)] lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="field-orange fixed inset-0 -z-10 overflow-y-auto px-[clamp(1rem,4vw,3rem)] pb-10 pt-28 lg:hidden"
        >
          <ul className="flex flex-col items-start gap-5">
            {[...LINKS, { label: "Contact", href: "#contact" }].map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  data-reveal="slap"
                  className={cn("sticker sticker-peel px-6 py-4 text-[2rem]", `s-${i === 5 ? "noir" : i % 2 ? "blanc" : accentAt(i + 1)}`)}
                  style={{ "--r": `${i % 2 ? 3 : -3}deg`, "--d": `${i * 60}ms` } as React.CSSProperties}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  )
}
