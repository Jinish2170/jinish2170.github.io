"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Target,
  Brain,
  Code,
  Shield,
  Cloud,
  Database,
  Users,
  Trophy,
  Award,
  ArrowUpRight,
  Building2,
  Zap,
  Star,
  Lock,
  BrainCircuit,
  Code2,
  Palette,
  Server,
  Globe,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExpertiseArea {
  domain: string
  description: string
  icon: any
  gradient: string
  borderColor: string
  technologies: string[]
  achievements: string[]
  keyProjects: string[]
}

const ProfessionalSkills = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [activeArea, setActiveArea] = useState<string | null>(null)

  const expertiseAreas: ExpertiseArea[] = [
    {
      domain: "Generative AI Development",
      description: "Building intelligent GenAI solutions with expertise in LLM integration, prompt engineering, and AI-powered applications that transform user experiences.",
      icon: BrainCircuit,
      gradient: "from-violet-600 to-purple-700",
      borderColor: "border-violet-200 dark:border-violet-800",
      technologies: ["Gemini API", "OpenAI", "LangChain", "RAG", "Prompt Engineering", "NLP"],
      achievements: ["GenAI Developer Intern", "API Response Time +20%", "Integrated Speech-to-Text"],
      keyProjects: ["TalkNotes Voice App", "Personal AI Assistant (RAG)", "AI-Powered Chatbot"]
    },
    {
      domain: "Backend Systems Engineering",
      description: "Designing and building scalable backend architectures with expertise in API development, database optimization, and microservices for high-performance applications.",
      icon: Server,
      gradient: "from-emerald-600 to-teal-600",
      borderColor: "border-emerald-200 dark:border-emerald-800",
      technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase", "RESTful APIs"],
      achievements: ["Scalable Backend Systems", "Real-time Subscriptions", "JWT Authentication"],
      keyProjects: ["TalkNotes Backend", "Secure Student Activity Portal", "Enterprise APIs"]
    },
    {
      domain: "Full-Stack Development",
      description: "End-to-end application development with mastery of modern frameworks, scalable architectures, and performance optimization for high-traffic applications.",
      icon: Code2,
      gradient: "from-blue-600 to-cyan-600",
      borderColor: "border-blue-200 dark:border-blue-800",
      technologies: ["React/Next.js", "Node.js", "TypeScript", "PostgreSQL", "API Design"],
      achievements: ["25+ Applications Built", "Full-Stack Expert", "Performance Optimization"],
      keyProjects: ["E-commerce Platform", "Real-time Dashboard", "Enterprise Web Applications"]
    },
    {
      domain: "AI & Machine Learning",
      description: "Strategic AI implementation with deep expertise in machine learning architectures, neural networks, and intelligent automation systems for enterprise-scale solutions.",
      icon: Brain,
      gradient: "from-orange-600 to-amber-600",
      borderColor: "border-orange-200 dark:border-orange-800",
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "VectorDB", "Ollama"],
      achievements: ["ML Specialization (Stanford)", "Trained AI Assistants", "Sub-second Retrieval"],
      keyProjects: ["Local RAG Assistant", "Predictive Analytics", "AI-Powered Applications"]
    }
  ]

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Executive Background */}
      <div className="absolute inset-0 -z-10">
        {/* Professional geometric elements */}
        <div className="absolute top-1/6 right-1/12 w-64 h-64 border border-border/10 rotate-12 rounded-3xl" />
        <div className="absolute bottom-1/4 left-1/8 w-48 h-48 border border-border/15 -rotate-45 rounded-2xl" />
        
        {/* Sophisticated gradient fields */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-violet-600/5 via-violet-600/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-blue-600/5 via-blue-600/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-gradient-radial from-emerald-600/4 via-emerald-600/2 to-transparent rounded-full blur-3xl" />
        
        {/* Executive accent elements */}
        <div className="absolute top-1/5 right-1/4 w-3 h-3 bg-violet-600/20 rounded-full" />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-blue-600/25 rounded-full" />
        <div className="absolute top-2/3 right-1/6 w-4 h-4 bg-emerald-600/15 rounded-full" />
      </div>

      <div className="section-container relative">
        {/* Executive Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-2xl backdrop-blur-sm border border-border/20">
                <Target className="w-8 h-8 text-violet-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-violet-600 rounded-full animate-pulse" />
            </div>
          </div>
          
          <h2 className="heading-xl mb-8">
            Professional <span className="gradient-text">Expertise</span>
          </h2>
          
          <p className="body-lg max-w-5xl mx-auto text-muted-foreground leading-relaxed">
            Strategic technology leadership across <span className="text-foreground font-semibold">generative AI</span>, 
            <span className="text-foreground font-semibold"> backend systems</span>, 
            <span className="text-foreground font-semibold"> full-stack development</span>, and 
            <span className="text-foreground font-semibold"> AI/ML</span> — delivering transformative solutions 
            that drive organizational excellence and competitive advantage.
          </p>
        </motion.div>

        {/* Executive Expertise Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            const isActive = activeArea === area.domain
            
            return (
              <motion.div
                key={area.domain}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group"
                onMouseEnter={() => setActiveArea(area.domain)}
                onMouseLeave={() => setActiveArea(null)}
              >
                <div className={`relative p-8 bg-background/60 backdrop-blur-sm border ${area.borderColor} rounded-2xl hover:shadow-2xl transition-all duration-500 h-full ${isActive ? 'scale-105 shadow-2xl' : ''}`}>
                  {/* Executive Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`p-4 bg-gradient-to-r ${area.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground leading-tight mb-3">
                        {area.domain}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {area.description}
                      </p>
                    </div>
                  </div>

                  {/* Core Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Core Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + techIndex * 0.05 }}
                          className="px-3 py-1.5 text-xs font-medium bg-muted/60 border border-border/40 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Professional Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {area.achievements.map((achievement, achievementIndex) => (
                        <div key={achievement} className="flex items-center gap-3 text-sm">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${area.gradient} rounded-full`} />
                          <span className="text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Executive Leadership & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative"
        >
          <div className="p-12 bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-sm border border-border/20 rounded-3xl">
            {/* Leadership Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-2xl backdrop-blur-sm border border-border/20">
                  <Trophy className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <h3 className="heading-lg mb-4">
                Leadership & <span className="gradient-text">Recognition</span>
              </h3>
              <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
                Strategic technology leadership driving organizational transformation and innovation excellence.
              </p>
            </div>

            {/* Executive Recognition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Technical Head - GDG CKPCET",
                  organization: "Google Developer Group",
                  period: "2023 - Present",
                  description: "Leading strategic technology initiatives and developer community growth",
                  icon: Users,
                  color: "from-blue-600 to-indigo-600"
                },
                {
                  title: "Cybersecurity Domain Lead",
                  organization: "GDG CKPCET",
                  period: "2023 - Present",
                  description: "Spearheading enterprise security strategy and risk management",
                  icon: Shield,
                  color: "from-red-600 to-pink-600"
                },
                {
                  title: "Google Cybersecurity Certified",
                  organization: "Google Career Certificates",
                  period: "2024",
                  description: "Advanced cybersecurity foundations and practical implementation",
                  icon: Lock,
                  color: "from-green-600 to-emerald-600"
                },
                {
                  title: "AI & Data Science Specialist",
                  organization: "Professional Certification",
                  period: "2024",
                  description: "Advanced machine learning and data science methodologies",
                  icon: Brain,
                  color: "from-purple-600 to-pink-600"
                }
              ].map((recognition, index) => {
                const Icon = recognition.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    className="group"
                  >
                    <div className="p-6 bg-background/40 border border-border/20 rounded-xl hover:border-border/50 hover:bg-background/60 transition-all duration-300 h-full">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 bg-gradient-to-r ${recognition.color} rounded-xl shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h4 className="font-semibold text-foreground leading-tight">
                            {recognition.title}
                          </h4>
                          <div className="text-sm text-violet-600 font-medium">
                            {recognition.organization}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {recognition.period}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {recognition.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProfessionalSkills
