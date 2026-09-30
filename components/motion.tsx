"use client"

import { useEffect, useRef, useState } from "react"

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Un seul observateur pour toute la page : chaque élément [data-reveal] reçoit
 * data-in quand il entre à l'écran, et l'animation CSS correspondante se joue.
 * Les éléments ajoutés plus tard (filtres, données Supabase) sont pris en charge.
 */
export function MotionRoot() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          ;(e.target as HTMLElement).setAttribute("data-in", "")
          io.unobserve(e.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    const scan = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]), .marker:not([data-in])").forEach((el) => io.observe(el))
    scan(document)
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof HTMLElement && scan(n.parentNode ?? n))
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}

/** Compte de 0 à la valeur quand le nombre entre à l'écran. Garde les suffixes (« 3+ », « 1er »). */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const m = value.match(/^(\D*)(\d+)(.*)$/)
  const target = m ? Number(m[2]) : 0
  const [n, setN] = useState<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !m || reduced()) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1100 + Math.min(target, 40) * 12
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur)
        setN(Math.round(target * (1 - Math.pow(1 - p, 4))))
        if (p < 1) requestAnimationFrame(tick)
      }
      setN(0)
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{m ? `${m[1]}${n ?? target}${m[3]}` : value}</span>
    </span>
  )
}

/**
 * Confettis aux couleurs de la palette, tirés depuis un point de l'écran.
 * Un canvas temporaire, retiré dès que tout est retombé.
 */
export function burst(x: number, y: number, count = 90) {
  if (typeof window === "undefined" || reduced()) return
  const css = getComputedStyle(document.documentElement)
  const colors = ["--orange", "--jaune", "--sapin", "--bleu", "--vert", "--noir"].map((v) => css.getPropertyValue(v).trim())
  const canvas = document.createElement("canvas")
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = innerWidth * dpr
  canvas.height = innerHeight * dpr
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "80",
  })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext("2d")!
  ctx.scale(dpr, dpr)
  const parts = Array.from({ length: count }, () => {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2
    const v = 7 + Math.random() * 9
    return {
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      w: 6 + Math.random() * 7,
      h: 9 + Math.random() * 9,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      c: colors[Math.floor(Math.random() * colors.length)],
      round: Math.random() < 0.3,
    }
  })
  let frame = 0
  const step = () => {
    frame++
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    let alive = 0
    for (const p of parts) {
      p.vy += 0.32
      p.vx *= 0.985
      p.x += p.vx
      p.y += p.vy
      p.r += p.vr
      if (p.y < innerHeight + 40) alive++
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      ctx.fillStyle = p.c
      if (p.round) {
        ctx.beginPath()
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Le ruban se retourne : sa hauteur apparente oscille.
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(frame * 0.12 + p.r)))
      }
      ctx.restore()
    }
    if (alive && frame < 360) requestAnimationFrame(step)
    else canvas.remove()
  }
  requestAnimationFrame(step)
}

/**
 * Pluie de paillettes : deux canons dans les coins bas de l'écran.
 * Le tir démarre doucement, s'emballe puis se calme ; chaque paillette part vite,
 * freine dans l'air et redescend lentement en scintillant.
 */
