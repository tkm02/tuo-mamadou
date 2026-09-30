"use client"

import { Container } from "@/components/kit"
import { useSiteContent } from "@/lib/use-portfolio"
import { socialsFallback } from "@/lib/fallback-data"

export default function Footer() {
  const socials = useSiteContent("socials", socialsFallback)
  const year = new Date().getFullYear()

  return (
    <footer className="field-noir overflow-hidden pb-10 pt-16">
      <Container>
        <p
          aria-hidden="true"
          data-reveal="rise"
          className="display-tight select-none font-display text-[clamp(5rem,24vw,20rem)] font-extrabold leading-[0.8] tracking-[-0.02em]"
        >
          <span className="text-orange">&lt;/</span>Tuo<span className="text-orange">&gt;</span>
        </p>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.875rem] font-semibold opacity-75">
            © {year} Kolotioloma Mamadou TUO, Abidjan, Côte d&apos;Ivoire
          </p>
          <nav aria-label="Liens de pied de page" className="flex flex-wrap gap-2">
            {[
              { label: "Email", href: `mailto:${socials.email}` },
              socials.linkedin ? { label: "LinkedIn", href: socials.linkedin, ext: true } : null,
              socials.github ? { label: "GitHub", href: socials.github, ext: true } : null,
              { label: "Haut de page ↑", href: "#top" },
            ]
              .filter(Boolean)
              .map((l) => (
                <a
                  key={l!.label}
                  href={l!.href}
                  {...(l!.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="rounded-full border-2 border-blanc/30 px-4 py-2 font-display text-[1rem] font-extrabold transition-colors hover:border-orange hover:bg-orange hover:text-on-orange"
                >
                  {l!.label}
                </a>
              ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
