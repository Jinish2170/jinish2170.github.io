import type React from "react"
import "./globals.css"
import "./enhanced-styles.css"
import { Inter, Poppins } from "next/font/google"
import ClientLayout from "@/components/client-layout"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import KeyboardNavigation from "@/components/keyboard-navigation"
import SkipToContent from "@/components/skip-to-content"

// Load fonts properly with Next.js
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jinish Kathiriya",
    "jobTitle": ["Aspiring Tech Founder", "Cybersecurity & AI Enthusiast", "Software Engineer in Making", "GTU CSE Student"],
    "description": "Aspiring Tech Founder, Cybersecurity & AI Enthusiast, and Software Engineer in Making. Technical Head at Google Developer Group (GDG) CKPCET. Currently pursuing B.E. in Computer Engineering at CKPCET under GTU.",
    "url": "https://jinish2170.github.io",
    "image": "https://jinish2170.github.io/og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://github.com/Jinish2170",
      "https://linkedin.com/in/jinish-kathiriya",
      "https://twitter.com/JinishKathiriya"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Google Developer Group (GDG) CKPCET",
      "description": "Technical Head"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "CKPCET",
      "description": "B.E. in Computer Engineering, Semester 6, under GTU"
    },
    "knowsAbout": [
      "Cybersecurity",
      "Artificial Intelligence",
      "Software Engineering",
      "Tech Entrepreneurship",
      "Computer Engineering",
      "Python",
      "JavaScript",
      "React",
      "Next.js",
      "Machine Learning"
    ],
    "knowsLanguage": ["English", "Hindi", "Gujarati"],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "jinishkathiriya@gmail.com",
      "contactType": "professional"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Jinish Kathiriya" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* Critical CSS for fast initial rendering */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { background-color: rgb(9, 9, 11); color: rgb(250, 250, 250); }
          .nav-blur { background-color: rgba(9, 9, 11, 0.8); backdrop-filter: blur(8px); }
          .gradient-text { background: linear-gradient(to right, #4f46e5, #8b5cf6); -webkit-background-clip: text; color: transparent; }
          
          /* Animation keyframes */
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideRight { 0% { transform: translateX(-50%) skewY(-0.5deg); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(50%) skewY(-0.5deg); opacity: 0; } }
          @keyframes slideLeft { 0% { transform: translateX(50%) skewY(0.5deg); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(-50%) skewY(0.5deg); opacity: 0; } }
          @keyframes floatSlow { 0%, 100% { transform: translateY(0px) rotate(inherit); } 50% { transform: translateY(-10px) rotate(calc(inherit + 5deg)); } }
          @keyframes pulseSoft { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
          @keyframes pulseLight { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.03); } }
          @keyframes architecturalRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          
          /* Gradient utilities */
          .bg-gradient-conic { background: conic-gradient(var(--tw-gradient-stops)); }
          .bg-gradient-radial { background: radial-gradient(circle, var(--tw-gradient-stops)); }
          
          /* Layout utilities */
          .section-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
          .section-padding { padding: 6rem 0; }
        `}} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect and preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          as="style"
        />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/placeholder.jpg" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//twitter.com" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {/* Professional Site-Wide Background */}
                {/* Premium sophisticated background with eye-catching elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Base gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/90" />
          
          {/* Advanced layered grid system */}
          <div className="absolute inset-0">
            {/* Primary precision grid */}
            <div 
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                  linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
            
            {/* Secondary angled grid for depth */}
            <div 
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, hsl(var(--border)) 0.5px, transparent 0.5px),
                  linear-gradient(-45deg, hsl(var(--border)) 0.5px, transparent 0.5px)
                `,
                backgroundSize: '120px 120px'
              }}
            />
            
            {/* Premium dotted overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(hsl(var(--border)) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0'
              }}
            />
          </div>
          
          {/* Architectural premium elements */}
          <div className="absolute inset-0">
            {/* Large circular blueprint elements */}
            <div 
              className="absolute -top-48 -right-48 w-[600px] h-[600px]"
              style={{
                background: `
                  conic-gradient(from 0deg at 50% 50%,
                    transparent 0deg,
                    transparent 340deg,
                    hsl(var(--border)/.15) 360deg
                  )
                `,
                borderRadius: '50%',
                animation: 'architecturalRotate 60s linear infinite'
              }}
            />
            
            <div 
              className="absolute -bottom-48 -left-48 w-[500px] h-[500px]"
              style={{
                background: `
                  repeating-conic-gradient(
                    hsl(var(--border)/.05) 0deg 5deg,
                    transparent 5deg 10deg
                  )
                `,
                borderRadius: '50%',
                animation: 'architecturalRotate 90s linear infinite reverse'
              }}
            />
            
            {/* Central design system */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.07] dark:opacity-[0.09]">
              <div 
                className="absolute inset-0 border border-border/30 rounded-full"
                style={{ animation: 'pulseLight 15s ease-in-out infinite' }}
              />
              <div 
                className="absolute inset-[30px] border border-border/25 rounded-full"
                style={{ animation: 'pulseLight 12s ease-in-out infinite reverse' }}
              />
              <div 
                className="absolute inset-[60px] border border-border/20 rounded-full"
                style={{ animation: 'pulseLight 9s ease-in-out infinite' }}
              />
              <div 
                className="absolute inset-[90px] border border-border/15 rounded-full"
                style={{ animation: 'pulseLight 6s ease-in-out infinite reverse' }}
              />
            </div>
            
            {/* Premium geometric floating elements */}
            <div 
              className="absolute top-[15%] left-[20%] w-8 h-8 border border-blue-500/20 dark:border-blue-600/20 rounded"
              style={{ 
                transform: 'rotate(15deg)',
                animation: 'floatSlow 8s ease-in-out infinite'
              }}
            />
            
            <div 
              className="absolute top-[60%] right-[25%] w-12 h-5 border border-purple-500/15 dark:border-purple-600/20 rounded-sm"
              style={{ 
                transform: 'rotate(-20deg)',
                animation: 'floatSlow 12s ease-in-out infinite reverse'
              }}
            />
            
            <div 
              className="absolute top-[30%] right-[15%] w-6 h-6 border border-cyan-500/15 dark:border-cyan-600/15"
              style={{ 
                transform: 'rotate(30deg)',
                animation: 'floatSlow 9s ease-in-out infinite'
              }}
            />
            
            <div 
              className="absolute bottom-[20%] left-[30%] w-16 h-3 border border-slate-500/15 dark:border-slate-400/20 rounded-md"
              style={{ 
                transform: 'rotate(-10deg)',
                animation: 'floatSlow 15s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Premium gradient orbs with depth */}
          <div 
            className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-gradient-conic from-blue-500/5 via-transparent to-blue-600/10 dark:from-blue-600/10 dark:to-blue-700/15 rounded-full blur-[80px]"
            style={{ animation: 'pulseSoft 15s ease-in-out infinite' }}
          />
          
          <div 
            className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-gradient-conic from-purple-500/5 via-transparent to-purple-600/10 dark:from-purple-600/10 dark:to-purple-700/15 rounded-full blur-[80px]"
            style={{ animation: 'pulseSoft 18s ease-in-out infinite reverse' }}
          />
          
          <div 
            className="absolute top-1/2 left-1/3 w-[25vw] h-[25vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-cyan-500/5 via-cyan-500/3 to-transparent dark:from-cyan-600/8 dark:via-cyan-600/3 rounded-full blur-[60px]"
            style={{ animation: 'pulseSoft 20s ease-in-out infinite' }}
          />
          
          {/* Ambient animated gradient lines */}
          <div className="absolute inset-0">
            <div 
              className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 dark:via-blue-600/30 to-transparent"
              style={{ 
                animation: 'slideRight 18s ease-in-out infinite alternate',
                transform: 'skewY(-0.5deg)'
              }}
            />
            
            <div 
              className="absolute top-[60%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/15 dark:via-purple-600/25 to-transparent"
              style={{ 
                animation: 'slideLeft 20s ease-in-out infinite alternate',
                transform: 'skewY(0.5deg)'
              }}
            />
            
            <div 
              className="absolute top-[45%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 dark:via-cyan-600/20 to-transparent"
              style={{ 
                animation: 'slideRight 22s ease-in-out infinite alternate',
                transform: 'skewY(-0.3deg)'
              }}
            />
          </div>
          
          {/* Premium light flare effect */}
          <div 
            className="absolute top-[15%] right-[20%] w-[150px] h-[150px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-md"
            style={{ animation: 'pulseSoft 10s ease-in-out infinite' }}
          />
          
          <div 
            className="absolute bottom-[25%] left-[15%] w-[100px] h-[100px] bg-gradient-radial from-white/3 to-transparent rounded-full blur-sm"
            style={{ animation: 'pulseSoft 8s ease-in-out infinite reverse' }}
          />
        </div>

        
        <ClientLayout>
          <SkipToContent />
          <KeyboardNavigation />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </ClientLayout>
      </body>
    </html>
  )
}

