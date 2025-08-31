import { 
  GitHubRepo, 
  GitHubLanguages, 
  ProcessedProject, 
  PinnedRepo,
  GraphQLPinnedRepo,
  FEATURED_REPOS, 
  CATEGORY_MAPPING,
  LANGUAGE_COLORS
} from './github-types'

const GITHUB_API_BASE = 'https://api.github.com'
const USERNAME = 'jinish2170'

// Third-party pinned repos APIs (fallback options)
const PINNED_APIS = [
  `https://pinned.berrysauce.dev/get/${USERNAME}`,
  `https://gh-pinned-repos.herokuapp.com/${USERNAME}`
]

// Cache duration in milliseconds (30 minutes for pinned, 1 hour for repos)
const PINNED_CACHE_DURATION = 30 * 60 * 1000
const REPO_CACHE_DURATION = 60 * 60 * 1000

interface CacheItem {
  data: any
  timestamp: number
}

// Simple in-memory cache
const cache = new Map<string, CacheItem>()

// Helper function to check if cache is valid
function isCacheValid(timestamp: number, duration: number): boolean {
  return Date.now() - timestamp < duration
}

// Helper function to get from cache
function getFromCache<T>(key: string, duration: number): T | null {
  const item = cache.get(key)
  if (item && isCacheValid(item.timestamp, duration)) {
    return item.data
  }
  cache.delete(key) // Remove expired cache
  return null
}

// Helper function to set cache
function setCache(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

// Fetch with error handling and rate limiting
async function fetchGitHub(endpoint: string): Promise<any> {
  const cacheKey = endpoint
  const cached = getFromCache(cacheKey, REPO_CACHE_DURATION)
  if (cached) {
    return cached
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website'
    }

    // Add GitHub token if available
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour in Next.js
    })

    if (!response.ok) {
      // Log rate limit info for debugging
      const remaining = response.headers.get('x-ratelimit-remaining')
      const resetTime = response.headers.get('x-ratelimit-reset')
      console.warn(`GitHub API error: ${response.status}, Rate limit remaining: ${remaining}, Reset: ${resetTime}`)
      
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

// Fetch pinned repositories using multiple APIs
export async function getPinnedRepositories(): Promise<ProcessedProject[]> {
  const cacheKey = 'pinned-repos'
  const cached = getFromCache<ProcessedProject[]>(cacheKey, PINNED_CACHE_DURATION)
  if (cached) {
    return cached
  }

  // Try different APIs for pinned repositories
  for (const apiUrl of PINNED_APIS) {
    try {
      console.log(`Trying pinned repos API: ${apiUrl}`)
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Portfolio-Website'
        },
        next: { revalidate: 1800 } // Cache for 30 minutes
      })

      if (!response.ok) {
        console.warn(`API ${apiUrl} failed with status ${response.status}`)
        continue
      }

      const pinnedRepos = await response.json()
      
      if (Array.isArray(pinnedRepos) && pinnedRepos.length > 0) {
        const processedProjects = await Promise.all(
          pinnedRepos.slice(0, 6).map((repo: PinnedRepo, index: number) => 
            processPinnedRepository(repo, index)
          )
        )
        
        setCache(cacheKey, processedProjects)
        console.log(`Successfully fetched ${processedProjects.length} pinned repos from ${apiUrl}`)
        return processedProjects
      }
    } catch (error) {
      console.warn(`Error with pinned API ${apiUrl}:`, error)
      continue
    }
  }

// Fallback: use featured repositories from regular API
  console.log('Falling back to featured repositories')
  try {
    return await getFallbackFeaturedProjects()
  } catch (error) {
    console.error('All APIs failed, using hardcoded fallback projects:', error)
    return getHardcodedFallbackProjects()
  }
}

// Get all repositories for user
export async function getAllRepositories(): Promise<GitHubRepo[]> {
  try {
    const repos = await fetchGitHub(`/users/${USERNAME}/repos?sort=updated&per_page=100`)
    return repos.filter((repo: GitHubRepo) => !repo.fork && !repo.archived)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return []
  }
}

// Get languages for a repository
export async function getRepositoryLanguages(repoName: string): Promise<GitHubLanguages> {
  try {
    return await fetchGitHub(`/repos/${USERNAME}/${repoName}/languages`)
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error)
    return {}
  }
}

// Determine category based on language and topics
function determineCategory(language: string | null, topics: string[]): string {
  // Check topics first
  for (const topic of topics) {
    const category = CATEGORY_MAPPING[topic.toLowerCase()]
    if (category) return category
  }

  // Check main language
  if (language) {
    const category = CATEGORY_MAPPING[language.toLowerCase()]
    if (category) return category
  }

  // Default category
  return 'Software Development'
}

// Get top languages from languages object
function getTopLanguages(languages: GitHubLanguages, limit = 4): string[] {
  return Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([lang]) => lang)
}

// Enhanced description generator
function generateEnhancedDescription(name: string, description: string | null, category: string): string {
  if (description && description.trim()) {
    return description
  }

  // Generate description based on name and category
  const formattedName = name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const descriptions: Record<string, string> = {
    'AI & Machine Learning': `Advanced ${formattedName} solution leveraging cutting-edge machine learning algorithms and AI technologies for intelligent automation and data analysis.`,
    'AI & Data Science': `Comprehensive ${formattedName} platform utilizing artificial intelligence and data science methodologies for predictive analytics and insights.`,
    'Web Development': `Modern ${formattedName} web application built with contemporary technologies, focusing on user experience and performance optimization.`,
    'Full-Stack Development': `Complete ${formattedName} solution featuring both frontend and backend components with scalable architecture and modern development practices.`,
    'Cybersecurity': `Advanced ${formattedName} security system designed for threat detection, vulnerability assessment, and comprehensive cybersecurity management.`,
    'Mobile Development': `Cross-platform ${formattedName} mobile application delivering seamless user experience across different devices and platforms.`,
    'System Programming': `High-performance ${formattedName} system built with efficient algorithms and optimized for scalability and reliability.`
  }

  return descriptions[category] || `Innovative ${formattedName} project showcasing modern development practices and technical excellence.`
}

// Process pinned repository into project format
async function processPinnedRepository(repo: PinnedRepo, index: number): Promise<ProcessedProject> {
  // Get additional repository details
  let additionalDetails: GitHubRepo | null = null
  try {
    additionalDetails = await fetchGitHub(`/repos/${USERNAME}/${repo.name}`)
  } catch (error) {
    console.warn(`Could not fetch additional details for ${repo.name}`)
  }

  const languages = additionalDetails ? await getRepositoryLanguages(repo.name) : {}
  const topLanguages = getTopLanguages(languages)
  const topics = additionalDetails?.topics || []
  const category = determineCategory(repo.language, topics)
  
  return {
    id: `pinned-${index}`,
    title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: generateEnhancedDescription(repo.name, repo.description, category),
    techStack: topLanguages.length > 0 ? topLanguages : (repo.language ? [repo.language] : ['Code']),
    githubLink: `https://github.com/${repo.author}/${repo.name}`,
    demoLink: additionalDetails?.homepage || undefined,
    category,
    stars: repo.stars || 0,
    forks: repo.forks || 0,
    language: repo.language,
    topics,
    lastUpdated: additionalDetails ? new Date(additionalDetails.updated_at).toLocaleDateString() : 'Recently',
    featured: true,
    isPinned: true,
    languageColor: repo.language ? LANGUAGE_COLORS[repo.language] : undefined
  }
}

// Process regular repository into project format
async function processRepository(repo: GitHubRepo): Promise<ProcessedProject> {
  const languages = await getRepositoryLanguages(repo.name)
  const topLanguages = getTopLanguages(languages)
  const category = determineCategory(repo.language, repo.topics)
  
  return {
    id: repo.id,
    title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: generateEnhancedDescription(repo.name, repo.description, category),
    techStack: topLanguages.length > 0 ? topLanguages : (repo.language ? [repo.language] : ['Code']),
    githubLink: repo.html_url,
    demoLink: repo.homepage || undefined,
    category,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: repo.topics,
    lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
    featured: FEATURED_REPOS.includes(repo.name),
    isPinned: false,
    languageColor: repo.language ? LANGUAGE_COLORS[repo.language] : undefined
  }
}

