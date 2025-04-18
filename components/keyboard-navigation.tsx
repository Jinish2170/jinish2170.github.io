"use client"

import { useEffect } from "react"

const KeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with "s" key
      if (e.key === "s" && e.altKey) {
        e.preventDefault()
        const mainContent = document.getElementById("main-content")
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: "smooth" })
        }
      }

      // Navigate to sections with number keys
      if (e.altKey && !isNaN(Number.parseInt(e.key))) {
        e.preventDefault()
        const sectionIndex = Number.parseInt(e.key)
        const sections = ["home", "about", "skills", "projects", "research", "contact"]

        if (sectionIndex >= 1 && sectionIndex <= sections.length) {
          const sectionId = sections[sectionIndex - 1]
          const section = document.getElementById(sectionId)
          if (section) {
            section.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return null
}

export default KeyboardNavigation
