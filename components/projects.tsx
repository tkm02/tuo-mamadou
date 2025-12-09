

"use client"

import { ExternalLink, Github, Zap, Award as AwardIcon, Eye, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [isDark, setIsDark] = useState(true)

  const projects = [
    {
      title: "Système de Surveillance Énergétique Orange CI",
      description:
        "Système IoT complet pour la surveillance énergétique temps réel avec détection d'anomalies et alertes.",
      image: "/kania.png",
      technologies: ["Node.js","React.js", "Express.js", "ESP32", "Socket.io", "Highcharts"],
      year: "2024",
      role: "Chef de Projet",
      category: "Full Stack",
      color: "#ff7900",
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
    },
    {
      title: "Application MahouFarm",
      description:
        "Application web responsive pour gestion agricole avec intégration API et interface intuitive.",
      image: "/mahourFarm.jpg",
      technologies: ["React", "Tailwind CSS", "TypeScript", "REST API"],
      year: "2023",
      role: "Développeur Frontend",
      category: "Frontend",
      color: "#5B8BFF",
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
    },
  ]

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]
  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const darkBg = "bg-slate-950"
  const lightBg = "bg-white"
  const darkText = "text-white"
  const lightText = "text-slate-900"
  const darkCardBg = "bg-slate-900/50"
  const lightCardBg = "bg-slate-100/50"
  const darkBorder = "border-slate-800"
  const lightBorder = "border-slate-200"
  const darkMuted = "text-slate-400"
  const lightMuted = "text-slate-600"

  const currentBg = isDark ? darkBg : lightBg
  const currentText = isDark ? darkText : lightText
  const currentCardBg = isDark ? darkCardBg : lightCardBg
  const currentBorder = isDark ? darkBorder : lightBorder
  const currentMuted = isDark ? darkMuted : lightMuted

  return (
    <section
      id="projects"
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
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Portfolio</span>
          </div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${currentText}`}>
            Projets & Réalisations
          </h2>

          <p className={`text-lg max-w-2xl mx-auto ${currentMuted}`}>
            Une sélection de projets innovants combinant IoT, IA et développement full stack
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                  : isDark
                  ? "bg-slate-900/50 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                  : "bg-slate-100/50 border border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {cat === "all" ? "Tous" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
              style={{ animation: `slide-in-up 0.5s ease-out ${idx * 0.1}s backwards` }}
            >
              {/* Glow Effect */}
              <div
                className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: project.color }}
              ></div>

              {/* Card */}
              <div
                className={`relative border rounded-3xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
                }`}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-800">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Award Badge */}
                  {project.award && (
                    <div
                      className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 animate-pulse"
                      style={{ backgroundColor: project.color }}
                    >
                      <AwardIcon className="w-4 h-4" />
                      {project.awardLabel || "1er Prix"}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div
                    className="absolute bottom-4 left-4 px-4 py-2 rounded-full text-white text-xs font-bold backdrop-blur-sm"
                    style={{ backgroundColor: `${project.color}CC` }}
                  >
                    {project.category}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      <button
                        className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all transform hover:scale-110"
                        aria-label="Voir le projet"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all transform hover:scale-110"
                        aria-label="GitHub"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-6 flex-1 flex flex-col">
                  {/* Year & Role */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: `${project.color}40` }}
                    >
                      {project.year}
                    </span>
                    <span className={`text-xs ${currentMuted}`}>• {project.role}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${currentText}`}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed line-clamp-3 mb-4 ${currentMuted}`}>
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isDark
                            ? "bg-slate-800/50 border-slate-700 hover:border-blue-600/30"
                            : "bg-slate-200/50 border-slate-400 hover:border-blue-400/30"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? "bg-slate-800/50" : "bg-slate-200/50"} ${currentMuted}`}>
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group/btn text-white"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      borderWidth: "1px",
                      borderColor: `${project.color}40`,
                    }}
                    onMouseEnter={(e) => {
                      ;(e.target as HTMLElement).style.backgroundColor = `${project.color}30`
                    }}
                    onMouseLeave={(e) => {
                      ;(e.target as HTMLElement).style.backgroundColor = `${project.color}20`
                    }}
                  >
                    <span>Voir le projet</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-12 text-center p-6 rounded-2xl border ${
  isDark
    ? "bg-blue-950/20 border-blue-800"
    : "bg-blue-100/30 border-blue-300"
}`}>
  <p className={`text-sm ${currentMuted} italic`}>
    ⏳ Bientôt, tous mes projets seront ajoutés à ce portfolio pour une vision complète de mon parcours !
  </p>
</div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-lg ${currentMuted}`}>Aucun projet trouvé dans cette catégorie</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <button className="group px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
            <span>Voir tous les projets</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projets Réalisés", value: "15+", icon: "🚀" },
            { label: "Technologies", value: "20+", icon: "⚡" },
            { label: "Prix Remportés", value: "3+", icon: "🏆" },
            { label: "Clients Satisfaits", value: "100%", icon: "⭐" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border text-center transition-all duration-300 hover:shadow-lg group ${
                isDark
                  ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
              }`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
              <p className={`text-sm ${currentMuted}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
