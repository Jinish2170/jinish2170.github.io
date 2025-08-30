"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import Lucide icons to reduce initial bundle size
const ArrowRight = dynamic(() => import("lucide-react").then(mod => mod.ArrowRight))
const Download = dynamic(() => import("lucide-react").then(mod => mod.Download))
const Github = dynamic(() => import("lucide-react").then(mod => mod.Github))
const Linkedin = dynamic(() => import("lucide-react").then(mod => mod.Linkedin))
const Mail = dynamic(() => import("lucide-react").then(mod => mod.Mail))

const Hero = () => {
  const [currentTitle, setCurrentTitle] = useState(0)
  
  const titles = [
    "AI & ML Engineer",
    "Full-Stack Developer", 
    "Cybersecurity Specialist"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [titles.length])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume/JinishKathiriya_fullstack.pdf'
    link.download = 'JinishKathiriya_Resume.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Enhanced hero elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {/* Animated accent elements specific to hero section */}
        <div className="absolute top-1/3 right-[15%] w-24 h-24">
          <div className="absolute inset-0 border border-blue-500/20 dark:border-blue-600/30 rounded-full" 
               style={{ animation: 'pulseLight 8s ease-in-out infinite' }} />
          <div className="absolute inset-4 border border-blue-500/15 dark:border-blue-600/25 rounded-full" 
               style={{ animation: 'pulseLight 12s ease-in-out infinite reverse' }} />
          <div className="absolute inset-8 border border-blue-500/10 dark:border-blue-600/20 rounded-full" 
               style={{ animation: 'pulseLight 10s ease-in-out infinite' }} />
        </div>

        <div className="absolute bottom-1/3 left-[20%] w-16 h-16">
          <div className="absolute inset-0 border border-purple-500/20 dark:border-purple-600/30 rounded-full" 
               style={{ animation: 'pulseLight 9s ease-in-out infinite reverse' }} />
          <div className="absolute inset-3 border border-purple-500/15 dark:border-purple-600/25 rounded-full" 
               style={{ animation: 'pulseLight 13s ease-in-out infinite' }} />
          <div className="absolute inset-6 border border-purple-500/10 dark:border-purple-600/20 rounded-full" 
               style={{ animation: 'pulseLight 11s ease-in-out infinite reverse' }} />
        </div>

        {/* Light accent beams */}
        <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-600/25 to-transparent"
             style={{ animation: 'slideRight 15s ease-in-out infinite alternate' }} />
             
        <div className="absolute top-[60%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 dark:via-purple-600/25 to-transparent"
             style={{ animation: 'slideLeft 18s ease-in-out infinite alternate' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Intro Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-muted-foreground">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="heading-xl mb-4">
              Hi, I'm{" "}
              <span className="inline-block relative">
                <span className="gradient-text relative z-10">
                  Jinish Kathiriya
                </span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" 
                  initial={{ width: 0, left: "50%", right: "50%" }}
                  animate={{ width: "100%", left: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                />
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg -z-10" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.5 }}
                />
              </span>
            </h1>
            
            {/* Enhanced Animated Role */}
            <div className="h-16 flex items-center justify-center overflow-hidden">
              <h2 className="heading-md relative">
                <span className="text-muted-foreground mr-2">I'm a</span>
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className={`absolute inline-flex items-center relative ${index === currentTitle ? 'opacity-100' : 'opacity-0'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: index === currentTitle ? 1 : 0,
                      y: index === currentTitle ? 0 : 10 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg max-w-2xl mx-auto mb-12"
          >
            Passionate about building intelligent solutions that bridge technology and real-world impact. 
            Specialized in AI/ML, cybersecurity, and full-stack development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="#projects">
              <Button size="lg" className="btn-primary group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleDownload}
              className="btn-secondary group"
            >
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            <Link 
              href="https://github.com/Jinish2170" 
              target="_blank"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
            </Link>
            
            <Link 
              href="https://linkedin.com/in/jinish-kathiriya" 
              target="_blank"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
            </Link>
            
            <Link 
              href="mailto:jinishkathiriya2170@gmail.com"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-muted-foreground">
          <span className="text-sm mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-foreground rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
