"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Music, Upload } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewCompositionModalProps {
  onClose: () => void
  onSave?: (data: any) => void
  projectGenre?: string
}

export function NewCompositionModal(props: NewCompositionModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("EBAUCHE")
  const [image, setImage] = useState<string | null>(null)

  const [subGenre, setSubGenre] = useState<string>("")
  const projectGenre = props.projectGenre || "ELECTRONIC"

  const statusOptions = ["EBAUCHE", "EN_COURS", "A_FINALISER", "TERMINÉ"]

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

  const { onClose, onSave } = props

  const handleSave = () => {
    if (onSave) {
      onSave({
        title,
        description,
        status,
        projectGenre,
        subGenre,
        image,
      })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
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
            <Music size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold glow-text-sm">NEW_COMPOSITION</h2>
            <p className="text-xs text-[#EFEFEF]">CREATE_YOUR_AUDIO_COMPOSITION</p>
          </div>

          {/* Mini visualiseur dans le coin */}
          <div className="absolute right-12 top-4 w-6 h-6">
            <MiniVisualizer type="wave" />
          </div>
        </div>

        {/* Formulaire */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="composition-title" className="text-[#EFEFEF]">
                COMPOSITION_TITLE
              </Label>
              <Input
                id="composition-title"
                placeholder="ENTER_COMPOSITION_TITLE"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-status" className="text-[#EFEFEF]">
                STATUS
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {statusOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">PROJECT_GENRE</Label>
              <div className="p-3 bg-[#1e1e1e] border border-[#333333] rounded-md text-[#EFEFEF]">{projectGenre}</div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">SUB_GENRE</Label>
              <Select value={subGenre} onValueChange={setSubGenre}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select sub-genre" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectItem value="AMBIENT">AMBIENT</SelectItem>
                  <SelectItem value="TECHNO">TECHNO</SelectItem>
                  <SelectItem value="HOUSE">HOUSE</SelectItem>
                  <SelectItem value="TRANCE">TRANCE</SelectItem>
                  <SelectItem value="DRUM_AND_BASS">DRUM_AND_BASS</SelectItem>
                  <SelectItem value="EXPERIMENTAL">EXPERIMENTAL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="composition-description" className="text-[#EFEFEF]">
                DESCRIPTION
              </Label>
              <Textarea
                id="composition-description"
                placeholder="ENTER_COMPOSITION_DESCRIPTION"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-32 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-image" className="text-[#EFEFEF]">
                COMPOSITION_ILLUSTRATION
              </Label>
              <div className="border border-dashed border-[#333333] rounded-md p-4 flex flex-col items-center justify-center h-32">
                {image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Composition"
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
                      id="composition-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => document.getElementById("composition-image")?.click()}
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
              CREATE_COMPOSITION
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

