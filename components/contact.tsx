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
import emailjs from '@emailjs/browser'
import { componentStyles } from "@/lib/theme-utils"

// Initialize EmailJS with public key
emailjs.init({
  publicKey: 'O7WKNqFq1uxb5D1N0',
})

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "jinishkathiriya@gmail.com",
      link: "mailto:jinishkathiriya@gmail.com",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10 border-blue-500/20"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Surat, Gujarat, India",
      link: "https://maps.google.com/?q=Surat,Gujarat,395007",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+91 90991 77304",
      link: "tel:+919099177304",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10 border-purple-500/20"
    }
  ]

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      name: "GitHub",
      url: "https://github.com/Jinish2170",
      color: "hover:bg-slate-800 hover:text-white",
      bgColor: "bg-slate-100 dark:bg-slate-800"
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/jinish-kathiriya",
      color: "hover:bg-blue-600 hover:text-white",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      name: "Twitter",
      url: "https://twitter.com/JinishKathiriya",
      color: "hover:bg-sky-500 hover:text-white",
      bgColor: "bg-sky-50 dark:bg-sky-900/20"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      name: "Email",
      url: "mailto:jinishkathiriya@gmail.com",
      color: "hover:bg-purple-600 hover:text-white",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    
    // Basic validation
    const emailInput = form.querySelector('input[name="reply_to"]') as HTMLInputElement
    const nameInput = form.querySelector('input[name="from_name"]') as HTMLInputElement
    const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement

    if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.")
      return
    }

    if (nameInput.value.length < 2) {
      setError("Name must be at least 2 characters long.")
      return
    }

    if (messageInput.value.length < 10) {
      setError("Message must be at least 10 characters long.")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
      // Send email directly with template parameters
      const result = await emailjs.send(
        'service_h9or1zr',
        'template_knu6jft',
        {
          to_email: 'jinishkathiriya@gmail.com',
          from_name: formData.from_name,
          reply_to: formData.reply_to,
          subject: formData.subject,
          message: formData.message
        },
        'O7WKNqFq1uxb5D1N0'
      )

      if (result.status === 200) {
        setSubmitSuccess(true)
        setFormData({
          from_name: "",
          reply_to: "",
          subject: "",
          message: "",
        })
        setError("")
      } else {
        throw new Error('Failed to send message')
      }
    } catch (err) {
      setError("Failed to send message. Please try emailing directly.")
      console.error('EmailJS Error:', err)
    } finally {
      setIsSubmitting(false)
      
      // Reset success message after 5 seconds
      if (submitSuccess) {
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to discuss collaboration opportunities? Feel free to reach out to me through
            any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-8 text-foreground">Contact Information</h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link
                      href={item.link}
                      className="flex items-center p-4 glass-card rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <div className={`p-3 rounded-lg ${item.bgColor} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-foreground">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm font-medium">{item.title}</p>
                        <p className="text-foreground font-semibold group-hover:text-blue-600 transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Follow Me</h3>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Link
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-2 px-4 py-3 ${social.bgColor} rounded-xl border ${social.color} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                      aria-label={social.name}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-200">
                        {social.icon}
                      </div>
                      <span className="font-medium">{social.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send Me a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="text-sm">{error}</p>
                  <div className="mt-2 text-sm">
                    You can also email me directly at{" "}
                    <a
                      href="mailto:jinishkathiriya@gmail.com"
                      className="underline hover:text-red-500 transition-colors"
                    >
                      jinishkathiriya@gmail.com
                    </a>
                  </div>
                </motion.div>
              )}

              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="from_name" className="text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <Input
                    id="from_name"
                    name="from_name"
                    placeholder="John Doe"
                    required
                    value={formData.from_name}
                    onChange={handleChange}
                    className="bg-background border-border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reply_to" className="text-sm font-medium text-foreground">
                    Your Email
                  </label>
                  <Input
                    id="reply_to"
                    name="reply_to"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.reply_to}
                    onChange={handleChange}
                    className="bg-background border-border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-background border-border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message here..."
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-background border-border focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-5 w-5" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
