"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Plus,
  ChevronDown,
  ChevronRight,
  FileMusic,
  Clock,
  Calendar,
  Music,
  Tag,
  Info,
  Edit,
  Image,
  Briefcase,
  DollarSign,
  Target,
  Save,
  Trash2,
  X,
} from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { NewCompositionModal } from "@/components/modals/new-composition-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectDetailViewProps {
  projectId: number
  onSelectComposition: (compositionId: number) => void
}

export function ProjectDetailView({ projectId, onSelectComposition }: ProjectDetailViewProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  const [showNewCompositionModal, setShowNewCompositionModal] = useState(false)

  // Modification: Ajouter l'état d'avancement du projet dans PROJECT_DETAILS
  // et permettre d'éditer l'état d'avancement

  // Ajouter un état pour l'édition
  const [isEditing, setIsEditing] = useState(false)
  const [projectProgress, setProjectProgress] = useState("IN_PROGRESS")
  const progressOptions = ["NOT_STARTED", "IN_PROGRESS", "ALMOST_DONE", "COMPLETED", "ON_HOLD"]

  // Ajouter un état spécifique pour l'édition de l'état d'avancement
  const [isProgressEditing, setIsProgressEditing] = useState(false)

  // Données fictives pour le projet
  const project = {
    id: projectId,
    title: "ALBUM_CONCEPT",
    description: "CONCEPT_ALBUM_EXPLORING_DIGITAL_LANDSCAPES_AND_SYNTHETIC_TEXTURES",
    genre: "ELECTRONIC / AMBIENT",
    createdAt: "15/03/2025",
    lastModified: "24/03/2025",
    totalCompositions: 8,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["ELECTRONIC", "AMBIENT", "EXPERIMENTAL", "SYNTH", "ATMOSPHERIC"],
    projectType: "ALBUM",
    commercialStatus: "LIBRE",
    purpose: "STREAMING",
  }

  // Données fictives pour les compositions
  const compositions = [
    {
      id: 101,
      title: "INTRO_MASTER",
      branch: "main",
      duration: "3:42",
      date: "24/03/2025",
      versions: 5,
      branches: 2,
      subGenre: "AMBIENT",
    },
    {
      id: 102,
      title: "VERSE_EXP",
      branch: "dev",
      duration: "2:18",
      date: "23/03/2025",
      versions: 3,
      branches: 1,
      subGenre: "TECHNO",
    },
    {
      id: 103,
      title: "BRIDGE_SECTION",
      branch: "feature/vocals",
      duration: "1:56",
      date: "22/03/2025",
      versions: 7,
      branches: 3,
      subGenre: "HOUSE",
    },
    {
      id: 104,
      title: "OUTRO_AMBIENT",
      branch: "main",
      duration: "4:12",
      date: "21/03/2025",
      versions: 2,
      branches: 1,
      subGenre: "AMBIENT",
    },
    {
      id: 105,
      title: "CHORUS_VARIATION",
      branch: "dev",
      duration: "2:45",
      date: "20/03/2025",
      versions: 4,
      branches: 2,
      subGenre: "TRANCE",
    },
    {
      id: 106,
      title: "DRUM_PATTERN_V2",
      branch: "feature/drums",
      duration: "1:32",
      date: "19/03/2025",
      versions: 3,
      branches: 1,
      subGenre: "DRUM_AND_BASS",
    },
    {
      id: 107,
      title: "SYNTH_LEAD",
      branch: "dev",
      duration: "3:08",
      date: "18/03/2025",
      versions: 6,
      branches: 2,
      subGenre: "TECHNO",
    },
    {
      id: 108,
      title: "BASS_SEQUENCE",
      branch: "main",
      duration: "2:24",
      date: "17/03/2025",
      versions: 4,
      branches: 1,
      subGenre: "HOUSE",
    },
  ]

  // Fonction pour obtenir la couleur en fonction du tag
  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      ELECTRONIC: "tag-electronic",
      AMBIENT: "tag-ambient",
      EXPERIMENTAL: "tag-default",
      SYNTH: "tag-house",
      ATMOSPHERIC: "tag-jazz",
    }

    return tagColors[tag] || "tag-default"
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">{project.title}</h1>
          <p className="text-[#EFEFEF]">PROJECT_DETAILS_AND_COMPOSITIONS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button"
            onClick={() => setShowNewCompositionModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> NEW_COMPOSITION
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full border border-[#333333]"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Save size={16} /> : <Edit size={16} />}
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="cube" />
          </div>
        </div>
      </div>

      {/* Détails du projet (dépliable) */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className="text-[#FFFFFF]">
              {isDetailsExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </div>
            <h2 className="text-lg font-medium glow-text-sm">PROJECT_DETAILS</h2>
          </div>
          <div className="flex items-center gap-4 text-[#EFEFEF] text-sm">
            {/* Ajouter l'état d'avancement avec possibilité d'édition */}
            <div className="flex items-center gap-2 border-r border-[#333333] pr-4 mr-2">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>STATUS:</span>
              </div>
              {isProgressEditing ? (
                <div className="flex items-center gap-2">
                  <Select
                    value={projectProgress}
                    onValueChange={(value) => {
                      setProjectProgress(value)
                      setIsProgressEditing(false)
                    }}
                  >
                    <SelectTrigger className="h-7 w-32 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select progress" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {progressOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsProgressEditing(false)
                    }}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-medium">{projectProgress}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsProgressEditing(true)
                    }}
                  >
                    <Edit size={14} />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>CREATED: {project.createdAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>MODIFIED: {project.lastModified}</span>
            </div>
          </div>
        </div>

        {isDetailsExpanded && (
          <div className="p-4 border-t border-[#333333] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4 md:col-span-2">
              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1 flex items-center gap-1">
                  <Info size={14} /> DESCRIPTION
                </h3>
                <p className="text-[#FFFFFF] p-3 bg-[#1e1e1e] rounded-md">{project.description}</p>
              </div>

              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1 flex items-center gap-1">
                  <Tag size={14} /> GENRE
                </h3>
                <p className="text-[#FFFFFF] p-3 bg-[#1e1e1e] rounded-md">{project.genre}</p>
              </div>

              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1 flex items-center gap-1">
                  <Briefcase size={14} /> PROJECT_TYPE
                </h3>
                <p className="text-[#FFFFFF] p-3 bg-[#1e1e1e] rounded-md">{project.projectType}</p>
              </div>

              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1 flex items-center gap-1">
                  <DollarSign size={14} /> COMMERCIAL_STATUS
                </h3>
                <p className="text-[#FFFFFF] p-3 bg-[#1e1e1e] rounded-md">{project.commercialStatus}</p>
              </div>

              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1 flex items-center gap-1">
                  <Target size={14} /> PURPOSE
                </h3>
                <p className="text-[#FFFFFF] p-3 bg-[#1e1e1e] rounded-md">{project.purpose}</p>
              </div>

              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1 flex items-center gap-1">
                  <Clock size={14} /> PROJECT_PROGRESS
                </h3>
                {isEditing ? (
                  <Select value={projectProgress} onValueChange={setProjectProgress}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select progress" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {progressOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-[#FFFFFF] p-3 bg-[#1e1e1e] rounded-md">{projectProgress}</p>
                )}
              </div>

              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1 flex items-center gap-1">
                  <Music size={14} /> COMPOSITIONS
                </h3>
                <p className="text-[#FFFFFF] p-3 bg-[#1e1e1e] rounded-md">{project.totalCompositions} TOTAL</p>
              </div>

              <div>
                <h3 className="text-sm text-[#EFEFEF] mb-1">TAGS</h3>
                <div className="flex flex-wrap gap-2 p-3 bg-[#1e1e1e] rounded-md">
                  {project.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`text-xs border border-[#333333] px-1.5 py-0.5 rounded ${getTagColor(tag)}`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-sm text-[#EFEFEF] mb-2 flex items-center gap-1">
                <Image size={14} /> PROJECT_ILLUSTRATION
              </h3>
              <div className="w-full aspect-square max-w-xs bg-[#1e1e1e] rounded-md overflow-hidden flex items-center justify-center">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liste des compositions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold glow-text">COMPOSITIONS</h2>
          <div className="flex items-center gap-2">
            <div className="text-xs text-[#EFEFEF]">{compositions.length} TOTAL</div>
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
          {/* En-tête du tableau */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
            <div className="col-span-4">TITLE</div>
            <div className="col-span-2">VERSIONS</div>
            <div className="col-span-2">BRANCHES</div>
            <div className="col-span-2">SUB_GENRE</div>
            <div className="col-span-1">LAST_MODIFIED</div>
            <div className="col-span-1">ACTIONS</div>
          </div>

          {compositions.map((composition) => (
            <div
              key={composition.id}
              className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors"
            >
              <div
                className="col-span-4 flex items-center gap-2 cursor-pointer"
                onClick={() => onSelectComposition(composition.id)}
              >
                <FileMusic size={16} className="text-[#EFEFEF]" />
                <span className="font-medium">{composition.title}</span>
              </div>
              <div className="col-span-2 flex items-center text-[#EFEFEF]">
                <span>{composition.versions} VERSIONS</span>
              </div>
              <div className="col-span-2 flex items-center text-[#EFEFEF]">
                <span>{composition.branches} BRANCHES</span>
              </div>
              <div className="col-span-2 flex items-center">
                <div className="border border-[#333333] px-1.5 py-0 text-xs tag-ambient">
                  {composition.subGenre || "AMBIENT"}
                </div>
              </div>
              <div className="col-span-1 flex items-center text-[#EFEFEF]">{composition.date}</div>
              <div className="col-span-1 flex items-center justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full border border-[#333333] text-red-500 hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Ici vous pourriez ajouter une confirmation avant la suppression
                    console.log(`Deleting composition: ${composition.id}`)
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
      {showNewCompositionModal && (
        <NewCompositionModal
          onClose={() => setShowNewCompositionModal(false)}
          onSave={(data) => {
            console.log("New composition data:", data)
            setShowNewCompositionModal(false)
            // Ici vous pourriez ajouter la logique pour sauvegarder la nouvelle composition
          }}
        />
      )}
    </div>
  )
}

