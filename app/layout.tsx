import type React from "react"
import "./globals.css"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
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
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={true} 
          disableTransitionOnChange={false}
          themes={['light', 'dark', 'system']}
        >
          <SkipToContent />
          <KeyboardNavigation />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
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
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
};
