"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react"

export default function Contact() {
  const [isDark, setIsDark] = useState(true)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSubmitStatus("idle") // Réinitialise le statut à chaque changement
  }

  const handleSubmit = (e: React.FormEvent) => {
    setIsSubmitting(true)
    setSubmitStatus("idle") // Réinitialise avant soumission
  }

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
  const darkInput = "bg-slate-900 border-slate-800 text-white placeholder-slate-500"
  const lightInput = "bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-400"

  const currentBg = isDark ? darkBg : lightBg
  const currentText = isDark ? darkText : lightText
  const currentCardBg = isDark ? darkCardBg : lightCardBg
  const currentBorder = isDark ? darkBorder : lightBorder
  const currentMuted = isDark ? darkMuted : lightMuted
  const currentInput = isDark ? darkInput : lightInput

  const contactInfo = [
    { icon: Mail, label: "Email", value: "mamadoutuo77@gmail.com", href: "mailto:mamadoutuo77@gmail.com", color: "#5B8BFF" },
    { icon: Phone, label: "Téléphone", value: "+225 07 58 02 42 50", href: "tel:+2250758024250", color: "#F653FF" },
    { icon: MapPin, label: "Localisation", value: "Abidjan, Côte d'Ivoire", href: "#", color: "#FF6B3D" },
  ]

  return (
    <section id="contact" className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${currentBg}`}>
      {/* Floating Elements */}
      {isDark ? (
        <>
          <div className="absolute top-20 -right-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
        </>
      ) : (
        <>
          <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl"></div>
        </>
      )}

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className={`text-4xl md:text-5xl font-bold ${currentText}`}>Travaillons Ensemble</h2>
          <p className={`text-lg max-w-2xl mx-auto ${currentMuted}`}>
            Que vous ayez un projet innovant ou besoin d'expertise technique, je suis prêt à collaborer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className={`text-2xl font-bold ${currentText}`}>Parlons de votre projet</h3>
              <p className={`leading-relaxed ${currentMuted}`}>
                Freelance, CDI, partenariat technique ou simple consultation - j'apporte expertise technique et vision
                stratégique à chaque collaboration. Disponible et enthousiaste pour créer ensemble.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon
                return (
                  <a
                    key={idx}
                    href={info.href}
                    className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      isDark
                        ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:shadow-lg"
                        : "bg-slate-100/50 border-slate-300 hover:border-slate-400 hover:shadow-lg"
                    }`}
                    style={{ animation: `slide-in-up 0.5s ease-out ${idx * 0.1}s backwards` }}
                  >
                    <div
                      className="p-3 rounded-xl text-white flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: info.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold ${currentMuted}`}>{info.label}</p>
                      <p className={`font-semibold group-hover:text-blue-600 transition-colors ${currentText}`}>
                        {info.value}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>

            <div className={`p-6 rounded-2xl border ${isDark ? "bg-blue-950/30 border-blue-800" : "bg-blue-100/30 border-blue-300"}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">📌</div>
                <div>
                  <p className={`font-semibold ${currentText} mb-2`}>Disponibilité</p>
                  <ul className={`text-sm space-y-1 ${currentMuted}`}>
                    <li>✓ Missions freelance</li>
                    <li>✓ Contrats CDI</li>
                    <li>✓ Partenariats techniques</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-center ${isDark ? "bg-slate-900/50 border-slate-800" : "bg-slate-100/50 border-slate-300"}`}>
              <p className={`text-sm ${currentMuted}`}>
                ⚡ Réponse généralement sous <span className={`font-bold ${currentText}`}>24 heures</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form
              action="https://formspree.io/f/mvgebddn"
              method="POST"
              onSubmit={handleSubmit}
              className={`p-8 rounded-3xl border transition-all duration-300 ${
                isDark
                  ? "bg-slate-900/50 border-slate-800"
                  : "bg-slate-100/50 border-slate-300"
              } space-y-5`}
            >
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold ${currentText} mb-3`}>Nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${currentInput}`}
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold ${currentText} mb-3`}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${currentInput}`}
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className={`block text-sm font-semibold ${currentText} mb-3`}>Sujet *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${currentInput}`}
                  placeholder="Sujet de votre message"
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-semibold ${currentText} mb-3`}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none ${currentInput}`}
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitStatus === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : submitStatus === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Envoi en cours...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message envoyé avec succès!
                  </>
                ) : submitStatus === "error" ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Erreur lors de l'envoi
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </button>
              <p className={`text-xs text-center ${currentMuted}`}>
                Les champs marqués * sont obligatoires
              </p>
            </form>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mt-16 p-8 rounded-3xl border text-center ${
          isDark
            ? "bg-gradient-to-r from-blue-950/30 to-pink-950/30 border-blue-800"
            : "bg-gradient-to-r from-blue-100/30 to-pink-100/30 border-blue-300"
        }`}>
          <h3 className={`text-2xl font-bold mb-3 ${currentText}`}>
            Prêt à démarrer?
          </h3>
          <p className={`${currentMuted} mb-6 max-w-xl mx-auto`}>
            Envoyez-moi un message ou contactez-moi directement. Je suis enthousiaste pour discuter de vos projets innovants.
          </p>
          <a
            href="mailto:mamadoutuo77@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
          >
            <Mail className="w-5 h-5" />
            Envoyer un email
          </a>
        </div>
      </div>
    </section>
  )
}
