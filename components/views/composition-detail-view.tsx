"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
// Ajouter l'import pour le bouton de suppression si nécessaire
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  MessageSquare,
  Repeat,
  Download,
  GitCompare,
  GitBranch,
  Plus,
  Clock,
  Music,
  Hash,
  Tag,
  Share2,
  Edit,
  Check,
  X,
  Trash2,
} from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Composant pour la visualisation arborescente des branches
function BranchTreeView({
  versions,
  onClose,
  onMerge,
}: {
  versions: any[]
  onClose: () => void
  onMerge: (sourceBranch: string, targetBranch: string) => void
}) {
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [mergeTarget, setMergeTarget] = useState<string>("main")
  const [showMergeDialog, setShowMergeDialog] = useState(false)

  // Organiser les versions par branche
  const branchesMap: Record<string, any[]> = {}
  versions.forEach((version) => {
    if (!branchesMap[version.branch]) {
      branchesMap[version.branch] = []
    }
    branchesMap[version.branch].push(version)
  })

  // Trier les versions par date dans chaque branche
  Object.keys(branchesMap).forEach((branch) => {
    branchesMap[branch].sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"))
      const dateB = new Date(b.date.split("/").reverse().join("-"))
      return dateA.getTime() - dateB.getTime()
    })
  })

  // Déterminer les branches qui ne sont pas "main"
  const featureBranches = Object.keys(branchesMap).filter((branch) => branch !== "main")

  // Fonction pour obtenir la couleur de la branche
  const getBranchColor = (branch: string) => {
    const branchColors: Record<string, string> = {
      main: "branch-main",
      "feature/vocals": "branch-feature",
      "feature/drums": "branch-hotfix",
      dev: "branch-dev",
      release: "branch-release",
    }

    return branchColors[branch] || "branch-default"
  }

  // Gérer le merge de branches
  const handleMerge = () => {
    if (selectedBranch && mergeTarget) {
      onMerge(selectedBranch, mergeTarget)
      setShowMergeDialog(false)
      setSelectedBranch(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
        <div className="p-4 border-b border-[#333333] flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight glow-text">BRANCH_VIEW</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <X size={16} />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* Actions */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium glow-text-sm">GIT_BRANCHES</h3>
              <p className="text-sm text-[#EFEFEF]">Visualize and manage your composition branches</p>
            </div>
            <div className="flex gap-2">
              {selectedBranch && (
                <Button
                  className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button"
                  onClick={() => setShowMergeDialog(true)}
                >
                  <GitBranch size={16} className="mr-2" /> MERGE_BRANCH
                </Button>
              )}
            </div>
          </div>

          {/* Arbre des branches */}
          <div className="relative min-h-[400px] border border-[#333333] rounded-lg p-4 overflow-auto">
            {/* Branche principale (main) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#FFFFFF] transform -translate-x-1/2"></div>

            <div className="relative z-10">
              {/* Titre de la branche principale */}
              <div
                className={`absolute left-1/2 top-4 transform -translate-x-1/2 px-3 py-1 border ${
                  selectedBranch === "main" ? "border-[#FFFFFF]" : "border-[#333333]"
                } rounded cursor-pointer ${getBranchColor("main")}`}
                onClick={() => setSelectedBranch(selectedBranch === "main" ? null : "main")}
              >
                main
              </div>

              {/* Versions de la branche principale */}
              {branchesMap["main"]?.map((version, index) => (
                <div
                  key={version.id}
                  className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
                  style={{ top: `${80 + index * 60}px` }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#FFFFFF] z-10"></div>
                  <div className="absolute left-6 bg-[#1e1e1e] border border-[#333333] p-2 rounded min-w-[150px]">
                    <div className="text-sm font-medium">{version.name}</div>
                    <div className="text-xs text-[#EFEFEF]">{version.date}</div>
                  </div>
                </div>
              ))}

              {/* Branches secondaires */}
              {featureBranches.map((branch, branchIndex) => {
                const mainVersions = branchesMap["main"] || []
                const branchStartIndex = Math.min(branchIndex, mainVersions.length - 1)
                const startY = 80 + branchStartIndex * 60

                return (
                  <div key={branch} className="relative">
                    {/* Ligne de connexion à la branche principale */}
                    <div
                      className="absolute bg-[#333333]"
                      style={{
                        left: "50%",
                        top: `${startY + 1.5}px`,
                        width: `${100 + branchIndex * 50}px`,
                        height: "2px",
                      }}
                    ></div>

                    {/* Ligne verticale de la branche */}
                    <div
                      className="absolute bg-[#333333] w-px"
                      style={{
                        left: `calc(50% + ${100 + branchIndex * 50}px)`,
                        top: `${startY}px`,
                        height: `${branchesMap[branch].length * 60 + 40}px`,
                      }}
                    ></div>

                    {/* Titre de la branche */}
                    <div
                      className={`absolute px-3 py-1 border ${
                        selectedBranch === branch ? "border-[#FFFFFF]" : "border-[#333333]"
                      } rounded cursor-pointer ${getBranchColor(branch)}`}
                      style={{
                        left: `calc(50% + ${100 + branchIndex * 50}px)`,
                        top: `${startY - 30}px`,
                        transform: "translateX(-50%)",
                      }}
                      onClick={() => setSelectedBranch(selectedBranch === branch ? null : branch)}
                    >
                      {branch}
                    </div>

                    {/* Versions de la branche */}
                    {branchesMap[branch].map((version, vIndex) => (
                      <div
                        key={version.id}
                        className="absolute flex items-center"
                        style={{
                          left: `calc(50% + ${100 + branchIndex * 50}px)`,
                          top: `${startY + 30 + vIndex * 60}px`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <div className="w-3 h-3 rounded-full bg-[#FFFFFF] z-10"></div>
                        <div className="absolute left-6 bg-[#1e1e1e] border border-[#333333] p-2 rounded min-w-[150px]">
                          <div className="text-sm font-medium">{version.name}</div>
                          <div className="text-xs text-[#EFEFEF]">{version.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Légende */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FFFFFF]"></div>
              <span>Version</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-px bg-[#FFFFFF]"></div>
              <span>Branch connection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 border border-[#333333] branch-main text-xs">main</div>
              <span>Main branch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 border border-[#333333] branch-feature text-xs">feature</div>
              <span>Feature branch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogue de merge */}
      {showMergeDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">MERGE_BRANCH</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="source-branch">SOURCE_BRANCH</Label>
                <div className="mt-1 px-3 py-2 border border-[#333333] rounded bg-[#1e1e1e]">{selectedBranch}</div>
              </div>

              <div>
                <Label htmlFor="target-branch">TARGET_BRANCH</Label>
                <Select value={mergeTarget} onValueChange={setMergeTarget}>
                  <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    <SelectValue placeholder="Select target branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    {Object.keys(branchesMap)
                      .filter((branch) => branch !== selectedBranch)
                      .map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  className="border-[#333333] text-[#EFEFEF]"
                  onClick={() => setShowMergeDialog(false)}
                >
                  CANCEL
                </Button>
                <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]" onClick={handleMerge}>
                  MERGE
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface CompositionDetailViewProps {
  projectId: number
  compositionId: number
}

export function CompositionDetailView({ projectId, compositionId }: CompositionDetailViewProps) {
  // Ajouter ces états au début du composant CompositionDetailView, après les autres déclarations d'état
  const [isStatusEditing, setIsStatusEditing] = useState(false)
  const [compositionStatus, setCompositionStatus] = useState("IN_PROGRESS") // Statut initial
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedVersion, setSelectedVersion] = useState<number | null>(1)
  const [showAnnotationFormInternal, setShowAnnotationFormInternal] = useState(false)
  const [annotationTimeMarker, setAnnotationTimeMarker] = useState("")
  const [annotationContent, setAnnotationContent] = useState("")
  const [annotationType, setAnnotationType] = useState("MIXAGE")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const duration = 214 // Durée en secondes (3:34)

  const [showNewVersionDialog, setShowNewVersionDialog] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState("main")
  const [createNewBranch, setCreateNewBranch] = useState(false)
  const [newBranchName, setNewBranchName] = useState("")
  const [newBranchDescription, setNewBranchDescription] = useState("")
  const [versionName, setVersionName] = useState("")
  const [showBranchView, setShowBranchView] = useState(false)
  const [selectedBranchForView, setSelectedBranchForView] = useState("all")

  // Ajouter des variables d'état pour suivre les versions avec des annotations d'auditeurs extérieurs
  // Ajouter après les autres déclarations d'état (vers la ligne 320)
  const [versionsWithExternalAnnotations, setVersionsWithExternalAnnotations] = useState<number[]>([3, 4, 6, 7]) // Versions avec annotations d'auditeurs extérieurs
  const [externalAnnotations, setExternalAnnotations] = useState<number[]>([1, 3, 4]) // IDs des annotations faites par des auditeurs extérieurs

  // Données fictives pour la composition
  const composition = {
    id: compositionId,
    title: "BRIDGE_SECTION",
    description: "EXPERIMENTAL_BRIDGE_WITH_AMBIENT_TEXTURES_AND_RHYTHMIC_ELEMENTS",
    tempo: "124 BPM",
    key: "C MINOR",
    instruments: ["SYNTH", "DRUMS", "BASS", "AMBIENT_TEXTURES"],
    duration: "1:56",
    genre: "ELECTRONIC",
    subGenre: "AMBIENT",
    createdAt: "22/03/2025",
    lastModified: "24/03/2025",
    totalVersions: 7,
    totalBranches: 3,
  }

  // Données fictives pour les versions
  const versions = [
    { id: 1, name: "V1.0", branch: "main", date: "22/03/2025", author: "YOU" },
    { id: 2, name: "V1.1", branch: "main", date: "22/03/2025", author: "YOU" },
    { id: 3, name: "V2.0", branch: "feature/vocals", date: "23/03/2025", author: "COLLAB_1" },
    { id: 4, name: "V2.1", branch: "feature/vocals", date: "23/03/2025", author: "COLLAB_1" },
    { id: 5, name: "V1.2", branch: "main", date: "24/03/2025", author: "YOU" },
    { id: 6, name: "V2.2", branch: "feature/vocals", date: "24/03/2025", author: "COLLAB_2" },
    { id: 7, name: "V3.0", branch: "feature/drums", date: "24/03/2025", author: "COLLAB_3" },
  ]

  // Données fictives pour les annotations
  const annotations = [
    {
      id: 1,
      type: "FEEDBACK",
      timeMarker: "0:24",
      author: "COLLAB_1",
      content: "INCREASE_BASS_LEVEL_HERE",
      status: "PENDING",
      date: "23/03/2025",
      versionId: 3,
    },
    {
      id: 2,
      type: "IDEA",
      timeMarker: "0:36",
      author: "YOU",
      content: "ADD_ATMOSPHERIC_SYNTH_LAYER",
      status: "IN_PROGRESS",
      date: "23/03/2025",
      versionId: 2,
    },
    {
      id: 3,
      type: "FIX",
      timeMarker: "0:58",
      author: "COLLAB_2",
      content: "FIX_DRUM_TIMING_ISSUE",
      status: "RESOLVED",
      date: "24/03/2025",
      versionId: 6,
    },
    {
      id: 4,
      type: "FEEDBACK",
      timeMarker: "1:12",
      author: "COLLAB_3",
      content: "REDUCE_REVERB_ON_SYNTH",
      status: "PENDING",
      date: "24/03/2025",
      versionId: 7,
    },
    {
      id: 5,
      type: "IDEA",
      timeMarker: "1:45",
      author: "YOU",
      content: "TRANSITION_TO_OUTRO_HERE",
      status: "IN_PROGRESS",
      date: "24/03/2025",
      versionId: 5,
    },
  ]

  // Obtenir toutes les branches uniques
  const uniqueBranches = ["all", ...new Set(versions.map((v) => v.branch))]

  // Fonction pour formater le temps (secondes -> MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Fonction pour convertir le format MM:SS en secondes
  const timeToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(":").map(Number)
    return minutes * 60 + seconds
  }

  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return { icon: <Clock size={14} />, color: "text-[#FFB800]", bgColor: "bg-[#FFB800]" }
      case "IN_PROGRESS":
        return { icon: <Clock size={14} />, color: "text-[#00A3FF]", bgColor: "bg-[#00A3FF]" }
      case "RESOLVED":
        return { icon: <Check size={14} />, color: "text-[#00FF85]", bgColor: "bg-[#00FF85]" }
      default:
        return { icon: <Clock size={14} />, color: "text-[#FFFFFF]", bgColor: "bg-[#FFFFFF]" }
    }
  }

  // Fonction pour obtenir la couleur de la branche
  const getBranchColor = (branch: string) => {
    const branchColors: Record<string, string> = {
      main: "branch-main",
      "feature/vocals": "branch-feature",
      "feature/drums": "branch-hotfix",
      dev: "branch-dev",
      release: "branch-release",
    }

    return branchColors[branch] || "branch-default"
  }

  // Fonction pour obtenir la couleur du genre musical
  const getGenreColor = (genre: string) => {
    const genreColors: Record<string, { bg: string; text: string }> = {
      ELECTRONIC: { bg: "bg-[#7B68EE]", text: "text-white" },
      AMBIENT: { bg: "bg-[#2ECC71]", text: "text-white" },
      ROCK: { bg: "bg-[#E74C3C]", text: "text-white" },
      POP: { bg: "bg-[#F1C40F]", text: "text-black" },
      JAZZ: { bg: "bg-[#9B59B6]", text: "text-white" },
      CLASSICAL: { bg: "bg-[#3498DB]", text: "text-white" },
      "HIP-HOP": { bg: "bg-[#FF5733]", text: "text-white" },
      "R&B": { bg: "bg-[#1ABC9C]", text: "text-white" },
      FOLK: { bg: "bg-[#D35400]", text: "text-white" },
      COUNTRY: { bg: "bg-[#27AE60]", text: "text-white" },
      METAL: { bg: "bg-[#34495E]", text: "text-white" },
    }

    // Vérifier si le genre contient un des genres connus
    for (const [key, value] of Object.entries(genreColors)) {
      if (genre.includes(key)) {
        return value
      }
    }

    return { bg: "bg-[#1e1e1e]", text: "text-[#EFEFEF]" }
  }

  // Fonction pour obtenir la couleur de l'instrument
  const getInstrumentColor = (instrument: string) => {
    const instrumentColors: Record<string, string> = {
      SYNTH: "bg-[#7B68EE] text-white",
      DRUMS: "bg-[#FF5733] text-white",
      BASS: "bg-[#3498DB] text-white",
      AMBIENT_TEXTURES: "bg-[#2ECC71] text-white",
      GUITAR: "bg-[#F1C40F] text-black",
      PIANO: "bg-[#9B59B6] text-white",
      VOCALS: "bg-[#E74C3C] text-white",
      STRINGS: "bg-[#1ABC9C] text-white",
      BRASS: "bg-[#D35400] text-white",
      WOODWINDS: "bg-[#27AE60] text-white",
      PERCUSSION: "bg-[#E67E22] text-white",
    }

    return instrumentColors[instrument] || "bg-[#1e1e1e] text-[#EFEFEF]"
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
    annotations.forEach((anno) => {
      const seconds = timeToSeconds(anno.timeMarker)
      const position = seconds / duration
      const x = canvas.width * position

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
  }, [currentTime, annotations])

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

  // Fonction pour ajouter une annotation
  const handleAddAnnotation = () => {
    if (!annotationTimeMarker || !annotationContent) return

    // Simuler l'ajout d'une annotation (dans une application réelle, cela serait envoyé à une API)
    console.log("Nouvelle annotation:", {
      timeMarker: annotationTimeMarker,
      content: annotationContent,
      type: annotationType,
      status: "PENDING",
      author: "YOU",
      date: new Date().toLocaleDateString(),
      versionId: selectedVersion,
    })

    // Réinitialiser le formulaire
    setShowAnnotationFormInternal(false)
    setAnnotationContent("")
    // Ne pas réinitialiser le timeMarker pour permettre d'ajouter plusieurs annotations au même point
  }

  // Filtrer les versions en fonction de la branche sélectionnée
  const filteredVersions =
    selectedBranchForView === "all" ? versions : versions.filter((v) => v.branch === selectedBranchForView)

  // Filtrer les annotations pour la version sélectionnée
  const filteredAnnotations = selectedVersion ? annotations.filter((a) => a.versionId === selectedVersion) : annotations

  const handleMergeBranch = (sourceBranch: string, targetBranch: string) => {
    // Ici, vous implémenteriez la logique réelle de fusion des branches
    console.log(`Merging ${sourceBranch} into ${targetBranch}`)
    // Pour l'instant, on ferme simplement la vue
    setShowBranchView(false)
  }

  const showAnnotationForm = showAnnotationFormInternal

  // Ajouter cette fonction de suppression d'annotation après les autres fonctions du composant, avant le return
  const handleDeleteAnnotation = (annotationId: number) => {
    // Dans une application réelle, cela enverrait une requête à l'API
    console.log(`Deleting annotation: ${annotationId}`)
    // Simuler la suppression en filtrant l'annotation
    // Dans une application réelle, vous mettriez à jour l'état avec les données de l'API
  }

  return (
    <div className="space-y-8">
      {/* En-tête avec genre */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <Badge className={`${getGenreColor(composition.genre).bg} ${getGenreColor(composition.genre).text}`}>
            {composition.genre}
          </Badge>
          <Badge className={`${getGenreColor(composition.subGenre).bg} ${getGenreColor(composition.subGenre).text}`}>
            {composition.subGenre}
          </Badge>
        </div>

        {/* Modifier la section du titre pour inclure le statut et le bouton d'édition */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold tracking-tight glow-text">{composition.title}</h1>
              <div className="flex items-center gap-2">
                {!isStatusEditing ? (
                  <>
                    <Badge
                      className={`${
                        compositionStatus === "NOT_STARTED"
                          ? "bg-gray-500"
                          : compositionStatus === "IN_PROGRESS"
                            ? "bg-blue-500"
                            : compositionStatus === "ALMOST_DONE"
                              ? "bg-yellow-500"
                              : compositionStatus === "COMPLETED"
                                ? "bg-green-500"
                                : "bg-red-500"
                      } text-white`}
                    >
                      {compositionStatus}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsStatusEditing(true)
                      }}
                    >
                      <Edit size={12} />
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Select
                      value={compositionStatus}
                      onValueChange={(value) => {
                        setCompositionStatus(value)
                        setIsStatusEditing(false)
                      }}
                    >
                      <SelectTrigger className="h-7 w-36 text-xs bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                        <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
                        <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                        <SelectItem value="ALMOST_DONE">ALMOST_DONE</SelectItem>
                        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                        <SelectItem value="ON_HOLD">ON_HOLD</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsStatusEditing(false)
                      }}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[#EFEFEF]">
              PROJECT: ALBUM_CONCEPT • {composition.totalVersions} VERSIONS • {composition.totalBranches} BRANCHES
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showNewVersionDialog} onOpenChange={setShowNewVersionDialog}>
              <DialogTrigger asChild>
                <Button className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button">
                  <Plus className="mr-2 h-4 w-4" /> NEW_VERSION
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0D0D0D] border border-[#333333] text-[#EFEFEF] max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold tracking-tight glow-text">NEW_VERSION</DialogTitle>
                  <DialogDescription className="text-[#EFEFEF]">
                    Create a new version of your composition.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">BRANCH</Label>
                    <div className="flex items-center gap-2">
                      <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                        <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] flex-1">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                          <SelectItem value="main">main</SelectItem>
                          <SelectItem value="feature/vocals">feature/vocals</SelectItem>
                          <SelectItem value="feature/drums">feature/drums</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        className="border-[#333333] text-[#EFEFEF]"
                        onClick={() => setCreateNewBranch(!createNewBranch)}
                      >
                        {createNewBranch ? "USE_EXISTING" : "NEW_BRANCH"}
                      </Button>
                    </div>
                  </div>

                  {createNewBranch && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="new-branch-name">BRANCH_NAME</Label>
                        <Input
                          id="new-branch-name"
                          placeholder="feature/name"
                          value={newBranchName}
                          onChange={(e) => setNewBranchName(e.target.value)}
                          className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-branch-description">BRANCH_DESCRIPTION</Label>
                        <Textarea
                          id="new-branch-description"
                          placeholder="Describe the purpose of this branch"
                          value={newBranchDescription}
                          onChange={(e) => setNewBranchDescription(e.target.value)}
                          className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] min-h-[80px]"
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="version-name">VERSION_NAME</Label>
                    <Input
                      id="version-name"
                      placeholder="V1.0"
                      value={versionName}
                      onChange={(e) => setVersionName(e.target.value)}
                      className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audio-file">AUDIO_FILE</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="audio-file"
                        type="file"
                        accept="audio/*"
                        className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-[#333333]">
                    <Label className="text-[#EFEFEF] flex items-center gap-2">
                      <MessageSquare size={14} /> PREVIOUS_VERSION_ANNOTATIONS
                    </Label>
                    <div className="max-h-[200px] overflow-y-auto border border-[#333333] rounded-md">
                      {annotations
                        .filter((a) => a.versionId === selectedVersion)
                        .map((annotation) => (
                          <div
                            key={annotation.id}
                            className="p-3 border-b border-[#333333] flex items-start justify-between"
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex items-center justify-center mt-1">
                                <input
                                  type="checkbox"
                                  id={`annotation-${annotation.id}`}
                                  className="rounded border-[#333333] bg-[#0D0D0D]"
                                  defaultChecked
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className="border border-[#333333] px-1.5 py-0 text-xs">
                                    {annotation.timeMarker}
                                  </div>
                                  <span className="text-xs font-medium">{annotation.type}</span>
                                </div>
                                <p className="text-xs mt-1">{annotation.content}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Select defaultValue={annotation.status}>
                                <SelectTrigger className="h-7 w-28 text-xs bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                                  <SelectItem value="PENDING">PENDING</SelectItem>
                                  <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                  <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-[#00FF85]"
                                title="Validate"
                              >
                                <Check size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 rounded-full text-[#EF4444]"
                                title="Remove"
                              >
                                <X size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      {annotations.filter((a) => a.versionId === selectedVersion).length === 0 && (
                        <div className="p-4 text-center text-[#666666]">NO_ANNOTATIONS_IN_SELECTED_VERSION</div>
                      )}
                    </div>
                    <div className="text-xs text-[#EFEFEF] italic">
                      Select annotations to transfer to the new version. You can update their status or validate/remove
                      them.
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-[#333333] text-[#EFEFEF]"
                    onClick={() => setShowNewVersionDialog(false)}
                  >
                    CANCEL
                  </Button>
                  <Button
                    className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
                    onClick={() => {
                      // Ici, on simulerait l'ajout d'une version
                      setShowNewVersionDialog(false)
                      // Réinitialiser les champs
                      setCreateNewBranch(false)
                      setNewBranchName("")
                      setNewBranchDescription("")
                      setVersionName("")
                    }}
                  >
                    CREATE_VERSION
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <Edit size={16} />
            </Button>

            {/* Mini visualiseur dans le coin */}
            <div className="w-8 h-8">
              <MiniVisualizer type="wave" />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2">DESCRIPTION</h3>
        <p className="text-[#EFEFEF]">{composition.description}</p>
      </div>

      {/* Informations sur la composition */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-[#EFEFEF]" />
            <h3 className="text-sm font-medium">TEMPO</h3>
          </div>
          <p className="text-[#FFFFFF] text-lg">{composition.tempo}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Hash size={16} className="text-[#EFEFEF]" />
            <h3 className="text-sm font-medium">KEY</h3>
          </div>
          <p className="text-[#FFFFFF] text-lg">{composition.key}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Music size={16} className="text-[#EFEFEF]" />
            <h3 className="text-sm font-medium">DURATION</h3>
          </div>
          <p className="text-[#FFFFFF] text-lg">{composition.duration}</p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag size={16} className="text-[#EFEFEF]" />
            <h3 className="text-sm font-medium">INSTRUMENTS</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {composition.instruments.map((instrument, index) => (
              <Badge key={index} className={`${getInstrumentColor(instrument)}`}>
                {instrument}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Lecteur audio et visualisation */}
      <div className="bg-black border border-[#333333] rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium glow-text-sm">
              {selectedVersion
                ? `VERSION ${versions.find((v) => v.id === selectedVersion)?.name || ""}`
                : "SELECT_VERSION"}
            </h3>
            <p className="text-xs text-[#EFEFEF]">
              {selectedVersion
                ? `BRANCH: ${versions.find((v) => v.id === selectedVersion)?.branch || ""}`
                : "NO_VERSION_SELECTED"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <Repeat size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <Download size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <Share2 size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
              <GitCompare size={16} />
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
            <span>00:30</span>
            <span>01:00</span>
            <span>01:30</span>
            <span>{composition.duration}</span>
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
            <span className="text-[#EFEFEF]">{composition.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 size={16} />
            <Slider defaultValue={[80]} max={100} step={1} className="w-24" />
          </div>
        </div>

        {/* Section d'annotation */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#333333] pt-4">
          {/* Formulaire d'annotation à gauche */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">ADD_ANNOTATION</h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 rounded-full border border-[#333333] flex items-center justify-center"
                onClick={() => {
                  // Récupérer le temps actuel de la timeline
                  setAnnotationTimeMarker(formatTime(currentTime))
                  setShowAnnotationFormInternal(true)
                }}
              >
                <MessageSquare size={14} />
                <span className="absolute -top-1 -right-1 text-xs bg-[#FFFFFF] text-[#0D0D0D] rounded-full w-4 h-4 flex items-center justify-center">
                  +
                </span>
              </Button>
            </div>

            {showAnnotationForm && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="time-marker" className="text-xs">
                    TIME
                  </Label>
                  <Input
                    id="time-marker"
                    value={annotationTimeMarker}
                    onChange={(e) => setAnnotationTimeMarker(e.target.value)}
                    className="h-7 text-xs bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] w-20"
                  />

                  <Label htmlFor="annotation-category" className="text-xs ml-2">
                    CATEGORY
                  </Label>
                  <Select value={annotationType} onValueChange={setAnnotationType}>
                    <SelectTrigger className="h-7 text-xs bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] w-32">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectItem value="MIXAGE">MIXAGE</SelectItem>
                      <SelectItem value="ARRANGEMENT">ARRANGEMENT</SelectItem>
                      <SelectItem value="MELODIC_IDEA">MELODIC_IDEA</SelectItem>
                      <SelectItem value="SOUND_DESIGN">SOUND_DESIGN</SelectItem>
                      <SelectItem value="FEEDBACK">FEEDBACK</SelectItem>
                      <SelectItem value="TECHNICAL">TECHNICAL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  placeholder="Enter your annotation..."
                  value={annotationContent}
                  onChange={(e) => setAnnotationContent(e.target.value)}
                  className="text-xs bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] min-h-[60px]"
                />

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs border-[#333333] bg-transparent"
                    onClick={() => setShowAnnotationFormInternal(false)}
                  >
                    CANCEL
                  </Button>
                  <Button size="sm" className="h-7 text-xs bg-[#FFFFFF] text-[#0D0D0D]" onClick={handleAddAnnotation}>
                    SAVE
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Liste des annotations à droite */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">ANNOTATIONS</h4>
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {/* Grouper par catégorie */}
              {["MIXAGE", "ARRANGEMENT", "MELODIC_IDEA", "SOUND_DESIGN", "FEEDBACK", "TECHNICAL"].map((category) => {
                const categoryAnnotations = filteredAnnotations.filter((a) => a.type === category)
                if (categoryAnnotations.length === 0) return null

                return (
                  <div key={category} className="mb-3">
                    <h5 className="text-xs font-medium mb-1 text-[#EFEFEF]">{category}</h5>
                    <div className="space-y-1">
                      {/* Grouper par statut */}
                      {["PENDING", "IN_PROGRESS"].map((status) => {
                        const statusAnnotations = categoryAnnotations.filter((a) => a.status === status)
                        if (statusAnnotations.length === 0) return null

                        return (
                          <div key={`${category}-${status}`} className="ml-2">
                            <h6 className="text-xs text-[#666666] mb-1">
                              {status === "PENDING" ? "A_TRAITER" : "EN_REFLEXION"}
                            </h6>
                            {statusAnnotations.map((annotation) => (
                              <div
                                key={annotation.id}
                                className={`text-xs p-1 border ${
                                  externalAnnotations.includes(annotation.id)
                                    ? "border-red-500 bg-red-500/10"
                                    : "border-[#333333]"
                                } rounded mb-1 flex items-start justify-between group`}
                              >
                                <div className="flex items-start">
                                  <div className="bg-[#1e1e1e] px-1 py-0.5 rounded mr-1 min-w-[30px] text-center">
                                    {annotation.timeMarker}
                                  </div>
                                  <div className="flex-1">
                                    {externalAnnotations.includes(annotation.id) && (
                                      <span className="text-red-500 font-bold mr-1">[EXTERNAL]</span>
                                    )}
                                    {annotation.content}
                                  </div>
                                </div>
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 rounded-full text-red-500 hover:bg-red-500/10"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteAnnotation(annotation.id)
                                    }}
                                  >
                                    <Trash2 size={10} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Section versions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium glow-text-sm">VERSION_HISTORY</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="branch-filter" className="text-sm">
                BRANCH:
              </Label>
              <Select value={selectedBranchForView} onValueChange={setSelectedBranchForView}>
                <SelectTrigger id="branch-filter" className="w-40 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {uniqueBranches.map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch === "all" ? "ALL_BRANCHES" : branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-transparent border border-[#333333] hover:bg-[#1e1e1e] text-[#EFEFEF]"
              onClick={() => setShowBranchView(true)}
            >
              <GitBranch size={16} className="mr-2" /> BRANCH_VIEW
            </Button>
          </div>
        </div>

        {/* Modifier la section de liste des versions pour ajouter le bouton de suppression */}
        {/* Dans la section des versions, remplacer la grille des versions par celle-ci: */}
        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
          {/* En-tête du tableau */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
            <div className="col-span-3">VERSION</div>
            <div className="col-span-3">BRANCH</div>
            <div className="col-span-2">AUTHOR</div>
            <div className="col-span-2">DATE</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {filteredVersions.map((version) => (
            <div
              key={version.id}
              className={`grid grid-cols-12 gap-4 p-4 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors ${
                selectedVersion === version.id ? "bg-[#1e1e1e]" : ""
              }`}
            >
              <div
                className="col-span-3 flex items-center gap-2 cursor-pointer"
                onClick={() => setSelectedVersion(version.id)}
              >
                <div className="w-2 h-2 rounded-full bg-[#FFFFFF]"></div>
                <span className="font-medium relative">
                  {version.name}
                  {versionsWithExternalAnnotations.includes(version.id) && (
                    <span className="absolute -right-2 -top-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </span>
              </div>
              <div className="col-span-3 flex items-center">
                <div className={`border border-[#333333] px-1.5 py-0 text-xs ${getBranchColor(version.branch)}`}>
                  {version.branch}
                </div>
              </div>
              <div className="col-span-2 flex items-center text-[#EFEFEF]">{version.author}</div>
              <div className="col-span-2 flex items-center text-[#EFEFEF]">{version.date}</div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full border border-[#333333] text-red-500 hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Ici vous pourriez ajouter une confirmation avant la suppression
                    console.log(`Deleting version: ${version.id}`)
                    // Logique de suppression à implémenter
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vue arborescente des branches */}
      {showBranchView && (
        <BranchTreeView versions={versions} onClose={() => setShowBranchView(false)} onMerge={handleMergeBranch} />
      )}
    </div>
  )
}

