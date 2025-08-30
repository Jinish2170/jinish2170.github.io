"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Types and Constants
import type { HeroProps } from "@/types";
import { 
  PERSONAL_INFO, 
  SOCIAL_LINKS, 
  HERO_TITLES, 
  HERO_CONFIG 
} from "@/config/constants";

// Hooks and Utils
import { useTitleRotation } from "@/hooks/useTitleRotation";
import { downloadFile } from "@/utils/navigation";
import { fadeInWithDelay, staggerContainer } from "@/utils/animations";

// Dynamic icon imports for better performance
const ArrowRight = dynamic(() => import("lucide-react").then(mod => ({ default: mod.ArrowRight })));
const Download = dynamic(() => import("lucide-react").then(mod => ({ default: mod.Download })));
const Github = dynamic(() => import("lucide-react").then(mod => ({ default: mod.Github })));
const Linkedin = dynamic(() => import("lucide-react").then(mod => ({ default: mod.Linkedin })));
const Mail = dynamic(() => import("lucide-react").then(mod => ({ default: mod.Mail })));

/**
 * Hero Section Component
 * Main landing section with animated title, CTA buttons, and social links
 */
const Hero: React.FC<HeroProps> = ({ 
  personalInfo = PERSONAL_INFO, 
  socialLinks = SOCIAL_LINKS 
}) => {
  const { currentTitle, currentIndex } = useTitleRotation(HERO_TITLES, HERO_CONFIG.titleRotationInterval);

  const handleResumeDownload = () => downloadFile();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Premium floating geometric elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {/* Top right accent */}
        <div className="absolute top-[15%] right-[12%] w-32 h-32 opacity-70">
          <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-pulse" 
               style={{ animationDuration: '4s' }} />
          <div className="absolute inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full 
                          animate-ping" style={{ animationDuration: '6s' }} />
        </div>
        
        {/* Bottom left geometric shape */}
        <div className="absolute bottom-[20%] left-[8%] w-20 h-20 opacity-60">
          <div className="absolute inset-0 border-l-2 border-t-2 border-purple-500/40 
                          transform rotate-45 animate-bounce" style={{ animationDuration: '8s' }} />
        </div>
        
        {/* Floating dots */}
        <div className="absolute top-[25%] left-[20%] w-2 h-2 bg-blue-500/60 rounded-full 
                        animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute bottom-[35%] right-[25%] w-3 h-3 bg-purple-500/50 rounded-full 
                        animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />
        
        {/* Subtle grid lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent 
                        via-foreground/5 to-transparent opacity-50" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent 
                        via-foreground/5 to-transparent opacity-30" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Intro Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-muted-foreground">
              👋 Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="heading-xl mb-4">
              Hi, I'm{" "}
              <span className="inline-block relative group">
                <span className="gradient-text relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent 
                               bg-size-200 animate-gradient-x">
                  Jinish Kathiriya
                </span>
                {/* Premium underline animation */}
                <motion.span 
                  className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 rounded-full
                           shadow-lg shadow-purple-500/25" 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                />
                {/* Subtle glow effect */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-cyan-500/5 
                           rounded-xl blur-lg -z-10" 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
                />
              </span>
            </h1>
            
            {/* Enhanced Animated Role */}
            <div className="h-16 flex items-center justify-center overflow-hidden">
              <h2 className="heading-md relative">
                <span className="text-muted-foreground mr-2">I'm a</span>
                {HERO_TITLES.map((title: string, index: number) => (
                  <motion.span
                    key={title}
                    className={`absolute inline-flex items-center relative ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: index === currentIndex ? 1 : 0,
                      y: index === currentIndex ? 0 : 10 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </h2>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg max-w-2xl mx-auto mb-12"
          >
            Passionate about building intelligent solutions that bridge technology and real-world impact. 
            Specialized in AI/ML, cybersecurity, and full-stack development.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#projects">
                <Button size="lg" className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 
                                            hover:from-blue-700 hover:to-purple-700 text-white border-0 
                                            shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-purple-500/25 
                                            transition-all duration-300 group px-8 py-4">
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleResumeDownload}
                className="relative overflow-hidden border-2 border-blue-500/30 hover:border-blue-500/60 
                          bg-background/50 backdrop-blur-sm hover:bg-blue-500/5 
                          transition-all duration-300 group px-8 py-4"
              >
                <span className="relative z-10 flex items-center">
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Download Resume
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href={socialLinks.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30 
                         hover:border-blue-500/50 transition-all duration-300 group overflow-hidden"
              >
                <Github className="h-6 w-6 relative z-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-1 ring-blue-500/20 rounded-2xl opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href={socialLinks.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30 
                         hover:border-blue-600/50 transition-all duration-300 group overflow-hidden"
              >
                <Linkedin className="h-6 w-6 relative z-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-cyan-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-1 ring-blue-600/20 rounded-2xl opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href={socialLinks.email}
                className="relative p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/30 
                         hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
              >
                <Mail className="h-6 w-6 relative z-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 ring-1 ring-purple-500/20 rounded-2xl opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground/70 mb-3 tracking-wider uppercase font-medium">
            Scroll to explore
          </span>
          <div className="relative">
            {/* Scroll indicator track */}
            <div className="w-6 h-12 rounded-full border-2 border-foreground/20 flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mt-2"
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.4, 1, 0.4] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            {/* Subtle glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/10 to-purple-500/10 
                          blur-lg scale-150 opacity-50" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
