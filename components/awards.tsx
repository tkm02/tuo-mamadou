"use client"

import { Trophy, Award, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function Awards() {
  const [isDark, setIsDark] = useState(true)

  const awards = [
    {
      title: "1er Prix HACKATHON ICESCO",
      description: "Solution intelligente pour l'agriculture durable en Afrique",
      icon: Trophy,
      date: "Mai 2025",
      color: "#FFBE0B",
      details: [
        "Système IoT avec capteurs et télédétection",
        "Intégration d'Intelligence Artificielle",
        "Impact social en milieu agricole africain",
      ],
    },
    {
      title: "2ème Prix AFRICAN DIGITAL WEEK",
      description: "Services publics accessibles avec IA multilingue en Côte d'Ivoire",
      icon: Award,
      date: "Juin 2025",
      color: "#F653FF",
      details: [
        "Chef d'équipe et coordination du projet",
        "Plateforme citoyenne innovante",
        "Intégration LLM pour assistance intelligente",
      ],
    },
    {
      title: "2ème Prix APPRENTISSAGE PAR PROJET 03",
      description: "Valorisation du secteur vivrier en Côte d'Ivoire",
      icon: Award,
      date: "Février 2024",
      color: "#5B8BFF",
      details: [
        "Solution web interactive",
        "Data visualization avancée",
        "Impact économique et social",
      ],
    },
  ]

  const certifications = [
    { name: "Project Management Fundamentals", issuer: "Google", year: "2024", icon: "📊" },
    { name: "Agile and Scrum Development Fundamentals", issuer: "IBM", year: "2024", icon: "⚙️" },
    { name: "Programming with JavaScript", issuer: "Meta", year: "2023", icon: "⚛️" },
    { name: "Introduction to Back-End Development", issuer: "Meta", year: "2023", icon: "🔧" },
    { name: "Introduction to Front-End Development", issuer: "Meta", year: "2023", icon: "🎨" },
  ]

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
      id="awards"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${currentBg}`}
    >
      {/* Floating Elements - Dark Mode */}
      {isDark && (
        <>
          <div className="absolute top-0 -right-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-slate-800/10 rounded-full blur-3xl"></div>
        </>
      )}

      {/* Floating Elements - Light Mode */}
      {!isDark && (
        <>
          <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-pink-100/20 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <h2 className={`text-4xl md:text-5xl font-bold ${currentText}`}>
            Prix & Reconnaissances
          </h2>
          <p className={`text-lg ${currentMuted} max-w-2xl`}>
            Récompenses et certifications témoignant de mon engagement dans l'excellence technique et l'innovation
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {awards.map((award, idx) => {
            const Icon = award.icon
            return (
              <div
                key={idx}
                className={`group relative rounded-3xl border p-8 transition-all duration-300 overflow-hidden flex flex-col ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:shadow-lg"
                    : "bg-slate-100/50 border-slate-300 hover:border-slate-400 hover:shadow-lg"
                }`}
                style={{ animation: `slide-in-up 0.5s ease-out ${idx * 0.1}s backwards` }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: award.color }}
                ></div>

                <div className="relative space-y-4 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className="p-3 rounded-xl text-white"
                      style={{ backgroundColor: award.color }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                      style={{
                        backgroundColor: `${award.color}40`,
                        color: award.color,
                      }}
                    >
                      {award.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 ${currentText}`}>
                      {award.title}
                    </h3>
                    <p className="font-semibold text-lg mb-4" style={{ color: award.color }}>
                      {award.description}
                    </p>
                  </div>

                  {/* Details */}
                  <ul className="space-y-2 pt-4 border-t" style={{ borderColor: `${award.color}30` }}>
                    {award.details.map((detail, i) => (
                      <li key={i} className={`text-sm flex items-start gap-3 ${currentMuted}`}>
                        <span
                          className="font-bold mt-1 flex-shrink-0"
                          style={{ color: award.color }}
                        >
                          ✓
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Certifications Section */}
        <div className={`pt-12 border-t ${currentBorder}`}>
          <div className="mb-8 space-y-2">
            <h3 className={`text-3xl font-bold ${currentText}`}>Certifications</h3>
            <p className={`${currentMuted}`}>
              Formations professionnelles reconnues internationalement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/10"
                    : "bg-slate-100/50 border-slate-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-600/10"
                }`}
                style={{ animation: `slide-in-up 0.5s ease-out ${(awards.length + idx) * 0.05}s backwards` }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold ${currentText} text-sm leading-tight`}>
                      {cert.name}
                    </p>
                    <div className={`flex items-center gap-1 text-xs ${currentMuted} mt-2`}>
                      <span className="font-bold text-blue-600">•</span>
                      <span>{cert.issuer}</span>
                      <span className="font-bold text-blue-600">•</span>
                      <span>{cert.year}</span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: "Prix Remportés", value: "3", icon: "🏆" },
            { label: "Certifications", value: "5", icon: "📜" },
            { label: "Reconnaissance", value: "100%", icon: "⭐" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border text-center transition-all duration-300 group ${
                isDark
                  ? "bg-slate-900/50 border-slate-800 hover:border-blue-600"
                  : "bg-slate-100/50 border-slate-300 hover:border-blue-500"
              }`}
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className={`text-sm ${currentMuted}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
