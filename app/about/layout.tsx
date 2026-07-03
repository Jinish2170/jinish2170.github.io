import type { Metadata } from "next"

const SITE_URL = "https://jinish2170.github.io"

export const metadata: Metadata = {
  title: "About Jinish Kathiriya — Forward Deployed Engineer, Surat",
  description:
    "About Jinish Kathiriya: forward-deployed engineer shipping GenAI and backend systems into production. Technical Head at GDG CKPCET. B.E. Computer Engineering, GTU, Surat, India.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    title: "About Jinish Kathiriya — Forward Deployed Engineer",
    description:
      "Jinish Kathiriya is a forward-deployed engineer. Technical Head at GDG CKPCET, Surat. Experience, education, certifications.",
    url: `${SITE_URL}/about`,
    images: [
      { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "About Jinish Kathiriya — Forward Deployed Engineer" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jinish Kathiriya — Forward Deployed Engineer",
    description:
      "Forward-deployed engineer. Technical Head at GDG CKPCET, Surat.",
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
