"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, GraduationCap, Award } from "lucide-react"

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const timelineItems = [
    {
      title: "Senior AI & Security Engineer",
      organization: "TechSecure Solutions",
      period: "2024 - Present",
      description:
        "Leading the development of AI-powered security solutions for enterprise clients. Responsible for designing and implementing advanced threat detection systems using machine learning and deep neural networks.",
      icon: <Briefcase className="h-5 w-5 text-techBlue" />,
      type: "work",
    },
    {
      title: "Master of Science in Computer Science",
      organization: "Stanford University",
      period: "2022 - 2024",
      description:
        "Specialized in AI and Cybersecurity. Conducted research on neural network security and quantum-resistant cryptography. Graduated with honors.",
      icon: <GraduationCap className="h-5 w-5 text-techPurple" />,
      type: "education",
    },
    {
      title: "Cybersecurity Researcher",
      organization: "CyberDefense Labs",
      period: "2022 - 2024",
      description:
        "Conducted research on zero-day vulnerability detection and developed novel approaches to identifying security threats using machine learning algorithms.",
      icon: <Briefcase className="h-5 w-5 text-techGreen" />,
      type: "work",
    },
    {
      title: "AI Development Specialist",
      organization: "InnovateTech",
      period: "2020 - 2022",
      description:
        "Developed and deployed machine learning models for various applications, including natural language processing and computer vision. Collaborated with cross-functional teams to integrate AI solutions into existing products.",
      icon: <Briefcase className="h-5 w-5 text-techBlue" />,
      type: "work",
    },
    {
      title: "Bachelor of Technology in Computer Engineering",
      organization: "Indian Institute of Technology",
      period: "2018 - 2022",
      description:
        "Graduated with Honors. Focused on computer architecture, algorithms, and artificial intelligence. Completed thesis on 'Neural Network Optimization for Resource-Constrained Devices'.",
      icon: <GraduationCap className="h-5 w-5 text-techPurple" />,
      type: "education",
    },
    {
      title: "Certified Ethical Hacker (CEH)",
      organization: "EC-Council",
      period: "2023",
      description: "Obtained professional certification in ethical hacking and penetration testing methodologies.",
      icon: <Award className="h-5 w-5 text-techGreen" />,
      type: "certification",
    },
  ]

  return (
    <div className="timeline" ref={ref}>
      {timelineItems.map((item, index) => (
        <motion.div
          key={index}
          className="timeline-item"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-start">
            <div className="mt-1 p-2 rounded-full bg-gray-800/50 mr-4">{item.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <span>{item.organization}</span>
                <span className="mx-2">•</span>
                <span>{item.period}</span>
              </div>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Timeline
