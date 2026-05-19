"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { useInView } from "react-intersection-observer"
import emailjs from "@emailjs/browser"
import { ArrowUpRight } from "lucide-react"
import { SectionIndex } from "@/components/effects/section-index"
import { RegistrationMark } from "@/components/effects/registration-mark"

emailjs.init({ publicKey: "O7WKNqFq1uxb5D1N0" })

/**
 * Contact — editorial closing statement.
 *
 * Big oversized statement left, stripped-down form right. No glass cards,
 * no gradient buttons, no color-coded contact tiles. The form is honest —
 * three inputs, native styling, single CTA. Keeps the working EmailJS
 * integration intact.
 */
const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.reply_to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.")
      return
    }
    if (formData.from_name.trim().length < 2) {
      setError("Name must be at least 2 characters.")
      return
    }
    if (formData.message.trim().length < 10) {
      setError("Message must be at least 10 characters.")
      return
    }

    setError("")
    setIsSubmitting(true)
    try {
      const result = await emailjs.send(
        "service_h9or1zr",
        "template_knu6jft",
        {
          to_email: "jinishkathiriya@gmail.com",
          from_name: formData.from_name,
          reply_to: formData.reply_to,
          subject: formData.subject || "Portfolio inquiry",
          message: formData.message,
        },
        "O7WKNqFq1uxb5D1N0",
      )
      if (result.status === 200) {
        setSubmitSuccess(true)
        setFormData({ from_name: "", reply_to: "", subject: "", message: "" })
        setTimeout(() => setSubmitSuccess(false), 6000)
      } else {
        throw new Error("send failed")
      }
    } catch {
      setError("Failed to send. Email me directly at jinishkathiriya@gmail.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-[hsl(var(--hairline))] py-3 text-[15px] text-[hsl(var(--ink))] placeholder:text-[hsl(var(--ink-4))] focus:outline-none focus:border-[hsl(var(--ink))] transition-colors"

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
        {/* === Section index — active state on scroll === */}
        <SectionIndex
          index="05"
          title="Contact"
          caption="Let's talk"
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* === Statement === */}
          <div className="lg:col-span-7 space-y-10">
            <h2 className="display-xl text-[hsl(var(--ink))] text-balance">
              Have something
              <br />
              worth building
              <span className="text-[hsl(var(--accent))]">?</span>
            </h2>

            <p className="lead max-w-lg">
              Best for serious work — internship inquiries, contract builds,
              GenAI pilots, or a coffee with another engineer building
              something interesting.
            </p>

            <div className="pt-4">
              <a
                href="mailto:jinishkathiriya@gmail.com"
                className="group inline-flex items-center gap-3"
              >
                <span className="display-md text-[hsl(var(--ink))] link-redraw">
                  jinishkathiriya@gmail.com
                </span>
                <ArrowUpRight className="w-6 h-6 text-[hsl(var(--ink-3))] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--ink))]" />
              </a>
            </div>

            <div className="pt-8 border-t border-[hsl(var(--hairline))]">
              <div className="label mb-4">Elsewhere</div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <a
                  href="https://github.com/Jinish2170"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--ink))] link-redraw"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/jinish-kathiriya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--ink))] link-redraw"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/JinishKathiriya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--ink))] link-redraw"
                >
                  Twitter
                </a>
                <a
                  href="tel:+919099177304"
                  className="text-[hsl(var(--ink))] link-redraw mono"
                >
                  +91 90991 77304
                </a>
              </div>
            </div>
          </div>

          {/* === Form === */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-5 lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-12 space-y-6"
          >
            <div className="label">Or send a note</div>

            {error && (
              <div className="px-3 py-2 border-l-2 border-red-500 text-[13px] text-red-500">
                {error}
              </div>
            )}
            {submitSuccess && (
              <div className="px-3 py-2 border-l-2 border-[hsl(var(--accent))] text-[13px] text-[hsl(var(--ink-2))]">
                Sent. I'll reply within a day or two.
              </div>
            )}

            <div>
              <label htmlFor="from_name" className="label mb-1 block">
                Name
              </label>
              <input
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={onChange}
                required
                placeholder="Your name"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="reply_to" className="label mb-1 block">
                Email
              </label>
              <input
                id="reply_to"
                name="reply_to"
                type="email"
                value={formData.reply_to}
                onChange={onChange}
                required
                placeholder="you@domain.com"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="subject" className="label mb-1 block">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={onChange}
                placeholder="What's this about"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="message" className="label mb-1 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                required
                rows={5}
                placeholder="A sentence or three is fine."
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="cta-primary w-full justify-center disabled:opacity-50"
            >
              <span>{isSubmitting ? "Sending…" : "Send message"}</span>
              {!isSubmitting && <ArrowUpRight className="w-3.5 h-3.5" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
