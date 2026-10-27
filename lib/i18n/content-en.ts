// ============================================================
// Traduction anglaise du contenu éditorial.
//
// La table associe une phrase française exacte à sa version
// anglaise. Elle est appliquée en profondeur aux objets rendus
// par `useSiteContent` / `useTable`, donc elle traduit aussi
// bien les données de secours que le contenu saisi dans le
// backoffice, tant que la phrase y est identique.
// Une phrase absente de la table reste en français : rien ne
// casse, il manque seulement une traduction.
// ============================================================

export const CONTENT_EN: Record<string, string> = {
  // ---------- Premier écran ----------
  "Disponible pour des missions freelance": "Available for freelance work",
  "Développeur full stack & IA · Abidjan": "Full stack & AI developer · Abidjan",
  "Web • Mobile • IA": "Web • Mobile • AI",
  "Ingénieur logiciel diplômé du Master SIGL de l'ESATIC. Je développe des applications web et mobiles et j'automatise les processus métiers par l'IA : workflows n8n, LLM, RAG. Neuf fois primé depuis 2022, le plus souvent comme chef de projet.":
    "Software engineer, holder of the SIGL master's degree from ESATIC. I build web and mobile applications and automate business processes with AI: n8n workflows, LLMs, RAG. Nine times awarded since 2022, most often as the project lead.",
  "Chef de projet": "Project lead",
  "Web · Mobile · IA": "Web · Mobile · AI",
  "Développeur full stack": "Full stack developer",
  "Automatisation IA": "AI automation",
  "9 distinctions depuis 2022": "9 awards since 2022",
  "Développeur Full Stack & IA": "Full Stack & AI Developer",

  // ---------- À propos ----------
  "À Propos de Moi": "About Me",
  "Ingénieur logiciel • Master SIGL ESATIC • Abidjan": "Software engineer • SIGL master's, ESATIC • Abidjan",
  "Full stack & IA,": "Full stack & AI,",
  "souvent chef de projet": "often the project lead",
  "Président du club communication digitale ESATIC • Chargé du digital au C2E • Project Planner GDSC ESATIC • Membre de la CID":
    "President of the ESATIC digital communication club • Digital officer at C2E • Project Planner, GDSC ESATIC • Member of the CID",
  "🌱 Meilleure innovation inclusive SahelTech • 🏆 1er Prix Moov Application • 🏆 1er Prix ICESCO • 🥈 2ème Prix ADW • 🥉 3ème Intech Challenge • 🥉 Prix FAO (Journée mondiale de l'alimentation) • 🎓 2ème Prix APP03 • 🥈 2ème Prix GS2E":
    "🌱 Best inclusive innovation, SahelTech • 🏆 1st Prize, Moov Application • 🏆 1st Prize, ICESCO • 🥈 2nd Prize, ADW • 🥉 3rd, Intech Challenge • 🥉 FAO award (World Food Day) • 🎓 2nd Prize, APP03 • 🥈 2nd Prize, GS2E",
  "Distinctions depuis 2022": "Awards since 2022",
  "Premiers prix (ICESCO, Moov)": "First prizes (ICESCO, Moov)",
  "Années d'expérience": "Years of experience",
  "Ingénieur logiciel spécialisé en développement full stack et en automatisation par l'intelligence artificielle.":
    "Software engineer specialised in full stack development and in automation through artificial intelligence.",
  "Parcours": "Background",
  "Un parcours marqué par le leadership": "A path shaped by leadership",
  "De la Licence SRIT au Master SIGL de l'ESATIC, dont je suis diplômé, j'ai construit une double compétence : développer et piloter. Chef de projet à l'Orange Digital Center, lead full stack chez IzySend, chef d'équipe sur la plupart des compétitions que j'ai remportées. Aujourd'hui chez Orange, je me concentre sur l'automatisation par l'IA : workflows n8n, intégration de LLM et de systèmes RAG au service des processus métiers.":
    "From the SRIT bachelor's to the SIGL master's at ESATIC, which I graduated from, I built a double skill set: building and leading. Project lead at the Orange Digital Center, full stack lead at IzySend, team lead in most of the competitions I won. Today at Orange, I focus on AI automation: n8n workflows, LLM and RAG systems serving business processes.",
  "🌍 1er Prix International ICESCO · 🏆 1er Prix Moov Application · 🌱 Prix Inclusion SahelTech · 🇨🇮 2ème Prix National ADW":
    "🌍 1st International Prize, ICESCO · 🏆 1st Prize, Moov Application · 🌱 Inclusion Prize, SahelTech · 🇨🇮 2nd National Prize, ADW",
  "Philosophie": "Philosophy",
  "Code avec impact, tech avec sens": "Code with impact, tech with meaning",
  "Je crois que la technologie doit servir un objectif plus grand : résoudre des problèmes réels et améliorer des vies. Mon approche combine excellence technique, pensée systémique et impact mesurable. Chaque ligne de code est une opportunité de créer quelque chose de significatif.":
    "I believe technology has to serve a bigger purpose: solving real problems and improving lives. My approach combines technical excellence, systems thinking and measurable impact. Every line of code is a chance to build something meaningful.",
  "Objectifs": "Goals",
  "Construire l'avenir tech africain": "Building the African tech future",
  "Mon ambition est de contribuer à l'écosystème tech africain en tant que développeur expert et leader technologique. À travers l'enseignement (GOMYCODE), le leadership (Président club digital ESATIC, GDSC Project Planner) et des projets innovants, je veux inspirer la prochaine génération de développeurs.":
    "My ambition is to contribute to the African tech ecosystem as an expert developer and a technology leader. Through teaching (GOMYCODE), leadership (President of the ESATIC digital club, GDSC Project Planner) and innovative projects, I want to inspire the next generation of developers.",

  // ---------- Victoires ----------
  "Prix de la meilleure innovation inclusive": "Best inclusive innovation award",
  "Sahel Tech Innovation Challenge (STIC'26), Burkina Faso. Le projet INA (I'm Not Alone) remporte le prix de l'innovation inclusive parmi près de 60 équipes, avec une présentation en ligne.":
    "Sahel Tech Innovation Challenge (STIC'26), Burkina Faso. The INA project (I'm Not Alone) won the inclusive innovation award among nearly 60 teams, with an online presentation.",
  "Près de 60 équipes en compétition": "Nearly 60 teams competing",
  "Projet INA (I'm Not Alone)": "INA project (I'm Not Alone)",
  "Présentation en ligne": "Online presentation",
  "1er Prix Compétition Moov Application": "1st Prize Moov Application Competition",
  "1er prix et Prix d'innovation de la compétition Moov Application":
    "1st prize and Innovation Prize of the Moov Application competition",
  "Plateforme d'écoute anonyme et d'orientation en santé mentale":
    "Anonymous listening and mental health guidance platform",
  "Chef d'équipe : coordination et pilotage du projet": "Team lead: project coordination and steering",
  "PWA Next.js et Supabase": "Next.js and Supabase PWA",
  "3ème Place Intech Challenge": "3rd Place Intech Challenge",
  "Solution d'amélioration du service client des sites du Domaine Bini, avec le contrôle et la gestion des sites intégrés. 3e face à plusieurs écoles, et meilleure équipe à présenter un projet terminé.":
    "A solution to improve customer service across the Domaine Bini sites, with built-in site control and management. 3rd against several schools, and the best team to present a finished project.",
  "Service client des sites du Domaine Bini": "Customer service for the Domaine Bini sites",
  "Contrôle et gestion des sites intégrés": "Built-in site control and management",
  "Meilleure équipe avec un projet terminé": "Best team with a finished project",
  "3ème Meilleure application de Côte d'Ivoire": "3rd Best application in Côte d'Ivoire",
  "Prix FAO, Journée mondiale de l'alimentation, Ministère de l'Agriculture. Application IoT pour la gestion agricole intelligente":
    "FAO award, World Food Day, Ministry of Agriculture. IoT application for smart farm management",
  "Surveillance en temps réel des cultures": "Real-time crop monitoring",
  "Alertes automatisées pour les agriculteurs": "Automated alerts for farmers",
  "Optimisation des rendements agricoles": "Crop yield optimisation",
  "2ème Prix African Digital Week Hackathon": "2nd Prize African Digital Week Hackathon",
  "Services publics accessibles avec IA multilingue en Côte d'Ivoire":
    "Accessible public services with multilingual AI in Côte d'Ivoire",
  "Chef d'équipe et coordination du projet": "Team lead and project coordination",
  "Plateforme citoyenne innovante": "Innovative citizen platform",
  "Intégration LLM pour assistance intelligente": "LLM integration for smart assistance",
  "1er Prix Hackathon ICESCO (MASS 2025)": "1st Prize ICESCO Hackathon (MASS 2025)",
  "Solution intelligente pour l'agriculture durable en Afrique":
    "Smart solution for sustainable farming in Africa",
  "Système IoT avec capteurs et télédétection": "IoT system with sensors and remote sensing",
  "Intégration d'Intelligence Artificielle": "Artificial intelligence integration",
  "Impact social en milieu agricole africain": "Social impact in African farming communities",
  "2ème Prix Apprentissage par Projet 03": "2nd Prize Project-Based Learning 03",
  "ESATIC. Valorisation du secteur vivrier en Côte d'Ivoire":
    "ESATIC. Adding value to the food crop sector in Côte d'Ivoire",
  "Solution web interactive": "Interactive web solution",
  "Data visualization avancée": "Advanced data visualisation",
  "Impact économique et social": "Economic and social impact",
  "2ème Prix Hackathon GS2E": "2nd Prize GS2E Hackathon",
  "Système de gestion de la consommation électrique dans une maison connectée":
    "Electricity consumption management system for a connected home",

  // ---------- Vitrine des trophées ----------
  "Prix de l'innovation inclusive": "Inclusive innovation award",
  "1er Prix, Grand Prix ICESCO": "1st Prize, ICESCO Grand Prix",

  // ---------- Dates ----------
  "Mai 2026": "May 2026",
  "Déc. 2025": "Dec. 2025",
  "Mai–juin 2025": "May–June 2025",
  "Mai 2025": "May 2025",
  "Janv. 2022": "Jan. 2022",
  "Avril 2025": "April 2025",
  "Juin 2025": "June 2025",
  "Novembre 2025": "November 2025",
  "Novembre 2024": "November 2024",
  "Depuis 2022": "Since 2022",

  // ---------- Périodes et durées ----------
  "Depuis mai 2026": "Since May 2026",
  "Décembre 2025 - 2026": "December 2025 - 2026",
  "Janvier - Mai 2026": "January - May 2026",
  "Décembre 2025": "December 2025",
  "Avril - Décembre 2024": "April - December 2024",
  "Septembre 2024 - Mars 2026": "September 2024 - March 2026",
  "Septembre 2023 - Juin 2025": "September 2023 - June 2025",
  "Août - Novembre 2023": "August - November 2023",
  "Mai - Juin 2025": "May - June 2025",
  "Août 2025 - En cours": "August 2025 - Ongoing",
  "Août - Décembre 2025": "August - December 2025",
  "Octobre 2023 - Février 2024": "October 2023 - February 2024",
  "Janvier - Mai 2023": "January - May 2023",
  "Janvier - Juin 2022": "January - June 2022",
  "Janvier 2022": "January 2022",
  "Décembre 2022 - Janvier 2023": "December 2022 - January 2023",
  "5+ mois": "5+ months",
  "5 mois": "5 months",
  "9 mois": "9 months",
  "19 mois": "19 months",
  "4+ mois": "4+ months",
  "4 mois": "4 months",
  "6 mois": "6 months",
  "2 mois": "2 months",
  "1 mois": "1 month",
  "3 jours": "3 days",
  "2 ans": "2 years",

  // ---------- Types de mission ----------
  "Entreprise": "Company",
  "Compétition": "Competition",
  "Projet": "Project",
  "Enseignement": "Teaching",
  "Projet Académique": "Academic project",
  "Projet Associatif": "Student club project",

  // ---------- Parcours : intitulés de poste ----------
  "Développeur Full Stack & Automatisation IA": "Full Stack Developer & AI Automation",
  "Full Stack Lead - Freelance": "Full Stack Lead — Freelance",
  "Développeur Full Stack": "Full Stack Developer",
  "1er Prix & Prix d'innovation - Compétition Moov Application":
    "1st Prize & Innovation Prize — Moov Application Competition",
  "Chef de Projet / Développeur Full Stack": "Project Lead / Full Stack Developer",
  "Développeur Backend - Freelance": "Backend Developer — Freelance",
  "Instructeur de Programmation": "Programming Instructor",
  "Développeur Frontend - Freelance": "Frontend Developer — Freelance",
  "1er Prix - Hackathon ICESCO": "1st Prize — ICESCO Hackathon",
  "2ème Prix - African Digital Week Hackathon": "2nd Prize — African Digital Week Hackathon",
  "Chef de Projet / Développeur Full Stack - Intech Challenge 2025":
    "Project Lead / Full Stack Developer — Intech Challenge 2025",
  "2ème Prix - APPRENTISSAGE PAR PROJET 03": "2nd Prize — PROJECT-BASED LEARNING 03",
  "APPRENTISSAGE PAR PROJET 02": "PROJECT-BASED LEARNING 02",
  "APPRENTISSAGE PAR PROJET 01": "PROJECT-BASED LEARNING 01",
  "2ème Prix - Hackathon Gestion Consommation Électrique":
    "2nd Prize — Electricity Consumption Management Hackathon",
  "Projet Interne - Chat Club Informatique": "Internal project — Computer club chat",

  // ---------- Parcours : employeurs ----------
  "Système de Gestion de Flotte": "Fleet Management System",
  "MASS 2025 (MARCHÉ AFRICAIN DES SOLUTIONS SPATIALES)": "MASS 2025 (AFRICAN MARKET FOR SPACE SOLUTIONS)",
  "Séminaire An-Nour": "An-Nour Seminar",

  // ---------- Parcours : résumés ----------
  "Développement full stack d'applications web et mobiles, et automatisation des processus métiers par l'intelligence artificielle.":
    "Full stack development of web and mobile applications, and automation of business processes through artificial intelligence.",
  "Plateforme de transfert hybride de l'Europe vers l'Afrique : bons d'achat et cash via Mobile Money et Visa.":
    "Hybrid transfer platform from Europe to Africa: vouchers and cash through Mobile Money and Visa.",
  "Conception et développement d'une plateforme de digitalisation et d'exécution des procédures d'entreprise.":
    "Design and development of a platform to digitalise and run company procedures.",
  "Plateforme d'écoute anonyme, de suivi, de sensibilisation et d'orientation vers des experts en santé mentale.":
    "Platform for anonymous listening, follow-up, awareness and referral to mental health experts.",
  "Pilotage d'un projet de surveillance énergétique temps réel des sites d'Orange CI avec détection d'anomalies pour optimiser la consommation.":
    "Leading a real-time energy monitoring project across Orange CI sites, with anomaly detection to optimise consumption.",
  "Développement d'une API REST robuste pour le suivi temps réel de flottes avec websockets, géolocalisation et authentification JWT sécurisée.":
    "Development of a robust REST API for real-time fleet tracking with websockets, geolocation and secure JWT authentication.",
  "Cours d'introduction au développement web et au Full Stack JavaScript, encadrement et accompagnement des apprenants.":
    "Introductory courses in web development and Full Stack JavaScript, mentoring and supporting learners.",
  "Construction d'une interface responsive pour application de mise en relation agriculteurs-entreprises avec intégration API.":
    "Building a responsive interface for an app connecting farmers and companies, with API integration.",
  "Conception d'une solution intelligente pour l'agriculture durable en Afrique combinant IoT, IA et télédétection.":
    "Design of a smart solution for sustainable farming in Africa, combining IoT, AI and remote sensing.",
  "Chef d'équipe - Conception d'une solution pour des services publics accessibles en Côte d'Ivoire avec IA multilingue.":
    "Team lead — design of a solution for accessible public services in Côte d'Ivoire with multilingual AI.",
  "Chef d'équipe frontend pour la digitalisation complète du Séminaire Islamique An-Nour : gestion administrative, financière, scientifique et inscriptions.":
    "Frontend team lead for the full digitalisation of the An-Nour Islamic Seminar: administration, finance, academics and registrations.",
  "Digitalisation de l'écotourisme du Domaine Bini (11 sites) : réservations en ligne, paiements intégrés, visites immersives 360°, dashboard IA et CRM multisite.":
    "Digitalisation of ecotourism at Domaine Bini (11 sites): online bookings, built-in payments, immersive 360° tours, AI dashboard and multi-site CRM.",
  "Valorisation du secteur du vivrier en Côte d'Ivoire de la production à la commercialisation.":
    "Adding value to the food crop sector in Côte d'Ivoire, from production to sale.",
  "Mise en place d'un système d'enchère en ligne sécurisée avec gestion temps réel.":
    "Building a secure online auction system with real-time management.",
  "Mise en place d'une plateforme de valorisation des performances scolaires en Côte d'Ivoire.":
    "Building a platform to showcase school performance in Côte d'Ivoire.",
  "Mise en place d'un système de gestion de la consommation électrique dans une maison connectée.":
    "Building an electricity consumption management system for a connected home.",
  "Mise en place d'un chat instantané pour le club informatique (messagerie instantanée).":
    "Building an instant chat for the computer club (instant messaging).",

  // ---------- Parcours : réalisations ----------
  "ARIA : plateforme ITSM de la DSI (tickets, routage intelligent, SLA, incidents, assistant IA avec RAG)":
    "ARIA: the IT department's ITSM platform (tickets, smart routing, SLAs, incidents, AI assistant with RAG)",
  "Cockpit Projets : collecte des expressions de besoin des directions, workflow de validation et détection IA des projets similaires":
    "Cockpit Projets: collecting requirements from each division, approval workflow and AI detection of similar projects",
  "Parc IT : inventaire synchronisé SCCM, stock, demandes de matériel (DMI) et assistant qui interroge le parc":
    "Parc IT: SCCM-synchronised inventory, stock, hardware requests (DMI) and an assistant that queries the fleet",
  "Module de détection, sur image, de l'action à effectuer par un chatbot (n8n)":
    "Module that detects, from an image, the action a chatbot has to perform (n8n)",
  "Agents et automatisations n8n, recherche vectorielle Qdrant": "n8n agents and automations, Qdrant vector search",
  "Architecture modulaire NestJS (TypeScript) + PostgreSQL (Prisma / TypeORM)":
    "Modular NestJS architecture (TypeScript) + PostgreSQL (Prisma / TypeORM)",
  "Paiements Stripe, Mobile Money pawaPay, bons d'achat Zendit / Prizy":
    "Stripe payments, pawaPay Mobile Money, Zendit / Prizy vouchers",
  "Intégration des maquettes Figma en Next.js / React (PWA responsive)":
    "Figma designs implemented in Next.js / React (responsive PWA)",
  "Pipeline CI/CD (Docker, GitHub Actions) et déploiement sur VPS OVH":
    "CI/CD pipeline (Docker, GitHub Actions) and deployment on an OVH VPS",
  "Conception de l'architecture et développement full stack de la plateforme (frontend et backend)":
    "Architecture design and full stack development of the platform (frontend and backend)",
  "Workflows digitalisés : création, exécution et suivi des procédures d'entreprise":
    "Digitalised workflows: creating, running and tracking company procedures",
  "Chef d'équipe, en charge de la coordination et du pilotage du projet":
    "Team lead, in charge of coordinating and steering the project",
  "Développement d'une PWA avec Next.js et Supabase": "Development of a PWA with Next.js and Supabase",
  "UX optimisée et mise en relation avec des experts certifiés":
    "Optimised UX and matching with certified experts",
  "Rédaction du cahier des charges fonctionnel et technique": "Writing the functional and technical specifications",
  "Système complet de monitoring avec alertes temps réel": "Complete monitoring system with real-time alerts",
  "Dashboard interactif avec visualisations Highcharts": "Interactive dashboard with Highcharts visualisations",
  "Réduction de 30% des anomalies énergétiques détectées": "30% fewer detected energy anomalies",
  "Documentation technique et coordination avec les tuteurs":
    "Technical documentation and coordination with the supervisors",
  "API REST complète avec 30+ endpoints": "Complete REST API with 30+ endpoints",
  "Suivi temps réel de +25 véhicules (pannes, trajets, géolocalisation)":
    "Real-time tracking of 25+ vehicles (breakdowns, trips, geolocation)",
  "Architecture scalable avec Prisma ORM": "Scalable architecture with Prisma ORM",
  "API REST sécurisées : authentification, gestion des véhicules et des chauffeurs":
    "Secured REST APIs: authentication, vehicle and driver management",
  "Tests fonctionnels, documentation et livraison d'un backend prêt à l'intégration":
    "Functional tests, documentation and delivery of an integration-ready backend",
  "Préparation et animation de séances sur les fondamentaux HTML, CSS, JavaScript":
    "Preparing and running sessions on HTML, CSS and JavaScript fundamentals",
  "Encadrement des apprenants sur des projets web dynamiques (portfolios, to-do apps…)":
    "Mentoring learners on dynamic web projects (portfolios, to-do apps…)",
  "Conception de projets pédagogiques full stack : React + Express avec base de données":
    "Designing full stack teaching projects: React + Express with a database",
  "Accompagnement personnalisé : code review, corrections, conseils techniques":
    "One-to-one support: code review, corrections, technical advice",
  "Interface moderne responsive (mobile-first) avec React.js":
    "Modern responsive interface (mobile-first) with React.js",
  "Intégration API REST pour profils, offres et messagerie":
    "REST API integration for profiles, listings and messaging",
  "UX fluide et composants dynamiques": "Smooth UX and dynamic components",
  "Optimisation performance (Lighthouse 95+)": "Performance optimisation (Lighthouse 95+)",
  "1er Prix du Hackathon ICESCO": "1st Prize of the ICESCO Hackathon",
  "Système IoT avec capteurs, IA et télédétection": "IoT system with sensors, AI and remote sensing",
  "Analyse qualité des sols et de l'eau pour agriculture optimisée":
    "Soil and water quality analysis for optimised farming",
  "Plateforme de suivi et aide à la décision pour agriculteurs":
    "Monitoring and decision-support platform for farmers",
  "Simulation des rendements et recommandations de culture": "Yield simulation and crop recommendations",
  "2ème Prix du Hackathon ADW": "2nd Prize of the ADW Hackathon",
  "Développement frontend de la plateforme citoyenne": "Frontend development of the citizen platform",
  "Intégration d'un LLM pour assistance intelligente multilingue":
    "LLM integration for smart multilingual assistance",
  "Lead frontend d'une équipe de 3 développeurs": "Frontend lead of a team of 3 developers",
  "Développement UI/UX pour 4 commissions (Admin, Finance, Scientifique, Séminaristes)":
    "UI/UX development for 4 committees (Admin, Finance, Academics, Attendees)",
  "Interface de vente de tickets avec panier et paiement Mobile Money":
    "Ticket sales interface with a cart and Mobile Money payment",
  "Système d'inscription intelligent avec upload/capture photos et validation multi-étapes":
    "Smart registration system with photo upload/capture and multi-step validation",
  "Dashboard SuperAdmin avec gestion des rôles et permissions":
    "SuperAdmin dashboard with role and permission management",
  "UI gestion des emplois du temps et suivi académique des séminaristes":
    "UI for timetable management and academic tracking of attendees",
  "Système de réservation multisite avec calendrier temps réel":
    "Multi-site booking system with a real-time calendar",
  "Intégration paiements Mobile Money (CinetPay) et cartes bancaires (Stripe)":
    "Mobile Money (CinetPay) and bank card (Stripe) payment integration",
  "Visites immersives 360° avec A-Frame et Marzipano": "Immersive 360° tours with A-Frame and Marzipano",
  "Cartographie interactive avec Leaflet (11 sites géolocalisés)":
    "Interactive mapping with Leaflet (11 geolocated sites)",
  "Dashboard PDG avec IA : analyse des avis clients, recommandations stratégiques, alertes proactives":
    "CEO dashboard with AI: customer review analysis, strategic recommendations, proactive alerts",
  "2ème Prix du concours APP03": "2nd Prize of the APP03 contest",
  "Analyse des besoins des producteurs et commerçants": "Needs analysis with growers and traders",
  "Développement d'une application web pour la vente": "Development of a web app for selling",
  "Conception d'un tableau de bord de suivi des activités": "Design of an activity tracking dashboard",
  "Architecture technique et base de données complètes": "Complete technical architecture and database",
  "Backend Node.js avec système d'authentification": "Node.js backend with an authentication system",
  "Intégration frontend HTML/CSS": "HTML/CSS frontend integration",
  "Logique d'enchère en temps réel": "Real-time bidding logic",
  "Plateforme complète de gestion des performances": "Complete performance management platform",
  "Système de suivi et d'analyse des résultats": "System for tracking and analysing results",
  "Interface intuitive pour enseignants et élèves": "Intuitive interface for teachers and pupils",
  "Base de données relationnelle optimisée": "Optimised relational database",
  "Système IoT de monitoring énergétique": "IoT energy monitoring system",
  "Dashboard temps réel de consommation": "Real-time consumption dashboard",
  "Alertes automatiques de surconsommation": "Automatic over-consumption alerts",
  "Intégration capteurs ESP32": "ESP32 sensor integration",
  "Application de messagerie temps réel": "Real-time messaging application",
  "Interface utilisateur moderne et responsive": "Modern, responsive user interface",
  "Système de notifications instantanées": "Instant notification system",
  "Gestion des conversations de groupe": "Group conversation management",

  // ---------- Parcours : impact ----------
  "IA": "AI",
  "1er": "1st",
  "2ème": "2nd",
  "3e": "3rd",
  "Processus automatisés": "Processes automated",
  "Données temps réel": "Real-time data",
  "Véhicules suivis": "Vehicles tracked",
  "Étudiants formés": "Students trained",
  "REST intégrée": "REST integrated",
  "Prix ICESCO": "ICESCO prize",
  "Prix ADW": "ADW prize",
  "Prix Moov": "Moov prize",
  "Prix APP03": "APP03 prize",
  "Frontend complété": "Frontend completed",
  "Place Intech Challenge": "Intech Challenge place",
  "Projet validé": "Project approved",
  "Prototype validé": "Prototype approved",
  "Utilisateurs actifs": "Active users",

  // ---------- Formation ----------
  "Master Systèmes d'Information et Génie Logiciel":
    "Master's in Information Systems and Software Engineering",
  "Licence Systèmes de Réseaux Informatiques et de Télécommunications":
    "Bachelor's in Computer Networks and Telecommunications Systems",
  "Formation Data Science": "Data Science programme",
  "Formation Data Science & IA": "Data Science & AI programme",
  "Baccalauréat Scientifique": "Science Baccalaureate",
  "Baccalauréat série D": "Baccalaureate, series D (science)",
  "Diplômé": "Graduated",
  "En cours": "Ongoing",
  "Obtenu": "Obtained",
  "2024 - En cours": "2024 - Ongoing",

  // ---------- Projets ----------
  "IA & Automatisation": "AI & Automation",
  "ARIA - Gestion des services IT, DSI Orange CI": "ARIA — IT service management, Orange CI IT department",
  "Agent de Résolution Intelligente des Anomalies : le service desk de la DSI d'Orange Côte d'Ivoire. Portail demandeur et backoffice DSI : tickets, qualification et routage IA vers la bonne corbeille (nomenclature GLPI, règles métier, recherche vectorielle), incidents, problèmes et changements, SLA (TTO / TTR), météo DSI avec QoS et NPS, assistant ARIA avec RAG et laboratoire IA entraîné sur les tickets validés.":
    "Agent de Résolution Intelligente des Anomalies: the service desk of the Orange Côte d'Ivoire IT department. Requester portal and IT back office: tickets, AI qualification and routing to the right queue (GLPI taxonomy, business rules, vector search), incidents, problems and changes, SLAs (TTO / TTR), IT weather report with QoS and NPS, ARIA assistant with RAG and an AI lab trained on validated tickets.",
  "Cockpit Projets - Expressions de besoin, Orange CI": "Cockpit Projets — Requirements intake, Orange CI",
  "Chaque direction exprime ses besoins par campagne, dans un parcours en 6 étapes aligné sur la stratégie « Trust the Future ». Centralisation, workflow de validation, suivi budgétaire (estimé, approuvé, consommé) et assistant IA qui fait ressortir les projets similaires.":
    "Each division states its needs campaign by campaign, through a 6-step flow aligned with the “Trust the Future” strategy. Centralisation, approval workflow, budget tracking (estimated, approved, spent) and an AI assistant that surfaces similar projects.",
  "Parc IT - Gestion du parc informatique, Orange CI": "Parc IT — IT asset management, Orange CI",
  "Pilotage du parc bureautique de la DSI : inventaire consolidé depuis SCCM, stock, carte du parc par ville, demandes de matériel (DMI) transmises par n8n, packs d'équipement, retours et assistant qui interroge le parc en français avec des chiffres calculés par l'API.":
    "Managing the IT department's office equipment: inventory consolidated from SCCM, stock, an asset map by city, hardware requests (DMI) routed through n8n, equipment packs, returns, and an assistant that queries the fleet in plain language with figures computed by the API.",
  "Vision pour chatbot - Orange CI": "Vision for a chatbot — Orange CI",
  "Module en cours : détecte sur une image le type d'action que le chatbot doit effectuer, orchestré avec n8n.":
    "Work in progress: detects from an image the kind of action the chatbot has to perform, orchestrated with n8n.",
  "Système de Surveillance Énergétique Orange CI": "Orange CI Energy Monitoring System",
  "Système IoT complet pour la surveillance énergétique temps réel avec détection d'anomalies et alertes.":
    "Complete IoT system for real-time energy monitoring with anomaly detection and alerts.",
  "Chef de Projet": "Project Lead",
  "Plateforme de transfert hybride de l'Europe vers l'Afrique : bons d'achat et cash via Mobile Money et Visa. Architecture modulaire, paiements multi-fournisseurs, PWA responsive.":
    "Hybrid transfer platform from Europe to Africa: vouchers and cash through Mobile Money and Visa. Modular architecture, multi-provider payments, responsive PWA.",
  "Plateforme santé mentale - Moov Application": "Mental health platform — Moov Application",
  "1er prix et Prix d'innovation. Écoute anonyme, suivi, sensibilisation et orientation vers des experts certifiés en santé mentale.":
    "1st prize and Innovation Prize. Anonymous listening, follow-up, awareness and referral to certified mental health experts.",
  "Chef d'Équipe": "Team Lead",
  "1er Prix": "1st Prize",
  "Digitalisation des procédures - NEXORA": "Procedure digitalisation — NEXORA",
  "Plateforme de digitalisation et d'exécution des procédures d'entreprise : création, exécution et suivi des workflows.":
    "Platform to digitalise and run company procedures: creating, running and tracking workflows.",
  "Plateforme Gestion de Flotte": "Fleet Management Platform",
  "API REST sécurisée avec suivi temps réel des véhicules, authentification JWT et dashboards analytics.":
    "Secured REST API with real-time vehicle tracking, JWT authentication and analytics dashboards.",
  "Développeur Backend": "Backend Developer",
  "Solution Agriculture Durable - ICESCO": "Sustainable Farming Solution — ICESCO",
  "1er Prix du Hackathon ICESCO. Système IoT intelligent pour l'agriculture durable en Afrique.":
    "1st Prize of the ICESCO Hackathon. Smart IoT system for sustainable farming in Africa.",
  "Application MahouFarm": "MahouFarm app",
  "Application web responsive pour gestion agricole avec intégration API et interface intuitive.":
    "Responsive web app for farm management, with API integration and an intuitive interface.",
  "Développeur Frontend": "Frontend Developer",
  "Digitalisation Séminaire An-Nour": "An-Nour Seminar digitalisation",
  "Plateforme complète de gestion administrative, financière et académique pour un séminaire islamique.":
    "Complete administrative, financial and academic management platform for an Islamic seminar.",
  "Écotourisme Domaine Bini": "Domaine Bini ecotourism",
  "Plateforme de réservation multisite avec visites immersives 360°, paiements intégrés et dashboard IA.":
    "Multi-site booking platform with immersive 360° tours, built-in payments and an AI dashboard.",
  "Plateforme CitoyenneCI - African Digital Week": "CitoyenneCI platform — African Digital Week",
  "2ème Prix du Hackathon ADW. Solution innovante pour des services publics accessibles en Côte d'Ivoire avec IA multilingue.":
    "2nd Prize of the ADW Hackathon. An innovative solution for accessible public services in Côte d'Ivoire, with multilingual AI.",
  "2ème Prix": "2nd Prize",

  // ---------- Terrain ----------
  "1er Prix - Solution IoT Agriculture": "1st Prize — IoT farming solution",
  "Application IA pour l'agriculture": "AI application for farming",
  "Parc d'exposition": "Exhibition park",
  "Hackathon IA SARA 2025": "SARA AI Hackathon 2025",
  "2ème Prix - Solution intelligente pour les services publics":
    "2nd Prize — Smart solution for public services",
  "3ème meilleur application agricole en Côte d'Ivoire": "3rd best farming app in Côte d'Ivoire",
  "Journée mondiale de l'alimentation 2025": "World Food Day 2025",
  "Membre actif de la CID": "Active member of the CID",
  "Cellule d'Innovation et de Developpement de l'ESATIC (CID)":
    "ESATIC Innovation and Development Unit (CID)",
  "Atelier de formation sur la sécurité digitale pour les étudiants de l'AEEMCI":
    "Digital security training workshop for AEEMCI students",
  "Formation securité digitale": "Digital security training",
  "Présentation réussie de mon projet de fin d'études en Systèmes Réseaux Informatique et Télécommunications (SRIT)":
    "Successful defence of my final-year project in Computer Networks and Telecommunications Systems (SRIT)",
  "Soutenance de Projet de Fin d'Études": "Final-year project defence",
  "Equipe de travail à l'Orange Digital Center (ODC) Equipe KANIA":
    "Working team at the Orange Digital Center (ODC), team KANIA",
  "Chef de l'Équipe KANIA - Orange Digital Center": "Lead of team KANIA — Orange Digital Center",
  "Intervention lors du panel sur les innovations technologiques locales au service la préservation de l'environnement et du développement durable.":
    "Speaking at the panel on local technological innovation serving environmental protection and sustainable development.",

  // ---------- Outils ----------
  "Interfaces modernes et réactives": "Modern, responsive interfaces",
  "Architectures scalables et performantes": "Scalable, high-performance architectures",
  "Workflows et intégration de LLM au service des processus métiers":
    "Workflows and LLM integration serving business processes",
  "Stockage et gestion des données": "Storage and data management",
  "Bases de Données": "Databases",
  "Conteneurs, intégration continue et déploiement": "Containers, continuous integration and deployment",
  "Internet des objets et hardware": "Internet of things and hardware",
  "IoT & Systèmes Embarqués": "IoT & Embedded Systems",
  "Analyse de données et intelligence artificielle": "Data analysis and artificial intelligence",
  "Méthodologie": "Methodology",

  // ---------- Technologies nommées en français ----------
  "Télédétection": "Remote sensing",
  "Pédagogie": "Teaching",
  "Analyse métier": "Business analysis",

  // ---------- Certifications ----------
  "Gestion": "Management",
  "2025 - En cours": "2025 - Ongoing",
  // ---------- Contenu ajouté depuis le backoffice ----------
  "\u{1F680} Leadership \u00B7 \u{1F30D} Impact Africain \u00B7 \u{1F4DA} Transmission":
    "\u{1F680} Leadership \u00B7 \u{1F30D} African impact \u00B7 \u{1F4DA} Passing it on",
  "Compétition Moov Application": "Moov Application Competition",
  "Hackathon GS2E": "GS2E Hackathon",
  "1 er Prix": "1st Prize",
  "2 eme Prix": "2nd Prize",
  "Prix d'innovation": "Innovation Prize",
  "Capteurs": "Sensors",
  "Agent IA": "AI agent",
  "IA/ML": "AI/ML",
  "Centralisez tous vos CV au même endroit et postulez plus vite.\nonClick({.}) analyse l’offre et rédige des lettres et emails de candidature ultra-personnalisés en quelques secondes.":
    "Keep all your CVs in one place and apply faster.\nonClick({.}) reads the job ad and writes highly personalised cover letters and application emails in seconds.",
  "Application dédiée à la gestion du restaurant de l'entreprise Nexora":
    "An app dedicated to running the staff restaurant of the company Nexora",
  "Soutenance de Projet de Fin d'Études Master 2": "Master's final-year project defence",
  "Présentation réussie de mon projet de fin d'études en Systèmes d'Informations et Génie Logiciel":
    "Successful defence of my final-year project in Information Systems and Software Engineering",
  "Formation L’ART DU PROMPT ENGINEERING": "THE ART OF PROMPT ENGINEERING training",
  "Atelier de formation sur l'art du prompt engineering pour les étudiants et élèves de l'AEEMCI":
    "Training workshop on the art of prompt engineering, for AEEMCI students and pupils",
  "Comment concilier foi, excellence académique et préparation au monde professionnel ?":
    "How to reconcile faith, academic excellence and getting ready for working life?",
  "Ce thème s'articule autour de trois dimensions :\n1. La foi : préserver ses valeurs et son identité musulmane durant les études.\n2. L'excellence académique : réussir ses études et développer ses compétences.\n3. La préparation professionnelle : anticiper son insertion dans le monde du travail.":
    "The theme is built around three dimensions:\n1. Faith: holding on to your values and Muslim identity throughout your studies.\n2. Academic excellence: succeeding in your studies and growing your skills.\n3. Career readiness: preparing early for entering the world of work.",
  "Parc des expositions": "Exhibition park",
  "Juillet 2026": "July 2026",
  "Octobre 2026": "October 2026",
  "Septembre 2026": "September 2026",
}

