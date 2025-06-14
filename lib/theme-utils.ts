/**
 * Theme utility functions and constants for the portfolio
 * Provides consistent styling across light/dark themes with glassmorphism
 */

// Component styling presets with theme-aware classes
export const componentStyles = {
  // Text styles with enhanced contrast for light theme
  text: {
    primary: "text-textPrimary",
    secondary: "text-textSecondary", 
    muted: "text-textMuted",
    enhanced: "light:text-enhanced", // High contrast for light theme
    secondaryEnhanced: "light:text-secondary-enhanced",
    mutedEnhanced: "light:text-muted-enhanced",
    gradient: "tech-gradient",
  },

  // Background styles
  background: {
    primary: "bg-bgPrimary",
    secondary: "bg-bgSecondary",
    card: "bg-bgCard",
    glass: "glass-card",
    navbar: "glass-navbar",
  },

  // Interactive elements
  interactive: {
    button: "hover:bg-secondary/50 transition-colors",
    card: "card-hover",
    link: "hover:text-textPrimary transition-colors",
  },

  // Button styles
  button: {
    primary: "bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90 text-white",
    secondary: "border-techBlue text-techBlue hover:bg-techBlue/10",
    ghost: "bg-transparent text-textSecondary hover:bg-secondary/50 hover:text-textPrimary",
  },

  // Layout components
  section: "py-20 px-4",
  container: "container mx-auto px-4 sm:px-6 lg:px-8",
  card: "glass-card rounded-xl p-6",
  navbar: "glass-navbar fixed top-0 w-full z-50",
  heading: "text-3xl sm:text-4xl font-bold mb-4 text-textPrimary",
  subheading: "text-lg text-textSecondary max-w-3xl mx-auto",
}

// Utility functions for conditional styling
export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

// Theme-aware gradient combinations
export const gradients = {
  tech: "bg-gradient-to-r from-techBlue via-techPurple to-techGreen",
  card: "bg-gradient-to-br from-glassBg to-bgCard",
  hover: "bg-gradient-to-r from-transparent via-secondary/20 to-transparent",
}

// Animation presets
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}

// Helper for migration from old classes to new theme-aware ones
export const migrateClasses = (oldClass: string): string => {
  const classMap: Record<string, string> = {
    // Text colors
    'text-white': 'text-textPrimary',
    'text-gray-300': 'text-textSecondary',
    'text-gray-400': 'text-textMuted',
    'text-gray-500': 'text-textMuted',
    'text-gray-600': 'text-textMuted',
    'text-black': 'text-textPrimary',
    'text-gray-800': 'text-textPrimary',
    'text-gray-900': 'text-textPrimary',
    
    // Backgrounds
    'bg-white': 'bg-bgPrimary',
    'bg-gray-50': 'bg-bgSecondary',
    'bg-gray-100': 'bg-bgSecondary',
    'bg-gray-800': 'bg-bgPrimary',
    'bg-gray-900': 'bg-bgPrimary',
    'bg-black': 'bg-bgPrimary',
    
    // Cards
    'bg-gray-800/50': 'glass-card',
    'bg-white/10': 'glass-card',
    'backdrop-blur-sm': 'glass-card',
    'backdrop-blur-md': 'glass-card',
    
    // Borders
    'border-gray-200': 'border-cardBorder',
    'border-gray-700': 'border-cardBorder',
    'border-gray-800': 'border-cardBorder',
  }
  
  return classMap[oldClass] || oldClass
}

// Enhanced button variants for better theming
export const buttonVariants = {
  primary: cn(
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
    "border border-primary",
    "transition-all duration-200"
  ),
  
  secondary: cn(
    "bg-secondary text-secondary-foreground",
    "hover:bg-secondary/80",
    "border border-secondary",
    "transition-all duration-200"
  ),
  
  glass: cn(
    "glass-card text-textPrimary",
    "hover:bg-glassBg/80",
    "border border-glassBorder",
    "transition-all duration-200"
  ),
  
  ghost: cn(
    "bg-transparent text-textSecondary",
    "hover:bg-secondary/50 hover:text-textPrimary",
    "transition-all duration-200"
  )
}

// Form input styling
export const inputStyles = cn(
  "glass-card",
  "text-textPrimary placeholder:text-textMuted",
  "border-glassBorder focus:border-primary",
  "transition-all duration-200"
)

// Legacy theme classes for migration
export const themeClasses = {
  text: {
    primary: "text-textPrimary",
    secondary: "text-textSecondary", 
    muted: "text-textMuted",
    accent: "text-techBlue"
  },
  
  bg: {
    primary: "bg-bgPrimary",
    secondary: "bg-bgSecondary",
    card: "glass-card",
    navbar: "glass-navbar"
  }
}

export default componentStyles
