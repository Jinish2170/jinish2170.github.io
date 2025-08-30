"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, MapPin, Mail, Phone, Github, Linkedin } from "lucide-react"
import Image from "next/image"
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ]

  const certifications = [
    {
      name: "Foundations of Cybersecurity",
      issuer: "Google",
      date: "2024",
      credentialId: "GCC-2024-CYB-001"
    },
    {
      name: "Advanced AI and Data Skills",
      issuer: "Industry Certification",
      date: "2024",
      credentialId: "AI-DS-2024-ADV"
    },
    {
      name: "Full-Stack Web Development",
      issuer: "Professional Certification",
      date: "2023",
      credentialId: "FSWD-2023-PRO"
    }
  ]

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
            
            <div className="two-column-grid">
              <div>
                <h1 className="heading-xl mb-6">
                  About <span className="gradient-text">Me</span>
                </h1>
                <p className="body-lg mb-8">
                  A passionate developer dedicated to creating innovative solutions that bridge 
                  technology and real-world impact. Specializing in AI/ML, cybersecurity, and 
                  full-stack development.
                </p>
                <div className="flex gap-4">
                  <Button className="btn-primary">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                  <Link href="#contact">
                    <Button variant="outline" className="btn-secondary">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-muted/20 border border-border/50">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Jinish Kathiriya"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="heading-lg mb-4">Professional Experience</h2>
            <p className="body-lg max-w-2xl">
              My journey in technology, leadership roles, and continuous learning.
            </p>
          </motion.div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="next-card"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="lg:w-1/3">
                    <h3 className="heading-sm">{exp.title}</h3>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                  <div className="lg:w-2/3">
                    <p className="body-md mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <div className="two-column-grid">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="heading-md mb-8">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="next-card">
                  <h3 className="heading-sm">{edu.degree}</h3>
                  <p className="text-muted-foreground font-medium mb-1">{edu.field}</p>
                  <p className="text-sm text-muted-foreground mb-2">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mb-4">{edu.period} • GPA: {edu.gpa}</p>
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="heading-md mb-8">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="next-card">
                    <h3 className="heading-sm">{cert.name}</h3>
                    <p className="text-muted-foreground font-medium">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground">{cert.date}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      ID: {cert.credentialId}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding relative z-10">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="heading-lg mb-8">Let's Connect</h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="body-md">jinishkathiriya2170@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="body-md">Gujarat, India</span>
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <Link href="https://github.com/Jinish2170" target="_blank" className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/in/jinish-kathiriya" target="_blank" className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
