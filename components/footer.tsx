"use client"

import { Github, Linkedin, Mail, ArrowUp, Code2 } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [isDark, setIsDark] = useState(true)
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const darkBg = "bg-slate-950"
  const lightBg = "bg-white"
  const darkText = "text-white"
  const lightText = "text-slate-900"
  const darkBorder = "border-slate-800"
  const lightBorder = "border-slate-200"
  const darkMuted = "text-slate-400"
  const lightMuted = "text-slate-600"
  const darkCardBg = "bg-slate-900/50"
  const lightCardBg = "bg-slate-100/50"

  const currentBg = isDark ? darkBg : lightBg
  const currentText = isDark ? darkText : lightText
  const currentBorder = isDark ? darkBorder : lightBorder
  const currentMuted = isDark ? darkMuted : lightMuted
  const currentCardBg = isDark ? darkCardBg : lightCardBg

  const navLinks = [
    { label: "À Propos", href: "#about" },
    { label: "Projets", href: "#projects" },
    { label: "Expérience", href: "#experience" },
    { label: "Galerie", href: "#gallery" },
    { label: "Prix", href: "#awards" },
    { label: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/tkm02",
      label: "GitHub",
      color: "#5B8BFF",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/mamadou-tuo",
      label: "LinkedIn",
      color: "#00D9FF",
    },
    {
      icon: Mail,
      href: "mailto:mamadoutuo77@gmail.com",
      label: "Email",
      color: "#F653FF",
    },
  ]

  return (
    <footer
      className={`relative border-t transition-colors duration-300 ${
        isDark ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
      }`}
    >
      {/* Floating Elements */}
      {isDark && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-800/5 rounded-full blur-3xl"></div>
      )}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${currentText}`}>Mamadou</h3>
            </div>
            <p className={`text-sm leading-relaxed ${currentMuted}`}>
              Développeur Full Stack & IoT spécialisé en solutions innovantes pour l'Afrique.
            </p>
            <div className="pt-4">
              <p className={`text-xs font-semibold ${currentMuted} mb-2`}>Master SIGL ESATIC</p>
              <p className={`text-xs ${currentMuted}`}>Abidjan, Côte d'Ivoire</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className={`font-bold text-lg ${currentText}`}>Navigation</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-sm transition-all duration-300 hover:text-blue-600 hover:translate-x-1 inline-flex items-center gap-2 ${currentMuted}`}
                  >
                    <span className="inline-block">→</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className={`font-bold text-lg ${currentText}`}>Domaines</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "Full Stack Development",
                "IoT & Embedded Systems",
                "Mobile Apps (React Native)",
                "Backend Architecture",
                "Mentorat & Formation",
                "Consulting Tech",
              ].map((service, idx) => (
                <li key={idx} className={`flex items-start gap-2 ${currentMuted}`}>
                  <span className="text-blue-600 font-bold mt-0.5">+</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & CTA */}
          <div className="space-y-6">
            <div>
              <h4 className={`font-bold text-lg ${currentText} mb-4`}>Réseaux</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all duration-300 group ${
                        isDark
                          ? "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                          : "bg-slate-100/50 border-slate-300 hover:border-slate-400"
                      }`}
                      style={{
                        borderColor: `${link.color}40`,
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.backgroundColor = `${link.color}15`
                        ;(e.currentTarget as HTMLElement).style.borderColor = link.color
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.backgroundColor = isDark
                          ? "rgba(15, 23, 42, 0.5)"
                          : "rgba(248, 250, 252, 0.5)"
                        ;(e.currentTarget as HTMLElement).style.borderColor = `${link.color}40`
                      }}
                      aria-label={link.label}
                      title={link.label}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: link.color }} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className={`w-full py-3 px-4 rounded-xl border font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                isDark
                  ? "bg-blue-600/20 border-blue-800 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300"
                  : "bg-blue-100/30 border-blue-300 hover:bg-blue-100/50 text-blue-600 hover:text-blue-700"
              }`}
            >
              <span>Haut de page</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${currentBorder} my-8`}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div>
            <p className={`text-sm font-medium ${currentMuted}`}>
              © {currentYear} Mamadou Tuo. Tous droits réservés.
            </p>
            <p className={`text-xs ${currentMuted} mt-1`}>
              Conçu et développé avec passion en Côte d'Ivoire 🇨🇮
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className={`transition-all duration-300 hover:text-blue-600 ${currentMuted}`}
            >
              Confidentialité
            </a>
            <span className={currentMuted}>•</span>
            <a
              href="#"
              className={`transition-all duration-300 hover:text-blue-600 ${currentMuted}`}
            >
              Conditions
            </a>
            <span className={currentMuted}>•</span>
            <a
              href="#"
              className={`transition-all duration-300 hover:text-blue-600 ${currentMuted}`}
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Newsletter CTA - Optional */}
        <div
          className={`mt-12 p-6 rounded-2xl border text-center ${
            isDark
              ? "bg-blue-950/20 border-blue-800"
              : "bg-blue-100/20 border-blue-300"
          }`}
        >
          <p className={`text-sm ${currentMuted} mb-3`}>
            Restez en contact pour les dernières actualités tech et projets innovants
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <Mail className="w-4 h-4" />
            M'envoyer un message
          </a>
        </div>
      </div>

      {/* Floating Gradient Orb */}
      {isDark && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>
      )}
    </footer>
  )
}
