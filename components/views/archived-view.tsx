"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Archive, RotateCcw, Trash2, Search, Filter, Calendar, Clock } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"

interface ArchivedProject {
  id: number
  title: string
  status: string
  tags: string[]
  lastUpdated: string
  description?: string
  createdAt?: string
}

export function ArchivedView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

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
    },
    {
      id: 5,
      title: "ABANDONED_COLLAB",
      status: "PENDING",
      tags: ["JAZZ", "FUSION"],
      lastUpdated: "6M_AGO",
      description: "COLLABORATION_PROJECT_WITH_EXTERNAL_ARTISTS",
      createdAt: "03/06/2024",
    },
    {
      id: 6,
      title: "EXPERIMENTAL_TRACKS",
      status: "COMPLETED",
      tags: ["ELECTRONIC", "EXPERIMENTAL"],
      lastUpdated: "1Y_AGO",
      description: "COLLECTION_OF_EXPERIMENTAL_SOUND_DESIGNS",
      createdAt: "22/03/2024",
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
        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
            <div className="col-span-3">PROJECT</div>
            <div className="col-span-4">DESCRIPTION</div>
            <div className="col-span-2">TAGS</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors"
            >
              <div className="col-span-3">
                <div className="font-medium">{project.title}</div>
                <div className="flex items-center text-xs text-[#666666] mt-1">
                  <Calendar size={12} className="mr-1" /> {project.createdAt}
                  <Clock size={12} className="ml-2 mr-1" /> {project.lastUpdated}
                </div>
              </div>
              <div className="col-span-4 text-[#EFEFEF]">{project.description}</div>
              <div className="col-span-2 flex flex-wrap gap-1">
                {project.tags.map((tag, index) => (
                  <span key={index} className={`text-xs ${getTagColor(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="col-span-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    project.status === "COMPLETED" ? "bg-[#00FF85]/20 text-[#00FF85]" : "bg-[#FFB800]/20 text-[#FFB800]"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs py-1 h-8">
                  <RotateCcw size={14} className="mr-1" /> RESTORE
                </Button>
                <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs py-1 h-8">
                  <Trash2 size={14} className="mr-1" /> DELETE
                </Button>
              </div>
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
    </div>
  )
}

