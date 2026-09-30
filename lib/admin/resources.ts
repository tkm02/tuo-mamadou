// ============================================================
// Configuration du backoffice : chaque ressource décrit sa table
// Supabase et ses champs. Ajouter un champ ici suffit pour le
// voir apparaître dans le formulaire d'administration.
// ============================================================

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "color"
  | "select" // liste de suggestions, valeur libre acceptée
  | "list" // liste de textes ordonnés (réalisations, détails…)
  | "tags" // liste courte de mots-clés (technologies…)
  | "image" // une image (upload ou URL)
  | "imageList" // plusieurs images
  | "file" // fichier (PDF…)
  | "objectList" // liste d'objets structurés

export type Field = {
  name: string
  label: string
  type: FieldType
  options?: string[]
  /** Libellés affichés pour les options (ex. events → Événements). */
  optionLabels?: Record<string, string>
  itemFields?: Field[]
  placeholder?: string
  help?: string
  /** Champ conservé en base mais que le site n'affiche plus : masqué du formulaire. */
  hidden?: boolean
  /** Occupe une demi-largeur sur grand écran. */
  half?: boolean
  /** Regroupe les champs en blocs dans le formulaire. */
  group?: string
  /** Libellé du bouton d'ajout d'une liste d'objets (« une station »…). */
  addLabel?: string
}

export type ResourceConfig = {
  slug: string
  table: string
  /** Nom de la section, identique au site public. */
  label: string
  singular: string
  /** Lettre de ligne affichée dans la navigation. */
  code: string
  /** Ancre de la section sur le site public. */
  anchor: string
  titleField: string
  subtitleField?: string
  /** Champ affiché en données (période, année…). */
  metaField?: string
  /** Champ image utilisé comme vignette dans la liste. */
  imageField?: string
  fields: Field[]
}

export const EXPERIENCE_TYPES = [
  "Entreprise",
  "Freelance",
  "Projet",
  "Compétition",
  "Hackathon",
  "Enseignement",
  "Projet Académique",
  "Projet Associatif",
  "Stage",
]

export const PROJECT_CATEGORIES = ["Full Stack", "IA & Automatisation", "Frontend", "Backend", "IoT", "Mobile", "Data"]

