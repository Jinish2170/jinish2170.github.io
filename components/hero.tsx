"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Hero = () => {
  const [typedText, setTypedText] = useState("")
  const titles = ["AI & ML Engineer", "Cybersecurity Specialist", "Full-Stack Developer"]
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const canvasRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Current title being typed
      const currentTitle = titles[titleIndex]

      if (!isDeleting) {
        // Typing
        setTypedText(currentTitle.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)

        // If we've typed the full title
        if (charIndex >= currentTitle.length) {
          setIsDeleting(true)
          setTypingSpeed(100) // Faster when deleting
          setTimeout(() => {
            // Pause before starting to delete
          }, 1000)
        }
      } else {
        // Deleting
        setTypedText(currentTitle.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)

        // If we've deleted the full title
        if (charIndex <= 0) {
          setIsDeleting(false)
          setTypingSpeed(150) // Normal speed when typing
          setTitleIndex((titleIndex + 1) % titles.length) // Move to next title
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, titleIndex, titles, typingSpeed])

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = canvas.width / fontSize

    // Characters to display
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    // Array to track the y position of each column
    const drops = Array(Math.floor(columns)).fill(1)

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0" // Green text
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // x = i * fontSize, y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Randomly reset some drops to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-16 pb-8 relative">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" />

      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
            <span className="block">Hi, I&apos;m</span>
            <span className="tech-gradient text-5xl sm:text-6xl md:text-7xl block mt-2 glow-text">
              Jinish Kathiriya
            </span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 h-10 sm:h-12 md:h-14 flex justify-center items-center">
            <span className="mr-2">I&apos;m a</span>
            <span className="text-techBlue">{typedText}</span>
            <span className="typing-cursor"></span>
          </h2>
        </motion.div>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Passionate technologist focused on AI-powered security solutions, deep learning research, and ethical tech
          innovations.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90 text-white relative overflow-hidden group"
            asChild
          >
            <Link href="/projects">
              Explore My Projects
              <span className="absolute right-4 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4 ml-2" />
              </span>
            </Link>
          </Button>

          <Button size="lg" variant="outline" className="border-techBlue text-techBlue hover:bg-techBlue/10" asChild>
            <Link href="/resume/jinish-kathiriya-resume.pdf" download="Jinish_Kathiriya_Resume.pdf">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Link href="#about" aria-label="Scroll to About section">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-transparent animate-bounce"
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}

export default Hero
