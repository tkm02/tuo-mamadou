"use client"

import {
  Code2,
  Zap,
  Database,
  Cpu,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"
import CertificationsSection from "./CertificationsSection"

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>("frontend")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(true)

  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend & Mobile",
      icon: Code2,
      color: "#5B8BFF",
      description: "Interfaces modernes et réactives",
      skills: [
        { name: "React.js", level: 95, icon: "⚛️" },
        { name: "TypeScript", level: 80, icon: "📘" },
        { name: "Flutter", level: 70, icon: "📲" },
        { name: "React Native", level: 88, icon: "📱" },
        { name: "CSS", level: 98, icon: "🎨" },
        { name: "JavaScript vanilla", level: 98, icon: "⚡" },
        { name: "Vue.js", level: 90, icon: "💚" },
      ],
    },
    {
      id: "backend",
      title: "Backend & API",
      icon: Zap,
      color: "#06c776ff",
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
      id: "database",
      title: "Bases de Données",
      icon: Database,
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
      id: "iot",
      title: "IoT & Systèmes Embarqués",
      icon: Cpu,
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
      id: "datascience",
      title: "Data Science & IA",
      icon: TrendingUp,
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

  const tools = [
    { name: "Agile/Scrum", icon: "🔄", category: "Méthodologie" },
    { name: "Trello", icon: "📋", category: "Méthodologie" },
    { name: "Git/GitHub", icon: "🐙", category: "Versioning" },
    { name: "CI/CD", icon: "⚙️", category: "DevOps" },
    { name: "Docker", icon: "🐳", category: "DevOps" },
    { name: "Figma", icon: "🎨", category: "Design" },
    { name: "Adobe Premiere", icon: "🎥", category: "Design" },
    { name: "Microsoft PowerPoint", icon: "📝", category: "Design" },
    { name: "Adobe XD", icon: "💎", category: "Design" },
    { name: "Power BI", icon: "📊", category: "Data" },
    { name: "Postman", icon: "📮", category: "API" },
    { name: "VS Code", icon: "💻", category: "IDE" },
  ]

  const currentCategory = skillCategories.find((cat) => cat.id === activeCategory)

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

  return (
    <section
      id="skills"
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${currentBg}`}
    >
      {/* Floating Elements - Dark Mode */}
      {isDark && (
        <>
          <div className="absolute top-20 -left-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
        </>
      )}

      {/* Floating Elements - Light Mode */}
      {!isDark && (
        <>
          <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl"></div>
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
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Expertise Technique</span>
          </div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${currentText}`}>
            Stack Technologique
          </h2>

          <p className={`text-lg max-w-2xl mx-auto ${currentMuted}`}>
            Maîtrise des technologies modernes pour créer des solutions web, mobile et IoT performantes
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillCategories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  group relative px-6 py-4 rounded-2xl border transition-all duration-300
                  ${
                    isActive
                      ? isDark
                        ? "bg-blue-600 text-white border-blue-500 shadow-lg scale-105"
                        : "bg-blue-600 text-white border-blue-500 shadow-lg scale-105"
                      : isDark
                      ? "border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/50"
                      : "border-slate-300 bg-slate-100/50 hover:border-slate-400 hover:bg-slate-200/50"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white/20"
                        : isDark
                        ? "bg-slate-800"
                        : "bg-slate-200"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-white" : currentText} />
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold text-sm ${isActive ? "text-white" : currentText}`}>
                      {category.title}
                    </p>
                    <p className={`text-xs ${isActive ? "text-white/80" : currentMuted}`}>
                      {category.skills.length} compétences
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Category Content */}
        {currentCategory && (
          <div className="space-y-8">
            {/* Category Description */}
            <div className="text-center mb-8">
              <div
                className={`inline-block px-6 py-3 rounded-full font-medium text-white`}
                style={{ backgroundColor: currentCategory.color }}
              >
                {currentCategory.description}
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCategory.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="group relative"
                  style={{
                    animation: `slide-in-up 0.5s ease-out ${index * 0.1}s backwards`,
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: currentCategory.color }}
                  ></div>

                  {/* Card */}
                  <div
                    className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                      isDark
                        ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                        : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{skill.icon}</span>
                        <div>
                          <h4
                            className={`font-semibold transition-colors ${
                              isDark
                                ? "text-white group-hover:text-blue-400"
                                : "text-slate-900 group-hover:text-blue-600"
                            }`}
                          >
                            {skill.name}
                          </h4>
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isDark ? "bg-slate-800" : "bg-slate-200"
                        }`}
                        style={{ color: currentCategory.color }}
                      >
                        {skill.level}%
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div
                        className={`h-2 rounded-full overflow-hidden ${
                          isDark ? "bg-slate-800" : "bg-slate-300"
                        }`}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            backgroundColor: currentCategory.color,
                            width:
                              hoveredSkill === skill.name || activeCategory === currentCategory.id
                                ? `${skill.level}%`
                                : "0%",
                          }}
                        ></div>
                      </div>

                      {/* Skill Level Labels */}
                      <div className={`flex justify-between text-xs ${currentMuted}`}>
                        <span>Débutant</span>
                        <span>Intermédiaire</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools & Other Skills */}
        <div className="mt-20 space-y-8">
          <div className="text-center space-y-3">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isDark
                  ? "bg-blue-950/30 border-blue-800 text-blue-400"
                  : "bg-blue-100/30 border-blue-300 text-blue-600"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Outils & Technologies</span>
            </div>
            <h3 className={`text-3xl font-bold ${currentText}`}>Écosystème Complet</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, idx) => (
              <div
                key={tool.name}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-default ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:shadow-lg"
                    : "bg-slate-100/50 border-slate-300 hover:border-slate-400 hover:shadow-lg"
                }`}
                style={{
                  animation: `slide-in-up 0.5s ease-out ${0.3 + idx * 0.05}s backwards`,
                }}
              >
                <div className="text-center space-y-3">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <div>
                    <p className={`font-semibold ${currentText} group-hover:text-blue-600 transition-colors`}>
                      {tool.name}
                    </p>
                    <p className={`text-xs ${currentMuted} mt-1`}>{tool.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Highlight */}
        <CertificationsSection />
      </div>
    </section>
  )
}
