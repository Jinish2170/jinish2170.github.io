import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Prose } from "@/components/blog/prose"
import { ReadingProgress } from "@/components/effects/reading-progress"
import { RegistrationMark } from "@/components/effects/registration-mark"
import { getAllSlugs, getPostBySlug, getRelated } from "@/content/blog"

const SITE_URL = "https://jinish2170.github.io"
const AUTHOR_NAME = "Jinish Kathiriya"
const AUTHOR_HANDLE = "Jinish2170"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Not found" }
  const { meta } = post
  const canonical = `${SITE_URL}/blog/${meta.slug}`
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.tags,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: "Jinish Kathiriya",
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      authors: [SITE_URL],
      tags: meta.tags,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: `@${AUTHOR_HANDLE}`,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const { meta, default: PostContent } = post
  const related = getRelated(meta.slug, 3)
  const canonical = `${SITE_URL}/blog/${meta.slug}`

  // BlogPosting JSON-LD — the load-bearing schema for AI Overviews,
  // Perplexity citation, and traditional search rich results.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: meta.title,
    name: meta.title,
    description: meta.description,
    image: [`${SITE_URL}/og-image.png`],
    datePublished: meta.date,
    dateModified: meta.updated ?? meta.date,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    inLanguage: "en",
    keywords: meta.tags.join(", "),
    articleSection: meta.category,
    wordCount: meta.readingTime * 220, // approximate; speaks for the post's depth
    timeRequired: `PT${meta.readingTime}M`,
    abstract: meta.tldr,
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: canonical,
      },
    ],
  }

  // FAQPage schema — pulled directly from meta.faq when present. This is
  // where AI Overviews and rich-result snippets come from.
  const faqJsonLd = meta.faq && meta.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: meta.faq.map((q) => ({
          "@type": "Question",
          name: q.q,
          acceptedAnswer: { "@type": "Answer", text: q.a },
        })),
      }
    : null

  return (
    <main className="pt-32 pb-24">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="editorial-container">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 label hover:text-[hsl(var(--ink))] transition-colors mb-12"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>All writing</span>
        </Link>

        {/* ============ Article header ============ */}
        <header className="mb-12 md:mb-16 max-w-[68ch]">
          <div className="flex items-center gap-4 mb-6">
            <span className="label mono">{meta.category}</span>
            <span className="hairline-y flex-1 max-w-[40px]" />
            <span className="label mono tnum">
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="label mono">·</span>
            <span className="label mono tnum">{meta.readingTime} min read</span>
          </div>

          <h1
            className="text-[hsl(var(--ink))] text-balance"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              fontWeight: 500,
            }}
          >
            {meta.title}
          </h1>

          <p className="lead mt-8 max-w-[60ch]">{meta.description}</p>

          {/* TL;DR — the highest-value block for AEO. LLMs ingest this
              as the canonical summary of the article. */}
          <aside
            className="mt-10 p-6 border-l-2 border-[hsl(var(--accent))] bg-[hsl(var(--secondary))]/30 rounded-r"
            aria-label="TL;DR"
          >
            <div className="label mb-2">TL;DR</div>
            <p className="text-[15px] text-[hsl(var(--ink))] leading-relaxed">
              {meta.tldr}
            </p>
          </aside>

          {/* Tag rail */}
          <div className="mt-8 flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* ============ Body ============ */}
        <article className="mb-20">
          <Prose>
            <PostContent />
          </Prose>
        </article>

        {/* ============ FAQ (rendered + schema) ============ */}
        {meta.faq && meta.faq.length > 0 && (
          <section className="mb-20 max-w-[68ch] border-t border-[hsl(var(--hairline))] pt-12">
            <div className="label mb-4">Questions and answers</div>
            <h2
              className="display-md text-[hsl(var(--ink))] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Common questions
            </h2>
            <div className="space-y-8">
              {meta.faq.map((q, i) => (
                <div
                  key={i}
                  className="pb-6 border-b border-[hsl(var(--hairline))]"
                >
                  <h3
                    className="text-[18px] font-medium text-[hsl(var(--ink))] mb-3 leading-snug"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {q.q}
                  </h3>
                  <p className="text-[16px] text-[hsl(var(--ink-2))] leading-relaxed">
                    {q.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============ Author block ============ */}
        <section className="mb-20 max-w-[68ch] border-t border-[hsl(var(--hairline))] pt-12">
          <div className="label mb-4">Author</div>
          <div className="grid grid-cols-[80px_1fr] gap-6">
            <div className="w-20 h-20 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--secondary))] flex items-center justify-center text-[hsl(var(--ink-2))] mono text-xl">
              JK
            </div>
            <div>
              <h3 className="text-[hsl(var(--ink))] font-medium mb-1">
                <Link href="/about" className="link-redraw">
                  Jinish Kathiriya
                </Link>
              </h3>
              <p className="text-[14px] text-[hsl(var(--ink-2))] mb-3 leading-relaxed max-w-md">
                Backend systems &amp; GenAI engineer. Technical Head at
                Google Developer Group, CKPCET. Based in Surat, India.
                Writing about what actually breaks in production AI.
              </p>
              <div className="flex flex-wrap gap-4 text-[13px]">
                <a
                  href="https://github.com/Jinish2170"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="link-redraw text-[hsl(var(--ink))]"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/jinish-kathiriya"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="link-redraw text-[hsl(var(--ink))]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/JinishKathiriya"
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="link-redraw text-[hsl(var(--ink))]"
                >
                  Twitter
                </a>
                <a
                  href="mailto:jinishkathiriya@gmail.com"
                  className="link-redraw text-[hsl(var(--ink))]"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Related ============ */}
        {related.length > 0 && (
          <section className="mb-12 border-t border-[hsl(var(--hairline))] pt-12">
            <div className="label mb-8">Related writing</div>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.meta.slug}
                  href={`/blog/${r.meta.slug}`}
                  className="group block border-t border-[hsl(var(--ink))] pt-4"
                >
                  <div className="label mb-2">{r.meta.category}</div>
                  <h3 className="text-[18px] font-medium text-[hsl(var(--ink))] mb-3 leading-snug group-hover:underline underline-offset-4 decoration-[hsl(var(--ink-4))]">
                    {r.meta.title}
                  </h3>
                  <div className="flex items-center gap-2 label mono">
                    <span>{r.meta.readingTime} min</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
