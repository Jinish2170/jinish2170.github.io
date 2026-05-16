import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Hero from "@/components/hero"

const About = dynamic(() => import("@/components/about"))
const ProfessionalSkills = dynamic(
  () => import("@/components/professional-skills"),
)
const Projects = dynamic(() => import("@/components/projects"))
const Contact = dynamic(() => import("@/components/contact"))

export const metadata: Metadata = {
  title:
    "Jinish Kathiriya — Backend Systems & GenAI Engineer",
  description:
    "Portfolio of Jinish Kathiriya — backend systems and GenAI engineer. Technical Head at GDG CKPCET. B.E. Computer Engineering, GTU.",
  alternates: { canonical: "https://jinish2170.github.io" },
  openGraph: {
    title: "Jinish Kathiriya — Backend Systems & GenAI Engineer",
    description:
      "Backend systems and GenAI engineer. Technical Head at GDG CKPCET. Based in Surat, IN.",
    url: "https://jinish2170.github.io",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jinish Kathiriya Portfolio",
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
  name: "Jinish Kathiriya — Backend Systems & GenAI Engineer",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
  inLanguage: "en",
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
