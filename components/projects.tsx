"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight, Star, GitFork } from "lucide-react"
import { getPinnedRepositories } from "@/lib/github-service"
import { ProcessedProject } from "@/lib/github-types"

/**
 * Selected Work — editorial showcase.
 *
 * Each project is a row, not a card. Index + title + body + meta + stack.
 * Hairline separators only. The chrome stays out of the way so the actual
 * work can be read at a glance.
 */
const FALLBACK: ProcessedProject[] = [
  {
    id: "fallback-1",
    title: "BenardAI",
    description:
      "Cybersecurity-focused AI tooling — threat detection pipeline with real-time monitoring and a model-serving layer designed for low-latency inference.",
    techStack: ["Python", "TensorFlow", "FastAPI", "Docker"],
    githubLink: "https://github.com/Jinish2170/BenardAI",
    category: "AI · Security",
    stars: 0,
    forks: 0,
    language: "Python",
    topics: ["ai", "cybersecurity"],
    lastUpdated: "2024",
    featured: true,
  },
  {
    id: "fallback-2",
    title: "BigTechTimes",
    description:
      "A community tech publication platform — long-form content, structured discussion threads, and curation tooling for moderators.",
    techStack: ["JavaScript", "React", "Node.js", "MongoDB"],
    githubLink: "https://github.com/Jinish2170/BigTechTimes",
    category: "Full-stack",
    stars: 0,
    forks: 0,
    language: "JavaScript",
    topics: ["web", "news"],
    lastUpdated: "2024",
    featured: true,
  },
  {
    id: "fallback-3",
    title: "BIZZ Portal",
    description:
      "Business-intelligence dashboard with encrypted analytics and role-scoped access — designed for small teams that can't justify enterprise tooling.",
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    githubLink: "https://github.com/Jinish2170/BIZZ_PORTAL",
    category: "Full-stack",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    topics: ["business", "analytics"],
    lastUpdated: "2024",
    featured: true,
  },
]

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const [projects, setProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const fetched = await getPinnedRepositories()
        if (cancelled) return
        if (fetched && fetched.length > 0) {
          setProjects(fetched.slice(0, 4))
          setLive(true)
        } else {
          setProjects(FALLBACK)
        }
      } catch {
        if (!cancelled) setProjects(FALLBACK)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      ref={ref}
      className="section-frame"
      style={{
        opacity: inView ? 1 : 0,
        transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="editorial-container">
        {/* === Section index === */}
        <div className="section-index">
          <span className="label mono">04 / Selected work</span>
          <span className="hairline-y flex-1 max-w-[80px]" />
          <span className="label flex items-center gap-2">
            {loading ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ink-4))]" />
                Loading from GitHub…
              </>
            ) : live ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                Live · github.com/Jinish2170
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--ink-4))]" />
                Cached set
              </>
            )}
          </span>
        </div>

        {/* === Lead === */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-9">
            <p className="display-lg text-[hsl(var(--ink))] text-balance">
              A short list —{" "}
              <span className="text-[hsl(var(--ink-3))]">
                the work I'd actually walk a senior engineer through, not the
                long tail of side experiments.
              </span>
            </p>
          </div>
        </div>

        {/* === Project list === */}
        <div className="border-t border-[hsl(var(--hairline))]">
          {(loading ? Array.from({ length: 3 }) : projects).map(
            (raw, i) => {
              const p = raw as ProcessedProject | undefined
              const idx = String(i + 1).padStart(2, "0")
              if (!p) {
                return (
                  <div
                    key={i}
                    className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-12 border-b border-[hsl(var(--hairline))] animate-pulse"
                  >
                    <div className="lg:col-span-2 h-4 bg-[hsl(var(--hairline))]" />
                    <div className="lg:col-span-7 space-y-3">
                      <div className="h-8 w-2/3 bg-[hsl(var(--hairline))]" />
                      <div className="h-4 w-full bg-[hsl(var(--hairline))]" />
                      <div className="h-4 w-1/2 bg-[hsl(var(--hairline))]" />
                    </div>
                    <div className="lg:col-span-3 h-16 bg-[hsl(var(--hairline))]" />
                  </div>
                )
              }
              return (
                <Link
                  key={p.id}
                  href={p.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid lg:grid-cols-12 gap-6 lg:gap-12 py-10 md:py-14 border-b border-[hsl(var(--hairline))] transition-colors hover:bg-[hsl(var(--secondary))]/40 -mx-2 px-2"
                >
                  {/* Index + meta */}
                  <div className="lg:col-span-2 flex lg:flex-col gap-4 lg:gap-2">
                    <div className="label mono tnum text-[hsl(var(--ink-3))]">
                      {idx}
                    </div>
                    <div className="label mono tnum">{p.lastUpdated}</div>
                  </div>

                  {/* Main */}
                  <div className="lg:col-span-7">
                    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                      <h3 className="display-md text-[hsl(var(--ink))]">
                        {p.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-[hsl(var(--ink-3))] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--ink))]" />
                    </div>
                    <p className="text-[hsl(var(--ink-2))] text-[16px] leading-relaxed max-w-2xl mb-5">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.techStack.slice(0, 6).map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="lg:col-span-3 flex lg:flex-col gap-4 lg:gap-3 lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-8">
                    <div>
                      <div className="label mb-1">Category</div>
                      <div className="text-[14px] text-[hsl(var(--ink))]">
                        {p.category}
                      </div>
                    </div>
                    {p.language && (
                      <div>
                        <div className="label mb-1">Primary</div>
                        <div className="text-[14px] mono text-[hsl(var(--ink))]">
                          {p.language}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-4 text-[13px] text-[hsl(var(--ink-3))] mono tnum">
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5" />
                        {p.stars}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <GitFork className="w-3.5 h-3.5" />
                        {p.forks}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            },
          )}
        </div>

        {/* === All projects CTA === */}
        <div className="mt-16 flex justify-end">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 label-strong"
          >
            <span className="link-redraw">All projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
