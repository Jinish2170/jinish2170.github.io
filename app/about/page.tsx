"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Brain,
  Shield,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  Twitter,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [activeSkill, setActiveSkill] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)
  const bioRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress for the bio section
  useEffect(() => {
    const handleScroll = () => {
      if (bioRef.current) {
        const element = bioRef.current
        const scrollTop = window.scrollY - element.offsetTop
        const scrollHeight = element.clientHeight
        const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      skills: ["Neural Networks", "Deep Learning", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
      color: "techBlue",
      projects: 8,
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="h-10 w-10 text-techPurple" />,
      description:
        "Expert in zero-day vulnerability detection, penetration testing, and quantum-resistant cryptography implementations.",
      skills: ["Penetration Testing", "Network Security", "Cryptography", "Security Auditing", "Threat Analysis"],
      color: "techPurple",
      projects: 6,
    },
    {
      title: "Full-Stack Development",
      icon: <Code className="h-10 w-10 text-techGreen" />,
      description:
        "Building robust applications with React, Node.js, Express.js, and various databases including MongoDB and PostgreSQL.",
      skills: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Next.js", "TypeScript"],
      color: "techGreen",
      projects: 12,
    },
  ]

  const timelineItems = [
    {
      year: "2022-2026",
      title: "Bachelor of Engineering in Computer Engineering",
      description: "C.K. Pithawala College of Engineering & Technology, Gujarat (Expected Graduation: May 2026)",
      icon: <GraduationCap className="h-5 w-5 text-techPurple" />,
      details:
        "Focusing on AI, cybersecurity, and software development. Participating in research projects and technical competitions.",
      color: "techPurple",
    },
    {
      year: "2022",
      title: "Higher Secondary Education (12th)",
      description: "Gurukul V.V.T.C ENG MED SCHOOL - Katargam, Surat, Gujarat (April 2006 to March 2022)",
      icon: <GraduationCap className="h-5 w-5 text-techBlue" />,
      details:
        "Completed higher secondary education with a focus on science and mathematics, developing a strong foundation for engineering studies.",
      color: "techBlue",
    },
    {
      year: "2023",
      title: "Google Developers Group",
      description: "Technical Head and Cybersecurity Head, organizing workshops and security initiatives",
      icon: <Briefcase className="h-5 w-5 text-techGreen" />,
      details:
        "Leading technical initiatives and cybersecurity workshops, organizing events, and mentoring new developers in the community.",
      color: "techGreen",
    },
  ]

  const achievements = [
    {
      title: "AI Certification",
      year: "2023",
      icon: <Award className="h-5 w-5 text-techPurple" />,
      link: "#", // Replace with actual certificate link
      description:
        "Comprehensive certification in Artificial Intelligence, covering machine learning algorithms, neural networks, and practical AI applications.",
      issuer: "Coursera",
      skills: ["Machine Learning", "Neural Networks", "AI Applications"],
    },
    {
      title: "Python Programming Certification",
      year: "2023",
      icon: <Award className="h-5 w-5 text-techGreen" />,
      link: "#", // Replace with actual certificate link
      description:
        "Certification in Python programming, demonstrating proficiency in one of the most versatile and widely-used programming languages for AI and data science.",
      issuer: "Coursera",
      skills: ["Python", "Data Structures", "Algorithms", "OOP"],
    },
    {
      title: "Data Science Certification",
      year: "2022",
      icon: <Award className="h-5 w-5 text-techBlue" />,
      link: "#", // Replace with actual certificate link
      description:
        "Certification in Data Science, covering statistical analysis, data visualization, and machine learning techniques for extracting insights from complex datasets.",
      issuer: "Coursera",
      skills: ["Data Analysis", "Statistics", "Data Visualization", "Machine Learning"],
    },
  ]

  const contactInfo = {
    email: "jinishkathiriya@gmail.com",
    phone: "+91 90991 77304",
    location: "Surat, Gujarat 395007",
  }

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      link: "https://github.com/Jinish2170",
      color: "hover:bg-gray-800",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      link: "https://linkedin.com/in/jinish-kathiriya",
      color: "hover:bg-blue-900",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      link: "https://twitter.com/JinishKathiriya",
      color: "hover:bg-blue-600",
    },
  ]

  const skills = [
    { name: "Python", level: 90, category: "Programming" },
    { name: "JavaScript", level: 85, category: "Programming" },
    { name: "React", level: 88, category: "Frontend" },
    { name: "Node.js", level: 82, category: "Backend" },
    { name: "TensorFlow", level: 80, category: "AI/ML" },
    { name: "PyTorch", level: 75, category: "AI/ML" },
    { name: "Cybersecurity", level: 85, category: "Security" },
    { name: "Penetration Testing", level: 78, category: "Security" },
    { name: "MongoDB", level: 80, category: "Database" },
    { name: "PostgreSQL", level: 75, category: "Database" },
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "Git", level: 88, category: "DevOps" },
  ]

  const skillCategories = ["All", "Programming", "Frontend", "Backend", "AI/ML", "Security", "Database", "DevOps"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredSkills =
    selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-techBlue blur-[100px]"></div>
          <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full bg-techPurple blur-[100px]"></div>
          <div className="absolute top-2/4 left-2/3 w-64 h-64 rounded-full bg-techGreen blur-[100px]"></div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get to know more about my journey, skills, and achievements in the world of technology.
          </p>
        </motion.div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              {/* Profile Card */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden mb-6">
                <CardContent className="p-0">
                  <div className="relative w-full h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-techBlue/20 to-techPurple/20"></div>
                    <Image
                      src="/placeholder.svg?height=600&width=1200"
                      alt="Profile Background"
                      fill
                      className="object-cover opacity-30"
                    />
                  </div>

                  <div className="relative px-6 pb-6">
                    

                    <div className="mt-20 text-center">
                      <h3 className="text-2xl font-bold mb-1">Jinish Kathiriya</h3>
                      <p className="text-gray-400 mb-4">
                        Computer Engineering Student | GDG Technical & Cybersecurity Head
                      </p>

                      <div className="flex justify-center space-x-2 mb-6">
                        <span className="px-3 py-1 bg-techBlue/20 text-techBlue rounded-full text-sm">
                          Expected Graduation: May 2026
                        </span>
                      </div>

                      <div className="space-y-3 text-sm text-gray-400">
                        <div className="flex items-center justify-center">
                          <Mail className="h-4 w-4 mr-2 text-techBlue" />
                          <Link href={`mailto:${contactInfo.email}`} className="hover:text-techBlue transition-colors">
                            {contactInfo.email}
                          </Link>
                        </div>
                        <div className="flex items-center justify-center">
                          <Phone className="h-4 w-4 mr-2 text-techPurple" />
                          <Link
                            href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                            className="hover:text-techPurple transition-colors"
                          >
                            {contactInfo.phone}
                          </Link>
                        </div>
                        <div className="flex items-center justify-center">
                          <MapPin className="h-4 w-4 mr-2 text-techGreen" />
                          <span>{contactInfo.location}</span>
                        </div>
                      </div>

                      <div className="flex justify-center space-x-3 mt-6">
                        {socialLinks.map((social, index) => (
                          <Link
                            key={index}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full bg-gray-800/50 text-white transition-colors ${social.color}`}
                            aria-label={social.label}
                          >
                            {social.icon}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Stats</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-techBlue mb-1">3+</div>
                      <div className="text-xs text-gray-400">Years Coding</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-techPurple mb-1">25+</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-techGreen mb-1">10+</div>
                      <div className="text-xs text-gray-400">Technologies</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-techBlue mb-1">5+</div>
                      <div className="text-xs text-gray-400">Certifications</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Top Skills</h4>
                    {skills.slice(0, 5).map((skill, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{skill.name}</span>
                          <span className="text-techBlue">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, hsl(var(--techBlue)), hsl(var(--techPurple)))`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-techBlue text-techBlue hover:bg-techBlue/10"
                      asChild
                    >
                      <Link 
                        href="/resume/JinishKathiriya_fullstack.pdf" 
                        download="JinishKathiriya_fullstack.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="bio">Biography</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="journey">Journey</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              {/* Bio Tab */}
              <TabsContent value="bio" className="space-y-6" ref={bioRef}>
                <div className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-800">
                    <motion.div
                      className="w-full bg-gradient-to-b from-techBlue via-techPurple to-techGreen"
                      style={{ height: `${scrollProgress * 100}%` }}
                    ></motion.div>
                  </div>

                  <div className="prose prose-invert max-w-none pl-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      As a Computer Engineering student at C.K. Pithawala College of Engineering & Technology, I'm
                      passionate about exploring the frontiers of technology. My focus on AI and cybersecurity has led
                      me to take on leadership roles and develop innovative solutions that address complex security
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
                    <p className="text-lg text-gray-300 leading-relaxed">
                      My journey in technology began with a curiosity about how systems work and how they can be
                      secured. This curiosity evolved into a passion for creating secure, intelligent systems that can
                      solve real-world problems. I'm particularly interested in the intersection of artificial
                      intelligence and cybersecurity, where I believe some of the most important challenges and
                      opportunities of our time exist.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Beyond technical skills, I value collaboration, continuous learning, and ethical considerations in
                      all my work. I believe that the best solutions emerge from diverse perspectives and a commitment
                      to understanding the broader implications of technology.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-12 mb-6">My Specialties</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {specialties.map((specialty, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      <Card
                        className={`bg-gray-900/50 border border-gray-800 hover:border-${specialty.color} transition-all duration-300 h-full overflow-hidden`}
                      >
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <motion.div
                            className={`mb-4 p-3 rounded-full bg-gray-800/50 relative`}
                            animate={
                              hoveredCard === index
                                ? {
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5 }}
                          >
                            {specialty.icon}
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `radial-gradient(circle, hsl(var(--${specialty.color})) 0%, transparent 70%)`,
                                opacity: hoveredCard === index ? 0.2 : 0,
                                transition: "opacity 0.3s ease",
                              }}
                            ></div>
                          </motion.div>

                          <h3 className="text-xl font-bold mb-3">{specialty.title}</h3>
                          <p className="text-gray-400 mb-4">{specialty.description}</p>

                          <div className="flex flex-wrap justify-center gap-2 mb-4">
                            {specialty.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className={`text-xs px-2 py-1 rounded-full bg-${specialty.color}/10 text-${specialty.color}`}
                              >
                                {skill}
                              </span>
                            ))}
                            {specialty.skills.length > 3 && (
                              <span className={`text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400`}>
                                +{specialty.skills.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="mt-auto pt-4 border-t border-gray-800 w-full">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-400">Projects: {specialty.projects}</span>
                              <Link
                                href={`/projects?category=${specialty.title}`}
                                className={`text-${specialty.color} hover:underline flex items-center`}
                              >
                                View Projects <ChevronRight className="h-3 w-3 ml-1" />
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">My Approach</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-techBlue mb-3">Technical Excellence</h4>
                      <p className="text-gray-300">
                        I believe in mastering the fundamentals while staying at the cutting edge of technology. This
                        balance allows me to build solutions that are both innovative and reliable.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-techPurple mb-3">Ethical Innovation</h4>
                      <p className="text-gray-300">
                        Technology should serve humanity, not the other way around. I'm committed to developing
                        solutions that respect privacy, promote security, and consider their broader societal impact.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-techGreen mb-3">Continuous Learning</h4>
                      <p className="text-gray-300">
                        The tech landscape evolves rapidly, and I embrace this change through constant learning and
                        adaptation. I dedicate time each week to exploring new technologies and methodologies.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-techBlue mb-3">Collaborative Mindset</h4>
                      <p className="text-gray-300">
                        The best solutions emerge from diverse perspectives. I value teamwork and open communication,
                        and I believe that sharing knowledge elevates everyone's capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {skillCategories.map((category, index) => (
                      <Button
                        key={index}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-techBlue hover:bg-techBlue/90" : ""}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredSkills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 hover:border-techBlue transition-colors"
                        onClick={() => setActiveSkill(activeSkill === index ? null : index)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold">{skill.name}</h4>
                          <span className="text-sm px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
                            {skill.category}
                          </span>
                        </div>

                        <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-techBlue to-techPurple"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          ></motion.div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Proficiency</span>
                          <span className="text-techBlue">{skill.level}%</span>
                        </div>

                        <AnimatePresence>
                          {activeSkill === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-gray-800"
                            >
                              <p className="text-gray-300 text-sm">
                                {skill.name === "Python" &&
                                  "Extensive experience with Python for AI/ML, data analysis, and backend development. Proficient with libraries like NumPy, Pandas, and Scikit-learn."}
                                {skill.name === "JavaScript" &&
                                  "Strong knowledge of modern JavaScript (ES6+) for both frontend and backend development. Experience with asynchronous programming and functional concepts."}
                                {skill.name === "React" &&
                                  "Proficient in building interactive UIs with React, including hooks, context API, and state management. Experience with Next.js for full-stack React applications."}
                                {skill.name === "Node.js" &&
                                  "Experience building scalable backend services with Node.js, including RESTful APIs, authentication systems, and database integration."}
                                {skill.name === "TensorFlow" &&
                                  "Knowledge of building and training neural networks for various AI applications, including computer vision and natural language processing."}
                                {skill.name === "PyTorch" &&
                                  "Experience with PyTorch for deep learning research and implementation, including custom neural network architectures."}
                                {skill.name === "Cybersecurity" &&
                                  "Broad knowledge of cybersecurity principles, threat modeling, and secure system design. Focus on AI security and privacy-preserving techniques."}
                                {skill.name === "Penetration Testing" &&
                                  "Experience with identifying vulnerabilities in systems and applications through systematic testing and exploitation techniques."}
                                {skill.name === "MongoDB" &&
                                  "Proficient in designing and implementing MongoDB databases, including schema design, indexing, and aggregation pipelines."}
                                {skill.name === "PostgreSQL" &&
                                  "Experience with relational database design, complex queries, and performance optimization in PostgreSQL."}
                                {skill.name === "Docker" &&
                                  "Knowledge of containerization with Docker for consistent development and deployment environments."}
                                {skill.name === "Git" &&
                                  "Strong version control skills with Git, including branching strategies, collaborative workflows, and CI/CD integration."}
                              </p>
                              <div className="mt-3 flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-gray-400 hover:text-white"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveSkill(null)
                                  }}
                                >
                                  Close
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Skill Visualization</h3>
                  <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-2xl">
                          <div className="relative">
                            {/* Radar Chart Visualization */}
                            <div className="w-full h-full flex items-center justify-center">
                              <svg viewBox="0 0 400 400" className="w-full h-auto">
                                {/* Background circles */}
                                <circle cx="200" cy="200" r="160" fill="none" stroke="#2a2a2a" strokeWidth="1" />
                                <circle cx="200" cy="200" r="120" fill="none" stroke="#2a2a2a" strokeWidth="1" />
                                <circle cx="200" cy="200" r="80" fill="none" stroke="#2a2a2a" strokeWidth="1" />
                                <circle cx="200" cy="200" r="40" fill="none" stroke="#2a2a2a" strokeWidth="1" />

                                {/* Skill categories */}
                                <line x1="200" y1="40" x2="200" y2="360" stroke="#2a2a2a" strokeWidth="1" />
                                <line x1="40" y1="200" x2="360" y2="200" stroke="#2a2a2a" strokeWidth="1" />
                                <line x1="80" y1="80" x2="320" y2="320" stroke="#2a2a2a" strokeWidth="1" />
                                <line x1="320" y1="80" x2="80" y2="320" stroke="#2a2a2a" strokeWidth="1" />

                                {/* Category labels */}
                                <text x="200" y="25" textAnchor="middle" fill="white" fontSize="12">
                                  Programming
                                </text>
                                <text x="200" y="380" textAnchor="middle" fill="white" fontSize="12">
                                  DevOps
                                </text>
                                <text
                                  x="25"
                                  y="200"
                                  textAnchor="middle"
                                  fill="white"
                                  fontSize="12"
                                  transform="rotate(-90, 25, 200)"
                                >
                                  Frontend
                                </text>
                                <text
                                  x="375"
                                  y="200"
                                  textAnchor="middle"
                                  fill="white"
                                  fontSize="12"
                                  transform="rotate(90, 375, 200)"
                                >
                                  Backend
                                </text>
                                <text
                                  x="70"
                                  y="70"
                                  textAnchor="middle"
                                  fill="white"
                                  fontSize="12"
                                  transform="rotate(-45, 70, 70)"
                                >
                                  AI/ML
                                </text>
                                <text
                                  x="330"
                                  y="70"
                                  textAnchor="middle"
                                  fill="white"
                                  fontSize="12"
                                  transform="rotate(45, 330, 70)"
                                >
                                  Security
                                </text>
                                <text
                                  x="70"
                                  y="330"
                                  textAnchor="middle"
                                  fill="white"
                                  fontSize="12"
                                  transform="rotate(45, 70, 330)"
                                >
                                  Database
                                </text>
                                <text
                                  x="330"
                                  y="330"
                                  textAnchor="middle"
                                  fill="white"
                                  fontSize="12"
                                  transform="rotate(-45, 330, 330)"
                                >
                                  Tools
                                </text>

                                {/* Skill polygon */}
                                <polygon
                                  points="
                                    200,60 
                                    100,120 
                                    60,200 
                                    100,280 
                                    200,320 
                                    300,280 
                                    340,200 
                                    300,120
                                  "
                                  fill="rgba(66, 153, 225, 0.2)"
                                  stroke="rgba(66, 153, 225, 0.8)"
                                  strokeWidth="2"
                                />

                                {/* Skill points */}
                                <circle cx="200" cy="60" r="5" fill="#4299E1" />
                                <circle cx="100" cy="120" r="5" fill="#4299E1" />
                                <circle cx="60" cy="200" r="5" fill="#4299E1" />
                                <circle cx="100" cy="280" r="5" fill="#4299E1" />
                                <circle cx="200" cy="320" r="5" fill="#4299E1" />
                                <circle cx="300" cy="280" r="5" fill="#4299E1" />
                                <circle cx="340" cy="200" r="5" fill="#4299E1" />
                                <circle cx="300" cy="120" r="5" fill="#4299E1" />
                              </svg>
                            </div>

                            <div className="mt-6 text-center">
                              <p className="text-gray-400 text-sm">
                                This radar chart visualizes my skill distribution across different technical domains.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Tools & Technologies</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[
                      "Python",
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Next.js",
                      "Node.js",
                      "Express",
                      "MongoDB",
                      "PostgreSQL",
                      "TensorFlow",
                      "PyTorch",
                      "Docker",
                      "Git",
                      "Linux",
                      "AWS",
                    ].map((tool, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 text-center hover:border-techBlue transition-colors"
                      >
                        <div className="text-sm font-medium">{tool}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Journey Tab */}
              <TabsContent value="journey">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">My Timeline</h3>

                  <div className="relative pl-8 border-l-2 border-gradient-to-b from-techBlue via-techPurple to-techGreen">
                    {timelineItems.map((item, index) => (
                      <motion.div
                        key={index}
                        className="mb-8 relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className={`absolute -left-10 p-2 rounded-full bg-gray-900 border border-${item.color}`}>
                          {item.icon}
                        </div>
                        <div
                          className={`bg-gray-900/30 border border-gray-800 hover:border-${item.color} rounded-lg p-5 transition-colors`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <span className="text-sm px-2 py-1 bg-gray-800 rounded-full">{item.year}</span>
                          </div>
                          <p className="text-gray-400 mb-3">{item.description}</p>
                          <Accordion type="single" collapsible className="border-t border-gray-800 pt-3">
                            <AccordionItem value="details" className="border-b-0">
                              <AccordionTrigger className="text-sm text-gray-400 hover:text-white py-1">
                                More Details
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-gray-300 text-sm">{item.details}</p>

                                {item.title.includes("Google Developers Group") && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      Workshop Organization
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      Technical Leadership
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      Mentoring
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      Security Training
                                    </span>
                                  </div>
                                )}

                                {item.title.includes("Bachelor") && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      Computer Engineering
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      AI Research
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      Cybersecurity
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                                      Software Development
                                    </span>
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Education & Learning Path</h3>

                  <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-techBlue via-techPurple to-techGreen"></div>

                      <div className="pl-8 space-y-8">
                        <div>
                          <div className="absolute -left-3 top-0 w-7 h-7 rounded-full bg-techBlue flex items-center justify-center">
                            <span className="text-xs font-bold">1</span>
                          </div>
                          <h4 className="text-lg font-bold">Foundations</h4>
                          <p className="text-gray-300 mt-2">
                            Built a strong foundation in computer science fundamentals, mathematics, and programming
                            languages. Focused on developing problem-solving skills and algorithmic thinking.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                              Data Structures
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">Algorithms</span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                              Programming Basics
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="absolute -left-3 top-[120px] w-7 h-7 rounded-full bg-techPurple flex items-center justify-center">
                            <span className="text-xs font-bold">2</span>
                          </div>
                          <h4 className="text-lg font-bold">Specialization</h4>
                          <p className="text-gray-300 mt-2">
                            Developed expertise in AI, machine learning, and cybersecurity through coursework, online
                            certifications, and personal projects. Began exploring the intersection of these fields.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">AI/ML</span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                              Cybersecurity
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                              Web Development
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="absolute -left-3 top-[240px] w-7 h-7 rounded-full bg-techGreen flex items-center justify-center">
                            <span className="text-xs font-bold">3</span>
                          </div>
                          <h4 className="text-lg font-bold">Application & Leadership</h4>
                          <p className="text-gray-300 mt-2">
                            Applied knowledge through practical projects and leadership roles. Took on responsibilities
                            with Google Developers Group to share knowledge and mentor others.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                              Technical Leadership
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                              Project Management
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">Mentoring</span>
                          </div>
                        </div>

                        <div>
                          <div className="absolute -left-3 top-[360px] w-7 h-7 rounded-full bg-techBlue flex items-center justify-center">
                            <span className="text-xs font-bold">4</span>
                          </div>
                          <h4 className="text-lg font-bold">Continuous Growth</h4>
                          <p className="text-gray-300 mt-2">
                            Ongoing journey of learning and improvement. Staying current with emerging technologies and
                            deepening expertise in core areas while exploring new domains.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                              Advanced AI
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">Research</span>
                            <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">Innovation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">Certifications & Achievements</h3>

                  <div className="grid grid-cols-1 gap-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-gray-800/50 text-techPurple">{achievement.icon}</div>

                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <h4 className="text-xl font-bold">{achievement.title}</h4>
                                <span className="text-sm px-2 py-1 bg-gray-800 rounded-full flex items-center">
                                  <Clock className="h-3 w-3 mr-1" /> {achievement.year}
                                </span>
                              </div>

                              <p className="text-gray-400 mt-1">Issued by {achievement.issuer}</p>
                              <p className="text-gray-300 mt-3">{achievement.description}</p>

                              <div className="mt-4 flex flex-wrap gap-2">
                                {achievement.skills.map((skill, skillIndex) => (
                                  <span
                                    key={skillIndex}
                                    className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>

                              <div className="mt-4">
                                <Link
                                  href={achievement.link}
                                  className="text-techBlue hover:underline flex items-center text-sm"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View Certificate <ExternalLink className="h-3 w-3 ml-1" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Leadership & Extracurricular Activities</h3>

                  <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-3 flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-techGreen" /> Google Developers Group
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-techBlue/20 text-techBlue rounded-full text-sm">
                          Technical Head
                        </span>
                        <span className="px-3 py-1 bg-techPurple/20 text-techPurple rounded-full text-sm">
                          Cybersecurity Head
                        </span>
                      </div>
                      <p className="text-gray-300">
                        As a leader in the Google Developers Group, I've had the opportunity to organize technical
                        workshops, lead cybersecurity initiatives, and mentor new developers. This role has allowed me
                        to share my knowledge while also learning from a diverse community of technologists.
                      </p>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium mb-2 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-techBlue" /> Workshop Organization
                          </h5>
                          <p className="text-sm text-gray-400">
                            Organized and led technical workshops on AI, cybersecurity, and web development, reaching
                            over 200 participants.
                          </p>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium mb-2 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-techPurple" /> Security Initiatives
                          </h5>
                          <p className="text-sm text-gray-400">
                            Developed and implemented cybersecurity awareness programs and training sessions for
                            community members.
                          </p>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium mb-2 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-techGreen" /> Mentorship
                          </h5>
                          <p className="text-sm text-gray-400">
                            Provided guidance and support to new developers, helping them navigate their learning
                            journey and career paths.
                          </p>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <h5 className="font-medium mb-2 flex items-center">
                            <Star className="h-4 w-4 mr-2 text-techBlue" /> Community Building
                          </h5>
                          <p className="text-sm text-gray-400">
                            Fostered a collaborative and inclusive community environment, encouraging knowledge sharing
                            and networking.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Philosophy & Vision</h3>

                  <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
                    <blockquote className="text-lg italic text-gray-300 mb-6">
                      "My goal is to create technology that not only solves complex problems but does so in a way that
                      respects privacy, enhances security, and contributes positively to society."
                    </blockquote>

                    <p className="text-gray-300">
                      I believe that technology should be a force for good in the world. As we develop increasingly
                      powerful AI systems and digital infrastructure, we must ensure that these advancements benefit
                      humanity while minimizing potential harms. This philosophy guides my approach to every project and
                      learning opportunity.
                    </p>

                    <p className="text-gray-300 mt-4">
                      Looking forward, I aim to continue exploring the intersection of AI and cybersecurity, with a
                      particular focus on developing secure, privacy-preserving AI systems. I'm excited about the
                      potential for these technologies to address some of our most pressing challenges, from healthcare
                      to climate change to digital security.
                    </p>

                    <div className="mt-6 text-right">
                      <p className="text-techBlue font-medium">— Jinish Kathiriya</p>
                    </div>
                  </div>
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
