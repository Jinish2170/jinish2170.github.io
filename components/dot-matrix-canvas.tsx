"use client"

import { useEffect, useRef } from "react"

/**
 * Hand-coded interactive dot matrix.
 *
 * Each cell renders a small dot whose radius and opacity are modulated
 * by distance from the pointer, easing toward the target with a spring.
 * No libraries — raf-driven, DPR-aware, pauses when offscreen and respects
 * reduced-motion. Designed to read as a precise, technical signature
 * rather than a generic Three.js demo.
 */
export default function DotMatrixCanvas({
  spacing = 22,
  baseRadius = 1.1,
  hoverRadius = 3.4,
  influence = 140,
  className,
}: {
  spacing?: number
  baseRadius?: number
  hoverRadius?: number
  influence?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    // Pointer state in CSS pixels, eased toward the raw target each frame.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let raf = 0
    let running = true
    let width = 0
    let height = 0
    let dpr = 1
    let inkColor = "rgba(255,255,255,1)"

    const resolveInk = () => {
      // Read ink color from CSS custom property so dark/light themes follow.
      const styles = getComputedStyle(document.documentElement)
      const ink = styles.getPropertyValue("--ink").trim()
      inkColor = ink ? `hsl(${ink})` : "rgba(255,255,255,1)"
    }

    const setSize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointer.tx = -9999
      pointer.ty = -9999
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Spring ease toward target — small lag reads as crafted, not janky.
      pointer.x += (pointer.tx - pointer.x) * 0.12
      pointer.y += (pointer.ty - pointer.y) * 0.12

      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1
      const offsetX = (width - (cols - 1) * spacing) / 2
      const offsetY = (height - (rows - 1) * spacing) / 2

      ctx.fillStyle = inkColor

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * spacing
          const y = offsetY + j * spacing
          const dx = x - pointer.x
          const dy = y - pointer.y
          const d2 = dx * dx + dy * dy
          const inf2 = influence * influence
          // Smooth falloff: 1 at center, 0 at edge of influence.
          const t = Math.max(0, 1 - d2 / inf2)
          // Ease-out cubic for nicer shape near the cursor.
          const eased = t * t * (3 - 2 * t)
          const r = baseRadius + (hoverRadius - baseRadius) * eased
          const alpha = 0.08 + eased * 0.72

          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      if (running) raf = requestAnimationFrame(draw)
    }

    const drawStaticFrame = () => {
      // Reduced-motion: render a single static frame, no animation.
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = inkColor
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1
      const offsetX = (width - (cols - 1) * spacing) / 2
      const offsetY = (height - (rows - 1) * spacing) / 2
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.globalAlpha = 0.18
          ctx.beginPath()
          ctx.arc(
            offsetX + i * spacing,
            offsetY + j * spacing,
            baseRadius,
            0,
            Math.PI * 2,
          )
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    resolveInk()
    setSize()

    const resizeObserver = new ResizeObserver(() => {
      setSize()
      if (prefersReduced) drawStaticFrame()
    })
    resizeObserver.observe(canvas)

    // Pause when off-screen to save battery.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !prefersReduced) {
          if (!running) {
            running = true
            raf = requestAnimationFrame(draw)
          }
        } else {
          running = false
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    // Re-read ink color if theme flips.
    const themeObserver = new MutationObserver(resolveInk)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    if (prefersReduced) {
      drawStaticFrame()
    } else {
      window.addEventListener("pointermove", onPointerMove)
      canvas.addEventListener("pointerleave", onPointerLeave)
      raf = requestAnimationFrame(draw)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerleave", onPointerLeave)
      resizeObserver.disconnect()
      io.disconnect()
      themeObserver.disconnect()
    }
  }, [spacing, baseRadius, hoverRadius, influence])

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  )
}
