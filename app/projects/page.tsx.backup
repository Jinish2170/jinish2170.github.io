"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, Calendar, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["all", "AI & ML", "Web Development", "Cybersecurity", "Full-Stack", "Mobile"]

  const projects = [
    {
      id: "benardai",
      title: "BenardAI",
      description: "Advanced cybersecurity AI solution with real-time threat detection and prevention capabilities using machine learning algorithms.",
      longDescription: "BenardAI is a comprehensive cybersecurity platform that leverages artificial intelligence to provide real-time threat detection, analysis, and prevention. The system uses advanced machine learning models to identify suspicious patterns and automatically respond to security incidents.",
      image: "/placeholder.jpg",
      category: "AI & ML",
      techStack: ["Python", "TensorFlow", "FastAPI", "Docker", "PostgreSQL"],
      githubUrl: "https://github.com/Jinish2170/BenardAI",
      liveUrl: "#",
      featured: true,
      status: "Completed",
      date: "2024"
    },
    {
      id: "bigtechtime",
      title: "BigTechTimes", 
      description: "Community-driven technology news platform featuring real-time discussions, insights, and resources for tech professionals worldwide.",
      longDescription: "BigTechTimes is a modern news aggregation and discussion platform built for technology enthusiasts. It features real-time updates, community discussions, and personalized content recommendations.",
      image: "/placeholder.jpg",
      category: "Web Development",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
      githubUrl: "https://github.com/Jinish2170/BigTechTimes",
      liveUrl: "#",
      featured: true,
      status: "In Progress",
      date: "2024"
    },
    {
      id: "bizzportal",
      title: "BizzPortal",
      description: "Secure business intelligence platform providing encrypted analytics and enterprise-grade data management solutions.",
      longDescription: "BizzPortal is an enterprise business intelligence platform that provides secure data analytics, reporting, and visualization tools. It features end-to-end encryption and role-based access control.",
      image: "/placeholder.jpg",
      category: "Full-Stack",
      techStack: ["React", "Node.js", "MongoDB", "JWT", "Chart.js"],
      githubUrl: "https://github.com/Jinish2170/BizzPortal",
      liveUrl: "#",
      featured: false,
      status: "Completed",
      date: "2023"
    },
    {
      id: "neural-chess",
      title: "Neural Chess Engine",
      description: "AI-powered chess engine utilizing neural networks and reinforcement learning for strategic gameplay and continuous improvement.",
      longDescription: "An advanced chess engine that combines traditional chess algorithms with modern machine learning techniques. The engine can analyze positions, suggest moves, and continuously improve through reinforcement learning.",
      image: "/placeholder.jpg",
      category: "AI & ML",
      techStack: ["Python", "PyTorch", "Chess.js", "React", "WebSockets"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
      status: "In Progress",
      date: "2024"
    },
    {
      id: "securechat",
      title: "SecureChat",
      description: "End-to-end encrypted messaging application with advanced security features and real-time communication capabilities.",
      longDescription: "SecureChat is a privacy-focused messaging application that provides end-to-end encryption, secure file sharing, and anonymous communication features.",
      image: "/placeholder.jpg",
      category: "Cybersecurity",
      techStack: ["React Native", "Node.js", "Socket.io", "Cryptography", "Redis"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
      status: "Planning",
      date: "2024"
    },
    {
      id: "dataviz",
      title: "DataViz Dashboard",
      description: "Interactive data visualization platform for complex datasets featuring real-time updates and customizable charts.",
      longDescription: "A comprehensive data visualization platform that allows users to create interactive dashboards, analyze complex datasets, and generate insights through various chart types and visualization methods.",
      image: "/placeholder.jpg",
      category: "Web Development",
      techStack: ["Vue.js", "D3.js", "Python", "FastAPI", "InfluxDB"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false,
      status: "Completed",
      date: "2023"
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProjects = projects.filter(project => project.featured)

  return (
    <div className="min-h-screen relative">
      {/* Sophisticated Site-wide Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />
        
        {/* Dynamic Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(45deg, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(-45deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 120px 120px, 120px 120px'
          }}
        />
        
        {/* Professional Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Architectural circles */}
          <div className="absolute -top-48 -right-48 w-96 h-96 border-[0.5px] border-border/20 rounded-full">
            <div className="absolute inset-8 border-[0.5px] border-border/15 rounded-full">
              <div className="absolute inset-8 border-[0.5px] border-border/10 rounded-full" />
            </div>
          </div>
          <div className="absolute -bottom-48 -left-48 w-96 h-96 border-[0.5px] border-border/20 rounded-full">
            <div className="absolute inset-8 border-[0.5px] border-border/15 rounded-full">
              <div className="absolute inset-8 border-[0.5px] border-border/10 rounded-full" />
            </div>
          </div>
          
          {/* Tech-inspired elements */}
          <div className="absolute top-1/4 left-1/6 w-3 h-3 border border-blue-600/20 rotate-45" />
          <div className="absolute top-1/3 right-1/4 w-4 h-2 border border-purple-600/25 rotate-12" />
          <div className="absolute bottom-1/4 right-1/6 w-2 h-4 border border-cyan-600/20 -rotate-12" />
          <div className="absolute bottom-1/3 left-1/4 w-6 h-1 border border-slate-600/25 rotate-45" />
          
          {/* Minimalist dots */}
          <div className="absolute top-1/5 right-1/3 w-1 h-1 bg-blue-600/30 rounded-full" />
          <div className="absolute top-2/5 left-1/5 w-0.5 h-0.5 bg-purple-600/40 rounded-full" />
          <div className="absolute bottom-1/5 left-2/5 w-1.5 h-1.5 bg-cyan-600/25 rounded-full" />
          <div className="absolute bottom-2/5 right-1/5 w-0.5 h-0.5 bg-slate-600/35 rounded-full" />
        </div>
        
        {/* Advanced gradient orbs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-radial from-blue-600/8 via-blue-600/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-purple-600/8 via-purple-600/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-cyan-600/6 via-cyan-600/3 to-transparent rounded-full blur-2xl" />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Animated glow lines */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent"
            style={{ 
              animation: 'slideRight 8s ease-in-out infinite alternate',
              transform: 'skewY(-1deg)'
            }}
          />
          <div 
            className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-600/15 to-transparent"
            style={{ 
              animation: 'slideLeft 10s ease-in-out infinite alternate',
              transform: 'skewY(1deg)'
            }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding pt-24 relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="heading-xl mb-6">
                My <span className="gradient-text">Projects</span>
              </h1>
              <p className="body-lg mb-8">
                A comprehensive showcase of my work in AI/ML, cybersecurity, and full-stack development. 
                Each project represents a unique challenge and innovative solution.
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {selectedCategory === "all" && searchTerm === "" && (
        <section className="section-padding relative z-10">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-16"
            >
              <h2 className="heading-lg mb-4">Featured Projects</h2>
              <p className="body-lg max-w-2xl mx-auto">
                Highlighted projects that showcase my expertise and innovation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="project-card group"
                >
                  <div className="relative overflow-hidden rounded-t-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.date}
                      </span>
                    </div>
                    
                    <h3 className="heading-sm mb-3">{project.title}</h3>
                    <p className="body-sm mb-4 line-clamp-3">{project.longDescription}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-secondary/50 text-xs rounded border">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      {project.githubUrl !== "#" && (
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                          <Link href={project.githubUrl} target="_blank">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                      {project.liveUrl !== "#" && (
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={project.liveUrl} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-4">
              {selectedCategory === "all" ? "All Projects" : `${selectedCategory} Projects`}
            </h2>
            <p className="body-lg">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="project-card"
              >
                <div className="relative overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-background/90 text-xs font-medium rounded border">
                      {project.category}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium rounded-full px-2 py-1 ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.date}</span>
                  </div>
                  
                  <h3 className="heading-sm mb-3">{project.title}</h3>
                  <p className="body-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.techStack.slice(0, 3).map(tech => (
                      <span key={tech} className="px-2 py-1 bg-secondary/50 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-secondary/50 text-xs rounded">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.githubUrl !== "#" && (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link href={project.githubUrl} target="_blank">
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl !== "#" && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={project.liveUrl} target="_blank">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="body-lg text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchTerm("")
                }}
                variant="outline"
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
