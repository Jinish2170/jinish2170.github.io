import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Github, ExternalLink, Calendar, Code } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import ProjectShowcase from "@/components/project-showcase"

export const metadata: Metadata = {
  title: "Projects | Jinish Kathiriya",
  description:
    "Explore the projects and work of Jinish Kathiriya, AI & ML Engineer, Cybersecurity Specialist, and Full-Stack Developer",
}

export default function ProjectsPage() {
  const projects = [
    {
      id: "benardai",
      name: "BenardAI",
      description:
        "SECyour AI - A cybersecurity AI solution that provides advanced threat detection and prevention capabilities using machine learning algorithms.",
      longDescription:
        "BenardAI is a comprehensive cybersecurity solution powered by artificial intelligence. It leverages advanced machine learning algorithms to detect, analyze, and prevent security threats in real-time. The system continuously learns from new attack patterns and adapts its defense mechanisms accordingly, providing robust protection against evolving cyber threats.",
      image: "/placeholder.svg?height=400&width=600",
      category: "AI & Cybersecurity",
      technologies: ["Python", "TensorFlow", "Cybersecurity APIs", "Docker"],
      createdAt: "August 24, 2024",
      updatedAt: "September 24, 2024",
      language: "Python",
      license: "MIT License",
      githubUrl: "https://github.com/Jinish2170/BenardAI",
      demoUrl: "#",
      featured: true,
      challenges:
        "Implementing real-time threat detection while maintaining low false positive rates was a significant challenge. Additionally, ensuring the system could adapt to new attack vectors without requiring constant manual updates required innovative approaches to machine learning model training.",
      solutions:
        "We developed a hybrid detection system that combines signature-based detection with anomaly detection using deep learning. This approach significantly reduced false positives while maintaining high detection rates. We also implemented a continuous learning pipeline that allows the system to adapt to new threats automatically.",
    },
    {
      id: "bigtechtime",
      name: "BigTechTimes",
      description:
        "A community website focused on technology news, discussions, and resources for tech enthusiasts and professionals.",
      longDescription:
        "BigTechTimes is a dynamic community platform that brings together technology enthusiasts, professionals, and curious minds. The website features curated tech news, in-depth articles, community discussions, and resources for learning and professional development. With a focus on emerging technologies and industry trends, BigTechTimes serves as a hub for staying informed and connected in the rapidly evolving tech landscape.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Web Development",
      technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
      createdAt: "October 5, 2024",
      updatedAt: "Recent",
      language: "JavaScript",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/BigTechTimes",
      demoUrl: "#",
      featured: true,
      challenges:
        "Creating an engaging community platform that could handle high traffic volumes while maintaining fast load times was challenging. We also needed to implement a robust content moderation system to ensure quality discussions.",
      solutions:
        "We implemented server-side rendering with Next.js to improve performance and SEO. For content moderation, we developed a hybrid system that combines automated filtering with community-based moderation, which has proven effective at maintaining content quality.",
    },
    {
      id: "bizzportal",
      name: "BizzPortal",
      description:
        "A secure business intelligence platform with end-to-end encrypted analytics for enterprise data management and visualization.",
      longDescription:
        "BizzPortal is an enterprise-grade business intelligence platform designed with security at its core. It provides comprehensive data analytics, visualization, and reporting capabilities while ensuring end-to-end encryption of sensitive business data. The platform enables organizations to make data-driven decisions without compromising on data security or privacy.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Full-Stack",
      technologies: ["JavaScript", "React", "Node.js", "MongoDB", "JWT", "D3.js"],
      createdAt: "January 13, 2025",
      updatedAt: "Recent",
      language: "JavaScript",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/BizzPortal",
      demoUrl: "#",
      featured: true,
      challenges:
        "Implementing end-to-end encryption while maintaining the ability to perform complex analytics operations on the data was a significant technical challenge. We also needed to ensure the platform remained performant even with large datasets.",
      solutions:
        "We developed a novel approach to homomorphic encryption that allows certain analytical operations to be performed on encrypted data. For performance optimization, we implemented a tiered caching system and data pre-aggregation strategies that significantly improved query response times.",
    },
    {
      id: "chessbot",
      name: "Neural Chess Engine",
      description:
        "AI-powered chess bot with neural network evaluation that self-improves through reinforcement learning.",
      longDescription:
        "The Neural Chess Engine is an advanced AI system that combines traditional chess algorithms with neural network evaluation to create a powerful and adaptive chess opponent. Unlike conventional chess engines that rely solely on handcrafted evaluation functions, this engine uses deep learning to develop its own understanding of chess positions. Through reinforcement learning, it continuously improves its play by learning from games against itself and other engines.",
      image: "/placeholder.svg?height=400&width=600",
      category: "AI & ML",
      technologies: ["Python", "TensorFlow", "Alpha-Beta Pruning", "Reinforcement Learning"],
      createdAt: "May 10, 2024",
      updatedAt: "September 20, 2024",
      language: "Python",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/CHESS-BOT-",
      demoUrl: "#",
      featured: true,
      challenges:
        "Training a neural network that could effectively evaluate chess positions was computationally intensive and required innovative approaches to data generation and model architecture. Balancing the traditional search algorithms with neural network evaluation also presented unique challenges.",
      solutions:
        "We implemented a distributed training system that generated millions of self-play games to train the neural network. We also developed a hybrid evaluation approach that combines the neural network's positional understanding with traditional tactical calculations, resulting in a more balanced and effective chess engine.",
    },
    {
      id: "cybersecurity",
      name: "AI-Powered Security Scanner",
      description: "Zero-day malware detection using deep learning with a 97% detection rate on unknown threats.",
      longDescription:
        "The AI-Powered Security Scanner is a cutting-edge cybersecurity tool that leverages deep learning to detect previously unknown (zero-day) malware and security threats. Unlike traditional signature-based antivirus solutions, this scanner analyzes file behavior patterns and code structures to identify malicious intent, even in never-before-seen malware variants. With a remarkable 97% detection rate on unknown threats, it provides a significant advantage in protecting systems from emerging cyber attacks.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Cybersecurity",
      technologies: ["Python", "PyTorch", "Cybersecurity APIs"],
      createdAt: "May 10, 2024",
      updatedAt: "September 14, 2024",
      language: "Python",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/Cyber-Security-AI-file-scanner",
      demoUrl: "#",
      featured: true,
      challenges:
        "Developing a system that could detect previously unknown threats required innovative approaches to feature extraction and model training. We also needed to ensure the scanner could operate efficiently without consuming excessive system resources.",
      solutions:
        "We implemented a multi-stage detection pipeline that combines static analysis, dynamic analysis, and deep learning to achieve high detection rates with minimal false positives. We also optimized the scanner to use GPU acceleration when available, significantly improving performance on compatible systems.",
    },
    {
      id: "dailylifemanager",
      name: "DailyLifeManager",
      description:
        "AI-powered productivity tool for task management and scheduling with intelligent prioritization and suggestions.",
      longDescription:
        "DailyLifeManager is an AI-enhanced productivity tool designed to help users manage their tasks, schedules, and goals more effectively. The application uses machine learning algorithms to understand user behavior patterns and preferences, providing intelligent task prioritization, scheduling suggestions, and productivity insights. By adapting to individual work styles and learning from user interactions, DailyLifeManager creates a personalized productivity system that evolves with the user's needs.",
      image: "/placeholder.svg?height=400&width=600",
      category: "AI & ML",
      technologies: ["Python", "Machine Learning", "Natural Language Processing", "Flask"],
      createdAt: "October 9, 2024",
      updatedAt: "October 9, 2024",
      language: "Python",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/DailyLifeManager-AI-Enhanced-Productivity-Tool",
      demoUrl: "#",
      featured: false,
      challenges:
        "Creating an AI system that could effectively understand and adapt to individual user preferences and productivity patterns required sophisticated machine learning approaches. We also needed to balance automation with user control to ensure the tool remained helpful without becoming intrusive.",
      solutions:
        "We developed a hybrid recommendation system that combines collaborative filtering with content-based approaches, allowing the system to make intelligent suggestions while learning from user feedback. We also implemented a flexible automation framework that gives users granular control over how much the AI can manage autonomously.",
    },
    {
      id: "machinelearning",
      name: "Machine Learning Algorithms",
      description:
        "A comprehensive collection of data science and machine learning algorithms implemented from scratch with detailed explanations.",
      longDescription:
        "This repository contains a comprehensive collection of data science and machine learning algorithms implemented from scratch in Python. Each implementation includes detailed explanations of the underlying mathematical concepts, algorithm design choices, and practical applications. The collection covers a wide range of topics, from fundamental statistical methods to advanced deep learning techniques, providing a valuable resource for learning and reference.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Data Science",
      technologies: ["Python", "Jupyter Notebook", "NumPy", "Pandas", "Matplotlib"],
      createdAt: "September 11, 2024",
      updatedAt: "September 11, 2024",
      language: "Jupyter Notebook",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/Machine--learning",
      demoUrl: "#",
      featured: false,
      challenges:
        "Implementing complex algorithms from scratch while ensuring they remained efficient and accurate required deep understanding of both the mathematical foundations and practical programming considerations. Creating clear, educational explanations that would be accessible to learners at different levels was also challenging.",
      solutions:
        "We focused on clean, well-documented implementations that prioritize clarity over premature optimization. Each algorithm is accompanied by visualizations and example applications to help users understand how they work in practice. We also included comparative analyses between different approaches to the same problems.",
    },
    {
      id: "mikeai",
      name: "MikeAI",
      description:
        "Personal AI assistant for laptop that helps with productivity, information retrieval, and system management.",
      longDescription:
        "MikeAI is a sophisticated personal assistant designed specifically for laptop users. It combines natural language processing, machine learning, and system integration to provide a seamless assistant experience directly on your computer. MikeAI can help with productivity tasks, information retrieval, system management, and more, all through a natural conversational interface. Unlike cloud-based assistants, MikeAI prioritizes privacy by processing most requests locally on your device.",
      image: "/placeholder.svg?height=400&width=600",
      category: "AI & ML",
      technologies: ["Python", "Natural Language Processing", "Speech Recognition"],
      createdAt: "Recent",
      updatedAt: "Recent",
      language: "None",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/MikeAI",
      demoUrl: "#",
      featured: false,
      challenges:
        "Creating an assistant that could run efficiently on consumer laptops while providing sophisticated AI capabilities required careful optimization. Integrating with various operating system functions and third-party applications while maintaining security was also challenging.",
      solutions:
        "We implemented a modular architecture that allows the assistant to load only the components needed for specific tasks, reducing memory usage. For system integration, we developed a secure permissions system that gives users granular control over what the assistant can access, ensuring privacy and security.",
    },
    {
      id: "webassistant",
      name: "Intelligent Web Assistant",
      description:
        "NLP-powered web navigation assistant with context-aware command interpretation for enhanced browsing experience.",
      longDescription:
        "The Intelligent Web Assistant is a browser extension that uses natural language processing to enhance web navigation and interaction. It understands context-aware commands, allowing users to interact with websites through natural language instructions. The assistant can help with tasks like finding information on a page, filling out forms, comparing products, extracting data, and automating repetitive browsing tasks. By understanding the context of both the user's request and the current webpage, it provides a more intuitive and efficient browsing experience.",
      image: "/placeholder.svg?height=400&width=600",
      category: "AI & ML",
      technologies: ["Python", "NLP", "Speech Recognition", "JavaScript"],
      createdAt: "May 10, 2024",
      updatedAt: "September 20, 2024",
      language: "Python",
      license: "None",
      githubUrl: "https://github.com/Jinish2170/Web-Assistant-AI",
      demoUrl: "#",
      featured: false,
      challenges:
        "Developing an assistant that could understand the structure and content of arbitrary web pages presented significant technical challenges. We also needed to ensure the assistant could operate securely within the browser's sandbox environment while still providing useful functionality.",
      solutions:
        "We implemented a hybrid approach that combines traditional DOM parsing with computer vision techniques to understand web page layouts. For security, we developed a permission model that requires explicit user approval for sensitive operations, ensuring the assistant cannot access or modify data without user consent.",
    },
  ]

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" asChild className="mr-4">
            <Link href="/">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold">
            My <span className="tech-gradient">Projects</span>
          </h1>
        </div>

        <div className="mb-12">
          <p className="text-lg text-gray-300 max-w-3xl">
            Explore my portfolio of projects spanning AI, cybersecurity, web development, and more. Each project
            represents my passion for creating innovative solutions to complex problems.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 mb-8">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="ai">AI & ML</TabsTrigger>
            <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
            <TabsTrigger value="fullstack">Full-Stack</TabsTrigger>
            <TabsTrigger value="web">Web Development</TabsTrigger>
            <TabsTrigger value="data">Data Science</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => project.category === "AI & ML")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="cybersecurity" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => project.category === "Cybersecurity")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="fullstack" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => project.category === "Full-Stack")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="web" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => project.category === "Web Development")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => project.category === "Data Science")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectShowcase key={project.id} project={project} />
            ))}
        </section>

        <div className="flex justify-center pt-8">
          <Button
            size="lg"
            className="bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90 text-white"
            asChild
          >
            <Link href="/about">Learn More About Me</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

function ProjectCard({ project }) {
  return (
    <Card className="bg-gray-900/50 border border-gray-800 overflow-hidden card-hover h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-xs font-medium px-2 py-1 rounded-full text-techBlue border border-techBlue/30">
          {project.category}
        </div>
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-3">{project.name}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{project.createdAt}</span>
          <span className="mx-2">•</span>
          <Code className="h-4 w-4 mr-1" />
          <span>{project.language}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span key={techIndex} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-md">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="border-techBlue text-techBlue hover:bg-techBlue/10" asChild>
          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> Code
          </Link>
        </Button>
        <Button size="sm" className="bg-gradient-to-r from-techBlue to-techPurple hover:opacity-90" asChild>
          <Link href={`/projects#${project.id}`}>
            <ExternalLink className="mr-2 h-4 w-4" /> Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
