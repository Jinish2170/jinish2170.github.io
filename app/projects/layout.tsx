import type { Metadata } from "next"

const SITE_URL = "https://jinish2170.github.io"

export const metadata: Metadata = {
  title: "Projects — Jinish Kathiriya",
  description:
    "Selected and open-source projects by Jinish Kathiriya — backend systems, GenAI features, AI/ML experiments, and security tooling.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    type: "website",
    title: "Projects — Jinish Kathiriya",
    description:
      "Selected and open-source projects across backend, GenAI, AI/ML, and security.",
    url: `${SITE_URL}/projects`,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Projects by Jinish Kathiriya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Jinish Kathiriya",
    description: "Selected and open-source work across backend, GenAI, and AI security.",
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
  ],
}

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/projects#collection`,
  url: `${SITE_URL}/projects`,
  name: "Projects",
  description:
    "Selected projects from Jinish Kathiriya's portfolio and open-source work.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: { "@id": `${SITE_URL}/#person` },
}

export default function ProjectsLayout({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {children}
    </>
  )
}
