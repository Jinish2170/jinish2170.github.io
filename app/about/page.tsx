"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, MapPin, Mail, Github, Linkedin, Code2, Shield, Brain, Users, Lightbulb, Target, Award, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"

const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experience = [
    {
      title: "Technical Head",
      company: "Google Developer Group (GDG), CKPCET",
      period: "2023 - Present",
      description: "Leading technical initiatives, organizing developer events, and mentoring students in modern web technologies and AI/ML.",
      achievements: [
        "Organized 15+ technical workshops reaching 500+ students",
        "Led cybersecurity awareness campaigns",
        "Mentored 50+ developers in career growth"
      ],
      icon: Users
    },
    {
      title: "Head of Cybersecurity Domain",
      company: "GDG CKPCET",
      period: "2023 - Present", 
      description: "Spearheading cybersecurity education and awareness programs while developing security-focused projects.",
      achievements: [
        "Developed comprehensive security training curriculum",
        "Created hands-on penetration testing labs",
        "Built security assessment tools"
      ],
      icon: Shield
    },
    {
      title: "Full-Stack Developer",
      company: "Freelance",
      period: "2022 - Present",
      description: "Building scalable web applications and AI-powered solutions for diverse clients across multiple industries.",
      achievements: [
        "Delivered 25+ successful projects",
        "Maintained 98% client satisfaction rate",
        "Specialized in MERN stack and AI integration"
      ],
      icon: Code2
    }
  ]

  const education = [
    {
      degree: "Bachelor of Engineering",
      field: "Computer Engineering",
      institution: "CKPCET, Gujarat",
      period: "2021 - 2025",
      gpa: "8.5/10",
      highlights: [
        "Specialized in AI/ML and Cybersecurity",
        "Active member of coding and robotics clubs",
        "Led multiple technical projects and hackathons"
      ],
      icon: BookOpen
    }
  ]

  const certifications = [
    {
      name: "Foundations of Cybersecurity",
      issuer: "Google",
      date: "2024",
      credentialId: "GCC-2024-CYB-001",
      icon: Shield
    },
    {
      name: "Advanced AI and Data Skills",
      issuer: "Industry Certification",
      date: "2024",
      credentialId: "AI-DS-2024-ADV",
      icon: Brain
    },
    {
      name: "Full-Stack Web Development",
      issuer: "Professional Certification",
      date: "2023",
      credentialId: "FSWD-2023-PRO",
      icon: Code2
    }
  ]

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
    { category: "AI/ML", items: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API"] },
    { category: "Security", items: ["Penetration Testing", "Vulnerability Assessment", "Security Auditing"] },
    { category: "Cloud", items: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
    { category: "Tools", items: ["Git", "Figma", "Postman", "Linux"] }
  ]

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Professional Background */}
      <div className="fixed inset-0 -z-10">
        {/* Sophisticated base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/5" />
        
        {/* Professional grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
        
        {/* Architectural elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Professional geometric shapes */}
          <div className="absolute top-1/4 right-1/6 w-40 h-40 border border-border/15 rotate-45 rounded-2xl" />
          <div className="absolute bottom-1/3 left-1/8 w-32 h-32 border border-border/20 rotate-12 rounded-xl" />
          <div className="absolute top-2/3 right-1/3 w-24 h-24 border border-border/10 -rotate-12 rounded-lg" />
          
          {/* Elegant connecting lines */}
          <div className="absolute top-1/5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
          <div className="absolute bottom-1/5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/15 to-transparent" />
          
          {/* Professional dots */}
          <div className="absolute top-1/6 right-1/5 w-3 h-3 bg-blue-600/20 rounded-full" />
          <div className="absolute top-3/5 left-1/6 w-2 h-2 bg-purple-600/25 rounded-full" />
          <div className="absolute bottom-1/6 right-2/5 w-4 h-4 bg-cyan-600/15 rounded-full" />
        </div>
        
        {/* Sophisticated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-600/8 via-blue-600/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-600/8 via-purple-600/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-cyan-600/6 via-cyan-600/3 to-transparent rounded-full blur-2xl" />
        
        {/* Premium texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Enhanced Hero Section */}
      <section className="section-padding pt-24 relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-12 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Professional Content */}
              <div className="lg:col-span-7">
                <h1 className="heading-xl mb-8">
                  About <span className="gradient-text">Me</span>
                </h1>
                <div className="space-y-6 body-lg text-muted-foreground leading-relaxed">
                  <p className="text-xl leading-relaxed">
                    A passionate developer dedicated to creating <span className="text-foreground font-semibold">innovative solutions</span> that bridge 
                    technology and real-world impact. Specializing in <span className="text-foreground font-semibold">AI/ML</span>, 
                    <span className="text-foreground font-semibold"> cybersecurity</span>, and 
                    <span className="text-foreground font-semibold"> full-stack development</span>.
                  </p>
                  <p>
                    Currently serving as <span className="text-foreground font-semibold">Technical Head</span> at Google Developer Group (GDG) CKPCET, 
                    I lead technical initiatives that shape the next generation of developers. My work spans from building secure, 
                    scalable applications to conducting cybersecurity research and education.
                  </p>
                  <p>
                    With a foundation in computer engineering and hands-on experience in emerging technologies, 
                    I'm committed to making technology more accessible, secure, and impactful for everyone.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Button className="btn-primary group">
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Download Resume
                  </Button>
                  <Link href="#contact">
                    <Button variant="outline" className="btn-secondary">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Professional Identity Visual */}
              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="next-card p-8 bg-gradient-to-br from-background via-background/95 to-muted/10">
                    {/* Professional Visual Identity */}
                    <div className="text-center mb-8">
                      <div className="relative mx-auto w-40 h-40 mb-6">
                        {/* Sophisticated layered design */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl opacity-20" />
                        <div className="absolute inset-3 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl opacity-30" />
                        <div className="absolute inset-6 bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 rounded-xl opacity-40" />
                        <div className="absolute inset-9 bg-gradient-to-br from-blue-300 via-purple-300 to-cyan-300 rounded-lg opacity-50" />
                        
                        {/* Central professional icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                            <Code2 className="w-10 h-10 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <h2 className="heading-md mb-2">Jinish Kathiriya</h2>
                      <p className="text-muted-foreground font-semibold mb-2">Full-Stack Developer & Tech Leader</p>
                      <p className="text-sm text-muted-foreground">AI/ML • Cybersecurity • Innovation</p>
                    </div>

                    {/* Key Skills Preview */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Core Expertise</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-600/20 rounded-lg">
                            <Code2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm">Full-Stack Development</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-600/20 rounded-lg">
                            <Brain className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm">AI/ML Implementation</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-cyan-600/20 rounded-lg">
                            <Shield className="w-4 h-4 text-cyan-600" />
                          </div>
                          <span className="text-sm">Cybersecurity Solutions</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-600/20 rounded-lg">
                            <Users className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm">Technical Leadership</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg mb-6">Technical Expertise</h2>
            <p className="body-lg max-w-3xl mx-auto text-muted-foreground">
              A comprehensive skill set spanning modern web technologies, AI/ML frameworks, and cybersecurity tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="next-card group hover:shadow-lg transition-all duration-300"
              >
                <h3 className="heading-sm mb-4 text-center">{skillGroup.category}</h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skill} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="heading-lg mb-6">Professional Experience</h2>
            <p className="body-lg max-w-3xl mx-auto text-muted-foreground">
              My journey in technology leadership, from hands-on development to mentoring the next generation of developers.
            </p>
          </motion.div>

          <div className="space-y-12">
            {experience.map((exp, index) => {
              const Icon = exp.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="next-card hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                      <div className="lg:w-1/3">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="heading-sm">{exp.title}</h3>
                            <p className="text-muted-foreground font-medium">{exp.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <p className="body-md mb-6 leading-relaxed">{exp.description}</p>
                        <div>
                          <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Key Achievements</h4>
                          <ul className="space-y-3">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0" />
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Education & Certifications */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="heading-lg">Education</h2>
              </div>
              
              {education.map((edu, index) => (
                <div key={index} className="next-card hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="heading-sm mb-1">{edu.degree}</h3>
                      <p className="text-muted-foreground font-semibold mb-1">{edu.field}</p>
                      <p className="text-sm text-muted-foreground mb-2">{edu.institution}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>GPA: {edu.gpa}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Academic Highlights</h4>
                    <ul className="space-y-3">
                      {edu.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="heading-lg">Certifications</h2>
              </div>
              
              <div className="space-y-6">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon
                  return (
                    <div key={index} className="next-card hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-xl group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="heading-sm mb-2">{cert.name}</h3>
                          <p className="text-muted-foreground font-medium mb-1">{cert.issuer}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar className="w-3 h-3" />
                            <span>{cert.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                            ID: {cert.credentialId}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Information */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-lg mb-8">Let's Connect</h2>
              <p className="body-lg text-muted-foreground mb-12 leading-relaxed">
                Ready to collaborate on innovative projects or discuss technology? 
                I'm always excited to connect with fellow developers, entrepreneurs, and visionaries.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="next-card p-8 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="heading-sm mb-2">Email</h3>
                  <p className="text-muted-foreground">jinishkathiriya2170@gmail.com</p>
                </div>
                
                <div className="next-card p-8 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-2xl group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <h3 className="heading-sm mb-2">Location</h3>
                  <p className="text-muted-foreground">Gujarat, India</p>
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <Link 
                  href="https://github.com/Jinish2170" 
                  target="_blank" 
                  className="group"
                >
                  <div className="p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <Github className="h-6 w-6" />
                  </div>
                </Link>
                <Link 
                  href="https://linkedin.com/in/jinish-kathiriya" 
                  target="_blank"
                  className="group"
                >
                  <div className="p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <Linkedin className="h-6 w-6" />
                  </div>
                </Link>
              </div>
              
              <div className="mt-12 p-8 bg-gradient-to-br from-muted/30 via-muted/20 to-transparent border border-border/50 rounded-2xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <h3 className="heading-sm mb-3">Open for Opportunities</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Currently exploring new opportunities in full-stack development, AI/ML engineering, 
                  and cybersecurity roles. Let's discuss how we can build something amazing together.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
