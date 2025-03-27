"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectMenu } from "@/components/project-menu"
import { Tag } from "@/components/ui/tag"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    status: string
    tags: string[]
    lastUpdated: string
  }
  onArchive?: () => void
  onDuplicate?: () => void
  onDelete?: () => void
}

export function ProjectCard({ project, onArchive, onDuplicate, onDelete }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [consoleText, setConsoleText] = useState("HMNRM: 04.2")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const rotationRef = useRef(0)

  // Générer une forme géométrique unique pour chaque projet
  const generateShape = (id: number, ctx: CanvasRenderingContext2D, time: number) => {
    const shapes = ["triangle", "square", "diamond", "circle"]
    const shape = shapes[id % shapes.length]
    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height / 2
    const size = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4

    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 1
    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(time)

    switch (shape) {
      case "triangle":
        ctx.beginPath()
        ctx.moveTo(0, -size / 2)
        ctx.lineTo(size / 2, size / 2)
        ctx.lineTo(-size / 2, size / 2)
        ctx.closePath()
        ctx.stroke()
        break
      case "square":
        ctx.beginPath()
        ctx.rect(-size / 2, -size / 2, size, size)
        ctx.stroke()
        break
      case "diamond":
        ctx.beginPath()
        ctx.moveTo(0, -size / 2)
        ctx.lineTo(size / 2, 0)
        ctx.lineTo(0, size / 2)
        ctx.lineTo(-size / 2, 0)
        ctx.closePath()
        ctx.stroke()
        break
      case "circle":
        ctx.beginPath()
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.stroke()
        break
    }

    ctx.restore()
  }

  // Déterminer la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "IN_PROGRESS":
        return "bg-[#00A3FF]" // Bleu
      case "PENDING":
        return "bg-[#FFB800]" // Ambre
      case "COMPLETED":
        return "bg-[#00FF85]" // Vert
      default:
        return "bg-[#FFFFFF]" // Blanc par défaut
    }
  }

  // Animation du texte console
  useEffect(() => {
    if (!isHovered) {
      setConsoleText("HMNRM: 04.2")
      return
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const interval = setInterval(() => {
      let result = ""
      for (let i = 0; i < 10; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setConsoleText(result)
    }, 100)

    return () => clearInterval(interval)
  }, [isHovered])

  // Animation de la forme
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir la taille du canvas
    canvas.width = 40
    canvas.height = 40

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isHovered) {
        rotationRef.current += 0.02
      }

      generateShape(project.id, ctx, rotationRef.current)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [project.id, isHovered])

  return (
    <Card
      className={`bg-[#0D0D0D] border border-[#333333] transition-all duration-300 ${
        isHovered ? "border-[#FFFFFF] glow-card" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="w-10 h-10">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
            <span className="text-xs text-[#EFEFEF]">{project.status}</span>
            <ProjectMenu onArchive={onArchive} onDuplicate={onDuplicate} onDelete={onDelete} />
          </div>
        </div>

        <h3 className="font-medium mb-2 glow-text-sm">{project.title}</h3>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.map((tag, index) => (
            <Tag key={index} variant={tag.toLowerCase() as any}>
              {tag}
            </Tag>
          ))}
        </div>

        <div className="text-xs text-[#EFEFEF] flex items-center justify-between">
          <span>{project.lastUpdated}</span>
          <span className="font-mono">{consoleText}</span>
        </div>
      </CardContent>
    </Card>
  )
}

