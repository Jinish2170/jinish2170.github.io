"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles: Particle[] = []
  const particleCount = 120
  const colors = ["#4299E1", "#9F7AEA", "#48BB78"] // Blue, Purple, Green
  const maxDistance = 150 // Maximum distance for connections

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first (so they appear behind particles)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = p1.color
            // Opacity based on distance - closer = more visible
            const opacity = (1 - distance / maxDistance) * 0.2 * Math.min(p1.opacity, p2.opacity)
            ctx.globalAlpha = opacity
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }
    }

    const updateParticles = () => {
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges with some randomness
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX *= -1
          p.speedX += (Math.random() - 0.5) * 0.1 // Add slight randomness
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.speedY *= -1
          p.speedY += (Math.random() - 0.5) * 0.1 // Add slight randomness
        }

        // Keep particles within bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x))
        p.y = Math.max(0, Math.min(canvas.height, p.y))
      }
    }

    const animate = () => {
      drawParticles()
      updateParticles()
      requestAnimationFrame(animate)
    }

    handleResize()
    animate()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

export default ParticleBackground
