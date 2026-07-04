"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUp } from "lucide-react"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 500)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [toggleVisibility])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--card))] text-[hsl(var(--ink))] shadow-sm transition-all duration-300 hover:border-[hsl(var(--ink-3))] hover:shadow-md ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  )
}

export default ScrollToTop
