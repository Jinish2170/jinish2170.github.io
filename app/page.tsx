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
