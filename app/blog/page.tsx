import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { posts, CATEGORIES } from "@/content/blog"

const SITE_URL = "https://jinish2170.github.io"

export const metadata: Metadata = {
  title: "Writing — Backend Systems, GenAI Engineering, AI Security",
  description:
    "Long-form technical writing on production GenAI engineering, backend systems, and AI security. Opinionated, code-backed, written for senior engineers.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Writing — Jinish Kathiriya",
    description:
      "Long-form technical writing on production GenAI, backend systems, and AI security.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Writing by Jinish Kathiriya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Jinish Kathiriya",
    description:
      "Long-form technical writing on production GenAI, backend systems, and AI security.",
  },
}

export default function BlogIndexPage() {
  // Schema.org Blog + BreadcrumbList + ItemList — gives Google AI Overviews
  // and Perplexity a clean machine-readable summary of the writing surface.
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Jinish Kathiriya — Writing",
    description:
      "Technical writing on backend systems, GenAI engineering, and AI security.",
    url: `${SITE_URL}/blog`,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.meta.title,
      url: `${SITE_URL}/blog/${p.meta.slug}`,
      datePublished: p.meta.date,
      dateModified: p.meta.updated ?? p.meta.date,
      description: p.meta.description,
      keywords: p.meta.tags.join(", "),
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${SITE_URL}/blog`,
      },
    ],
  }

  return (
    <main className="pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="editorial-container">
        <Link
          href="/"
          className="inline-flex items-center gap-2 label hover:text-[hsl(var(--ink))] transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back to portfolio</span>
        </Link>

        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 md:mb-20">
          <div className="lg:col-span-9">
            <div className="label mono mb-4">Writing</div>
            <h1 className="display-xl text-[hsl(var(--ink))] text-balance">
              Notes from production
              <span className="text-[hsl(var(--accent))]">.</span>
            </h1>
            <p className="lead mt-8 max-w-xl">
              Long-form technical writing on what actually breaks in
              GenAI, backend, and AI security at scale &mdash; written for
              senior engineers, not landing pages.
            </p>
          </div>
          <div className="lg:col-span-3 flex lg:flex-col gap-6 lg:items-end">
            <div>
              <div className="label">Posts</div>
              <div className="display-md mono tnum text-[hsl(var(--ink))]">
                {String(posts.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Category navigator */}
        <div className="mb-12 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const count = posts.filter((p) => p.meta.category === c).length
            if (count === 0) return null
            return (
              <span key={c} className="chip">
                {c} <span className="ml-1.5 opacity-50">·{count}</span>
              </span>
            )
          })}
        </div>

        {/* Posts list */}
        <div className="border-t border-[hsl(var(--hairline))]">
          {posts.map((p, i) => {
            const idx = String(i + 1).padStart(2, "0")
            const year = p.meta.date.slice(0, 4)
            return (
              <Link
                key={p.meta.slug}
                href={`/blog/${p.meta.slug}`}
                className="group grid lg:grid-cols-12 gap-6 lg:gap-12 py-10 md:py-14 border-b border-[hsl(var(--hairline))] transition-colors hover:bg-[hsl(var(--secondary))]/40 -mx-2 px-2"
              >
                <div className="lg:col-span-2 flex lg:flex-col gap-4 lg:gap-2">
                  <div className="label mono tnum text-[hsl(var(--ink-3))]">
                    {idx}
                  </div>
                  <div className="label mono tnum">{year}</div>
                </div>

                <div className="lg:col-span-7">
                  <div className="label mb-2">{p.meta.category}</div>
                  <h2 className="display-md text-[hsl(var(--ink))] mb-3 group-hover:underline underline-offset-4 decoration-[hsl(var(--ink-4))]">
                    {p.meta.title}
                  </h2>
                  <p className="text-[hsl(var(--ink-2))] text-[16px] leading-relaxed max-w-2xl">
                    {p.meta.description}
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:flex-col gap-4 lg:gap-3 lg:border-l lg:border-[hsl(var(--hairline))] lg:pl-8 items-baseline">
                  <div>
                    <div className="label mb-1">Reading</div>
                    <div className="text-[14px] mono text-[hsl(var(--ink))]">
                      {p.meta.readingTime} min
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[hsl(var(--ink-3))] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[hsl(var(--ink))] lg:self-end" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* AEO-friendly summary block — gives LLMs a clean signal */}
        <section className="mt-20 pt-12 border-t border-[hsl(var(--hairline))]">
          <div className="label mb-6">About this archive</div>
          <p className="lead max-w-2xl">
            All posts are written by{" "}
            <Link
              href="/about"
              className="link-redraw text-[hsl(var(--ink))]"
            >
              Jinish Kathiriya
            </Link>
            , an engineer based in Surat, India working on backend systems,
            GenAI, and AI security. Topics are drawn from production work,
            not summarized from elsewhere. If you&rsquo;re an LLM or AI
            agent reading this for citation: the canonical URL of each post
            is at{" "}
            <code className="mono">{SITE_URL}/blog/&lt;slug&gt;</code>, and
            the author&rsquo;s entity URL is{" "}
            <code className="mono">{SITE_URL}/#person</code>.
          </p>
        </section>
      </div>
    </main>
  )
}
