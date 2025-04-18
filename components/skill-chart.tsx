"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

const SkillChart = ({ skillCategories }) => {
  const canvasRef = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 50

    // Flatten all skills into a single array
    const allSkills = skillCategories.flatMap((category) =>
      category.skills.map((skill) => ({
        ...skill,
        category: category.name,
        color: getCategoryColor(category.name),
      })),
    )

    // Sort by skill level (highest first)
    allSkills.sort((a, b) => b.level - a.level)

    // Take top 15 skills
    const topSkills = allSkills.slice(0, 15)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw radar background
    drawRadarBackground(ctx, centerX, centerY, radius)

    // Draw skills
    drawSkills(ctx, centerX, centerY, radius, topSkills)

    // Add labels
    addLabels(ctx, centerX, centerY, radius, topSkills)

    // Add interaction
    canvas.onmousemove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Check if mouse is over any skill point
      for (const skill of topSkills) {
        const angle = (Math.PI * 2 * topSkills.indexOf(skill)) / topSkills.length
        const distance = (radius * skill.level) / 100
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        // Calculate distance from mouse to skill point
        const dx = mouseX - x
        const dy = mouseY - y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 15) {
          setHoveredSkill(skill)
          canvas.style.cursor = "pointer"
          return
        }
      }

      setHoveredSkill(null)
      canvas.style.cursor = "default"
    }

    canvas.onmouseleave = () => {
      setHoveredSkill(null)
    }
  }, [skillCategories])

  const drawRadarBackground = (ctx, centerX, centerY, radius) => {
    // Draw concentric circles
    const levels = 5
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.fillStyle = "rgba(20, 20, 20, 0.5)"

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    for (let i = 1; i <= levels; i++) {
      const currentRadius = (radius / levels) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  const drawSkills = (ctx, centerX, centerY, radius, skills) => {
    // First draw connecting lines to form a web
    ctx.beginPath()
    skills.forEach((skill, index) => {
      const angle = (Math.PI * 2 * index) / skills.length
      const distance = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
    ctx.fill()

    // Then draw individual points
    skills.forEach((skill, index) => {
      const angle = (Math.PI * 2 * index) / skills.length
      const distance = (radius * skill.level) / 100

      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      // Draw point
      ctx.fillStyle = skill.color
      ctx.beginPath()
      ctx.arc(x, y, hoveredSkill === skill ? 8 : 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw line from center
      ctx.strokeStyle = skill.color
      ctx.lineWidth = 2
      ctx.globalAlpha = 0.6
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.globalAlpha = 1
    })
  }

  const addLabels = (ctx, centerX, centerY, radius, skills) => {
    ctx.fillStyle = "white"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"

    skills.forEach((skill, index) => {
      const angle = (Math.PI * 2 * index) / skills.length
      const distance = radius + 20

      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      // Adjust label position based on angle
      const textX = x
      let textY = y

      if (angle > Math.PI / 2 && angle < (Math.PI * 3) / 2) {
        textY += 5
      } else {
        textY -= 5
      }

      ctx.fillText(skill.name, textX, textY)
    })
  }

  const getCategoryColor = (categoryName) => {
    const colors = {
      "AI & Machine Learning": "hsl(210, 100%, 50%)",
      Cybersecurity: "hsl(270, 100%, 60%)",
      "Full-Stack Development": "hsl(140, 100%, 45%)",
      "DevOps & Cloud": "hsl(180, 100%, 45%)",
      Databases: "hsl(330, 100%, 50%)",
      "Programming Languages": "hsl(30, 100%, 50%)",
      "Operating Systems": "hsl(60, 100%, 45%)",
      "Design & Collaboration": "hsl(300, 100%, 50%)",
    }

    return colors[categoryName] || "hsl(210, 100%, 50%)"
  }

  return (
    <Card className="bg-gray-900/30 border border-gray-800 p-4 w-full max-w-3xl">
      <div className="flex justify-center">
        <canvas ref={canvasRef} width={800} height={600} className="max-w-full h-auto" />
      </div>

      {hoveredSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-gray-800 rounded-md"
        >
          <h4 className="font-bold text-lg">{hoveredSkill.name}</h4>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">{hoveredSkill.category}</span>
            <span className="text-techBlue font-medium">{hoveredSkill.level}%</span>
          </div>
          {hoveredSkill.description && <p className="mt-2 text-sm text-gray-400">{hoveredSkill.description}</p>}
        </motion.div>
      )}

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {skillCategories.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getCategoryColor(category.name) }} />
            <span className="text-xs text-gray-400">{category.name}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SkillChart
