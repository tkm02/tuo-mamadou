// ============================================================
// Contrôle de santé du contenu : ce qui mérite l'attention avant
// qu'un visiteur ne le remarque. Utilisé par le poste de contrôle
// et par les marqueurs des listes.
// ============================================================

import { isOngoing } from "@/lib/utils"

/** À corriger : cassé sur le site. À vérifier : fait peut-être périmé. À améliorer : facultatif. */
export type Level = "fix" | "check" | "improve"

export type Issue = { level: Level; text: string }

type Row = Record<string, any>

export function rowIssues(table: string, row: Row): Issue[] {
  const issues: Issue[] = []
  const empty = (v: unknown) => v === undefined || v === null || (typeof v === "string" && v.trim() === "") || (Array.isArray(v) && v.length === 0)

  switch (table) {
    case "experiences":
      if (isOngoing(row.period)) issues.push({ level: "check", text: "Marquée en cours : est-ce toujours vrai ?" })
      if (empty(row.description) && empty(row.achievements)) issues.push({ level: "improve", text: "Ni description ni réalisations." })
      break
    case "projects":
      if (empty(row.image)) issues.push({ level: "improve", text: "Pas de capture d'écran (le site affiche la pile technique)." })
      if (row.award && empty(row.awardLabel)) issues.push({ level: "fix", text: "Marqué primé mais sans libellé de prix." })
      if (row.award && empty(row.trophy)) issues.push({ level: "improve", text: "Projet primé sans photo du trophée." })
      if (empty(row.description)) issues.push({ level: "improve", text: "Pas de description." })
      break
    case "awards":
      if (empty(row.description)) issues.push({ level: "improve", text: "Pas de description." })
      break
    case "certifications":
      if (empty(row.certificateUrl) && empty(row.verificationUrl))
        issues.push({ level: "improve", text: "Ni certificat ni lien de vérification." })
      break
    case "gallery_items":
      if (empty(row.images)) issues.push({ level: "fix", text: "Aucune photo : ce moment n'apparaît pas sur le site." })
      break
    case "skill_categories":
      if (empty(row.skills)) issues.push({ level: "fix", text: "Ligne sans station : elle apparaît vide." })
      break
  }
  return issues
}

/** Chemins d'images et de fichiers locaux référencés par une ligne (pour vérifier qu'ils existent). */
export function localAssets(row: Row): string[] {
  const out: string[] = []
  const visit = (v: unknown) => {
    if (typeof v === "string") {
      if (/^\/[^/].*\.(png|jpe?g|webp|gif|avif|svg|pdf)$/i.test(v)) out.push(v)
    } else if (Array.isArray(v)) v.forEach(visit)
    else if (v && typeof v === "object") Object.values(v).forEach(visit)
  }
  Object.values(row).forEach(visit)
  return out
}

export const LEVEL_LABEL: Record<Level, string> = {
  fix: "À corriger",
  check: "À vérifier",
  improve: "À améliorer",
}

export const LEVEL_ORDER: Level[] = ["fix", "check", "improve"]
