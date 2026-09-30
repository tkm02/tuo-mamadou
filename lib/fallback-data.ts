// ============================================================
// Données de secours : contenu actuel du site.
// Affichées tant que Supabase n'est pas configuré / rempli,
// et utilisées par le bouton "Importer" du backoffice.
// ============================================================

export type Proof = { url: string; title: string }

export type ExperienceRow = {
  id?: string
  role: string
  company: string
  location: string
  period: string
  duration: string
  type: string
  logo: string
  description: string
  achievements: string[]
  technologies: string[]
  impact: string
  impactLabel: string
  color: string
  proofs: Proof[]
  /** Photo du trophée (PNG sans fond), affichée en bas de la fiche. */
  trophy?: string
  sortOrder?: number
}

export type EducationRow = {
  id?: string
  degree: string
  fullDegree: string
  school: string
  location: string
  year: string
  status: string
  icon: string
  sortOrder?: number
}

export type ProjectRow = {
  id?: string
  title: string
  description: string
  image: string
  technologies: string[]
  year: string
  role: string
  category: string
  color: string
  award: boolean
  awardLabel: string
  demoUrl: string
  githubUrl: string
  /** Photo du trophée (PNG sans fond), affichée sous le projet. */
  trophy?: string
  sortOrder?: number
}

export type AwardRow = {
  id?: string
  title: string
  description: string
  icon: string
  date: string
  color: string
  details: string[]
  sortOrder?: number
}

export type CertificationRow = {
  id?: string
  name: string
  provider: string
  logo: string
  color: string
  year: string
  skills: string[]
  certificateUrl: string
  certificateType: string
  verificationUrl: string
  sortOrder?: number
}

export type GalleryRow = {
  id?: string
  category: string
  title: string
  description: string
  images: string[]
  date: string
  location: string
  color: string
  sortOrder?: number
}

export type SkillCategoryRow = {
  id?: string
  slug: string
  title: string
  icon: string
  color: string
  description: string
  skills: { name: string; level: number; icon: string }[]
  sortOrder?: number
}

export type ToolRow = {
  id?: string
  name: string
  icon: string
  category: string
  sortOrder?: number
}

// ---------- CONTENU ÉDITORIAL ----------

export const heroFallback = {
  badge: "Développeur full stack & IA · Abidjan",
  nameLine1: "Kolotioloma",
  nameLine2: "Mamadou TUO",
  title: "Développeur Full Stack & IA",
  description:
    "Ingénieur logiciel diplômé du Master SIGL de l'ESATIC. Je développe des applications web et mobiles et j'automatise les processus métiers par l'IA : workflows n8n, LLM, RAG. Neuf fois primé depuis 2022, le plus souvent comme chef de projet.",
  image: "/tuo/portrait-desk.jpg",
  /** Portrait détouré (PNG transparent, liseré blanc intégré) : le grand sticker du premier écran. */
  portrait: "/tuo/sticker-desk.png",
  /** Stickers collés autour du portrait. Les 1ers prix s'ajoutent automatiquement. */
  stickers: ["Full stack", "n8n · LLM · RAG", "Chef de projet", "Web · Mobile · IA"],
  /** Bandes de scotch qui défilent entre les sections. */
  tape: ["Développeur full stack", "Automatisation IA", "9 distinctions depuis 2022", "Abidjan"],
  cardTitle: "Full Stack Developer",
  cardSubtitle: "Web • Mobile • IA",
  availableBadge: "Disponible pour des missions freelance",
}

export const aboutFallback = {
  badge: "À Propos de Moi",
  headingLine1: "Full stack & IA,",
  headingLine2: "souvent chef de projet",
  subtitle:
    "Ingénieur logiciel spécialisé en développement full stack et en automatisation par l'intelligence artificielle.",
  profileImage: "/tuo/portrait-kente.jpg",
  name: "Mamadou Tuo",
  caption: "Ingénieur logiciel • Master SIGL ESATIC • Abidjan",
  cvUrl: "/KOLOTIOLOMA_MAMADOU_TUO.pdf",
  githubUrl: "https://github.com/tkm02",
  linkedinUrl: "https://linkedin.com/in/mamadou-tuo",
  tabs: [
    {
      id: "parcours",
      label: "Parcours",
      title: "Un parcours marqué par le leadership",
      text: "De la Licence SRIT au Master SIGL de l'ESATIC, dont je suis diplômé, j'ai construit une double compétence : développer et piloter. Chef de projet à l'Orange Digital Center, lead full stack chez IzySend, chef d'équipe sur la plupart des compétitions que j'ai remportées. Aujourd'hui chez Orange, je me concentre sur l'automatisation par l'IA : workflows n8n, intégration de LLM et de systèmes RAG au service des processus métiers.",
      highlight:
        "🌍 1er Prix International ICESCO · 🏆 1er Prix Moov Application · 🌱 Prix Inclusion SahelTech · 🇨🇮 2ème Prix National ADW",
    },
    {
      id: "philosophie",
      label: "Philosophie",
      title: "Code avec impact, tech avec sens",
      text: "Je crois que la technologie doit servir un objectif plus grand : résoudre des problèmes réels et améliorer des vies. Mon approche combine excellence technique, pensée systémique et impact mesurable. Chaque ligne de code est une opportunité de créer quelque chose de significatif.",
      highlight: "💡 Innovation · 🎯 Impact · ⚡ Excellence",
    },
    {
      id: "objectifs",
      label: "Objectifs",
      title: "Construire l'avenir tech africain",
      text: "Mon ambition est de contribuer à l'écosystème tech africain en tant que développeur expert et leader technologique. À travers l'enseignement (GOMYCODE), le leadership (Président club digital ESATIC, GDSC Project Planner) et des projets innovants, je veux inspirer la prochaine génération de développeurs.",
      highlight: "🚀 Leadership · 🌍 Impact Africain · 📚 Transmission",
    },
  ],
  stats: [
    { value: "9", label: "Distinctions depuis 2022" },
    { value: "2", label: "Premiers prix (ICESCO, Moov)" },
    { value: "3+", label: "Années d'expérience" },
  ],
  recognitionsText:
    "🌱 Meilleure innovation inclusive SahelTech • 🏆 1er Prix Moov Application • 🏆 1er Prix ICESCO • 🥈 2ème Prix ADW • 🥉 3ème Intech Challenge • 🥉 Prix FAO (Journée mondiale de l'alimentation) • 🎓 2ème Prix APP03 • 🥈 2ème Prix GS2E",
  leadershipText:
    "Président du club communication digitale ESATIC • Chargé du digital au C2E • Project Planner GDSC ESATIC • Membre de la CID",
}

