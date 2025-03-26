"use client"

import { useRef, useEffect } from "react"

export function TechnicalVisualizer() {
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
      const size = Math.min(canvas.width, canvas.height) * 0.2
      const centerX = canvas.width * 0.25
      const centerY = canvas.height * 0.5

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
      ctx.strokeStyle = "white"
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
      const width = canvas.width * 0.5
      const height = canvas.height * 0.3
      const startX = canvas.width * 0.5
      const startY = canvas.height * 0.5

      ctx.strokeStyle = "white"
      ctx.lineWidth = 1.5
      ctx.beginPath()

      for (let i = 0; i < width; i++) {
        const x = startX + i
        const normalizedI = i / width

        // Créer une forme d'onde complexe
        let y = Math.sin(normalizedI * 10 + time * 2) * 20
        y += Math.sin(normalizedI * 20 + time) * 10
        y += Math.sin(normalizedI * 5 - time * 0.5) * 15

        if (i === 0) {
          ctx.moveTo(x, startY + y)
        } else {
          ctx.lineTo(x, startY + y)
        }
      }

      ctx.stroke()
    }

    // Fonction pour dessiner des cercles concentriques
    const drawConcentricCircles = () => {
      const centerX = canvas.width * 0.75
      const centerY = canvas.height * 0.25
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.15

      ctx.strokeStyle = "white"
      ctx.lineWidth = 1

      for (let i = 1; i <= 5; i++) {
        const radius = (maxRadius / 5) * i
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Ajouter un point au centre
      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2)
      ctx.fill()
    }

    // Fonction pour dessiner une grille
    const drawGrid = () => {
      const startX = canvas.width * 0.1
      const startY = canvas.height * 0.7
      const width = canvas.width * 0.3
      const height = canvas.height * 0.25

      ctx.strokeStyle = "white"
      ctx.lineWidth = 0.5

      // Lignes horizontales
      for (let i = 0; i <= 5; i++) {
        const y = startY + (height / 5) * i
        ctx.beginPath()
        ctx.moveTo(startX, y)
        ctx.lineTo(startX + width, y)
        ctx.stroke()
      }

      // Lignes verticales
      for (let i = 0; i <= 10; i++) {
        const x = startX + (width / 10) * i
        ctx.beginPath()
        ctx.moveTo(x, startY)
        ctx.lineTo(x, startY + height)
        ctx.stroke()
      }
    }

    // Fonction pour dessiner des indicateurs numériques
    const drawNumericIndicators = () => {
      ctx.fillStyle = "white"
      ctx.font = "10px monospace"
      ctx.textAlign = "left"

      // Indicateurs pour le cube
      ctx.fillText(`${Math.floor(Math.random() * 9000) + 1000}`, canvas.width * 0.1, canvas.height * 0.2)

      // Indicateurs pour la forme d'onde
      ctx.fillText(`${Math.floor(Math.random() * 9000) + 1000}`, canvas.width * 0.5, canvas.height * 0.2)

      // Indicateurs pour les cercles
      ctx.fillText(`${Math.floor(Math.random() * 9000) + 1000}`, canvas.width * 0.75, canvas.height * 0.1)
    }

    // Fonction d'animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      drawWireframeCube()
      drawWaveform()
      drawConcentricCircles()
      drawGrid()
      drawNumericIndicators()

      requestAnimationFrame(animate)
    }

    animate()

    // Nettoyer l'animation lors du démontage
    return () => {
      cancelAnimationFrame(0)
    }
  }, [])

  return (
    <div className="relative w-full h-64 border border-[#333333] bg-black rounded-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>

      {/* Indicateurs techniques */}
      <div className="absolute bottom-2 right-2 text-white text-2xl font-bold">
        {Math.floor(Math.random() * 9000) + 1000}
      </div>

      <div className="absolute top-2 left-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="text-xs text-[#999999]">{Math.floor(Math.random() * 90000) + 10000}</div>
      </div>

      <div className="absolute bottom-2 left-2 flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
        <div className="text-xs text-[#999999]">{Math.floor(Math.random() * 9000) + 1000}</div>
      </div>
    </div>
  )
}

