import type React from "react"
import { cn } from "@/lib/utils"

/** Couleurs vives attribuées par position (catégories, lignes, planches). */
export const ACCENTS = ["orange", "bleu", "sapin", "jaune", "vert"] as const
export type Accent = (typeof ACCENTS)[number] | "noir" | "blanc"

export const accentAt = (i: number): Accent => ACCENTS[((i % ACCENTS.length) + ACCENTS.length) % ACCENTS.length]

/** Inclinaison stable dérivée d'un texte : chaque sticker garde son angle d'un rendu à l'autre. */
export function tiltOf(seed: string, max = 6) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return ((Math.abs(h) % 1000) / 1000) * 2 * max - max
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-[clamp(1rem,4vw,3rem)]", className)}>{children}</div>
}

/** Autocollant découpé : pilule par défaut, disque ou étoile pour les chiffres. */
export function Sticker({
  color = "jaune",
  tilt = 0,
  shape = "pill",
  peel = true,
  reveal,
  delay,
  className,
  style,
  children,
  as: Tag = "span",
  ...rest
}: {
  color?: Accent
  tilt?: number
  shape?: "pill" | "disc" | "tag"
  peel?: boolean
  reveal?: "slap" | "rise" | "toss"
  delay?: number
  as?: "span" | "li" | "div" | "a" | "button"
} & React.HTMLAttributes<HTMLElement> &
  React.AnchorHTMLAttributes<HTMLElement>) {
  const Comp = Tag as React.ElementType
  return (
    <Comp
      data-reveal={reveal}
      className={cn(
        "sticker",
        `s-${color}`,
        peel && "sticker-peel",
        shape === "pill" && "px-4 py-2.5 text-[1rem]",
        shape === "tag" && "rounded-[14px] px-4 py-3 text-[1rem]",
        shape === "disc" && "aspect-square justify-center rounded-full p-3 text-center",
        className,
      )}
      style={{ "--r": `${tilt}deg`, "--d": delay !== undefined ? `${delay}ms` : undefined, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Bande de scotch inclinée qui défile. Le contenu est doublé pour boucler sans couture. */
export function Tape({
  items,
  color = "noir",
  tilt = -2,
  reverse = false,
  speed = 38,
  className,
}: {
  items: string[]
  color?: Accent
  tilt?: number
  reverse?: boolean
  speed?: number
  className?: string
}) {
  const run = [...items, ...items, ...items]
  return (
    <div className={cn("relative z-10 -mx-4", className)} style={{ transform: `rotate(${tilt}deg)` }}>
      <div
        className={cn("tape py-3.5 md:py-4", `field-${color}`)}
        data-reverse={reverse ? "" : undefined}
        style={{ "--speed": `${speed}s` } as React.CSSProperties}
        aria-label={items.join(", ")}
        role="marquee"
      >
        <div className="tape-track" aria-hidden="true">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {run.map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center">
                  <span className="whitespace-nowrap px-5 font-display text-[clamp(1.1rem,2vw,1.6rem)] font-extrabold uppercase tracking-[-0.01em] md:px-7">
                    {t}
                  </span>
                  <Star className="size-5 shrink-0 md:size-6" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Étoile à huit branches : le séparateur des bandes et le fond des stickers de chiffres. */
export function Star({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0l2.4 5.2L19.8 3l-1.9 5.5L24 12l-6.1 3.5 1.9 5.5-5.4-2.2L12 24l-2.4-5.2L4.2 21l1.9-5.5L0 12l6.1-3.5L4.2 3l5.4 2.2z"
      />
    </svg>
  )
}

/** Titre de section : énorme, à gauche, avec un sticker de données collé à côté. */
export function SectionHead({
  id,
  title,
  mark,
  markColor = "jaune",
  data,
  dataColor = "blanc",
  children,
  className,
}: {
  id: string
  title: string
  mark?: string
  markColor?: Accent
  data?: React.ReactNode
  dataColor?: Accent
  children?: React.ReactNode
  className?: string
}) {
  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2
          id={`${id}-title`}
          data-reveal="rise"
          className="max-w-[16ch] font-display text-[clamp(2.75rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
        >
          {title}
          {mark ? (
            <>
              {" "}
              <span className="marker" style={{ "--mk": `var(--${markColor})` } as React.CSSProperties}>
                {mark}
              </span>
            </>
          ) : null}
        </h2>
        {data ? (
          <Sticker color={dataColor} tilt={4} reveal="slap" delay={250} className="shrink-0 md:mb-3">
            {data}
          </Sticker>
        ) : null}
      </div>
      {children ? (
        <div data-reveal="rise" style={{ "--d": "120ms" } as React.CSSProperties} className="text-soft mt-6 max-w-[62ch] text-[1.25rem] font-medium leading-[1.45]">
          {children}
        </div>
      ) : null}
    </header>
  )
}

/** Bouton pilule : principal noir, secondaire blanc. */
export function PillLink({
  variant = "primary",
  className,
  children,
  ...rest
}: { variant?: "primary" | "secondary" | "orange" } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full px-7 py-[1.1rem] font-display text-[1.0625rem] font-extrabold transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 active:translate-y-0",
        variant === "primary" && "bg-noir text-blanc shadow-[var(--lift)] hover:shadow-[var(--lift-hi)]",
        variant === "secondary" && "bg-blanc text-noir shadow-[var(--lift)] hover:shadow-[var(--lift-hi)]",
        variant === "orange" && "bg-orange text-on-orange shadow-[var(--lift)] hover:shadow-[var(--lift-hi)]",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-block transition-transform duration-300 group-hover:translate-x-1", className)}>
      →
    </span>
  )
}

/** Puce de filtre en forme de sticker. */
export function FilterChip({
  active,
  onClick,
  children,
  count,
  color = "blanc",
  activeColor = "noir",
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  count?: number
  color?: Accent
  activeColor?: Accent
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "sticker sticker-peel shrink-0 cursor-pointer px-4 py-2.5 text-[1rem]",
        active ? `s-${activeColor}` : `s-${color}`,
      )}
      style={{ "--cut": active ? "4px" : "3px" } as React.CSSProperties}
    >
      {children}
      {count !== undefined ? <span className="font-sans text-[0.875rem] font-bold tabular-nums opacity-70">{count}</span> : null}
    </button>
  )
}
