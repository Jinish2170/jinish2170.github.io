"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import DotMatrixCanvas from "@/components/dot-matrix-canvas"
import { SOCIAL_LINKS } from "@/config/constants"
import { downloadFile } from "@/utils/navigation"

/**
 * Editorial hero.
 *
 * Single screen, deliberately quiet. Big display type left, hand-coded
 * interactive dot matrix right, monospace meta-labels framing the page
 * (location/clock top-right, status bottom-left, scroll cue bottom-right).
 *
 * No infinite animations, no scale-on-hover, no gradient text. One
 * editorial entrance animation, then nothing moves except the canvas.
 */
const Hero = () => {
  const [clock, setClock] = useState<string>("")

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
    setClock(fmt())
    const id = setInterval(() => setClock(fmt()), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col pt-24">
      <div className="editorial-container flex-1 flex flex-col">
        {/* ============= TOP META BAR ============= */}
        <div className="flex items-start justify-between mb-12 md:mb-16">
          <div className="label flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
            <span>Available for select work</span>
          </div>
          <div className="hidden md:flex items-center gap-6 label tnum">
            <span>Surat, IN</span>
            <span className="opacity-50">/</span>
            <span>{clock || "—:—"} IST</span>
          </div>
        </div>

        {/* ============= MAIN GRID ============= */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-end flex-1">
          {/* Left — typography */}
          <div className="space-y-10 editorial-rise">
            <div className="flex items-baseline gap-4 label">
              <span className="mono">01 / Index</span>
              <span className="hairline-y flex-1 max-w-[120px]" />
              <span>Jinish Kathiriya</span>
            </div>

            <h1 className="display-xl text-[hsl(var(--ink))]">
              Backend systems
              <br />
              <span className="text-[hsl(var(--ink-3))]">&amp;</span> GenAI for the
              <br />
              next wave of
              <br />
              intelligent products
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>

            <p className="lead max-w-xl text-pretty">
              I build production-grade backends and ship GenAI features that
              hold up under real traffic. Currently leading technical work at
              <span className="text-[hsl(var(--ink))]"> GDG&nbsp;CKPCET</span>{" "}
              and reading for B.E. Computer Engineering.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => downloadFile()}
                className="cta-primary group"
              >
                <span>Download résumé</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
              <Link href="#contact" className="cta-secondary group">
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right — bespoke interactive canvas */}
          <div className="hidden lg:flex flex-col self-stretch min-h-[420px]">
            <div className="relative flex-1 border border-[hsl(var(--hairline))] overflow-hidden">
              {/* Corner tick marks — editorial framing */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[hsl(var(--ink))]" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[hsl(var(--ink))]" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[hsl(var(--ink))]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[hsl(var(--ink))]" />

              <DotMatrixCanvas className="absolute inset-0 w-full h-full" />

              {/* Overlay caption — anchors the visual */}
              <div className="absolute top-4 left-4 label-strong">
                ./signal.tsx
              </div>

              {/* Live-status indicator — one slow-pulse accent dot. Single
                  intentional infinite animation on the page, serving as
                  the "instrument is on" signal for the canvas. */}
              <div className="absolute top-4 right-4 flex items-center gap-2 label tnum">
                <span
                  aria-hidden
                  className="relative inline-flex w-1.5 h-1.5"
                >
                  <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] opacity-60 animate-ping" />
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                </span>
                <span>LIVE</span>
              </div>

              <div className="absolute bottom-4 right-4 label tnum">
                v0.4 — interactive
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between label">
              <span>Hand-coded · raf · 60fps</span>
              <span className="text-[hsl(var(--ink-4))]">Move cursor →</span>
            </div>
          </div>
        </div>

        {/* ============= BOTTOM META BAR ============= */}
        <div className="mt-12 md:mt-16 pt-6 border-t border-[hsl(var(--hairline))] flex items-center justify-between">
          <div className="flex items-center gap-5 label">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-redraw text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))]"
            >
              GitHub
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-redraw text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))]"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.email}
              className="link-redraw text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))]"
            >
              Email
            </a>
          </div>
          <Link
            href="#about"
            className="label flex items-center gap-2 text-[hsl(var(--ink-3))] hover:text-[hsl(var(--ink))] transition-colors"
          >
            <span>Scroll</span>
            <ArrowDown className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
