"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar, Users, Award, ExternalLink } from "lucide-react"
import Link from "next/link"

const Publications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const publications = [
    {
      title: "Adversarial Robustness in Neural Networks: A Comprehensive Approach",
      journal: "Journal of Artificial Intelligence Research",
      date: "June 2024",
      authors: ["Jinish Kathiriya", "Sarah Chen", "Michael Rodriguez"],
      abstract:
        "This paper presents a novel framework for enhancing the robustness of neural networks against adversarial attacks. We introduce a multi-layered defense mechanism that combines adversarial training, input preprocessing, and model distillation techniques to create resilient AI systems. Our approach demonstrates significant improvements in model robustness while maintaining high accuracy on clean data.",
      keywords: ["Adversarial Machine Learning", "Neural Networks", "AI Security", "Robust AI"],
      link: "#",
      citations: 24,
      award: "Best Paper Award at ICML 2024",
    },
    {
      title: "Quantum-Resistant Cryptographic Protocols for Secure Communications",
      journal: "IEEE Transactions on Information Security",
      date: "March 2024",
      authors: ["Jinish Kathiriya", "Robert Chang", "Elena Petrova"],
      abstract:
        "As quantum computing advances threaten traditional cryptographic systems, this research introduces a suite of post-quantum cryptographic protocols designed to withstand attacks from quantum computers. We present optimized implementations of lattice-based and hash-based schemes, with comprehensive security analyses and performance benchmarks across various platforms.",
      keywords: [
        "Post-Quantum Cryptography",
        "Lattice-based Cryptography",
        "Hash-based Signatures",
        "Quantum Security",
      ],
      link: "#",
      citations: 18,
      award: null,
    },
    {
      title: "Zero-Day Vulnerability Detection Using Deep Learning",
      journal: "ACM Transactions on Privacy and Security",
      date: "November 2023",
      authors: ["Jinish Kathiriya", "James Wilson", "David Kim"],
      abstract:
        "This research introduces a novel approach to detecting previously unknown (zero-day) vulnerabilities in software systems using deep learning techniques. By analyzing code patterns, execution flows, and system behaviors, our model can identify potential security weaknesses that traditional static and dynamic analysis tools miss. Evaluation on real-world software demonstrates a significant improvement in vulnerability detection rates.",
      keywords: ["Zero-day Vulnerabilities", "Deep Learning", "Software Security", "Vulnerability Detection"],
      link: "#",
      citations: 32,
      award: "Distinguished Paper Award at USENIX Security 2023",
    },
    {
      title: "Secure Federated Learning: Privacy-Preserving Collaborative AI",
      journal: "Nature Machine Intelligence",
      date: "August 2023",
      authors: ["Jinish Kathiriya", "Emma Thompson", "Alex Johnson"],
      abstract:
        "Federated learning enables collaborative model training without sharing raw data, but remains vulnerable to privacy leakage and poisoning attacks. This paper presents a comprehensive security framework for federated learning systems that addresses these challenges through differential privacy, secure aggregation protocols, and Byzantine-robust aggregation methods. Our approach enables secure collaboration even in the presence of malicious participants.",
      keywords: ["Federated Learning", "Privacy-Preserving AI", "Secure Aggregation", "Differential Privacy"],
      link: "#",
      citations: 45,
      award: null,
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
    <section id="publications" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Publications & <span className="tech-gradient">Research</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            My contributions to academic research and industry publications in AI, cybersecurity, and related fields.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {publications.map((publication, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-lg">
                      <FileText className="h-8 w-8 text-techBlue" />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <h3 className="text-xl font-bold">{publication.title}</h3>

                        {publication.award && (
                          <span className="px-3 py-1 bg-techPurple/20 text-techPurple rounded-full text-sm flex items-center whitespace-nowrap">
                            <Award className="h-4 w-4 mr-1" /> {publication.award}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm">
                        <div className="flex items-center text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" /> {publication.date}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Users className="h-4 w-4 mr-1" /> {publication.authors.join(", ")}
                        </div>
                        <div className="flex items-center text-techBlue">Citations: {publication.citations}</div>
                      </div>

                      <p className="text-gray-300 mb-4">{publication.abstract}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {publication.keywords.map((keyword, keyIndex) => (
                          <span key={keyIndex} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">
                            {keyword}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-techBlue border-techBlue hover:bg-techBlue/10"
                          asChild
                        >
                          <Link href={publication.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" /> Read Full Paper
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Publications
