import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Retire les emojis et pictogrammes du contenu venu du backoffice :
 * la signalétique du site remplace les icônes.
 */
export function clean(text: string | null | undefined): string {
  if (!text) return ""
  return text
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F3FB}-\u{1F3FF}\u{FE0F}\u{200D}\u{20E3}]/gu, "")
    .replace(/\s*(\|\||·)\s*/g, " / ")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s*[·•|]\s*/, "")
    .trim()
}

/** Vrai quand une période décrit une mission toujours active. */
export function isOngoing(period: string | null | undefined): boolean {
  return /en cours|aujourd|depuis|présent|present/i.test(period ?? "")
}

/**
 * "1er Prix Hackathon ICESCO"  → { n: 1, suffix: "er", kind: "Prix",  rest: "Hackathon ICESCO" }
 * "3ème Place Intech Challenge" → { n: 3, suffix: "e",  kind: "Place", rest: "Intech Challenge" }
 * "Prix de la meilleure…"       → { n: 0, … rest: titre complet }
 */
export function splitRank(title: string) {
  const t = clean(title)
  const m = t.match(/^(\d+)\s*(?:er|re|ère|ème|eme|e)?\s+(prix|place)?\s*[-–—:]?\s*/i)
  if (!m) return { n: 0, suffix: "", kind: "", rest: t }
  const n = Number(m[1])
  const kind = m[2] ? m[2].charAt(0).toUpperCase() + m[2].slice(1).toLowerCase() : "Prix"
  return { n, suffix: n === 1 ? "er" : "e", kind, rest: t.slice(m[0].length).trim() }
}
