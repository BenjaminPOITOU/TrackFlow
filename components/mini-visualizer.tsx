"use client"

import { useRef, useEffect } from "react"

interface MiniVisualizerProps {
  type: "cube" | "wave" | "circles" | "grid"
}

export function MiniVisualizer({ type }: MiniVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir la taille du canvas
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Fonction pour dessiner un cube en wireframe
    const drawWireframeCube = () => {
      const time = Date.now() * 0.001
      const size = Math.min(canvas.width, canvas.height) * 0.3
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Points du cube
      const points = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ]

      // Rotation
      const rotateX = time * 0.5
      const rotateY = time * 0.3

      // Transformer les points
      const transformedPoints = points.map(([x, y, z]) => {
        // Rotation X
        const y1 = y * Math.cos(rotateX) - z * Math.sin(rotateX)
        const z1 = y * Math.sin(rotateX) + z * Math.cos(rotateX)

        // Rotation Y
        const x1 = x * Math.cos(rotateY) + z1 * Math.sin(rotateY)
        const z2 = -x * Math.sin(rotateY) + z1 * Math.cos(rotateY)

        // Projection
        const scale = 1 / (2 + z2)
        const projX = centerX + x1 * size * scale
        const projY = centerY + y1 * size * scale

        return [projX, projY]
      })

      // Arêtes du cube
      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ]

      // Dessiner les arêtes
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 1

      edges.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.moveTo(transformedPoints[a][0], transformedPoints[a][1])
        ctx.lineTo(transformedPoints[b][0], transformedPoints[b][1])
        ctx.stroke()
      })
    }

    // Fonction pour dessiner une forme d'onde
    const drawWaveform = () => {
      const time = Date.now() * 0.001
      const width = canvas.width
      const height = canvas.height

      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 1
      ctx.beginPath()

      for (let i = 0; i < width; i++) {
        const x = i
        const normalizedI = i / width

        // Créer une forme d'onde simple
        let y = Math.sin(normalizedI * 10 + time * 2) * height * 0.2
        y += height / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
    }

    // Fonction pour dessiner des cercles concentriques
    const drawConcentricCircles = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 1

      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 1

      for (let i = 1; i <= 3; i++) {
        const radius = (maxRadius / 3) * i
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Ajouter un point au centre
      ctx.fillStyle = "#FFFFFF"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 1, 0, Math.PI * 2)
      ctx.fill()
    }

    // Fonction pour dessiner une grille
    const drawGrid = () => {
      const width = canvas.width
      const height = canvas.height

      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 0.5

      // Lignes horizontales
      for (let i = 0; i <= 3; i++) {
        const y = (height / 3) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Lignes verticales
      for (let i = 0; i <= 3; i++) {
        const x = (width / 3) * i
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
    }

    // Fonction d'animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      switch (type) {
        case "cube":
          drawWireframeCube()
          break
        case "wave":
          drawWaveform()
          break
        case "circles":
          drawConcentricCircles()
          break
        case "grid":
          drawGrid()
          break
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Nettoyer l'animation lors du démontage
    return () => {
      cancelAnimationFrame(0)
    }
  }, [type])

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>
}

