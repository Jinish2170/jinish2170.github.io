"use client"

import { useInView } from "react-intersection-observer"
import { CapabilityMark } from "@/components/effects/capability-mark"
import { RegistrationMark } from "@/components/effects/registration-mark"
import { SectionIndex } from "@/components/effects/section-index"

/**
 * Capability matrix — editorial numbered list.
 *
 * Replaces the grid of gradient-icon cards with a clean editorial layout.
 * Each domain: index, heading, narrative, stack chips. Each row now has a
 * bespoke dotted-diagram mark that animates only on row hover — small
 * visual interest in what was previously dead negative space.
 */
type MarkVariant = "compass" | "target3" | "dotgrid" | "scatter"

interface Capability {
  n: string
  domain: string
  body: string
  stack: string[]
  signals: string[]
  mark: MarkVariant
}

const capabilities: Capability[] = [
  {
    n: "01",
    domain: "Generative AI delivery",
    body: "Standing up production GenAI features inside a customer's stack — retrieval pipelines, prompt design, evaluation harnesses, streaming UX, and the cost/latency tradeoffs that keep them shippable past the demo.",
    stack: [
      "OpenAI",
      "Gemini",
      "LangChain",
      "RAG",
      "Vector DB",
      "Prompt eval",
      "NLP",
    ],
    signals: [
      "GenAI intern · production API",
      "Speech-to-text + LLM pipeline",
      "Local RAG assistant — sub-second retrieval",
    ],
    mark: "compass",
  },
  {
    n: "02",
    domain: "Backend systems",
    body: "The unglamorous middle layer that decides whether a deployment survives — REST/RPC contracts, auth, schema, queues, retries, observability. The work I'd rather over-invest in than ship a demo that falls over on user two.",
    stack: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "JWT",
      "REST",
    ],
    signals: [
      "Real-time subscription backends",
      "Multi-tenant auth &amp; RBAC",
      "Secure student-activity portal",
    ],
    mark: "target3",
  },
  {
    n: "03",
    domain: "Full-stack delivery",
    body: "End-to-end product work embedded with the team — typed React/Next.js front-ends on top of typed APIs, optimized for the boring details that compound across a release cycle and a handoff.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "tRPC",
      "Server Components",
    ],
    signals: [
      "25+ production-grade builds",
      "Type-safe API contracts",
      "Perf budgets &lt; 100ms TTI",
    ],
    mark: "dotgrid",
  },
  {
    n: "04",
    domain: "Security as a constraint",
    body: "Auth, secrets, and least-privilege treated as part of the design from day one — not bolted on before launch. Cybersecurity is how I reason about systems, which matters most when I'm deployed in someone else's environment.",
    stack: [
      "Threat modeling",
      "OAuth 2.0",
      "RBAC",
      "Secrets mgmt",
      "Prompt injection",
    ],
    signals: [
      "Prompt-injection defenses shipped",
      "Least-privilege by default",
      "Stanford ML specialization",
    ],
    mark: "scatter",
  },
]

const OUTCOMES = [
  {
    num: "3",
    suffix: " wks",
    label: "Kickoff → first prod ship",
    sub: "Typical time to a customer-facing release on a new engagement.",
  },
  {
    num: "−42",
    suffix: "%",
    label: "P99 latency, inference path",
    sub: "On a request path a downstream dashboard depends on.",
  },
  {
    num: "25",
    suffix: "+",
    label: "Production-grade builds",
    sub: "Across GenAI, backend, and full-stack engagements.",
  },
]

const ProfessionalSkills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

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
        <SectionIndex
          index="03"
          title="Capabilities"
          caption="What I do, in detail"
        />

        {/* === Lead — registration mark fills the right empty col === */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20 md:mb-28 items-start">
          <div className="lg:col-span-9">
            <p className="display-lg text-[hsl(var(--ink))] text-balance">
              Four domains I'm useful in —{" "}
              <span className="text-[hsl(var(--ink-3))]">
                not a list of every framework I've touched, only the things
                I'd put my name on in production.
              </span>
            </p>
          </div>
          <div className="lg:col-span-3 hidden lg:flex justify-end items-start pt-3 opacity-80">
            <RegistrationMark variant="compass" size={28} />
          </div>
        </div>

        {/* === Outcomes band — illustrative placeholders, clearly marked === */}
        <div className="grid sm:grid-cols-3 border border-[hsl(var(--hairline))] border-b-0 bg-[hsl(var(--card))]">
          {OUTCOMES.map((o, i) => (
            <div
              key={o.label}
              className={`p-8 md:p-10 ${i ? "border-t sm:border-t-0 sm:border-l border-[hsl(var(--hairline))]" : ""}`}
            >
              <span
                className="mono tnum block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "hsl(var(--ink))",
                }}
              >
                {o.num}
                {o.suffix}
              </span>
              <div className="label mt-3.5">{o.label}</div>
              <div className="mt-2 text-[13px] leading-relaxed text-[hsl(var(--ink-3))]">
                {o.sub}
              </div>
            </div>
          ))}
        </div>
        <div className="mono text-[10.5px] text-[hsl(var(--ink-4))] px-3.5 py-2.5 border border-[hsl(var(--hairline))] border-t-0 mb-20">
          Placeholder figures — swap in verified numbers before this goes live.
        </div>

        {/* === Capability list === */}
        <div className="border-t border-[hsl(var(--hairline))]">
          {capabilities.map((c) => (
            <article
              key={c.n}
              className="group/cap grid lg:grid-cols-12 gap-6 lg:gap-12 py-12 md:py-16 border-b border-[hsl(var(--hairline))]"
            >
              {/* Index + bespoke dotted diagram (animates only on row hover) */}
              <div className="lg:col-span-2">
                <div className="flex lg:flex-col items-baseline lg:items-start gap-4 lg:gap-6">
                  <span className="label mono tnum text-[hsl(var(--ink-3))]">
                    {c.n}
                  </span>
                  <span className="label-strong lg:hidden">{c.domain}</span>
                  <CapabilityMark
                    variant={c.mark}
                    className="hidden lg:block opacity-70 group-hover/cap:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="lg:col-span-7">
                <h3 className="display-md text-[hsl(var(--ink))] mb-4 hidden lg:block">
                  {c.domain}
                </h3>
                <p className="text-[hsl(var(--ink-2))] text-[17px] leading-relaxed max-w-2xl mb-6">
                  {c.body}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {c.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Signals */}
              <div className="lg:col-span-3 lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-8">
                <div className="label mb-3">Signals</div>
                <ul className="space-y-2">
                  {c.signals.map((s) => (
                    <li
                      key={s}
                      className="text-[14px] leading-snug text-[hsl(var(--ink-2))] flex gap-3"
                    >
                      <span
                        aria-hidden
                        className="mono text-[hsl(var(--ink-4))] shrink-0"
                      >
                        ─
                      </span>
                      <span
                        dangerouslySetInnerHTML={{ __html: s }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProfessionalSkills
