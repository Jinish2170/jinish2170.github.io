import type React from "react"
import "./globals.css"
import "./enhanced-styles.css"
import { Inter, Poppins } from "next/font/google"
import ClientLayout from "@/components/client-layout"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer-premium"
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
    "jobTitle": ["Full Stack Developer", "GenAI Developer", "Backend Systems Engineer", "AI & ML Engineer"],
    "description": "Full Stack Developer specializing in GenAI and Backend Systems. Technical Head at Google Developer Group (GDG) CKPCET. Currently pursuing B.E. in Computer Engineering at CKPCET under GTU.",
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
      "Generative AI",
      "Backend Systems",
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Node.js",
      "Python",
      "TypeScript",
      "React",
      "Next.js"
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
        
        {/* Critical inline CSS — bare minimum to avoid FOUC on first paint */}
        <style dangerouslySetInnerHTML={{ __html: `
          html { background-color: #0a0a0a; }
          body { background-color: hsl(0 0% 4%); color: hsl(0 0% 96%); }
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
        {/* Editorial backdrop — single fine grid + grain. No animation. */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 grid-fine" />
          <div className="grain" />
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
