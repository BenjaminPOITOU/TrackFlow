"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Plus, X } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ExportView() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedComposition, setSelectedComposition] = useState<string | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [selectedTracks, setSelectedTracks] = useState<string[]>([])

  // Données fictives
  const projects = [
    { id: "album-concept", title: "ALBUM_CONCEPT" },
    { id: "ep-collab", title: "EP_COLLAB" },
    { id: "single-release", title: "SINGLE_RELEASE" },
  ]

  const compositions = {
    "album-concept": [
      { id: "bridge-section", title: "BRIDGE_SECTION" },
      { id: "intro-master", title: "INTRO_MASTER" },
      { id: "verse-exp", title: "VERSE_EXP" },
    ],
    "ep-collab": [
      { id: "main-theme", title: "MAIN_THEME" },
      { id: "outro-ambient", title: "OUTRO_AMBIENT" },
    ],
    "single-release": [{ id: "vocal-track", title: "VOCAL_TRACK" }],
  }

  const branches = {
    "bridge-section": ["main", "feature/vocals", "feature/drums"],
    "intro-master": ["main", "dev"],
    "verse-exp": ["main"],
    "main-theme": ["main", "feature/synths"],
    "outro-ambient": ["main"],
    "vocal-track": ["main", "feature/effects"],
  }

  const versions = {
    main: ["V1.0", "V1.1", "V2.0"],
    "feature/vocals": ["V1.0", "V2.0"],
    "feature/drums": ["V1.0"],
    dev: ["V1.0", "V1.1"],
    "feature/synths": ["V1.0"],
    "feature/effects": ["V1.0", "V1.1"],
  }

  const tracks = ["DRUMS", "BASS", "SYNTH_LEAD", "SYNTH_PAD", "VOCALS", "GUITAR", "PIANO", "STRINGS", "FX", "MASTER"]

  const toggleTrack = (track: string) => {
    if (selectedTracks.includes(track)) {
      setSelectedTracks(selectedTracks.filter((t) => t !== track))
    } else {
      setSelectedTracks([...selectedTracks, track])
    }
  }

  const resetSelections = () => {
    setSelectedProject(null)
    setSelectedComposition(null)
    setSelectedBranch(null)
    setSelectedVersion(null)
    setSelectedTracks([])
  }

  const handleCardClick = (cardId: string) => {
    if (expandedCard === cardId) {
      setExpandedCard(null)
    } else {
      setExpandedCard(cardId)
      resetSelections()
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">EXPORT_SYS</h1>
          <p className="text-[#EFEFEF]">EXPORT_YOUR_AUDIO_FILES</p>
        </div>
        <div className="w-8 h-8">
          <MiniVisualizer type="grid" />
        </div>
      </div>

      {/* Options d'export */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Audio File */}
        <div
          className={`p-4 border border-[#333333] rounded-lg hover:border-[#FFFFFF] hover:glow-card cursor-pointer transition-all ${expandedCard === "audio" ? "md:col-span-3" : ""}`}
          onClick={() => handleCardClick("audio")}
        >
          {expandedCard === "audio" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">AUDIO_FILE</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedCard(null)
                  }}
                >
                  <X size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>PROJECT</Label>
                  <Select value={selectedProject || ""} onValueChange={setSelectedProject}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>COMPOSITION</Label>
                  <Select
                    value={selectedComposition || ""}
                    onValueChange={setSelectedComposition}
                    disabled={!selectedProject}
                  >
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select composition" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {selectedProject &&
                        compositions[selectedProject as keyof typeof compositions]?.map((comp) => (
                          <SelectItem key={comp.id} value={comp.id}>
                            {comp.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>BRANCH</Label>
                  <Select
                    value={selectedBranch || ""}
                    onValueChange={setSelectedBranch}
                    disabled={!selectedComposition}
                  >
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {selectedComposition &&
                        branches[selectedComposition as keyof typeof branches]?.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>VERSION</Label>
                  <Select value={selectedVersion || ""} onValueChange={setSelectedVersion} disabled={!selectedBranch}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {selectedBranch &&
                        versions[selectedBranch as keyof typeof versions]?.map((version) => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>FORMAT</Label>
                <div className="flex gap-2">
                  <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]">WAV</Button>
                  <Button
                    variant="outline"
                    className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                  >
                    MP3
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                  >
                    FLAC
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]" disabled={!selectedVersion}>
                  <Download size={16} className="mr-2" /> EXPORT_AUDIO
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-medium mb-2">AUDIO_FILE</h3>
              <p className="text-xs text-[#EFEFEF]">WAV, MP3, FLAC</p>
            </>
          )}
        </div>

        {/* Project File */}
        <div
          className={`p-4 border border-[#333333] rounded-lg hover:border-[#FFFFFF] hover:glow-card cursor-pointer transition-all ${expandedCard === "project" ? "md:col-span-3" : ""}`}
          onClick={() => handleCardClick("project")}
        >
          {expandedCard === "project" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">PROJECT_FILE</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedCard(null)
                  }}
                >
                  <X size={16} />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>PROJECT</Label>
                <Select value={selectedProject || ""} onValueChange={setSelectedProject}>
                  <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>FORMAT</Label>
                <div className="flex gap-2">
                  <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]">SOUNDFLOW</Button>
                  <Button
                    variant="outline"
                    className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                  >
                    XML
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]" disabled={!selectedProject}>
                  <Download size={16} className="mr-2" /> EXPORT_PROJECT
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-medium mb-2">PROJECT_FILE</h3>
              <p className="text-xs text-[#EFEFEF]">SOUNDFLOW, XML</p>
            </>
          )}
        </div>

        {/* Stems */}
        <div
          className={`p-4 border border-[#333333] rounded-lg hover:border-[#FFFFFF] hover:glow-card cursor-pointer transition-all ${expandedCard === "stems" ? "md:col-span-3" : ""}`}
          onClick={() => handleCardClick("stems")}
        >
          {expandedCard === "stems" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">STEMS</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedCard(null)
                  }}
                >
                  <X size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>PROJECT</Label>
                  <Select value={selectedProject || ""} onValueChange={setSelectedProject}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>COMPOSITION</Label>
                  <Select
                    value={selectedComposition || ""}
                    onValueChange={setSelectedComposition}
                    disabled={!selectedProject}
                  >
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select composition" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {selectedProject &&
                        compositions[selectedProject as keyof typeof compositions]?.map((comp) => (
                          <SelectItem key={comp.id} value={comp.id}>
                            {comp.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>BRANCH</Label>
                  <Select
                    value={selectedBranch || ""}
                    onValueChange={setSelectedBranch}
                    disabled={!selectedComposition}
                  >
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {selectedComposition &&
                        branches[selectedComposition as keyof typeof branches]?.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>VERSION</Label>
                  <Select value={selectedVersion || ""} onValueChange={setSelectedVersion} disabled={!selectedBranch}>
                    <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                      {selectedBranch &&
                        versions[selectedBranch as keyof typeof versions]?.map((version) => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>TRACKS</Label>
                <div className="flex flex-wrap gap-2">
                  {tracks.map((track) => (
                    <Button
                      key={track}
                      variant={selectedTracks.includes(track) ? "default" : "outline"}
                      className={
                        selectedTracks.includes(track)
                          ? "bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
                          : "border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                      }
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleTrack(track)
                      }}
                    >
                      {track}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
                  disabled={!selectedVersion || selectedTracks.length === 0}
                >
                  <Download size={16} className="mr-2" /> EXPORT_STEMS
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-medium mb-2">STEMS</h3>
              <p className="text-xs text-[#EFEFEF]">MULTI-TRACK</p>
            </>
          )}
        </div>
      </div>

      {/* Paramètres d'export */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4 glow-text-sm">EXPORT_SETTINGS</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="high-quality" defaultChecked />
            <Label htmlFor="high-quality" className="text-[#EFEFEF]">
              HIGH_QUALITY
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="include-metadata" defaultChecked />
            <Label htmlFor="include-metadata" className="text-[#EFEFEF]">
              INCLUDE_METADATA
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="normalize" />
            <Label htmlFor="normalize" className="text-[#EFEFEF]">
              NORMALIZE_AUDIO
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}

