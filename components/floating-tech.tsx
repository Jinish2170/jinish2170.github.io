"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BrainCircuit, ShieldAlert, Code2, Database, Server, Cpu, Network, Lock, Bot, Layers } from "lucide-react"

const FloatingTech = () => {
  const [icons, setIcons] = useState([])

  useEffect(() => {
    const techIcons = [
      { icon: <BrainCircuit className="h-8 w-8 text-techBlue" />, id: 1 },
      { icon: <ShieldAlert className="h-8 w-8 text-techPurple" />, id: 2 },
      { icon: <Code2 className="h-8 w-8 text-techGreen" />, id: 3 },
      { icon: <Database className="h-8 w-8 text-techBlue" />, id: 4 },
      { icon: <Server className="h-8 w-8 text-techPurple" />, id: 5 },
      { icon: <Cpu className="h-8 w-8 text-techGreen" />, id: 6 },
      { icon: <Network className="h-8 w-8 text-techBlue" />, id: 7 },
      { icon: <Lock className="h-8 w-8 text-techPurple" />, id: 8 },
      { icon: <Bot className="h-8 w-8 text-techGreen" />, id: 9 },
      { icon: <Layers className="h-8 w-8 text-techBlue" />, id: 10 },
    ]

    const positionedIcons = techIcons.map((icon) => {
      return {
        ...icon,
        x: Math.random() * 100, // percentage of viewport width
        y: Math.random() * 100, // percentage of viewport height
        duration: 20 + Math.random() * 30, // animation duration in seconds
        delay: Math.random() * -30, // random start position in animation
      }
    })

    setIcons(positionedIcons)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="floating-tech absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -30, 20, -10, 0],
          }}
          transition={{
            duration: icon.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
            delay: icon.delay,
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingTech
