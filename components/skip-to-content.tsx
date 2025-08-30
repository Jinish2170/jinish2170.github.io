import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:shadow-md focus:top-2 focus:left-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
    >
      
    </a>
  );
};

export default SkipToContent;
