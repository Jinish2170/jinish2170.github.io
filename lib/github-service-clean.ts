import { GitHubRepo, ProcessedProject, PinnedRepo, GitHubLanguages } from './github-types'

// Constants
const GITHUB_API_BASE = 'https://api.github.com'
const USERNAME = 'Jinish2170'
const PINNED_CACHE_DURATION = 30 * 60 * 1000 // 30 minutes
const REPO_CACHE_DURATION = 60 * 60 * 1000 // 1 hour

// External APIs for pinned repositories
const PINNED_APIS = [
  `https://pinned.berrysauce.dev/get/${USERNAME}`,
  `https://gh-pinned-repos.herokuapp.com/${USERNAME}`
]

// Category mapping
const CATEGORY_MAPPING: { [key: string]: string } = {
  'javascript': 'Web Development',
  'typescript': 'Web Development',
  'python': 'AI & Machine Learning',
  'java': 'Backend Development',
  'react': 'Frontend Development',
  'nextjs': 'Full-Stack Development',
  'ai': 'AI & Machine Learning',
  'ml': 'AI & Machine Learning',
  'cybersecurity': 'Cybersecurity',
  'security': 'Cybersecurity',
  'blockchain': 'Blockchain',
  'mobile': 'Mobile Development'
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()

function getFromCache<T>(key: string, maxAge: number): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.data as T
  }
  return null
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

// Fetch GitHub API with error handling
async function fetchGitHub(endpoint: string): Promise<any> {
  const cacheKey = endpoint
  const cached = getFromCache(cacheKey, REPO_CACHE_DURATION)
  if (cached) return cached

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website'
    }

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers,
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      const remaining = response.headers.get('x-ratelimit-remaining')
      const resetTime = response.headers.get('x-ratelimit-reset')
      console.warn(`GitHub API error: ${response.status}, Rate limit remaining: ${remaining}`)
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    setCache(cacheKey, data)
    return data
  } catch (error) {
    console.error(`Error fetching GitHub data from ${endpoint}:`, error)
    throw error
  }
}

// Process pinned repository data
async function processPinnedRepository(repo: PinnedRepo): Promise<ProcessedProject> {
  try {
    // Get additional repo details from GitHub API
    const repoDetails = await fetchGitHub(`/repos/${USERNAME}/${repo.name}`)
    
    return {
      id: repo.name,
      title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || repoDetails.description || "No description available",
      techStack: repo.topics?.slice(0, 6) || repoDetails.topics?.slice(0, 6) || [repoDetails.language].filter(Boolean),
      githubLink: repo.url || repoDetails.html_url,
      demoLink: repoDetails.homepage || undefined,
      category: determineCategory(repoDetails.language, repoDetails.topics || []),
      stars: repoDetails.stargazers_count || 0,
      forks: repoDetails.forks_count || 0,
      language: repoDetails.language,
      topics: repoDetails.topics || [],
      lastUpdated: new Date(repoDetails.updated_at).toLocaleDateString(),
      featured: true,
      isPinned: true,
      languageColor: getLanguageColor(repoDetails.language)
    }
  } catch (error) {
    console.error(`Error processing pinned repo ${repo.name}:`, error)
    // Return basic info if detailed fetch fails
    return {
      id: repo.name,
      title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || "No description available",
      techStack: repo.topics?.slice(0, 3) || ["Web"],
      githubLink: repo.url,
      category: "Software Development",
      stars: 0,
      forks: 0,
      language: null,
      topics: repo.topics || [],
      lastUpdated: "Recently",
      featured: true,
      isPinned: true,
      languageColor: "#6366f1"
    }
  }
}

// Get pinned repositories
export async function getPinnedRepositories(): Promise<ProcessedProject[]> {
  const cacheKey = 'pinned-repos'
  const cached = getFromCache<ProcessedProject[]>(cacheKey, PINNED_CACHE_DURATION)
  if (cached) return cached

  // Try external APIs for pinned repositories
  for (const apiUrl of PINNED_APIS) {
    try {
      console.log(`Trying pinned repos API: ${apiUrl}`)
      const response = await fetch(apiUrl, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'Portfolio-Website' },
        next: { revalidate: 1800 }
      })

      if (!response.ok) {
        console.warn(`API ${apiUrl} failed with status ${response.status}`)
        continue
      }

      const pinnedRepos = await response.json()
      
      if (Array.isArray(pinnedRepos) && pinnedRepos.length > 0) {
        const processedProjects = await Promise.all(
          pinnedRepos.slice(0, 6).map(repo => processPinnedRepository(repo))
        )
        
        setCache(cacheKey, processedProjects)
        console.log(`Successfully fetched ${processedProjects.length} pinned repos`)
        return processedProjects
      }
    } catch (error) {
      console.warn(`Error with pinned API ${apiUrl}:`, error)
      continue
    }
  }

  // Fallback: get featured repositories
  console.log('All pinned APIs failed, falling back to featured repos')
  return getFallbackFeaturedProjects()
}

