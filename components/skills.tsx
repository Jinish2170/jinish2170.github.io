"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrainCircuit, ShieldAlert, Code2, Server, Database, Terminal, Laptop, Figma, Search } from "lucide-react"
import SkillChart from "@/components/skill-chart"
import SkillHexGrid from "@/components/skill-hex-grid"

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [viewMode, setViewMode] = useState("bars")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const tooltipRef = useRef(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const skillCategories = [
    {
      name: "AI & Machine Learning",
      icon: <BrainCircuit className="h-6 w-6 text-techBlue" />,
      color: "techBlue",
      skills: [
        {
          name: "Neural Networks",
          level: 95,
          description:
            "Expert in designing and implementing various neural network architectures including CNNs, RNNs, and Transformers.",
        },
        {
          name: "Deep Learning",
          level: 90,
          description:
            "Proficient in frameworks like TensorFlow and PyTorch, with experience in training complex models for various applications.",
        },
        {
          name: "AI Security Solutions",
          level: 85,
          description:
            "Specialized in developing AI-powered security systems that can detect and respond to threats in real-time.",
        },
        {
          name: "Threat Intelligence",
          level: 88,
          description:
            "Experience in building systems that gather, analyze, and utilize threat intelligence data to enhance security posture.",
        },
      ],
    },
    {
      name: "Cybersecurity",
      icon: <ShieldAlert className="h-6 w-6 text-techPurple" />,
      color: "techPurple",
      skills: [
        {
          name: "Zero-day Vulnerability Detection",
          level: 92,
          description:
            "Expertise in identifying previously unknown vulnerabilities in software and systems before they can be exploited.",
        },
        {
          name: "Penetration Testing",
          level: 88,
          description:
            "Skilled in conducting thorough penetration tests to identify security weaknesses in systems and networks.",
        },
        {
          name: "Quantum-resistant Cryptography",
          level: 85,
          description:
            "Research and implementation experience in cryptographic algorithms designed to withstand quantum computing attacks.",
        },
        {
          name: "Security Auditing",
          level: 90,
          description:
            "Comprehensive security assessment capabilities, including code reviews, configuration analysis, and compliance checks.",
        },
      ],
    },
    {
      name: "Full-Stack Development",
      icon: <Code2 className="h-6 w-6 text-techGreen" />,
      color: "techGreen",
      skills: [
        {
          name: "React",
          level: 95,
          description:
            "Advanced knowledge of React, including hooks, context API, and state management solutions like Redux and Zustand.",
        },
        {
          name: "Node.js",
          level: 90,
          description:
            "Extensive experience building scalable backend services with Node.js, including REST APIs and microservices.",
        },
        {
          name: "Express.js",
          level: 88,
          description:
            "Proficient in creating robust server applications with Express.js, including middleware development and API design.",
        },
        {
          name: "Next.js",
          level: 92,
          description:
            "Expert in building full-stack applications with Next.js, leveraging both client and server components effectively.",
        },
      ],
    },
    {
      name: "DevOps & Cloud",
      icon: <Server className="h-6 w-6 text-techBlue" />,
      color: "techBlue",
      skills: [
        {
          name: "Docker",
          level: 85,
          description:
            "Skilled in containerization with Docker, including multi-stage builds and optimization techniques.",
        },
        {
          name: "Kubernetes",
          level: 80,
          description:
            "Experience in orchestrating containerized applications with Kubernetes, including deployment strategies and scaling.",
        },
        {
          name: "GitHub Actions",
          level: 88,
          description:
            "Proficient in setting up CI/CD pipelines with GitHub Actions for automated testing and deployment.",
        },
        {
          name: "CI/CD Pipelines",
          level: 85,
          description:
            "Expertise in designing and implementing continuous integration and deployment workflows across various platforms.",
        },
      ],
    },
    {
      name: "Databases",
      icon: <Database className="h-6 w-6 text-techPurple" />,
      color: "techPurple",
      skills: [
        {
          name: "MySQL",
          level: 90,
          description:
            "Advanced knowledge of MySQL, including query optimization, indexing strategies, and replication setup.",
        },
        {
          name: "MongoDB",
          level: 92,
          description:
            "Expert in designing and implementing MongoDB databases, including aggregation pipelines and sharding.",
        },
        {
          name: "PostgreSQL",
          level: 88,
          description:
            "Proficient in PostgreSQL, with experience in advanced features like JSON storage, full-text search, and extensions.",
        },
        {
          name: "Redis",
          level: 85,
          description:
            "Experience using Redis for caching, session storage, pub/sub messaging, and as a primary database for specific use cases.",
        },
      ],
    },
    {
      name: "Programming Languages",
      icon: <Terminal className="h-6 w-6 text-techGreen" />,
      color: "techGreen",
      skills: [
        {
          name: "Python",
          level: 95,
          description:
            "Expert-level Python programming, including advanced concepts like metaclasses, decorators, and async programming.",
        },
        {
          name: "JavaScript",
          level: 92,
          description:
            "Deep knowledge of modern JavaScript, including ES6+ features, async/await, and functional programming patterns.",
        },
        {
          name: "C++",
          level: 85,
          description: "Strong foundation in C++ programming, including memory management, templates, and STL.",
        },
        {
          name: "Java",
          level: 80,
          description:
            "Proficient in Java development, with experience in enterprise applications and Android development.",
        },
      ],
    },
    {
      name: "Operating Systems",
      icon: <Laptop className="h-6 w-6 text-techBlue" />,
      color: "techBlue",
      skills: [
        {
          name: "Kali Linux",
          level: 90,
          description:
            "Expert in using Kali Linux for security assessments, penetration testing, and vulnerability analysis.",
        },
        {
          name: "Windows",
          level: 85,
          description:
            "Proficient in Windows administration, including PowerShell scripting and security configuration.",
        },
        {
          name: "macOS",
          level: 88,
          description:
            "Experienced in macOS development and administration, including shell scripting and security hardening.",
        },
      ],
    },
    {
      name: "Design & Collaboration",
      icon: <Figma className="h-6 w-6 text-techPurple" />,
      color: "techPurple",
      skills: [
        {
          name: "Figma",
          level: 85,
          description: "Skilled in using Figma for UI/UX design, prototyping, and collaboration with design teams.",
        },
        {
          name: "Canva",
          level: 88,
          description:
            "Proficient in creating visual content with Canva for presentations, social media, and marketing materials.",
        },
        {
          name: "Notion",
          level: 90,
          description: "Expert in using Notion for project management, documentation, and team collaboration.",
        },
        {
          name: "Trello",
          level: 85,
          description:
            "Experience in managing projects and workflows with Trello, including automation and integration with other tools.",
        },
      ],
    },
  ]

  // Handle tooltip positioning
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hoveredSkill) {
        setTooltipPosition({
          x: e.clientX + 15,
          y: e.clientY + 15,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [hoveredSkill])

  // Filter skills based on search term and category
  const filteredCategories = skillCategories
    .filter((category) => selectedCategory === "all" || category.name === selectedCategory)
    .map((category) => ({
      ...category,
      skills: category.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.skills.length > 0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="py-20 relative grid-bg" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="tech-gradient">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            I&apos;ve developed expertise in a wide range of technologies and methodologies, with a focus on AI,
            cybersecurity, and full-stack development.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className={selectedCategory === "all" ? "bg-techBlue hover:bg-techBlue/90" : ""}
            >
              All Categories
            </Button>
            {skillCategories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.name)}
                className={
                  selectedCategory === category.name ? `bg-${category.color} hover:bg-${category.color}/90` : ""
                }
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-techBlue focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <Tabs defaultValue="bars" onValueChange={setViewMode} className="w-full max-w-md">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="bars">Skill Bars</TabsTrigger>
              <TabsTrigger value="chart">Radar Chart</TabsTrigger>
              <TabsTrigger value="grid">Hex Grid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={viewMode} className="w-full">
          <TabsContent value="bars">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 card-hover"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-2 rounded-md bg-gray-800/50 mr-4">{category.icon}</div>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="cursor-help"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="skill-bar"
                            style={{
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, hsl(var(--${category.color})), hsl(var(--${category.color === "techBlue" ? "techPurple" : "techBlue"})))`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="chart">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <SkillChart skillCategories={filteredCategories} />
            </motion.div>
          </TabsContent>

          <TabsContent value="grid">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SkillHexGrid skillCategories={filteredCategories} />
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Top Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <Card className="bg-gray-900/30 border border-gray-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-900/50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-2xl font-bold">Core Expertise</h3>
                    <p className="text-gray-400 mt-1">Areas where I've achieved exceptional proficiency</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      Expert (95-100%)
                    </span>
                    <span className="flex items-center gap-1.5 ml-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      Advanced (90-94%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Group skills by category */}
                {skillCategories
                  .filter((category) => category.skills.some((skill) => skill.level >= 90))
                  .map((category, categoryIndex) => {
                    const topSkills = category.skills.filter((skill) => skill.level >= 90)
                    if (topSkills.length === 0) return null

                    return (
                      <div key={categoryIndex} className="mb-8 last:mb-0">
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`p-1.5 rounded-md bg-gray-800`}>{category.icon}</div>
                          <h4 className="text-lg font-semibold">{category.name}</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {topSkills.map((skill, skillIndex) => {
                            // Determine skill level category
                            const isExpert = skill.level >= 95
                            const levelColor = isExpert ? "green" : "blue"

                            return (
                              <motion.div
                                key={skillIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: skillIndex * 0.1 }}
                                className="relative group"
                                onMouseEnter={() => setHoveredSkill(skill)}
                                onMouseLeave={() => setHoveredSkill(null)}
                              >
                                <div
                                  className={`bg-gray-800/50 border border-gray-700 group-hover:border-${levelColor}-500/50 rounded-lg p-4 transition-all duration-300 cursor-help`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium">{skill.name}</h5>
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full bg-${levelColor}-500/20 text-${levelColor}-400`}
                                    >
                                      {skill.level}%
                                    </span>
                                  </div>

                                  <div className="w-full bg-gray-700/50 rounded-full h-1.5 mt-2">
                                    <div
                                      className={`rounded-full h-1.5 bg-${levelColor}-500`}
                                      style={{ width: `${skill.level}%` }}
                                    ></div>
                                  </div>

                                  <div className="mt-3 text-xs text-gray-400 line-clamp-2">
                                    {skill.description.split(".")[0]}.
                                  </div>
                                </div>

                                {/* Decorative corner accent */}
                                <div
                                  className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-${levelColor}-500/70 rounded-tr-md opacity-0 group-hover:opacity-100 transition-opacity`}
                                ></div>
                                <div
                                  className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-${levelColor}-500/70 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity`}
                                ></div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
              </div>

              {/* Certifications and Experience Indicators */}
              <div className="border-t border-gray-800 p-6 bg-gray-900/50">
                <h4 className="text-lg font-semibold mb-4">Professional Achievements</h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "5+ Years Experience", icon: "⏱️", color: "bg-blue-900/30 border-blue-700/50" },
                    { name: "AWS Certified", icon: "☁️", color: "bg-orange-900/30 border-orange-700/50" },
                    { name: "TensorFlow Certified", icon: "🧠", color: "bg-green-900/30 border-green-700/50" },
                    { name: "Security+", icon: "🔒", color: "bg-purple-900/30 border-purple-700/50" },
                    { name: "Full Stack Expert", icon: "💻", color: "bg-teal-900/30 border-teal-700/50" },
                  ].map((cert, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${cert.color} border`}
                    >
                      <span>{cert.icon}</span>
                      <span>{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Skill tooltip */}
      {hoveredSkill && (
        <div
          ref={tooltipRef}
          className="fixed bg-gray-900 border border-gray-700 rounded-md p-3 shadow-lg z-50 max-w-xs"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(0, -50%)",
          }}
        >
          <h4 className="font-bold mb-1">{hoveredSkill.name}</h4>
          <p className="text-sm text-gray-300">{hoveredSkill.description}</p>
        </div>
      )}
    </section>
  )
}

export default Skills
