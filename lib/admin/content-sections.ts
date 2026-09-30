import type { Field } from "@/lib/admin/resources"
import { aboutFallback, contactFallback, heroFallback, socialsFallback } from "@/lib/fallback-data"
import { normalizeTheme, themeFallback } from "@/lib/theme"

export type ContentSection = {
  key: string
  label: string
  description: string
  anchor: string
  fallback: Record<string, any>
  fields: Field[]
}

const color = (name: string, label: string, help: string, group: string): Field => ({
  name,
  label,
  type: "color",
  help,
  group,
  half: true,
})

export const CONTENT_SECTIONS: ContentSection[] = [
  {
    key: "hero",
    label: "Accueil",
    description: "Le premier écran du site : le nom, la photo, les boutons et les chiffres clés.",
    anchor: "top",
    fallback: heroFallback,
    fields: [
      {
        name: "availableBadge",
        label: "Disponibilité",
        type: "text",
        group: "Bandeau",
        help: "La petite ligne au-dessus du nom, avec le point vert.",
      },
      { name: "nameLine1", label: "Prénom (petite ligne)", type: "text", group: "Nom", half: true },
      {
        name: "nameLine2",
        label: "Nom (en grand)",
        type: "text",
        group: "Nom",
        half: true,
        help: "Le prénom s'affiche en petit au-dessus ; le nom en très grand, suivi d'un point orange.",
      },
      { name: "title", label: "Titre / métier", type: "text", group: "Présentation" },
      { name: "description", label: "Accroche", type: "textarea", group: "Présentation" },
      { name: "badge", label: "Badge", type: "text", hidden: true },
      {
        name: "portrait",
        label: "Portrait détouré",
        type: "image",
        hidden: true,
      },
      {
        name: "image",
        label: "Photo",
        type: "image",
        group: "Photo",
        help: "Affichée droite, dans un cadre arrondi. Format portrait conseillé ; le visage est centré automatiquement.",
      },
      {
        name: "stickers",
        label: "Stickers autour du portrait",
        type: "list",
        hidden: true,
      },
      {
        name: "tape",
        label: "Bandes de scotch",
        type: "list",
        group: "Bandes de scotch",
        help: "Les mots qui défilent sur les bandes, plus bas dans la page (avant Victoires et avant Contact).",
      },
      { name: "cardTitle", label: "Titre sur la photo", type: "text", hidden: true },
      { name: "cardSubtitle", label: "Sous-titre sur la photo", type: "text", hidden: true },
    ],
  },
  {
    key: "about",
    label: "À propos",
    description: "Portrait, plaque d'identité, chiffres clés et les trois textes (parcours, philosophie, objectifs).",
    anchor: "about",
    fallback: aboutFallback,
    fields: [
      { name: "headingLine1", label: "Titre", type: "text", group: "Titre", half: true },
      { name: "headingLine2", label: "Suite du titre (surlignée)", type: "text", group: "Titre", half: true },
      { name: "subtitle", label: "Sous-titre", type: "textarea", group: "Titre" },
      { name: "profileImage", label: "Portrait", type: "image", group: "Plaque d'identité" },
      { name: "name", label: "Nom sur la plaque", type: "text", group: "Plaque d'identité", half: true },
      {
        name: "caption",
        label: "Légende",
        type: "text",
        group: "Plaque d'identité",
        half: true,
        help: "Sépare les éléments par « • ».",
      },
      {
        name: "leadershipText",
        label: "Rôles et engagements",
        type: "textarea",
        group: "Plaque d'identité",
        help: "Sépare chaque rôle par « • » : chacun devient un sticker sous le portrait.",
      },
      { name: "cvUrl", label: "CV (PDF)", type: "file", group: "Liens" },
      { name: "linkedinUrl", label: "LinkedIn", type: "text", group: "Liens", half: true },
      { name: "githubUrl", label: "GitHub", type: "text", group: "Liens", half: true },
      {
        name: "stats",
        label: "Chiffres clés",
        type: "objectList",
        addLabel: "un chiffre",
        group: "Chiffres clés",
        help: "Trois chiffres, affichés dans le premier écran sous les boutons.",
        itemFields: [
          { name: "value", label: "Valeur", type: "text" },
          { name: "label", label: "Libellé", type: "text" },
        ],
      },
      {
        name: "tabs",
        label: "Textes",
        type: "objectList",
        addLabel: "un texte",
        group: "Textes",
        itemFields: [
          { name: "label", label: "Étiquette (Parcours…)", type: "text" },
          { name: "title", label: "Titre", type: "text" },
          { name: "text", label: "Texte", type: "textarea" },
          { name: "highlight", label: "Ligne mise en avant", type: "text" },
          { name: "id", label: "Identifiant", type: "text", hidden: true },
        ],
      },
      { name: "badge", label: "Badge", type: "text", hidden: true },
      { name: "recognitionsText", label: "Reconnaissances", type: "textarea", hidden: true },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    description: "Coordonnées affichées dans la section de fin.",
    anchor: "contact",
    fallback: contactFallback,
    fields: [
      { name: "email", label: "Email", type: "text" },
      {
        name: "phone",
        label: "Téléphone",
        type: "text",
        half: true,
        help: "Le lien d'appel est généré automatiquement.",
      },
      { name: "location", label: "Basé à", type: "text", half: true },
      { name: "phoneHref", label: "Lien tel:", type: "text", hidden: true },
    ],
  },
  {
    key: "socials",
    label: "Réseaux sociaux",
    description: "Liens du pied de page et de la section contact.",
    anchor: "contact",
    fallback: socialsFallback,
    fields: [
      { name: "linkedin", label: "LinkedIn", type: "text" },
      { name: "github", label: "GitHub", type: "text" },
      { name: "email", label: "Email", type: "text" },
    ],
  },
  {
    key: "theme",
    label: "Apparence",
    description:
      "Les couleurs de tout le site. Le texte posé sur chaque couleur passe automatiquement en noir ou en blanc pour rester lisible.",
    anchor: "top",
    fallback: themeFallback,
    fields: [
      color("orange", "Orange (principale)", "Sections Parcours et Contact, chiffres d'impact.", "Signature"),
      color("noir", "Noir", "Texte, bouton principal, section Victoires, pied de page.", "Signature"),
      color("papier", "Fond clair", "Fond des sections À propos et Projets.", "Fonds"),
      color("blanc", "Blanc", "Liseré des stickers, panneaux, champs.", "Fonds"),
      color("jaune", "Jaune", "Surligneur, étiquettes, bandes de scotch.", "Couleurs vives"),
      color("sapin", "Vert sapin", "Section Terrain (galerie).", "Couleurs vives"),
      color("bleu", "Bleu", "Section Boîte à outils.", "Couleurs vives"),
      color("vert", "Vert", "« En cours », « Disponible », message envoyé.", "Couleurs vives"),
    ],
  },
]

/** Normalise avant enregistrement : lien d'appel dérivé du numéro, identifiants des textes. */
export function normalizeContent(key: string, value: Record<string, any>): Record<string, any> {
  const v = { ...value }
  if (key === "theme") return normalizeTheme(v)
  if (key === "contact" && typeof v.phone === "string") {
    const digits = v.phone.replace(/[^\d+]/g, "")
    if (digits) v.phoneHref = `tel:${digits}`
  }
  if (key === "about" && Array.isArray(v.tabs)) {
    v.tabs = v.tabs.map((t: Record<string, any>, i: number) => ({
      ...t,
      id:
        t.id ||
        String(t.label || `texte-${i + 1}`)
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-"),
    }))
  }
  return v
}
