"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "BenardAI",
      description:
        "SECyour AI - A cybersecurity AI solution that provides advanced threat detection and prevention capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      techStack: ["Python", "TensorFlow", "Cybersecurity APIs"],
      githubLink: "https://github.com/Jinish2170/BenardAI",
      demoLink: "#",
      category: "AI & Cybersecurity",
    },
    {
      title: "BigTechTimes",
      description: "A community website focused on technology news, discussions, and resources for tech enthusiasts.",
      image: "/placeholder.svg?height=400&width=600",
      techStack: ["JavaScript", "React", "Node.js", "MongoDB"],
      githubLink: "https://github.com/Jinish2170/BigTechTimes",
      demoLink: "#",
      category: "Web Development",
    },
    {
      title: "BizzPortal",
      description:
        "Secure business intelligence platform with end-to-end encrypted analytics for enterprise data management.",
      image: "/placeholder.svg?height=400&width=600",
      techStack: ["React", "Node.js", "MongoDB", "JWT"],
      githubLink: "https://github.com/Jinish2170/BizzPortal",
      demoLink: "#",
      category: "Full-Stack",
    },
    {
      title: "Neural Chess Engine",
      description:
        "AI-powered chess bot with neural network evaluation that self-improves through reinforcement learning.",
      image: "/placeholder.svg?height=400&width=600",
      techStack: ["Python", "TensorFlow", "Alpha-Beta Pruning"],
      githubLink: "https://github.com/Jinish2170/CHESS-BOT-",
      demoLink: "#",
      category: "AI & ML",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="tech-gradient">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Here are some of my notable projects that showcase my skills and expertise in AI, cybersecurity, and
            full-stack development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden card-hover h-full flex flex-col card-3d">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 text-xs font-medium px-2 py-1 rounded-full text-techBlue border border-techBlue/30">
                    {project.category}
                  </div>
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-techBlue text-techBlue hover:bg-techBlue/10"
                    asChild
                  >
                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90" asChild>
                    <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90 text-white"
            asChild
          >
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
