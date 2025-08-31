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

// Dynamically import icons to reduce initial bundle size
const ExternalLink = dynamic(() => import("lucide-react").then(mod => mod.ExternalLink))
const Github = dynamic(() => import("lucide-react").then(mod => mod.Github))
const Star = dynamic(() => import("lucide-react").then(mod => mod.Star))
const GitFork = dynamic(() => import("lucide-react").then(mod => mod.GitFork))
const Calendar = dynamic(() => import("lucide-react").then(mod => mod.Calendar))
const Pin = dynamic(() => import("lucide-react").then(mod => mod.Pin))
const Code = dynamic(() => import("lucide-react").then(mod => mod.Code))
const Zap = dynamic(() => import("lucide-react").then(mod => mod.Zap))

const Projects = () => {
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
            description: "Advanced cybersecurity AI solution with threat detection and prevention capabilities. Built with modern ML algorithms and real-time monitoring.",
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
            description: "Community-driven technology news platform featuring discussions, resources, and insights for tech enthusiasts worldwide.",
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
            description: "Secure business intelligence platform with encrypted analytics, providing enterprise-grade data management and insights.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-medium tracking-wide">
              <span className="h-px w-5 bg-border"></span>
              <span>PORTFOLIO</span>
              <span className="h-px w-5 bg-border"></span>
            </div>
          </div>
          <h2 className="heading-lg mb-4 font-bold tracking-tight">
            Featured <span className="text-foreground">Projects</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto text-muted-foreground mb-4">
            {loading ? (
              "Loading projects from GitHub..."
            ) : error ? (
              "Showcasing my latest work in AI, web development, and cybersecurity."
            ) : (
              `Live projects fetched from my GitHub (@jinish2170). Each project represents innovative solutions and technical excellence.`
            )}
          </p>
          {!loading && !error && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live from GitHub API</span>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>Using cached projects data</span>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-emerald-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 animate-pulse">
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
              </div>
            ))
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative"
              >
                {/* Sophisticated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-emerald-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                
                <div className="relative bg-background/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-violet-600 to-blue-600 rounded-xl shadow-lg">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      {project.isPinned && (
                        <div className="p-2 bg-amber-500/20 rounded-lg">
                          <Pin className="w-4 h-4 text-amber-600" />
                        </div>
                      )}
                    </div>
                    
                    {/* Language indicator */}
                    {project.language && (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: project.languageColor || '#6366f1' }}
                        />
                        <span className="text-xs font-medium text-muted-foreground">
                          {project.language}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title and Category */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground leading-tight">
                        {project.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {project.category}
                      </Badge>
                    </div>
                    
                    {project.isPinned && (
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-3 h-3 text-amber-600" />
                        <span className="text-xs font-medium text-amber-600">Pinned Repository</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* GitHub Stats */}
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-muted/60 border border-border/40 rounded-full text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-3 py-1.5 bg-muted/60 border border-border/40 rounded-full text-xs font-medium text-muted-foreground">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 group/btn border-border/60 hover:border-violet-500 hover:text-violet-600 transition-all duration-300"
                      asChild
                    >
                      <Link href={project.githubLink || '#'} target="_blank">
                        <Github className="w-4 h-4 mr-2 opacity-80 group-hover/btn:opacity-100" />
                        <span className="font-normal">Source</span>
                      </Link>
                    </Button>
                    
                    {project.demoLink && (
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 transition-all duration-300"
                        asChild
                      >
                        <Link href={project.demoLink} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <span className="font-normal">Demo</span>
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* Topics/Tags */}
                  {project.topics.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border/30">
                      <div className="flex flex-wrap gap-1">
                        {project.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs font-medium bg-violet-600/10 text-violet-600 rounded-md"
                          >
                            #{topic}
                          </span>
                        ))}
                        {project.topics.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-md">
                            +{project.topics.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="inline-block p-[1px] bg-gradient-to-r from-background via-border to-background rounded-lg">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-none bg-background hover:bg-background/80 transition-all duration-300 px-8 group"
            >
              <Link href="/projects" className="flex items-center">
                <span className="mr-2">View All Projects</span>
                <ExternalLink className="h-4 w-4 transition-all group-hover:translate-x-1 duration-300 opacity-80" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle background elements for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 border-[0.5px] border-border/10 rounded-full opacity-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 border-[0.5px] border-border/10 rounded-full opacity-50"></div>
    </section>
  )
}

export default Projects
