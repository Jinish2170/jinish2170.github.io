"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Download, Code2, Shield, Brain, Users, Lightbulb, Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import { downloadFile } from "@/utils/navigation"

const AboutPremium = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleResumeDownload = () => downloadFile();

  const stats = [
    { number: "35+", label: "Projects Completed", icon: Code2 },
    { number: "1+", label: "Years Experience", icon: Target },
    { number: "15+", label: "Technologies", icon: Brain },
    { number: "100%", label: "Dedication", icon: Shield }
  ]

  const values = [
    {
      title: "Innovation",
      description: "Always exploring cutting-edge technologies and creative solutions to complex problems.",
      icon: Lightbulb
    },
    {
      title: "Security First",
      description: "Prioritizing cybersecurity best practices in every project and solution I develop.",
      icon: Shield
    },
    {
      title: "Continuous Learning",
      description: "Committed to staying current with emerging technologies and industry trends.",
      icon: Brain
    }
  ]

  const expertise = [
    "GenAI Development",
    "Backend Systems",
    "Full-Stack Development",
    "AI/ML Implementation",
    "API Development",
    "Cloud Architecture"
  ]

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-xl mb-6">
            About <span className="gradient-text-premium">Me</span>
          </h2>
          <p className="body-lg max-w-3xl mx-auto text-muted-foreground">
            Passionate developer with expertise in GenAI, backend systems, and full-stack development. 
            Creating innovative solutions that bridge technology and real-world impact.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left Column - Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="premium-card p-8">
              {/* Profile Section */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-royal-500 to-gold-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">JK</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Jinish Kathiriya</h3>
                <p className="text-royal-500 font-medium">AI & ML Engineer</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="text-center p-4 bg-muted/30 rounded-xl"
                    >
                      <Icon className="w-5 h-5 text-royal-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>

              {/* CTA */}
              <Button 
                onClick={handleResumeDownload}
                className="btn-premium w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Bio */}
            <div className="premium-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a passionate developer and technology enthusiast currently pursuing Computer Science Engineering 
                at Gujarat Technological University. My journey spans across GenAI development, backend systems 
                engineering, and full-stack development.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As Technical Head at Google Developer Group (GDG CKPCET) and Cybersecurity Domain Lead, 
                I've led multiple initiatives that bridge the gap between academic learning and industry practices.
              </p>
            </div>

            {/* Core Values */}
            <div className="premium-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Core Values</h3>
              <div className="space-y-4">
                {values.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors duration-200"
                    >
                      <div className="p-2 bg-royal-500/10 rounded-lg">
                        <Icon className="w-5 h-5 text-royal-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="premium-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Core Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {expertise.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="px-4 py-2 bg-royal-500/10 text-royal-600 rounded-full text-sm font-medium hover:bg-royal-500/20 transition-colors duration-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPremium
