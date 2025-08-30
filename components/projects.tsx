"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

// Dynamically import icons to reduce initial bundle size
const ExternalLink = dynamic(() => import("lucide-react").then(mod => mod.ExternalLink))
const Github = dynamic(() => import("lucide-react").then(mod => mod.Github))

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "BenardAI",
      description: "Advanced cybersecurity AI solution with threat detection and prevention capabilities. Built with modern ML algorithms and real-time monitoring.",
      image: "/placeholder.jpg",
      techStack: ["Python", "TensorFlow", "FastAPI", "Docker"],
      githubLink: "https://github.com/Jinish2170/BenardAI",
      demoLink: "#",
      category: "AI & Cybersecurity",
    },
    {
      title: "BigTechTimes",
      description: "Community-driven technology news platform featuring discussions, resources, and insights for tech enthusiasts worldwide.",
      image: "/placeholder.jpg",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
      githubLink: "https://github.com/Jinish2170/BigTechTimes",
      demoLink: "#",
      category: "Web Development",
    },
    {
      title: "BizzPortal",
      description: "Secure business intelligence platform with encrypted analytics, providing enterprise-grade data management and insights.",
      image: "/placeholder.jpg",
      techStack: ["React", "Node.js", "MongoDB", "JWT"],
      githubLink: "https://github.com/Jinish2170/BizzPortal",
      demoLink: "#",
      category: "Full-Stack",
    },
    {
      title: "Neural Chess Engine",
      description: "AI-powered chess engine utilizing neural networks and reinforcement learning for strategic gameplay and continuous improvement.",
      image: "/placeholder.jpg",
      techStack: ["Python", "PyTorch", "Chess.js", "React"],
      githubLink: "#",
      demoLink: "#",
      category: "AI & Gaming",
    },
    {
      title: "SecureChat",
      description: "End-to-end encrypted messaging application with advanced security features and real-time communication capabilities.",
      image: "/placeholder.jpg",
      techStack: ["React", "Socket.io", "Node.js", "Cryptography"],
      githubLink: "#",
      demoLink: "#",
      category: "Security",
    },
    {
      title: "DataViz Dashboard",
      description: "Interactive data visualization platform for complex datasets, featuring real-time updates and customizable charts.",
      image: "/placeholder.jpg",
      techStack: ["Vue.js", "D3.js", "Python", "FastAPI"],
      githubLink: "#",
      demoLink: "#",
      category: "Data Science",
    },
  ]

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
          <p className="body-lg max-w-2xl mx-auto text-muted-foreground">
            A showcase of my latest work in AI, web development, and cybersecurity. 
            Each project represents a unique challenge and innovative solution.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={340}
                  loading={index <= 1 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2 mb-2">
                    {project.demoLink !== "#" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-200"
                        asChild
                      >
                        <Link href={project.demoLink} target="_blank">
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                          Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-md border border-border/50 shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-muted/50 text-xs font-medium rounded-md text-muted-foreground border border-border/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.githubLink !== "#" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 group border-border/60 hover:border-border transition-all duration-300"
                      asChild
                    >
                      <Link href={project.githubLink} target="_blank">
                        <Github className="h-3.5 w-3.5 mr-2 opacity-80" />
                        <span className="font-normal">Code</span>
                      </Link>
                    </Button>
                  )}
                  
                  {project.demoLink !== "#" && project.githubLink === "#" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 group border-border/60 hover:border-border transition-all duration-300"
                      asChild
                    >
                      <Link href={project.demoLink} target="_blank">
                        <ExternalLink className="h-3.5 w-3.5 mr-2 opacity-80" />
                        <span className="font-normal">View Project</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
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
