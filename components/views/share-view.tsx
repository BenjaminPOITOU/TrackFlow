"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Users, ExternalLink, FileMusic, Music2, GitBranch } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export function ShareView() {
  const [accessLevel, setAccessLevel] = useState("listen-only")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedComposition, setSelectedComposition] = useState<string | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [expirationEnabled, setExpirationEnabled] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)

  // Données fictives pour la démo
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

  const versions = {
    "bridge-section": [
      { id: "v1.0", title: "V1.0", branch: "main" },
      { id: "v1.1", title: "V1.1", branch: "main" },
      { id: "v2.0", title: "V2.0", branch: "feature/vocals" },
      { id: "v2.1", title: "V2.1", branch: "feature/vocals" },
    ],
    "intro-master": [
      { id: "v1.0", title: "V1.0", branch: "main" },
      { id: "v1.1", title: "V1.1", branch: "main" },
    ],
    "verse-exp": [{ id: "v1.0", title: "V1.0", branch: "main" }],
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">SHARE_SYS</h1>
          <p className="text-[#EFEFEF]">SHARE_SPECIFIC_VERSION</p>
        </div>
        <div className="w-8 h-8">
          <MiniVisualizer type="circles" />
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="share-version" className="w-full">
        <TabsList className="bg-[#0D0D0D] border border-[#333333] p-1">
          <TabsTrigger
            value="share-version"
            className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]"
          >
            SHARE_VERSION
          </TabsTrigger>
          <TabsTrigger
            value="shared-with-me"
            className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]"
          >
            SHARED_WITH_ME
          </TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            EXPORT
          </TabsTrigger>
        </TabsList>

        <TabsContent value="share-version" className="mt-4 space-y-6">
          {/* Sélection du projet, composition et version */}
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4 glow-text-sm">SELECT_VERSION_TO_SHARE</h2>

            <div className="space-y-4">
              {/* Sélection du projet */}
              <div className="space-y-2">
                <Label htmlFor="project-select" className="text-[#EFEFEF] flex items-center gap-2">
                  <Music2 size={14} /> PROJECT
                </Label>
                <Select
                  value={selectedProject || ""}
                  onValueChange={(value) => {
                    setSelectedProject(value)
                    setSelectedComposition(null)
                    setSelectedVersion(null)
                  }}
                >
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

              {/* Sélection de la composition */}
              <div className="space-y-2">
                <Label htmlFor="composition-select" className="text-[#EFEFEF] flex items-center gap-2">
                  <FileMusic size={14} /> COMPOSITION
                </Label>
                <Select
                  value={selectedComposition || ""}
                  onValueChange={(value) => {
                    setSelectedComposition(value)
                    setSelectedVersion(null)
                  }}
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

              {/* Sélection de la version */}
              <div className="space-y-2">
                <Label htmlFor="version-select" className="text-[#EFEFEF] flex items-center gap-2">
                  <GitBranch size={14} /> VERSION
                </Label>
                <Select
                  value={selectedVersion || ""}
                  onValueChange={(value) => {
                    setSelectedVersion(value)
                  }}
                  disabled={!selectedComposition}
                >
                  <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    <SelectValue placeholder="Select version" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    {selectedComposition &&
                      versions[selectedComposition as keyof typeof versions]?.map((ver) => (
                        <SelectItem key={ver.id} value={ver.id}>
                          {ver.title} ({ver.branch})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Options de partage */}
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4 glow-text-sm">SHARE_OPTIONS</h2>

            <div className="space-y-6">
              {/* Niveau d'accès */}
              <div className="space-y-2">
                <Label className="text-[#EFEFEF]">VERSION_ACCESS_LEVEL</Label>
                <RadioGroup
                  defaultValue="listen-only"
                  className="flex flex-col space-y-2"
                  value={accessLevel}
                  onValueChange={setAccessLevel}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="listen-only" id="listen-only" />
                    <Label htmlFor="listen-only" className="flex items-center gap-2">
                      <Globe size={16} />
                      <span>LISTEN_ONLY</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="listen-annotation" id="listen-annotation" />
                    <Label htmlFor="listen-annotation" className="flex items-center gap-2">
                      <Users size={16} />
                      <span>LISTEN_AND_ANNOTATION</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Options supplémentaires */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="expiration" className="text-[#EFEFEF]">
                    SET_EXPIRATION
                  </Label>
                  <Switch id="expiration" checked={expirationEnabled} onCheckedChange={setExpirationEnabled} />
                </div>

                {expirationEnabled && (
                  <div className="p-2 border border-[#333333] rounded-md">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                        >
                          {expirationDate ? format(expirationDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-[#0D0D0D] border-[#333333]">
                        <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Méthodes de partage */}
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4 glow-text-sm">SHARE_WITH</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="share-email" className="text-[#EFEFEF]">
                  LISTENER_EMAIL
                </Label>
                <div className="flex">
                  <Input
                    id="share-email"
                    placeholder="Enter email address"
                    className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF] rounded-r-none"
                  />
                  <Button className="bg-[#1e1e1e] border border-[#333333] hover:bg-[#2e2e2e] text-[#FFFFFF] rounded-l-none">
                    INVITE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="shared-with-me" className="mt-4">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4 glow-text-sm">VERSIONS_SHARED_WITH_YOU</h2>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="p-4 border border-[#333333] rounded-lg hover:bg-[#1e1e1e] transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">SHARED_VERSION_{item}</h3>
                      <p className="text-xs text-[#EFEFEF] mt-1">
                        PROJECT: PROJECT_{item} • COMPOSITION: COMPOSITION_{item} • VERSION: V{item}.0
                      </p>
                      <p className="text-xs text-[#EFEFEF] mt-1">SHARED_BY: COLLABORATOR_{item}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                    >
                      <ExternalLink size={14} className="mr-1" /> OPEN
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="text-xs px-2 py-0.5 bg-[#1e1e1e] rounded">ACCESS: LISTEN_ONLY</div>
                    <div className="text-xs px-2 py-0.5 bg-[#1e1e1e] rounded">SHARED: 5D_AGO</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="export" className="mt-4">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4 glow-text-sm">EXPORT_OPTIONS</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-[#333333] rounded-lg hover:border-[#FFFFFF] hover:glow-card cursor-pointer transition-all">
                  <h3 className="font-medium mb-2">AUDIO_FILE</h3>
                  <p className="text-xs text-[#EFEFEF]">WAV, MP3, FLAC</p>
                </div>
                <div className="p-4 border border-[#333333] rounded-lg hover:border-[#FFFFFF] hover:glow-card cursor-pointer transition-all">
                  <h3 className="font-medium mb-2">PROJECT_FILE</h3>
                  <p className="text-xs text-[#EFEFEF]">SOUNDFLOW, XML</p>
                </div>
                <div className="p-4 border border-[#333333] rounded-lg hover:border-[#FFFFFF] hover:glow-card cursor-pointer transition-all">
                  <h3 className="font-medium mb-2">STEMS</h3>
                  <p className="text-xs text-[#EFEFEF]">MULTI-TRACK</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#EFEFEF]">EXPORT_SETTINGS</Label>
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

              <div className="flex justify-end">
                <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]">EXPORT_NOW</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