// Get all repositories for the projects page
export async function getAllRepositories(): Promise<ProcessedProject[]> {
  const cacheKey = 'all-repos'
  const cached = getFromCache<ProcessedProject[]>(cacheKey, REPO_CACHE_DURATION)
  if (cached) return cached

  try {
    const repos = await fetchGitHub(`/users/${USERNAME}/repos?sort=updated&per_page=50`)
    const filteredRepos = repos.filter((repo: GitHubRepo) => !repo.fork && !repo.archived)
    
    const processedProjects = await Promise.all(
      filteredRepos.map((repo: GitHubRepo) => processRepository(repo))
    )
    
    // Sort by last updated
    processedProjects.sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )
    
    setCache(cacheKey, processedProjects)
    return processedProjects
  } catch (error) {
    console.error('Error fetching all repositories:', error)
    return getHardcodedFallbackProjects()
  }
}

// Process regular repository data
async function processRepository(repo: GitHubRepo): Promise<ProcessedProject> {
  return {
    id: repo.id.toString(),
    title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || "No description available",
    techStack: repo.topics?.slice(0, 6) || [repo.language].filter(Boolean) || ["Web"],
    githubLink: repo.html_url,
    demoLink: repo.homepage || undefined,
    category: determineCategory(repo.language, repo.topics || []),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics || [],
    lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
    featured: false,
    isPinned: false,
    languageColor: getLanguageColor(repo.language)
  }
}

// Fallback featured projects
async function getFallbackFeaturedProjects(): Promise<ProcessedProject[]> {
  try {
    const repos = await fetchGitHub(`/users/${USERNAME}/repos?sort=stars&per_page=6`)
    const featuredRepos = repos.filter((repo: GitHubRepo) => !repo.fork && !repo.archived)
    
    return Promise.all(
      featuredRepos.slice(0, 6).map((repo: GitHubRepo) => processRepository(repo))
    )
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return getHardcodedFallbackProjects()
  }
}

// Determine category based on language and topics
function determineCategory(language: string | null, topics: string[]): string {
  for (const topic of topics) {
    const category = CATEGORY_MAPPING[topic.toLowerCase()]
    if (category) return category
  }

  if (language) {
    const category = CATEGORY_MAPPING[language.toLowerCase()]
    if (category) return category
  }

  return 'Software Development'
}

// Get language color
function getLanguageColor(language: string | null): string {
  const colors: { [key: string]: string } = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#1572B6',
    'React': '#61dafb',
    'Vue': '#4FC08D',
    'Go': '#00ADD8',
    'Rust': '#dea584'
  }
  return colors[language || ''] || '#6366f1'
}

// Hardcoded fallback projects
function getHardcodedFallbackProjects(): ProcessedProject[] {
  return [
    {
      id: 'fallback-1',
      title: "Portfolio Website",
      description: "Modern portfolio website built with Next.js 15, featuring sophisticated UI design and GitHub integration.",
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      githubLink: "https://github.com/Jinish2170/jinish2170.github.io",
      category: "Web Development",
      stars: 0,
      forks: 0,
      language: "TypeScript",
      topics: ["portfolio", "nextjs", "react"],
      lastUpdated: "2024-12-20",
      featured: true,
      isPinned: true,
      languageColor: "#2b7489"
    },
    {
      id: 'fallback-2',
      title: "BenardAI",
      description: "Advanced cybersecurity AI solution with real-time threat detection and prevention capabilities.",
      techStack: ["Python", "TensorFlow", "FastAPI", "Docker"],
      githubLink: "https://github.com/Jinish2170/BenardAI",
      category: "AI & Machine Learning",
      stars: 0,
      forks: 0,
      language: "Python",
      topics: ["ai", "cybersecurity", "machine-learning"],
      lastUpdated: "2024-11-15",
      featured: true,
      isPinned: true,
      languageColor: "#3572A5"
    },
    {
      id: 'fallback-3',
      title: "BigTechTimes",
      description: "Community-driven technology news platform featuring real-time discussions and insights.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      githubLink: "https://github.com/Jinish2170/BigTechTimes",
      category: "Web Development",
      stars: 0,
      forks: 0,
      language: "TypeScript",
      topics: ["news", "community", "tech"],
      lastUpdated: "2024-10-20",
      featured: true,
      isPinned: false,
      languageColor: "#2b7489"
    }
  ]
}

// Get GitHub profile stats
export async function getGitHubStats() {
  try {
    const user = await fetchGitHub(`/users/${USERNAME}`)
    return {
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      totalStars: 0,
      profile: {
        name: user.name,
        bio: user.bio,
        location: user.location,
        company: user.company,
        blog: user.blog,
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url
      }
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    return null
  }
}
