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
        alternateName: ["Jinish Kathiriya", "Jinish2170", "jinish kathiriya"],
        jobTitle: [
          "Forward Deployed Engineer",
          "Backend Systems Engineer",
          "GenAI Engineer",
          "Full-Stack Developer",
        ],
        description:
          "Jinish Kathiriya is a forward-deployed engineer who embeds with teams to ship GenAI and backend systems into production. Technical Head at Google Developer Group (GDG) CKPCET. B.E. Computer Engineering, Gujarat Technological University (GTU), Surat, India.",
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
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
        hasOccupation: {
          "@type": "Occupation",
          name: "Forward Deployed Engineer",
          description: "Embeds with client teams to ship GenAI features and backend systems into production under real constraints.",
          skills: "Generative AI, RAG, Backend Systems, API Design, LLM Engineering, Full-Stack Development, AI Security",
          occupationLocation: {
            "@type": "City",
            name: "Surat",
          },
        },
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
          "Forward Deployed Engineering",
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
        alternateName: "jinish kathiriya portfolio",
        description:
          "Portfolio and writing of Jinish Kathiriya — forward-deployed engineer shipping GenAI and backend systems into production.",
        publisher: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
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
        name: "Jinish Kathiriya — Forward Deployed Engineer",
        mainEntity: { "@id": `${SITE_URL}/#person` },
        dateCreated: "2024-01-01",
        dateModified: new Date().toISOString().slice(0, 10),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".display-xl", ".lead", "h1", "h2"],
        },
      },
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Jinish Kathiriya" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="bingbot" content="index, follow" />

        {/* GEO tags — help regional search engines associate this site with Surat/Gujarat/India */}
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Surat, Gujarat, India" />
        <meta name="geo.position" content="21.1702;72.8311" />
        <meta name="ICBM" content="21.1702, 72.8311" />

        {/* Dublin Core — additional structured metadata for academic and AI crawlers */}
        <meta name="DC.title" content="Jinish Kathiriya — Forward Deployed Engineer" />
        <meta name="DC.creator" content="Jinish Kathiriya" />
        <meta name="DC.subject" content="GenAI, Backend Systems, Forward Deployed Engineering, AI Security" />
        <meta name="DC.description" content="Portfolio of Jinish Kathiriya — forward-deployed engineer shipping GenAI and backend systems into production." />
        <meta name="DC.language" content="en" />
        
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
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/og-image.png" />
        
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
    default: "Jinish Kathiriya — Forward Deployed Engineer | GenAI & Backend Systems",
    template: "%s | Jinish Kathiriya",
  },
  description:
    "Jinish Kathiriya is a forward-deployed engineer who ships GenAI and backend systems into production. Technical Head at GDG CKPCET, Surat. Writing on production RAG, vector search, AI security, and applied ML.",
  keywords: [
    "Jinish Kathiriya",
    "jinish kathiriya",
    "Jinish Kathiriya portfolio",
    "Jinish Kathiriya engineer",
    "Jinish Kathiriya Surat",
    "Jinish Kathiriya GDG",
    "Jinish Kathiriya CKPCET",
    "Jinish Kathiriya GTU",
    "Forward Deployed Engineer",
    "GenAI Engineer",
    "Backend Engineer",
    "GenAI Engineer India",
    "Production RAG",
    "LLM Engineering",
    "Vector Search",
    "AI Security",
    "Full-Stack Developer",
    "Google Developer Group CKPCET",
    "Computer Engineering Surat",
    "AI Engineer India",
    "RAG Engineer",
    "Jinish2170",
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
    title: "Jinish Kathiriya — Forward Deployed Engineer | GenAI & Backend Systems",
    description:
      "Jinish Kathiriya is a forward-deployed engineer shipping GenAI and backend systems into production. Technical Head at GDG CKPCET, Surat, India.",
    siteName: "Jinish Kathiriya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jinish Kathiriya — Forward Deployed Engineer, GenAI & Backend Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinish Kathiriya — Forward Deployed Engineer",
    description:
      "Forward-deployed engineer shipping GenAI & backend systems into production. Technical Head at GDG CKPCET, Surat.",
    site: "@JinishKathiriya",
    creator: "@JinishKathiriya",
    images: ["/og-image.png"],
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
  generator: "Next.js",
  applicationName: "Jinish Kathiriya",
  referrer: "origin-when-cross-origin",
  category: "technology",
  other: {
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
