import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:px-4 focus:py-2 focus:bg-[hsl(var(--card))] focus:text-[hsl(var(--ink))] focus:border focus:border-[hsl(var(--hairline))] focus:shadow-md focus:top-2 focus:left-2 focus:outline-none focus:ring-1 focus:ring-[hsl(var(--ink))]"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
