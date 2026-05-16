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

export default function Home() {
  return (
    <main id="main-content" className="relative">
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
