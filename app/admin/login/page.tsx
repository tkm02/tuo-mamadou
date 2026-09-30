"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabase } from "@/lib/supabase/client"
import Skyline from "@/components/skyline"
import { inputClass } from "@/components/admin/field-input"
import { Button, Callout } from "@/components/admin/ui"
import { cn } from "@/lib/utils"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = getSupabase()
    if (!supabase) {
      setError("Supabase n'est pas configuré (.env.local manquant).")
      return
    }
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError("Email ou mot de passe incorrect. Vérifie-les et réessaie.")
      return
    }
    router.replace("/admin")
  }

  return (
    <div className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-night px-4 py-16">
      <Skyline horizon={0.86} className="absolute inset-0 -z-10 h-full w-full opacity-70" />

      <div className="w-full max-w-sm">
        <p className="neon font-display text-[2.5rem] font-extrabold leading-none">TUO</p>
        <h1 className="mt-4 font-display text-[2.5rem] font-extrabold uppercase leading-[0.95] text-ink">Backoffice</h1>
        <p className="mt-2 text-[0.9375rem] text-muted">Espace d&apos;administration du portfolio.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 border border-hairline bg-night/85 p-5 backdrop-blur-md sm:p-6" noValidate>
          <div>
            <label htmlFor="email" className="mb-2 block text-[0.8125rem] font-bold text-dawn">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error) || undefined}
              className={cn(inputClass, "h-11")}
            />
          </div>
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <label htmlFor="password" className="text-[0.8125rem] font-bold text-dawn">
                Mot de passe
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-pressed={showPassword}
                className="text-[0.8125rem] font-bold text-cobalt hover:text-ink"
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={Boolean(error) || undefined}
              className={cn(inputClass, "h-11")}
            />
          </div>

          {error ? <Callout tone="error">{error}</Callout> : null}

          <Button type="submit" variant="primary" loading={loading} disabled={!email || !password} className="h-11 w-full">
            {loading ? "Connexion…" : "Se connecter"}
          </Button>
        </form>

        <p className="mt-6 text-[0.8125rem] leading-relaxed text-muted">
          Le compte administrateur se crée dans Supabase : Authentication, Users, Add user.
        </p>
      </div>
    </div>
  )
}
