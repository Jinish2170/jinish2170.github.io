import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const BASE_URL = "https://jinish2170.github.io"

/**
 * Robots.txt with explicit allows for AI crawlers used by answer engines
 * and LLM training. We *want* to be cited by Perplexity, ChatGPT Search,
 * Google AI Overviews, etc. — so each gets a named allow rule rather than
 * being left to interpret the wildcard.
 *
 * If you ever change your mind on a particular crawler, switch its rule to
 * disallow: "/" to opt out of that specific bot.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "Google-Extended",
    "PerplexityBot",
    "Perplexity-User",
    "Bingbot",
    "Applebot",
    "Applebot-Extended",
    "FacebookBot",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "CCBot",
    "MistralAI-User",
    "YouBot",
    "DuckAssistBot",
    "cohere-ai",
    "Diffbot",
    "Kagibot",
    "Bytespider",
  ]

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
      ...aiCrawlers.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
      {
        userAgent: "AdsBot-Google",
        disallow: "/",
      },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`],
    host: BASE_URL,
  }
}
