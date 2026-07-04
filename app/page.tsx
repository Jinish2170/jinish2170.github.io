import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/components/hero"

const About = dynamic(() => import("@/components/about"), { ssr: true })
const Engagements = dynamic(() => import("@/components/engagements"), { ssr: true })
const ProfessionalSkills = dynamic(
  () => import("@/components/professional-skills"),
  { ssr: true },
)
const Projects = dynamic(() => import("@/components/projects"), { ssr: true })
const Contact = dynamic(() => import("@/components/contact"), { ssr: true })

export const metadata: Metadata = {
  title:
    "Jinish Kathiriya — Forward Deployed Engineer | GenAI & Backend Systems",
  description:
    "Jinish Kathiriya is a forward-deployed engineer who ships GenAI and backend systems into production. Technical Head at GDG CKPCET, Surat. B.E. Computer Engineering, GTU.",
  alternates: { canonical: "https://jinish2170.github.io" },
  openGraph: {
    title: "Jinish Kathiriya — Forward Deployed Engineer | GenAI & Backend Systems",
    description:
      "Jinish Kathiriya embeds with teams to ship GenAI and backend systems into production. Technical Head at GDG CKPCET, Surat, India.",
    url: "https://jinish2170.github.io",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jinish Kathiriya — Forward Deployed Engineer, GenAI & Backend Systems",
      },
    ],
  },
}

const SITE_URL = "https://jinish2170.github.io"

// Homepage-specific WebPage schema, anchored to the root Person + WebSite
// graph defined in layout.tsx. AEO engines use this to resolve "the
// homepage of the person who wrote these blog posts" cleanly.
const homePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "Jinish Kathiriya — Forward Deployed Engineer | GenAI & Backend Systems",
  description: "Portfolio of Jinish Kathiriya, a forward-deployed engineer shipping GenAI and backend systems into production. Based in Surat, India.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
  inLanguage: "en",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".lead", ".display-xl"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ],
  },
}

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="engagements">
        <Engagements />
      </section>
      <section id="skills">
        <ProfessionalSkills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}
