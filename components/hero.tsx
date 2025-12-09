"use client"

import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { useState } from "react"

export default function Hero() {
  const [isDark, setIsDark] = useState(true)

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
    <section
      id="hero"
      className={`relative min-h-screen pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${currentBg}`}
    >
      {/* Floating Elements - Dark Mode */}
      {isDark && (
        <>
          <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        </>
      )}

      {/* Floating Elements - Light Mode */}
      {!isDark && (
        <>
          <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 -right-40 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-6xl w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8" style={{ animation: "slide-in-up 0.6s ease-out" }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{
              backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.1)",
              borderColor: isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.3)",
            }}>
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-600">Bienvenue à mon portfolio</span>
            </div>

            {/* Title */}
            <div className="space-y-6">
              <div>
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${currentText}`}>
                  Kolotioloma
                  <br />
                  <span className="text-blue-600">Mamadou TUO</span>
                </h1>
              </div>

              <div className="space-y-3">
                <h2 className={`text-2xl md:text-3xl font-semibold ${currentText}`}>
                  Développeur Full Stack & IoT
                </h2>
                <p className={`text-lg leading-relaxed max-w-2xl ${currentMuted}`}>
                  Je conçois et développe des solutions innovantes en web, mobile et systèmes embarqués. Master Systèmes d'Information et Génie Logiciel à l'ESATIC.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 group"
              >
                Voir mes projets
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                  isDark
                    ? "border-slate-700 text-white hover:bg-slate-800 hover:shadow-lg"
                    : "border-slate-300 text-slate-900 hover:bg-slate-100 hover:shadow-lg"
                }`}
              >
                Me contacter
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {[
                { icon: Github, href: "https://github.com/tkm02", label: "GitHub", color: "#5B8BFF" },
                { icon: Linkedin, href: "https://linkedin.com/in/mamadou-tuo", label: "LinkedIn", color: "#00D9FF" },
                { icon: Mail, href: "mailto:mamadoutuo77@gmail.com", label: "Email", color: "#F653FF" },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className={`p-3 rounded-xl border transition-all duration-300 transform hover:scale-110 group ${
                      isDark
                        ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-600 hover:bg-slate-100"
                    }`}
                    style={{
                      animation: `slide-in-up 0.6s ease-out ${0.1 + idx * 0.1}s backwards`,
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = social.color
                      ;(e.currentTarget as HTMLElement).style.borderColor = social.color
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = isDark ? "#cbd5e1" : "#475569"
                      ;(e.currentTarget as HTMLElement).style.borderColor = isDark ? "#3f3f46" : "#e2e8f0"
                    }}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right Visual - Profile Card */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{ animation: "slide-in-up 0.6s ease-out 0.2s backwards" }}
          >
            <div className="relative w-full max-w-sm group">
              {/* Glow Effect */}
              <div
                className="absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: "#5B8BFF" }}
              ></div>

              {/* Card */}
              <div
                className={`relative p-1 rounded-3xl border overflow-hidden transition-all duration-300 ${
                  isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden h-96">
                  {/* Image */}
                  <img
                    src="/BD7A6739_1.JPG"
                    alt="Kolotioloma Mamadou TUO"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

                  {/* Bottom Label */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t ${
                      isDark
                        ? "from-slate-900 via-slate-900/80 to-transparent"
                        : "from-white/90 via-white/50 to-transparent"
                    }`}
                  >
                    <p className={`text-lg font-bold ${currentText}`}>Full Stack Developer</p>
                    <p className={`text-sm ${currentMuted}`}>Web • Mobile • IoT</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className={`absolute -bottom-6 -right-6 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-110 shadow-2xl flex items-center gap-2 backdrop-blur-xl ${
  isDark
    ? "bg-black/40 text-white border border-blue-600/30 hover:border-blue-500/50 hover:shadow-blue-500/20"
    : "bg-white/30 text-slate-900 border border-blue-400/30 hover:border-blue-500/50 hover:shadow-blue-400/20"
}`}>
  <span className="text-lg">🚀</span>
  Disponible
</div>

            </div>
          </div>
        </div>

        {/* Statistics */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20 pt-12 border-t ${currentBorder}`}
        >
          {[
            { number: "20+", label: "Projets Réalisés", icon: "🎯" },
            { number: "3+", label: "Années d'Expérience", icon: "⚡" },
            { number: "15+", label: "Technologies", icon: "🛠️" },
            { number: "100%", label: "Satisfaction Clients", icon: "⭐" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`group p-5 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? "bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                  : "bg-slate-100/30 border-slate-300 hover:border-slate-400 hover:bg-slate-100/50"
              }`}
              style={{
                animation: `slide-in-up 0.6s ease-out ${0.4 + idx * 0.1}s backwards`,
              }}
            >
              <div className="text-center space-y-2">
                <p className="text-2xl group-hover:scale-110 transition-transform">{stat.icon}</p>
                <p className="text-3xl md:text-4xl font-bold text-blue-600 group-hover:text-blue-500 transition-colors">
                  {stat.number}
                </p>
                <p className={`text-sm md:text-base font-medium ${currentMuted}`}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
       
      </div>
    </section>
  )
}
