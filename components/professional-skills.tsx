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
type MarkVariant = "genai" | "backend" | "fullstack" | "ml"

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
    domain: "Generative AI",
    body: "Building production GenAI features end-to-end — retrieval pipelines, prompt design, evaluation harnesses, streaming UX, and the cost/latency tradeoffs that keep them shippable.",
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
      "API response time reduced 20%",
    ],
    mark: "genai",
  },
  {
    n: "02",
    domain: "Backend systems",
    body: "Designing and shipping the unglamorous middle layer — REST/RPC contracts, auth, schema, queues, retries, observability. The work that decides whether a product survives its second user.",
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
      "Multi-tenant auth & RBAC",
      "Secure student-activity portal",
    ],
    mark: "backend",
  },
  {
    n: "03",
    domain: "Full-stack delivery",
    body: "End-to-end product work — React/Next.js front-ends sitting on top of typed APIs, optimized for performance, accessibility, and the boring details that compound over a release cycle.",
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
    mark: "fullstack",
  },
  {
    n: "04",
    domain: "Applied AI & ML",
    body: "Practical ML — vector retrieval, fine-tuning, local inference, classical models where deep learning is overkill. Bias toward what ships, not what wins benchmarks.",
    stack: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Ollama",
      "HuggingFace",
      "Vector search",
    ],
    signals: [
      "Stanford ML specialization",
      "Local RAG assistant — sub-second retrieval",
      "Computer-vision side projects",
    ],
    mark: "ml",
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
