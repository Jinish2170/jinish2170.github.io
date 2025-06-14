import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Research from "@/components/research"
import Contact from "@/components/contact"
import ParticleBackground from "@/components/particle-background"
import FloatingTech from "@/components/floating-tech"
import SkipToContent from "@/components/skip-to-content"

export const metadata: Metadata = {
  title: "Jinish Kathiriya | AI & ML Engineer | Cybersecurity Specialist",
  description: "Portfolio of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer",
  keywords: "Jinish, Jinish Kathiriya, AI Engineer, Machine Learning, Cybersecurity Specialist, Full-Stack Developer, GTU CSE Student, Google Developer Group, GDG CKPCET, Technical Head, Portfolio, Surat Gujarat, Computer Engineering",
  openGraph: {
    title: "Jinish Kathiriya - AI & ML Engineer Portfolio",
    description: "Portfolio of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer from Surat, Gujarat.",
    url: "https://jinish2170.github.io",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jinish Kathiriya Portfolio"
      }
    ]
  },
  alternates: {
    canonical: "https://jinish2170.github.io"
  }
}

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      <SkipToContent />
      <ParticleBackground />
      <FloatingTech />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Research />
        <Contact />
      </div>
    </main>
  )
}
