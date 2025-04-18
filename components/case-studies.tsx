"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, ChevronLeft, ExternalLink, Github, FileText, Lightbulb, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const CaseStudies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentCase, setCurrentCase] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  const caseStudies = [
    {
      title: "AI-Powered Threat Detection System",
      subtitle: "Enterprise Security Solution",
      description:
        "Developed an advanced threat detection system using machine learning to identify and neutralize cyber threats in real-time.",
      image: "/placeholder.svg?height=600&width=800",
      category: "AI & Cybersecurity",
      duration: "6 months",
      client: "TechSecure Solutions",
      role: "Lead AI Engineer",
      technologies: ["Python", "TensorFlow", "Cybersecurity APIs", "Docker", "Kubernetes"],
      overview:
        "This project involved creating a comprehensive security solution that leverages artificial intelligence to detect, analyze, and respond to cyber threats in real-time. The system continuously learns from new attack patterns and adapts its defense mechanisms accordingly.",
      challenge:
        "The main challenge was developing algorithms that could identify previously unknown (zero-day) threats while maintaining a low false positive rate. Additionally, the system needed to operate efficiently in high-traffic enterprise environments without introducing latency.",
      solution:
        "We implemented a hybrid approach combining signature-based detection with anomaly detection using deep learning. This allowed the system to identify known threats quickly while also detecting unusual patterns that might indicate new attack vectors. We also developed a distributed architecture that could scale horizontally to handle increasing traffic loads.",
      results: [
        "97% detection rate for previously unknown threats",
        "Reduced false positives by 82% compared to traditional solutions",
        "50% faster threat response time",
        "Successfully deployed across 12 enterprise clients",
      ],
      testimonial: {
        quote:
          "This AI-powered system has transformed our security operations. We're now able to detect and respond to threats that would have previously gone unnoticed.",
        author: "Sarah Chen",
        position: "CISO, Global Financial Services",
      },
      links: {
        github: "https://github.com/Jinish2170/BenardAI",
        demo: "#",
        case: "#",
      },
    },
    {
      title: "Quantum-Resistant Cryptography Implementation",
      subtitle: "Next-Generation Security Protocol",
      description:
        "Researched and implemented post-quantum cryptographic algorithms to protect sensitive data against future quantum computing threats.",
      image: "/placeholder.svg?height=600&width=800",
      category: "Cryptography & Security",
      duration: "8 months",
      client: "Government Research Lab",
      role: "Cryptography Specialist",
      technologies: ["C++", "Python", "Lattice-based Cryptography", "Hash-based Signatures", "Quantum Simulation"],
      overview:
        "This project focused on developing and implementing cryptographic protocols that can withstand attacks from quantum computers, which threaten many current encryption standards. The solution needed to be efficient enough for practical deployment while providing strong security guarantees.",
      challenge:
        "Quantum-resistant algorithms typically require more computational resources than traditional cryptography. The challenge was to optimize these algorithms for real-world use without compromising their security properties or making implementation too complex for widespread adoption.",
      solution:
        "We selected and optimized a combination of lattice-based encryption and hash-based signature schemes, which offer the best balance of security and performance. We then created a comprehensive library that allows easy integration with existing systems, along with detailed documentation and examples.",
      results: [
        "Successfully implemented 3 quantum-resistant algorithms",
        "Achieved 40% performance improvement over reference implementations",
        "Created a library now used by 5 government agencies",
        "Published research paper in top cryptography conference",
      ],
      testimonial: {
        quote:
          "The quantum-resistant cryptography solution developed by Jinish has positioned us years ahead of potential threats. The implementation is remarkably efficient and practical for our sensitive operations.",
        author: "Dr. Michael Rodriguez",
        position: "Director of Cybersecurity Research",
      },
      links: {
        github: "https://github.com/Jinish2170/quantum-crypto",
        demo: "#",
        case: "#",
      },
    },
    {
      title: "Neural Network Security Framework",
      subtitle: "AI Model Protection System",
      description:
        "Developed a framework to protect machine learning models against adversarial attacks and data poisoning attempts.",
      image: "/placeholder.svg?height=600&width=800",
      category: "AI Security",
      duration: "5 months",
      client: "AI Research Institute",
      role: "AI Security Researcher",
      technologies: ["Python", "PyTorch", "TensorFlow", "Adversarial ML", "Differential Privacy"],
      overview:
        "As AI systems become more prevalent, they also become targets for attacks. This project created a comprehensive framework for hardening neural networks against various attack vectors, including adversarial examples, model inversion, and training data poisoning.",
      challenge:
        "Securing AI models involves fundamental trade-offs between accuracy, robustness, and privacy. The challenge was to develop defense mechanisms that preserve model performance while providing strong security guarantees against sophisticated attacks.",
      solution:
        "We developed a multi-layered defense approach that combines adversarial training, input preprocessing, model distillation, and differential privacy techniques. The framework includes tools for vulnerability assessment, attack simulation, and continuous monitoring of deployed models.",
      results: [
        "Reduced vulnerability to adversarial examples by 85%",
        "Prevented model inversion attacks with minimal impact on accuracy",
        "Created comprehensive documentation and testing suite",
        "Framework adopted by 3 major research institutions",
      ],
      testimonial: {
        quote:
          "Jinish's neural network security framework has become an essential component of our AI development pipeline. It gives us confidence that our models are protected against the full spectrum of known attacks.",
        author: "Prof. James Wilson",
        position: "Lead AI Researcher",
      },
      links: {
        github: "https://github.com/Jinish2170/neural-shield",
        demo: "#",
        case: "#",
      },
    },
  ]

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % caseStudies.length)
    setActiveTab("overview")
  }

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
    setActiveTab("overview")
  }

  const currentCaseStudy = caseStudies[currentCase]

  return (
    <section id="case-studies" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Case <span className="tech-gradient">Studies</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Detailed explorations of selected projects that showcase my problem-solving approach and technical
            expertise.
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevCase}
            className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex space-x-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCase(index)
                  setActiveTab("overview")
                }}
                className={`w-3 h-3 rounded-full ${index === currentCase ? "bg-techBlue" : "bg-gray-600"}`}
                aria-label={`Go to case study ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextCase}
            className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-900/30 border border-gray-800 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                    <Image
                      src={currentCaseStudy.image || "/placeholder.svg"}
                      alt={currentCaseStudy.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                      <span className="text-sm font-medium px-3 py-1 bg-techBlue/30 text-techBlue rounded-full w-fit mb-3">
                        {currentCaseStudy.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-2">{currentCaseStudy.title}</h3>
                      <p className="text-gray-300 mb-4">{currentCaseStudy.subtitle}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {currentCaseStudy.technologies.slice(0, 5).map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs bg-black/50 text-gray-300 px-2 py-1 rounded-md border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="challenge">Challenge & Solution</TabsTrigger>
                        <TabsTrigger value="results">Results</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-0 space-y-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm text-gray-400 mb-1">Client</h4>
                            <p className="font-medium">{currentCaseStudy.client}</p>
                          </div>
                          <div>
                            <h4 className="text-sm text-gray-400 mb-1">Duration</h4>
                            <p className="font-medium flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-techPurple" />
                              {currentCaseStudy.duration}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm text-gray-400 mb-1">Role</h4>
                            <p className="font-medium">{currentCaseStudy.role}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium mb-2">Project Overview</h4>
                          <p className="text-gray-300">{currentCaseStudy.overview}</p>
                        </div>

                        {currentCaseStudy.testimonial && (
                          <div className="bg-gray-800/50 p-4 rounded-lg border-l-4 border-techBlue mt-4">
                            <p className="italic text-gray-300 mb-2">"{currentCaseStudy.testimonial.quote}"</p>
                            <p className="text-sm text-right">
                              <span className="font-medium text-white">{currentCaseStudy.testimonial.author}</span>
                              <span className="text-gray-400"> — {currentCaseStudy.testimonial.position}</span>
                            </p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="challenge" className="mt-0 space-y-6">
                        <div>
                          <h4 className="text-lg font-medium flex items-center text-techPurple mb-2">
                            <Lightbulb className="h-5 w-5 mr-2" /> The Challenge
                          </h4>
                          <p className="text-gray-300">{currentCaseStudy.challenge}</p>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium flex items-center text-techGreen mb-2">
                            <CheckCircle className="h-5 w-5 mr-2" /> The Solution
                          </h4>
                          <p className="text-gray-300">{currentCaseStudy.solution}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <h4 className="text-sm text-gray-400 w-full mb-2">Technologies Used:</h4>
                          {currentCaseStudy.technologies.map((tech, index) => (
                            <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="results" className="mt-0">
                        <h4 className="text-lg font-medium mb-4">Key Results</h4>
                        <ul className="space-y-3">
                          {currentCaseStudy.results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-6 w-6 rounded-full bg-techBlue/20 flex items-center justify-center mr-3 mt-0.5">
                                <span className="text-techBlue text-xs">{index + 1}</span>
                              </div>
                              <span className="text-gray-300">{result}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-4 mt-8">
                          {currentCaseStudy.links.github && (
                            <Button
                              variant="outline"
                              className="border-techBlue text-techBlue hover:bg-techBlue/10"
                              asChild
                            >
                              <Link href={currentCaseStudy.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" /> View Code
                              </Link>
                            </Button>
                          )}

                          {currentCaseStudy.links.demo && (
                            <Button className="bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90" asChild>
                              <Link href={currentCaseStudy.links.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                              </Link>
                            </Button>
                          )}

                          {currentCaseStudy.links.case && (
                            <Button
                              variant="outline"
                              className="border-techGreen text-techGreen hover:bg-techGreen/10"
                              asChild
                            >
                              <Link href={currentCaseStudy.links.case} target="_blank" rel="noopener noreferrer">
                                <FileText className="mr-2 h-4 w-4" /> Full Case Study
                              </Link>
                            </Button>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default CaseStudies
