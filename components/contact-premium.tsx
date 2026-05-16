"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, Send } from "lucide-react"
import Link from "next/link"
import emailjs from '@emailjs/browser'

// Initialize EmailJS
emailjs.init({
  publicKey: 'O7WKNqFq1uxb5D1N0',
})

const ContactPremium = () => {
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
      icon: Mail,
      title: "Email",
      value: "jinishkathiriya@gmail.com",
      link: "mailto:jinishkathiriya@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Surat, Gujarat, India",
      link: "https://maps.google.com/?q=Surat,Gujarat,395007",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 90991 77304",
      link: "tel:+919099177304",
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/Jinish2170",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/jinish-kathiriya",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/JinishKathiriya",
    },
    {
      icon: Mail,
      name: "Email",
      url: "mailto:jinishkathiriya@gmail.com",
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await emailjs.send(
        'service_30bq6j8',
        'template_ojofp9m',
        formData
      )
      setSubmitSuccess(true)
      setFormData({ from_name: "", reply_to: "", subject: "", message: "" })
    } catch (err) {
      setError("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-xl mb-6">
            Get In <span className="gradient-text-premium">Touch</span>
          </h2>
          <p className="body-lg max-w-3xl mx-auto text-muted-foreground">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="premium-card p-8 md:p-10">
              <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
              
              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="from_name" className="text-sm font-medium text-foreground">
                        Your Name
                      </label>
                      <Input
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="border-border/50 focus:border-royal-500 focus:ring-royal-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="reply_to" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <Input
                        id="reply_to"
                        name="reply_to"
                        type="email"
                        value={formData.reply_to}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="border-border/50 focus:border-royal-500 focus:ring-royal-500/20"
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
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Collaboration"
                      required
                      className="border-border/50 focus:border-royal-500 focus:ring-royal-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                      className="border-border/50 focus:border-royal-500 focus:ring-royal-500/20 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-premium w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Cards */}
            <div className="premium-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Info</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.a
                      key={info.title}
                      href={info.link}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-royal-500/10 hover:border-royal-500/30 border border-transparent transition-all duration-300 group"
                    >
                      <div className="p-3 bg-royal-500/10 rounded-lg group-hover:bg-royal-500/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-royal-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{info.title}</div>
                        <div className="text-sm text-muted-foreground">{info.value}</div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Social Links */}
            <div className="premium-card p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Social Links</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl hover:bg-royal-500/10 hover:border-royal-500/30 border border-transparent transition-all duration-300 group"
                    >
                      <Icon className="w-5 h-5 text-royal-500 group-hover:text-royal-600" />
                      <span className="text-sm font-medium text-foreground">{social.name}</span>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactPremium
