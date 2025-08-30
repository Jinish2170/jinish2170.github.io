"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "15+", label: "Technologies" },
    { number: "100%", label: "Dedication" }
  ]

  const values = [
    {
      title: "Innovation",
      description: "Always exploring cutting-edge technologies and creative solutions to complex problems."
    },
    {
      title: "Security First",
      description: "Prioritizing cybersecurity best practices in every project and solution I develop."
    },
    {
      title: "Continuous Learning",
      description: "Committed to staying current with emerging technologies and industry trends."
    }
  ]

  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Passionate developer with expertise in AI, cybersecurity, and full-stack development.
          </p>
        </motion.div>

        {/* Main About Content */}
        <div className="two-column-grid mb-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-border/50 p-4">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Jinish Kathiriya"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-600 rounded-full opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-600 rounded-full opacity-30" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="heading-md mb-4">
                Building the Future with Code
              </h3>
              <div className="space-y-4 body-md">
                <p>
                  I'm a passionate developer specializing in AI/ML, cybersecurity, and full-stack development. 
                  With a strong foundation in computer science and years of hands-on experience, I create 
                  innovative solutions that bridge technology and real-world impact.
                </p>
                <p>
                  Currently serving as Technical Head at Google Developer Group (GDG) CKPCET and leading 
                  cybersecurity initiatives. I'm driven by the challenge of solving complex problems and 
                  the opportunity to make technology more secure and accessible.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source 
                  projects, or mentoring fellow developers in the community.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex gap-4">
              <Button className="btn-primary group">
                <Link href="#contact" className="flex items-center">
                  Let's Connect
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button variant="outline" className="btn-secondary group">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Resume
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="next-card p-6">
                <div className="heading-md gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="body-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="heading-md mb-4">Core Values</h3>
            <p className="body-lg max-w-2xl mx-auto">
              The principles that guide my work and drive my passion for technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="next-card text-center"
              >
                <h4 className="heading-sm mb-3">{value.title}</h4>
                <p className="body-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
