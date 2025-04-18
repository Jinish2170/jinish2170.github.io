"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, ShieldAlert, Code2, BookOpen, Zap } from "lucide-react"
import Link from "next/link"

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeService, setActiveService] = useState(null)

  const services = [
    {
      id: "ai-security",
      title: "AI & ML Security",
      icon: <BrainCircuit className="h-10 w-10 text-techBlue" />,
      shortDescription: "Securing AI systems against adversarial attacks and vulnerabilities",
      description:
        "Comprehensive security solutions for machine learning models and AI systems. I specialize in hardening neural networks against adversarial examples, protecting training data, and ensuring the integrity of AI-powered applications.",
      offerings: [
        "Adversarial robustness assessment and enhancement",
        "Privacy-preserving machine learning implementation",
        "Model security auditing and vulnerability testing",
        "Secure MLOps pipeline development",
      ],
      benefits: [
        "Protect AI assets from manipulation and attacks",
        "Ensure compliance with privacy regulations",
        "Maintain model integrity in production",
        "Build trust in AI-powered systems",
      ],
      process: [
        {
          title: "Assessment",
          description: "Comprehensive evaluation of your AI systems and identification of vulnerabilities",
        },
        {
          title: "Strategy",
          description: "Development of a tailored security strategy based on your specific AI implementation",
        },
        {
          title: "Implementation",
          description: "Integration of security measures and defensive techniques into your AI systems",
        },
        { title: "Validation", description: "Rigorous testing to ensure effectiveness of security measures" },
      ],
      color: "techBlue",
    },
    {
      id: "cybersecurity",
      title: "Advanced Cybersecurity",
      icon: <ShieldAlert className="h-10 w-10 text-techPurple" />,
      shortDescription: "Protecting systems and data with cutting-edge security solutions",
      description:
        "State-of-the-art cybersecurity services focusing on threat detection, vulnerability assessment, and security architecture design. I leverage AI and machine learning to create proactive security solutions that stay ahead of emerging threats.",
      offerings: [
        "Zero-day vulnerability detection and mitigation",
        "Penetration testing and security assessments",
        "Secure system architecture design",
        "Quantum-resistant cryptography implementation",
      ],
      benefits: [
        "Proactively identify and address security weaknesses",
        "Protect sensitive data and intellectual property",
        "Reduce risk of security breaches and data loss",
        "Future-proof security against emerging threats",
      ],
      process: [
        {
          title: "Discovery",
          description: "Thorough analysis of your current security posture and potential vulnerabilities",
        },
        {
          title: "Planning",
          description: "Development of a comprehensive security strategy tailored to your organization",
        },
        { title: "Execution", description: "Implementation of security measures and controls across your systems" },
        { title: "Monitoring", description: "Ongoing assessment and improvement of security measures" },
      ],
      color: "techPurple",
    },
    {
      id: "development",
      title: "Secure Full-Stack Development",
      icon: <Code2 className="h-10 w-10 text-techGreen" />,
      shortDescription: "Building robust, secure applications with modern technologies",
      description:
        "End-to-end development services with security built in from the ground up. I specialize in creating robust applications using React, Node.js, and other modern technologies, with a strong focus on security best practices throughout the development lifecycle.",
      offerings: [
        "Secure web and mobile application development",
        "API design and implementation with robust security",
        "Database design and optimization",
        "DevSecOps integration and implementation",
      ],
      benefits: [
        "Reduce security vulnerabilities in application code",
        "Accelerate development with security-focused practices",
        "Ensure compliance with security standards",
        "Build scalable applications with security by design",
      ],
      process: [
        { title: "Requirements", description: "Detailed analysis of your needs and security requirements" },
        { title: "Design", description: "Architecture and UI/UX design with security considerations" },
        { title: "Development", description: "Secure coding practices and continuous security testing" },
        { title: "Deployment", description: "Secure deployment and ongoing maintenance" },
      ],
      color: "techGreen",
    },
    {
      id: "consulting",
      title: "Security Consulting & Training",
      icon: <BookOpen className="h-10 w-10 text-techBlue" />,
      shortDescription: "Expert guidance and knowledge transfer for security teams",
      description:
        "Strategic security consulting and specialized training services to help organizations build internal security capabilities. I provide expert guidance on security strategy, architecture, and implementation, along with customized training programs for technical teams.",
      offerings: [
        "Security strategy development and roadmapping",
        "Technical security training for development teams",
        "Security architecture review and design",
        "Incident response planning and simulation",
      ],
      benefits: [
        "Enhance your team's security knowledge and skills",
        "Develop effective security strategies aligned with business goals",
        "Improve security decision-making across the organization",
        "Build a security-conscious organizational culture",
      ],
      process: [
        { title: "Assessment", description: "Evaluation of current security knowledge and capabilities" },
        { title: "Planning", description: "Development of customized consulting or training program" },
        { title: "Implementation", description: "Delivery of consulting services or training sessions" },
        { title: "Evaluation", description: "Assessment of outcomes and continuous improvement" },
      ],
      color: "techBlue",
    },
    {
      id: "automation",
      title: "Security Automation",
      icon: <Zap className="h-10 w-10 text-techOrange" />,
      shortDescription: "Automating security tasks to improve efficiency and reduce risk",
      description:
        "Automation solutions to streamline security operations, reduce manual effort, and improve overall security posture. I specialize in automating vulnerability scanning, incident response, and compliance reporting, enabling security teams to focus on strategic initiatives.",
      offerings: [
        "Automated vulnerability management",
        "Security incident response automation",
        "Compliance automation and reporting",
        "Custom security tool development",
      ],
      benefits: [
        "Reduce time spent on repetitive security tasks",
        "Improve accuracy and consistency of security operations",
        "Enhance security visibility and control",
        "Enable faster response to security incidents",
      ],
      process: [
        { title: "Analysis", description: "Identification of security tasks suitable for automation" },
        { title: "Design", description: "Development of automation workflows and scripts" },
        { title: "Implementation", description: "Integration of automation tools into your security infrastructure" },
        { title: "Monitoring", description: "Ongoing monitoring and optimization of automation processes" },
      ],
      color: "techOrange",
    },
  ]

  return (
    <section id="services" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-semibold text-center mb-8 section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          ref={ref}
        >
          My Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.3 + services.indexOf(service) * 0.1 }}
            >
              <Card
                className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer ${activeService === service.id ? "shadow-xl" : ""}`}
                onClick={() => setActiveService(service.id)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  {service.icon}
                  <h3 className="text-xl font-semibold mt-2">{service.title}</h3>
                  <p className="text-gray-600 text-center mt-2">{service.shortDescription}</p>
                </CardContent>
              </Card>
              {activeService === service.id && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 z-10 flex flex-col items-center justify-center p-4 rounded-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-700 text-center mb-4">{service.description}</p>
                  <h4 className="text-lg font-semibold mb-2">Offerings:</h4>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {service.offerings.map((offering, index) => (
                      <li key={index}>{offering}</li>
                    ))}
                  </ul>
                  <h4 className="text-lg font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside text-gray-600 mb-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <h4 className="text-lg font-semibold mb-2">Process:</h4>
                  <div className="flex flex-wrap justify-center">
                    {service.process.map((step, index) => (
                      <div key={index} className="w-1/2 md:w-1/4 p-2">
                        <div className="bg-gray-100 rounded-md p-3">
                          <h5 className="font-semibold">{step.title}</h5>
                          <p className="text-sm text-gray-500">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="secondary" asChild>
                    <Link href="/contact">Contact Me</Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
