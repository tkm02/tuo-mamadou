"use client"

import { useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase/client"

/**
 * Charge les lignes d'une table Supabase (triées par sortOrder).
 * Tant que la base n'est pas configurée ou que la table est vide,
 * les données de secours (contenu actuel du site) sont affichées.
 */
export function useTable<T>(table: string, fallback: T[]): T[] {
  const [rows, setRows] = useState<T[]>(fallback)

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) return
    let cancelled = false
    supabase
      .from(table)
      .select("*")
      .order("sortOrder", { ascending: true })
      .then(({ data, error }) => {
        if (!cancelled && !error && data && data.length > 0) {
          setRows(data as T[])
        }
      })
    return () => {
      cancelled = true
    }
  }, [table])

  return rows
}

/**
 * Charge une entrée de `site_content` (jsonb) et la fusionne avec le fallback,
 * pour que les champs non renseignés gardent leur valeur par défaut.
 */
export function useSiteContent<T extends Record<string, any>>(key: string, fallback: T): T {
  const [content, setContent] = useState<T>(fallback)

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) return
    let cancelled = false
    supabase
      .from("site_content")
      .select("value")
      .eq("key", key)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!cancelled && !error && data?.value) {
          setContent({ ...fallback, ...(data.value as T) })
        }
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return content
}
