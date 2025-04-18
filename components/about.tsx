"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Brain, Shield, Code, Briefcase, GraduationCap, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  const specialties = [
    {
      title: "AI & Machine Learning",
      icon: <Brain className="h-10 w-10 text-techBlue" />,
      description:
        "Specializing in neural networks, deep learning, and AI security solutions with a focus on threat intelligence systems.",
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="h-10 w-10 text-techPurple" />,
      description:
        "Expert in zero-day vulnerability detection, penetration testing, and quantum-resistant cryptography implementations.",
    },
    {
      title: "Full-Stack Development",
      icon: <Code className="h-10 w-10 text-techGreen" />,
      description:
        "Building robust applications with React, Node.js, Express.js, and various databases including MongoDB and PostgreSQL.",
    },
  ]

  const timelineItems = [
    {
      year: "2022-2026",
      title: "Bachelor of Engineering in Computer Engineering",
      description: "C.K. Pithawala College of Engineering & Technology, Gujarat (Expected Graduation: May 2026)",
      icon: <GraduationCap className="h-5 w-5 text-techPurple" />,
    },
    {
      year: "2022",
      title: "Higher Secondary Education (12th)",
      description: "Gurukul V.V.T.C ENG MED SCHOOL - Katargam, Surat, Gujarat (April 2006 to March 2022)",
      icon: <GraduationCap className="h-5 w-5 text-techBlue" />,
    },
    {
      year: "2023",
      title: "Google Developers Group",
      description: "Technical Head and Cybersecurity Head, organizing workshops and security initiatives",
      icon: <Briefcase className="h-5 w-5 text-techGreen" />,
    },
  ]

  const achievements = [
    {
      title: "AI Certification",
      year: "2023",
      icon: <Award className="h-5 w-5 text-techPurple" />,
      link: "#", // Replace with actual certificate link
    },
    {
      title: "Python Programming Certification",
      year: "2023",
      icon: <Award className="h-5 w-5 text-techGreen" />,
      link: "#", // Replace with actual certificate link
    },
    {
      title: "Data Science Certification",
      year: "2022",
      icon: <Award className="h-5 w-5 text-techBlue" />,
      link: "#", // Replace with actual certificate link
    },
  ]

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span className="tech-gradient">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden border-2 border-techBlue/30 shadow-lg shadow-techBlue/20 glow-border">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Jinish Kathiriya"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Jinish Kathiriya</h3>
                <p className="text-gray-400">Computer Engineering Student | GDG Technical & Cybersecurity Head</p>
                <div className="flex justify-center space-x-2 mt-4">
                  <span className="px-3 py-1 bg-techBlue/20 text-techBlue rounded-full text-sm">
                    Expected Graduation: May 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="bio">Biography</TabsTrigger>
                <TabsTrigger value="journey">Journey</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="bio" className="space-y-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    As a Computer Engineering student at C.K. Pithawala College of Engineering & Technology, I'm
                    passionate about exploring the frontiers of technology. My focus on AI and cybersecurity has led me
                    to take on leadership roles and develop innovative solutions that address complex security
                    challenges.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Currently serving as the Technical Head and Cybersecurity Head for the Google Developers Group, I
                    organize workshops, lead security initiatives, and mentor new developers. My approach combines
                    cutting-edge research with practical implementation, ensuring that theoretical advances translate
                    into real-world solutions.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    I believe in the power of ethical technology to transform our world, and I'm committed to creating
                    solutions that are both innovative and responsible. My work is guided by a deep commitment to
                    privacy, security, and the responsible use of AI.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {specialties.map((specialty, index) => (
                    <Card
                      key={index}
                      className="bg-gray-900/50 border border-gray-800 hover:border-gray-700 card-hover h-full"
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="mb-4 p-3 rounded-full bg-gray-800/50">{specialty.icon}</div>
                        <h3 className="text-xl font-bold mb-3">{specialty.title}</h3>
                        <p className="text-gray-400">{specialty.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="journey">
                <div className="relative pl-8 border-l-2 border-gradient-to-b from-techBlue via-techPurple to-techGreen">
                  {timelineItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="mb-8 relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="absolute -left-10 p-2 rounded-full bg-gray-900 border border-gray-800">
                        {item.icon}
                      </div>
                      <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-5">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <span className="text-sm px-2 py-1 bg-gray-800 rounded-full">{item.year}</span>
                        </div>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-techPurple" /> Certifications
                    </h3>
                    <ul className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-techPurple mt-2 mr-2"></div>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-gray-400">
                              {achievement.year} -{" "}
                              <a
                                href={achievement.link}
                                className="text-techBlue hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Certificate Link
                              </a>
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-gray-300">
                      For more certificates, please check my{" "}
                      <a
                        href="https://linkedin.com/in/yourprofile"
                        className="text-techBlue hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn profile
                      </a>
                      .
                    </p>
                  </div>

                  <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">My Approach</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-techBlue/20 flex items-center justify-center mr-3 mt-1">
                          <span className="text-techBlue text-sm">01</span>
                        </div>
                        <span>Research-driven development with a focus on security</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-techPurple/20 flex items-center justify-center mr-3 mt-1">
                          <span className="text-techPurple text-sm">02</span>
                        </div>
                        <span>Continuous learning and adaptation to emerging technologies</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-techGreen/20 flex items-center justify-center mr-3 mt-1">
                          <span className="text-techGreen text-sm">03</span>
                        </div>
                        <span>Ethical considerations at every stage of development</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-techBlue/20 flex items-center justify-center mr-3 mt-1">
                          <span className="text-techBlue text-sm">04</span>
                        </div>
                        <span>Collaborative mindset and knowledge sharing</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-techGreen" /> Extracurricular Leadership
                  </h3>
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 mb-4">
                    <h4 className="font-bold text-lg mb-2">Google Developers Group</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-techBlue/20 text-techBlue rounded-full text-sm">
                        Technical Head
                      </span>
                      <span className="px-3 py-1 bg-techPurple/20 text-techPurple rounded-full text-sm">
                        Cybersecurity Head
                      </span>
                    </div>
                    <p className="text-gray-300">
                      Leading technical initiatives and cybersecurity workshops, organizing events, and mentoring new
                      developers in the community.
                    </p>
                  </div>
                  <blockquote className="text-lg italic text-gray-300">
                    "My goal is to create technology that not only solves complex problems but does so in a way that
                    respects privacy, enhances security, and contributes positively to society."
                  </blockquote>
                  <p className="mt-4 text-right text-techBlue font-medium">— Jinish Kathiriya</p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
