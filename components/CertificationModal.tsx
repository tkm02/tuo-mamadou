"use client"

import { X, Download, ExternalLink, CheckCircle } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"

interface CertificationModalProps {
  isOpen: boolean
  onClose: () => void
  certification: {
    name: string
    provider: string
    logo: string
    gradient: string
    year: string
    skills: string[]
    certificateUrl: string // URL du PDF ou image
    certificateType: "pdf" | "image"
    verificationUrl?: string
  }
}

export default function CertificationModal({
  isOpen,
  onClose,
  certification,
}: CertificationModalProps) {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden" // Bloquer scroll
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative max-w-5xl w-full max-h-[90vh] bg-card border border-border rounded-3xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r bgradient from-[#2B4162] to-[#2B4162]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-4xl">
                {certification.logo}
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">{certification.name}</h2>
                <p className="text-white/90 flex items-center gap-2">
                  <span>{certification.provider}</span>
                  <span>•</span>
                  <span>{certification.year}</span>
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {certification.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Certificate Display */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {certification.certificateType === "pdf" ? (
            // PDF Viewer
            <div className="w-full h-[600px] bg-muted rounded-xl overflow-hidden border border-border">
              <iframe
                src={`${certification.certificateUrl}#view=FitH`}
                className="w-full h-full"
                title={`Certificat ${certification.name}`}
              />
            </div>
          ) : (
            // Image Viewer
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border">
              <Image
                src={certification.certificateUrl}
                alt={`Certificat ${certification.name}`}
                fill
                className="object-contain bg-muted"
                priority
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Verification Badge */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Certification vérifiée</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {certification.verificationUrl && (
                <a
                  href={certification.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-lg text-sm font-medium transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Vérifier en ligne
                </a>
              )}
              <a
                href={certification.certificateUrl}
                download
                className={`flex items-center gap-2 px-4 py-2 bg-[#2B4162] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity`}
              >
                <Download className="w-4 h-4" />
                Télécharger
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