export const contactFallback = {
  email: "mamadoutuo77@gmail.com",
  phone: "+225 07 58 02 42 50",
  phoneHref: "tel:+2250758024250",
  location: "Abidjan, Côte d'Ivoire",
}

export type Trophy = { image: string; title: string; caption: string }

export const awardsSectionFallback: { backgroundImage: string; trophies: Trophy[] } = {
  backgroundImage: "/awards/trophees.jpg",
  trophies: [
    {
      image: "/awards/trophees/sahel-tech-2026.png",
      title: "Prix de l'innovation inclusive",
      caption: "Sahel Tech Innovation Challenge, 2026",
    },
    {
      image: "/awards/trophees/mass-icesco-2025.png",
      title: "1er Prix, Grand Prix ICESCO",
      caption: "Hackathon MASS, 2025",
    },
    {
      image: "/awards/trophees/aeemci-ina.png",
      title: "Projet INA (I'm Not Alone)",
      caption: "AEEMCI ESATIC",
    },
  ],
}

export const socialsFallback = {
  github: "https://github.com/tkm02",
  linkedin: "https://linkedin.com/in/mamadou-tuo",
  email: "mamadoutuo77@gmail.com",
}

// ---------- COLLECTIONS ----------

export const experiencesFallback: ExperienceRow[] = [
  {
    role: "Développeur Full Stack & Automatisation IA",
    company: "Orange",
    location: "Maccory, Abidjan",
    period: "Depuis mai 2026",
    duration: "5+ mois",
    type: "Entreprise",
    logo: "",
    description:
      "Développement full stack d'applications web et mobiles, et automatisation des processus métiers par l'intelligence artificielle.",
    achievements: [
      "ARIA : plateforme ITSM de la DSI (tickets, routage intelligent, SLA, incidents, assistant IA avec RAG)",
      "Cockpit Projets : collecte des expressions de besoin des directions, workflow de validation et détection IA des projets similaires",
      "Parc IT : inventaire synchronisé SCCM, stock, demandes de matériel (DMI) et assistant qui interroge le parc",
      "Module de détection, sur image, de l'action à effectuer par un chatbot (n8n)",
      "Agents et automatisations n8n, recherche vectorielle Qdrant",
    ],
    technologies: ["n8n", "Qdrant", "RAG", "LLM", "Next.js", "FastAPI", "PostgreSQL", "Docker"],
    impact: "IA",
    impactLabel: "Processus automatisés",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Full Stack Lead - Freelance",
    company: "IzySend",
    location: "Abidjan",
    period: "Décembre 2025 - 2026",
    duration: "",
    type: "Freelance",
    logo: "",
    description:
      "Plateforme de transfert hybride de l'Europe vers l'Afrique : bons d'achat et cash via Mobile Money et Visa.",
    achievements: [
      "Architecture modulaire NestJS (TypeScript) + PostgreSQL (Prisma / TypeORM)",
      "Paiements Stripe, Mobile Money pawaPay, bons d'achat Zendit / Prizy",
      "Intégration des maquettes Figma en Next.js / React (PWA responsive)",
      "Pipeline CI/CD (Docker, GitHub Actions) et déploiement sur VPS OVH",
    ],
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "TypeORM", "Stripe", "pawaPay", "Next.js", "React", "Docker", "GitHub Actions"],
    impact: "Lead",
    impactLabel: "Architecture full stack",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Développeur Full Stack",
    company: "NEXORA",
    location: "Cocody, Abidjan",
    period: "Janvier - Mai 2026",
    duration: "5 mois",
    type: "Entreprise",
    logo: "",
    description:
      "Conception et développement d'une plateforme de digitalisation et d'exécution des procédures d'entreprise.",
    achievements: [
      "Conception de l'architecture et développement full stack de la plateforme (frontend et backend)",
      "Workflows digitalisés : création, exécution et suivi des procédures d'entreprise",
    ],
    technologies: [],
    impact: "",
    impactLabel: "",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "1er Prix & Prix d'innovation - Compétition Moov Application",
    company: "Moov",
    location: "Abidjan",
    period: "Décembre 2025",
    duration: "",
    type: "Compétition",
    logo: "",
    description:
      "Plateforme d'écoute anonyme, de suivi, de sensibilisation et d'orientation vers des experts en santé mentale.",
    achievements: [
      "Chef d'équipe, en charge de la coordination et du pilotage du projet",
      "Développement d'une PWA avec Next.js et Supabase",
      "UX optimisée et mise en relation avec des experts certifiés",
    ],
    technologies: ["Next.js", "Supabase", "PWA"],
    impact: "1er",
    impactLabel: "Prix Moov",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Chef de Projet / Développeur Full Stack",
    company: "Orange Digital Center",
    location: "Abidjan, Côte d'Ivoire",
    period: "Avril - Décembre 2024",
    duration: "9 mois",
    type: "Projet",
    logo: "🍊",
    description:
      "Pilotage d'un projet de surveillance énergétique temps réel des sites d'Orange CI avec détection d'anomalies pour optimiser la consommation.",
    achievements: [
      "Rédaction du cahier des charges fonctionnel et technique",
      "Système complet de monitoring avec alertes temps réel",
      "Dashboard interactif avec visualisations Highcharts",
      "Réduction de 30% des anomalies énergétiques détectées",
      "Documentation technique et coordination avec les tuteurs",
    ],
    technologies: ["Node.js", "Express.js", "React js", "Flutter", "MongoDB", "ESP32", "Socket.io", "Highcharts"],
    impact: "100%",
    impactLabel: "Données temps réel",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Développeur Backend - Freelance",
    company: "Système de Gestion de Flotte",
    location: "Treichville",
    period: "Septembre 2024 - Mars 2026",
    duration: "19 mois",
    type: "Freelance",
    logo: "🚗",
    description:
      "Développement d'une API REST robuste pour le suivi temps réel de flottes avec websockets, géolocalisation et authentification JWT sécurisée.",
    achievements: [
      "API REST complète avec 30+ endpoints",
      "Suivi temps réel de +25 véhicules (pannes, trajets, géolocalisation)",
      "Architecture scalable avec Prisma ORM",
      "API REST sécurisées : authentification, gestion des véhicules et des chauffeurs",
      "Tests fonctionnels, documentation et livraison d'un backend prêt à l'intégration",
    ],
    technologies: ["Express.js", "Prisma", "MongoDB", "Socket.io", "JWT", "Postman"],
    impact: "25+",
    impactLabel: "Véhicules suivis",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Instructeur de Programmation",
    company: "GOMYCODE",
    location: "Abidjan, Maccory Zone 4",
    period: "Septembre 2023 - Juin 2025",
    duration: "2 ans",
    type: "Enseignement",
    logo: "👨‍🏫",
    description:
      "Cours d'introduction au développement web et au Full Stack JavaScript, encadrement et accompagnement des apprenants.",
    achievements: [
      "Préparation et animation de séances sur les fondamentaux HTML, CSS, JavaScript",
      "Encadrement des apprenants sur des projets web dynamiques (portfolios, to-do apps…)",
      "Conception de projets pédagogiques full stack : React + Express avec base de données",
      "Accompagnement personnalisé : code review, corrections, conseils techniques",
    ],
    technologies: ["JavaScript", "ES6+", "React", "Node.js", "Git/GitHub", "Pédagogie"],
    impact: "5+",
    impactLabel: "Étudiants formés",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Développeur Frontend - Freelance",
    company: "MahouFarm",
    location: "Abidjan",
    period: "Août - Novembre 2023",
    duration: "4 mois",
    type: "Freelance",
    logo: "🌾",
    description:
      "Construction d'une interface responsive pour application de mise en relation agriculteurs-entreprises avec intégration API.",
    achievements: [
      "Interface moderne responsive (mobile-first) avec React.js",
      "Intégration API REST pour profils, offres et messagerie",
      "UX fluide et composants dynamiques",
      "Optimisation performance (Lighthouse 95+)",
    ],
    technologies: ["React.js", "Tailwind CSS", "React Router", "JavaScript", "REST API", "Axios"],
    impact: "API",
    impactLabel: "REST intégrée",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "1er Prix - Hackathon ICESCO",
    company: "MASS 2025 (MARCHÉ AFRICAIN DES SOLUTIONS SPATIALES)",
    location: "Treichville",
    period: "Mai 2025",
    duration: "3 jours",
    type: "Hackathon",
    logo: "🏆",
    description:
      "Conception d'une solution intelligente pour l'agriculture durable en Afrique combinant IoT, IA et télédétection.",
    achievements: [
      "1er Prix du Hackathon ICESCO",
      "Système IoT avec capteurs, IA et télédétection",
      "Analyse qualité des sols et de l'eau pour agriculture optimisée",
      "Plateforme de suivi et aide à la décision pour agriculteurs",
      "Simulation des rendements et recommandations de culture",
    ],
    technologies: ["IoT", "IA", "Capteurs", "Télédétection", "Data Analysis", "React js", "Express.js", "MongoDB"],
    impact: "1er",
    impactLabel: "Prix ICESCO",
    color: "#5B8BFF",
    proofs: [],
    trophy: "/awards/trophees/mass-icesco-2025.png",
  },
  {
    role: "2ème Prix - African Digital Week Hackathon",
    company: "ADW 2025",
    location: "Yamoussoukro",
    period: "Mai - Juin 2025",
    duration: "1 mois",
    type: "Hackathon",
    logo: "🥈",
    description:
      "Chef d'équipe - Conception d'une solution pour des services publics accessibles en Côte d'Ivoire avec IA multilingue.",
    achievements: [
      "2ème Prix du Hackathon ADW",
      "Chef d'équipe et coordination du projet",
      "Développement frontend de la plateforme citoyenne",
      "Intégration d'un LLM pour assistance intelligente multilingue",
    ],
    technologies: ["React", "LLM", "IA", "Frontend", "Leadership"],
    impact: "2ème",
    impactLabel: "Prix ADW",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Lead Frontend Developer",
    company: "Séminaire An-Nour",
    location: "Abidjan / Remote",
    period: "Août 2025 - En cours",
    duration: "4+ mois",
    type: "Freelance",
    logo: "🕌",
    description:
      "Chef d'équipe frontend pour la digitalisation complète du Séminaire Islamique An-Nour : gestion administrative, financière, scientifique et inscriptions.",
    achievements: [
      "Lead frontend d'une équipe de 3 développeurs",
      "Développement UI/UX pour 4 commissions (Admin, Finance, Scientifique, Séminaristes)",
      "Interface de vente de tickets avec panier et paiement Mobile Money",
      "Système d'inscription intelligent avec upload/capture photos et validation multi-étapes",
      "Dashboard SuperAdmin avec gestion des rôles et permissions",
      "UI gestion des emplois du temps et suivi académique des séminaristes",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "React Query", "React Hook Form", "Figma", "Axios"],
    impact: "75%",
    impactLabel: "Frontend complété",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Chef de Projet / Développeur Full Stack - Intech Challenge 2025",
    company: "Domaine Bini (ESATIC)",
    location: "Abidjan",
    period: "Août - Décembre 2025",
    duration: "5 mois",
    type: "Compétition",
    logo: "🏞️",
    description:
      "Digitalisation de l'écotourisme du Domaine Bini (11 sites) : réservations en ligne, paiements intégrés, visites immersives 360°, dashboard IA et CRM multisite.",
    achievements: [
      "Système de réservation multisite avec calendrier temps réel",
      "Intégration paiements Mobile Money (CinetPay) et cartes bancaires (Stripe)",
      "Visites immersives 360° avec A-Frame et Marzipano",
      "Cartographie interactive avec Leaflet (11 sites géolocalisés)",
      "Dashboard PDG avec IA : analyse des avis clients, recommandations stratégiques, alertes proactives",
    ],
    technologies: ["React", "TypeScript", "Express.js", "MongoDB", "Prisma", "A-Frame", "Leaflet", "WebVR", "IA/ML"],
    impact: "3e",
    impactLabel: "Place Intech Challenge",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "2ème Prix - APPRENTISSAGE PAR PROJET 03",
    company: "ESATIC",
    location: "Treichville",
    period: "Octobre 2023 - Février 2024",
    duration: "5 mois",
    type: "Projet Académique",
    logo: "📚",
    description: "Valorisation du secteur du vivrier en Côte d'Ivoire de la production à la commercialisation.",
    achievements: [
      "2ème Prix du concours APP03",
      "Analyse des besoins des producteurs et commerçants",
      "Développement d'une application web pour la vente",
      "Conception d'un tableau de bord de suivi des activités",
    ],
    technologies: ["React", "Express.js", "MongoDB", "Mongoose", "Dashboard", "Analyse métier"],
    impact: "2ème",
    impactLabel: "Prix APP03",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "APPRENTISSAGE PAR PROJET 02",
    company: "ESATIC",
    location: "Treichville",
    period: "Janvier - Mai 2023",
    duration: "5 mois",
    type: "Projet Académique",
    logo: "⚙️",
    description: "Mise en place d'un système d'enchère en ligne sécurisée avec gestion temps réel.",
    achievements: [
      "Architecture technique et base de données complètes",
      "Backend Node.js avec système d'authentification",
      "Intégration frontend HTML/CSS",
      "Logique d'enchère en temps réel",
    ],
    technologies: ["Node.js", "WebSocket", "HTML", "CSS", "JavaScript", "MongoDB"],
    impact: "100%",
    impactLabel: "Projet validé",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "APPRENTISSAGE PAR PROJET 01",
    company: "ESATIC",
    location: "Treichville",
    period: "Janvier - Juin 2022",
    duration: "6 mois",
    type: "Projet Académique",
    logo: "💡",
    description: "Mise en place d'une plateforme de valorisation des performances scolaires en Côte d'Ivoire.",
    achievements: [
      "Plateforme complète de gestion des performances",
      "Système de suivi et d'analyse des résultats",
      "Interface intuitive pour enseignants et élèves",
      "Base de données relationnelle optimisée",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Adobe xd"],
    impact: "100%",
    impactLabel: "Projet validé",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "2ème Prix - Hackathon Gestion Consommation Électrique",
    company: "GS2E",
    location: "Treichville",
    period: "Janvier 2022",
    duration: "3 jours",
    type: "Hackathon",
    logo: "⚡",
    description: "Mise en place d'un système de gestion de la consommation électrique dans une maison connectée.",
    achievements: [
      "Système IoT de monitoring énergétique",
      "Dashboard temps réel de consommation",
      "Alertes automatiques de surconsommation",
      "Intégration capteurs ESP32",
    ],
    technologies: ["ESP32", "Node-RED", "Figma", "Arduino", "IoT"],
    impact: "100%",
    impactLabel: "Prototype validé",
    color: "#5B8BFF",
    proofs: [],
  },
  {
    role: "Projet Interne - Chat Club Informatique",
    company: "Club Info ESATIC",
    location: "Treichville",
    period: "Décembre 2022 - Janvier 2023",
    duration: "2 mois",
    type: "Projet Associatif",
    logo: "💬",
    description: "Mise en place d'un chat instantané pour le club informatique (messagerie instantanée).",
    achievements: [
      "Application de messagerie temps réel",
      "Interface utilisateur moderne et responsive",
      "Système de notifications instantanées",
      "Gestion des conversations de groupe",
    ],
    technologies: ["Socket.io", "CSS", "ejs", "JavaScript", "Express.js", "MongoDB"],
    impact: "35+",
    impactLabel: "Utilisateurs actifs",
    color: "#5B8BFF",
    proofs: [],
  },
]

