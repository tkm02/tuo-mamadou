/**
 * Palette du site, réglable depuis le backoffice (site_content, clé « theme »).
 * Chaque couleur reçoit automatiquement une couleur de texte lisible (noir ou blanc),
 * pour qu'aucun réglage ne puisse rendre le site illisible.
 */

export type ThemePalette = {
  noir: string
  orange: string
  papier: string
  blanc: string
  jaune: string
  sapin: string
  bleu: string
  vert: string
}

export const themeFallback: ThemePalette = {
  noir: "#141414",
  orange: "#FF6A13",
  papier: "#F4F4F0",
  blanc: "#FFFFFF",
  jaune: "#FFD23F",
  sapin: "#0F7B5F",
  bleu: "#3A5BFF",
  vert: "#19C37D",
}

export const THEME_KEYS = Object.keys(themeFallback) as (keyof ThemePalette)[]

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

function toRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "")
  if (h.length === 3) h = h.split("").map((c) => c + c).join("")
  const n = parseInt(h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function luminance(hex: string) {
  const [r, g, b] = toRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Garde une palette complète et valide, même si la base contient une valeur vide ou fausse. */
export function normalizeTheme(value: Partial<Record<string, unknown>> | null | undefined): ThemePalette {
  const out = { ...themeFallback }
  for (const k of THEME_KEYS) {
    const v = typeof value?.[k] === "string" ? String(value[k]).trim() : ""
    if (HEX.test(v)) out[k] = v
  }
  return out
}

/** Noir ou blanc de la palette : celui qui se lit le mieux sur le fond donné. */
export function onColor(bg: string, t: ThemePalette) {
  return contrast(bg, t.noir) >= contrast(bg, t.blanc) ? t.noir : t.blanc
}

export function themeVars(t: ThemePalette): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const k of THEME_KEYS) {
    vars[`--${k}`] = t[k]
    vars[`--on-${k}`] = onColor(t[k], t)
  }
  return vars
}

export function themeCss(t: ThemePalette) {
  const body = Object.entries(themeVars(t))
    .map(([k, v]) => `${k}:${v};`)
    .join("")
  return `:root{${body}}`
}
