import { RESUME_CONFIG } from '@/config/constants';

/**
 * Downloads a file from the public directory
 * @param filePath - Path to the file in public directory
 * @param fileName - Name for the downloaded file
 */
export const downloadFile = (
  filePath: string = RESUME_CONFIG.filePath, 
  fileName: string = RESUME_CONFIG.fileName
): void => {
  try {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

/**
 * Smooth scrolls to an element by ID
 * @param elementId - ID of the element to scroll to
 */
export const scrollToElement = (elementId: string): void => {
  try {
    const element = document.querySelector(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    console.error('Error scrolling to element:', error);
  }
};

/**
 * Handles navigation - either scrolling or routing
 * @param href - The href to navigate to
 * @param type - Type of navigation ('scroll' or 'link')
 */
export const handleNavigation = (href: string, type: 'scroll' | 'link' = 'link'): void => {
  if (type === 'scroll') {
    scrollToElement(href);
  }
  // For 'link' type, let Next.js handle the navigation
};