export const educationFallback: EducationRow[] = [
  {
    degree: "Master SIGL",
    fullDegree: "Master Systèmes d'Information et Génie Logiciel",
    school: "ESATIC",
    location: "Abidjan, CI",
    year: "2024 - 2026",
    status: "Diplômé",
    icon: "🎓",
  },
  {
    degree: "Licence SRIT",
    fullDegree: "Licence Systèmes de Réseaux Informatiques et de Télécommunications",
    school: "ESATIC",
    location: "Abidjan, CI",
    year: "2021 - 2024",
    status: "Diplômé",
    icon: "📡",
  },
  {
    degree: "Formation Data Science",
    fullDegree: "Formation Data Science & IA",
    school: "Africa TechUp Tour",
    location: "Online",
    year: "2024 - En cours",
    status: "En cours",
    icon: "📊",
  },
  {
    degree: "Baccalauréat Scientifique",
    fullDegree: "Baccalauréat série D",
    school: "Lycée Municipal Adjamé Williamsville",
    location: "Abidjan, CI",
    year: "2021",
    status: "Obtenu",
    icon: "🎒",
  },
]

export const projectsFallback: ProjectRow[] = [
  {
    title: "ARIA - Gestion des services IT, DSI Orange CI",
    description:
      "Agent de Résolution Intelligente des Anomalies : le service desk de la DSI d'Orange Côte d'Ivoire. Portail demandeur et backoffice DSI : tickets, qualification et routage IA vers la bonne corbeille (nomenclature GLPI, règles métier, recherche vectorielle), incidents, problèmes et changements, SLA (TTO / TTR), météo DSI avec QoS et NPS, assistant ARIA avec RAG et laboratoire IA entraîné sur les tickets validés.",
    image: "/orange/aria-accueil.jpg",
    technologies: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "n8n", "Qdrant", "Docker", "Nginx", "SSE", "JWT", "Alembic"],
    year: "2026",
    role: "Développeur Full Stack & IA",
    category: "IA & Automatisation",
    color: "#ff7900",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Cockpit Projets - Expressions de besoin, Orange CI",
    description:
      "Chaque direction exprime ses besoins par campagne, dans un parcours en 6 étapes aligné sur la stratégie « Trust the Future ». Centralisation, workflow de validation, suivi budgétaire (estimé, approuvé, consommé) et assistant IA qui fait ressortir les projets similaires.",
    image: "/orange/cockpit-projets-dashboard.jpg",
    technologies: ["n8n", "Qdrant", "IA"],
    year: "2026",
    role: "Développeur Full Stack & IA",
    category: "IA & Automatisation",
    color: "#ff7900",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Parc IT - Gestion du parc informatique, Orange CI",
    description:
      "Pilotage du parc bureautique de la DSI : inventaire consolidé depuis SCCM, stock, carte du parc par ville, demandes de matériel (DMI) transmises par n8n, packs d'équipement, retours et assistant qui interroge le parc en français avec des chiffres calculés par l'API.",
    image: "/orange/parc-it-tableau-de-bord.jpg",
    technologies: ["n8n", "SCCM", "API REST", "Agent IA"],
    year: "2026",
    role: "Développeur Full Stack",
    category: "Full Stack",
    color: "#ff7900",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Vision pour chatbot - Orange CI",
    description:
      "Module en cours : détecte sur une image le type d'action que le chatbot doit effectuer, orchestré avec n8n.",
    image: "",
    technologies: ["n8n", "Qdrant", "LLM", "Vision"],
    year: "2026",
    role: "Automatisation IA",
    category: "IA & Automatisation",
    color: "#ff7900",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Système de Surveillance Énergétique Orange CI",
    description:
      "Système IoT complet pour la surveillance énergétique temps réel avec détection d'anomalies et alertes.",
    image: "/kania.png",
    technologies: ["Node.js", "React.js", "Express.js", "ESP32", "Socket.io", "Highcharts"],
    year: "2024",
    role: "Chef de Projet",
    category: "Full Stack",
    color: "#ff7900",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "IzySend",
    description:
      "Plateforme de transfert hybride de l'Europe vers l'Afrique : bons d'achat et cash via Mobile Money et Visa. Architecture modulaire, paiements multi-fournisseurs, PWA responsive.",
    image: "",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "pawaPay", "Next.js", "Docker", "GitHub Actions"],
    year: "2025-2026",
    role: "Full Stack Lead",
    category: "Full Stack",
    color: "#5B8BFF",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Plateforme santé mentale - Moov Application",
    description:
      "1er prix et Prix d'innovation. Écoute anonyme, suivi, sensibilisation et orientation vers des experts certifiés en santé mentale.",
    image: "",
    technologies: ["Next.js", "Supabase", "PWA"],
    year: "2025",
    role: "Chef d'Équipe",
    category: "Full Stack",
    color: "#5B8BFF",
    award: true,
    awardLabel: "1er Prix",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Digitalisation des procédures - NEXORA",
    description:
      "Plateforme de digitalisation et d'exécution des procédures d'entreprise : création, exécution et suivi des workflows.",
    image: "",
    technologies: [],
    year: "2026",
    role: "Développeur Full Stack",
    category: "Full Stack",
    color: "#5B8BFF",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Plateforme Gestion de Flotte",
    description:
      "API REST sécurisée avec suivi temps réel des véhicules, authentification JWT et dashboards analytics.",
    image: "/flot.jpg",
    technologies: ["Express.js", "Prisma", "MongoDB", "Socket.io", "React"],
    year: "2024-2025",
    role: "Développeur Backend",
    category: "Backend",
    color: "#00FF94",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Solution Agriculture Durable - ICESCO",
    description: "1er Prix du Hackathon ICESCO. Système IoT intelligent pour l'agriculture durable en Afrique.",
    image: "/kulture360.png",
    technologies: ["IoT", "IA", "Télédétection", "ESP32", "Mobile App"],
    year: "2025",
    role: "Tech Lead",
    category: "IoT",
    color: "#FFBE0B",
    award: true,
    awardLabel: "1er Prix",
    demoUrl: "",
    githubUrl: "",
    trophy: "/awards/trophees/mass-icesco-2025.png",
  },
  {
    title: "Application MahouFarm",
    description: "Application web responsive pour gestion agricole avec intégration API et interface intuitive.",
    image: "/mahourFarm.jpg",
    technologies: ["React", "Tailwind CSS", "TypeScript", "REST API"],
    year: "2023",
    role: "Développeur Frontend",
    category: "Frontend",
    color: "#5B8BFF",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Digitalisation Séminaire An-Nour",
    description:
      "Plateforme complète de gestion administrative, financière et académique pour un séminaire islamique.",
    image: "/an-nour.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "React Query", "Django"],
    year: "2025",
    role: "Lead Frontend",
    category: "Frontend",
    color: "#FF6B3D",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Écotourisme Domaine Bini",
    description:
      "Plateforme de réservation multisite avec visites immersives 360°, paiements intégrés et dashboard IA.",
    image: "/bini.png",
    technologies: ["Next.js", "React.js", "Express.js", "LLM"],
    year: "2025",
    role: "Chef de Projet",
    category: "Full Stack",
    color: "#00D9FF",
    award: false,
    awardLabel: "",
    demoUrl: "",
    githubUrl: "",
  },
  {
    title: "Plateforme CitoyenneCI - African Digital Week",
    description:
      "2ème Prix du Hackathon ADW. Solution innovante pour des services publics accessibles en Côte d'Ivoire avec IA multilingue.",
    image: "/e-citoyen.png",
    technologies: ["React", "LLM", "IA", "TypeScript", "API"],
    year: "2025",
    role: "Chef d'Équipe",
    category: "Full Stack",
    color: "#F653FF",
    award: true,
    awardLabel: "2ème Prix",
    demoUrl: "",
    githubUrl: "",
  },
]

