"use client"

import { useEffect, useRef } from "react"

/**
 * Le Plateau vu depuis la lagune Ébrié, entre l'heure bleue et la nuit.
 * Rendu procédural : tours et fenêtres, balises de toit, un pont traversé par
 * le trafic, reflets ondulants sur la lagune, pluie fine.
 * Les couches statiques sont précalculées hors écran ; seule l'animation
 * (reflets, trafic, balises, pluie, fenêtres qui s'allument) tourne à chaque frame.
 */

type Win = { x: number; y: number; w: number; h: number; color: string; onAt: number; lit: boolean }
type Building = { x: number; w: number; h: number; top: number }
type Beacon = { x: number; y: number; phase: number }
type Car = { x: number; speed: number; dir: 1 | -1; len: number }
type Drop = { x: number; y: number; len: number; speed: number }

const PALETTE = {
  skyTop: "#03060d",
  skyMid: "#07122a",
  skyLow: "#0d2455",
  horizon: "#1d4596",
  far: "#0b1730",
  near: "#04070d",
  rim: "#1a2a4a",
  water: "#050d1c",
  waterDeep: "#02050b",
  warm: "#ffc45a",
  amber: "#ffb000",
  cool: "#dde6ff",
  blue: "#8fb0ff",
  dawn: "#d4d7de",
  neon: "#ff2e63",
  tail: "#ff3b4e",
  head: "#ffe2a8",
  rain: "#9db4e0",
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const INTRO = 2.4

export default function Skyline({ horizon = 0.8, className }: { horizon?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let W = 0
    let H = 0
    let waterY = 0
    let bridgeY = 0
    let sky: HTMLCanvasElement
    let city: HTMLCanvasElement
    let cityCtx: CanvasRenderingContext2D
    let windows: Win[] = []
    let beacons: Beacon[] = []
    let cars: Car[] = []
    let drops: Drop[] = []
    let lamps: number[] = []
    let raf = 0
    let running = false
    let visible = true
    let start = performance.now()
    let introDone = reduced
    let lastTwinkle = 0
    const rand = mulberry32(20250510)

    const makeCanvas = (w: number, h: number) => {
      const c = document.createElement("canvas")
      c.width = Math.max(1, Math.round(w * dpr))
      c.height = Math.max(1, Math.round(h * dpr))
      const cx = c.getContext("2d")!
      cx.scale(dpr, dpr)
      return c
    }

    const envelope = (fx: number, mobile: boolean) => {
      // La skyline monte vers la droite : le texte respire à gauche, le Plateau culmine à droite.
      const peak = mobile ? 0.26 : 0.44
      const low = mobile ? 0.06 : 0.05
      if (fx < 0.42) return low + fx * 0.12
      const k = Math.min(1, (fx - 0.42) / 0.36)
      const fall = fx > 0.9 ? (fx - 0.9) * 2.2 : 0
      return low + 0.05 + (peak - low - 0.05) * Math.sin((k * Math.PI) / 2) - fall * peak
    }

    function build() {
      const rect = canvas!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      if (W < 2 || H < 2) return
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const mobile = W < 768
      waterY = Math.round(H * horizon)
      bridgeY = Math.round(waterY + (H - waterY) * 0.42)
      const r = mulberry32(7)
      const s = Math.max(0.7, Math.min(1.25, W / 1440))

      // --- Ciel ---
      sky = makeCanvas(W, H)
      const sc = sky.getContext("2d")!
      const g = sc.createLinearGradient(0, 0, 0, waterY)
      g.addColorStop(0, PALETTE.skyTop)
      g.addColorStop(0.38, PALETTE.skyMid)
      g.addColorStop(0.78, PALETTE.skyLow)
      g.addColorStop(1, PALETTE.horizon)
      sc.fillStyle = g
      sc.fillRect(0, 0, W, waterY)
      // Halo ambré de la ville sur l'horizon, côté Plateau.
      const halo = sc.createRadialGradient(W * 0.72, waterY, 0, W * 0.72, waterY, W * 0.45)
      halo.addColorStop(0, "rgba(255,176,0,0.16)")
      halo.addColorStop(1, "rgba(255,176,0,0)")
      sc.fillStyle = halo
      sc.fillRect(0, 0, W, waterY)

      // --- Ville ---
      city = makeCanvas(W, waterY)
      cityCtx = city.getContext("2d")!
      windows = []
      beacons = []

      // Plan lointain : silhouettes bleutées, quelques lumières sourdes.
      let x = -8
      cityCtx.fillStyle = PALETTE.far
      while (x < W + 8) {
        const w = (22 + r() * 46) * s
        const h = envelope(x / W, mobile) * H * (0.5 + r() * 0.45) + 18 * s
        cityCtx.fillRect(x, waterY - h, w, h)
        x += w + r() * 4
      }

      // Plan proche.
      const buildings: Building[] = []
      x = -6
      const pyramidAt = W * 0.6
      const glassAt = W * 0.79
      const mastAt = W * 0.93
      let pyramidDone = false
      let glassDone = false
      while (x < W + 6) {
        const fx = x / W
        let w = (16 + r() * 44) * s
        let h = envelope(fx, mobile) * H * (0.55 + r() * 0.45) + 10 * s
        let kind: "block" | "stepped" | "antenna" | "pyramid" | "glass" = "block"
        if (!pyramidDone && x > pyramidAt) {
          kind = "pyramid"
          w = 92 * s
          h = Math.max(h * 0.8, H * (mobile ? 0.16 : 0.22))
          pyramidDone = true
        } else if (!glassDone && x > glassAt) {
          kind = "glass"
          w = 58 * s
          h = envelope(0.78, mobile) * H * 1.18 + 20 * s
          glassDone = true
        } else if (h > H * 0.2 && r() < 0.35) kind = "antenna"
        else if (r() < 0.3) kind = "stepped"

        const top = waterY - h
        cityCtx.fillStyle = PALETTE.near

        if (kind === "pyramid") {
          // La Pyramide du Plateau : gradins en retrait.
          const steps = 7
          for (let i = 0; i < steps; i++) {
            const inset = (w / 2) * (i / steps) * 0.9
            const stepH = h / steps
            const y = waterY - stepH * (i + 1)
            cityCtx.fillRect(x + inset, y, w - inset * 2, stepH + 1)
            cityCtx.fillStyle = PALETTE.rim
            cityCtx.fillRect(x + inset, y, w - inset * 2, 1)
            cityCtx.fillStyle = PALETTE.near
          }
        } else if (kind === "stepped") {
          cityCtx.fillRect(x, top + h * 0.12, w, h * 0.88)
          cityCtx.fillRect(x + w * 0.2, top, w * 0.6, h * 0.14)
          cityCtx.fillStyle = PALETTE.rim
          cityCtx.fillRect(x + w * 0.2, top, w * 0.6, 1)
          cityCtx.fillRect(x, top + h * 0.12, w, 1)
        } else {
          cityCtx.fillRect(x, top, w, h)
          cityCtx.fillStyle = PALETTE.rim
          cityCtx.fillRect(x, top, w, 1)
          if (kind === "antenna") {
            cityCtx.fillStyle = PALETTE.near
            const ah = (18 + r() * 34) * s
            cityCtx.fillRect(x + w / 2 - 1, top - ah, 2, ah)
            beacons.push({ x: x + w / 2, y: top - ah, phase: r() * Math.PI * 2 })
          } else if (h > H * 0.16 && r() < 0.5) {
            beacons.push({ x: x + w * 0.15, y: top - 2, phase: r() * Math.PI * 2 })
          }
        }

        if (kind === "glass") {
          // La façade d'argent : la seule qui annonce l'aube, une arête qui accroche la lumière.
          cityCtx.fillStyle = "#0b1222"
          cityCtx.fillRect(x, top, w, h)
          const edge = cityCtx.createLinearGradient(x, top, x + w, top)
          edge.addColorStop(0, "rgba(212,215,222,0)")
          edge.addColorStop(0.72, "rgba(212,215,222,0.05)")
          edge.addColorStop(0.9, "rgba(212,215,222,0.42)")
          edge.addColorStop(1, "rgba(212,215,222,0.08)")
          cityCtx.fillStyle = edge
          cityCtx.fillRect(x, top, w, h)
          const fade = cityCtx.createLinearGradient(0, top, 0, waterY)
          fade.addColorStop(0, "rgba(212,215,222,0.18)")
          fade.addColorStop(0.5, "rgba(212,215,222,0)")
          cityCtx.fillStyle = fade
          cityCtx.fillRect(x, top, w, h)
          cityCtx.fillStyle = "rgba(4,7,13,0.6)"
          for (let yy = top + 5; yy < waterY; yy += 5 * s) cityCtx.fillRect(x, yy, w, 1)
          cityCtx.fillStyle = PALETTE.dawn
          cityCtx.fillRect(x, top, w, 1)
          beacons.push({ x: x + w * 0.2, y: top - 2, phase: 0 })
          beacons.push({ x: x + w * 0.8, y: top - 2, phase: 0.4 })
        }

        buildings.push({ x, w, h, top })

        // Fenêtres.
        if (kind !== "glass") {
          const cw = 6.5 * s
          const ch = 9 * s
          const ww = Math.max(1.5, 2.6 * s)
          const wh = Math.max(2, 3.6 * s)
          // Certains immeubles dorment, d'autres travaillent tard.
          const litP = r() < 0.25 ? 0.03 + r() * 0.05 : 0.1 + r() * 0.22
          const tone = r()
          for (let yy = top + 6 * s; yy < waterY - 4; yy += ch) {
            for (let xx = x + 3 * s; xx < x + w - 3 * s; xx += cw) {
              if (kind === "pyramid") {
                const level = (waterY - yy) / h
                const inset = (w / 2) * level * 0.9
                if (xx < x + inset + 2 || xx > x + w - inset - 3) continue
              }
              if (kind === "stepped" && yy < top + h * 0.14) {
                if (xx < x + w * 0.2 + 2 || xx > x + w * 0.8 - 3) continue
              }
              if (r() > litP) continue
              const pick = r()
              const color =
                tone < 0.55
                  ? pick < 0.8
                    ? PALETTE.warm
                    : PALETTE.cool
                  : tone < 0.85
                    ? pick < 0.7
                      ? PALETTE.cool
                      : PALETTE.warm
                    : PALETTE.blue
              windows.push({
                x: xx,
                y: yy,
                w: ww,
                h: wh,
                color,
                onAt: 0.15 + r() * (INTRO - 0.5) + (1 - xx / W) * 0.3,
                lit: true,
              })
            }
          }
        }
        x += w + (r() < 0.2 ? r() * 8 * s : 0)
      }

      // Mât incliné de la cathédrale Saint-Paul, avec ses haubans, au bord de l'eau.
      const mx = mastAt
      const mh = H * (mobile ? 0.14 : 0.2)
      cityCtx.strokeStyle = PALETTE.near
      cityCtx.lineWidth = 3 * s
      cityCtx.beginPath()
      cityCtx.moveTo(mx, waterY)
      cityCtx.lineTo(mx - mh * 0.35, waterY - mh)
      cityCtx.stroke()
      cityCtx.lineWidth = 0.8
      cityCtx.strokeStyle = PALETTE.rim
      for (let i = 1; i <= 6; i++) {
        const t = i / 7
        cityCtx.beginPath()
        cityCtx.moveTo(mx - mh * 0.35 * t, waterY - mh * t)
        cityCtx.lineTo(mx + 26 * s + i * 7 * s, waterY)
        cityCtx.stroke()
      }
      beacons.push({ x: mx - mh * 0.35, y: waterY - mh, phase: 1.3 })

      // Pont : lampadaires et trafic.
      lamps = []
      for (let lx = 10; lx < W; lx += 38 * s) lamps.push(lx)
      cars = []
      const nCars = Math.round(W / (mobile ? 55 : 42))
      for (let i = 0; i < nCars; i++) {
        const dir: 1 | -1 = i % 2 === 0 ? 1 : -1
        cars.push({ x: r() * W, speed: (26 + r() * 40) * s, dir, len: (6 + r() * 6) * s })
      }

      // Pluie fine.
      drops = []
      if (!reduced) {
        const n = Math.min(170, Math.round((W * H) / 9000))
        for (let i = 0; i < n; i++)
          drops.push({ x: r() * W, y: r() * H, len: 8 + r() * 14, speed: 420 + r() * 380 })
      }

      paintWindows(reduced ? Infinity : 0)
    }

    function paintWindows(elapsed: number) {
      for (const w of windows) {
        if (!w.lit || elapsed < w.onAt) continue
        const a = Math.min(1, (elapsed - w.onAt) / 0.25)
        cityCtx.globalAlpha = a
        cityCtx.fillStyle = w.color
        cityCtx.fillRect(w.x, w.y, w.w, w.h)
      }
      cityCtx.globalAlpha = 1
    }

    function twinkle() {
      for (let i = 0; i < 5; i++) {
        const w = windows[Math.floor(rand() * windows.length)]
        if (!w) continue
        w.lit = !w.lit
        cityCtx.fillStyle = PALETTE.near
        cityCtx.fillRect(w.x - 0.5, w.y - 0.5, w.w + 1, w.h + 1)
        if (w.lit) {
          cityCtx.fillStyle = w.color
          cityCtx.fillRect(w.x, w.y, w.w, w.h)
        }
      }
    }

    function frame(now: number) {
      const t = (now - start) / 1000
      if (!introDone) {
        paintWindows(t)
        if (t > INTRO + 0.3) introDone = true
      } else if (!reduced && now - lastTwinkle > 650) {
        twinkle()
        lastTwinkle = now
      }
      draw(t)
      if (running) raf = requestAnimationFrame(frame)
    }

    function draw(t: number) {
      const c = ctx!
      c.clearRect(0, 0, W, H)
      c.drawImage(sky, 0, 0, W, H)
      c.drawImage(city, 0, 0, W, waterY)

      // Lagune.
      const wg = c.createLinearGradient(0, waterY, 0, H)
      wg.addColorStop(0, PALETTE.water)
      wg.addColorStop(1, PALETTE.waterDeep)
      c.fillStyle = wg
      c.fillRect(0, waterY, W, H - waterY)

      // Reflets : bandes miroir décalées par une houle lente.
      const waterH = H - waterY
      const strip = 2
      for (let dy = 0; dy < waterH; dy += strip) {
        const sy = waterY - dy - strip
        if (sy < 0) break
        const off = Math.sin(dy * 0.19 + t * 1.7) * (0.6 + dy * 0.05) + Math.sin(dy * 0.05 - t * 0.9) * 1.2
        c.globalAlpha = 0.5 * (1 - dy / waterH) ** 1.4
        c.drawImage(city, 0, sy * dpr, city.width, strip * dpr, off, waterY + dy, W, strip)
      }
      c.globalAlpha = 1

      // Ligne de rive.
      c.fillStyle = "rgba(29,69,150,0.45)"
      c.fillRect(0, waterY, W, 1)

      // Pont.
      c.fillStyle = "#070b14"
      c.fillRect(0, bridgeY, W, 5)
      for (let px = 20; px < W; px += 120) c.fillRect(px, bridgeY + 5, 5, H - bridgeY)
      for (const lx of lamps) {
        c.fillStyle = "rgba(255,196,90,0.9)"
        c.fillRect(lx, bridgeY - 7, 1.5, 1.5)
        c.fillStyle = "rgba(255,196,90,0.08)"
        c.fillRect(lx - 1, bridgeY + 6, 3, (H - bridgeY) * 0.8)
      }
      const dt = reduced ? 0 : 1 / 60
      for (const car of cars) {
        car.x += car.dir * car.speed * dt
        if (car.x > W + 20) car.x = -20
        if (car.x < -20) car.x = W + 20
        const y = car.dir === 1 ? bridgeY - 2.5 : bridgeY - 1
        c.fillStyle = car.dir === 1 ? PALETTE.head : PALETTE.tail
        c.fillRect(car.x, y, car.len, 1.6)
        // Le reflet double chaque lumière sur l'eau mouillée.
        const rh = (H - bridgeY) * 0.28
        const rg = c.createLinearGradient(0, bridgeY + 7, 0, bridgeY + 7 + rh)
        rg.addColorStop(0, car.dir === 1 ? "rgba(255,226,168,0.16)" : "rgba(255,59,78,0.16)")
        rg.addColorStop(1, "rgba(0,0,0,0)")
        c.fillStyle = rg
        c.fillRect(car.x + car.len * 0.3, bridgeY + 7, Math.max(1, car.len * 0.35), rh)
      }

      // Balises de toit.
      for (const b of beacons) {
        const a = reduced ? 0.9 : 0.35 + 0.65 * Math.max(0, Math.sin(t * 1.6 + b.phase)) ** 3
        const rg = c.createRadialGradient(b.x, b.y, 0, b.x, b.y, 9)
        rg.addColorStop(0, `rgba(255,46,99,${0.75 * a})`)
        rg.addColorStop(1, "rgba(255,46,99,0)")
        c.fillStyle = rg
        c.fillRect(b.x - 9, b.y - 9, 18, 18)
        c.fillStyle = `rgba(255,120,150,${a})`
        c.fillRect(b.x - 1, b.y - 1, 2, 2)
      }

      // Pluie.
      if (drops.length) {
        c.strokeStyle = PALETTE.rain
        c.lineWidth = 0.7
        c.globalAlpha = 0.14
        c.beginPath()
        for (const d of drops) {
          d.y += d.speed * dt
          d.x -= d.speed * dt * 0.12
          if (d.y > H) {
            d.y = -d.len
            d.x = rand() * (W + 60)
          }
          c.moveTo(d.x, d.y)
          c.lineTo(d.x + d.len * 0.12, d.y - d.len)
        }
        c.stroke()
        c.globalAlpha = 1
      }
    }

    const play = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(frame)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    build()
    if (reduced) draw(10)
    else play()

    let resizeTimer: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        const wasRunning = running
        pause()
        build()
        introDone = true
        paintWindows(Infinity)
        draw((performance.now() - start) / 1000)
        if (wasRunning || !reduced) play()
      }, 150)
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else pause()
    })
    io.observe(canvas)

    const onVis = () => (document.hidden ? pause() : play())
    document.addEventListener("visibilitychange", onVis)

    return () => {
      pause()
      ro.disconnect()
      io.disconnect()
      clearTimeout(resizeTimer)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [horizon])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
