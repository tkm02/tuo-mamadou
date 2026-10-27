// ============================================================
// Textes de l'interface, en français et en anglais.
// Le contenu éditorial (backoffice / données de secours) est
// traduit à part, dans `content-en.ts`.
// ============================================================

export type Lang = "fr" | "en"

export const LANGS: Lang[] = ["fr", "en"]

/** Le français est la référence : il fixe la liste des clés. */
const fr = {
  // -------- Navigation --------
  "nav.aria": "Navigation principale",
  "nav.top": "Retour en haut — Mamadou TUO",
  "nav.experience": "Parcours",
  "nav.projects": "Projets",
  "nav.awards": "Victoires",
  "nav.skills": "Outils",
  "nav.gallery": "Terrain",
  "nav.contact": "Contact",
  "nav.contactCta": "Me contacter",
  "nav.menu": "Menu",
  "nav.close": "Fermer",
  "nav.lang": "Langue du site",
  "nav.langTo": "Afficher le site en {lang}",

  // -------- Premier écran --------
  "hero.cv": "Télécharger le CV",
  "hero.portraitAlt": "Portrait de {name}",
  "hero.currentlyAt": "En poste chez",

  // -------- À propos --------
  "about.commitments": "Engagements",
  "about.tablist": "À propos",
  "about.portraitAlt": "Portrait de {name}",
  "about.cv": "CV (PDF)",

  // -------- Parcours --------
  "exp.title": "Ce que j'ai",
  "exp.mark": "mené",
  "exp.data": "{count} missions · {span}",
  "exp.filterAria": "Filtrer les missions",
  "exp.all": "Tout",
  "exp.lead": "Pilotage",
  "exp.listAria": "Missions",
  "exp.counter": "Mission {index} / {total}",
  "exp.prev": "Mission précédente",
  "exp.next": "Mission suivante",
  "exp.ongoing": "En cours",
  "exp.defaultType": "Mission",
  "exp.showMore": "Voir les {count} autres missions ↓",
  "exp.empty": "Aucune mission dans ce filtre.",
  "exp.achievements": "Réalisations clés",
  "exp.stack": "Stack technique",
  "exp.technologies": "Technologies",
  "exp.proofs": "Voir les preuves ({count})",
  "exp.proofsHeading": "Preuves de la mission",
  "exp.education": "Formation",

  // -------- Projets --------
  "proj.title": "Projets",
  "proj.mark": "livrés",
  "proj.data": "{count} projets",
  "proj.dataAwarded": "{count} projets · {awarded} primés",
  "proj.filterAria": "Filtrer les projets",
  "proj.all": "Tout",
  "proj.other": "Autre",
  "proj.default": "Projet",
  "proj.empty": "Aucun projet dans cette catégorie.",
  "proj.imageAlt": "Capture du projet {title}",
  "proj.confetti": "{label} : lancer les confettis",
  "proj.view": "Voir le projet ↗",
  "proj.code": "Code source ↗",
  "proj.awarded": "Projet primé",

  // -------- Victoires --------
  "awards.kicker": "Palmarès",
  "awards.titleLead": "Les",
  "awards.mark": "victoires",
  "awards.lede": "Hackathons, compétitions, concours : la plupart remportés comme chef d'équipe.",
  "awards.statAwards": "distinctions",
  "awards.statFirsts": "premiers prix",
  "awards.statFirst": "premier prix",
  "awards.statCertifications": "certifications",
  "awards.photoAlt": "Les trophées remportés",
  "awards.shelf": "Ma vitrine",
  "awards.trophies": "Les trophées",
  "awards.certifications": "Certifications",
  "awards.viewCertificate": "Voir le certificat",
  "awards.verify": "Vérifier ↗",
  "awards.rankPrize": "Prix",
  "awards.rankPlace": "Place",

  // -------- Outils --------
  "skills.title": "La boîte à",
  "skills.mark": "outils",
  "skills.data": "{count} technos",
  "skills.lede":
    "Une planche par domaine. Les stickers marqués d'un chiffre ont servi sur plusieurs missions réelles.",
  "skills.workshop": "L'atelier",
  "skills.toolsCount": "{count} outils du quotidien",
  "skills.otherCategory": "Autres",
  "skills.usedOn": "Utilisé sur {count} missions",
  "skills.usedOnSrBefore": ", utilisé sur ",
  "skills.usedOnSrAfter": " missions",

  // -------- Terrain --------
  "gallery.title": "Sur le",
  "gallery.mark": "terrain",
  "gallery.data": "{count} moments · {photos} photos",
  "gallery.lede": "Hackathons, soutenances, panels et équipes : les moments où le travail est sorti de l'écran.",
  "gallery.filterAria": "Filtrer les moments",
  "gallery.all": "Tout",
  "gallery.catEvents": "Événements",
  "gallery.catTeam": "Leadership",
  "gallery.catMentoring": "Mentorat",
  "gallery.open": "Ouvrir les {count} photos : {title}",
  "gallery.photos": "{count} photos",

  // -------- Contact --------
  "contact.titleLead": "Votre projet,",
  "contact.mark": "mon prochain sticker ?",
  "contact.lede":
    "Une application à construire, un processus à automatiser par l'IA ? Je suis disponible pour des missions freelance. Écrivez-moi, appelez-moi, ou laissez un message ici.",
  "contact.formTitle": "Laissez un message",
  "contact.name": "Nom",
  "contact.email": "Email",
  "contact.subject": "Objet",
  "contact.subjectPlaceholder": "Mission freelance, automatisation IA, rencontre…",
  "contact.message": "Message",
  "contact.send": "Envoyer le message",
  "contact.sending": "Envoi en cours…",
  "contact.success": "Message reçu. Je reviens vers vous très vite.",
  "contact.errorBefore": "L'envoi a échoué. Réessayez, ou écrivez directement à ",

  // -------- Pied de page --------
  "footer.copy": "© {year} Kolotioloma Mamadou TUO, Abidjan, Côte d'Ivoire",
  "footer.aria": "Liens de pied de page",
  "footer.top": "Haut de page ↑",

  // -------- Visionneuse --------
  "lightbox.label": "Visionneuse",
  "lightbox.close": "Fermer",
  "lightbox.prev": "← Précédente",
  "lightbox.next": "Suivante →",

  // -------- Certificats --------
  "cert.label": "Certificat {name}",
  "cert.fallbackLabel": "Certificat",
  "cert.close": "Fermer",
  "cert.unavailable": "Aperçu indisponible pour ce certificat.",
  "cert.fullscreen": "Ouvrir en plein écran ↗",
  "cert.verify": "Vérifier l'authenticité ↗",

  // -------- Trophées --------
  "trophy.alt": "Trophée : {title}",
  "trophy.kicker": "Le trophée",
  "trophy.listAria": "Trophées",
  "trophy.zoom": "Voir en grand : {title}",
} as const

