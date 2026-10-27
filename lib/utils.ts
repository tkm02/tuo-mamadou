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

/** Vrai quand une période décrit une mission toujours active, en français comme en anglais. */
export function isOngoing(period: string | null | undefined): boolean {
  return /en cours|aujourd|depuis|présent|present|ongoing|since|current/i.test(period ?? "")
}

/** Suffixe ordinal anglais : 1st, 2nd, 3rd, 4th… 11th, 12th, 13th. */
function ordinalEn(n: number) {
  const teens = n % 100
  if (teens >= 11 && teens <= 13) return "th"
  return ["th", "st", "nd", "rd"][n % 10] ?? "th"
}

/**
 * "1er Prix Hackathon ICESCO"   → { n: 1, suffix: "er",  kind: "Prix",  rest: "Hackathon ICESCO" }
 * "3ème Place Intech Challenge" → { n: 3, suffix: "e",   kind: "Place", rest: "Intech Challenge" }
 * "2nd Prize GS2E Hackathon"    → { n: 2, suffix: "nd",  kind: "Prize", rest: "GS2E Hackathon" }
 * "Prix de la meilleure…"       → { n: 0, … rest: titre complet }
 *
 * Le titre peut arriver en français ou déjà traduit : les deux formes d'ordinal
 * et les deux mots (« prix » / « prize ») sont reconnus, et `lang` décide
 * seulement de la façon de les réécrire.
 */
export function splitRank(title: string, lang: "fr" | "en" = "fr") {
  const t = clean(title)
  const m = t.match(/^(\d+)\s*(?:st|nd|rd|th|er|re|ère|ème|eme|e)?\s+(prix|prize|place)?\s*[-–—:]?\s*/i)
  if (!m) return { n: 0, suffix: "", kind: "", rest: t }
  const n = Number(m[1])
  const isPlace = m[2]?.toLowerCase() === "place"
  const kind = isPlace ? "Place" : lang === "en" ? "Prize" : "Prix"
  const suffix = lang === "en" ? ordinalEn(n) : n === 1 ? "er" : "e"
  return { n, suffix, kind, rest: t.slice(m[0].length).trim() }
}
