"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, MessageSquare, Repeat, Download, ListPlus } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NewPlaylistModal } from "./modals/new-playlist-modal"

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false)
  const duration = 214 // Durée en secondes (3:34)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Playlists fictives pour la démo
  const playlists = [
    { id: 1, name: "FAVORITES" },
    { id: 2, name: "WORK_IN_PROGRESS" },
    { id: 3, name: "INSPIRATION" },
  ]

  // Fonction pour formater le temps (secondes -> MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleAddToPlaylist = (playlistId: number) => {
    // Logique pour ajouter à la playlist
    console.log(`Added to playlist ${playlistId}`)
  }

  const handleCreatePlaylist = (data: { title: string; description: string }) => {
    // Logique pour créer une nouvelle playlist
    console.log(`Created new playlist: ${data.title}`)
  }

  // Simulation de la forme d'onde
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir la taille du canvas
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dessiner la forme d'onde
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 1
    ctx.beginPath()

    // Générer une forme d'onde plus technique
    const totalPoints = canvas.width
    const midHeight = canvas.height / 2

    for (let i = 0; i < totalPoints; i++) {
      // Calculer la position x
      const x = i

      // Calculer l'amplitude avec plusieurs fréquences pour des oscillations plus petites et détaillées
      let amplitude = 0

      // Ajouter plusieurs ondes sinusoïdales à différentes fréquences
      amplitude += Math.sin(i * 0.05) * 5 // Fréquence de base
      amplitude += Math.sin(i * 0.2) * 3 // Fréquence moyenne
      amplitude += Math.sin(i * 0.5) * 2 // Haute fréquence
      amplitude += Math.sin(i * 1.0) * 1 // Très haute fréquence

      // Ajouter un peu de bruit pour un aspect plus réaliste
      amplitude += (Math.random() - 0.5) * 2

      // Réduire l'amplitude si on est après la position actuelle
      const progress = currentTime / duration
      const progressX = canvas.width * progress

      if (i > progressX) {
        amplitude *= 0.5 // Réduire l'amplitude pour la partie non lue
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)"
      } else {
        ctx.strokeStyle = "#FFFFFF"
      }

      // Dessiner le point
      if (i === 0) {
        ctx.moveTo(x, midHeight + amplitude)
      } else {
        ctx.lineTo(x, midHeight + amplitude)
      }
    }

    ctx.stroke()

    // Ajouter des marqueurs d'annotation
    const annotations = [
      { position: 0.2, type: "feedback" },
      { position: 0.5, type: "idea" },
      { position: 0.8, type: "correction" },
    ]

    annotations.forEach((anno) => {
      const x = canvas.width * anno.position
      ctx.fillStyle = "#FFFFFF"
      ctx.beginPath()
      ctx.arc(x, 10, 3, 0, Math.PI * 2)
      ctx.fill()

      // Ligne verticale pour le marqueur
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    })
  }, [currentTime])

  // Simuler la progression de la lecture
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 0.1
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

  return (
    <>
      <div className="bg-black border border-[#333333] rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium glow-text-sm">CURRENT_PROJECT - TRACK_03</h3>
            <p className="text-xs text-[#EFEFEF]">ALBUM_CONCEPT • VERSION_2.4</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <MessageSquare size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <Repeat size={16} />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
                  <ListPlus size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] p-0">
                <div className="p-2">
                  <p className="text-xs font-medium mb-2">ADD_TO_PLAYLIST</p>
                  <div className="space-y-1">
                    {playlists.map((playlist) => (
                      <Button
                        key={playlist.id}
                        variant="ghost"
                        className="w-full justify-start text-left text-xs h-8"
                        onClick={() => handleAddToPlaylist(playlist.id)}
                      >
                        {playlist.name}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-xs h-8 border-t border-[#333333] mt-1 pt-1"
                      onClick={() => setShowNewPlaylistModal(true)}
                    >
                      CREATE_NEW_PLAYLIST
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <Download size={16} />
            </Button>
          </div>
        </div>

        {/* Visualisation de la forme d'onde */}
        <div className="relative h-24 border border-[#333333] rounded">
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Indicateur de position actuelle */}
          <div
            className="absolute top-0 h-full w-px bg-[#FFFFFF]"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />

          {/* Échelle de temps */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-[#EFEFEF]">
            <span>00:00</span>
            <span>01:00</span>
            <span>02:00</span>
            <span>03:00</span>
            <span>03:34</span>
          </div>

          {/* Indicateurs techniques */}
          <div className="absolute top-2 right-2 text-xs text-[#EFEFEF]">{Math.floor(Math.random() * 9000) + 1000}</div>
        </div>

        {/* Contrôles de lecture */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <SkipBack size={16} />
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-10 w-10 rounded-full bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] flex items-center justify-center glow-button"
            >
              {isPlaying ? (
                <Pause size={18} className="text-white" />
              ) : (
                <Play size={18} className="ml-0.5 text-white" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <SkipForward size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>{formatTime(currentTime)}</span>
            <span className="text-[#EFEFEF]">/</span>
            <span className="text-[#EFEFEF]">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 size={16} />
            <Slider defaultValue={[80]} max={100} step={1} className="w-24" />
          </div>
        </div>
      </div>

      {/* Modal pour créer une nouvelle playlist */}
      <NewPlaylistModal
        isOpen={showNewPlaylistModal}
        onClose={() => setShowNewPlaylistModal(false)}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </>
  )
}

