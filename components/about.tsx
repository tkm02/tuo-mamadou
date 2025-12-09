"use client"

import { Download, Code2, Zap, Heart, Award, Users, Sparkles, Github, Linkedin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function About() {
  const [activeTab, setActiveTab] = useState("parcours")
  const [isDark, setIsDark] = useState(true)

  const stats = [
    { value: "3+", label: "Années d'Expérience", icon: Zap, color: "#5B8BFF" },
    { value: "8+", label: "Projets Livrés", icon: Code2, color: "#F653FF" },
    { value: "3+", label: "Domaines d'Expertise", icon: Sparkles, color: "#00FF94" },
  ]

  const tabs = [
    {
      id: "parcours",
      label: "Parcours",
      icon: Award,
      content: {
        title: "Un parcours marqué par le leadership",
        text: "De la Licence SRIT au Master SIGL à l'ESATIC, j'ai développé une double expertise technique et managériale. Chef de projet chez Orange (surveillance énergétique IoT), leadTech sur plusieurs projets d'envergure, et certifié en gestion de projet (Google, IBM), mon ambition est de piloter des projets technologiques innovants combinant excellence technique et vision stratégique.",
        highlight: "🌍 1er Prix International ICESCO · 🇨🇮 2ème Prix National ADW · 🥉 3ème Meilleure Application Agricole",
      },
    },
    {
      id: "philosophie",
      label: "Philosophie",
      icon: Heart,
      content: {
        title: "Code avec impact, tech avec sens",
        text: "Je crois que la technologie doit servir un objectif plus grand : résoudre des problèmes réels et améliorer des vies. Mon approche combine excellence technique, pensée systémique et impact mesurable. Chaque ligne de code est une opportunité de créer quelque chose de significatif.",
        highlight: "💡 Innovation · 🎯 Impact · ⚡ Excellence",
      },
    },
    {
      id: "objectifs",
      label: "Objectifs",
      icon: Users,
      content: {
        title: "Construire l'avenir tech africain",
        text: "Mon ambition est de contribuer à l'écosystème tech africain en tant que développeur expert et leader technologique. À travers l'enseignement (GOMYCODE), le leadership (Président club digital ESATIC, GDSC Project Planner) et des projets innovants, je veux inspirer la prochaine génération de développeurs.",
        highlight: "🚀 Leadership · 🌍 Impact Africain · 📚 Transmission",
      },
    },
  ]

  const currentContent = tabs.find((tab) => tab.id === activeTab)?.content

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
      id="about"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${currentBg}`}
    >
      {/* Floating Elements - Dark Mode */}
      {isDark && (
        <>
          <div className="absolute top-20 -right-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl hidden lg:block"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl hidden lg:block"></div>
        </>
      )}

      {/* Floating Elements - Light Mode */}
      {!isDark && (
        <>
          <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl hidden lg:block"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl hidden lg:block"></div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border ${
              isDark
                ? "bg-blue-950/30 border-blue-800 text-blue-400"
                : "bg-blue-100/30 border-blue-300 text-blue-600"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">À Propos de Moi</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-bold ${currentText}`}>
            Développeur Full Stack
            <br />
            <span className="text-blue-600">& IoT</span>
          </h2>
          <p className={`text-base md:text-lg max-w-xl mx-auto ${currentMuted}`}>
            Passionné par la création de solutions innovantes en JavaScript, React et systèmes embarqués
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile */}
          <div className="md:col-span-2 lg:col-span-4 space-y-6">
            <div className="relative group">
              {/* Shadow/Glow */}
              <div
                className={`absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 ${
                  isDark ? "bg-blue-900" : "bg-blue-400"
                }`}
              ></div>
              {/* Card */}
              <div
                className={`relative border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900 border-slate-800 hover:border-slate-700"
                    : "bg-slate-100 border-slate-300 hover:border-slate-400"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-800">
                  <Image
                    src="/mamadou.jpg"
                    alt="Mamadou Tuo"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? "bg-gradient-to-t from-slate-900 via-transparent to-transparent"
                        : "bg-gradient-to-t from-white via-transparent to-transparent"
                    }`}
                  ></div>
                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                      isDark
                        ? "bg-slate-900/80 border-blue-700 text-blue-400"
                        : "bg-white/80 border-blue-300 text-blue-600"
                    }`}
                  >
                    ✓ Disponible
                  </div>
                </div>
                {/* Info */}
                <div className={`p-6 space-y-4 ${currentCardBg}`}>
                  <div>
                    <h3 className={`text-xl md:text-2xl font-bold ${currentText}`}>Mamadou Tuo</h3>
                    <p className={`text-sm ${currentMuted} mt-1`}>
                      Master SIGL • ESATIC • Abidjan
                    </p>
                  </div>
                  {/* Social Links */}
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://github.com/tkm02"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 font-medium text-sm ${
                        isDark
                          ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-blue-600 hover:text-blue-400"
                          : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/mamadou-tuo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 font-medium text-sm ${
                        isDark
                          ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-blue-600 hover:text-blue-400"
                          : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </a>
                  </div>
                  {/* Download CV */}
                  <a
                    href="/KOLOTIOLOMA_MAMADOU_TUO.pdf"
                    download
                    className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isDark
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Download size={18} />
                    Télécharger mon CV
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-2 lg:col-span-8 space-y-6">
            {/* Tabs */}
            <div
              className={`flex flex-wrap gap-2 p-2 rounded-2xl border transition-all ${
                isDark
                  ? "bg-slate-900/50 border-slate-800"
                  : "bg-slate-100/50 border-slate-300"
              }`}
            >
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                      isActive
                        ? isDark
                          ? "bg-blue-600 text-white"
                          : "bg-blue-600 text-white"
                        : isDark
                        ? "text-slate-400 hover:text-white hover:bg-slate-800"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                isDark
                  ? "bg-slate-900/50 border-slate-800"
                  : "bg-slate-100/50 border-slate-300"
              }`}
            >
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${currentText}`}>
                {currentContent?.title}
              </h3>
              <p className={`text-base leading-relaxed mb-6 ${currentMuted}`}>
                {currentContent?.text}
              </p>
              <div
                className={`p-4 rounded-xl border ${
                  isDark
                    ? "bg-blue-950/30 border-blue-800"
                    : "bg-blue-100/30 border-blue-300"
                }`}
              >
                <p className={`text-sm font-medium text-center ${isDark ? "text-blue-300" : "text-blue-700"}`}>
                  {currentContent?.highlight}
                </p>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-blue-700"
                    : "bg-slate-100/50 border-slate-300 hover:border-blue-400"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isDark ? "bg-blue-900/50" : "bg-blue-100"}`}>
                  <Award className={`w-6 h-6 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <h4 className={`font-semibold mb-2 ${currentText}`}>Reconnaissances</h4>
                <p className={`text-sm ${currentMuted}`}>
                  🏆 1er Prix ICESCO • 🥈 2ème Prix ADW • 🥉 3ème Meilleure Application Agricole (Journée Mondiale de l’Agriculture) • 🎓 2ème Prix APP03
                </p>
              </div>
              <div
                className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-blue-700"
                    : "bg-slate-100/50 border-slate-300 hover:border-blue-400"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${isDark ? "bg-pink-900/50" : "bg-pink-100"}`}>
                  <Users className={`w-6 h-6 ${isDark ? "text-pink-400" : "text-pink-600"}`} />
                </div>
                <h4 className={`font-semibold mb-2 ${currentText}`}>Leadership</h4>
                <p className={`text-sm ${currentMuted}`}>
                  Président Club Digital • Chef de Projet • Instructeur GOMYCODE
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {stats.map((stat) => {
    const Icon = stat.icon
    return (
      <div
        key={stat.label}
        className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${
          isDark
            ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
            : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{stat.value}</p>
            <p className={`text-xs ${currentMuted} mt-1`}>{stat.label}</p>
          </div>
          <div className={`p-2 rounded-lg ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
    )
  })}
</div>

          </div>
        </div>
      </div>
    </section>
  )
}
