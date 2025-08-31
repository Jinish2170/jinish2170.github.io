"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Calendar, 
  Search, 
  Star, 
  GitFork, 
  Code, 
  Pin,
  Zap,
  Filter,
  Folder
} from "lucide-react"
import Link from "next/link"
import { getAllRepositories, clearCache } from "@/lib/github-service"
import { ProcessedProject } from "@/lib/github-types"

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        // Clear cache for testing
        clearCache()
        const fetchedProjects = await getAllRepositories()
        setProjects(fetchedProjects)
        console.log(`Loaded ${fetchedProjects.length} projects`)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Extract unique categories from projects
  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))]

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         project.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const pinnedProjects = projects.filter(project => project.isPinned)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

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
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent">
                All <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Explore my complete portfolio of projects. From AI innovations to full-stack applications, 
                each repository represents a journey of learning and problem-solving.
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-center max-w-3xl mx-auto mb-8">
                <div className="relative flex-1 w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/50 backdrop-blur-sm border-border/60"
                  />
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs capitalize border-border/60"
                    >
                      <Filter className="h-3 w-3 mr-1" />
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  <span>{projects.length} repositories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Pin className="h-4 w-4" />
                  <span>{pinnedProjects.length} pinned</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>{projects.reduce((acc, p) => acc + p.stars, 0)} stars</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pinned Projects Section */}
      {selectedCategory === "all" && searchTerm === "" && pinnedProjects.length > 0 && (
        <section className="pb-16 px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Pin className="h-5 w-5 text-amber-600" />
                <h2 className="text-2xl md:text-3xl font-bold">Pinned Repositories</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My featured projects that showcase key skills and innovations.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            >
              {pinnedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Enhanced glow for pinned projects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-violet-600/10 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  <div className="relative bg-background/70 backdrop-blur-sm border border-border/60 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
                          <Pin className="w-6 h-6 text-white" />
                        </div>
                        <div className="p-2 bg-amber-500/20 rounded-lg">
                          <Zap className="w-4 h-4 text-amber-600" />
                        </div>
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
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground leading-tight">
                          {project.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs font-medium ml-2">
                          {project.category}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-amber-600 bg-amber-500/10 px-2 py-1 rounded-md">
                          ✨ Featured Repository
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
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
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-muted/60 border border-border/40 rounded-full text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 5 && (
                          <span className="px-3 py-1.5 bg-muted/60 border border-border/40 rounded-full text-xs font-medium text-muted-foreground">
                            +{project.techStack.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mb-6">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 group/btn border-border/60 hover:border-violet-500 hover:text-violet-600 transition-all duration-300"
                        asChild
                      >
                        <Link href={project.githubLink} target="_blank">
                          <Github className="w-4 h-4 mr-2 opacity-80 group-hover/btn:opacity-100" />
                          <span className="font-normal">Source</span>
                        </Link>
                      </Button>
                      
                      {project.demoLink && (
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
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
                      <div className="pt-6 border-t border-border/30">
                        <div className="flex flex-wrap gap-1">
                          {project.topics.slice(0, 4).map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 text-xs font-medium bg-amber-600/10 text-amber-600 rounded-md"
                            >
                              #{topic}
                            </span>
                          ))}
                          {project.topics.length > 4 && (
                            <span className="px-2 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-md">
                              +{project.topics.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Projects Section */}
      <section className="pb-20 px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {searchTerm || selectedCategory !== "all" ? "Filtered" : "All"} Projects
            </h2>
            <p className="text-muted-foreground">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 9 }).map((_, index) => (
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
            ) : filteredProjects.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all") }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
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
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
