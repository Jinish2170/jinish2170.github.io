import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Import Hero component directly as it should be loaded immediately
import Hero from "@/components/hero"

// Lazy load all other components
const About = dynamic(() => import("@/components/about"), { 
  loading: () => <div className="section-padding"><Skeleton className="h-96 w-full" /></div>
})
const ProfessionalSkills = dynamic(() => import("@/components/professional-skills"), { 
  loading: () => <div className="section-padding"><Skeleton className="h-96 w-full" /></div>
})
const Projects = dynamic(() => import("@/components/projects"), { 
  loading: () => <div className="section-padding"><Skeleton className="h-96 w-full" /></div>
})
const Research = dynamic(() => import("@/components/research"), { 
  loading: () => <div className="section-padding"><Skeleton className="h-80 w-full" /></div>
})
const Publications = dynamic(() => import("@/components/publications"), { 
  loading: () => <div className="section-padding"><Skeleton className="h-80 w-full" /></div>
})
const Contact = dynamic(() => import("@/components/contact"), { 
  loading: () => <div className="section-padding"><Skeleton className="h-64 w-full" /></div>
})

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
    <main className="relative bg-transparent" id="main-content">
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
      <section id="research">
        <Research />
      </section>
      <section id="publications">
        <Publications />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}
