import type { PersonalInfo, SocialLinks, NavLink } from '@/types';

// Personal Information
export const PERSONAL_INFO: PersonalInfo = {
  name: "Jinish Kathiriya",
  title: "Full Stack Developer | GenAI & Backend Systems", 
  email: "jinishkathiriya2170@gmail.com",
  location: "Surat, Gujarat, India",
  bio: "Aspiring Tech Founder, passionate about Cybersecurity & AI, and Software Engineer in Making. Currently pursuing Computer Engineering and serving as Technical Head at GDG CKPCET."
};

// Social Media Links
export const SOCIAL_LINKS: SocialLinks = {
  github: "https://github.com/Jinish2170",
  linkedin: "https://linkedin.com/in/jinish-kathiriya", 
  email: "mailto:jinishkathiriya2170@gmail.com"
};

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/", type: "link" },
  { name: "About", href: "/about", type: "link" },
  { name: "Skills", href: "/#skills", type: "link" },
  { name: "Projects", href: "/projects", type: "link" },
  { name: "Contact", href: "/#contact", type: "link" },
];

// Hero Section Config
export const HERO_TITLES = [
  "GenAI Developer",
  "Backend Systems Engineer",
  "Full-Stack Developer",
  "AI & ML Engineer"
];

export const HERO_CONFIG = {
  titleRotationInterval: 3000,
  animationDelays: {
    badge: 0,
    title: 0.1,
    subtitle: 0.2,
    description: 0.3,
    buttons: 0.4,
    social: 0.5,
    scroll: 0.8
  }
};

// Resume Configuration
export const RESUME_CONFIG = {
  fileName: 'Jinish_Kathiriya_Resume.pdf',
  filePath: '/resume/jinish Kathiriya (F-FullStack).pdf'
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  pageTransition: { duration: 0.5, ease: "easeOut" },
  fadeIn: { duration: 0.6, ease: "easeOut" },
  slideUp: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
};
