import type React from "react"
import "./globals.css"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import ClientLayout from "@/components/client-layout"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer-premium"
import ScrollToTop from "@/components/scroll-to-top"
import KeyboardNavigation from "@/components/keyboard-navigation"
import SkipToContent from "@/components/skip-to-content"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Strong root JSON-LD — one connected entity graph for Person, WebSite,
  // and Organization. Using @id refs lets engines resolve relationships
  // (author of articles, member of organization) without duplication.
  // This is the most load-bearing piece of AEO/LLMO on the site.
  const SITE_URL = "https://jinish2170.github.io"
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Jinish Kathiriya",
        givenName: "Jinish",
        familyName: "Kathiriya",
        alternateName: ["Jinish Kathiriya", "Jinish2170"],
        jobTitle: [
          "Backend Systems Engineer",
          "GenAI Developer",
          "Full-Stack Developer",
          "AI & ML Engineer",
        ],
        description:
          "Backend systems and GenAI engineer. Technical Head at Google Developer Group (GDG) CKPCET. B.E. Computer Engineering, GTU.",
        url: SITE_URL,
        image: `${SITE_URL}/og-image.jpg`,
        email: "jinishkathiriya@gmail.com",
        telephone: "+91-90991-77304",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          postalCode: "395007",
          addressCountry: "IN",
        },
        sameAs: [
          "https://github.com/Jinish2170",
          "https://linkedin.com/in/jinish-kathiriya",
          "https://twitter.com/JinishKathiriya",
        ],
        worksFor: { "@id": `${SITE_URL}/#org-gdg-ckpcet` },
        alumniOf: { "@id": `${SITE_URL}/#org-ckpcet` },
        knowsAbout: [
          "Generative AI",
          "Retrieval Augmented Generation",
          "RAG",
          "Vector Search",
          "Backend Systems",
          "API Design",
          "Authentication and Authorization",
          "JWT",
          "OAuth",
          "PostgreSQL",
          "pgvector",
          "LLM Engineering",
          "Prompt Engineering",
          "Eval Harnesses",
          "Machine Learning",
          "Applied AI",
          "AI Security",
          "Prompt Injection Defense",
          "Streaming APIs",
          "Server-Sent Events",
          "Observability",
          "Cybersecurity",
          "Full-Stack Development",
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Python",
        ],
        knowsLanguage: ["English", "Hindi", "Gujarati"],
        contactPoint: {
          "@type": "ContactPoint",
          email: "jinishkathiriya@gmail.com",
          contactType: "professional",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
        nationality: { "@type": "Country", name: "India" },
        gender: "male",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org-gdg-ckpcet`,
        name: "Google Developer Group (GDG) CKPCET",
        description:
          "Student-led developer community chapter at CKPCET, affiliated with Google Developer Groups.",
        member: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "CollegeOrUniversity",
        "@id": `${SITE_URL}/#org-ckpcet`,
        name: "C. K. Pithawala College of Engineering and Technology",
        alternateName: ["CKPCET"],
        url: "https://ckpcet.ac.in",
        parentOrganization: {
          "@type": "EducationalOrganization",
          name: "Gujarat Technological University",
          alternateName: ["GTU"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Surat",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Jinish Kathiriya",
        description:
          "Portfolio and writing of Jinish Kathiriya — backend systems and GenAI engineer.",
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
        // Site-search action — opens a path to retrieval-engine integrations
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        dateModified: new Date().toISOString().slice(0, 10),
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Jinish Kathiriya" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* Critical inline CSS — theme-aware first paint.
            Default to light (warm paper); switch to dark only when:
              (a) <html> has class="dark" (set by next-themes inline script
                  before paint, no FOUC), OR
              (b) user has prefers-color-scheme: dark AND next-themes
                  hasn't explicitly forced light.
            Without this scoping, body bg was being forced dark even when
            light mode was active, producing dark-on-dark unreadable text. */}
        <style dangerouslySetInnerHTML={{ __html: `
          html { background-color: hsl(36 18% 97%); color-scheme: light; }
          body { background-color: hsl(36 18% 97%); color: hsl(30 10% 9%); }
          html.dark { background-color: hsl(0 0% 4%); color-scheme: dark; }
          html.dark body { background-color: hsl(0 0% 4%); color: hsl(0 0% 96%); }
          @media (prefers-color-scheme: dark) {
            html:not(.light) { background-color: hsl(0 0% 4%); color-scheme: dark; }
            html:not(.light) body { background-color: hsl(0 0% 4%); color: hsl(0 0% 96%); }
          }
        `}} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/placeholder.jpg" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//twitter.com" />

        {/* IndieWeb / rel=me — verifiable author identity across networks.
            Search engines and AEO crawlers use these to reconcile that the
            same person owns this site and the linked profiles. */}
        <link rel="me" href="https://github.com/Jinish2170" />
        <link rel="me" href="https://linkedin.com/in/jinish-kathiriya" />
        <link rel="me" href="https://twitter.com/JinishKathiriya" />
        <link rel="me" href="mailto:jinishkathiriya@gmail.com" />

        {/* Author / human metadata — older but still respected by some crawlers */}
        <link rel="author" href="/humans.txt" />

        {/* Webmention / IndieAuth endpoints (placeholder — wire up later if desired) */}
        {/* <link rel="webmention" href="https://webmention.io/jinish2170.github.io/webmention" /> */}

        {/* Feed alternates — point AI agents and feed readers at structured content */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Jinish Kathiriya — Writing (RSS)"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/feed+json"
          title="Jinish Kathiriya — Writing (JSON Feed)"
          href="/feed.json"
        />

        {/* LLM-readable site index — emerging standard from llmstxt.org.
            Tells AI crawlers where the canonical machine-readable content is. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        {/* Editorial backdrop — single fine grid + grain. No animation. */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 grid-fine" />
          <div className="grain" />
        </div>

        <ClientLayout>
          <SkipToContent />
          <KeyboardNavigation />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </ClientLayout>
      </body>
    </html>
  )
}

export const metadata = {
  title: {
    default: "Jinish Kathiriya — Backend Systems & GenAI Engineer",
    template: "%s · Jinish Kathiriya",
  },
  description:
    "Backend systems and GenAI engineer. Technical Head at GDG CKPCET. Long-form writing on production RAG, vector search, AI security, and applied ML — written for senior engineers.",
  keywords: [
    "Jinish Kathiriya",
    "Backend Engineer",
    "GenAI Engineer",
    "Production RAG",
    "LLM Engineering",
    "Vector Search",
    "pgvector",
    "AI Security",
    "Prompt Injection Defense",
    "Eval Harnesses",
    "Full-Stack Developer",
    "Next.js Engineer",
    "Google Developer Group",
    "GDG CKPCET",
    "Computer Engineering",
    "CKPCET",
    "GTU",
    "Surat India",
    "AI Engineer India",
    "RAG Engineer",
    "Hire backend engineer",
  ],
  authors: [{ name: "Jinish Kathiriya", url: "https://jinish2170.github.io" }],
  creator: "Jinish Kathiriya",
  publisher: "Jinish Kathiriya",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://jinish2170.github.io"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/feed+json": "/feed.json",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jinish2170.github.io",
    title: "Jinish Kathiriya — Backend Systems & GenAI Engineer",
    description:
      "Backend systems and GenAI engineer. Writing on production RAG, vector search, AI security, applied ML.",
    siteName: "Jinish Kathiriya",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jinish Kathiriya — Backend & GenAI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinish Kathiriya — Backend Systems & GenAI Engineer",
    description:
      "Backend & GenAI engineer. Writing on production RAG, vector search, and AI security.",
    site: "@JinishKathiriya",
    creator: "@JinishKathiriya",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Verification placeholders — replace with your real codes when you
  // claim Google Search Console + Bing Webmaster Tools.
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION_CODE",
    },
  },
  generator: "Next.js",
  applicationName: "Jinish Kathiriya",
  referrer: "origin-when-cross-origin",
  category: "technology",
  other: {
    // IndieAuth verification — rel=me on social profiles links back here
    "fediverse:creator": "@JinishKathiriya@twitter.com",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light" as const,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}
