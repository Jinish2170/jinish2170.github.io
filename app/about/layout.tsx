import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Jinish Kathiriya | AI & ML Engineer | Cybersecurity Specialist",
  description: "Portfolio of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer. Learn about his journey, achievements, and expertise.",
  keywords: "Jinish Kathiriya about, AI Engineer, Machine Learning Engineer, Cybersecurity Specialist, Full-Stack Developer, Google Developer Group, Technical Head, Computer Engineering",
  openGraph: {
    title: "About Jinish Kathiriya | AI & ML Engineer | Cybersecurity Specialist", 
    description: "Portfolio of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer.",
    url: "https://jinish2170.github.io/about",
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
