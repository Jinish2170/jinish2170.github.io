"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Heart, Phone, MapPin, ExternalLink, Download } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

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
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      link: "https://linkedin.com/in/jinish-kathiriya",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      link: "https://twitter.com/JinishKathiriya",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      link: `mailto:${contactInfo.email}`,
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      link: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
    },
  ]

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/#contact" },
  ]

  const resourceLinks = [
    { name: "Resume", path: "/resume/jinish-kathiriya-resume.pdf", icon: <Download className="h-4 w-4 ml-1" /> },
    {
      name: "Certificates",
      path: "https://linkedin.com/in/jinish-kathiriya",
      icon: <ExternalLink className="h-4 w-4 ml-1" />,
    },
    { name: "Blog", path: "#", icon: <ExternalLink className="h-4 w-4 ml-1" /> },
  ]

  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold tech-gradient">
              JK
            </Link>
            <p className="mt-4 text-gray-400">
              Computer Engineering Student at C.K. Pithawala College of Engineering & Technology. Google Developers
              Group Technical & Cybersecurity Head focused on creating innovative and secure technology solutions.
            </p>
            <div className="mt-6 flex flex-col space-y-2">
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                <Link href={`mailto:${contactInfo.email}`}>{contactInfo.email}</Link>
              </div>
              <div className="flex items-center text-gray-400 hover:text-white transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                <Link href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>{contactInfo.phone}</Link>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path} className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-techBlue rounded-full mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                    target={link.icon.type === ExternalLink ? "_blank" : undefined}
                    rel={link.icon.type === ExternalLink ? "noopener noreferrer" : undefined}
                  >
                    <span className="h-1 w-1 bg-techPurple rounded-full mr-2"></span>
                    {link.name}
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Jinish Kathiriya. All rights reserved.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center">
              Designed and built with <Heart className="h-4 w-4 text-red-500 mx-1" /> by Jinish Kathiriya
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
