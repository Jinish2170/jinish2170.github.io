"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { BrainCircuit, ShieldCheck, Zap, Atom } from "lucide-react"

const Research = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const researchAreas = [
    {
      title: "Neural Network Security Research",
      icon: <BrainCircuit className="h-10 w-10 text-techBlue" />,
      description:
        "Investigating vulnerabilities in neural networks and developing robust architectures resistant to adversarial attacks.",
    },
    {
      title: "AI-powered Threat Intelligence",
      icon: <ShieldCheck className="h-10 w-10 text-techPurple" />,
      description:
        "Creating advanced systems that leverage AI to predict, identify, and neutralize emerging cyber threats in real-time.",
    },
    {
      title: "Zero-day Vulnerability Detection",
      icon: <Zap className="h-10 w-10 text-techGreen" />,
      description:
        "Developing methodologies and tools to discover previously unknown vulnerabilities in software and systems.",
    },
    {
      title: "Quantum-resistant Cryptography",
      icon: <Atom className="h-10 w-10 text-techBlue" />,
      description:
        "Researching and implementing cryptographic algorithms that can withstand attacks from quantum computers.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="research" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Research <span className="tech-gradient">Areas</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            My current research focuses on advancing the frontiers of AI and cybersecurity, with an emphasis on
            developing innovative solutions to complex problems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {researchAreas.map((area, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 card-hover h-full">
                <CardContent className="p-6 flex flex-col md:flex-row items-start gap-4">
                  <div className="p-3 rounded-full bg-gray-800/50 flex-shrink-0">{area.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                    <p className="text-gray-400">{area.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6">Research Philosophy</h3>
          <div className="max-w-3xl mx-auto bg-gray-900/30 border border-gray-800 rounded-lg p-6">
            <p className="text-gray-300 italic">
              "My research is driven by the belief that the most effective security solutions emerge at the intersection
              of artificial intelligence and cybersecurity. By combining these disciplines, we can create systems that
              not only detect and respond to threats but anticipate and prevent them."
            </p>
            <p className="mt-4 text-right text-techBlue font-medium">— Jinish Kathiriya</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Research
