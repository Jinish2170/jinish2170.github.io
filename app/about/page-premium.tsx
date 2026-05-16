"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, MapPin, Mail, Github, Linkedin, Code2, Shield, Brain, Users, Award, BookOpen, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { downloadFile } from "@/utils/navigation"

const AboutPagePremium = () => {
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

  return (
    <main className="min-h-screen pt-24">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {/* Page Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-xl mb-6">
            About <span className="gradient-text-premium">Me</span>
          </h1>
          <p className="body-lg max-w-3xl mx-auto text-muted-foreground">
            Passionate developer and technology enthusiast with expertise in GenAI, 
            backend systems, and full-stack development.
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="heading-lg mb-10 text-center">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, index) => {
              const Icon = exp.icon
              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="premium-card p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="p-3 bg-royal-500/10 rounded-xl h-fit">
                      <Icon className="w-6 h-6 text-royal-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-royal-500 font-medium mb-3">{exp.company}</p>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-royal-500 rounded-full mt-1.5 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="heading-lg mb-10 text-center">Education</h2>
          {education.map((edu, index) => {
            const Icon = edu.icon
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="premium-card p-8"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="p-3 bg-gold-500/10 rounded-xl h-fit">
                    <Icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gold-500 font-medium mb-3">{edu.field} • {edu.institution}</p>
                    <p className="text-muted-foreground mb-2">GPA: {edu.gpa}</p>
                    <ul className="space-y-2">
                      {edu.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-1.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="premium-card p-12">
            <h3 className="heading-lg mb-4">Let's Work Together</h3>
            <p className="body-md text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear from you and discuss how we can collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-premium" asChild>
                <Link href="/#contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="btn-premium-outline" onClick={downloadFile}>
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default AboutPagePremium
