"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  BrainCircuit,
  Server,
  Code2,
  Brain,
  Trophy,
  Users,
  Shield,
  Lock,
  ArrowUpRight,
  Target,
  Sparkles,
  Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExpertiseArea {
  domain: string
  description: string
  icon: any
  technologies: string[]
  achievements: string[]
  keyProjects: string[]
}

const ProfessionalSkillsPremium = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [activeArea, setActiveArea] = useState<string | null>(null)

  const expertiseAreas: ExpertiseArea[] = [
    {
      domain: "Generative AI Development",
      description: "Building intelligent GenAI solutions with expertise in LLM integration, prompt engineering, and AI-powered applications that transform user experiences.",
      icon: BrainCircuit,
      technologies: ["Gemini API", "OpenAI", "LangChain", "RAG", "Prompt Engineering", "NLP"],
      achievements: ["GenAI Developer Intern", "API Response Time +20%", "Integrated Speech-to-Text"],
      keyProjects: ["TalkNotes Voice App", "Personal AI Assistant (RAG)", "AI-Powered Chatbot"]
    },
    {
      domain: "Backend Systems Engineering",
      description: "Designing and building scalable backend architectures with expertise in API development, database optimization, and microservices for high-performance applications.",
      icon: Server,
      technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Supabase", "RESTful APIs"],
      achievements: ["Scalable Backend Systems", "Real-time Subscriptions", "JWT Authentication"],
      keyProjects: ["TalkNotes Backend", "Secure Student Activity Portal", "Enterprise APIs"]
    },
    {
      domain: "Full-Stack Development",
      description: "End-to-end application development with mastery of modern frameworks, scalable architectures, and performance optimization for high-traffic applications.",
      icon: Code2,
      technologies: ["React/Next.js", "Node.js", "TypeScript", "PostgreSQL", "API Design"],
      achievements: ["25+ Applications Built", "Full-Stack Expert", "Performance Optimization"],
      keyProjects: ["E-commerce Platform", "Real-time Dashboard", "Enterprise Web Applications"]
    },
    {
      domain: "AI & Machine Learning",
      description: "Strategic AI implementation with deep expertise in machine learning architectures, neural networks, and intelligent automation systems for enterprise-scale solutions.",
      icon: Brain,
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision", "VectorDB", "Ollama"],
      achievements: ["ML Specialization (Stanford)", "Trained AI Assistants", "Sub-second Retrieval"],
      keyProjects: ["Local RAG Assistant", "Predictive Analytics", "AI-Powered Applications"]
    }
  ]

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="badge-premium mb-6">
            <Target className="w-3 h-3 mr-2" />
            Core Expertise
          </Badge>
          
          <h2 className="heading-xl mb-6">
            Professional <span className="gradient-text-premium">Expertise</span>
          </h2>
          
          <p className="body-lg max-w-3xl mx-auto text-muted-foreground">
            Strategic technology leadership across key domains, delivering 
            transformative solutions with precision and excellence.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
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
                <div className={`premium-card p-8 h-full transition-all duration-300 ${
                  isActive ? 'scale-[1.02] shadow-2xl' : ''
                }`}>
                  {/* Header */}
                  <div className="flex items-start gap-5 mb-6">
                    <div className="p-3 bg-royal-500/10 rounded-xl group-hover:bg-royal-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-royal-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                        {area.domain}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-muted/60 border border-border/40 rounded-full text-muted-foreground hover:bg-royal-500/10 hover:text-royal-600 hover:border-royal-500/30 transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {area.achievements.map((achievement, achievementIndex) => (
                        <div key={achievement} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 bg-royal-500 rounded-full" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Leadership & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative"
        >
          <div className="premium-card p-10 md:p-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex p-3 bg-gold-500/10 rounded-xl mb-6">
                <Trophy className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="heading-lg mb-4">
                Leadership & <span className="gradient-text-premium">Recognition</span>
              </h3>
              <p className="body-md text-muted-foreground max-w-2xl mx-auto">
                Strategic technology leadership driving organizational transformation and innovation excellence.
              </p>
            </div>

            {/* Recognition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Technical Head - GDG CKPCET",
                  organization: "Google Developer Group",
                  period: "2023 - Present",
                  icon: Users,
                },
                {
                  title: "Cybersecurity Domain Lead",
                  organization: "GDG CKPCET",
                  period: "2023 - Present",
                  icon: Shield,
                },
                {
                  title: "Google Cybersecurity Certified",
                  organization: "Google Career Certificates",
                  period: "2024",
                  icon: Lock,
                },
                {
                  title: "AI & Data Science Specialist",
                  organization: "Professional Certification",
                  period: "2024",
                  icon: Brain,
                }
              ].map((recognition, index) => {
                const Icon = recognition.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                    className="group"
                  >
                    <div className="p-6 bg-background/40 border border-border/20 rounded-xl hover:border-royal-500/30 hover:bg-royal-500/5 transition-all duration-300 h-full">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-royal-500/10 rounded-lg group-hover:bg-royal-500/20 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-royal-500" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h4 className="font-semibold text-foreground leading-tight text-sm">
                            {recognition.title}
                          </h4>
                          <div className="text-xs text-royal-500 font-medium">
                            {recognition.organization}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {recognition.period}
                          </div>
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

export default ProfessionalSkillsPremium
