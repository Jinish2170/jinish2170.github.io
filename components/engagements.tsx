"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { ArrowUpRight } from "lucide-react"
import { SectionIndex } from "@/components/effects/section-index"

const FILTERS = [
  { value: "all", label: "All" },
  { value: "genai", label: "GenAI" },
  { value: "backend", label: "Backend" },
  { value: "security", label: "Security" },
]

const ENGAGEMENTS = [
  {
    id: "benard",
    year: "2025",
    title: "BenardAI",
    domain: "GenAI · Security",
    tags: ["genai", "security"],
    brief:
      "Embedded as the delivery engineer on a cyber-AI threat-detection pipeline. Owned the model-serving layer and the low-latency inference path that the SOC dashboard depends on.",
    stack: ["Python", "FastAPI", "TensorFlow", "Docker", "Redis"],
    outcome: "Cut p99 inference 42%",
    primary: "Python",
    repo: "https://github.com/Jinish2170/BenardAI",
  },
  {
    id: "bizz",
    year: "2025",
    title: "BIZZ Portal",
    domain: "Backend · Platform",
    tags: ["backend"],
    brief:
      "Shipped a multi-tenant business-intelligence backend for small teams — encrypted analytics, role-scoped access, and the migration tooling to onboard a customer without downtime.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "RBAC", "JWT"],
    outcome: "0 downtime onboardings",
    primary: "TypeScript",
    repo: "https://github.com/Jinish2170/BIZZ_PORTAL",
  },
  {
    id: "bigtech",
    year: "2024",
    title: "BigTechTimes",
    domain: "Full-stack · Community",
    tags: ["backend", "genai"],
    brief:
      "Forward-deployed into a student community to stand up a publishing platform — long-form content, structured discussion, and moderation tooling that the editors actually run day-to-day.",
    stack: ["React", "Node.js", "MongoDB", "Next.js"],
    outcome: "Editors self-serve",
    primary: "JavaScript",
    repo: "https://github.com/Jinish2170/BigTechTimes",
  },
  {
    id: "ragassist",
    year: "2025",
    title: "Local RAG Assistant",
    domain: "Applied AI",
    tags: ["genai"],
    brief:
      "Built a private, on-device retrieval assistant for a team that couldn't send data to a cloud LLM — chunking, reranking, and an eval harness wired in before a single answer shipped.",
    stack: ["Ollama", "pgvector", "Python", "HuggingFace"],
    outcome: "Sub-second retrieval",
    primary: "Python",
    repo: "https://github.com/Jinish2170",
  },
]

const Engagements = () => {
  const [filter, setFilter] = useState("all")
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const shown =
    filter === "all"
      ? ENGAGEMENTS
      : ENGAGEMENTS.filter((e) => e.tags.includes(filter))

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
        <SectionIndex
          index="03"
          title="Engagements"
          caption="github.com/Jinish2170"
        />

        <div className="mb-14 max-w-[880px]">
          <p className="display-lg text-[hsl(var(--ink))]">
            A short list —{" "}
            <span className="text-[hsl(var(--ink-3))]">
              the deployments I'd walk a senior engineer through, framed by what
              shipped and what it changed, not the long tail of experiments.
            </span>
          </p>
          <p className="mono text-[11px] text-[hsl(var(--ink-4))] mt-4">
            Outcome figures below are placeholders pending verified numbers from
            each engagement.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 border-b border-[hsl(var(--hairline))] mb-2">
          {FILTERS.map((f, i) => {
            const on = f.value === filter
            return (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className="inline-flex items-baseline gap-2 px-3.5 py-2.5 -mb-px bg-transparent border-0 cursor-pointer transition-colors duration-200"
                style={{
                  borderBottom: `1px solid ${on ? "hsl(var(--ink))" : "transparent"}`,
                  color: on ? "hsl(var(--ink))" : "hsl(var(--ink-3))",
                  fontSize: 14,
                }}
              >
                <span className="label mono tnum text-[10.5px] tracking-[0.08em] text-[hsl(var(--ink-4))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Engagement rows */}
        <div className="border-t border-[hsl(var(--hairline))]">
          {shown.map((p, i) => (
            <a
              key={p.id}
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid lg:grid-cols-[0.18fr_0.58fr_0.24fr] gap-6 lg:gap-12 py-12 md:py-14 border-b border-[hsl(var(--hairline))] no-underline transition-colors duration-200 hover:bg-[hsl(var(--secondary)/0.5)] -mx-2 px-2"
            >
              <div className="flex lg:flex-col gap-4 lg:gap-2">
                <span className="label mono tnum text-[hsl(var(--ink-3))]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label mono tnum">{p.year}</span>
              </div>
              <div>
                <div className="flex items-baseline gap-3 flex-wrap mb-3">
                  <h3 className="display-md text-[hsl(var(--ink))] m-0 group-hover:underline underline-offset-4 decoration-[hsl(var(--ink-4))]">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="w-[18px] h-[18px] text-[hsl(var(--ink-3))] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-[hsl(var(--ink-2))] text-[16px] leading-relaxed max-w-[560px] mb-5">
                  {p.brief}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-8 flex lg:flex-col gap-4 lg:gap-4 flex-wrap">
                <div>
                  <div className="label mb-1">Outcome</div>
                  <div className="text-[14px] text-[hsl(var(--ink))] leading-snug">
                    {p.outcome}
                  </div>
                </div>
                <div>
                  <div className="label mb-1">Domain</div>
                  <div className="text-[14px] text-[hsl(var(--ink))]">
                    {p.domain}
                  </div>
                </div>
                <div>
                  <div className="label mb-1">Primary</div>
                  <div className="mono text-[14px] text-[hsl(var(--ink))]">
                    {p.primary}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Engagements
