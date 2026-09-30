import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Figtree } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { normalizeTheme, themeCss, themeFallback, type ThemePalette } from "@/lib/theme"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
})
const sans = Figtree({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Kolotioloma Mamadou TUO — Développeur Full Stack & IA · Abidjan",
  description:
    "Ingénieur logiciel à Abidjan, développeur full stack et automatisation IA (n8n, LLM, RAG). Neuf fois primé depuis 2022 : 1er prix ICESCO 2025, 1er prix Moov Application 2025. Disponible pour des missions freelance.",
  generator: "portfolio.app",
  icons: {
    icon: [{ url: "/logo.png" }],
    apple: "/logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: themeFallback.blanc,
}

/** Palette réglée dans le backoffice, lue côté serveur pour éviter tout flash de couleur. */
async function loadTheme(): Promise<ThemePalette> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return themeFallback
  try {
    const res = await fetch(`${url}/rest/v1/site_content?key=eq.theme&select=value`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60, tags: ["theme"] },
    })
    if (!res.ok) return themeFallback
    const rows = (await res.json()) as { value?: Record<string, unknown> }[]
    return normalizeTheme(rows[0]?.value)
  } catch {
    return themeFallback
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const theme = await loadTheme()
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <style id="theme-vars" dangerouslySetInnerHTML={{ __html: themeCss(theme) }} />
        {/* Les animations d'entrée ne masquent le contenu que si le JS tourne. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
