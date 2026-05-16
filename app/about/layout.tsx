import type { Metadata } from "next"

const SITE_URL = "https://jinish2170.github.io"

export const metadata: Metadata = {
  title: "About — Jinish Kathiriya",
  description:
    "Backend systems and GenAI engineer. Technical Head at GDG CKPCET. B.E. Computer Engineering, GTU. Experience, education, certifications.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    title: "About — Jinish Kathiriya",
    description:
      "Backend & GenAI engineer. Technical Head at GDG CKPCET. Experience, education, certifications.",
    url: `${SITE_URL}/about`,
    images: [
      { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "About Jinish Kathiriya" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Jinish Kathiriya",
    description:
      "Backend & GenAI engineer. Technical Head at GDG CKPCET.",
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
}

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: "About — Jinish Kathiriya",
  description:
    "Background, experience, education, and certifications of Jinish Kathiriya.",
  mainEntity: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      {children}
    </>
  )
}