export const awardsFallback: AwardRow[] = [
  {
    title: "Prix de la meilleure innovation inclusive",
    description:
      "Sahel Tech Innovation Challenge (STIC'26), Burkina Faso. Le projet INA (I'm Not Alone) remporte le prix de l'innovation inclusive parmi près de 60 équipes, avec une présentation en ligne.",
    icon: "Award",
    date: "Mai 2026",
    color: "#F653FF",
    details: ["Près de 60 équipes en compétition", "Projet INA (I'm Not Alone)", "Présentation en ligne"],
  },
  {
    title: "1er Prix Compétition Moov Application",
    description: "1er prix et Prix d'innovation de la compétition Moov Application",
    icon: "Trophy",
    date: "Déc. 2025",
    color: "#FFBE0B",
    details: [
      "Plateforme d'écoute anonyme et d'orientation en santé mentale",
      "Chef d'équipe : coordination et pilotage du projet",
      "PWA Next.js et Supabase",
    ],
  },
  {
    title: "3ème Place Intech Challenge",
    description:
      "Solution d'amélioration du service client des sites du Domaine Bini, avec le contrôle et la gestion des sites intégrés. 3e face à plusieurs écoles, et meilleure équipe à présenter un projet terminé.",
    icon: "Award",
    date: "Déc. 2025",
    color: "#5B8BFF",
    details: ["Service client des sites du Domaine Bini", "Contrôle et gestion des sites intégrés", "Meilleure équipe avec un projet terminé"],
  },
  {
    title: "3ème Meilleure application de Côte d'Ivoire",
    description:
      "Prix FAO, Journée mondiale de l'alimentation, Ministère de l'Agriculture. Application IoT pour la gestion agricole intelligente",
    icon: "Award",
    date: "Oct. 2025",
    color: "#00FF94",
    details: [
      "Surveillance en temps réel des cultures",
      "Alertes automatisées pour les agriculteurs",
      "Optimisation des rendements agricoles",
    ],
  },
  {
    title: "2ème Prix African Digital Week Hackathon",
    description: "Services publics accessibles avec IA multilingue en Côte d'Ivoire",
    icon: "Award",
    date: "Mai–juin 2025",
    color: "#F653FF",
    details: [
      "Chef d'équipe et coordination du projet",
      "Plateforme citoyenne innovante",
      "Intégration LLM pour assistance intelligente",
    ],
  },
  {
    title: "1er Prix Hackathon ICESCO (MASS 2025)",
    description: "Solution intelligente pour l'agriculture durable en Afrique",
    icon: "Trophy",
    date: "Mai 2025",
    color: "#FFBE0B",
    details: [
      "Système IoT avec capteurs et télédétection",
      "Intégration d'Intelligence Artificielle",
      "Impact social en milieu agricole africain",
    ],
  },
  {
    title: "2ème Prix Apprentissage par Projet 03",
    description: "ESATIC. Valorisation du secteur vivrier en Côte d'Ivoire",
    icon: "Award",
    date: "2023–2024",
    color: "#5B8BFF",
    details: ["Solution web interactive", "Data visualization avancée", "Impact économique et social"],
  },
  {
    title: "2ème Prix Hackathon GS2E",
    description: "Système de gestion de la consommation électrique dans une maison connectée",
    icon: "Award",
    date: "Janv. 2022",
    color: "#5B8BFF",
    details: [],
  },
]