export function glitter() {
  if (typeof window === "undefined" || reduced()) return
  const css = getComputedStyle(document.documentElement)
  // Sur la scène orange : surtout du blanc, un peu de noir et d'orange profond pour le relief.
  const blanc = css.getPropertyValue("--blanc").trim() || "#fff"
  const noir = css.getPropertyValue("--noir").trim() || "#141414"
  const colors = [blanc, blanc, blanc, "#fff1e6", "#ffd2b3", noir, "#c94a00"]
  const W = innerWidth
  const H = innerHeight
  const canvas = document.createElement("canvas")
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = W * dpr
  canvas.height = H * dpr
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100vw", height: "100vh", pointerEvents: "none", zIndex: "80" })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext("2d")!
  ctx.scale(dpr, dpr)

  const count = W < 640 ? 110 : 220
  const emit = 1.1 // secondes de tir
  // Réciproque de smoothstep : peu de tirs au début et à la fin, beaucoup au milieu.
  const when = (u: number) => emit * (0.5 - Math.sin(Math.asin(1 - 2 * u) / 3))
  const parts = Array.from({ length: count }, (_, i) => {
    const left = i % 2 === 0
    const a = (-Math.PI / 2) + (left ? 1 : -1) * (0.3 + Math.random() * 0.6)
    const v = Math.max(H, W * 0.6) * (1.4 + Math.random() * 1.1)
    const kind = Math.random()
    return {
      born: when(Math.random()),
      life: 3.2 + Math.random() * 2.3,
      x: left ? -8 : W + 8,
      y: H * (0.92 + Math.random() * 0.06),
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      drag: 2.4 + Math.random() * 1.4,
      size: kind < 0.3 ? 7 + Math.random() * 6 : 4 + Math.random() * 4,
      shape: kind < 0.3 ? "spark" : kind < 0.8 ? "flake" : "dot",
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 8,
      tw: 7 + Math.random() * 10,
      ph: Math.random() * Math.PI * 2,
      sway: 10 + Math.random() * 25,
      c: colors[Math.floor(Math.random() * colors.length)],
    }
  })

  const start = performance.now()
  let last = start
  const step = (now: number) => {
    const t = (now - start) / 1000
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    ctx.clearRect(0, 0, W, H)
    let alive = 0
    for (const p of parts) {
      const age = t - p.born
      if (age < 0) {
        alive++
        continue
      }
      if (age > p.life || p.y > H + 20) continue
      alive++
      const k = Math.exp(-p.drag * dt)
      p.vx *= k
      p.vy = p.vy * k + 260 * dt
      p.x += p.vx * dt + Math.sin(age * 2.2 + p.ph) * p.sway * dt
      p.y += p.vy * dt
      p.r += p.vr * dt
      const fade = Math.min(1, (p.life - age) / 0.9)
      const twinkle = 0.55 + 0.45 * Math.sin(age * p.tw + p.ph)
      ctx.save()
      ctx.globalAlpha = fade * twinkle
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      ctx.fillStyle = p.c
      if (p.shape === "spark") {
        // Étoile à quatre branches, qui grossit et rétrécit avec le scintillement.
        const s = p.size * (0.7 + 0.3 * twinkle)
        ctx.beginPath()
        ctx.moveTo(0, -s)
        ctx.quadraticCurveTo(0, 0, s, 0)
        ctx.quadraticCurveTo(0, 0, 0, s)
        ctx.quadraticCurveTo(0, 0, -s, 0)
        ctx.quadraticCurveTo(0, 0, 0, -s)
        ctx.fill()
      } else if (p.shape === "flake") {
        // Paillette plate qui se retourne : sa largeur apparente oscille.
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size * Math.abs(Math.cos(age * 6 + p.ph)), p.size)
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }
    if (alive && t < 8) requestAnimationFrame(step)
    else canvas.remove()
  }
  requestAnimationFrame(step)
}

/**
 * Rend un élément déplaçable à la souris et au doigt (translate CSS, sans re-render).
 * Un simple clic reste un clic : le déplacement ne commence qu'après quelques pixels.
 */
export function useDraggable<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let sx = 0,
      sy = 0,
      ox = 0,
      oy = 0,
      dx = 0,
      dy = 0,
      dragging = false,
      pid = -1
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return
      pid = e.pointerId
      sx = e.clientX
      sy = e.clientY
      ox = dx
      oy = dy
      dragging = false
    }
    const move = (e: PointerEvent) => {
      if (e.pointerId !== pid) return
      const mx = e.clientX - sx
      const my = e.clientY - sy
      if (!dragging && Math.hypot(mx, my) < 5) return
      if (!dragging) {
        dragging = true
        el.setPointerCapture(pid)
        el.style.zIndex = "30"
        el.style.cursor = "grabbing"
        el.style.transition = "none"
      }
      dx = ox + mx
      dy = oy + my
      el.style.translate = `${dx}px ${dy}px`
    }
    const up = (e: PointerEvent) => {
      if (e.pointerId !== pid) return
      pid = -1
      el.style.cursor = ""
      el.style.transition = ""
      if (dragging) {
        const stop = (ev: Event) => {
          ev.stopPropagation()
          ev.preventDefault()
        }
        el.addEventListener("click", stop, { capture: true, once: true })
      }
    }
    el.addEventListener("pointerdown", down)
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerup", up)
    el.addEventListener("pointercancel", up)
    return () => {
      el.removeEventListener("pointerdown", down)
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerup", up)
      el.removeEventListener("pointercancel", up)
    }
  }, [])
  return ref
}

/** Reflet holographique et inclinaison qui suivent le pointeur. */
export function useHolo<T extends HTMLElement>(tilt = 10) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      const px = (e.clientX - b.left) / b.width
      const py = (e.clientY - b.top) / b.height
      el.style.setProperty("--mx", `${px * 100}%`)
      el.style.setProperty("--my", `${py * 100}%`)
      el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * tilt}deg) rotateX(${(0.5 - py) * tilt}deg)`
    }
    const leave = () => {
      el.style.transform = ""
      el.style.removeProperty("--mx")
      el.style.removeProperty("--my")
    }
    el.addEventListener("pointermove", move)
    el.addEventListener("pointerleave", leave)
    return () => {
      el.removeEventListener("pointermove", move)
      el.removeEventListener("pointerleave", leave)
    }
  }, [tilt])
  return ref
}
