"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Define navigation links
  const navLinks = [
    { name: "Home", href: "/", type: "link" },
    { name: "About", href: "/about", type: "link" },
    { name: "Skills", href: "/#skills", type: "link" },
    { name: "Projects", href: "/projects", type: "link" },
    { name: "Contact", href: "/#contact", type: "link" },
  ]
  
  const handleNavigation = (link: any) => {
    setIsOpen(false)
    if (link.type === "scroll") {
      const element = document.querySelector(link.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // Let Next.js handle all link navigations
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-lg shadow-foreground/5' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Premium version */}
          <Link href="/" className="relative group">
            <div className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 
                          bg-clip-text text-transparent font-['Space_Grotesk'] tracking-tight">
              JK
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 
                          rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              link.type === "scroll" ? (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 
                           rounded-lg group overflow-hidden"
                >
                  <span className="relative z-10 font-medium">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                                transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2" />
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 
                           rounded-lg group overflow-hidden"
                >
                  <span className="relative z-10 font-medium">{link.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                                transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2" />
                </Link>
              )
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden focus-ring"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-border/50">
                {navLinks.map((link, index) => (
                  link.type === "scroll" ? (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => handleNavigation(link)}
                      className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                    >
                      {link.name}
                    </motion.button>
                  ) : (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
