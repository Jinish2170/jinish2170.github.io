// Global Type Definitions
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  image?: string;
  projectUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
  language?: string;
  license?: string;
  overview?: string;
  challenges?: string[];
  solutions?: string[];
  outcomes?: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'languages';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface NavLink {
  name: string;
  href: string;
  type: 'link' | 'scroll';
}

// Animation Types
export interface AnimationVariants {
  hidden: any;
  visible: any;
}

// Hero Component Types
export interface HeroProps {
  personalInfo?: PersonalInfo;
  socialLinks?: SocialLinks;
}
