// GitHub Repository types
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  languages_url: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  archived: boolean
  fork: boolean
  private: boolean
}

// Pinned Repository from external API
export interface PinnedRepo {
  author: string
  name: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  url: string
}

// GraphQL Pinned Repository Response
export interface GraphQLPinnedRepo {
  id: string
  name: string
  description: string | null
  url: string
  stargazers: {
    totalCount: number
  }
  forkCount: number
  primaryLanguage?: {
    name: string
    color: string
  }
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string
      }
    }>
  }
  updatedAt: string
  createdAt: string
}

export interface GitHubLanguages {
  [key: string]: number
}

export interface ProcessedProject {
  id: number | string
  title: string
  description: string
  techStack: string[]
  githubLink: string
  demoLink?: string
  category: string
  stars: number
  forks: number
  language: string | null
  topics: string[]
  lastUpdated: string
  featured: boolean
  isPinned?: boolean
  languageColor?: string
}

// Featured repository configuration - fallback if pinned repos not available
export const FEATURED_REPOS = [
  'BenardAI',
  'BigTechTimes', 
  'BIZZ_PORTAL',
  'AI-Powered-Personalized-News-Aggregator',
  'Talknotes',
  'Property_renting-V2.0.0',
  'Skill-Tracker'
]

// Category mapping based on repository characteristics
export const CATEGORY_MAPPING: Record<string, string> = {
  'javascript': 'Web Development',
  'typescript': 'Web Development', 
  'python': 'AI & Data Science',
  'cpp': 'System Programming',
  'c++': 'System Programming',
  'java': 'Backend Development',
  'react': 'Frontend Development',
  'nextjs': 'Full-Stack Development',
  'machine-learning': 'AI & Machine Learning',
  'cybersecurity': 'Cybersecurity',
  'ai': 'Artificial Intelligence',
  'deep-learning': 'AI & Machine Learning',
  'neural-networks': 'AI & Machine Learning',
  'security': 'Cybersecurity',
  'blockchain': 'Blockchain',
  'mobile': 'Mobile Development',
  'web': 'Web Development',
  'api': 'Backend Development',
  'database': 'Data Engineering',
  'devops': 'DevOps & Infrastructure'
}

// Programming language colors (GitHub standard)
export const LANGUAGE_COLORS: Record<string, string> = {
  'JavaScript': '#f1e05a',
  'TypeScript': '#2b7489',
  'Python': '#3572A5',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C': '#555555',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Shell': '#89e051',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'PHP': '#4F5D95',
  'Ruby': '#701516',
  'Swift': '#ffac45',
  'Kotlin': '#F18E33',
  'Dart': '#00B4AB'
}
