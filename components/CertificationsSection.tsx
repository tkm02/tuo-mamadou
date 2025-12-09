"use client"

import { Award, CheckCircle2, ExternalLink, Eye } from "lucide-react"
import { useState } from "react"
import CertificationModal from "@/components/CertificationModal"

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<any>(null)
  const [isDark, setIsDark] = useState(true)

  const certifications = [
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
      verificationUrl: undefined,
    },
  ]

  const darkBg = "bg-slate-950"
  const lightBg = "bg-white"
  const darkText = "text-white"
  const lightText = "text-slate-900"
  const darkMuted = "text-slate-400"
  const lightMuted = "text-slate-600"
  const darkCardBg = "bg-slate-900/50"
  const lightCardBg = "bg-slate-100/50"
  const darkBorder = "border-slate-800"
  const lightBorder = "border-slate-200"

  const currentBg = isDark ? darkBg : lightBg
  const currentText = isDark ? darkText : lightText
  const currentMuted = isDark ? darkMuted : lightMuted
  const currentCardBg = isDark ? darkCardBg : lightCardBg
  const currentBorder = isDark ? darkBorder : lightBorder

  return (
    <div className={`mt-20 space-y-8 transition-colors duration-300 ${currentBg}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
            isDark
              ? "bg-blue-950/30 border-blue-800 text-blue-400"
              : "bg-blue-100/30 border-blue-300 text-blue-600"
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="text-sm font-medium">Certifications & Formations</span>
        </div>
        <h3 className={`text-3xl md:text-4xl font-bold ${currentText}`}>
          Formation Continue
        </h3>
        <p className={`text-lg max-w-2xl mx-auto ${currentMuted}`}>
          Engagé dans l'apprentissage permanent pour maîtriser les dernières technologies
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <div
            key={cert.name}
            onClick={() => setSelectedCert(cert)}
            className="group relative cursor-pointer"
            style={{ animation: `slide-in-up 0.5s ease-out ${index * 0.1}s backwards` }}
          >
            {/* Glow effect */}
            <div
              className="absolute -inset-1 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{ backgroundColor: cert.color }}
            ></div>

            {/* Card */}
            <div
              className={`relative h-full p-6 border rounded-2xl transition-all duration-300 ${
                isDark
                  ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:shadow-lg"
                  : "bg-slate-100/50 border-slate-300 hover:border-slate-400 hover:shadow-lg"
              } flex flex-col`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-xl text-3xl group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cert.color }}
                >
                  {cert.logo}
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: `${cert.color}20`, color: cert.color }}
                >
                  {cert.year}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h4
                    className={`font-bold text-lg group-hover:text-blue-600 transition-colors ${currentText}`}
                  >
                    {cert.name}
                  </h4>
                  <p className={`text-sm ${currentMuted}`}>{cert.provider}</p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2 py-1 rounded-md text-xs font-medium border ${
                        isDark
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-slate-200 border-slate-400 text-slate-900"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Click to view indicator */}
              <div className={`mt-4 pt-4 border-t ${currentBorder}`}>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cert.color }}
                    ></div>
                    <span className={currentMuted}>Certification vérifiée</span>
                  </div>
                  <span
                    className="font-medium text-blue-600 group-hover:underline"
                    style={{ color: cert.color }}
                  >
                    Voir →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div
        className={`grid grid-cols-3 gap-4 p-6 rounded-2xl border ${
          isDark
            ? "bg-slate-900/30 border-slate-800"
            : "bg-slate-100/30 border-slate-300"
        }`}
      >
        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-blue-600">6+</p>
          <p className={`text-xs ${currentMuted}`}>Certifications</p>
        </div>
        <div className="text-center border-l border-r" style={{ borderColor: `${currentBorder}40` }}>
          <p className="text-3xl font-bold text-blue-600">4</p>
          <p className={`text-xs ${currentMuted}`}>Organisations</p>
        </div>
        <div className="text-center space-y-1">
          <p className="text-3xl font-bold text-blue-600">{new Date().getFullYear()}+</p>
          <p className={`text-xs ${currentMuted}`}>Formation Active</p>
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <CertificationModal
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
          certification={selectedCert}
        />
      )}
    </div>
  )
}
