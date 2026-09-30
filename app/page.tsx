"use client"

import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Awards from "@/components/awards"
import Skills from "@/components/skills"
import ProfessionalGallery from "@/components/professional-gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { Tape } from "@/components/kit"
import { MotionRoot } from "@/components/motion"
import { useSiteContent } from "@/lib/use-portfolio"
import { heroFallback } from "@/lib/fallback-data"
import { clean } from "@/lib/utils"

/** Deux bandes de scotch croisées, à cheval sur la jonction entre deux sections. */
function Crossing({ items, top, under }: { items: string[]; top: "noir" | "jaune" | "blanc"; under: "noir" | "jaune" | "blanc" | "vert" }) {
  return (
    <div className="relative z-20 -my-10 overflow-x-clip py-2 md:-my-12">
      <Tape items={items} color={under} tilt={2.2} reverse speed={46} className="opacity-95" />
      <Tape items={items} color={top} tilt={-2.4} className="-mt-12 md:-mt-14" />
    </div>
  )
}

export default function Home() {
  const hero = useSiteContent("hero", heroFallback)
  const tape = (hero.tape ?? heroFallback.tape).map(clean).filter(Boolean)
  const freelance = [clean(hero.availableBadge), "Me contacter", clean(hero.title)].filter(Boolean)

  return (
    <>
      <MotionRoot />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Crossing items={tape} top="noir" under="blanc" />
        <Awards />
        <Skills />
        <ProfessionalGallery />
        <Crossing items={freelance} top="noir" under="blanc" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
