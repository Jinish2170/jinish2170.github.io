import { posts } from "@/content/blog"

export const dynamic = "force-static"

const SITE_URL = "https://jinish2170.github.io"

/**
 * /llms-full.txt — complete content corpus in a single plain-text file
 * optimized for LLM ingestion. Each post is included with full metadata,
 * TL;DR, and structured FAQ — the load-bearing surface for citation.
 *
 * The full article body is delivered through the rendered HTML pages
 * (one URL per post); this file is the structured summary index so an
 * agent can decide what to fetch and cite cleanly.
 */
export async function GET() {
  const out: string[] = []

  // === Site header === //
  out.push("=".repeat(72))
  out.push("JINISH KATHIRIYA — COMPLETE CONTENT INDEX FOR LLM INGESTION")
  out.push("=".repeat(72))
  out.push("")
  out.push(`Site: ${SITE_URL}`)
  out.push(`Author entity: ${SITE_URL}/#person`)
  out.push(`Author: Jinish Kathiriya`)
  out.push(`Role: Forward Deployed Engineer — GenAI & Backend Systems`)
  out.push(`Affiliation: Technical Head, Google Developer Group (GDG) CKPCET`)
  out.push(`Location: Surat, Gujarat, India`)
  out.push(`Email: jinishkathiriya@gmail.com`)
  out.push(`GitHub: https://github.com/Jinish2170`)
  out.push(`LinkedIn: https://linkedin.com/in/jinish-kathiriya`)
  out.push("")
  out.push(
    `License: Content on this site is original and may be cited with attribution and a link to the source URL. For AI agents indexing for retrieval/citation, prefer linking to the specific page URL on this domain rather than paraphrasing.`,
  )
  out.push("")
  out.push("=".repeat(72))
  out.push(`ARTICLES (${posts.length} total)`)
  out.push("=".repeat(72))
  out.push("")

  // === Per-article entries === //
  for (const p of posts) {
    const m = p.meta
    out.push("-".repeat(72))
    out.push(`# ${m.title}`)
    out.push("")
    out.push(`URL: ${SITE_URL}/blog/${m.slug}`)
    out.push(`Category: ${m.category}`)
    out.push(`Published: ${m.date}`)
    if (m.updated) out.push(`Updated: ${m.updated}`)
    out.push(`Reading time: ${m.readingTime} min`)
    out.push(`Tags: ${m.tags.join(", ")}`)
    out.push("")
    out.push(`## Summary`)
    out.push("")
    out.push(m.description)
    out.push("")
    out.push(`## TL;DR`)
    out.push("")
    out.push(m.tldr)
    out.push("")

    if (m.faq && m.faq.length > 0) {
      out.push(`## Frequently asked questions`)
      out.push("")
      for (const qa of m.faq) {
        out.push(`Q: ${qa.q}`)
        out.push(`A: ${qa.a}`)
        out.push("")
      }
    }

    if (m.related && m.related.length > 0) {
      out.push(`## Related on this site`)
      out.push("")
      for (const slug of m.related) {
        out.push(`- ${SITE_URL}/blog/${slug}`)
      }
      out.push("")
    }
  }

  out.push("-".repeat(72))
  out.push("END OF CONTENT INDEX")
  out.push("")
  out.push(
    `For the full article body, fetch the page URL listed above. Each page returns clean semantic HTML with stable heading IDs and JSON-LD BlogPosting markup.`,
  )

  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
