import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mamadou Tuo - Full Stack Developer & IoT Specialist",
  description:
    "Professional portfolio showcasing full stack development, IoT systems, and innovative solutions in web, mobile, and embedded systems",
  generator: "portfolio.app",
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
    ],
    apple: "/logo.png",
  },
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The root layout component that wraps the entire app.
 * It sets the HTML language, suppresses hydration warnings, and sets the font family and background color.
 * It also wraps the app with the theme provider and analytics.
 * @param {{ children: React.ReactNode }} props - The props object.
 * @param {React.ReactNode} props.children - The children to render.
 */
/*******  acd2b870-ae13-4460-acda-bc40fc727a21  *******/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
