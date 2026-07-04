"use client"

import { useInView } from "react-intersection-observer"
import { Linkedin, Github } from "lucide-react"
import { RegistrationMark } from "@/components/effects/registration-mark"
import { SectionIndex } from "@/components/effects/section-index"
import { SOCIAL_LINKS } from "@/config/constants"

const FACTS = [
  {
    label: "Education",
    lines: ["B.E. Computer Engineering", "CKPCET, Surat — 2022–2026"],
  },
  {
    label: "Current role",
    lines: ["Technical Head", "GDG on Campus CKPCET"],
  },
  {
    label: "Focus areas",
    lines: ["Generative AI delivery", "Backend systems", "Applied security"],
  },
  {
    label: "Based in",
    lines: ["Surat, Gujarat, India", "IST — UTC+5:30"],
  },
]

const BELIEFS = [
  {
    n: "01",
    title: "Ship the boring middle",
    body: "The model is rarely the bottleneck. Auth, retrieval quality, error handling, the deployment pipeline — that's the 80% that decides whether a production release survives week two.",
  },
  {
    n: "02",
    title: "Own the outcome, not the task",
    body: "Forward deployed means I'm responsible for what the customer experiences — not just the code I merged. I'd rather push back on a spec than ship something that technically passes review and fails in the wild.",
  },
  {
    n: "03",
    title: "Instruments over intuition",
    body: "Observability isn't a phase two problem. I wire in structured logging, traces, and eval harnesses before a feature ships — so there's real signal to act on, not silence and hope.",
  },
]

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section
      ref={ref}
      className="section-frame"
      style={{ opacity: inView ? 1 : 0, transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="editorial-container">
        <SectionIndex index="02" title="About" caption="The person behind the PR" />

        {/* === Two-column: body + facts sidebar === */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-20 mb-20 md:mb-24">
          <div className="space-y-7">
            <h2 className="display-md text-[hsl(var(--ink))] text-balance">
              Computer engineering student who'd rather ship than present —{" "}
              <span className="text-[hsl(var(--ink-3))]">
                and has the repos to prove it.
              </span>
            </h2>
            <p className="text-[hsl(var(--ink-2))] text-[17px] leading-[1.7] max-w-[620px]">
              I'm Jinish Kathiriya — final-year CE student at CKPCET, Technical
              Head at GDG on Campus, and the engineer you call when a GenAI pilot
              needs to stop being a demo and start being a product. My instinct is
              to understand a system end-to-end before changing any part of it, and
              to write the code that handles the second customer, not just the first.
            </p>
            <p className="text-[hsl(var(--ink-2))] text-[17px] leading-[1.7] max-w-[620px]">
              I've led technical delivery across GenAI pipelines, multi-tenant
              backends, and security-critical products — building with TypeScript,
              Python, Node.js, Postgres, and the surrounding tooling that keeps
              production running cleanly. GDG gave me the practice of owning a
              technical outcome for a real audience, not just a project grade.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary group"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary group"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Facts sidebar */}
          <aside className="lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-10">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`py-6 ${i < FACTS.length - 1 ? "border-b border-[hsl(var(--hairline))]" : ""}`}
              >
                <div className="label mb-2.5">{f.label}</div>
                {f.lines.map((l, j) => (
                  <div
                    key={j}
                    className={`leading-snug ${
                      j === 0
                        ? "text-[15px] font-medium text-[hsl(var(--ink))]"
                        : "text-[14px] text-[hsl(var(--ink-3))]"
                    }`}
                  >
                    {l}
                  </div>
                ))}
              </div>
            ))}
            <div className="flex justify-end pt-4 opacity-70">
              <RegistrationMark variant="dotgrid" size={32} />
            </div>
          </aside>
        </div>

        {/* === Beliefs — three-column editorial grid === */}
        <div className="border-t border-[hsl(var(--hairline))]">
          <div className="label py-8">What I hold to be true, in production</div>
          <div className="grid md:grid-cols-3 gap-0">
            {BELIEFS.map((b, i) => (
              <div
                key={b.n}
                className={`pb-10 ${
                  i > 0
                    ? "md:border-l md:border-[hsl(var(--hairline))] md:pl-10 border-t md:border-t-0 border-[hsl(var(--hairline))] pt-8 md:pt-0"
                    : ""
                } ${i < BELIEFS.length - 1 ? "pr-10" : ""}`}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="label mono tnum text-[hsl(var(--ink-4))]">{b.n}</span>
                  <h3
                    className="text-[18px] font-medium text-[hsl(var(--ink))] tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {b.title}
                  </h3>
                </div>
                <p className="text-[hsl(var(--ink-2))] text-[14.5px] leading-[1.65]">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
