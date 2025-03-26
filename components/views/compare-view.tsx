"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, MessageSquare, Save, Repeat, Download } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function CompareView() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTimeA, setCurrentTimeA] = useState(0)
  const [currentTimeB, setCurrentTimeB] = useState(0)
  const [isSynced, setIsSynced] = useState(true)
  const [activeTrack, setActiveTrack] = useState<"A" | "B" | "both">("both")
  const [showAnnotationForm, setShowAnnotationForm] = useState(false)
  const [annotationTimeMarker, setAnnotationTimeMarker] = useState("")
  const [annotationContent, setAnnotationContent] = useState("")
  const [annotationType, setAnnotationType] = useState("FEEDBACK")
  const canvasRefA = useRef<HTMLCanvasElement>(null)
  const canvasRefB = useRef<HTMLCanvasElement>(null)
  const durationA = 214 // Durée en secondes (3:34)
  const durationB = 214 // Durée en secondes (3:34)

  // Fonction pour formater le temps (secondes -> MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Simuler la progression de la lecture
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        if (activeTrack === "A" || activeTrack === "both") {
          setCurrentTimeA((prev) => {
            if (prev >= durationA) {
              return durationA
            }
            return prev + 0.1
          })
        }

        if (activeTrack === "B" || activeTrack === "both") {
          setCurrentTimeB((prev) => {
            if (prev >= durationB) {
              return durationB
            }
            return prev + 0.1
          })
        }

        // Vérifier si l'un des morceaux est terminé
        if (
          (activeTrack === "A" && currentTimeA >= durationA) ||
          (activeTrack === "B" && currentTimeB >= durationB) ||
          (activeTrack === "both" && (currentTimeA >= durationA || currentTimeB >= durationB))
        ) {
          setIsPlaying(false)
        }
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentTimeA, currentTimeB, durationA, durationB, activeTrack])

  // Synchroniser les temps si nécessaire
  useEffect(() => {
    if (isSynced && activeTrack === "both") {
      if (currentTimeA !== currentTimeB) {
        // Utiliser le temps le plus récent comme référence
        const referenceTime = Math.max(currentTimeA, currentTimeB)
        setCurrentTimeA(referenceTime)
        setCurrentTimeB(referenceTime)
      }
    }
  }, [isSynced, currentTimeA, currentTimeB, activeTrack])

  // Simulation de la forme d'onde pour le morceau A
  useEffect(() => {
    const canvas = canvasRefA.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir la taille du canvas
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dessiner la forme d'onde
    ctx.strokeStyle = "#00A3FF" // Couleur pour le morceau A
    ctx.lineWidth = 1
    ctx.beginPath()

    // Générer une forme d'onde
    const totalPoints = canvas.width
    const midHeight = canvas.height / 2

    for (let i = 0; i < totalPoints; i++) {
      // Calculer la position x
      const x = i

      // Calculer l'amplitude
      let amplitude = Math.sin(i * 0.05) * 20 + Math.sin(i * 0.1) * 10

      // Réduire l'amplitude si on est après la position actuelle
      const progress = currentTimeA / durationA
      const progressX = canvas.width * progress

      if (i > progressX) {
        amplitude *= 0.5
        ctx.strokeStyle = "rgba(0, 163, 255, 0.4)"
      } else {
        ctx.strokeStyle = "#00A3FF"
      }

      // Dessiner le point
      if (i === 0) {
        ctx.moveTo(x, midHeight + amplitude)
      } else {
        ctx.lineTo(x, midHeight + amplitude)
      }
    }

    ctx.stroke()

    // Ajouter des marqueurs d'annotation (simulés)
    const annotations = [
      { timeMarker: 30, color: "#FFFFFF" },
      { timeMarker: 90, color: "#FFFFFF" },
      { timeMarker: 150, color: "#FFFFFF" },
    ]

    annotations.forEach((anno) => {
      const position = anno.timeMarker / durationA
      const x = canvas.width * position

      ctx.fillStyle = anno.color
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
  }, [currentTimeA, durationA])

  // Simulation de la forme d'onde pour le morceau B
  useEffect(() => {
    const canvas = canvasRefB.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir la taille du canvas
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dessiner la forme d'onde
    ctx.strokeStyle = "#FF0080" // Couleur pour le morceau B
    ctx.lineWidth = 1
    ctx.beginPath()

    // Générer une forme d'onde légèrement différente
    const totalPoints = canvas.width
    const midHeight = canvas.height / 2

    for (let i = 0; i < totalPoints; i++) {
      // Calculer la position x
      const x = i

      // Calculer l'amplitude (légèrement différente)
      let amplitude = Math.sin(i * 0.05 + 1) * 25 + Math.sin(i * 0.12) * 8

      // Réduire l'amplitude si on est après la position actuelle
      const progress = currentTimeB / durationB
      const progressX = canvas.width * progress

      if (i > progressX) {
        amplitude *= 0.5
        ctx.strokeStyle = "rgba(255, 0, 128, 0.4)"
      } else {
        ctx.strokeStyle = "#FF0080"
      }

      // Dessiner le point
      if (i === 0) {
        ctx.moveTo(x, midHeight + amplitude)
      } else {
        ctx.lineTo(x, midHeight + amplitude)
      }
    }

    ctx.stroke()

    // Ajouter des marqueurs d'annotation (simulés)
    const annotations = [
      { timeMarker: 45, color: "#FFFFFF" },
      { timeMarker: 120, color: "#FFFFFF" },
      { timeMarker: 180, color: "#FFFFFF" },
    ]

    annotations.forEach((anno) => {
      const position = anno.timeMarker / durationB
      const x = canvas.width * position

      ctx.fillStyle = anno.color
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
  }, [currentTimeB, durationB])

  // Fonction pour ajouter une annotation
  const handleAddAnnotation = () => {
    // Ici, on simulerait l'ajout d'une annotation à la base de données
    // Pour l'instant, on ferme juste le formulaire
    setShowAnnotationForm(false)
    setAnnotationTimeMarker("")
    setAnnotationContent("")
  }

  // Fonction pour changer le mode de lecture
  const togglePlayMode = () => {
    if (activeTrack === "both") {
      setActiveTrack("A")
    } else if (activeTrack === "A") {
      setActiveTrack("B")
    } else {
      setActiveTrack("both")
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">A/B_COMPARE_SYS</h1>
          <p className="text-[#EFEFEF]">COMPARE_DIFFERENT_VERSIONS</p>
        </div>
        <div className="w-8 h-8">
          <MiniVisualizer type="wave" />
        </div>
      </div>

      {/* Formulaire d'annotation */}
      {showAnnotationForm && (
        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium mb-4">NEW_ANNOTATION</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time-marker">TIME_MARKER</Label>
              <Input
                id="time-marker"
                placeholder="MM:SS"
                value={annotationTimeMarker}
                onChange={(e) => setAnnotationTimeMarker(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annotation-type">TYPE</Label>
              <Select value={annotationType} onValueChange={setAnnotationType}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="FEEDBACK">FEEDBACK</SelectItem>
                  <SelectItem value="IDEA">IDEA</SelectItem>
                  <SelectItem value="FIX">FIX</SelectItem>
                  <SelectItem value="COMPARISON">COMPARISON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="track-selection">TRACK</Label>
              <Select defaultValue="both">
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select track" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="A">VERSION_A</SelectItem>
                  <SelectItem value="B">VERSION_B</SelectItem>
                  <SelectItem value="both">BOTH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="annotation-content">CONTENT</Label>
              <Textarea
                id="annotation-content"
                placeholder="Enter your annotation"
                value={annotationContent}
                onChange={(e) => setAnnotationContent(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] min-h-[80px]"
              />
            </div>

            <div className="md:col-span-3 flex justify-end">
              <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]" onClick={handleAddAnnotation}>
                <Save className="mr-2 h-4 w-4" /> SAVE_ANNOTATION
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sélection des versions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4 glow-text-sm">VERSION_A</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-a" className="text-[#EFEFEF]">
                PROJECT
              </Label>
              <Select defaultValue="album-concept">
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="album-concept">ALBUM_CONCEPT</SelectItem>
                  <SelectItem value="ep-collab">EP_COLLAB</SelectItem>
                  <SelectItem value="single-release">SINGLE_RELEASE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-a" className="text-[#EFEFEF]">
                COMPOSITION
              </Label>
              <Select defaultValue="bridge-section">
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select composition" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="bridge-section">BRIDGE_SECTION</SelectItem>
                  <SelectItem value="intro-master">INTRO_MASTER</SelectItem>
                  <SelectItem value="verse-exp">VERSE_EXP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version-a" className="text-[#EFEFEF]">
                VERSION
              </Label>
              <Select defaultValue="v2.4">
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="v2.4">VERSION_2.4</SelectItem>
                  <SelectItem value="v2.3">VERSION_2.3</SelectItem>
                  <SelectItem value="v2.2">VERSION_2.2</SelectItem>
                  <SelectItem value="v2.1">VERSION_2.1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <h2 className="text-lg font-medium mb-4 glow-text-sm">VERSION_B</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-b" className="text-[#EFEFEF]">
                PROJECT
              </Label>
              <Select defaultValue="album-concept">
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="album-concept">ALBUM_CONCEPT</SelectItem>
                  <SelectItem value="ep-collab">EP_COLLAB</SelectItem>
                  <SelectItem value="single-release">SINGLE_RELEASE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-b" className="text-[#EFEFEF]">
                COMPOSITION
              </Label>
              <Select defaultValue="bridge-section">
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select composition" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="bridge-section">BRIDGE_SECTION</SelectItem>
                  <SelectItem value="intro-master">INTRO_MASTER</SelectItem>
                  <SelectItem value="verse-exp">VERSE_EXP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version-b" className="text-[#EFEFEF]">
                VERSION
              </Label>
              <Select defaultValue="v2.3">
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select version" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="v2.4">VERSION_2.4</SelectItem>
                  <SelectItem value="v2.3">VERSION_2.3</SelectItem>
                  <SelectItem value="v2.2">VERSION_2.2</SelectItem>
                  <SelectItem value="v2.1">VERSION_2.1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Options de synchronisation */}
      {/*
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium glow-text-sm">PLAYBACK_OPTIONS</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="sync-playback" checked={isSynced} onCheckedChange={setIsSynced} />
              <Label htmlFor="sync-playback" className="text-[#EFEFEF] flex items-center gap-1">
                <Link2 size={14} /> SYNC_PLAYBACK
              </Label>
            </div>
            <Button
              variant="outline"
              className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
              onClick={togglePlayMode}
            >
              {activeTrack === "both" ? "PLAYING_BOTH" : activeTrack === "A" ? "PLAYING_A" : "PLAYING_B"}
            </Button>
            <Button variant="outline" className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]">
              <ArrowLeftRight size={16} className="mr-2" /> SWAP
            </Button>
          </div>
        </div>
      </div>
      */}

      {/* Visualisation de comparaison */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
        <Tabs defaultValue="waveform" className="w-full">
          <TabsList className="bg-[#0D0D0D] border border-[#333333] p-1 mb-4">
            <TabsTrigger
              value="waveform"
              className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]"
            >
              WAVEFORM
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waveform" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Version A */}
              <div className="space-y-4">
                <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">VERSION_A</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                      onClick={() => setIsSynced(!isSynced)}
                    >
                      {isSynced ? "SYNCED" : "NOT_SYNCED"}
                    </Button>
                  </div>
                  <div className="relative h-32 border border-[#333333] rounded bg-black">
                    <canvas ref={canvasRefA} className="w-full h-full" />
                    <div
                      className="absolute top-0 h-full w-px bg-[#00A3FF]"
                      style={{ left: `${(currentTimeA / durationA) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          setIsPlaying(!isPlaying)
                          setActiveTrack("A")
                        }}
                        className="h-8 w-8 rounded-full bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] flex items-center justify-center"
                      >
                        {isPlaying && activeTrack === "A" ? (
                          <Pause size={14} className="text-white" />
                        ) : (
                          <Play size={14} className="ml-0.5 text-white" />
                        )}
                      </Button>
                      <span className="text-xs">{formatTime(currentTimeA)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-[#333333]">
                        <MessageSquare size={12} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-[#333333]">
                        <Repeat size={12} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-[#333333]">
                        <Download size={12} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
                  <h3 className="font-medium mb-2">ANNOTATIONS</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {/* Annotations pour la version A */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-2 border border-[#333333] rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="border border-[#333333] px-1.5 py-0 text-xs">0:{i * 30}</div>
                            <span className="text-xs">MIXAGE</span>
                          </div>
                          <div className="text-xs text-[#00A3FF]">IN_PROGRESS</div>
                        </div>
                        <p className="text-xs mt-1">ANNOTATION_CONTENT_{i}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Version B */}
              <div className="space-y-4">
                <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">VERSION_B</h3>
                  </div>
                  <div className="relative h-32 border border-[#333333] rounded bg-black">
                    <canvas ref={canvasRefB} className="w-full h-full" />
                    <div
                      className="absolute top-0 h-full w-px bg-[#FF0080]"
                      style={{ left: `${(currentTimeB / durationB) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => {
                          setIsPlaying(!isPlaying)
                          setActiveTrack("B")
                        }}
                        className="h-8 w-8 rounded-full bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] flex items-center justify-center"
                      >
                        {isPlaying && activeTrack === "B" ? (
                          <Pause size={14} className="text-white" />
                        ) : (
                          <Play size={14} className="ml-0.5 text-white" />
                        )}
                      </Button>
                      <span className="text-xs">{formatTime(currentTimeB)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-[#333333]">
                        <MessageSquare size={12} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-[#333333]">
                        <Repeat size={12} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-[#333333]">
                        <Download size={12} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
                  <h3 className="font-medium mb-2">ANNOTATIONS</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {/* Annotations pour la version B */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-2 border border-[#333333] rounded-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="border border-[#333333] px-1.5 py-0 text-xs">1:{i * 15}</div>
                            <span className="text-xs">ARRANGEMENT</span>
                          </div>
                          <div className="text-xs text-[#00FF85]">RESOLVED</div>
                        </div>
                        <p className="text-xs mt-1">ANNOTATION_CONTENT_B_{i}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spectrum" className="mt-0">
            <div className="h-64 border border-[#333333] rounded bg-black p-4">
              <div className="text-center text-[#EFEFEF] mb-2">FREQUENCY_SPECTRUM_COMPARISON</div>
              <div className="h-[calc(100%-30px)] flex">
                <div className="w-1/2 h-full pr-2">
                  <div className="h-full bg-[#0D0D0D] rounded flex items-end justify-around p-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-3 bg-[#00A3FF]" style={{ height: `${Math.random() * 80 + 10}%` }}></div>
                    ))}
                  </div>
                </div>
                <div className="w-1/2 h-full pl-2">
                  <div className="h-full bg-[#0D0D0D] rounded flex items-end justify-around p-2">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="w-3 bg-[#FF0080]" style={{ height: `${Math.random() * 80 + 10}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="difference" className="mt-0">
            <div className="h-64 border border-[#333333] rounded bg-black p-4">
              <div className="text-center text-[#EFEFEF] mb-2">DIFFERENCE_ANALYSIS</div>
              <div className="h-[calc(100%-30px)] bg-[#0D0D0D] rounded p-4">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#EFEFEF]">BASS: 24% DIFFERENCE</span>
                    <div className="w-2/3 h-4 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00A3FF]" style={{ width: "24%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#EFEFEF]">MIDS: 12% DIFFERENCE</span>
                    <div className="w-2/3 h-4 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00A3FF]" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#EFEFEF]">HIGHS: 38% DIFFERENCE</span>
                    <div className="w-2/3 h-4 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00A3FF]" style={{ width: "38%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#EFEFEF]">DYNAMICS: 45% DIFFERENCE</span>
                    <div className="w-2/3 h-4 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00A3FF]" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#EFEFEF]">STEREO_WIDTH: 18% DIFFERENCE</span>
                    <div className="w-2/3 h-4 bg-[#1e1e1e] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00A3FF]" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contrôles de lecture */}
      {/*
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
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
            <span>{formatTime(activeTrack === "B" ? currentTimeB : currentTimeA)}</span>
            <span className="text-[#EFEFEF]">/</span>
            <span className="text-[#EFEFEF]">{formatTime(durationA)}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Volume2 size={16} />
              <Slider defaultValue={[80]} max={100} step={1} className="w-24" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button">
            <MessageSquare size={16} className="mr-2" /> VIEW_ANNOTATIONS
          </Button>
        </div>
      </div>
      */}
    </div>
  )
}

