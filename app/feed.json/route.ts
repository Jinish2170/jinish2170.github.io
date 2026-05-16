import { posts } from "@/content/blog"

export const dynamic = "force-static"

const SITE_URL = "https://jinish2170.github.io"

/**
 * JSON Feed 1.1 at /feed.json.
 * https://www.jsonfeed.org/version/1.1/
 *
 * Some AI agents (NetNewsWire, Reeder, modern feed pipelines, some LLM
 * ingest tools) prefer JSON over RSS. Cost to add is trivial.
 */
export async function GET() {
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Jinish Kathiriya — Writing",
    home_page_url: `${SITE_URL}/blog`,
    feed_url: `${SITE_URL}/feed.json`,
    description:
      "Long-form technical writing on backend systems, GenAI engineering, and AI security.",
    language: "en",
    authors: [
      {
        name: "Jinish Kathiriya",
        url: SITE_URL,
        avatar: `${SITE_URL}/og-image.jpg`,
      },
    ],
    items: posts.map((p) => {
      const m = p.meta
      const url = `${SITE_URL}/blog/${m.slug}`
      return {
        id: url,
        url,
        title: m.title,
        summary: m.description,
        content_text: `${m.tldr}\n\n${m.description}`,
        date_published: `${m.date}T12:00:00.000Z`,
        date_modified: `${m.updated ?? m.date}T12:00:00.000Z`,
        authors: [{ name: "Jinish Kathiriya", url: SITE_URL }],
        tags: [m.category, ...m.tags],
      }
    }),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
