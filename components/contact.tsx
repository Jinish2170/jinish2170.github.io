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

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {error && (
                <div className="p-3 rounded bg-red-500/10 border border-red-500/50 text-red-500">
                  {error}
                  <div className="mt-2">
                    You can also email me directly at{" "}
                    <a
                      href="mailto:jinishkathiriya@gmail.com"
                      className="underline hover:text-red-400"
                    >
                      jinishkathiriya@gmail.com
                    </a>
                  </div>
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 rounded bg-green-500/10 border border-green-500/50 text-green-500">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="from_name" className="text-sm text-gray-400">
                    Your Name
                  </label>
                  <Input
                    id="from_name"
                    name="from_name"
                    placeholder="John Doe"
                    required
                    value={formData.from_name}
                    onChange={handleChange}
                    className="bg-gray-800/50 border-gray-700 focus:border-techBlue"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="reply_to" className="text-sm text-gray-400">
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
                  placeholder="Project Inquiry"
                  required
                  value={formData.subject}
                  onChange={handleChange}
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
                  placeholder="Your message here..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-gray-800/50 border-gray-700 focus:border-techBlue resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse mr-2">Sending...</span>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  "Send Message"
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