/**
 * Clés dont la valeur n'est jamais du texte affichable : on ne les traverse pas.
 * Les codes de catégorie de la galerie (`events`, `team`, `mentoring`) sont, eux,
 * simplement absents de la table : ils sont traduits à l'affichage.
 */
const OPAQUE_KEYS = new Set([
  "id",
  "image",
  "images",
  "profileImage",
  "portrait",
  "logo",
  "color",
  "icon",
  "slug",
  "url",
  "demoUrl",
  "githubUrl",
  "cvUrl",
  "linkedinUrl",
  "certificateUrl",
  "verificationUrl",
  "certificateType",
  "email",
  "phone",
  "phoneHref",
  "github",
  "linkedin",
  "trophy",
  "backgroundImage",
])

/**
 * Traduit en profondeur les chaînes d'une valeur (objet, tableau, chaîne).
 * Les valeurs non traduites sont renvoyées telles quelles, et les objets
 * ne sont recopiés que lorsqu'une traduction s'applique réellement.
 */
export function translateContent<T>(value: T, map: Record<string, string> = CONTENT_EN): T {
  return walk(value, map, undefined) as T
}

function walk(value: unknown, map: Record<string, string>, key: string | undefined): unknown {
  if (typeof value === "string") {
    if (key && OPAQUE_KEYS.has(key)) return value
    return map[value] ?? map[value.trim()] ?? value
  }
  if (Array.isArray(value)) {
    let changed = false
    const next = value.map((item) => {
      const out = walk(item, map, key)
      if (out !== item) changed = true
      return out
    })
    return changed ? next : value
  }
  if (value && typeof value === "object") {
    let changed = false
    const next: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const out = walk(v, map, k)
      if (out !== v) changed = true
      next[k] = out
    }
    return changed ? next : value
  }
  return value
}
