"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Arrow, Container, Sticker } from "@/components/kit"
import { burst } from "@/components/motion"
import { useSiteContent } from "@/lib/use-portfolio"
import { aboutFallback, contactFallback, socialsFallback } from "@/lib/fallback-data"
import { getSupabase } from "@/lib/supabase/client"
import { clean } from "@/lib/utils"

type Status = "idle" | "sending" | "success" | "error"

export default function Contact() {
  const contact = useSiteContent("contact", contactFallback)
  const socials = useSiteContent("socials", socialsFallback)
  const about = useSiteContent("about", aboutFallback)
  const [status, setStatus] = useState<Status>("idle")
  const submitRef = useRef<HTMLButtonElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    }

    try {
      // Enregistre le message dans Supabase (visible dans le backoffice)
      const supabase = getSupabase()
      let saved = false
      if (supabase) {
        const { error } = await supabase.from("contact_messages").insert(payload)
        saved = !error
      }

      // Notification email via Formspree (best-effort)
      let mailed = false
      try {
        const res = await fetch("https://formspree.io/f/mvgebddn", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        })
        mailed = res.ok
      } catch {
        // ignoré : l'enregistrement Supabase suffit
      }

      if (saved || mailed) {
        setStatus("success")
        form.reset()
        const b = submitRef.current?.getBoundingClientRect()
        if (b) burst(b.left + b.width / 2, b.top, 110)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="field-orange relative isolate overflow-hidden py-[clamp(5rem,11vw,9rem)]">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <h2
            id="contact-title"
            data-reveal="rise"
            className="font-display text-[clamp(2.75rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
          >
            Votre projet,{" "}
            <span className="marker" style={{ "--mk": "var(--blanc)" } as React.CSSProperties}>
              mon prochain sticker&nbsp;?
            </span>
          </h2>
          <p data-reveal="rise" style={{ "--d": "120ms" } as React.CSSProperties} className="text-soft mt-7 max-w-[46ch] text-[1.25rem] font-medium leading-[1.45]">
            Une application à construire, un processus à automatiser par l&apos;IA&nbsp;? Je suis disponible pour des
            missions freelance. Écrivez-moi, appelez-moi, ou laissez un message ici.
          </p>

          <a
            href={`mailto:${contact.email}`}
            data-reveal="rise"
            style={{ "--d": "200ms" } as React.CSSProperties}
            className="mt-10 inline-block break-all font-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold leading-tight tracking-[-0.02em] underline decoration-noir decoration-[5px] underline-offset-[8px] transition-[text-decoration-color] hover:decoration-blanc"
          >
            {contact.email}
          </a>

          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-4">
            <Sticker as="li" color="noir" tilt={-3} reveal="slap" delay={100}>
              <a href={contact.phoneHref} className="tabular-nums">
                {contact.phone}
              </a>
            </Sticker>
            <Sticker as="li" color="blanc" tilt={2} reveal="slap" delay={200}>
              {clean(contact.location)}
            </Sticker>
            {socials.linkedin ? (
              <Sticker as="li" color="noir" tilt={-2} reveal="slap" delay={300}>
                <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </Sticker>
            ) : null}
            {socials.github ? (
              <Sticker as="li" color="blanc" tilt={4} reveal="slap" delay={400}>
                <a href={socials.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </Sticker>
            ) : null}
            {about.cvUrl ? (
              <Sticker as="li" color="noir" tilt={-4} reveal="slap" delay={500}>
                <a href={about.cvUrl} download>
                  CV (PDF) ↓
                </a>
              </Sticker>
            ) : null}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          data-reveal="rise"
          className="self-start rounded-[28px] bg-blanc p-6 text-noir shadow-[var(--lift-hi)] md:p-9 lg:col-span-6"
          aria-describedby="form-status"
        >
          <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em]">
            Laissez un message
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Nom" name="name" autoComplete="name" required />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="mt-5">
            <Field label="Objet" name="subject" required placeholder="Mission freelance, automatisation IA, rencontre…" />
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="text-[1rem] font-bold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              onChange={() => status !== "sending" && setStatus("idle")}
              className={FIELD}
            />
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              ref={submitRef}
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-noir px-7 py-[1.1rem] font-display text-[1.0625rem] font-extrabold text-blanc shadow-[var(--lift)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
              {status === "sending" ? null : <Arrow />}
            </button>
            <p id="form-status" role="status" aria-live="polite" className="text-[1rem]">
              {status === "success" ? (
                <span className="sticker s-vert px-4 py-2.5 text-[1rem]" style={{ "--r": "-3deg", "--cut": "3px" } as React.CSSProperties} data-reveal="slap">
                  Message reçu. Je reviens vers vous très vite.
                </span>
              ) : status === "error" ? (
                <span className="font-semibold">
                  L&apos;envoi a échoué. Réessayez, ou écrivez directement à{" "}
                  <a href={`mailto:${contact.email}`} className="font-bold underline decoration-orange decoration-[3px] underline-offset-4">
                    {contact.email}
                  </a>
                  .
                </span>
              ) : null}
            </p>
          </div>
        </form>
      </Container>
    </section>
  )
}

const FIELD =
  "mt-2 block w-full rounded-[14px] border-2 border-noir bg-blanc px-4 py-3.5 text-[1.0625rem] text-noir placeholder:text-gris transition-shadow focus:shadow-[0_0_0_4px_var(--orange)] focus:outline-none"

function Field({
  label,
  name,
  type = "text",
  ...rest
}: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="text-[1rem] font-bold">
        {label}
      </label>
      <input id={name} name={name} type={type} {...rest} className={FIELD} />
    </div>
  )
}
