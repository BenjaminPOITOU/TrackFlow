"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Music2, Upload } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewProjectModalProps {
  onClose: () => void
  onSave?: (data: any) => void
}

export function NewProjectModal({ onClose, onSave }: NewProjectModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [image, setImage] = useState<string | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [projectType, setProjectType] = useState<string>("ALBUM")
  const [commercialStatus, setCommercialStatus] = useState<string>("LIBRE")
  const [purpose, setPurpose] = useState<string>("STREAMING")
  const [projectProgress, setProjectProgress] = useState<string>("NOT_STARTED")
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])

  const availableTags = ["ELECTRONIC", "AMBIENT", "JAZZ", "FUSION", "POP", "VOCAL", "HOUSE", "TECHNO", "EXPERIMENTAL"]
  const availableGenres = ["ELECTRONIC", "AMBIENT", "JAZZ", "FUSION", "POP", "VOCAL", "HOUSE", "TECHNO", "EXPERIMENTAL"]
  const projectTypes = ["ALBUM", "EP", "SINGLE", "REMIX", "BO", "PODCAST", "COMPILATION"]
  const commercialStatuses = ["LIBRE", "EXCLUSIF", "COMMONS", "EN_ATTENTE", "COMMERCIAL", "NON_COMMERCIAL"]
  const purposes = ["LABEL", "STREAMING", "SYNC", "PERSONAL", "DEMO", "LIVE", "EDUCATION"]
  const progressOptions = ["NOT_STARTED", "IN_PROGRESS", "ALMOST_DONE", "COMPLETED", "ON_HOLD"]

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const toggleInstrument = (instrument: string) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(selectedInstruments.filter((i) => i !== instrument))
    } else {
      setSelectedInstruments([...selectedInstruments, instrument])
    }
  }

  // Fonction pour obtenir la classe de couleur pour un tag
  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      ELECTRONIC: "tag-electronic",
      AMBIENT: "tag-ambient",
      JAZZ: "tag-jazz",
      FUSION: "tag-fusion",
      POP: "tag-pop",
      VOCAL: "tag-vocal",
      HOUSE: "tag-house",
      TECHNO: "tag-techno",
      EXPERIMENTAL: "tag-default",
    }

    return tagColors[tag] || "tag-default"
  }

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        title,
        description,
        genres: selectedGenres,
        tags: selectedTags,
        image,
        projectType,
        commercialStatus,
        purpose,
        progress: projectProgress,
      })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Bouton de fermeture */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 rounded-full border border-[#333333]"
          onClick={onClose}
        >
          <X size={16} />
        </Button>

        {/* En-tête */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#FFFFFF] flex items-center justify-center">
            <Music2 size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold glow-text-sm">NEW_PROJECT</h2>
            <p className="text-xs text-[#EFEFEF]">CREATE_YOUR_AUDIO_PROJECT</p>
          </div>

          {/* Mini visualiseur dans le coin */}
          <div className="absolute right-12 top-4 w-6 h-6">
            <MiniVisualizer type="cube" />
          </div>
        </div>

        {/* Formulaire */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-title" className="text-[#EFEFEF]">
                PROJECT_TITLE
              </Label>
              <Input
                id="project-title"
                placeholder="ENTER_PROJECT_TITLE"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">PROJECT_TYPE</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">COMMERCIAL_STATUS</Label>
              <Select value={commercialStatus} onValueChange={setCommercialStatus}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select commercial status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {commercialStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">PURPOSE</Label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {purposes.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">PROJECT_PROGRESS</Label>
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">PROJECT_GENRES</Label>
              <Select>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {availableGenres.map((genre) => (
                    <SelectItem key={genre} value={genre.toLowerCase()} onClick={() => toggleGenre(genre)}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGenres.map((genre) => (
                  <div
                    key={genre}
                    className={`border border-[#333333] px-1.5 py-0 text-xs branch-${genre.toLowerCase()} cursor-pointer`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre} <span className="ml-1">×</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description" className="text-[#EFEFEF]">
                DESCRIPTION
              </Label>
              <Textarea
                id="project-description"
                placeholder="ENTER_PROJECT_DESCRIPTION"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-32 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">TAGS</Label>
              <Select>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select tags" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {availableTags.map((tag) => (
                    <SelectItem key={tag} value={tag.toLowerCase()} onClick={() => toggleTag(tag)}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className={`border border-[#333333] px-1.5 py-0 text-xs ${getTagColor(tag)} cursor-pointer`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag} <span className="ml-1">×</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-image" className="text-[#EFEFEF]">
                PROJECT_ILLUSTRATION
              </Label>
              <div className="border border-dashed border-[#333333] rounded-md p-4 flex flex-col items-center justify-center h-32">
                {image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Project"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full bg-[#0D0D0D]"
                      onClick={() => setImage(null)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#EFEFEF]">
                    <Upload size={24} className="mb-2" />
                    <p className="text-xs">DRAG_OR_CLICK_TO_UPLOAD</p>
                    <input
                      type="file"
                      id="project-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => document.getElementById("project-image")?.click()}
                    >
                      BROWSE_FILES
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]" onClick={handleSave}>
              CREATE_PROJECT
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

