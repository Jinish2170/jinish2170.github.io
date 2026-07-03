"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import SignalPanel from "@/components/effects/signal-panel"
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
            <span>Open to forward-deployed roles</span>
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

            <h1 className="display-xl text-[hsl(var(--ink))] text-balance">
              Forward deployed for
              <br />
              the messy last mile
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>

            <p className="lead max-w-xl text-pretty">
              I embed with teams and ship GenAI and backend systems into
              production — under real traffic, real constraints, and real
              deadlines. I own the work from kickoff to the release that
              survives its second user, currently leading technical delivery
              at <span className="text-[hsl(var(--ink))]">GDG&nbsp;CKPCET</span>.
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
                <span>Start a conversation</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right — bespoke kinetic signal instrument */}
          <div className="hidden lg:flex flex-col self-stretch min-h-[420px]">
            <SignalPanel className="flex-1" />
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
