'use client'

import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={true} 
      disableTransitionOnChange={false}
      themes={['light', 'dark']}
    >
      {children}
    </ThemeProvider>
  )
}
