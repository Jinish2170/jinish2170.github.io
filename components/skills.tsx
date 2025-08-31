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
  Code2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExpertiseArea {
  domain: string
  description: string
  experience: string
  icon: any
  gradient: string
  borderColor: string
  technologies: string[]
  achievements: string[]
  keyProjects: string[]
}

const Skills = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [activeArea, setActiveArea] = useState<string | null>(null)

  const expertiseAreas: ExpertiseArea[] = [
    {
      domain: "Artificial Intelligence & Machine Learning",
      description: "Strategic AI implementation with deep expertise in machine learning architectures, neural networks, and intelligent automation systems for enterprise-scale solutions.",
      experience: "3+ Years",
      icon: Brain,
      gradient: "from-violet-600 to-purple-700",
      borderColor: "border-violet-500/30",
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Keras", "Hugging Face"],
      achievements: [
        "Led AI strategy for 5+ enterprise projects",
        "Developed custom ML models with 95%+ accuracy",
        "Implemented automated data processing pipelines"
      ],
      keyProjects: [
        "Enterprise Document Intelligence System",
        "Predictive Analytics Dashboard",
        "Computer Vision Quality Control"
      ]
    },
    {
      domain: "Full-Stack Development & Architecture",
      description: "Comprehensive software architecture expertise spanning modern web technologies, scalable backend systems, and sophisticated frontend experiences.",
      experience: "4+ Years",
      icon: Code,
      gradient: "from-blue-600 to-cyan-700",
      borderColor: "border-blue-500/30",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "PostgreSQL", "MongoDB", "Docker"],
      achievements: [
        "Architected 20+ production applications",
        "Optimized system performance by 300%",
        "Led cross-functional development teams"
      ],
      keyProjects: [
        "Multi-tenant SaaS Platform",
        "Real-time Collaboration System",
        "E-commerce Management Suite"
      ]
    },
    {
      domain: "Cloud Infrastructure & DevOps",
      description: "Enterprise-grade cloud architecture and deployment strategies with expertise in scalable infrastructure, containerization, and automated deployment pipelines.",
      experience: "3+ Years",
      icon: Cloud,
      gradient: "from-emerald-600 to-teal-700",
      borderColor: "border-emerald-500/30",
      technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "Jenkins"],
      achievements: [
        "Managed infrastructure for 100K+ users",
        "Reduced deployment time by 80%",
        "Implemented zero-downtime deployments"
      ],
      keyProjects: [
        "Auto-scaling Microservices Architecture",
        "Multi-region Disaster Recovery",
        "Serverless Application Platform"
      ]
    },
    {
      domain: "Cybersecurity & Risk Management",
      description: "Comprehensive security leadership combining technical expertise in threat detection, vulnerability assessment, and enterprise security strategy implementation.",
      experience: "2+ Years",
      icon: Shield,
      gradient: "from-red-600 to-orange-700",
      borderColor: "border-red-500/30",
      technologies: ["SIEM", "Penetration Testing", "Vulnerability Assessment", "Security Frameworks", "Incident Response", "Risk Analysis"],
      achievements: [
        "Head of Cybersecurity Domain - GDG CKPCET",
        "Google Cybersecurity Certified",
        "Led security audits for multiple organizations"
      ],
      keyProjects: [
        "Enterprise Security Assessment",
        "Incident Response Framework",
        "Security Awareness Training Program"
      ]
    },
    {
      domain: "Technical Leadership & Strategy",
      description: "Proven expertise in leading technical teams, driving innovation initiatives, and translating complex technical concepts into strategic business value.",
      experience: "3+ Years",
      icon: Users,
      gradient: "from-purple-600 to-pink-700",
      borderColor: "border-purple-500/30",
      technologies: ["Team Leadership", "Agile/Scrum", "Project Management", "Technical Mentoring", "Strategic Planning", "Stakeholder Management"],
      achievements: [
        "Technical Head - Google Developer Group",
        "Led teams of 10+ developers",
        "Delivered $1M+ in technical projects"
      ],
      keyProjects: [
        "Developer Community Growth (1000+ members)",
        "Technical Workshop Series",
        "Open Source Initiative Leadership"
      ]
    }
  ]

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Executive Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-violet-600/5 via-violet-600/2 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-cyan-600/5 via-cyan-600/2 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-radial from-purple-600/3 to-transparent rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Professional geometric patterns */}
        <div className="absolute top-1/4 right-1/6 w-32 h-32 border border-border/10 rotate-12 rounded-2xl" />
        <div className="absolute bottom-1/3 left-1/8 w-24 h-24 border border-border/15 -rotate-45 rounded-xl" />
      </div>

      <div className="section-container relative">
        {/* Executive Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-2xl blur-xl" />
              <div className="relative p-4 bg-background/80 backdrop-blur-sm border border-border/30 rounded-2xl">
                <Target className="w-8 h-8 text-violet-600" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Core Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Strategic technology leadership combining deep technical expertise with proven business impact. 
            Specialized in building scalable systems, leading high-performance teams, and driving digital transformation.
          </p>
        </motion.div>

        {/* Executive Expertise Areas */}
        <div className="space-y-8">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <motion.div
                key={area.domain}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="group"
                onMouseEnter={() => setActiveArea(area.domain)}
                onMouseLeave={() => setActiveArea(null)}
              >
                <div className={`relative overflow-hidden bg-gradient-to-r from-background/40 via-background/60 to-background/40 backdrop-blur-sm border ${area.borderColor} rounded-2xl transition-all duration-500 ${activeArea === area.domain ? 'shadow-2xl scale-[1.02] border-opacity-60' : 'hover:shadow-xl'}`}>
                  {/* Executive Header */}
                  <div className="relative p-8 lg:p-10">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${area.gradient} rounded-2xl blur-xl opacity-60`} />
                        <div className={`relative p-4 bg-gradient-to-r ${area.gradient} rounded-2xl shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                            {area.domain}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-lg">
                            {area.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="font-medium">
                            {area.experience}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="w-4 h-4" />
                            <span>Enterprise-grade expertise</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="hidden lg:block">
                        <ArrowUpRight className={`w-6 h-6 text-muted-foreground transition-all duration-300 ${activeArea === area.domain ? 'text-foreground scale-125' : 'group-hover:text-foreground'}`} />
                      </div>
                    </div>
                  </div>

                  {/* Executive Details */}
                  <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Technology Stack */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Zap className="w-4 h-4 text-violet-600" />
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {area.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 + techIndex * 0.05 }}
                              className="px-3 py-1.5 bg-background/60 border border-border/40 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Key Achievements */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-600" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {area.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Notable Projects */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Star className="w-4 h-4 text-blue-600" />
                          Notable Projects
                        </h4>
                        <div className="space-y-3">
                          {area.keyProjects.map((project, projIndex) => (
                            <div key={projIndex} className="flex items-center gap-3 p-3 bg-background/30 border border-border/20 rounded-lg hover:border-border/40 transition-colors group/project">
                              <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full" />
                              <span className="text-sm font-medium text-muted-foreground group-hover/project:text-foreground transition-colors">
                                {project}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Professional Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-24"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-background/60 via-background/80 to-background/60 backdrop-blur-sm border border-border/30 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 via-purple-600/5 to-cyan-600/5" />
            
            <div className="relative p-8 lg:p-12">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-2xl blur-xl" />
                    <div className="relative p-3 bg-background/80 backdrop-blur-sm border border-border/30 rounded-2xl">
                      <Award className="w-7 h-7 text-violet-600" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                  Professional Recognition & Leadership
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Recognized expertise in technical leadership, community building, and driving innovation 
                  in technology organizations and academic institutions.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Technical Head - Google Developer Group",
                    organization: "GDG CKPCET",
                    period: "2023 - Present",
                    description: "Leading technical initiatives and community growth for 1000+ developers",
                    icon: Users,
                    color: "from-blue-600 to-cyan-600"
                  },
                  {
                    title: "Head of Cybersecurity Domain",
                    organization: "GDG CKPCET",
                    period: "2023 - Present",
                    description: "Spearheading cybersecurity education and research initiatives",
                    icon: Shield,
                    color: "from-red-600 to-orange-600"
                  },
                  {
                    title: "Google Cybersecurity Certificate",
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
