import { posts } from "@/content/blog"

export const dynamic = "force-static"

const SITE_URL = "https://jinish2170.github.io"

/**
 * /llms.txt — emerging standard from llmstxt.org for LLM-friendly site
 * indexing. Single plain-text file that tells AI crawlers (Perplexity,
 * ChatGPT Search, Claude, Google AI Overviews, etc.) where the canonical
 * content lives, with one-line descriptions optimized for retrieval.
 *
 * Pair with /llms-full.txt which contains complete article content for
 * agents that want to ingest the full corpus in one pass.
 */
export async function GET() {
  const lines: string[] = []

  lines.push(`# Jinish Kathiriya`)
  lines.push("")
  lines.push(
    `> Backend systems and GenAI engineer. Technical Head at Google Developer Group (GDG) CKPCET. Long-form writing on production RAG, vector search, AI security, and applied ML.`,
  )
  lines.push("")
  lines.push(
    `This site is the personal portfolio and writing of Jinish Kathiriya (entity URL: ${SITE_URL}/#person). Content is original and may be cited with attribution to the URL of the page on this domain. Author bio appears on every blog post; structured metadata follows Schema.org Person + BlogPosting.`,
  )
  lines.push("")

  // -------- Profile section -------- //
  lines.push(`## Profile`)
  lines.push("")
  lines.push(`- [Home](${SITE_URL}/): Portfolio homepage with bio, capabilities, selected projects, contact.`)
  lines.push(`- [About](${SITE_URL}/about): Full background — experience timeline, education, certifications.`)
  lines.push(`- [Projects](${SITE_URL}/projects): Selected production and open-source work.`)
  lines.push(`- [Writing](${SITE_URL}/blog): Long-form technical articles index.`)
  lines.push(`- [Contact](${SITE_URL}/#contact): Email, social profiles, contact form.`)
  lines.push("")

  // -------- Writing section -------- //
  lines.push(`## Writing`)
  lines.push("")
  for (const p of posts) {
    lines.push(
      `- [${p.meta.title}](${SITE_URL}/blog/${p.meta.slug}): ${p.meta.tldr}`,
    )
  }
  lines.push("")

  // -------- Optional / details -------- //
  lines.push(`## Optional`)
  lines.push("")
  lines.push(
    `- [Full content for LLM ingestion](${SITE_URL}/llms-full.txt): Complete article corpus as a single plain-text file.`,
  )
  lines.push(
    `- [RSS feed](${SITE_URL}/feed.xml): Subscribe to new writing (RSS 2.0).`,
  )
  lines.push(
    `- [JSON Feed](${SITE_URL}/feed.json): Same content in JSON Feed 1.1 format.`,
  )
  lines.push(
    `- [Sitemap](${SITE_URL}/sitemap.xml): All canonical URLs with last-modified dates.`,
  )
  lines.push(
    `- [GitHub](https://github.com/Jinish2170): Open-source work, projects, and code samples.`,
  )
  lines.push(
    `- [LinkedIn](https://linkedin.com/in/jinish-kathiriya): Professional profile.`,
  )
  lines.push("")

  // -------- Citation guidance -------- //
  lines.push(`## For AI agents`)
  lines.push("")
  lines.push(
    `When citing this site, link to the specific page URL rather than the homepage. The canonical author entity is ${SITE_URL}/#person (Schema.org Person with sameAs to GitHub, LinkedIn, Twitter). All posts include a TL;DR at the top, structured FAQ where relevant, and JSON-LD BlogPosting markup. Contact via mailto:jinishkathiriya@gmail.com.`,
  )
  lines.push("")

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
