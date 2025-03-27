"use client"

import type React from "react"

import { AudioPlayer } from "@/components/audio-player"
import { ProjectCard } from "@/components/project-card"
import { CompositionItem } from "@/components/composition-item"
import { AnnotationItem } from "@/components/annotation-item"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { NewProjectModal } from "@/components/modals/new-project-modal"
import { ChevronDown, ChevronRight, FileMusic, RotateCcw, Trash2 } from "lucide-react"

export function Dashboard() {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [expandedArchivedProjects, setExpandedArchivedProjects] = useState<number[]>([])
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

  // Données fictives pour les projets archivés
  const archivedProjects = [
    {
      id: 101,
      title: "OLD_ALBUM_DEMO",
      status: "COMPLETED",
      tags: ["ELECTRONIC", "AMBIENT"],
      lastUpdated: "3M_AGO",
      compositions: [
        { id: 1001, title: "INTRO_SEQUENCE", versions: 3, branches: 1, subGenre: "AMBIENT" },
        { id: 1002, title: "MAIN_THEME", versions: 5, branches: 2, subGenre: "ELECTRONIC" },
      ],
    },
    {
      id: 102,
      title: "ABANDONED_COLLAB",
      status: "PENDING",
      tags: ["JAZZ", "FUSION"],
      lastUpdated: "6M_AGO",
      compositions: [
        { id: 1003, title: "JAZZ_INTRO", versions: 2, branches: 1, subGenre: "JAZZ" },
        { id: 1004, title: "FUSION_BRIDGE", versions: 4, branches: 2, subGenre: "FUSION" },
      ],
    },
  ]

  const toggleArchivedProject = (projectId: number) => {
    if (expandedArchivedProjects.includes(projectId)) {
      setExpandedArchivedProjects(expandedArchivedProjects.filter((id) => id !== projectId))
    } else {
      setExpandedArchivedProjects([...expandedArchivedProjects, projectId])
    }
  }

  const handleDeleteArchivedProject = (projectId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    // Dans une application réelle, vous enverriez une requête à l'API ici
    console.log(`Deleting archived project: ${projectId}`)
  }

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
      {/* Projets archivés */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold glow-text">ARCHIVED_PROJECTS</h2>
          <div className="flex items-center gap-2">
            <div className="text-xs text-[#EFEFEF]">{archivedProjects.length}</div>
            <Button
              variant="outline"
              className="text-xs border-[#FFFFFF] bg-transparent hover:bg-[#1e1e1e]"
              onClick={() => {
                /* Navigation vers la vue ARCHIVED */
              }}
            >
              VIEW_ALL
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {archivedProjects.map((project) => (
            <div key={project.id} className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 cursor-pointer hover:bg-[#1e1e1e]"
                onClick={() => toggleArchivedProject(project.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedArchivedProjects.includes(project.id) ? (
                    <ChevronDown size={16} className="text-[#EFEFEF]" />
                  ) : (
                    <ChevronRight size={16} className="text-[#EFEFEF]" />
                  )}
                  <div>
                    <h3 className="font-medium text-sm">{project.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#666666]">
                      <span>{project.compositions.length} COMPOSITIONS</span>
                      <span>•</span>
                      <span>{project.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <div
                        key={index}
                        className={`border border-[#333333] px-1.5 py-0 text-xs branch-${tag.toLowerCase()}`}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs py-1 h-7"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Logique de restauration
                      }}
                    >
                      <RotateCcw size={12} className="mr-1" /> RESTORE
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs py-1 h-7"
                      onClick={(e) => handleDeleteArchivedProject(project.id, e)}
                    >
                      <Trash2 size={12} className="mr-1" /> DELETE
                    </Button>
                  </div>
                </div>
              </div>

              {expandedArchivedProjects.includes(project.id) && (
                <div className="border-t border-[#333333] p-3">
                  <h4 className="text-xs font-medium mb-2">COMPOSITIONS</h4>
                  <div className="bg-[#0a0a0a] border border-[#333333] rounded-lg overflow-hidden">
                    <div className="grid grid-cols-12 gap-2 p-2 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
                      <div className="col-span-6">TITLE</div>
                      <div className="col-span-2">VERSIONS</div>
                      <div className="col-span-2">BRANCHES</div>
                      <div className="col-span-2">SUB_GENRE</div>
                    </div>

                    {project.compositions.map((composition) => (
                      <div
                        key={composition.id}
                        className="grid grid-cols-12 gap-2 p-2 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors"
                      >
                        <div className="col-span-6 flex items-center gap-2">
                          <FileMusic size={12} className="text-[#EFEFEF]" />
                          <span className="font-medium text-xs">{composition.title}</span>
                        </div>
                        <div className="col-span-2 flex items-center text-xs text-[#EFEFEF]">
                          <span>{composition.versions}</span>
                        </div>
                        <div className="col-span-2 flex items-center text-xs text-[#EFEFEF]">
                          <span>{composition.branches}</span>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <div className="border border-[#333333] px-1.5 py-0 text-xs tag-ambient">
                            {composition.subGenre}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {showNewProjectModal && <NewProjectModal onClose={() => setShowNewProjectModal(false)} />}
    </div>
  )
}