export const certificationsFallback: CertificationRow[] = [
  {
    name: "Project Management Fundamentals",
    provider: "Google",
    logo: "🔵",
    color: "#0668E1",
    year: "2025",
    skills: ["Gestion", "Planning", "Agile"],
    certificateUrl: "/certificates/Coursera project_manager.pdf",
    certificateType: "pdf",
    verificationUrl: "https://coursera.org/verify/BJUPR1V6QHSW",
  },
  {
    name: "Agile and Scrum Development",
    provider: "IBM",
    logo: "🔷",
    color: "#0668E1",
    year: "2025",
    skills: ["Scrum", "Sprint", "Kanban"],
    certificateUrl: "/certificates/Coursera agile.pdf",
    certificateType: "pdf",
    verificationUrl: "https://coursera.org/verify/FHLELI3UIQ0X",
  },
  {
    name: "Programming with JavaScript",
    provider: "Meta",
    logo: "⚛️",
    color: "#0668E1",
    year: "2025",
    skills: ["ES6+", "Async", "DOM"],
    certificateUrl: "/certificates/Coursera met_javascript.pdf",
    certificateType: "pdf",
    verificationUrl: "https://coursera.org/verify/UFP41QX8T5PU",
  },
  {
    name: "Front-End Development",
    provider: "Meta",
    logo: "🎨",
    color: "#0668E1",
    year: "2025",
    skills: ["React", "HTML", "CSS"],
    certificateUrl: "/certificates/Coursera frontend.pdf",
    certificateType: "pdf",
    verificationUrl: "https://coursera.org/verify/GJE0UQC5Q9LW",
  },
  {
    name: "Back-End Development",
    provider: "Meta",
    logo: "⚙️",
    color: "#0668E1",
    year: "2025",
    skills: ["Node.js", "API", "Database"],
    certificateUrl: "/certificates/Coursera meta_backend.pdf",
    certificateType: "pdf",
    verificationUrl: "https://coursera.org/verify/VVW428ROC83W",
  },
  {
    name: "Data Science Fundamentals",
    provider: "Africa TechUp Tour",
    logo: "📊",
    color: "#0668E1",
    year: "2025 - En cours",
    skills: ["Python", "ML", "Analytics"],
    certificateUrl: "/certificates/techup-datascience.png",
    certificateType: "image",
    verificationUrl: "",
  },
]

