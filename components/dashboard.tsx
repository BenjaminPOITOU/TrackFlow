"use client"

import { AudioPlayer } from "@/components/audio-player"
import { ProjectCard } from "@/components/project-card"
import { CompositionItem } from "@/components/composition-item"
import { AnnotationItem } from "@/components/annotation-item"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { NewProjectModal } from "@/components/modals/new-project-modal"

export function Dashboard() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  // Données fictives pour la démo
  const recentProjects = [
    { id: 1, title: "ALBUM_CONCEPT", status: "IN_PROGRESS", tags: ["ELECTRONIC", "AMBIENT"], lastUpdated: "2H_AGO" },
    { id: 2, title: "EP_COLLAB", status: "PENDING", tags: ["JAZZ", "FUSION"], lastUpdated: "1D_AGO" },
    { id: 3, title: "SINGLE_RELEASE", status: "COMPLETED", tags: ["POP", "VOCAL"], lastUpdated: "3D_AGO" },
    { id: 4, title: "REMIX_PACK", status: "IN_PROGRESS", tags: ["HOUSE", "TECHNO"], lastUpdated: "5D_AGO" },
  ]

  const recentCompositions = [
    { id: 1, title: "INTRO_MASTER", branch: "main", duration: "3:42", date: "24/03/2025" },
    { id: 2, title: "VERSE_EXP", branch: "dev", duration: "2:18", date: "23/03/2025" },
    { id: 3, title: "BRIDGE_SECTION", branch: "feature/vocals", duration: "1:56", date: "22/03/2025" },
  ]

  const recentAnnotations = [
    {
      id: 1,
      type: "FEEDBACK",
      timeMarker: "1:24",
      author: "COLLAB_1",
      content: "INCREASE_BASS_LEVEL",
      status: "PENDING",
    },
    { id: 2, type: "IDEA", timeMarker: "2:36", author: "YOU", content: "ADD_ATMOSPHERIC_SYNTH", status: "IN_PROGRESS" },
    { id: 3, type: "FIX", timeMarker: "0:58", author: "COLLAB_2", content: "FIX_DRUM_TIMING", status: "RESOLVED" },
  ]

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">DASHBOARD_SYS</h1>
          <p className="text-[#EFEFEF]">WELCOME_TO_CREATIVE_SPACE</p>
        </div>
        <Button
          className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF]"
          onClick={() => setShowNewProjectModal(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> NEW_PROJECT
        </Button>
      </div>

      {/* Lecteur audio */}
      <AudioPlayer />

      {/* Projets récents */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold glow-text">RECENT_PROJECTS</h2>
          <div className="flex items-center gap-2">
            <div className="text-xs text-[#EFEFEF]">{Math.floor(Math.random() * 9000) + 1000}</div>
            <Button variant="outline" className="text-xs border-[#FFFFFF] bg-transparent hover:bg-[#1e1e1e]">
              VIEW_ALL
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Compositions récentes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold glow-text">RECENT_COMPOSITIONS</h2>
          <div className="flex items-center gap-2">
            <div className="text-xs text-[#EFEFEF]">{Math.floor(Math.random() * 9000) + 1000}</div>
            <Button variant="outline" className="text-xs border-[#FFFFFF] bg-transparent hover:bg-[#1e1e1e]">
              VIEW_ALL
            </Button>
          </div>
        </div>
        <div className="bg-black border border-[#333333] rounded-lg overflow-hidden">
          {recentCompositions.map((composition) => (
            <CompositionItem key={composition.id} composition={composition} />
          ))}
        </div>
      </div>

      {/* Annotations récentes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold glow-text">RECENT_ANNOTATIONS</h2>
          <div className="flex items-center gap-2">
            <div className="text-xs text-[#EFEFEF]">{Math.floor(Math.random() * 9000) + 1000}</div>
            <Button variant="outline" className="text-xs border-[#FFFFFF] bg-transparent hover:bg-[#1e1e1e]">
              VIEW_ALL
            </Button>
          </div>
        </div>
        <div className="bg-black border border-[#333333] rounded-lg overflow-hidden">
          {recentAnnotations.map((annotation) => (
            <AnnotationItem key={annotation.id} annotation={annotation} />
          ))}
        </div>
      </div>
      {showNewProjectModal && <NewProjectModal onClose={() => setShowNewProjectModal(false)} />}
    </div>
  )
}

