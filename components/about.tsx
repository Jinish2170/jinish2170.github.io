"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight, Code2, Shield, Brain, Users, Lightbulb, Target } from "lucide-react"
import Link from "next/link"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Code2 },
    { number: "3+", label: "Years Experience", icon: Target },
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
    "Full-Stack Development",
    "AI/ML Implementation",
    "Cybersecurity Solutions",
    "Cloud Architecture",
    "API Development",
    "System Security"
  ]

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Professional geometric patterns */}
        <div className="absolute top-1/4 right-1/6 w-32 h-32 border border-border/20 rotate-45 rounded-lg" />
        <div className="absolute bottom-1/3 left-1/8 w-24 h-24 border border-border/15 rotate-12 rounded-lg" />
        
        {/* Elegant gradient orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-radial from-blue-600/10 via-blue-600/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-radial from-purple-600/10 via-purple-600/5 to-transparent rounded-full blur-3xl" />
        
        {/* Minimalist dots */}
        <div className="absolute top-1/5 right-1/4 w-2 h-2 bg-blue-600/30 rounded-full" />
        <div className="absolute bottom-1/4 left-1/5 w-1 h-1 bg-purple-600/40 rounded-full" />
      </div>

      <div className="section-container relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="heading-lg mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="body-lg max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Passionate developer with expertise in AI, cybersecurity, and full-stack development. 
            Creating innovative solutions that bridge technology and real-world impact.
          </p>
        </motion.div>

        {/* Main About Content - Professional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Professional Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Sophisticated Visual Identity */}
              <div className="next-card p-8 bg-gradient-to-br from-background via-background/95 to-muted/20 border-2 border-border/50">
                {/* Professional Header */}
                <div className="text-center mb-8">
                  {/* Elegant Avatar Replacement */}
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl opacity-20" />
                    <div className="absolute inset-2 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl opacity-30" />
                    <div className="absolute inset-4 bg-gradient-to-br from-blue-400 via-purple-400 to-cyan-400 rounded-lg opacity-40" />
                    <div className="absolute inset-6 bg-gradient-to-br from-blue-300 via-purple-300 to-cyan-300 rounded-md opacity-50" />
                    <div className="absolute inset-8 bg-gradient-to-br from-blue-200 via-purple-200 to-cyan-200 rounded opacity-60" />
                    
                    {/* Central Professional Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Code2 className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="heading-md mb-2">Jinish Kathiriya</h3>
                  <p className="text-muted-foreground font-medium mb-2">Full-Stack Developer</p>
                  <p className="text-sm text-muted-foreground mb-6">AI/ML • Cybersecurity • Innovation</p>
                </div>

                {/* Expertise Tags */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="px-3 py-1.5 text-xs font-medium bg-muted/60 border border-border/50 rounded-full text-muted-foreground hover:bg-muted transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Professional Status */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Technical Head at GDG CKPCET</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>Cybersecurity Domain Leader</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Code2 className="w-4 h-4 text-cyan-600" />
                    <span>Full-Stack Solutions Architect</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side - Rich Typography & Professional Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h3 className="heading-lg mb-6 leading-tight">
                Building the Future with <span className="gradient-text">Code</span>
              </h3>
              
              <div className="space-y-6 body-md leading-relaxed text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  I'm a passionate developer specializing in <span className="text-foreground font-semibold">AI/ML</span>, 
                  <span className="text-foreground font-semibold"> cybersecurity</span>, and 
                  <span className="text-foreground font-semibold"> full-stack development</span>. 
                  With a strong foundation in computer science and years of hands-on experience, I create 
                  innovative solutions that bridge technology and real-world impact.
                </p>
                
                <p>
                  Currently serving as <span className="text-foreground font-semibold">Technical Head</span> at 
                  Google Developer Group (GDG) CKPCET and leading cybersecurity initiatives. I'm driven by 
                  the challenge of solving complex problems and the opportunity to make technology more secure and accessible.
                </p>
                
                <p>
                  My approach combines <span className="text-foreground font-medium">technical expertise</span> with 
                  <span className="text-foreground font-medium"> strategic thinking</span>, ensuring that every 
                  solution not only works flawlessly but also contributes to a more secure and innovative digital landscape.
                </p>
              </div>

              {/* Professional Highlights */}
              <div className="mt-8 p-6 bg-muted/30 border border-border/50 rounded-xl">
                <h4 className="font-semibold mb-4 text-foreground">Current Focus</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Leading GDG technical initiatives</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span>Developing AI-powered solutions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full" />
                    <span>Cybersecurity research & education</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span>Mentoring next-gen developers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#contact" className="flex-1">
                <Button className="btn-primary group w-full">
                  Let's Connect
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button variant="outline" className="btn-secondary group flex-1">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Resume
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="heading-md mb-4">Professional Impact</h3>
            <p className="body-lg max-w-2xl mx-auto text-muted-foreground">
              Measurable results from years of dedicated development and leadership.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="next-card p-6 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="heading-lg gradient-text mb-2">
                      {stat.number}
                    </div>
                    <div className="body-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Enhanced Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-16">
            <h3 className="heading-lg mb-6">Core Values</h3>
            <p className="body-lg max-w-3xl mx-auto text-muted-foreground leading-relaxed">
              The fundamental principles that guide my work, drive my passion for technology, 
              and shape every solution I create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                  className="group"
                >
                  <div className="next-card text-center h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <h4 className="heading-sm mb-4">{value.title}</h4>
                    <p className="body-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