export const galleryFallback: GalleryRow[] = [
  {
    category: "events",
    title: "Hackathon ICESCO 2024",
    description: "1er Prix - Solution IoT Agriculture",
    images: ["/mass/IMG-20250510-WA0006.jpg", "/mass/IMG-20250328-WA0000.jpg", "/mass/IMG-20250507-WA0004.jpg"],
    date: "Avril 2025",
    location: "Abidjan, Côte d'Ivoire",
    color: "#FFBE0B",
  },
  {
    category: "events",
    title: "Hackathon IA SARA 2025",
    description: "Application IA pour l'agriculture",
    images: ["/sara/IMG-20250525-WA0004.jpg", "/sara/IMG-20250528-WA0003.jpg", "/sara/IMG-20250528-WA0011.jpg"],
    date: "Mai 2025",
    location: "Parc d'exposition",
    color: "#5B8BFF",
  },
  {
    category: "events",
    title: "Hackathon ADW GEEK 2025",
    description: "2ème Prix - Solution intelligente pour les services publics",
    images: [
      "/adw/WhatsApp Image 2025-12-10 at 20.45.10_15dd37bf.jpg",
      "/adw/WhatsApp Image 2025-12-10 at 20.45.06_48710759.jpg",
      "/adw/WhatsApp Image 2025-12-10 at 20.45.09_23defe9c.jpg",
    ],
    date: "Juin 2025",
    location: "ADW 2025",
    color: "#00C897",
  },
  {
    category: "events",
    title: "Journée mondiale de l'alimentation 2025",
    description: "3ème meilleur application agricole en Côte d'Ivoire",
    images: ["/jma/IMG-20251128-WA0003.jpg", "/jma/FB_IMG_1764283243602.jpg"],
    date: "Novembre 2025",
    location: "JMA 2025",
    color: "#F653FF",
  },
  {
    category: "team",
    title: "Cellule d'Innovation et de Developpement de l'ESATIC (CID)",
    description: "Membre actif de la CID",
    images: ["/cid/IMG-20250315-WA0002.jpg", "/cid/Screenshot_2025-07-05-01-50-43-623_com.whatsapp.jpg"],
    date: "Depuis 2022",
    location: "CID ESATIC",
    color: "#FF6B3D",
  },
  {
    category: "mentoring",
    title: "Formation securité digitale",
    description: "Atelier de formation sur la sécurité digitale pour les étudiants de l'AEEMCI",
    images: ["/sd/IMG-20251031-WA0021.jpg"],
    date: "Novembre 2024",
    location: "ESATIC",
    color: "#00D9FF",
  },
  {
    category: "events",
    title: "Soutenance de Projet de Fin d'Études",
    description:
      "Présentation réussie de mon projet de fin d'études en Systèmes Réseaux Informatique et Télécommunications (SRIT)",
    images: ["/l3/BD7A4058.jpg", "/l3/BD7A4087.jpg", "/l3/BD7A4017.jpg", "/l3/BD7A4073.jpg"],
    date: "Novembre 2024",
    location: "ESATIC",
    color: "#00D9FF",
  },
  {
    category: "team",
    title: "Chef de l'Équipe KANIA - Orange Digital Center",
    description: "Equipe de travail à l'Orange Digital Center (ODC) Equipe KANIA",
    images: ["/odc/BD7A1399.jpg", "/odc/BD7A1274.jpg", "/odc/BD7A1415.jpg"],
    date: "Depuis 2022",
    location: "CID ESATIC",
    color: "#FF6B3D",
  },
  {
    category: "events",
    title: "Panel SDI 2025 - ESATIC",
    description:
      "Intervention lors du panel sur les innovations technologiques locales au service la préservation de l'environnement et du développement durable.",
    images: ["/sdi/8E9A1822.jpg", "/sdi/8E9A2003.jpg", "/sdi/8E9A2030.jpg"],
    date: "Depuis 2022",
    location: "CID ESATIC",
    color: "#FF6B3D",
  },
]

