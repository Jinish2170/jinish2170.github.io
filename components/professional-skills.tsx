"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import {
  BrainCircuit,
  Database,
  Globe,
  Shield,
  Palette,
  Search,
  Code,
  Server,
  Cloud,
  Layers,
  LineChart,
  FileCode,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Skill {
  name: string
  level: number
  description: string
}

interface SkillCategory {
  name: string
  icon: React.ComponentType<any>
  color: string
  skills: Skill[]
}

const ProfessionalSkills = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  // Sophisticated skill categories with elegant color schemes
  const skillCategories: SkillCategory[] = [
    {
      name: "AI/ML & Data Science",
      icon: BrainCircuit,
      color: "from-gray-800 to-gray-900",
      skills: [
        {
          name: "Machine Learning",
          level: 92,
          description: "Expert in ML algorithms, model training, and optimization using scikit-learn, TensorFlow, and PyTorch.",
        },
        {
          name: "Deep Learning",
          level: 88,
          description: "Proficient in neural networks, CNNs, RNNs, and transformer architectures for complex problem-solving.",
        },
        {
          name: "Natural Language Processing",
          level: 85,
          description: "Skilled in text processing, sentiment analysis, and language model fine-tuning using NLTK and spaCy.",
        },
        {
          name: "Computer Vision",
          level: 82,
          description: "Experience with image processing, object detection, and facial recognition using OpenCV and YOLO.",
        },
        {
          name: "Data Analysis & Visualization",
          level: 90,
          description: "Expert in data manipulation and visualization using pandas, numpy, matplotlib, and seaborn.",
        },
        {
          name: "TensorFlow & PyTorch",
          level: 87,
          description: "Advanced knowledge of deep learning frameworks for building and deploying ML models.",
        },
      ],
    },
    {
      name: "Full-Stack Development",
      icon: Code,
      color: "from-zinc-800 to-zinc-900",
      skills: [
        {
          name: "React & Next.js",
          level: 95,
          description: "Expert in modern React development with hooks, context, and Next.js for server-side rendering.",
        },
        {
          name: "Node.js & Express",
          level: 90,
          description: "Proficient in building scalable backend services and RESTful APIs with Node.js and Express.",
        },
        {
          name: "TypeScript",
          level: 88,
          description: "Strong typing skills for large-scale applications with excellent type safety and developer experience.",
        },
        {
          name: "Python & Django",
          level: 85,
          description: "Experienced in Python web development with Django and Flask for rapid application development.",
        },
        {
          name: "GraphQL",
          level: 78,
          description: "Knowledge of GraphQL for efficient data fetching and modern API design patterns.",
        },
        {
          name: "RESTful APIs",
          level: 92,
          description: "Expert in designing and implementing RESTful services with proper HTTP methods and status codes.",
        },
      ],
    },
    {
      name: "Database & Cloud",
      icon: Cloud,
      color: "from-slate-800 to-slate-900",
      skills: [
        {
          name: "MongoDB",
          level: 88,
          description: "Proficient in NoSQL database design, aggregation pipelines, and performance optimization.",
        },
        {
          name: "PostgreSQL",
          level: 85,
          description: "Strong SQL skills with complex queries, indexing strategies, and database normalization.",
        },
        {
          name: "AWS Services",
          level: 82,
          description: "Experience with EC2, S3, Lambda, RDS, and other AWS services for cloud deployment.",
        },
        {
          name: "Docker & Kubernetes",
          level: 80,
          description: "Containerization and orchestration for scalable application deployment and management.",
        },
        {
          name: "Redis",
          level: 75,
          description: "Caching strategies and session management using Redis for improved application performance.",
        },
        {
          name: "Firebase",
          level: 78,
          description: "Real-time database, authentication, and hosting solutions for rapid prototyping and deployment.",
        },
      ],
    },
    {
      name: "DevOps & Security",
      icon: Shield,
      color: "from-neutral-800 to-neutral-900",
      skills: [
        {
          name: "Cybersecurity Fundamentals",
          level: 87,
          description: "Strong foundation in cybersecurity principles, threat analysis, and security best practices.",
        },
        {
          name: "CI/CD Pipelines",
          level: 83,
          description: "Experience with automated testing, building, and deployment using GitHub Actions and Jenkins.",
        },
        {
          name: "Linux System Administration",
          level: 80,
          description: "Proficient in Linux command line, system configuration, and server management.",
        },
        {
          name: "Network Security",
          level: 78,
          description: "Understanding of network protocols, firewalls, and security monitoring tools.",
        },
        {
          name: "Git & Version Control",
          level: 92,
          description: "Expert in Git workflows, branching strategies, and collaborative development practices.",
        },
        {
          name: "Web Application Security",
          level: 85,
          description: "Knowledge of OWASP top 10, secure coding practices, and vulnerability assessment.",
        },
      ],
    },
    {
      name: "Design & Tools",
      icon: Layers,
      color: "from-stone-800 to-stone-900",
      skills: [
        {
          name: "UI/UX Design",
          level: 82,
          description: "Strong design principles with focus on user experience and interface design.",
        },
        {
          name: "Tailwind CSS",
          level: 90,
          description: "Expert in utility-first CSS framework for rapid and responsive web development.",
        },
        {
          name: "Figma",
          level: 75,
          description: "Skilled in using Figma for UI/UX design, prototyping, and collaboration with design teams.",
        },
        {
          name: "Notion",
          level: 70,
          description: "Expert in using Notion for project management, documentation, and team collaboration.",
        },
        {
          name: "Data Visualization",
          level: 82,
          description: "Creating interactive dashboards and data visualizations using D3.js, Chart.js and modern visualization libraries.",
        },
        {
          name: "Performance Optimization",
          level: 85,
          description: "Techniques for frontend and backend performance optimization, load testing, and bottleneck identification.",
        },
      ],
    },
  ]

  // Filter skills based on search term and category
  const filteredCategories = skillCategories
    .filter((category) => selectedCategory === "all" || category.name === selectedCategory)
    .map((category) => ({
      ...category,
      skills: category.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.skills.length > 0)

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Professional <span className="text-foreground/80">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specialized skills across AI/ML, software engineering, and cybersecurity with a focus on building scalable, secure, and intelligent systems.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search skills or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 focus:border-border transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="text-xs font-medium"
              >
                All Skills
              </Button>
              {skillCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="text-xs font-medium"
                >
                  <category.icon className="h-3 w-3 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skill Cards - Modern Professional Layout */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
            <TabsTrigger value="grid">Card View</TabsTrigger>
            <TabsTrigger value="list">Detailed View</TabsTrigger>
          </TabsList>

          {/* Grid View - Sophisticated Professional Cards */}
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                >
                  <Card className="h-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative">
                      {/* Elegant accent line at top */}
                      <div className={`h-1 w-full bg-gradient-to-r ${category.color}`}></div>
                      
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className={`p-2 rounded-md bg-background backdrop-blur-lg border border-border/80 shadow-sm`}>
                            <category.icon className={`h-5 w-5 opacity-90`} />
                          </div>
                          <h3 className="text-xl font-semibold tracking-tight">{category.name}</h3>
                        </div>
                        
                        <div className="space-y-5 mt-6">
                          {category.skills.slice(0, 4).map((skill) => (
                            <div key={skill.name} className="relative group/skill">
                              <div className="flex items-center justify-between mb-2.5">
                                <h4 className="text-sm font-medium tracking-tight group-hover/skill:text-foreground transition-colors">{skill.name}</h4>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 relative">
                                    <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted/30 stroke-[3]" />
                                      <motion.circle 
                                        cx="18" 
                                        cy="18" 
                                        r="16" 
                                        fill="none" 
                                        className="stroke-foreground/60 stroke-[3]" 
                                        strokeDasharray={`${skill.level}, 100`}
                                        initial={{ strokeDasharray: "0, 100" }}
                                        animate={inView ? { strokeDasharray: `${skill.level}, 100` } : { strokeDasharray: "0, 100" }}
                                        transition={{ duration: 1.5, delay: categoryIndex * 0.05, ease: "easeOut" }}
                                      />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-[10px] font-medium">{skill.level}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Subtle info tooltip */}
                              <div className="opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200 text-xs text-muted-foreground mt-1.5">
                                {skill.description.length > 60 
                                  ? `${skill.description.substring(0, 60)}...` 
                                  : skill.description}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {category.skills.length > 4 && (
                          <div className="mt-4 text-right">
                            <span className="text-xs text-muted-foreground">
                              +{category.skills.length - 4} more skills
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* List View - Professional Detailed */}
          <TabsContent value="list">
            <div className="space-y-8">
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative">
                    {/* Elegant accent line at top */}
                    <div className={`h-1 w-full bg-gradient-to-r ${category.color}`}></div>
                    
                    <div className="p-6 border-b border-border/30">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md bg-background backdrop-blur-lg border border-border/80 shadow-sm`}>
                          <category.icon className={`h-5 w-5 opacity-90`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold tracking-tight">{category.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {category.skills.length} specialized capabilities
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skill.name}
                            className={`p-5 rounded-lg border border-border/30 hover:border-border/70 transition-all duration-300 ${
                              activeSkill === `${category.name}-${skill.name}` 
                                ? 'bg-background shadow-sm border-border/50' 
                                : 'hover:bg-background/50 hover:shadow-sm'
                            }`}
                            onClick={() => 
                              setActiveSkill(
                                activeSkill === `${category.name}-${skill.name}`
                                  ? null
                                  : `${category.name}-${skill.name}`
                              )
                            }
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-base font-medium tracking-tight">{skill.name}</h4>
                              <div className="flex items-center">
                                <svg className="w-9 h-9 -mr-1" viewBox="0 0 36 36">
                                  <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted/30 stroke-[2]" />
                                  <motion.circle 
                                    cx="18" 
                                    cy="18" 
                                    r="16" 
                                    fill="none" 
                                    className="stroke-foreground/60 stroke-[2]" 
                                    strokeDasharray={`${skill.level}, 100`}
                                    initial={{ strokeDasharray: "0, 100" }}
                                    animate={inView ? { strokeDasharray: `${skill.level}, 100` } : { strokeDasharray: "0, 100" }}
                                    transition={{ duration: 1.5, delay: categoryIndex * 0.05 + skillIndex * 0.05, ease: "easeOut" }}
                                  />
                                  <text x="18" y="18" textAnchor="middle" dominantBaseline="central" 
                                    className="text-[8px] font-medium fill-foreground">
                                    {skill.level}%
                                  </text>
                                </svg>
                              </div>
                            </div>
                            
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="text-sm text-muted-foreground mt-1 line-clamp-2 hover:line-clamp-none transition-all duration-300"
                            >
                              {skill.description}
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Professional Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24"
        >
          <div className="p-8 bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg shadow-md">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-md bg-background backdrop-blur-lg border border-border/80 shadow-sm">
                <FileCode className="h-5 w-5 opacity-90" />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Professional Achievements</h3>
                <p className="text-sm text-muted-foreground mt-1.5">
                  Key certifications, leadership roles, and professional milestones
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  name: "Technical Head at Google Developer Group (GDG), CKPCET", 
                  icon: "🚀", 
                  category: "Leadership"
                },
                { 
                  name: "Foundations of Cybersecurity", 
                  icon: "🔒", 
                  category: "Certification"
                },
                { 
                  name: "Advanced AI and Data Skills", 
                  icon: "🧠", 
                  category: "Certification"
                },
                { 
                  name: "Head of Cybersecurity Domain – GDG CKPCET", 
                  icon: "🛡️", 
                  category: "Leadership"
                },
                { 
                  name: "Full Stack Expert", 
                  icon: "💻", 
                  category: "Expertise"
                },
                { 
                  name: "Cloud Architecture Specialist", 
                  icon: "☁️", 
                  category: "Expertise"
                },
              ].map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className="p-5 rounded-lg border border-border/30 bg-background/50 hover:bg-background/90 hover:border-border/70 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-md bg-background border border-border/50 text-xl shrink-0">
                      {achievement.icon}
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2 font-normal">
                        {achievement.category}
                      </Badge>
                      <h4 className="text-sm font-medium leading-tight">
                        {achievement.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProfessionalSkills
