"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { RegistrationMark } from "@/components/effects/registration-mark"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[hsl(var(--hairline))]">
      <div className="editorial-container py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — identity */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="text-[22px] font-medium tracking-[-0.03em] text-[hsl(var(--ink))]"
            >
              Jinish<span className="text-[hsl(var(--accent))]">.</span>
            </Link>
            <div className="label mt-2 text-[hsl(var(--ink-3))]">
              Forward Deployed Engineer
            </div>
            <p className="mt-6 text-[15px] text-[hsl(var(--ink-3))] leading-relaxed max-w-[380px]">
              Shipping GenAI and backend systems into production.
              Based in Surat, India.
            </p>
          </div>

          {/* Center — links */}
          <div className="lg:col-span-4">
            <div className="label mb-4">Navigation</div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-8">
              <Link href="/" className="text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors">Home</Link>
              <Link href="/about" className="text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors">About</Link>
              <Link href="/projects" className="text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors">Projects</Link>
              <Link href="/blog" className="text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors">Field notes</Link>
              <Link href="/#contact" className="text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors">Contact</Link>
            </div>
          </div>

          {/* Right — elsewhere */}
          <div className="lg:col-span-3 lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-8">
            <div className="label mb-4">Elsewhere</div>
            <div className="space-y-3">
              <a
                href="https://github.com/Jinish2170"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors"
              >
                GitHub
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linkedin.com/in/jinish-kathiriya"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors"
              >
                LinkedIn
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:jinishkathiriya@gmail.com"
                className="text-[14px] text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))] transition-colors"
              >
                jinishkathiriya@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-[hsl(var(--hairline))]">
          <span className="mono text-[12px] text-[hsl(var(--ink-4))]">
            &copy; {currentYear} Jinish Kathiriya
          </span>
          <RegistrationMark variant="compass" size={20} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
