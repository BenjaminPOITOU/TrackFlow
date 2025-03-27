"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Archive, RotateCcw, Trash2, Search, Filter, ChevronDown, ChevronRight, FileMusic } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ArchivedComposition {
  id: number
  title: string
  versions: number
  branches: number
  subGenre: string
  lastUpdated: string
}

interface ArchivedProject {
  id: number
  title: string
  status: string
  tags: string[]
  lastUpdated: string
  description?: string
  createdAt?: string
  compositions: ArchivedComposition[]
}

export function ArchivedView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedProjects, setExpandedProjects] = useState<number[]>([])
  const [projectToDelete, setProjectToDelete] = useState<ArchivedProject | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Données fictives pour les projets archivés
  const archivedProjects: ArchivedProject[] = [
    {
      id: 4,
      title: "OLD_ALBUM_DEMO",
      status: "COMPLETED",
      tags: ["ELECTRONIC", "AMBIENT"],
      lastUpdated: "3M_AGO",
      description: "EARLY_CONCEPT_FOR_ALBUM_PROJECT",
      createdAt: "15/09/2024",
      compositions: [
        {
          id: 401,
          title: "INTRO_SEQUENCE",
          versions: 3,
          branches: 1,
          subGenre: "AMBIENT",
          lastUpdated: "3M_AGO",
        },
        {
          id: 402,
          title: "MAIN_THEME",
          versions: 5,
          branches: 2,
          subGenre: "ELECTRONIC",
          lastUpdated: "3M_AGO",
        },
      ],
    },
    {
      id: 5,
      title: "ABANDONED_COLLAB",
      status: "PENDING",
      tags: ["JAZZ", "FUSION"],
      lastUpdated: "6M_AGO",
      description: "COLLABORATION_PROJECT_WITH_EXTERNAL_ARTISTS",
      createdAt: "03/06/2024",
      compositions: [
        {
          id: 501,
          title: "JAZZ_INTRO",
          versions: 2,
          branches: 1,
          subGenre: "JAZZ",
          lastUpdated: "6M_AGO",
        },
        {
          id: 502,
          title: "FUSION_BRIDGE",
          versions: 4,
          branches: 2,
          subGenre: "FUSION",
          lastUpdated: "6M_AGO",
        },
      ],
    },
    {
      id: 6,
      title: "EXPERIMENTAL_TRACKS",
      status: "COMPLETED",
      tags: ["ELECTRONIC", "EXPERIMENTAL"],
      lastUpdated: "1Y_AGO",
      description: "COLLECTION_OF_EXPERIMENTAL_SOUND_DESIGNS",
      createdAt: "22/03/2024",
      compositions: [
        {
          id: 601,
          title: "NOISE_EXPERIMENT",
          versions: 3,
          branches: 1,
          subGenre: "EXPERIMENTAL",
          lastUpdated: "1Y_AGO",
        },
        {
          id: 602,
          title: "GLITCH_SEQUENCE",
          versions: 2,
          branches: 1,
          subGenre: "ELECTRONIC",
          lastUpdated: "1Y_AGO",
        },
        {
          id: 603,
          title: "AMBIENT_TEXTURE",
          versions: 4,
          branches: 2,
          subGenre: "AMBIENT",
          lastUpdated: "1Y_AGO",
        },
      ],
    },
  ]

  const availableTags = ["ELECTRONIC", "AMBIENT", "JAZZ", "FUSION", "EXPERIMENTAL"]

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const toggleProject = (projectId: number) => {
    if (expandedProjects.includes(projectId)) {
      setExpandedProjects(expandedProjects.filter((id) => id !== projectId))
    } else {
      setExpandedProjects([...expandedProjects, projectId])
    }
  }

  const filteredProjects = archivedProjects.filter((project) => {
    // Filtrer par recherche
    const matchesSearch = searchQuery === "" || project.title.toLowerCase().includes(searchQuery.toLowerCase())

    // Filtrer par tags
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  // Fonction pour obtenir la classe de couleur pour un tag
  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      ELECTRONIC: "text-[#00A3FF]",
      AMBIENT: "text-[#00FF85]",
      JAZZ: "text-[#FFB800]",
      FUSION: "text-[#FF0080]",
      EXPERIMENTAL: "text-[#8000FF]",
    }

    return tagColors[tag] || "text-[#EFEFEF]"
  }

  const handleDeleteProject = () => {
    if (projectToDelete) {
      console.log(`Deleting project: ${projectToDelete.id}`)
      // Ici, vous implémenteriez la logique réelle de suppression
      setShowDeleteDialog(false)
      setProjectToDelete(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">ARCHIVED_PROJECTS</h1>
          <p className="text-[#EFEFEF]">VIEW_AND_MANAGE_ARCHIVED_PROJECTS</p>
        </div>
        <div className="w-8 h-8">
          <MiniVisualizer type="grid" />
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={18} />
          <Input
            placeholder="SEARCH_ARCHIVED_PROJECTS"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-[#EFEFEF]" />
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <div
                key={tag}
                className={`border border-[#333333] px-1.5 py-0 text-xs branch-${tag.toLowerCase()} cursor-pointer ${
                  selectedTags.includes(tag) ? "ring-2 ring-white" : ""
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des projets archivés */}
      {filteredProjects.length > 0 ? (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#1e1e1e]"
                onClick={() => toggleProject(project.id)}
              >
                <div className="flex items-center gap-3">
                  {expandedProjects.includes(project.id) ? (
                    <ChevronDown size={18} className="text-[#EFEFEF]" />
                  ) : (
                    <ChevronRight size={18} className="text-[#EFEFEF]" />
                  )}
                  <div>
                    <h3 className="font-medium glow-text-sm">{project.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#EFEFEF]">
                      <span>{project.createdAt}</span>
                      <span>•</span>
                      <span>{project.compositions.length} COMPOSITIONS</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className={getTagColor(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs py-1 h-8">
                      <RotateCcw size={14} className="mr-1" /> RESTORE
                    </Button>
                    <Button
                      className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs py-1 h-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        setProjectToDelete(project)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <Trash2 size={14} className="mr-1" /> DELETE
                    </Button>
                  </div>
                </div>
              </div>

              {expandedProjects.includes(project.id) && (
                <div className="border-t border-[#333333] p-4">
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-1">DESCRIPTION</h4>
                    <p className="text-[#EFEFEF] text-sm">{project.description}</p>
                  </div>

                  <h4 className="text-sm font-medium mb-2">COMPOSITIONS</h4>
                  <div className="bg-[#0a0a0a] border border-[#333333] rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-3 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
                      <div className="col-span-4">TITLE</div>
                      <div className="col-span-2">VERSIONS</div>
                      <div className="col-span-2">BRANCHES</div>
                      <div className="col-span-2">SUB_GENRE</div>
                      <div className="col-span-2">LAST_UPDATED</div>
                    </div>

                    {project.compositions.map((composition) => (
                      <div
                        key={composition.id}
                        className="grid grid-cols-12 gap-4 p-3 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors"
                      >
                        <div className="col-span-4 flex items-center gap-2">
                          <FileMusic size={14} className="text-[#EFEFEF]" />
                          <span className="font-medium text-sm">{composition.title}</span>
                        </div>
                        <div className="col-span-2 flex items-center text-xs text-[#EFEFEF]">
                          <span>{composition.versions} VERSIONS</span>
                        </div>
                        <div className="col-span-2 flex items-center text-xs text-[#EFEFEF]">
                          <span>{composition.branches} BRANCHES</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <div className="border border-[#333333] px-1.5 py-0 text-xs tag-ambient">
                            {composition.subGenre}
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center text-xs text-[#EFEFEF]">
                          {composition.lastUpdated}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-[#666666]">
          <Archive size={48} className="mb-4" />
          <h3 className="text-xl font-medium mb-2">NO_ARCHIVED_PROJECTS_FOUND</h3>
          <p>ADJUST_FILTERS_OR_SEARCH_CRITERIA</p>
        </div>
      )}

      {/* Dialogue de confirmation de suppression */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-[#0D0D0D] border border-[#333333] text-[#EFEFEF]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight glow-text">CONFIRM_DELETE</DialogTitle>
            <DialogDescription className="text-[#EFEFEF]">
              Are you sure you want to permanently delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              className="border-[#333333] text-[#EFEFEF]"
              onClick={() => setShowDeleteDialog(false)}
            >
              CANCEL
            </Button>
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white" onClick={handleDeleteProject}>
              DELETE_PERMANENTLY
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

