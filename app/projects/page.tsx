"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Star, GitFork, Search } from "lucide-react"
import { getAllRepositories } from "@/lib/github-service"
import { ProcessedProject } from "@/lib/github-types"

/**
 * /projects — editorial index of everything on GitHub.
 *
 * Same row-based aesthetic as the homepage section, with a filter chip row
 * and a search box. No glass cards, no gradient hover glows.
 */
export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<string>("All")
  const [query, setQuery] = useState("")

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const fetched = await getAllRepositories()
        if (!cancelled) setProjects(fetched)
      } catch {
        if (!cancelled) setError("Could not load projects.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const categories = useMemo(() => {
    const set = new Set<string>(["All"])
    projects.forEach((p) => p.category && set.add(p.category))
    return Array.from(set)
  }, [projects])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [projects, category, query])

  return (
    <main className="pt-32 pb-24">
      <div className="editorial-container">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 label hover:text-[hsl(var(--ink))] transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to portfolio</span>
        </Link>

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-9">
            <div className="label mono mb-4">All projects</div>
            <h1 className="display-xl text-[hsl(var(--ink))] text-balance">
              Everything, not just the highlights
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>
            <p className="lead mt-8 max-w-xl">
              The full set of public repositories. Hover for details, click
              through to source.
            </p>
          </div>
          <div className="lg:col-span-3 flex lg:flex-col gap-6 lg:items-end">
            <div>
              <div className="label">Total</div>
              <div className="display-md mono tnum text-[hsl(var(--ink))]">
                {loading
                  ? "—"
                  : String(projects.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--ink-3))]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, description, stack…"
              className="w-full pl-6 py-2 bg-transparent border-0 border-b border-[hsl(var(--hairline))] text-[14px] text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-4))] focus:outline-none focus:border-[hsl(var(--ink))] transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`chip ${
                  category === c
                    ? "border-[hsl(var(--ink))] text-[hsl(var(--ink))]"
                    : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="border-l-2 border-red-500 pl-4 py-2 text-[14px] text-red-500 mb-8">
            {error}
          </div>
        )}

        {/* List */}
        <div className="border-t border-[hsl(var(--hairline))]">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-10 border-b border-[hsl(var(--hairline))] animate-pulse"
                >
                  <div className="lg:col-span-2 h-4 bg-[hsl(var(--hairline))]" />
                  <div className="lg:col-span-7 space-y-3">
                    <div className="h-8 w-2/3 bg-[hsl(var(--hairline))]" />
                    <div className="h-4 w-full bg-[hsl(var(--hairline))]" />
                    <div className="h-4 w-1/2 bg-[hsl(var(--hairline))]" />
                  </div>
                  <div className="lg:col-span-3 h-16 bg-[hsl(var(--hairline))]" />
                </div>
              ))
            : filtered.length === 0
            ? (
                <div className="py-16 text-center text-[hsl(var(--ink-3))]">
                  No projects match those filters.
                </div>
              )
            : filtered.map((p, i) => {
                const idx = String(i + 1).padStart(2, "0")
                return (
                  <Link
                    key={p.id}
                    href={p.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid lg:grid-cols-12 gap-6 lg:gap-12 py-10 border-b border-[hsl(var(--hairline))] transition-colors hover:bg-[hsl(var(--secondary))]/40 -mx-2 px-2"
                  >
                    <div className="lg:col-span-2 flex lg:flex-col gap-4 lg:gap-2">
                      <div className="label mono tnum text-[hsl(var(--ink-3))]">
                        {idx}
                      </div>
                      <div className="label mono tnum">{p.lastUpdated}</div>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                        <h2 className="display-md text-[hsl(var(--ink))]">
                          {p.title}
                        </h2>
                        <ArrowUpRight className="w-5 h-5 text-[hsl(var(--ink-3))] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--ink))]" />
                      </div>
                      <p className="text-[hsl(var(--ink-2))] text-[15px] leading-relaxed max-w-2xl mb-5 line-clamp-3">
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
              })}
        </div>
      </div>
    </main>
  )
}
