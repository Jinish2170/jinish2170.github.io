import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you're looking for doesn't exist. Browse Jinish Kathiriya's portfolio, projects, and technical writing instead.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center pt-24 pb-16">
      <div className="editorial-container text-center max-w-lg">
        <div className="label mono mb-6">404</div>
        <h1 className="display-lg text-[hsl(var(--ink))] mb-4">
          Page not found<span className="text-[hsl(var(--accent))]">.</span>
        </h1>
        <p className="lead mb-10">
          This URL doesn&rsquo;t point anywhere. Try one of these instead.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="cta-primary">
            Home
          </Link>
          <Link href="/blog" className="cta-secondary">
            Field notes
          </Link>
          <Link href="/projects" className="cta-secondary">
            Projects
          </Link>
        </nav>
      </div>
    </main>
  )
}