export const metadata = {
  title: {
    default: "Jinish Kathiriya | AI & ML Engineer | Cybersecurity Specialist",
    template: "%s | Jinish Kathiriya"
  },
  description: "Portfolio of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer",
  keywords: [
    "Jinish",
    "Jinish Kathiriya", 
    "AI Engineer",
    "Machine Learning Engineer",
    "Cybersecurity Specialist", 
    "Full-Stack Developer",
    "Google Developer Group",
    "GDG CKPCET",
    "Technical Head",
    "Computer Engineering",
    "CKPCET",
    "GTU",
    "Surat Gujarat",
    "Portfolio",
    "Developer Portfolio"
  ],
  authors: [{ name: "Jinish Kathiriya" }],
  creator: "Jinish Kathiriya",
  publisher: "Jinish Kathiriya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jinish2170.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jinish2170.github.io",
    title: "Jinish Kathiriya | AI & ML Engineer | Cybersecurity Specialist",
    description: "Portfolio of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer",
    siteName: "Jinish Kathiriya Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jinish Kathiriya - AI & ML Engineer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinish Kathiriya | AI & ML Engineer | Cybersecurity Specialist",
    description: "Portfolio of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer",
    site: "@JinishKathiriya",
    creator: "@JinishKathiriya",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
  },
  generator: 'Next.js',
  applicationName: 'Jinish Kathiriya Portfolio',
  referrer: 'origin-when-cross-origin',
};

export const viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
};
