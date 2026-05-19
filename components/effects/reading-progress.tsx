"use client"

import { useEffect, useState } from "react"

/**
 * Reading progress hairline — fixed 1px bar at the very top of the
 * viewport that fills as the user scrolls. Used only on long-form
 * blog post pages, not site-wide.
 *
 * rAF-batched scroll listener (passive) and a single CSS transform on a
 * transformed inner element keep this cheap. No layout thrash.
 */
export function ReadingProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf = 0
    let ticking = false

    const compute = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      if (scrollable <= 0) {
        setPct(0)
      } else {
        const p = Math.min(
          100,
          Math.max(0, (window.scrollY / scrollable) * 100),
        )
        setPct(p)
      }
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 inset-x-0 z-[60] h-[2px] pointer-events-none"
    >
      <div
        className="h-full bg-[hsl(var(--accent))] origin-left will-change-transform"
        style={{
          transform: `scaleX(${pct / 100})`,
          transition: "transform 120ms linear",
        }}
      />
    </div>
  )
}
