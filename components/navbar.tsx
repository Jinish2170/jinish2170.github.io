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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'nav-blur shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always navigates to homepage */}
          <Link href="/" className="font-bold text-xl gradient-text">
            JK
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.type === "scroll" ? (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
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
