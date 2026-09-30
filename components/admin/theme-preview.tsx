"use client"

import type React from "react"
import { contrast, normalizeTheme, onColor, themeVars, type ThemePalette } from "@/lib/theme"
import { cn } from "@/lib/utils"

const SECTIONS: { key: keyof ThemePalette; label: string }[] = [
  { key: "orange", label: "Parcours · Contact" },
  { key: "papier", label: "À propos · Projets" },
  { key: "jaune", label: "Surligneur" },
  { key: "noir", label: "Victoires" },
  { key: "bleu", label: "Outils" },
  { key: "sapin", label: "Terrain" },
  { key: "vert", label: "En cours" },
]

/** Aperçu en direct de la palette, avec un contrôle de lisibilité par couleur. */
export default function ThemePreview({ value }: { value: Record<string, any> }) {
  const t = normalizeTheme(value)
  const vars = themeVars(t) as React.CSSProperties

  return (
    <div className="border-b border-hairline px-4 py-6 sm:px-6">
      <p className="mb-3 text-[0.8125rem] font-bold text-dawn">Aperçu</p>
      <div style={vars} className="overflow-hidden rounded-[18px] font-sans">
        <div className="field-orange relative p-6">
          <span className="sticker s-blanc px-3 py-1.5 text-[0.8125rem]" style={{ "--r": "-2deg", "--cut": "3px" } as React.CSSProperties}>
            <span className="live-dot size-2 rounded-full" /> Disponible
          </span>
          <p className="mt-4 font-display text-[2.5rem] font-extrabold leading-[0.85] tracking-[-0.03em]">Mamadou TUO</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-noir px-4 py-2 font-display text-[0.875rem] font-extrabold text-blanc">Me contacter →</span>
            <span className="sticker s-jaune px-3 py-1.5 text-[0.875rem]" style={{ "--r": "4deg", "--cut": "3px" } as React.CSSProperties}>
              Full stack
            </span>
            <span className="sticker s-bleu px-3 py-1.5 text-[0.875rem]" style={{ "--r": "-5deg", "--cut": "3px" } as React.CSSProperties}>
              n8n · LLM
            </span>
            <span className="sticker holo rounded-[12px] px-3 py-1.5 text-[0.875rem]" style={{ "--r": "6deg", "--cut": "3px" } as React.CSSProperties}>
              1er Prix
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {SECTIONS.map((s) => (
            <div key={s.key} className={cn("p-4", `field-${s.key}`)}>
              <p className="font-display text-[1.125rem] font-extrabold leading-tight">{s.label}</p>
              <p className="text-soft mt-1 text-[0.8125rem] font-semibold">Texte secondaire</p>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {(Object.keys(t) as (keyof ThemePalette)[]).map((k) => {
          const on = onColor(t[k], t)
          const ratio = contrast(t[k], on)
          const ok = ratio >= 4.5
          return (
            <li key={k} className="flex items-center gap-2 text-[0.8125rem]">
              <span className="grid h-6 w-9 place-items-center rounded-[4px] text-[0.75rem] font-bold" style={{ background: t[k], color: on }}>
                Aa
              </span>
              <span className="text-text capitalize">{k}</span>
              <span className={cn("font-mono", ok ? "text-muted" : "text-neon")}>
                {ratio.toFixed(1)}:1{ok ? "" : " · peu lisible"}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
