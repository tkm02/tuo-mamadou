
"use client"

import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(0)
  const [view, setView] = useState<"timeline" | "grid">("timeline")
  const [showProofModal, setShowProofModal] = useState(false)
  const [currentProofIndex, setCurrentProofIndex] = useState(0)
  const [isDark, setIsDark] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

   const experiences = [
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
        "Système complet de monitoring avec alertes temps réel",
        "Dashboard interactif avec visualisations Highcharts",
        "Réduction de 30% des anomalies énergétiques détectées",
        "Documentation technique et coordination avec les tuteurs",
      ],
      technologies: [
        "Node.js",
        "Express.js",
        "React js",
        "Flutter",
        "MongoDB",
        "ESP32",
        "Socket.io",
        "Highcharts",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
      impact: "100%",
      impactLabel: "Données temps réel",
      proofs: [
        
      ],
    },
    {
      role: "Développeur Backend - Freelance",
      company: "Système de Gestion de Flotte",
      location: "Remote",
      period: "Septembre 2024 - Mars 2025",
      duration: "7 mois",
      type: "Freelance",
      logo: "🚗",
      description:
        "Développement d'une API REST robuste pour le suivi temps réel de flottes avec websockets, géolocalisation et authentification JWT sécurisée.",
      achievements: [
        "API REST complète avec 30+ endpoints",
        "Suivi temps réel de +25 véhicules (pannes, trajets, géolocalisation)",
        "Architecture scalable avec Prisma ORM",
        "Tests fonctionnels et documentation complète",
      ],
      technologies: [
        "Express.js",
        "Prisma",
        "MongoDB",
        "Socket.io",
        "JWT",
        "Postman",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
      impact: "25+",
      impactLabel: "Véhicules suivis",
      proofs: [
        
      ],
    },
    {
      role: "Formateur JavaScript Indépendant",
      company: "Compte Propre",
      location: "Abidjan / Remote",
      period: "Depuis 2023",
      duration: "2+ ans",
      type: "Enseignement",
      logo: "💻",
      description:
        "Formation JavaScript à mon compte : coaching personnalisé, création de contenus pédagogiques et accompagnement de professionnels en reconversion.",
      achievements: [
        "Formation de 15+ apprenants en JavaScript moderne",
        "Création de cours personnalisés (ES6+, React, Node.js)",
        "Accompagnement de professionnels en reconversion",
        "Taux de satisfaction apprenant : 95%",
      ],
      technologies: [
        "JavaScript",
        "ES6+",
        "React",
        "Node.js",
        "Git/GitHub",
        "Pédagogie",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
      impact: "15+",
      impactLabel: "Apprenants formés",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
    {
      role: "Instructeur de Programmation",
      company: "GOMYCODE",
      location: "Abidjan, Maccory Zone 4",
      period: "Septembre 2023 - Aujourd'hui",
      duration: "3 ans",
      type: "Enseignement",
      logo: "👨‍🏫",
      description:
        "Enseignement du développement web Full Stack, mentorat d'étudiants juniors, création de contenus pédagogiques et projets pratiques.",
      achievements: [
        "Formation de 5+ étudiants en développement web",
        "Création de 15+ projets pédagogiques (portfolios, to-do apps, full stack)",
        "Animation de seances sur HTML, CSS, JavaScript",
        "Taux de satisfaction étudiant : 95%",
      ],
      technologies: [
        "JavaScript",
        "ES6+",
        "React",
        "Node.js",
        "Git/GitHub",
        "Pédagogie",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "5+",
      impactLabel: "Étudiants formés",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
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
      technologies: [
        "React.js",
        "Tailwind CSS",
        "React Router",
        "JavaScript",
        "REST API",
        "Axios",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "API",
      impactLabel: "REST intégrée",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
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
        "Présentation convaincante au jury international",
      ],
      technologies: [
        "IoT",
        "IA",
        "Capteurs",
        "Télédétection",
        "Data Analysis",
        "React js",
        "Express.js",
        "MongoDB",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
      impact: "1er",
      impactLabel: "Prix ICESCO",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
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
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
      impact: "2ème",
      impactLabel: "Prix ADW",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
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
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "React Query",
        "React Hook Form",
        "Figma",
        "Axios",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "75%",
      impactLabel: "Frontend complété",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
    {
      role: "Chef de Projet || Développeur Full Stack - In'Tech Challenge 2025",
      company: "Domaine Bini (ESATIC)",
      location: "Abidjan",
      period: "Août 2025 - En cours",
      duration: "4+ mois",
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
      technologies: [
        "React",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "Prisma",
        "A-Frame",
        "Leaflet",
        "WebVR",
        "IA/ML",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "MVP",
      impactLabel: "En développement",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
    {
      role: "2ème Prix - APPRENTISSAGE PAR PROJET 03",
      company: "ESATIC",
      location: "Treichville",
      period: "Octobre 2023 - Février 2024",
      duration: "5 mois",
      type: "Projet Académique",
      logo: "📚",
      description:
        "Valorisation du secteur du vivrier en Côte d'Ivoire de la production à la commercialisation.",
      achievements: [
        "2ème Prix du concours APP03",
        "Analyse des besoins des producteurs et commerçants",
        "Développement d'une application web pour la vente",
        "Conception d'un tableau de bord de suivi des activités",
      ],
      technologies: [
        "React",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Dashboard",
        "Analyse métier",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "2ème",
      impactLabel: "Prix APP03",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
    {
      role: "APPRENTISSAGE PAR PROJET 02",
      company: "ESATIC",
      location: "Treichville",
      period: "Janvier - Mai 2023",
      duration: "5 mois",
      type: "Projet Académique",
      logo: "⚙️",
      description:
        "Mise en place d'un système d'enchère en ligne sécurisée avec gestion temps réel.",
      achievements: [
        "Architecture technique et base de données complètes",
        "Backend Node.js avec système d'authentification",
        "Intégration frontend HTML/CSS",
        "Logique d'enchère en temps réel",
      ],
      technologies: [
        "Node.js",
        "WebSocket",
        "HTML",
        "CSS",
        "JavaScript",
        "MongoDB",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "100%",
      impactLabel: "Projet validé",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
    {
      role: "APPRENTISSAGE PAR PROJET 01",
      company: "ESATIC",
      location: "Treichville",
      period: "Janvier - Juin 2022",
      duration: "6 mois",
      type: "Projet Académique",
      logo: "💡",
      description:
        "Mise en place d'une plateforme de valorisation des performances scolaires en Côte d'Ivoire.",
      achievements: [
        "Plateforme complète de gestion des performances",
        "Système de suivi et d'analyse des résultats",
        "Interface intuitive pour enseignants et élèves",
        "Base de données relationnelle optimisée",
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Adobe xd"],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "100%",
      impactLabel: "Projet validé",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
    {
      role: "2ème Prix - Hackathon Gestion Consommation Électrique",
      company: "G2SE",
      location: "Treichville",
      period: "Janvier 2023",
      duration: "3 jours",
      type: "Hackathon",
      logo: "⚡",
      description:
        "Mise en place d'un système de gestion de la consommation électrique dans une maison connectée.",
      achievements: [
        "Système IoT de monitoring énergétique",
        "Dashboard temps réel de consommation",
        "Alertes automatiques de surconsommation",
        "Intégration capteurs ESP32",
      ],
      technologies: ["ESP32", "Node-RED", "Figma", "Arduino", "IoT"],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "100%",
      impactLabel: "Prototype validé",
      proofs: [
//         { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
//         {
//           url: "/proofs/orange-monitoring-2.jpg",
//           title: "Système de Monitoring",
//         },
//         { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
    {
      role: "Projet Interne - Chat Club Informatique",
      company: "Club Info ESATIC",
      location: "Treichville",
      period: "Décembre 2022 - Janvier 2023",
      duration: "2 mois",
      type: "Projet Associatif",
      logo: "💬",
      description:
        "Mise en place d'un chat instantané pour le club informatique (messagerie instantanée).",
      achievements: [
        "Application de messagerie temps réel",
        "Interface utilisateur moderne et responsive",
        "Système de notifications instantanées",
        "Gestion des conversations de groupe",
      ],
      technologies: [
        "Socket.io",
        "CSS",
        "ejs",
        "JavaScript",
        "Express.js",
        "MongoDB",
      ],
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",


      impact: "35+",
      impactLabel: "Utilisateurs actifs",
      proofs: [
        { url: "/proofs/orange-dashboard-1.jpg", title: "Dashboard Principal" },
        {
          url: "/proofs/orange-monitoring-2.jpg",
          title: "Système de Monitoring",
        },
        { url: "/proofs/orange-alerts-3.jpg", title: "Alertes Temps Réel" },
      ],
    },
  ];


  const education = [
    {
      degree: "Master SIGL",
      fullDegree: "Master Systèmes d'Information et Génie Logiciel",
      school: "ESATIC",
      location: "Abidjan, CI",
      year: "2024 - 2026",
      status: "En cours",
      icon: "🎓",
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
    },
    {
      degree: "Licence SRIT",
      fullDegree:
        "Licence Systèmes de Réseaux Informatiques et de Télécommunications",
      school: "ESATIC",
      location: "Abidjan, CI",
      year: "2021 - 2024",
      status: "Diplômé",
      icon: "📡",
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
    },
    {
      degree: "Formation Data Science",
      fullDegree: "Formation Data Science & IA",
      school: "Africa TechUp Tour",
      location: "Online",
      year: "2024 - En cours",
      status: "En cours",
      icon: "📊",
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
    },
    {
      degree: "Baccalauréat Scientifique",
      fullDegree: "Baccalauréat série D",
      school: "Lycée Municipal Adjamé Williamsville",
      location: "Abidjan, CI",
      year: "2021",
      status: "Obtenu",
      icon: "🎒",
      gradient: "from-[#5B8BFF] to-[#5B8BFF]",
    },
  ];

  const currentExp = experiences[selectedExperience]
  const currentProofs = currentExp.proofs || []

  const darkBg = "bg-slate-950"
  const lightBg = "bg-white"
  const darkText = "text-white"
  const lightText = "text-slate-900"
  const darkCardBg = "bg-slate-900"
  const lightCardBg = "bg-slate-50"
  const darkBorder = "border-slate-800"
  const lightBorder = "border-slate-200"
  const darkMuted = "text-slate-400"
  const lightMuted = "text-slate-600"

  const currentBg = isDark ? darkBg : lightBg
  const currentText = isDark ? darkText : lightText
  const currentCardBg = isDark ? darkCardBg : lightCardBg
  const currentBorder = isDark ? darkBorder : lightBorder
  const currentMuted = isDark ? darkMuted : lightMuted

  const goToPrevious = () => {
    setSelectedExperience((prev) => (prev > 0 ? prev - 1 : experiences.length - 1))
  }

  const goToNext = () => {
    setSelectedExperience((prev) => (prev < experiences.length - 1 ? prev + 1 : 0))
  }

  const goToPreviousProof = () => {
    setCurrentProofIndex((prev) => (prev > 0 ? prev - 1 : currentProofs.length - 1))
  }

  const goToNextProof = () => {
    setCurrentProofIndex((prev) => (prev < currentProofs.length - 1 ? prev + 1 : 0))
  }

  const openProofModal = () => {
    setCurrentProofIndex(0)
    setShowProofModal(true)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowProofModal(false)
    }
    if (showProofModal) {
      window.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showProofModal])

  useEffect(() => {
    if (view === "timeline" && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const selectedCard = container.children[selectedExperience] as HTMLElement
      if (selectedCard) {
        selectedCard.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }
    }
  }, [selectedExperience, view])

  return (
    <>
      <section
        id="experience"
        className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${currentBg}`}
      >
        {/* Floating Elements - Dark Mode */}
        {isDark && (
          <>
            <div className="absolute top-20 -right-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 -left-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
          </>
        )}

        {/* Floating Elements - Light Mode */}
        {!isDark && (
          <>
            <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-40 -left-40 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl"></div>
          </>
        )}

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-4 ${
                isDark
                  ? "bg-blue-950/30 border-blue-800 text-blue-400"
                  : "bg-blue-100/30 border-blue-300 text-blue-600"
              }`}
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Parcours Professionnel</span>
            </div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${currentText}`}>
              Expérience & Formation
            </h2>

            <p className={`text-lg max-w-2xl mx-auto ${currentMuted}`}>
              3+ années de développement full stack, IoT et enseignement technique
            </p>

            {/* View Toggle */}
            <div
              className={`inline-flex p-1 rounded-xl border ${
                isDark ? "bg-slate-900/50 border-slate-800" : "bg-slate-100/50 border-slate-300"
              }`}
            >
              <button
                onClick={() => setView("timeline")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "timeline"
                    ? "bg-blue-600 text-white"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setView("grid")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === "grid"
                    ? "bg-orange-600 text-white"
                    : isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Grid
              </button>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-3xl font-bold ${currentText}`}>Expérience Professionnelle</h3>
              </div>

              {view === "timeline" && (
                <div className={`hidden md:flex items-center gap-2 text-sm ${currentMuted}`}>
                  <span>
                    {selectedExperience + 1} / {experiences.length}
                  </span>
                </div>
              )}
            </div>

            {view === "timeline" ? (
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left: Timeline Selector */}
                <div className="lg:col-span-5 relative">
                  {/* Navigation Arrows */}
                  <div className="absolute -top-12 right-0 flex gap-2 z-10">
                    <button
                      onClick={goToPrevious}
                      className={`p-2 rounded-lg border transition-all ${
                        isDark
                          ? "bg-slate-900/50 border-slate-800 hover:border-blue-600"
                          : "bg-slate-100/50 border-slate-300 hover:border-blue-400"
                      }`}
                    >
                      <ChevronUp className="w-5 h-5" />
                    </button>
                    <button
                      onClick={goToNext}
                      className={`p-2 rounded-lg border transition-all ${
                        isDark
                          ? "bg-slate-900/50 border-slate-800 hover:border-blue-600"
                          : "bg-slate-100/50 border-slate-300 hover:border-blue-400"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable Container */}
                  <div
                    ref={scrollContainerRef}
                    className={`space-y-4 max-h-[600px] overflow-y-auto overflow-x-hidden pr-2 ${
                      isDark ? "scrollbar-slate-800" : "scrollbar-slate-300"
                    }`}
                  >
                    {experiences.map((exp, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedExperience(idx)}
                        className={`w-full text-left group relative overflow-hidden rounded-2xl transition-all duration-300 border ${
                          selectedExperience === idx
                            ? isDark
                              ? "bg-blue-600 border-blue-500 scale-105"
                              : "bg-blue-600 border-blue-500 scale-105"
                            : isDark
                            ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                            : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
                        } p-6`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`text-4xl p-3 rounded-xl ${
                              selectedExperience === idx
                                ? "bg-white/20"
                                : isDark
                                ? "bg-slate-800"
                                : "bg-slate-200"
                            }`}
                          >
                            {exp.logo}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4
                                className={`font-bold text-lg leading-tight ${
                                  selectedExperience === idx
                                    ? "text-white"
                                    : currentText
                                }`}
                              >
                                {exp.role}
                              </h4>
                              {selectedExperience === idx && (
                                <ArrowRight className="w-5 h-5 text-white flex-shrink-0 animate-pulse" />
                              )}
                            </div>
                            <p
                              className={`text-sm font-semibold mb-2 ${
                                selectedExperience === idx ? "text-white/90" : currentMuted
                              }`}
                            >
                              {exp.company}
                            </p>
                            <div
                              className={`flex items-center gap-3 text-xs ${
                                selectedExperience === idx ? "text-white/80" : currentMuted
                              }`}
                            >
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.duration}
                              </span>
                              <span>•</span>
                              <span
                                className={`px-2 py-0.5 rounded-full ${
                                  selectedExperience === idx
                                    ? "bg-white/20"
                                    : isDark
                                    ? "bg-slate-800"
                                    : "bg-slate-200"
                                }`}
                              >
                                {exp.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Experience Details */}
                <div className="lg:col-span-7">
                  <div className="sticky top-24">
                    <div
                      className={`p-8 rounded-3xl border transition-all ${
                        isDark
                          ? "bg-slate-900/50 border-slate-800"
                          : "bg-slate-100/50 border-slate-300"
                      } space-y-6`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <span
                            className="inline-flex px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: currentExp.color }}
                          >
                            {currentExp.type}
                          </span>
                          <h3 className={`text-3xl font-bold ${currentText}`}>{currentExp.role}</h3>
                          <p className="text-xl font-semibold" style={{ color: currentExp.color }}>
                            {currentExp.company}
                          </p>
                        </div>

                        {/* Impact Badge */}
                        <div
                          className="text-center p-4 rounded-xl text-white"
                          style={{ backgroundColor: currentExp.color }}
                        >
                          <p className="text-2xl font-bold">{currentExp.impact}</p>
                          <p className="text-xs mt-1 opacity-90">{currentExp.impactLabel}</p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className={`flex flex-wrap gap-4 text-sm ${currentMuted}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{currentExp.period}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{currentExp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`leading-relaxed ${currentMuted}`}>{currentExp.description}</p>

                      {/* Achievements */}
                      <div className="space-y-3">
                        <p className={`text-sm font-semibold flex items-center gap-2 ${currentText}`}>
                          <Award className="w-4 h-4" style={{ color: currentExp.color }} />
                          Réalisations clés
                        </p>
                        <ul className="space-y-2">
                          {currentExp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-3 text-sm ${currentMuted}`}
                            >
                              <span className="text-green-500 mt-0.5 text-lg">✓</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="space-y-3">
                        <p className={`text-sm font-semibold ${currentText}`}>Stack Technique</p>
                        <div className="flex flex-wrap gap-2">
                          {currentExp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                isDark
                                  ? "bg-slate-800/50 border-slate-700 hover:border-blue-600"
                                  : "bg-slate-200/50 border-slate-400 hover:border-blue-400"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Proof Button */}
                      {currentProofs.length > 0 && (
                        <div className={`pt-4 border-t ${currentBorder}`}>
                          <button
                            onClick={openProofModal}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300"
                            style={{ backgroundColor: currentExp.color }}
                          >
                            <span>Voir les preuves ({currentProofs.length})</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // GRID VIEW
              <div className="grid md:grid-cols-2 gap-6">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                      isDark
                        ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                        : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
                    } flex flex-col`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="p-3 rounded-xl text-3xl group-hover:scale-110 transition-transform text-white"
                        style={{ backgroundColor: exp.color }}
                      >
                        {exp.logo}
                      </div>
                      <div className="flex-1">
                        <span
                          className="inline-flex px-2 py-1 rounded-full text-xs font-semibold text-white mb-2"
                          style={{ backgroundColor: exp.color }}
                        >
                          {exp.type}
                        </span>
                        <h4 className={`font-bold text-lg transition-colors ${currentText} group-hover:text-blue-600`}>
                          {exp.role}
                        </h4>
                        <p className={`text-sm ${currentMuted}`}>{exp.company}</p>
                      </div>
                    </div>

                    <p className={`text-sm mb-4 line-clamp-2 ${currentMuted}`}>{exp.description}</p>

                    <div className={`mt-auto pt-4 border-t ${currentBorder} flex items-center justify-between text-xs ${currentMuted}`}>
                      <span>{exp.period}</span>
                      <span className="font-semibold" style={{ color: exp.color }}>
                        {exp.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Education Section */}
          <div className={`pt-12 border-t ${currentBorder}`}>
            <div className="flex items-center gap-3 mb-12">
              <div className="p-3 bg-blue-600 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-3xl font-bold ${currentText}`}>Formation Académique</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                    isDark
                      ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                      : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{edu.icon}</div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        edu.status === "En cours"
                          ? "bg-orange-600/20 text-orange-600 border-orange-600/30"
                          : "bg-blue-600/20 text-blue-600 border-blue-600/30"
                      }`}
                    >
                      {edu.status}
                    </span>
                  </div>

                  <h4 className={`text-xl font-bold transition-colors mb-2 ${currentText} group-hover:text-blue-600`}>
                    {edu.degree}
                  </h4>

                  <p className="font-semibold mb-3 text-blue-600">{edu.school}</p>

                  <div className={`space-y-2 text-sm ${currentMuted}`}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof Modal */}
      {showProofModal && currentProofs.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowProofModal(false)}
        >
          <button
            onClick={() => setShowProofModal(false)}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
              <img
                src={currentProofs[currentProofIndex]?.url || "/placeholder.svg"}
                alt={currentProofs[currentProofIndex]?.title}
                className="w-full h-full object-contain"
              />

              {currentProofs.length > 1 && (
                <>
                  <button
                    onClick={goToPreviousProof}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={goToNextProof}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {currentProofIndex + 1} / {currentProofs.length}
              </div>
            </div>

            <div className="mt-4 text-center">
              <h4 className="text-xl font-bold text-white mb-2">{currentProofs[currentProofIndex]?.title}</h4>
              <p className="text-sm text-white/70">{currentExp.company}</p>
            </div>

            <p className="text-center text-white/50 text-sm mt-6">
              Utilisez les flèches ← → ou cliquez pour naviguer • Échap pour fermer
            </p>
          </div>
        </div>
      )}
    </>
  )
}