export const RESOURCES: ResourceConfig[] = [
  {
    slug: "experiences",
    table: "experiences",
    label: "Parcours",
    singular: "une mission",
    code: "P",
    anchor: "experience",
    titleField: "role",
    subtitleField: "company",
    metaField: "period",
    fields: [
      { name: "role", label: "Poste / rôle", type: "text", group: "Mission", placeholder: "Développeur Full Stack & IA" },
      { name: "company", label: "Structure", type: "text", group: "Mission", half: true, placeholder: "Orange" },
      { name: "location", label: "Lieu", type: "text", group: "Mission", half: true, placeholder: "Abidjan" },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: EXPERIENCE_TYPES,
        group: "Mission",
        half: true,
        help: "Sert de filtre sur le site. Tu peux saisir un type qui n'est pas dans la liste.",
      },
      {
        name: "period",
        label: "Période",
        type: "text",
        group: "Mission",
        half: true,
        placeholder: "Depuis mai 2026",
        help: "« Depuis… » ou « en cours » affiche la mission comme active dans l'accueil.",
      },
      { name: "duration", label: "Durée", type: "text", group: "Mission", half: true, placeholder: "9 mois" },
      { name: "description", label: "Description", type: "textarea", group: "Contenu" },
      { name: "achievements", label: "Réalisations", type: "list", group: "Contenu", placeholder: "Une réalisation" },
      { name: "technologies", label: "Technologies", type: "tags", group: "Contenu", placeholder: "Ajouter une technologie" },
      {
        name: "impact",
        label: "Impact (chiffre)",
        type: "text",
        group: "Impact",
        half: true,
        placeholder: "25+",
        help: "Affiché en grand, en ambre, au bout de la ligne.",
      },
      { name: "impactLabel", label: "Libellé de l'impact", type: "text", group: "Impact", half: true, placeholder: "Véhicules suivis" },
      {
        name: "proofs",
        label: "Preuves (captures, photos)",
        type: "objectList",
        addLabel: "une preuve",
        group: "Preuves",
        itemFields: [
          { name: "url", label: "Image", type: "image" },
          { name: "title", label: "Titre", type: "text" },
        ],
      },
      { name: "logo", label: "Emoji", type: "text", hidden: true },
      { name: "color", label: "Couleur", type: "color", hidden: true },
    ],
  },
  {
    slug: "projets",
    table: "projects",
    label: "Projets",
    singular: "un projet",
    code: "J",
    anchor: "projects",
    titleField: "title",
    subtitleField: "role",
    metaField: "year",
    imageField: "image",
    fields: [
      { name: "title", label: "Titre", type: "text", group: "Projet" },
      { name: "role", label: "Mon rôle", type: "text", group: "Projet", half: true, placeholder: "Chef de projet" },
      { name: "year", label: "Année", type: "text", group: "Projet", half: true, placeholder: "2026" },
      {
        name: "category",
        label: "Catégorie",
        type: "select",
        options: PROJECT_CATEGORIES,
        group: "Projet",
        half: true,
        help: "Sert de filtre sur le site.",
      },
      { name: "description", label: "Description", type: "textarea", group: "Projet" },
      {
        name: "image",
        label: "Capture d'écran",
        type: "image",
        group: "Visuel",
        help: "Sans capture, le site affiche la pile technique sur un panneau.",
      },
      { name: "technologies", label: "Technologies", type: "tags", group: "Visuel", placeholder: "Ajouter une technologie" },
      { name: "award", label: "Projet primé", type: "boolean", group: "Prix", half: true },
      { name: "awardLabel", label: "Libellé du prix", type: "text", group: "Prix", half: true, placeholder: "1er Prix" },
      { name: "demoUrl", label: "Lien démo", type: "text", group: "Liens", half: true, placeholder: "https://…" },
      { name: "githubUrl", label: "Lien GitHub", type: "text", group: "Liens", half: true, placeholder: "https://github.com/…" },
      { name: "color", label: "Couleur", type: "color", hidden: true },
    ],
  },
  {
    slug: "prix",
    table: "awards",
    label: "Distinctions",
    singular: "une distinction",
    code: "D",
    anchor: "awards",
    titleField: "title",
    subtitleField: "description",
    metaField: "date",
    fields: [
      {
        name: "title",
        label: "Titre",
        type: "text",
        placeholder: "1er Prix Hackathon ICESCO",
        help: "Commence par le rang (« 1er Prix… », « 3ème Place… ») pour l'afficher en grand chiffre lumineux.",
      },
      { name: "date", label: "Date", type: "text", half: true, placeholder: "Mai 2025" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "details", label: "Détails", type: "list", placeholder: "Un détail" },
      { name: "icon", label: "Icône", type: "text", hidden: true },
      { name: "color", label: "Couleur", type: "color", hidden: true },
    ],
  },
  {
    slug: "certifications",
    table: "certifications",
    label: "Certifications",
    singular: "une certification",
    code: "C",
    anchor: "awards",
    titleField: "name",
    subtitleField: "provider",
    metaField: "year",
    fields: [
      { name: "name", label: "Nom de la certification", type: "text" },
      { name: "provider", label: "Organisme", type: "text", half: true, placeholder: "Google, Meta…" },
      { name: "year", label: "Année", type: "text", half: true, placeholder: "2025" },
      { name: "skills", label: "Compétences validées", type: "tags", placeholder: "Ajouter une compétence" },
      { name: "certificateUrl", label: "Certificat (PDF ou image)", type: "file" },
      { name: "verificationUrl", label: "Lien de vérification", type: "text", placeholder: "https://coursera.org/verify/…" },
      { name: "certificateType", label: "Type de fichier", type: "text", hidden: true },
      { name: "logo", label: "Emoji", type: "text", hidden: true },
      { name: "color", label: "Couleur", type: "color", hidden: true },
    ],
  },
  {
    slug: "stacks",
    table: "skill_categories",
    label: "Réseau technique",
    singular: "une ligne",
    code: "R",
    anchor: "skills",
    titleField: "title",
    subtitleField: "description",
    fields: [
      { name: "title", label: "Nom de la ligne", type: "text", half: true, placeholder: "Automatisation IA" },
      { name: "slug", label: "Identifiant", type: "text", half: true, placeholder: "ia", help: "Court, sans espace ni accent." },
      { name: "description", label: "Description courte", type: "text" },
      {
        name: "skills",
        label: "Stations (technologies)",
        type: "objectList",
        addLabel: "une station",
        help: "Une technologie utilisée sur 2 missions ou plus devient une correspondance automatiquement.",
        itemFields: [
          { name: "name", label: "Nom", type: "text" },
          { name: "level", label: "Niveau", type: "number", hidden: true },
          { name: "icon", label: "Emoji", type: "text", hidden: true },
        ],
      },
      { name: "icon", label: "Icône", type: "text", hidden: true },
      { name: "color", label: "Couleur", type: "color", hidden: true },
    ],
  },
  {
    slug: "outils",
    table: "tools",
    label: "Atelier",
    singular: "un outil",
    code: "A",
    anchor: "skills",
    titleField: "name",
    subtitleField: "category",
    fields: [
      { name: "name", label: "Nom", type: "text", half: true },
      { name: "category", label: "Catégorie", type: "text", half: true, placeholder: "Design" },
      { name: "icon", label: "Emoji", type: "text", hidden: true },
    ],
  },
  {
    slug: "formation",
    table: "education",
    label: "Formation",
    singular: "une formation",
    code: "F",
    anchor: "experience",
    titleField: "degree",
    subtitleField: "school",
    metaField: "year",
    fields: [
      { name: "degree", label: "Diplôme (court)", type: "text", half: true, placeholder: "Master SIGL" },
      { name: "year", label: "Années", type: "text", half: true, placeholder: "2024 - 2026" },
      { name: "fullDegree", label: "Intitulé complet", type: "text" },
      { name: "school", label: "École / organisme", type: "text", half: true },
      { name: "location", label: "Lieu", type: "text", half: true },
      { name: "status", label: "Statut", type: "select", options: ["En cours", "Diplômé", "Obtenu"], half: true },
      { name: "icon", label: "Emoji", type: "text", hidden: true },
    ],
  },
  {
    slug: "galerie",
    table: "gallery_items",
    label: "Sur le terrain",
    singular: "un moment",
    code: "T",
    anchor: "gallery",
    titleField: "title",
    subtitleField: "description",
    metaField: "date",
    imageField: "images",
    fields: [
      { name: "title", label: "Titre", type: "text" },
      {
        name: "category",
        label: "Catégorie",
        type: "select",
        options: ["events", "team", "mentoring"],
        optionLabels: { events: "Événements", team: "Leadership", mentoring: "Mentorat" },
      },
      { name: "date", label: "Date", type: "text", half: true, placeholder: "Mai 2025" },
      { name: "location", label: "Lieu", type: "text", half: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "images", label: "Photos", type: "imageList", help: "La première photo sert de couverture. Glisse pour réordonner." },
      { name: "color", label: "Couleur", type: "color", hidden: true },
    ],
  },
]

export function getResource(slug: string): ResourceConfig | undefined {
  return RESOURCES.find((r) => r.slug === slug)
}

/** Valeur par défaut d'un champ selon son type. */
export function emptyValue(field: Field): any {
  switch (field.type) {
    case "boolean":
      return false
    case "number":
      return 0
    case "list":
    case "tags":
    case "imageList":
    case "objectList":
      return []
    case "color":
      return "#5B8BFF"
    case "select":
      return field.options?.[0] ?? ""
    default:
      return ""
  }
}

/** Objet vide complet (champs masqués compris) pour une nouvelle ligne. */
export function emptyRow(fields: Field[]): Record<string, any> {
  const row: Record<string, any> = {}
  for (const f of fields) {
    if (f.type === "objectList") row[f.name] = []
    else row[f.name] = emptyValue(f)
  }
  return row
}
