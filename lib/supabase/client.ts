"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

// Nouvelle clé « publishable » (sb_publishable_…) ou ancienne clé « anon ».
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY)
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!client) {
    client = createClient(SUPABASE_URL!, SUPABASE_KEY!)
  }
  return client
}

const MEDIA_BUCKET = "media"

/** Téléverse un fichier dans le bucket `media` et renvoie son URL publique. */
export async function uploadToMedia(file: File, folder = "uploads"): Promise<string> {
  const supabase = getSupabase()
  if (!supabase) throw new Error("Supabase n'est pas configuré")
  const ext = file.name.split(".").pop() || "bin"
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .slice(0, 60)
  const path = `${folder}/${Date.now()}-${base}.${ext}`
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
