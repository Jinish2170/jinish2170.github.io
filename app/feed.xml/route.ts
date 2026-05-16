import { posts } from "@/content/blog"

export const dynamic = "force-static"

const SITE_URL = "https://jinish2170.github.io"
const AUTHOR_EMAIL = "jinishkathiriya@gmail.com"
const AUTHOR_NAME = "Jinish Kathiriya"

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function rfc822(dateStr: string): string {
  return new Date(dateStr + "T12:00:00Z").toUTCString()
}

/**
 * RSS 2.0 feed at /feed.xml.
 *
 * Includes Atom self-link, dc:creator, content:encoded with TL;DR + FAQ
 * inline so feed readers that don't fetch full posts still get useful
 * content. Also indexed by AI agents that crawl feeds (Perplexity, Kagi,
 * various RSS-driven LLM ingestion pipelines).
 */
export async function GET() {
  const lastBuild = new Date().toUTCString()

  const items = posts
    .map((p) => {
      const m = p.meta
      const url = `${SITE_URL}/blog/${m.slug}`
      const pubDate = rfc822(m.date)

      let content = `<p><strong>TL;DR:</strong> ${escapeXml(m.tldr)}</p>`
      content += `<p>${escapeXml(m.description)}</p>`
      if (m.faq && m.faq.length > 0) {
        content += "<h2>FAQ</h2>"
        for (const q of m.faq) {
          content += `<h3>${escapeXml(q.q)}</h3><p>${escapeXml(q.a)}</p>`
        }
      }
      content += `<p><a href="${url}">Read the full post on jinish2170.github.io</a></p>`

      return `
    <item>
      <title>${escapeXml(m.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>
      <category>${escapeXml(m.category)}</category>
      ${m.tags
        .map((t) => `<category>${escapeXml(t)}</category>`)
        .join("\n      ")}
      <description>${escapeXml(m.description)}</description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(AUTHOR_NAME)} — Writing</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Long-form technical writing on backend systems, GenAI engineering, and AI security by ${escapeXml(AUTHOR_NAME)}.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(AUTHOR_NAME)}</copyright>
    <managingEditor>${AUTHOR_EMAIL} (${escapeXml(AUTHOR_NAME)})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${escapeXml(AUTHOR_NAME)})</webMaster>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <generator>Next.js (custom)</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
