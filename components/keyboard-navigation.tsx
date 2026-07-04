"use client"

import { useEffect } from "react"

const KeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        const mainContent = document.getElementById("main-content")
        if (mainContent) {
          mainContent.focus()
          mainContent.scrollIntoView({ behavior: "smooth" })
        }
      }

      if (e.altKey && !isNaN(Number.parseInt(e.key))) {
        e.preventDefault()
        const sectionIndex = Number.parseInt(e.key)
        const sections = ["home", "about", "engagements", "skills", "projects", "contact"]

        if (sectionIndex >= 1 && sectionIndex <= sections.length) {
          const section = document.getElementById(sections[sectionIndex - 1])
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