// Get featured projects (for homepage)
export async function getFeaturedProjects(): Promise<ProcessedProject[]> {
  // First try to get pinned repositories
  try {
    const pinnedProjects = await getPinnedRepositories()
    if (pinnedProjects.length > 0) {
      return pinnedProjects
    }
  } catch (error) {
    console.warn('Could not fetch pinned repositories, falling back to featured repos')
  }

  // Fallback to featured repositories
  return getFallbackFeaturedProjects()
}

// Get fallback featured projects when pinned repos are not available
async function getFallbackFeaturedProjects(): Promise<ProcessedProject[]> {
  try {
    const allRepos = await getAllRepositories()
    const featuredRepos = allRepos.filter(repo => FEATURED_REPOS.includes(repo.name))
    
    // Process repositories in parallel
    const projects = await Promise.all(
      featuredRepos.map(repo => processRepository(repo))
    )
    
    // Sort by stars and last updated
    return projects.sort((a, b) => {
      if (a.stars !== b.stars) {
        return b.stars - a.stars
      }
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }).slice(0, 6) // Limit to 6 projects for homepage
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return getHardcodedFallbackProjects()
  }
}

// Get all projects (for projects page)
export async function getAllProjects(): Promise<ProcessedProject[]> {
  try {
    const allRepos = await getAllRepositories()
    
    // Process repositories in parallel
    const projects = await Promise.all(
      allRepos.map(repo => processRepository(repo))
    )
    
    return projects.sort((a, b) => {
      // Featured projects first
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1
      }
      // Then by stars
      if (a.stars !== b.stars) {
        return b.stars - a.stars
      }
      // Then by last updated
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    })
  } catch (error) {
    console.error('Error fetching all projects:', error)
    return getHardcodedFallbackProjects()
  }
}

// Hardcoded fallback projects in case all APIs fail
function getHardcodedFallbackProjects(): ProcessedProject[] {
  return [
    {
      id: 'fallback-1',
      title: "BenardAI",
      description: "Advanced cybersecurity AI solution with threat detection and prevention capabilities. Built with modern ML algorithms and real-time monitoring.",
      techStack: ["Python", "TensorFlow", "FastAPI", "Docker"],
      githubLink: "https://github.com/Jinish2170/BenardAI",
      category: "AI & Cybersecurity",
      stars: 0,
      forks: 0,
      language: "Python",
      topics: ["ai", "cybersecurity"],
      lastUpdated: "2024-01-15",
      featured: true,
      isPinned: false,
      languageColor: LANGUAGE_COLORS["Python"]
    },
    {
      id: 'fallback-2',
      title: "BigTechTimes",
      description: "Community-driven technology news platform featuring discussions, resources, and insights for tech enthusiasts worldwide.",
      techStack: ["JavaScript", "React", "Node.js", "MongoDB"],
      githubLink: "https://github.com/Jinish2170/BigTechTimes",
      category: "Web Development",
      stars: 0,
      forks: 0,
      language: "JavaScript",
      topics: ["web", "news"],
      lastUpdated: "2024-01-10",
      featured: true,
      isPinned: false,
      languageColor: LANGUAGE_COLORS["JavaScript"]
    },
    {
      id: 'fallback-3',
      title: "BIZZ PORTAL",
      description: "Secure business intelligence platform with encrypted analytics, providing enterprise-grade data management and insights.",
      techStack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
      githubLink: "https://github.com/Jinish2170/BIZZ_PORTAL",
      category: "Full-Stack Development",
      stars: 0,
      forks: 0,
      language: "TypeScript",
      topics: ["business", "analytics"],
      lastUpdated: "2024-01-05",
      featured: true,
      isPinned: false,
      languageColor: LANGUAGE_COLORS["TypeScript"]
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
      totalStars: 0, // Will be calculated from repos
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