export const skillCategoriesFallback: SkillCategoryRow[] = [
  {
    slug: "frontend",
    title: "Frontend & Mobile",
    icon: "Code2",
    color: "#5B8BFF",
    description: "Interfaces modernes et réactives",
    skills: [
      { name: "React.js", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "TypeScript", level: 80, icon: "📘" },
      { name: "Flutter", level: 70, icon: "📲" },
      { name: "React Native", level: 88, icon: "📱" },
      { name: "CSS", level: 98, icon: "🎨" },
      { name: "JavaScript vanilla", level: 98, icon: "⚡" },
      { name: "Vue.js", level: 90, icon: "💚" },
    ],
  },
  {
    slug: "backend",
    title: "Backend & API",
    icon: "Zap",
    color: "#06c776",
    description: "Architectures scalables et performantes",
    skills: [
      { name: "Node.js", level: 92, icon: "🟢" },
      { name: "Express.js", level: 90, icon: "🚂" },
      { name: "Nest.js", level: 60, icon: "🦉" },
      { name: "Fastify", level: 85, icon: "⚡" },
      { name: "Socket.io", level: 88, icon: "🔌" },
      { name: "Prisma ORM", level: 88, icon: "🔷" },
      { name: "Mongoose ORM", level: 90, icon: "🌲" },
      { name: "REST API", level: 93, icon: "🔗" },
      { name: "FastAPI", level: 70, icon: "🚀" },
      { name: "Spring Boot", level: 40, icon: "🌳" },
      { name: "Flask", level: 65, icon: "🐍" },
    ],
  },
  {
    slug: "ia",
    title: "Automatisation IA",
    icon: "Bot",
    color: "#9D7BFF",
    description: "Workflows et intégration de LLM au service des processus métiers",
    skills: [
      { name: "n8n", level: 85, icon: "" },
      { name: "LLM", level: 80, icon: "" },
      { name: "RAG", level: 75, icon: "" },
      { name: "Qdrant", level: 70, icon: "" },
      { name: "Claude", level: 80, icon: "" },
    ],
  },
  {
    slug: "database",
    title: "Bases de Données",
    icon: "Database",
    color: "#FF6B3D",
    description: "Stockage et gestion des données",
    skills: [
      { name: "MongoDB", level: 88, icon: "🍃" },
      { name: "PostgreSQL", level: 85, icon: "🐘" },
      { name: "Firebase", level: 82, icon: "🔥" },
      { name: "MySQL", level: 85, icon: "🐬" },
      { name: "SQLite", level: 80, icon: "💾" },
      { name: "Cassandra", level: 70, icon: "🧠" },
    ],
  },
  {
    slug: "devops",
    title: "DevOps",
    icon: "Server",
    color: "#3DDC84",
    description: "Conteneurs, intégration continue et déploiement",
    skills: [
      { name: "Docker", level: 80, icon: "" },
      { name: "Docker Compose", level: 80, icon: "" },
      { name: "GitHub Actions", level: 80, icon: "" },
      { name: "Jenkins", level: 65, icon: "" },
      { name: "1Panel", level: 70, icon: "" },
    ],
  },
  {
    slug: "iot",
    title: "IoT & Systèmes Embarqués",
    icon: "Cpu",
    color: "#F653FF",
    description: "Internet des objets et hardware",
    skills: [
      { name: "ESP32", level: 85, icon: "📡" },
      { name: "Arduino", level: 82, icon: "🤖" },
      { name: "Node-RED", level: 82, icon: "🔴" },
      { name: "C++", level: 80, icon: "⚙️" },
    ],
  },
  {
    slug: "datascience",
    title: "Data Science",
    icon: "TrendingUp",
    color: "#FFBE0B",
    description: "Analyse de données et intelligence artificielle",
    skills: [
      { name: "Python", level: 90, icon: "🐍" },
      { name: "Pandas", level: 55, icon: "🐼" },
      { name: "NumPy", level: 60, icon: "🔢" },
      { name: "Hugging Face", level: 50, icon: "🦙" },
      { name: "Google Colab", level: 80, icon: "📓" },
    ],
  },
]

export const toolsFallback: ToolRow[] = [
  { name: "Agile/Scrum", icon: "🔄", category: "Méthodologie" },
  { name: "Trello", icon: "📋", category: "Méthodologie" },
  { name: "Git/GitHub", icon: "🐙", category: "Versioning" },
  { name: "Figma", icon: "🎨", category: "Design" },
  { name: "Adobe Premiere", icon: "🎥", category: "Design" },
  { name: "Photoshop", icon: "", category: "Design" },
  { name: "Microsoft PowerPoint", icon: "📝", category: "Design" },
  { name: "Adobe XD", icon: "💎", category: "Design" },
  { name: "Power BI", icon: "📊", category: "Data" },
  { name: "Postman", icon: "📮", category: "API" },
  { name: "VS Code", icon: "💻", category: "IDE" },
]
