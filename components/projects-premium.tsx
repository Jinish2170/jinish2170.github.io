"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { getPinnedRepositories } from "@/lib/github-service"
import { ProcessedProject } from "@/lib/github-types"
import { Badge } from "@/components/ui/badge"

// Dynamically import icons
const ExternalLink = dynamic(() => import("lucide-react").then(mod => mod.ExternalLink))
const Github = dynamic(() => import("lucide-react").then(mod => mod.Github))
const Star = dynamic(() => import("lucide-react").then(mod => mod.Star))
const GitFork = dynamic(() => import("lucide-react").then(mod => mod.GitFork))
const Pin = dynamic(() => import("lucide-react").then(mod => mod.Pin))
const Code = dynamic(() => import("lucide-react").then(mod => mod.Code))
const Zap = dynamic(() => import("lucide-react").then(mod => mod.Zap))

const ProjectsPremium = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [projects, setProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const fetchedProjects = await getPinnedRepositories()
        setProjects(fetchedProjects)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch projects:', err)
        setError('Failed to load projects from GitHub')
        // Use fallback projects
        setProjects([
          {
            id: 'fallback-1',
            title: "BenardAI",
            description: "Advanced cybersecurity AI solution with threat detection and prevention capabilities.",
            techStack: ["Python", "TensorFlow", "FastAPI", "Docker"],
            githubLink: "https://github.com/Jinish2170/BenardAI",
            category: "AI & Cybersecurity",
            stars: 0,
            forks: 0,
            language: "Python",
            topics: ["ai", "cybersecurity"],
            lastUpdated: "2024-01-15",
            featured: true,
            isPinned: false
          },
          {
            id: 'fallback-2',
            title: "BigTechTimes",
            description: "Community-driven technology news platform featuring discussions and insights.",
            techStack: ["JavaScript", "React", "Node.js", "MongoDB"],
            githubLink: "https://github.com/Jinish2170/BigTechTimes",
            category: "Web Development",
            stars: 0,
            forks: 0,
            language: "JavaScript",
            topics: ["web", "news"],
            lastUpdated: "2024-01-10",
            featured: true,
            isPinned: false
          },
          {
            id: 'fallback-3',
            title: "BIZZ PORTAL",
            description: "Secure business intelligence platform with encrypted analytics and data management.",
            techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
            githubLink: "https://github.com/Jinish2170/BIZZ_PORTAL",
            category: "Full-Stack Development",
            stars: 0,
            forks: 0,
            language: "TypeScript",
            topics: ["business", "analytics"],
            lastUpdated: "2024-01-05",
            featured: true,
            isPinned: false
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="badge-premium mb-6">
            <Code className="w-3 h-3 mr-2" />
            Portfolio
          </Badge>
          
          <h2 className="heading-xl mb-6">
            Featured <span className="gradient-text-premium">Projects</span>
          </h2>
          
          <p className="body-lg max-w-3xl mx-auto text-muted-foreground">
            {loading ? (
              "Loading projects from GitHub..."
            ) : (
              "Showcasing innovative solutions in AI, web development, and cybersecurity."
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="premium-card p-8 animate-pulse">
                <div className="h-6 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2 mb-6" />
                <div className="flex gap-2 mb-6">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-20" />
                </div>
                <div className="flex gap-3">
                  <div className="h-8 bg-muted rounded flex-1" />
                  <div className="h-8 bg-muted rounded flex-1" />
                </div>
              </div>
            ))
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="premium-card p-8 h-full hover:scale-[1.02] transition-transform duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-royal-500/10 rounded-xl">
                      <Code className="w-6 h-6 text-royal-500" />
                    </div>
                    {project.isPinned && (
                      <Badge variant="secondary" className="text-xs">
                        <Pin className="w-3 h-3 mr-1" />
                        Pinned
                      </Badge>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-muted/60 rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {project.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {project.stars}
                        </span>
                      )}
                      {project.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {project.forks}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={project.githubLink} target="_blank">
                          <Github className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button className="btn-premium" asChild>
            <Link href="https://github.com/Jinish2170" target="_blank">
              <Github className="w-4 h-4 mr-2" />
              View All Projects
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsPremium
