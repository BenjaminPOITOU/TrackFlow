"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Plus, Filter, SortDesc, Grid, List } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { NewProjectModal } from "@/components/modals/new-project-modal"

export function ProjectsView() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  // Données fictives pour la démo
  const projects = [
    { id: 1, title: "ALBUM_CONCEPT", status: "IN_PROGRESS", tags: ["ELECTRONIC", "AMBIENT"], lastUpdated: "2H_AGO" },
    { id: 2, title: "EP_COLLAB", status: "PENDING", tags: ["JAZZ", "FUSION"], lastUpdated: "1D_AGO" },
    { id: 3, title: "SINGLE_RELEASE", status: "COMPLETED", tags: ["POP", "VOCAL"], lastUpdated: "3D_AGO" },
    { id: 4, title: "REMIX_PACK", status: "IN_PROGRESS", tags: ["HOUSE", "TECHNO"], lastUpdated: "5D_AGO" },
    { id: 5, title: "SOUNDTRACK_DEMO", status: "PENDING", tags: ["AMBIENT", "ELECTRONIC"], lastUpdated: "1W_AGO" },
    { id: 6, title: "LIVE_SESSION", status: "COMPLETED", tags: ["JAZZ", "FUSION"], lastUpdated: "2W_AGO" },
    {
      id: 7,
      title: "EXPERIMENTAL_BEATS",
      status: "IN_PROGRESS",
      tags: ["ELECTRONIC", "TECHNO"],
      lastUpdated: "3W_AGO",
    },
    { id: 8, title: "VOCAL_SAMPLES", status: "COMPLETED", tags: ["VOCAL", "POP"], lastUpdated: "1M_AGO" },
  ]

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">PROJECTS_SYS</h1>
          <p className="text-[#EFEFEF]">MANAGE_YOUR_CREATIVE_PROJECTS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button"
            onClick={() => setShowNewProjectModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> NEW_PROJECT
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="cube" />
          </div>
        </div>
      </div>

      {/* Filtres et contrôles */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-[#0D0D0D] border border-[#333333] rounded-lg">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]">
            <Filter className="mr-2 h-4 w-4" /> FILTER
          </Button>
          <Button variant="outline" className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]">
            <SortDesc className="mr-2 h-4 w-4" /> SORT
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#EFEFEF]">VIEW_MODE:</span>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            className={`h-8 w-8 rounded-md ${viewMode === "grid" ? "bg-[#FFFFFF] text-[#0D0D0D]" : "border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={16} />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className={`h-8 w-8 rounded-md ${viewMode === "list" ? "bg-[#FFFFFF] text-[#0D0D0D]" : "border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"}`}
            onClick={() => setViewMode("list")}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {/* Liste des projets */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "space-y-4"}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button variant="outline" className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]">
          PREV
        </Button>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              size="sm"
              className={
                page === 1
                  ? "bg-[#FFFFFF] text-[#0D0D0D]"
                  : "border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
              }
            >
              {page}
            </Button>
          ))}
        </div>
        <Button variant="outline" className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]">
          NEXT
        </Button>
      </div>

      {/* Modal pour nouveau projet */}
      {showNewProjectModal && <NewProjectModal onClose={() => setShowNewProjectModal(false)} />}
    </div>
  )
}

