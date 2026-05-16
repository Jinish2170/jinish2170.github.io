import type { MetadataRoute } from "next"
import { posts } from "@/content/blog"

export const dynamic = "force-static"

const BASE_URL = "https://jinish2170.github.io"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // Per-post entries — lastModified reflects the actual update date so
  // search engines can prioritize crawl of recently-edited content.
  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.meta.slug}`,
    lastModified: new Date(p.meta.updated ?? p.meta.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
