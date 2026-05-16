"use client"

import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { downloadFile } from "@/utils/navigation"

/**
 * About — editorial long-form.
 *
 * Two-column: large body copy left, structured sidebar right (currently,
 * affiliations, signal). No icon-in-gradient-box, no stat tiles, no "core
 * values". The numbers that actually matter live in projects, not here.
 */
const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const currently = [
    { label: "Role", value: "Technical Head, GDG CKPCET" },
    { label: "Reading", value: "B.E. Computer Engineering, GTU" },
    { label: "Focus", value: "Backend · GenAI · Applied ML" },
    { label: "Based in", value: "Surat, India · GMT+5:30" },
  ]

  const principles = [
    {
      n: "01",
      title: "Ship the boring middle.",
      body: "The interesting work happens between the prototype and production — observability, retries, schema migrations, idempotency. That's where I focus.",
    },
    {
      n: "02",
      title: "GenAI is a system, not a prompt.",
      body: "Models are a component. Real GenAI products live or die on retrieval quality, eval harnesses, cost controls and the boring scaffolding around the LLM call.",
    },
    {
      n: "03",
      title: "Security is a first-class constraint.",
      body: "I treat auth, secrets, and least-privilege as part of the design from day one — not bolt-on. Cybersecurity is how I think about systems, not a separate hat.",
    },
  ]

  return (
    <section
      ref={ref}
      className="section-frame"
      style={{ opacity: inView ? 1 : 0, transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="editorial-container">
        {/* === Section index === */}
        <div className="section-index">
          <span className="label mono">02 / About</span>
          <span className="hairline-y flex-1 max-w-[80px]" />
          <span className="label">Background &amp; approach</span>
        </div>

        {/* === Lead statement — oversized opening === */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-24 md:mb-32">
          <div className="lg:col-span-9">
            <p className="display-lg text-[hsl(var(--ink))] text-balance">
              An engineer in the making, building backend systems and GenAI
              products that I'd want to ship myself —{" "}
              <span className="text-[hsl(var(--ink-3))]">
                with the rigor, observability and security that a senior
                review would expect.
              </span>
            </p>
          </div>
        </div>

        {/* === Two-column: body + sidebar === */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24 md:mb-32">
          {/* Body */}
          <div className="lg:col-span-7 space-y-6 lead">
            <p>
              I'm <span className="text-[hsl(var(--ink))]">Jinish</span> — a
              Computer Engineering student leading technical initiatives at
              Google Developer Group CKPCET. My day-to-day moves between
              building backend services, integrating LLM features into real
              products, and helping a cohort of student developers go from
              "first commit" to shipping work they're proud of.
            </p>
            <p>
              I'm most useful where the surface looks like a thin React app
              but the depth is in the API layer: auth flows, vector retrieval,
              streaming responses, retry semantics, rate limits, and the
              telemetry that tells you when something silently broke. I'd
              rather spend two extra hours on the failure modes than ship a
              demo that falls over on the second user.
            </p>
            <p>
              Long-term, I'm building toward founding a product company at the
              intersection of applied AI and secure infrastructure. Right now
              I'm learning in public, contributing to the local dev
              community, and looking for serious work — internships, contract
              builds, or collaborators — where I can sharpen on real
              constraints.
            </p>

            <div className="flex flex-wrap gap-3 pt-6">
              <button onClick={() => downloadFile()} className="cta-primary">
                <span>Download résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <Link href="#contact" className="cta-secondary">
                <span>Reach out</span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-12">
            <div className="space-y-8">
              <div>
                <div className="label mb-4">Currently</div>
                <dl className="space-y-3">
                  {currently.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[100px_1fr] gap-4 items-baseline pb-3 border-b border-[hsl(var(--hairline))]"
                    >
                      <dt className="label mono">{row.label}</dt>
                      <dd className="text-[hsl(var(--ink))] text-[15px] leading-snug">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <div className="label mb-4">Reachable</div>
                <div className="space-y-1.5">
                  <a
                    href="mailto:jinishkathiriya@gmail.com"
                    className="block link-redraw text-[hsl(var(--ink))] text-[15px]"
                  >
                    jinishkathiriya@gmail.com
                  </a>
                  <a
                    href="https://github.com/Jinish2170"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block link-redraw text-[hsl(var(--ink))] text-[15px]"
                  >
                    github.com/Jinish2170
                  </a>
                  <a
                    href="https://linkedin.com/in/jinish-kathiriya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block link-redraw text-[hsl(var(--ink))] text-[15px]"
                  >
                    linkedin.com/in/jinish-kathiriya
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* === Principles — numbered editorial list === */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="label sticky top-28">Operating principles</div>
          </div>
          <div className="lg:col-span-9 space-y-0">
            {principles.map((p, i) => (
              <div
                key={p.n}
                className={`grid grid-cols-[40px_1fr] gap-6 md:gap-8 py-10 ${
                  i === 0 ? "border-t" : ""
                } border-b border-[hsl(var(--hairline))]`}
              >
                <div className="label mono tnum text-[hsl(var(--ink-3))] pt-1">
                  {p.n}
                </div>
                <div>
                  <h3 className="display-md text-[hsl(var(--ink))] mb-3 text-balance">
                    {p.title}
                  </h3>
                  <p className="text-[hsl(var(--ink-2))] text-[16px] leading-relaxed max-w-2xl">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
