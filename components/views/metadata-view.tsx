"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Save, Pencil, X } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function MetadataView() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedTagSection, setSelectedTagSection] = useState<string | null>(null)
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("#00A3FF")

  // Données fictives pour la démo
  const tags = {
    GENRE: ["ELECTRONIC", "AMBIENT", "EXPERIMENTAL"],
    INSTRUMENTS: ["SYNTH", "BASS", "DRUMS", "VOCALS"],
    GENERAL: ["WORK_IN_PROGRESS", "PRIORITY", "COLLAB", "REMIX"],
  }

  // Fonction pour obtenir la classe de couleur pour un tag
  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      ELECTRONIC: "bg-[#00A3FF] text-white",
      AMBIENT: "bg-[#00FF85] text-black",
      EXPERIMENTAL: "bg-[#8000FF] text-white",
      SYNTH: "bg-[#FF0080] text-white",
      BASS: "bg-[#FFB800] text-black",
      DRUMS: "bg-[#FF3D00] text-white",
      VOCALS: "bg-[#00BCD4] text-black",
      WORK_IN_PROGRESS: "bg-[#FFB800] text-black",
      PRIORITY: "bg-[#FF3D00] text-white",
      COLLAB: "bg-[#00A3FF] text-white",
      REMIX: "bg-[#8000FF] text-white",
    }

    return tagColors[tag] || "bg-[#EFEFEF] text-black"
  }

  const handleAddTag = (section: string) => {
    if (newTagName.trim() === "") return

    // Logique pour ajouter un nouveau tag
    setNewTagName("")
    setSelectedTagSection(null)
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">TAGS_SYS</h1>
          <p className="text-[#EFEFEF]">MANAGE_PROJECT_TAGS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" /> SAVE_CHANGES
              </>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" /> EDIT_TAGS
              </>
            )}
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="cube" />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
        <div className="space-y-6">
          {/* Section GENRE */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-[#EFEFEF] text-lg">GENRE</Label>
              {isEditing && (
                <Popover
                  open={selectedTagSection === "GENRE"}
                  onOpenChange={(open) => (open ? setSelectedTagSection("GENRE") : setSelectedTagSection(null))}
                >
                  <PopoverTrigger asChild>
                    <Button className="bg-[#1e1e1e] border border-[#333333] hover:bg-[#2e2e2e] text-[#FFFFFF] h-8 w-8 p-0">
                      <Plus size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>TAG_NAME</Label>
                        <Input
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                          placeholder="Enter tag name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>TAG_COLOR</Label>
                        <div className="flex gap-2">
                          {["#00A3FF", "#00FF85", "#8000FF", "#FF0080", "#FFB800", "#FF3D00"].map((color) => (
                            <div
                              key={color}
                              className={`w-8 h-8 rounded-full cursor-pointer ${newTagColor === color ? "ring-2 ring-white" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setNewTagColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
                        onClick={() => handleAddTag("GENRE")}
                      >
                        ADD_TAG
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-2 border border-[#333333] rounded-md min-h-[60px]">
              {tags.GENRE.map((tag, index) => (
                <Badge key={index} className={`${getTagColor(tag)} ${isEditing ? "pr-1" : ""}`}>
                  {tag}
                  {isEditing && (
                    <button className="ml-1 hover:text-white">
                      <X size={12} />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Section INSTRUMENTS */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-[#EFEFEF] text-lg">INSTRUMENTS</Label>
              {isEditing && (
                <Popover
                  open={selectedTagSection === "INSTRUMENTS"}
                  onOpenChange={(open) => (open ? setSelectedTagSection("INSTRUMENTS") : setSelectedTagSection(null))}
                >
                  <PopoverTrigger asChild>
                    <Button className="bg-[#1e1e1e] border border-[#333333] hover:bg-[#2e2e2e] text-[#FFFFFF] h-8 w-8 p-0">
                      <Plus size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>TAG_NAME</Label>
                        <Input
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                          placeholder="Enter tag name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>TAG_COLOR</Label>
                        <div className="flex gap-2">
                          {["#00A3FF", "#00FF85", "#8000FF", "#FF0080", "#FFB800", "#FF3D00"].map((color) => (
                            <div
                              key={color}
                              className={`w-8 h-8 rounded-full cursor-pointer ${newTagColor === color ? "ring-2 ring-white" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setNewTagColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
                        onClick={() => handleAddTag("INSTRUMENTS")}
                      >
                        ADD_TAG
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-2 border border-[#333333] rounded-md min-h-[60px]">
              {tags.INSTRUMENTS.map((tag, index) => (
                <Badge key={index} className={`${getTagColor(tag)} ${isEditing ? "pr-1" : ""}`}>
                  {tag}
                  {isEditing && (
                    <button className="ml-1 hover:text-white">
                      <X size={12} />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>

          {/* Section GENERAL */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-[#EFEFEF] text-lg">GENERAL</Label>
              {isEditing && (
                <Popover
                  open={selectedTagSection === "GENERAL"}
                  onOpenChange={(open) => (open ? setSelectedTagSection("GENERAL") : setSelectedTagSection(null))}
                >
                  <PopoverTrigger asChild>
                    <Button className="bg-[#1e1e1e] border border-[#333333] hover:bg-[#2e2e2e] text-[#FFFFFF] h-8 w-8 p-0">
                      <Plus size={16} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>TAG_NAME</Label>
                        <Input
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                          placeholder="Enter tag name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>TAG_COLOR</Label>
                        <div className="flex gap-2">
                          {["#00A3FF", "#00FF85", "#8000FF", "#FF0080", "#FFB800", "#FF3D00"].map((color) => (
                            <div
                              key={color}
                              className={`w-8 h-8 rounded-full cursor-pointer ${newTagColor === color ? "ring-2 ring-white" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setNewTagColor(color)}
                            />
                          ))}
                        </div>
                      </div>
                      <Button
                        className="w-full bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
                        onClick={() => handleAddTag("GENERAL")}
                      >
                        ADD_TAG
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-2 border border-[#333333] rounded-md min-h-[60px]">
              {tags.GENERAL.map((tag, index) => (
                <Badge key={index} className={`${getTagColor(tag)} ${isEditing ? "pr-1" : ""}`}>
                  {tag}
                  {isEditing && (
                    <button className="ml-1 hover:text-white">
                      <X size={12} />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

