"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const SkillHexGrid = ({ skillCategories }) => {
  const [selectedSkill, setSelectedSkill] = useState(null)

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

  // Take top 24 skills
  const topSkills = allSkills.slice(0, 24)

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl">
        {topSkills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="flex flex-col items-center"
            onClick={() => setSelectedSkill(skill)}
          >
            <div
              className="hexagon flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: `${skill.color}20`,
                borderColor: skill.color,
                transform: selectedSkill === skill ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease",
              }}
            >
              <div className="z-10 text-center">
                <div className="font-bold text-sm">{skill.level}%</div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm font-medium">{skill.name}</div>
              <div className="text-xs text-gray-400">{skill.category}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mt-8 p-4 bg-gray-800/70 rounded-lg max-w-2xl w-full"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">{selectedSkill.name}</h3>
            <span
              className="px-3 py-1 rounded-full text-sm"
              style={{ backgroundColor: `${selectedSkill.color}30`, color: selectedSkill.color }}
            >
              {selectedSkill.level}% Proficiency
            </span>
          </div>
          <p className="text-gray-300">{selectedSkill.description}</p>
          <div className="mt-3 text-sm text-gray-400">Category: {selectedSkill.category}</div>
        </motion.div>
      )}
    </div>
  )
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

export default SkillHexGrid
