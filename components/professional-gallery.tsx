"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, MapPin, Calendar } from "lucide-react"

export default function ProfessionalGallery() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isDark, setIsDark] = useState(true)

  const galleryItems = [
    {
      id: 1,
      category: "events",
      title: "Hackathon ICESCO 2024",
      description: "1er Prix - Solution IoT Agriculture",
      image: "/hackathon-event-conference-professional.jpg",
      date: "Mai 2025",
      location: "Treichville",
      color: "#FFBE0B",
    },
    {
      id: 2,
      category: "events",
      title: "Tech Talk - Développement IoT",
      description: "Conférence à l'ESATIC",
      image: "/tech-conference-speaking-professional.jpg",
      date: "Mars 2025",
      location: "ESATIC",
      color: "#5B8BFF",
    },
    {
      id: 3,
      category: "team",
      title: "Équipe GDSC",
      description: "Project Planner et Lead Developer",
      image: "/team-collaboration-tech-professionals.jpg",
      date: "2024-2025",
      location: "Google DSC",
      color: "#00FF94",
    },
    {
      id: 4,
      category: "team",
      title: "Club Communication Digital",
      description: "Président du club tech de l'ESATIC",
      image: "/team-leadership-tech-club.jpg",
      date: "2023-2025",
      location: "ESATIC",
      color: "#F653FF",
    },
    {
      id: 5,
      category: "mentoring",
      title: "Instructeur GOMYCODE",
      description: "Formation en développement web et mobile",
      image: "/teaching-mentoring-tech-instructor.jpg",
      date: "Depuis 2023",
      location: "GOMYCODE",
      color: "#FF6B3D",
    },
    {
      id: 6,
      category: "mentoring",
      title: "Atelier IoT",
      description: "Workshop systèmes embarqués",
      image: "/workshop-iot-training-technology.jpg",
      date: "Novembre 2024",
      location: "ESATIC",
      color: "#00D9FF",
    },
  ]

  const categories = [
    { id: "all", label: "Tous" },
    { id: "events", label: "Événements" },
    { id: "team", label: "Leadership" },
    { id: "mentoring", label: "Mentorat" },
  ]

  const filteredItems =
    activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

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
    <>
      <section
        id="gallery"
        className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${currentBg}`}
      >
        {/* Floating Elements - Dark Mode */}
        {isDark && (
          <>
            <div className="absolute top-20 right-0 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl"></div>
          </>
        )}

        {/* Floating Elements - Light Mode */}
        {!isDark && (
          <>
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl"></div>
          </>
        )}

        <div className="relative max-w-6xl mx-auto z-10">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className={`text-4xl md:text-5xl font-bold ${currentText}`}>
              Galerie Professionnelle
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${currentMuted}`}>
              Mes moments clés, événements, leadership et expériences d'enseignement dans l'écosystème tech
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : isDark
                    ? "border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                    : "border border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
                className={`group relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer hover:shadow-xl ${
                  isDark
                    ? "border-slate-800 hover:border-slate-700 hover:shadow-blue-600/10"
                    : "border-slate-300 hover:border-slate-400 hover:shadow-blue-600/10"
                }`}
                style={{ animation: `slide-in-up 0.5s ease-out ${idx * 0.1}s backwards` }}
              >
                {/* Image Container */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-800">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Hover Overlay with Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Color Badge - Top Right */}
                  <div
                    className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-xs font-bold backdrop-blur-sm"
                    style={{ backgroundColor: `${item.color}CC` }}
                  >
                    {item.category === "events"
                      ? "Événement"
                      : item.category === "team"
                      ? "Leadership"
                      : "Mentorat"}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-6 border-t transition-all duration-300 ${
                    isDark
                      ? "bg-slate-900/50 border-slate-800 group-hover:border-slate-700"
                      : "bg-slate-100/50 border-slate-300 group-hover:border-slate-400"
                  }`}
                >
                  <h3 className={`text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors ${currentText}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm mb-4 ${currentMuted}`}>{item.description}</p>

                  {/* Meta Info */}
                  <div className={`flex flex-wrap gap-3 text-xs ${currentMuted}`}>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-lg ${currentMuted}`}>Aucune image dans cette catégorie</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryItems.find((item) => item.id === selectedImage)?.image || "/placeholder.svg"}
              alt="Gallery"
              fill
              className="object-contain rounded-2xl"
            />

            {/* Info at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-b-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                {galleryItems.find((item) => item.id === selectedImage)?.title}
              </h3>
              <p className="text-white/80">
                {galleryItems.find((item) => item.id === selectedImage)?.description}
              </p>
            </div>
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            Cliquez pour fermer
          </p>
        </div>
      )}
    </>
  )
}
