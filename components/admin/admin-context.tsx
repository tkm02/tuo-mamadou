"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { RESOURCES } from "@/lib/admin/resources"
import { getSupabase } from "@/lib/supabase/client"

type AdminData = {
  counts: Record<string, number | null>
  unread: number | null
  email: string
  refresh: () => Promise<void>
}

const AdminContext = createContext<AdminData>({ counts: {}, unread: null, email: "", refresh: async () => {} })

export function AdminDataProvider({ email, children }: { email: string; children: React.ReactNode }) {
  const [counts, setCounts] = useState<Record<string, number | null>>({})
  const [unread, setUnread] = useState<number | null>(null)

  const refresh = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return
    const next: Record<string, number | null> = {}
    await Promise.all([
      ...RESOURCES.map(async (r) => {
        const { count } = await supabase.from(r.table).select("*", { count: "exact", head: true })
        next[r.table] = count ?? 0
      }),
      supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("read", false)
        .then(({ count }) => setUnread(count ?? 0)),
    ])
    setCounts(next)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return <AdminContext.Provider value={{ counts, unread, email, refresh }}>{children}</AdminContext.Provider>
}

export const useAdminData = () => useContext(AdminContext)
