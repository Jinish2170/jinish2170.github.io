"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { downloadFile } from "@/utils/navigation"

/**
 * /about — editorial long-form. Same aesthetic as the homepage section
 * but with the full experience/education/certifications timeline.
 */

interface TimelineEntry {
  year: string
  title: string
  org: string
  body: string
  bullets?: string[]
}

const experience: TimelineEntry[] = [
  {
    year: "2023 — Present",
    title: "Technical Head",
    org: "Google Developer Group, CKPCET",
    body: "Lead technical programming, mentor a cohort of student developers, and run cybersecurity awareness initiatives across the chapter.",
    bullets: [
      "Organized 15+ technical workshops reaching 500+ students",
      "Led cybersecurity awareness campaigns and labs",
      "Mentored 50+ developers on career direction",
    ],
  },
  {
    year: "2023 — Present",
    title: "Cybersecurity Domain Head",
    org: "GDG CKPCET",
    body: "Spearhead security education and build small-scale assessment tools for the chapter community.",
    bullets: [
      "Developed an entry-level security training curriculum",
      "Authored hands-on penetration-testing labs",
      "Built lightweight security-assessment utilities",
    ],
  },
  {
    year: "2022 — Present",
    title: "Full-stack Developer",
    org: "Freelance",
    body: "Ship scalable web applications and AI-integrated features for clients across multiple industries.",
    bullets: [
      "Delivered 25+ production projects",
      "Specialized in MERN stack and AI integration",
      "Long-running engagements over one-off builds",
    ],
  },
]

const education: TimelineEntry[] = [
  {
    year: "2021 — 2025",
    title: "B.E. Computer Engineering",
    org: "CKPCET · GTU",
    body: "Coursework concentrated in systems, AI/ML, and security. Active in coding club, hackathons, and student-led technical events.",
    bullets: ["GPA 8.5 / 10", "AI/ML and Cybersecurity electives"],
  },
]

const certifications = [
  { name: "Foundations of Cybersecurity", issuer: "Google", date: "2024" },
  { name: "Advanced AI and Data Skills", issuer: "Industry", date: "2024" },
  { name: "Full-Stack Web Development", issuer: "Professional", date: "2023" },
  { name: "Machine Learning Specialization", issuer: "Stanford / Coursera", date: "2024" },
]

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="border-t border-[hsl(var(--hairline))]">
      {entries.map((e, i) => (
        <article
          key={i}
          className="grid lg:grid-cols-12 gap-6 lg:gap-12 py-10 md:py-14 border-b border-[hsl(var(--hairline))]"
        >
          <div className="lg:col-span-3">
            <div className="label mono tnum">{e.year}</div>
          </div>
          <div className="lg:col-span-9">
            <h3 className="display-md text-[hsl(var(--ink))] mb-1">
              {e.title}
            </h3>
            <div className="label-strong mb-4">{e.org}</div>
            <p className="text-[hsl(var(--ink-2))] text-[16px] leading-relaxed max-w-2xl mb-4">
              {e.body}
            </p>
            {e.bullets && (
              <ul className="space-y-1.5 max-w-2xl">
                {e.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[14px] text-[hsl(var(--ink-2))]"
                  >
                    <span aria-hidden className="mono text-[hsl(var(--ink-4))]">
                      ─
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export default function AboutPage() {
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
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-9">
            <div className="label mono mb-4">About</div>
            <h1 className="display-xl text-[hsl(var(--ink))] text-balance">
              The long version
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>
            <p className="lead mt-8 max-w-xl">
              An expanded look at the work, the people I've worked with, and
              the academic backdrop — for when the homepage summary isn't
              enough.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button onClick={() => downloadFile()} className="cta-primary">
                <span>Download résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <Link href="/#contact" className="cta-secondary">
                <span>Reach out</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Experience */}
        <section className="mb-24 md:mb-32">
          <div className="section-index">
            <span className="label mono">01 / Experience</span>
            <span className="hairline-y flex-1 max-w-[80px]" />
            <span className="label">Roles &amp; responsibilities</span>
          </div>
          <Timeline entries={experience} />
        </section>

        {/* Education */}
        <section className="mb-24 md:mb-32">
          <div className="section-index">
            <span className="label mono">02 / Education</span>
            <span className="hairline-y flex-1 max-w-[80px]" />
            <span className="label">Academic background</span>
          </div>
          <Timeline entries={education} />
        </section>

        {/* Certifications */}
        <section>
          <div className="section-index">
            <span className="label mono">03 / Certifications</span>
            <span className="hairline-y flex-1 max-w-[80px]" />
            <span className="label">Selected credentials</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-0 border-t border-[hsl(var(--hairline))]">
            {certifications.map((c) => (
              <div
                key={c.name}
                className="py-6 border-b border-[hsl(var(--hairline))] flex items-baseline justify-between gap-4"
              >
                <div>
                  <div className="text-[hsl(var(--ink))] text-[15px] font-medium">
                    {c.name}
                  </div>
                  <div className="label mt-1">{c.issuer}</div>
                </div>
                <div className="label mono tnum">{c.date}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
