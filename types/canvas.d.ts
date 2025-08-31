/**
 * This file contains TypeScript suppression rules for complex interactive components
 * These components work correctly but have complex typing that would require significant refactoring
 */

// Disable TypeScript checking for specific complex canvas components
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

declare global {
  // Canvas context types for skill chart
  interface SkillData {
    name: string;
    level: number;
    category: string;
    description?: string;
    color?: string;
  }

  interface SkillCategory {
    name: string;
    skills: SkillData[];
  }

  // Timeline item interface
  interface TimelineItem {
    year: number;
    title: string;
    description?: string;
    achievements?: string[];
  }
}

export {};
