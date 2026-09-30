"use client"

import { useEffect, useRef, useState } from "react"
import type { CertificationRow } from "@/lib/fallback-data"
import { clean } from "@/lib/utils"

const isPdf = (c: CertificationRow) => c.certificateType === "pdf" || /\.pdf($|[?#])/i.test(c.certificateUrl)

/** Aperçu d'un certificat (PDF ou image) sur <dialog> natif, avec le lien de vérification. */
export default function CertificatePreview({ cert, onClose }: { cert: CertificationRow | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (cert && !d.open) {
      setBroken(false)
      d.showModal()
    } else if (!cert && d.open) d.close()
  }, [cert])

  const url = cert?.certificateUrl ? encodeURI(cert.certificateUrl) : ""

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(ev) => ev.target === ref.current && onClose()}
      aria-label={cert ? `Certificat ${clean(cert.name)}` : "Certificat"}
      className="m-auto w-[min(64rem,94vw)] overflow-hidden rounded-[28px] bg-blanc p-0 text-noir shadow-[0_0_0_6px_var(--blanc),var(--lift-hi)] backdrop:bg-noir/80"
    >
      {cert ? (
        <div>
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate font-display text-[1.25rem] font-extrabold tracking-[-0.01em]">{clean(cert.name)}</p>
              <p className="text-[0.875rem] font-semibold text-gris">
                {clean(cert.provider)} · {clean(cert.year)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full bg-noir px-4 py-2 font-display text-[1rem] font-extrabold text-blanc"
            >
              Fermer
            </button>
          </div>

          <div className="bg-noir">
            {!url || broken ? (
              <p className="grid h-[40vh] place-items-center px-6 text-center text-[1rem] font-semibold text-blanc">
                Aperçu indisponible pour ce certificat.
              </p>
            ) : isPdf(cert) ? (
              <iframe src={`${url}#navpanes=0&view=FitH`} title={`Certificat ${clean(cert.name)}`} className="h-[70vh] w-full bg-blanc" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={`Certificat ${clean(cert.name)}`}
                onError={() => setBroken(true)}
                className="max-h-[70vh] w-full object-contain"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
            {url && !broken ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-4 py-2 font-display text-[1rem] font-extrabold hover:bg-noir/[0.07]"
              >
                Ouvrir en plein écran ↗
              </a>
            ) : null}
            {cert.verificationUrl ? (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-orange px-4 py-2 font-display text-[1rem] font-extrabold text-on-orange"
              >
                Vérifier l&apos;authenticité ↗
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
