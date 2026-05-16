"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X, ArrowDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { NAV_LINKS } from "@/config/constants"
import { useScrollDetection } from "@/hooks/useScrollDetection"
import { handleNavigation, downloadFile } from "@/utils/navigation"
import type { NavLink } from "@/types"

/**
 * Editorial navbar — mono numbered links, hairline divider on scroll.
 * No motion entrance, no shadow drop, no gradient logo. Just type.
 */
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isScrolled = useScrollDetection(20)

  const onNavigation = (link: NavLink) => {
    setIsOpen(false)
    handleNavigation(link.href, link.type)
  }

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[hsl(var(--background))]/72 backdrop-blur-md border-b border-[hsl(var(--hairline))]"
          : "bg-transparent"
      }`}
    >
      <div className="editorial-container">
        <div className="flex items-center justify-between h-16">
          {/* Mark */}
          <Link
            href="/"
            className="text-[18px] font-medium tracking-[-0.03em] text-[hsl(var(--ink))]"
          >
            Jinish<span className="text-[hsl(var(--accent))]">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => {
              const idx = String(i + 1).padStart(2, "0")
              const inner = (
                <span className="flex items-baseline gap-2">
                  <span className="label mono tnum opacity-60 group-hover:opacity-100 transition-opacity">
                    {idx}
                  </span>
                  <span className="text-[14px] text-[hsl(var(--ink-2))] group-hover:text-[hsl(var(--ink))] transition-colors">
                    {link.name}
                  </span>
                </span>
              )

              return link.type === "scroll" ? (
                <button
                  key={link.name}
                  onClick={() => onNavigation(link)}
                  className="group px-3 py-2"
                >
                  {inner}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group px-3 py-2"
                >
                  {inner}
                </Link>
              )
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadFile()}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 label-strong hover:text-[hsl(var(--ink))] transition-colors"
            >
              <span>Résumé</span>
              <ArrowDown className="w-3 h-3" />
            </button>

            <div className="hidden md:block w-px h-5 bg-[hsl(var(--hairline))] mx-1" />

            <ThemeToggle />

            <button
              className="md:hidden p-2 text-[hsl(var(--ink))]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-[hsl(var(--hairline))]"
            >
              <div className="py-6 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const idx = String(i + 1).padStart(2, "0")
                  const cls =
                    "w-full text-left flex items-baseline gap-3 py-3 px-1 text-[hsl(var(--ink-2))] hover:text-[hsl(var(--ink))]"
                  return link.type === "scroll" ? (
                    <button
                      key={link.name}
                      onClick={() => onNavigation(link)}
                      className={cls}
                    >
                      <span className="label mono tnum">{idx}</span>
                      <span className="text-[15px]">{link.name}</span>
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cls}
                    >
                      <span className="label mono tnum">{idx}</span>
                      <span className="text-[15px]">{link.name}</span>
                    </Link>
                  )
                })}

                <div className="pt-3 mt-3 border-t border-[hsl(var(--hairline))]">
                  <button
                    onClick={() => {
                      downloadFile()
                      setIsOpen(false)
                    }}
                    className="w-full text-left flex items-center gap-3 py-3 px-1 text-[hsl(var(--ink))]"
                  >
                    <ArrowDown className="w-4 h-4" />
                    <span className="text-[15px]">Download résumé</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
