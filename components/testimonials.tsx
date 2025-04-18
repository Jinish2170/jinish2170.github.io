"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef(null)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const testimonials = [
    {
      quote:
        "Jinish's expertise in AI and cybersecurity is truly exceptional. His ability to develop innovative solutions to complex security challenges has been invaluable to our organization. He consistently delivers results that exceed expectations and has a remarkable talent for explaining complex concepts in accessible terms.",
      author: "Dr. Sarah Chen",
      title: "CTO, TechSecure Solutions",
      image: "/placeholder.svg?height=100&width=100",
      company: "TechSecure Solutions",
      relationship: "Client",
      project: "AI-Powered Threat Detection System",
    },
    {
      quote:
        "Working with Jinish on our AI-powered security platform was a game-changer. His deep understanding of both machine learning and cybersecurity allowed us to create a truly revolutionary product. His approach to problem-solving is methodical and creative, and he has an uncanny ability to anticipate potential issues before they arise.",
      author: "Michael Rodriguez",
      title: "Lead Developer, CyberDefense Labs",
      image: "/placeholder.svg?height=100&width=100",
      company: "CyberDefense Labs",
      relationship: "Collaborator",
      project: "Neural Network Security Framework",
    },
    {
      quote:
        "Jinish's research on neural network security has made significant contributions to our field. His innovative approaches to identifying vulnerabilities in AI systems have set new standards in the industry. Beyond his technical brilliance, Jinish is an excellent communicator and team player who elevates everyone around him.",
      author: "Prof. James Wilson",
      title: "Stanford University",
      image: "/placeholder.svg?height=100&width=100",
      company: "Stanford University",
      relationship: "Academic Advisor",
      project: "Quantum-Resistant Cryptography Research",
    },
    {
      quote:
        "I've had the pleasure of working with many talented engineers, but Jinish stands out for his unique combination of technical depth and breadth. He doesn't just solve problems—he redefines them in ways that lead to more elegant and effective solutions. His work on our secure data platform transformed our approach to privacy and security.",
      author: "Emma Thompson",
      title: "VP of Engineering, DataSecure Inc.",
      image: "/placeholder.svg?height=100&width=100",
      company: "DataSecure Inc.",
      relationship: "Client",
      project: "Enterprise Data Security Platform",
    },
    {
      quote:
        "Jinish brings a rare combination of theoretical knowledge and practical implementation skills to every project. His contributions to our quantum cryptography initiative were instrumental in its success. He has a gift for translating cutting-edge research into practical applications that solve real-world problems.",
      author: "Dr. Robert Chang",
      title: "Research Director, Quantum Security Institute",
      image: "/placeholder.svg?height=100&width=100",
      company: "Quantum Security Institute",
      relationship: "Research Partner",
      project: "Post-Quantum Cryptography Standards",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    resetAutoplay()
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    resetAutoplay()
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
    resetAutoplay()
  }

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (autoplay) {
        autoplayRef.current = setInterval(nextTestimonial, 8000)
      }
    }
  }

  useEffect(() => {
    if (autoplay && inView) {
      autoplayRef.current = setInterval(nextTestimonial, 8000)
    } else if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, inView])

  return (
    <section id="testimonials" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Client <span className="tech-gradient">Testimonials</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Feedback from clients and collaborators about their experiences working with me on various projects.
          </p>
        </motion.div>

        <div className="relative">
          <Card className="bg-gray-900/30 border border-gray-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="absolute top-6 left-6 text-techPurple opacity-20">
                <Quote className="h-20 w-20" />
              </div>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                  >
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-techBlue/30 mb-4">
                        <Image
                          src={testimonials[currentIndex].image || "/placeholder.svg"}
                          alt={testimonials[currentIndex].author}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold">{testimonials[currentIndex].author}</h3>
                        <p className="text-gray-400">{testimonials[currentIndex].title}</p>

                        <div className="mt-4 space-y-1">
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">Company:</span>
                            <span className="text-gray-300">{testimonials[currentIndex].company}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">Relationship:</span>
                            <span className="text-gray-300">{testimonials[currentIndex].relationship}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">Project:</span>
                            <span className="text-gray-300">{testimonials[currentIndex].project}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-lg text-gray-300 italic relative">
                        <span className="text-4xl text-techPurple absolute -left-4 -top-2">"</span>
                        {testimonials[currentIndex].quote}
                        <span className="text-4xl text-techPurple absolute -right-4 -bottom-2">"</span>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-techPurple w-6" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoplay(!autoplay)}
              className="text-sm text-gray-400 hover:text-white"
            >
              {autoplay ? "Pause Autoplay" : "Enable Autoplay"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
