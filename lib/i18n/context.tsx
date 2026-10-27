"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { LANGS, translateUI, type Lang, type UIKey, type Vars } from "@/lib/i18n/ui"

const STORAGE_KEY = "tuo-lang"

type LanguageValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: UIKey, vars?: Vars) => string
}

/** Hors du fournisseur (backoffice, composants isolés), le site reste en français. */
const fallback: LanguageValue = {
  lang: "fr",
  setLang: () => {},
  t: (key, vars) => translateUI("fr", key, vars),
}

const LanguageContext = createContext<LanguageValue>(fallback)

const isLang = (value: unknown): value is Lang => typeof value === "string" && LANGS.includes(value as Lang)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr")

  // Le serveur rend le français ; le choix mémorisé est repris au montage.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isLang(stored)) setLangState(stored)
    } catch {
      // stockage indisponible : on reste en français
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // le choix ne sera pas mémorisé, la bascule fonctionne quand même
    }
  }, [])

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: (key, vars) => translateUI(lang, key, vars) }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}

/** Raccourci quand seul le dictionnaire d'interface est nécessaire. */
export function useT() {
  return useContext(LanguageContext).t
}
