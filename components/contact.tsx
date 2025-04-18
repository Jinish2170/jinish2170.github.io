"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-techBlue" />,
      label: "Email",
      value: "jinishkathiriya@gmail.com",
      link: "mailto:jinishkathiriya@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5 text-techPurple" />,
      label: "Phone",
      value: "+91 90991 77304",
      link: "tel:+919099177304",
    },
    {
      icon: <MapPin className="h-5 w-5 text-techGreen" />,
      label: "Location",
      value: "Surat, Gujarat 395007",
      link: "https://maps.google.com/?q=Surat,Gujarat,395007",
    },
  ]

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

  return (
    <section id="contact" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get In <span className="tech-gradient">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-techBlue to-techPurple mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss collaboration opportunities? Feel free to reach out to me through
            any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="p-3 rounded-full bg-gray-800/50 mr-4">{item.icon}</div>
                  <div>
                    <p className="text-gray-400 text-sm">{item.label}</p>
                    <Link href={item.link} className="text-white hover:text-techBlue transition-colors">
                      {item.value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mb-6">Follow Me</h3>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-gray-800/50 text-white transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-400">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-techBlue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-400">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-techBlue"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm text-gray-400">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-techBlue"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-400">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                  className="bg-gray-800/50 border-gray-700 focus:border-techBlue resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submitSuccess && (
                <p className="text-green-400 text-center mt-2">Your message has been sent successfully!</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
