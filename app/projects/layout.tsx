import type { Metadata } from "next"

const SITE_URL = "https://jinish2170.github.io"

export const metadata: Metadata = {
  title: "Projects by Jinish Kathiriya — GenAI, Backend & Security",
  description:
    "Selected projects by Jinish Kathiriya — production GenAI features, backend systems, AI/ML experiments, and security tooling. Open-source and client work.",
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    type: "website",
    title: "Projects by Jinish Kathiriya — GenAI, Backend & Security",
    description:
      "Production projects by Jinish Kathiriya across GenAI, backend systems, and AI security.",
    url: `${SITE_URL}/projects`,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Projects by Jinish Kathiriya — GenAI & Backend Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Jinish Kathiriya",
    description: "Production GenAI, backend, and security projects by Jinish Kathiriya.",
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
