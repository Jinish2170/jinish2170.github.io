import type { ComponentType } from "react"

export type BlogCategory =
  | "GenAI Engineering"
  | "Backend Systems"
  | "AI Security"
  | "ML Systems"

export interface BlogMeta {
  slug: string
  title: string
  description: string
  date: string // ISO YYYY-MM-DD — original publish
  updated?: string // ISO YYYY-MM-DD — last meaningful edit
  tags: string[]
  category: BlogCategory
  readingTime: number // minutes — author-estimated
  /** Author-curated TL;DR for AEO surfaces. Keep under 280 chars. */
  tldr: string
  /** Optional FAQ for FAQ schema injection. */
  faq?: { q: string; a: string }[]
  /** Internal links to other slugs for related-posts wiring. */
  related?: string[]
}

export interface BlogPost {
  meta: BlogMeta
  default: ComponentType
}
