"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Section index header with intersection-observer-driven active state.
 *
 * Renders the standard `(NN) / Title — hairline — caption` row that
 * already exists across the site, but adds a small accent dot that
 * appears when the section enters the viewport. Subtle wayfinding —
 * no sticky TOC, no scroll-spy nav.
 *
 * Drop-in replacement for the inline `.section-index` markup. If JS is
 * disabled the dot simply never appears; the header is unchanged.
 */

interface Props {
  index: string // "02"
  title: string // "About"
  caption: string // "Background & approach"
}

export function SectionIndex({ index, title, caption }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      // Trigger when the index has been at least 30% on screen and is
      // past the top 20% of the viewport.
      { rootMargin: "-20% 0px -50% 0px", threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="section-index">
      <span className="label mono flex items-center gap-2">
        <span
          aria-hidden
          className={`inline-block w-1.5 h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active
              ? "bg-[hsl(var(--accent))] opacity-100 scale-100"
              : "bg-[hsl(var(--ink-4))] opacity-0 scale-50"
          }`}
        />
        <span>
          {index} / {title}
        </span>
      </span>
      <span className="hairline-y flex-1 max-w-[80px]" />
      <span className="label">{caption}</span>
    </div>
  )
}
