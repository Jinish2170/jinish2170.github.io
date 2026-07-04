"use client"

import { useEffect, useRef } from "react"

export default function SignalPanel({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let raf = 0
    let w = 0
    let h = 0
    let tick = 0

    function isDark() {
      return document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark" ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches &&
         !document.documentElement.classList.contains("light") &&
         document.documentElement.getAttribute("data-theme") !== "light")
    }

    function colors() {
      const dark = isDark()
      return {
        dot: dark ? "rgba(235,225,215,0.16)" : "rgba(20,15,10,0.16)",
        dotAccent: (a: number) => dark ? `rgba(220,140,60,${a})` : `rgba(175,85,18,${a})`,
        ring: dark ? "rgba(235,225,215,0.16)" : "rgba(20,15,10,0.16)",
        ringAccent: dark ? "rgba(220,140,60,0.22)" : "rgba(175,85,18,0.18)",
        tick: dark ? "rgba(235,225,215,0.32)" : "rgba(20,15,10,0.32)",
        tickMinor: dark ? "rgba(235,225,215,0.15)" : "rgba(20,15,10,0.15)",
        compassRing: dark ? "rgba(235,225,215,0.22)" : "rgba(20,15,10,0.22)",
        needleTail: dark ? "rgba(235,225,215,0.4)" : "rgba(20,15,10,0.4)",
        gridDot: dark ? "rgba(235,225,215,0.18)" : "rgba(20,15,10,0.18)",
        accent: "hsl(28 88% 46%)",
        accentGlow0: "rgba(220,140,60,0.4)",
        accentGlow1: "rgba(220,140,60,0)",
        accentGrad0: dark ? "rgba(220,140,60,0.3)" : "rgba(175,85,18,0.3)",
      }
    }

    function build() {
      const rect = canvas!.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return false
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      return true
    }

    type ScatterDot = { a: number; rr: number; r: number; accent: boolean; speed: number }
    let scatter: ScatterDot[] = []
    function seedScatter() {
      scatter = []
      const n = 26
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.sin(i * 2.3) * 0.6
        const rr = 0.28 + ((i * 37) % 100) / 100 * 0.62
        scatter.push({
          a,
          rr,
          r: 0.5 + ((i * 53) % 100) / 100 * 1.3,
          accent: i % 7 === 0,
          speed: prefersReduced ? 0 : 0.0008 + ((i * 13) % 10) / 10 * 0.0012,
        })
      }
    }
    seedScatter()

    const GRID = 5

    function draw() {
      tick++
      if (!w || !h) {
        raf = requestAnimationFrame(draw)
        return
      }
      ctx!.clearRect(0, 0, w, h)

      const c = colors()
      const ccx = w / 2
      const ccy = 40 + (h - 40) / 2
      const R = Math.max(1, Math.min(w, h - 40) * 0.42)

      scatter.forEach((d) => {
        d.a += d.speed
        const x = ccx + R * d.rr * Math.cos(d.a)
        const y = ccy + R * d.rr * Math.sin(d.a) * 0.94
        ctx!.beginPath()
        ctx!.arc(x, y, d.r, 0, Math.PI * 2)
        if (d.accent) {
          const pulse = 0.5 + 0.5 * Math.sin(tick * 0.04 + d.a * 3)
          ctx!.fillStyle = c.dotAccent(0.35 + pulse * 0.4)
        } else {
          ctx!.fillStyle = c.dot
        }
        ctx!.fill()
      })

      ctx!.save()
      ctx!.strokeStyle = c.ring
      ctx!.lineWidth = 1
      ctx!.setLineDash([1, 7])
      ctx!.lineDashOffset = prefersReduced ? 0 : tick * 0.05
      ctx!.beginPath()
      ctx!.arc(ccx, ccy, R * 0.86, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.restore()

      ctx!.save()
      ctx!.strokeStyle = c.ringAccent
      ctx!.lineWidth = 1
      ctx!.setLineDash([2, 5])
      ctx!.lineDashOffset = prefersReduced ? 0 : -tick * 0.09
      ctx!.beginPath()
      ctx!.arc(ccx, ccy, R * 0.6, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.restore()

      const ringR = R * 0.34
      for (let deg = 0; deg < 360; deg += 15) {
        const isMajor = deg % 90 === 0
        const rad0 = ((deg - 90) * Math.PI) / 180
        const outer = ringR + (isMajor ? 6 : 3)
        ctx!.strokeStyle = isMajor ? c.tick : c.tickMinor
        ctx!.lineWidth = isMajor ? 1.2 : 0.8
        ctx!.beginPath()
        ctx!.moveTo(ccx + ringR * Math.cos(rad0), ccy + ringR * Math.sin(rad0))
        ctx!.lineTo(ccx + outer * Math.cos(rad0), ccy + outer * Math.sin(rad0))
        ctx!.stroke()
      }
      ctx!.strokeStyle = c.compassRing
      ctx!.lineWidth = 1
      ctx!.beginPath()
      ctx!.arc(ccx, ccy, ringR, 0, Math.PI * 2)
      ctx!.stroke()

      const needleAngle = prefersReduced ? 0 : tick * 0.42 + Math.sin(tick * 0.018) * 22
      const nrad = ((needleAngle - 90) * Math.PI) / 180
      const tipX = ccx + ringR * 0.92 * Math.cos(nrad)
      const tipY = ccy + ringR * 0.92 * Math.sin(nrad)
      const tailX = ccx - ringR * 0.5 * Math.cos(nrad)
      const tailY = ccy - ringR * 0.5 * Math.sin(nrad)

      ctx!.save()
      ctx!.lineCap = "round"
      ctx!.strokeStyle = c.needleTail
      ctx!.lineWidth = 2
      ctx!.beginPath()
      ctx!.moveTo(ccx, ccy)
      ctx!.lineTo(tailX, tailY)
      ctx!.stroke()
      const tipGrad = ctx!.createLinearGradient(ccx, ccy, tipX, tipY)
      tipGrad.addColorStop(0, c.accentGrad0)
      tipGrad.addColorStop(1, c.accent)
      ctx!.strokeStyle = tipGrad
      ctx!.lineWidth = 2.25
      ctx!.beginPath()
      ctx!.moveTo(ccx, ccy)
      ctx!.lineTo(tipX, tipY)
      ctx!.stroke()
      const glow = ctx!.createRadialGradient(tipX, tipY, 0, tipX, tipY, 12)
      glow.addColorStop(0, c.accentGlow0)
      glow.addColorStop(1, c.accentGlow1)
      ctx!.fillStyle = glow
      ctx!.beginPath()
      ctx!.arc(tipX, tipY, 12, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.beginPath()
      ctx!.arc(tipX, tipY, 2.2, 0, Math.PI * 2)
      ctx!.fillStyle = c.accent
      ctx!.fill()
      ctx!.restore()

      ctx!.beginPath()
      ctx!.arc(ccx, ccy, 4.5, 0, Math.PI * 2)
      ctx!.fillStyle = "hsl(var(--card))"
      ctx!.fill()
      ctx!.lineWidth = 1.4
      ctx!.strokeStyle = c.accent
      ctx!.stroke()
      ctx!.beginPath()
      ctx!.arc(ccx, ccy, 1.6, 0, Math.PI * 2)
      ctx!.fillStyle = c.accent
      ctx!.fill()

      const gx0 = ccx - R * 0.92
      const gy0 = ccy + R * 0.42
      const cell = Math.max(7, R * 0.09)
      for (let gr = 0; gr < GRID; gr++) {
        for (let gc = 0; gc < GRID; gc++) {
          const gx = gx0 + gc * cell
          const gy = gy0 + gr * cell
          if (gx < 8 || gy > h - 8) continue
          const isAccent = (gr === 2 && gc === 2) || (gr + gc) % 4 === 0
          const breathe = 0.5 + 0.5 * Math.sin(tick * 0.05 + gr + gc)
          ctx!.beginPath()
          ctx!.arc(gx, gy, isAccent ? 1.6 : 1, 0, Math.PI * 2)
          ctx!.fillStyle = isAccent ? c.dotAccent(0.35 + breathe * 0.4) : c.gridDot
          ctx!.fill()
        }
      }

      if (!prefersReduced) raf = requestAnimationFrame(draw)
    }

    build()
    draw()

    const ro = new ResizeObserver(() => build())
    ro.observe(canvas)

    const themeObs = new MutationObserver(() => {})
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      themeObs.disconnect()
    }
  }, [])

  return (
    <div
      className={`relative h-full border border-[hsl(var(--hairline))] overflow-hidden bg-[hsl(var(--card))] ${className ?? ""}`}
    >
      <span className="absolute top-0 left-0 w-[18px] h-[18px] border-t-[1.5px] border-l-[1.5px] border-[hsl(var(--ink))]" />
      <span className="absolute top-0 right-0 w-[18px] h-[18px] border-t-[1.5px] border-r-[1.5px] border-[hsl(var(--ink))]" />
      <span className="absolute bottom-0 left-0 w-[18px] h-[18px] border-b-[1.5px] border-l-[1.5px] border-[hsl(var(--ink))]" />
      <span className="absolute bottom-0 right-0 w-[18px] h-[18px] border-b-[1.5px] border-r-[1.5px] border-[hsl(var(--ink))]" />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />

      <div className="absolute top-0 left-0 right-0 z-[2] flex items-center px-4 py-[11px] bg-[hsl(var(--card)/0.9)] backdrop-blur-[6px] border-b border-[hsl(var(--hairline))]">
        <span className="label-strong mono">./signal.tsx</span>
      </div>
    </div>
  )
}
