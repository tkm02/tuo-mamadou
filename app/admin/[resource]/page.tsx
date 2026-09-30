"use client"

import { Suspense, use } from "react"
import Link from "next/link"
import { getResource } from "@/lib/admin/resources"
import ResourceManager from "@/components/admin/resource-manager"
import { EmptyState, SkeletonRows } from "@/components/admin/ui"

export default function ResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = use(params)
  const config = getResource(resource)

  if (!config) {
    return (
      <EmptyState
        title="Section introuvable"
        action={
          <Link href="/admin" className="font-bold text-cobalt hover:text-ink">
            Retour au poste de contrôle
          </Link>
        }
      >
        Cette adresse ne correspond à aucune section du backoffice.
      </EmptyState>
    )
  }

  return (
    <Suspense fallback={<SkeletonRows />}>
      <ResourceManager key={config.slug} config={config} />
    </Suspense>
  )
}
