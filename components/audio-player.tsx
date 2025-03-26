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

  const playlists = [
    { id: 1, name: "FAVORITES" },
    { id: 2, name: "WORK_IN_PROGRESS" },
    { id: 3, name: "INSPIRATION" },
  ]

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleAddToPlaylist = (playlistId: number) => {
    console.log(`Added to playlist ${playlistId}`)
  }

  const handleCreatePlaylist = (data: { title: string; description: string }) => {
    console.log(`Created new playlist: ${data.title}`)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "rgb(var(--foreground))"
    ctx.lineWidth = 1
    ctx.beginPath()

    const totalPoints = canvas.width
    const midHeight = canvas.height / 2

    for (let i = 0; i < totalPoints; i++) {
      const x = i
      let amplitude = 0

      amplitude += Math.sin(i * 0.05) * 5
      amplitude += Math.sin(i * 0.2) * 3
      amplitude += Math.sin(i * 0.5) * 2
      amplitude += Math.sin(i * 1.0) * 1
      amplitude += (Math.random() - 0.5) * 2

      const progress = currentTime / duration
      const progressX = canvas.width * progress

      if (i > progressX) {
        amplitude *= 0.5
        ctx.strokeStyle = "rgba(var(--foreground), 0.4)"
      } else {
        ctx.strokeStyle = "rgb(var(--foreground))"
      }

      if (i === 0) {
        ctx.moveTo(x, midHeight + amplitude)
      } else {
        ctx.lineTo(x, midHeight + amplitude)
      }
    }

    ctx.stroke()

    const annotations = [
      { position: 0.2, type: "feedback" },
      { position: 0.5, type: "idea" },
      { position: 0.8, type: "correction" },
    ]

    annotations.forEach((anno) => {
      const x = canvas.width * anno.position
      ctx.fillStyle = "rgb(var(--foreground))"
      ctx.beginPath()
      ctx.arc(x, 10, 3, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "rgba(var(--foreground), 0.5)"
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    })
  }, [currentTime])

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
      <div className="bg-background border border-border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">CURRENT_PROJECT - TRACK_03</h3>
            <p className="text-xs text-muted-foreground">ALBUM_CONCEPT • VERSION_2.4</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
              <MessageSquare size={16} className="text-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
              <Repeat size={16} className="text-foreground" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
                  <ListPlus size={16} className="text-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-card border-border text-card-foreground p-0">
                <div className="p-2">
                  <p className="text-xs font-medium mb-2">ADD_TO_PLAYLIST</p>
                  <div className="space-y-1">
                    {playlists.map((playlist) => (
                      <Button
                        key={playlist.id}
                        variant="ghost"
                        className="w-full justify-start text-left text-xs h-8 text-foreground"
                        onClick={() => handleAddToPlaylist(playlist.id)}
                      >
                        {playlist.name}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-xs h-8 border-t border-border mt-1 pt-1 text-foreground"
                      onClick={() => setShowNewPlaylistModal(true)}
                    >
                      CREATE_NEW_PLAYLIST
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
              <Download size={16} className="text-foreground" />
            </Button>
          </div>
        </div>

        <div className="relative h-24 border border-border rounded">
          <canvas ref={canvasRef} className="w-full h-full bg-popover" />

          <div
            className="absolute top-0 h-full w-px bg-foreground"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />

          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-muted-foreground">
            <span>00:00</span>
            <span>01:00</span>
            <span>02:00</span>
            <span>03:00</span>
            <span>03:34</span>
          </div>

          <div className="absolute top-2 right-2 text-xs text-muted-foreground">
            {Math.floor(Math.random() * 9000) + 1000}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
              <SkipBack size={16} className="text-foreground" />
            </Button>
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-10 w-10 rounded-full bg-transparent border border-foreground hover:bg-accent flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause size={18} className="text-foreground" />
              ) : (
                <Play size={18} className="ml-0.5 text-foreground" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-border">
              <SkipForward size={16} className="text-foreground" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground">
            <span>{formatTime(currentTime)}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-2 text-foreground">
            <Volume2 size={16} />
            <Slider defaultValue={[80]} max={100} step={1} className="w-24" />
          </div>
        </div>
      </div>

      <NewPlaylistModal
        isOpen={showNewPlaylistModal}
        onClose={() => setShowNewPlaylistModal(false)}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </>
  )
}