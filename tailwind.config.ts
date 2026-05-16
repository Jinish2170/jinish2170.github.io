import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // === BASE SEMANTIC COLORS (Shadcn defaults) ===
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // === PREMIUM BRAND COLORS (Sophisticated Palette) ===
        // Primary Accent - Deep Royal Blue (trust, professionalism)
        royal: {
          50: "hsl(221, 83%, 95%)",
          100: "hsl(221, 83%, 90%)",
          200: "hsl(221, 83%, 80%)",
          300: "hsl(221, 83%, 70%)",
          400: "hsl(221, 83%, 60%)",
          500: "hsl(221, 83%, 53%)", // Primary accent
          600: "hsl(221, 83%, 45%)",
          700: "hsl(221, 83%, 35%)",
          800: "hsl(221, 83%, 25%)",
          900: "hsl(221, 83%, 15%)",
        },

        // Secondary Accent - Warm Gold (premium, luxury touch)
        gold: {
          50: "hsl(45, 87%, 95%)",
          100: "hsl(45, 87%, 90%)",
          200: "hsl(45, 87%, 80%)",
          300: "hsl(45, 87%, 70%)",
          400: "hsl(45, 87%, 60%)", // Primary gold
          500: "hsl(45, 87%, 53%)",
          600: "hsl(45, 87%, 45%)",
          700: "hsl(45, 87%, 35%)",
          800: "hsl(45, 87%, 25%)",
          900: "hsl(45, 87%, 15%)",
        },

        // Tertiary - Cool Slate (sophisticated neutral)
        slate: {
          50: "hsl(220, 14%, 96%)",
          100: "hsl(220, 14%, 93%)",
          200: "hsl(220, 14%, 86%)",
          300: "hsl(220, 14%, 70%)",
          400: "hsl(220, 14%, 55%)",
          500: "hsl(220, 14%, 45%)",
          600: "hsl(220, 14%, 35%)",
          700: "hsl(220, 14%, 25%)",
          800: "hsl(220, 14%, 15%)",
          900: "hsl(220, 14%, 9%)",
        },

        // === PREMIUM SEMANTIC COLORS ===
        textPrimary: "hsl(var(--text-primary))",
        textSecondary: "hsl(var(--text-secondary))",
        textMuted: "hsl(var(--text-muted))",

        // Background layers (depth system)
        bgPrimary: "hsl(var(--bg-primary))",
        bgSecondary: "hsl(var(--bg-secondary))",
        bgTertiary: "hsl(var(--bg-tertiary))",
        bgCard: "hsl(var(--bg-card))",
        bgElevated: "hsl(var(--bg-elevated))",

        // Surface & border system
        surface: "hsl(var(--surface))",
        surfaceHover: "hsl(var(--surface-hover))",
        cardBorder: "hsl(var(--card-border))",
        navbarBg: "hsl(var(--navbar-bg))",

        // Glass morphism (premium blur effects)
        glassBg: "hsl(var(--glass-bg))",
        glassBorder: "hsl(var(--glass-border))",
        glassStrong: "hsl(var(--glass-strong))",

        // Status colors (refined)
        success: "hsl(142, 71%, 45%)",
        warning: "hsl(38, 92%, 50%)",
        info: "hsl(221, 83%, 53%)",
      },

      // === PREMIUM BORDER RADIUS SYSTEM ===
      borderRadius: {
        sm: "0.375rem",    // 6px - small elements
        DEFAULT: "0.5rem",  // 8px - standard
        md: "0.75rem",       // 12px - cards
        lg: "1rem",          // 16px - large cards
        xl: "1.5rem",       // 24px - sections
        "2xl": "2rem",      // 32px - hero elements
        "3xl": "2.5rem",    // 40px - large modals
        full: "9999px",
      },

      // === PREMIUM BOX SHADOW SYSTEM ===
      boxShadow: {
        // Subtle depth
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",

        // Premium glow effects (use sparingly)
        glow: {
          royal: "0 0 20px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.1)",
          gold: "0 0 20px rgba(245, 158, 11, 0.15), 0 0 40px rgba(245, 158, 11, 0.1)",
        },

        // Inner shadows for depth
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        "inner-lg": "inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)",
      },

      // === PREMIUM ANIMATION KEYFRAMES ===
      keyframes: {
        // Smooth accordion
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // Premium fade effects
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        // Sophisticated shimmer
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },

        // Premium pulse (subtle)
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },

        // Elegant slide
        "slide-in-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },

      animation: {
        // Accordion
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // Premium animations
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        shimmer: "shimmer 3s linear infinite",
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "slide-in-left": "slide-in-left 0.4s ease-out",
      },

      // === PREMIUM TYPOGRAPHY SCALE ===
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },

      // === PREMIUM SPACING SYSTEM ===
      spacing: {
        // Generous whitespace for premium feel
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "176": "44rem",
        "192": "48rem",
        "208": "52rem",
        "224": "56rem",
        "240": "60rem",
      },

      // === PREMIUM TRANSITIONS ===
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "100ms",
        normal: "200ms",
        slow: "300ms",
        slower: "500ms",
      },

      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        premium: "cubic-bezier(0.16, 1, 0.3, 1)", // Smooth premium feel
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