export type UIKey = keyof typeof fr

const en: Record<UIKey, string> = {
  // -------- Navigation --------
  "nav.aria": "Main navigation",
  "nav.top": "Back to top — Mamadou TUO",
  "nav.experience": "Career",
  "nav.projects": "Projects",
  "nav.awards": "Wins",
  "nav.skills": "Tools",
  "nav.gallery": "In the field",
  "nav.contact": "Contact",
  "nav.contactCta": "Get in touch",
  "nav.menu": "Menu",
  "nav.close": "Close",
  "nav.lang": "Site language",
  "nav.langTo": "View the site in {lang}",

  // -------- Premier écran --------
  "hero.cv": "Download the CV",
  "hero.portraitAlt": "Portrait of {name}",
  "hero.currentlyAt": "Currently at",

  // -------- À propos --------
  "about.commitments": "Commitments",
  "about.tablist": "About",
  "about.portraitAlt": "Portrait of {name}",
  "about.cv": "CV (PDF)",

  // -------- Parcours --------
  "exp.title": "What I have",
  "exp.mark": "led",
  "exp.data": "{count} roles · {span}",
  "exp.filterAria": "Filter roles",
  "exp.all": "All",
  "exp.lead": "Leadership",
  "exp.listAria": "Roles",
  "exp.counter": "Role {index} / {total}",
  "exp.prev": "Previous role",
  "exp.next": "Next role",
  "exp.ongoing": "Ongoing",
  "exp.defaultType": "Role",
  "exp.showMore": "See the {count} other roles ↓",
  "exp.empty": "No role in this filter.",
  "exp.achievements": "Key achievements",
  "exp.stack": "Tech stack",
  "exp.technologies": "Technologies",
  "exp.proofs": "See the proofs ({count})",
  "exp.proofsHeading": "Proofs for this role",
  "exp.education": "Education",

  // -------- Projets --------
  "proj.title": "Projects",
  "proj.mark": "shipped",
  "proj.data": "{count} projects",
  "proj.dataAwarded": "{count} projects · {awarded} awarded",
  "proj.filterAria": "Filter projects",
  "proj.all": "All",
  "proj.other": "Other",
  "proj.default": "Project",
  "proj.empty": "No project in this category.",
  "proj.imageAlt": "Screenshot of the {title} project",
  "proj.confetti": "{label}: throw the confetti",
  "proj.view": "View the project ↗",
  "proj.code": "Source code ↗",
  "proj.awarded": "Award-winning project",

  // -------- Victoires --------
  "awards.kicker": "Track record",
  "awards.titleLead": "The",
  "awards.mark": "wins",
  "awards.lede": "Hackathons, competitions and contests — most of them won as team lead.",
  "awards.statAwards": "awards",
  "awards.statFirsts": "first prizes",
  "awards.statFirst": "first prize",
  "awards.statCertifications": "certifications",
  "awards.photoAlt": "The trophies won",
  "awards.shelf": "My shelf",
  "awards.trophies": "The trophies",
  "awards.certifications": "Certifications",
  "awards.viewCertificate": "View the certificate",
  "awards.verify": "Verify ↗",
  "awards.rankPrize": "Prize",
  "awards.rankPlace": "Place",

  // -------- Outils --------
  "skills.title": "The tool",
  "skills.mark": "box",
  "skills.data": "{count} technologies",
  "skills.lede": "One sheet per field. Stickers with a number were used on several real projects.",
  "skills.workshop": "The workshop",
  "skills.toolsCount": "{count} everyday tools",
  "skills.otherCategory": "Others",
  "skills.usedOn": "Used on {count} projects",
  "skills.usedOnSrBefore": ", used on ",
  "skills.usedOnSrAfter": " projects",

  // -------- Terrain --------
  "gallery.title": "In the",
  "gallery.mark": "field",
  "gallery.data": "{count} moments · {photos} photos",
  "gallery.lede": "Hackathons, defences, panels and teams — the moments when the work left the screen.",
  "gallery.filterAria": "Filter moments",
  "gallery.all": "All",
  "gallery.catEvents": "Events",
  "gallery.catTeam": "Leadership",
  "gallery.catMentoring": "Mentoring",
  "gallery.open": "Open the {count} photos: {title}",
  "gallery.photos": "{count} photos",

  // -------- Contact --------
  "contact.titleLead": "Your project,",
  "contact.mark": "my next sticker?",
  "contact.lede":
    "An app to build, a process to automate with AI? I am available for freelance work. Write to me, call me, or leave a message here.",
  "contact.formTitle": "Leave a message",
  "contact.name": "Name",
  "contact.email": "Email",
  "contact.subject": "Subject",
  "contact.subjectPlaceholder": "Freelance work, AI automation, a chat…",
  "contact.message": "Message",
  "contact.send": "Send the message",
  "contact.sending": "Sending…",
  "contact.success": "Message received. I will get back to you very soon.",
  "contact.errorBefore": "Sending failed. Try again, or email me directly at ",

  // -------- Pied de page --------
  "footer.copy": "© {year} Kolotioloma Mamadou TUO, Abidjan, Côte d'Ivoire",
  "footer.aria": "Footer links",
  "footer.top": "Back to top ↑",

  // -------- Visionneuse --------
  "lightbox.label": "Image viewer",
  "lightbox.close": "Close",
  "lightbox.prev": "← Previous",
  "lightbox.next": "Next →",

  // -------- Certificats --------
  "cert.label": "{name} certificate",
  "cert.fallbackLabel": "Certificate",
  "cert.close": "Close",
  "cert.unavailable": "No preview available for this certificate.",
  "cert.fullscreen": "Open full screen ↗",
  "cert.verify": "Verify authenticity ↗",

  // -------- Trophées --------
  "trophy.alt": "Trophy: {title}",
  "trophy.kicker": "The trophy",
  "trophy.listAria": "Trophies",
  "trophy.zoom": "View larger: {title}",
}

export const UI: Record<Lang, Record<UIKey, string>> = { fr, en }

/** Nom de la langue dans sa propre langue, pour le bouton de bascule. */
export const LANG_NAMES: Record<Lang, string> = { fr: "Français", en: "English" }

export type Vars = Record<string, string | number>

/** Remplace les jetons `{nom}` par leur valeur. */
export function fill(template: string, vars?: Vars) {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match))
}

export function translateUI(lang: Lang, key: UIKey, vars?: Vars) {
  return fill(UI[lang][key] ?? UI.fr[key] ?? key, vars)
}
