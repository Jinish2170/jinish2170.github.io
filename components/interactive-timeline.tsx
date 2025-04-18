"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap, Award, ChevronLeft, ChevronRight, Calendar } from "lucide-react"

const InteractiveTimeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const controls = useAnimation()
  const [activeYear, setActiveYear] = useState(2024)
  const [activeIndex, setActiveIndex] = useState(0)
  const timelineRef = useRef(null)

  // Update the timelineData array with correct education and activities
  const timelineData = [
    {
      year: 2023,
      title: "Google Developers Group Leadership",
      organization: "Google Developers Group",
      description:
        "Serving as Technical Head and Cybersecurity Head for the Google Developers Group. Organizing workshops, leading security initiatives, and mentoring new developers.",
      type: "leadership",
      icon: <Briefcase className="h-5 w-5 text-techGreen" />,
      achievements: [
        "Organized technical workshops for over 200 participants",
        "Led cybersecurity awareness campaigns and training sessions",
        "Developed community resources for secure coding practices",
      ],
    },
    {
      year: 2022,
      title: "Bachelor of Engineering in Computer Engineering",
      organization: "C.K. Pithawala College of Engineering & Technology, Gujarat",
      description:
        "Currently pursuing a Bachelor's degree in Computer Engineering with a focus on AI, cybersecurity, and software development. Expected graduation in May 2026.",
      type: "education",
      icon: <GraduationCap className="h-5 w-5 text-techPurple" />,
      achievements: [
        "Active member of the college's technical society",
        "Participant in multiple hackathons and coding competitions",
        "Working on research projects in AI and cybersecurity",
      ],
    },
    {
      year: 2022,
      title: "Higher Secondary Education (12th)",
      organization: "Gurukul V.V.T.C ENG MED SCHOOL - Katargam, Surat, Gujarat",
      description:
        "Completed higher secondary education with a focus on science and mathematics, developing a strong foundation for engineering studies.",
      type: "education",
      icon: <GraduationCap className="h-5 w-5 text-techPurple" />,
      achievements: [
        "Participated in science exhibitions and competitions",
        "Developed interest in computer programming and cybersecurity",
        "Active in extracurricular activities and leadership roles",
      ],
    },
    {
      year: 2023,
      title: "AI Certification",
      organization: "Coursera",
      description:
        "Completed comprehensive certification in Artificial Intelligence, covering machine learning algorithms, neural networks, and practical AI applications.",
      type: "certification",
      icon: <Award className="h-5 w-5 text-techBlue" />,
      achievements: [
        "Mastered key AI concepts and methodologies",
        "Completed hands-on projects implementing AI solutions",
        "Applied AI techniques to real-world problems",
      ],
    },
    {
      year: 2023,
      title: "Python Programming Certification",
      organization: "Coursera",
      description:
        "Earned certification in Python programming, demonstrating proficiency in one of the most versatile and widely-used programming languages for AI and data science.",
      type: "certification",
      icon: <Award className="h-5 w-5 text-techGreen" />,
      achievements: [
        "Developed advanced Python programming skills",
        "Created multiple applications and automation scripts",
        "Learned best practices for clean, efficient code",
      ],
    },
    {
      year: 2022,
      title: "Data Science Certification",
      organization: "Coursera",
      description:
        "Completed certification in Data Science, covering statistical analysis, data visualization, and machine learning techniques for extracting insights from complex datasets.",
      type: "certification",
      icon: <Award className="h-5 w-5 text-techBlue" />,
      achievements: [
        "Mastered data analysis and visualization techniques",
        "Implemented machine learning models for predictive analytics",
        "Worked with real-world datasets to solve business problems",
      ],
    },
  ]

  // Group timeline items by year
  const timelineByYear = timelineData.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = []
    }
    acc[item.year].push(item)
    return acc
  }, {})

  // Get unique years in descending order
  const years = Object.keys(timelineByYear).sort((a, b) => b - a)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    // Find the index of the active year in the years array
    const yearIndex = years.findIndex((year) => Number.parseInt(year) === activeYear)
    setActiveIndex(yearIndex >= 0 ? yearIndex : 0)
  }, [activeYear, years])

  const handleYearClick = (year) => {
    setActiveYear(Number.parseInt(year))
  }

  const handlePrev = () => {
    const newIndex = Math.min(activeIndex + 1, years.length - 1)
    setActiveYear(Number.parseInt(years[newIndex]))
  }

  const handleNext = () => {
    const newIndex = Math.max(activeIndex - 1, 0)
    setActiveYear(Number.parseInt(years[newIndex]))
  }

  // Scroll timeline into view when active year changes
  useEffect(() => {
    if (timelineRef.current) {
      const scrollContainer = timelineRef.current
      const activeElement = scrollContainer.querySelector(`[data-year="${activeYear}"]`)

      if (activeElement) {
        const scrollLeft = activeElement.offsetLeft - scrollContainer.offsetWidth / 2 + activeElement.offsetWidth / 2
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [activeYear])

  return (
    <section id="journey" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My Professional <span className="tech-gradient">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore my career path, education, and professional achievements over the years.
          </p>
        </motion.div>

        <div className="relative mb-12">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={activeIndex >= years.length - 1}
              className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={activeIndex <= 0}
              className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div
            className="overflow-x-auto hide-scrollbar py-4"
            ref={timelineRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex min-w-max">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2"></div>

              {years.map((year, index) => (
                <div key={year} className="relative px-6 flex flex-col items-center" data-year={year}>
                  <button
                    onClick={() => handleYearClick(year)}
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      Number.parseInt(year) === activeYear
                        ? "bg-techBlue text-white scale-125"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {year}
                  </button>

                  <div
                    className={`absolute top-1/2 w-0.5 bg-gray-700 -translate-y-1/2 transition-all duration-300 ${
                      Number.parseInt(year) === activeYear ? "h-8 bg-techBlue" : "h-4"
                    }`}
                  ></div>

                  <div className="mt-2 text-xs text-center">
                    <span className={Number.parseInt(year) === activeYear ? "text-techBlue" : "text-gray-500"}>
                      {timelineByYear[year].length} {timelineByYear[year].length === 1 ? "event" : "events"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timelineByYear[activeYear.toString()]?.map((item, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900/50 border border-gray-800 overflow-hidden transition-all duration-300 hover:border-${
                    item.type === "work" ? "techBlue" : item.type === "education" ? "techPurple" : "techGreen"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-full bg-gray-800/50 text-${
                          item.type === "work" ? "techBlue" : item.type === "education" ? "techPurple" : "techGreen"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <span className="text-sm px-2 py-1 bg-gray-800 rounded-full flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> {item.year}
                          </span>
                        </div>

                        <p className="text-gray-400 mb-3">{item.organization}</p>
                        <p className="text-gray-300 mb-4">{item.description}</p>

                        {item.achievements && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Key Achievements:</h4>
                            <ul className="space-y-1">
                              {item.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start text-sm">
                                  <div className="h-2 w-2 rounded-full bg-techBlue mt-1.5 mr-2"></div>
                                  <span className="text-gray-300">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default InteractiveTimeline
