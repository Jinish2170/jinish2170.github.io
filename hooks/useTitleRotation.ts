import { useState, useEffect } from 'react';

/**
 * Custom hook for title rotation animation
 * @param titles - Array of titles to rotate through
 * @param interval - Time between rotations in milliseconds
 */
export const useTitleRotation = (titles: string[], interval: number = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (titles.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [titles.length, interval]);

  return {
    currentTitle: titles[currentIndex] || '',
    currentIndex
  };
};
