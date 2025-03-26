"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Music2, Upload } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Textarea } from "@/components/ui/textarea"
import { Tag } from "@/components/ui/tag"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewProjectDialogProps {
  onClose: () => void
  onSave?: (data: any) => void
}

export function NewProjectDialog({ onClose, onSave }: NewProjectDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [image, setImage] = useState<string | null>(null)

  const availableGenres = [
    "ELECTRONIC",
    "AMBIENT",
    "JAZZ",
    "FUSION",
    "POP",
    "ROCK",
    "CLASSICAL",
    "HIP-HOP",
    "R&B",
    "FOLK",
    "COUNTRY",
    "METAL",
  ]

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
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
        image,
      })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg w-full max-w-2xl p-6 relative">
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
              <Label className="text-[#EFEFEF]">PROJECT_GENRES</Label>
              <Select>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {availableGenres.map((genre) => (
                    <SelectItem key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGenres.map((genre) => (
                  <Tag
                    key={genre}
                    variant={genre.toLowerCase() as any}
                    className="cursor-pointer"
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre} <span className="ml-1">×</span>
                  </Tag>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Button
              className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
              onClick={handleSave}
              disabled={!title.trim()}
            >
              CREATE_PROJECT
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

