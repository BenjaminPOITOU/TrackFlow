"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Save, Tag, Music, Info, Clock, Calendar, User, Hash, Pencil, X } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function MetadataView() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedTagSection, setSelectedTagSection] = useState<string | null>(null)
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("#00A3FF")

  // Données fictives pour la démo
  const projectMetadata = {
    title: "ALBUM_CONCEPT",
    artist: "USER_STUDIO",
    genre: "ELECTRONIC",
    subgenre: "AMBIENT",
    bpm: "124",
    key: "C MINOR",
    duration: "42:18",
    created: "15/03/2025",
    modified: "24/03/2025",
    tags: {
      GENRE: ["ELECTRONIC", "AMBIENT", "EXPERIMENTAL"],
      INSTRUMENTS: ["SYNTH", "BASS", "DRUMS", "VOCALS"],
    },
    description: "CONCEPT_ALBUM_EXPLORING_DIGITAL_LANDSCAPES_AND_SYNTHETIC_TEXTURES",
    collaborators: ["COLLAB_1", "COLLAB_2", "COLLAB_3"],
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
          <h1 className="text-2xl font-bold tracking-tight glow-text">METADATA_SYS</h1>
          <p className="text-[#EFEFEF]">MANAGE_PROJECT_INFORMATION</p>
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
                <Pencil className="mr-2 h-4 w-4" /> EDIT_METADATA
              </>
            )}
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="cube" />
          </div>
        </div>
      </div>

      {/* Sélection de projet */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-[#0D0D0D] border border-[#333333] rounded-lg">
        <div className="space-y-2 w-full max-w-xs">
          <Label htmlFor="project-select" className="text-[#EFEFEF]">
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
      </div>

      {/* Contenu principal */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="bg-[#0D0D0D] border border-[#333333] p-1">
          <TabsTrigger value="basic" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            BASIC_INFO
          </TabsTrigger>
          <TabsTrigger value="tags" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            TAGS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-4">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#EFEFEF] flex items-center gap-2">
                    <Music size={14} /> TITLE
                  </Label>
                  {isEditing ? (
                    <Input
                      id="title"
                      defaultValue={projectMetadata.title}
                      className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                    />
                  ) : (
                    <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e]">
                      {projectMetadata.title}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artist" className="text-[#EFEFEF] flex items-center gap-2">
                    <User size={14} /> ARTIST
                  </Label>
                  {isEditing ? (
                    <Input
                      id="artist"
                      defaultValue={projectMetadata.artist}
                      className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                    />
                  ) : (
                    <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e]">
                      {projectMetadata.artist}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre" className="text-[#EFEFEF] flex items-center gap-2">
                    <Tag size={14} /> GENRE
                  </Label>
                  {isEditing ? (
                    <Select defaultValue={projectMetadata.genre.toLowerCase()}>
                      <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                        <SelectItem value="electronic">ELECTRONIC</SelectItem>
                        <SelectItem value="ambient">AMBIENT</SelectItem>
                        <SelectItem value="jazz">JAZZ</SelectItem>
                        <SelectItem value="pop">POP</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e]">
                      {projectMetadata.genre}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#EFEFEF] flex items-center gap-2">
                    <Info size={14} /> DESCRIPTION
                  </Label>
                  {isEditing ? (
                    <textarea
                      id="description"
                      defaultValue={projectMetadata.description}
                      className="w-full h-24 px-3 py-2 bg-[#0D0D0D] border border-[#333333] rounded-md text-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]"
                    />
                  ) : (
                    <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e] min-h-[6rem]">
                      {projectMetadata.description}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bpm" className="text-[#EFEFEF] flex items-center gap-2">
                    <Clock size={14} /> BPM
                  </Label>
                  {isEditing ? (
                    <Input
                      id="bpm"
                      defaultValue={projectMetadata.bpm}
                      className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                    />
                  ) : (
                    <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e]">
                      {projectMetadata.bpm}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key" className="text-[#EFEFEF] flex items-center gap-2">
                    <Hash size={14} /> KEY
                  </Label>
                  {isEditing ? (
                    <Input
                      id="key"
                      defaultValue={projectMetadata.key}
                      className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                    />
                  ) : (
                    <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e]">
                      {projectMetadata.key}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-[#EFEFEF] flex items-center gap-2">
                    <Clock size={14} /> DURATION
                  </Label>
                  <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e]">
                    {projectMetadata.duration}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dates" className="text-[#EFEFEF] flex items-center gap-2">
                    <Calendar size={14} /> DATES
                  </Label>
                  <div className="p-2 border border-[#333333] rounded-md text-[#FFFFFF] bg-[#1e1e1e]">
                    <div className="flex justify-between">
                      <span className="text-[#EFEFEF]">CREATED:</span>
                      <span>{projectMetadata.created}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[#EFEFEF]">MODIFIED:</span>
                      <span>{projectMetadata.modified}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tags" className="mt-4">
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
                  {projectMetadata.tags.GENRE.map((tag, index) => (
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
                      onOpenChange={(open) =>
                        open ? setSelectedTagSection("INSTRUMENTS") : setSelectedTagSection(null)
                      }
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
                  {projectMetadata.tags.INSTRUMENTS.map((tag, index) => (
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

