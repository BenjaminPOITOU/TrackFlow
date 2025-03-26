"use client"
import {
  Home,
  Music2,
  Users,
  Share2,
  GitCompare,
  Tag,
  PlaySquare,
  ChevronDown,
  ChevronRight,
  FileMusic,
  Archive,
} from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { UserMenu } from "@/components/user-menu"
import { useState } from "react"

interface SidebarProps {
  onNavigate?: (view: string, params?: any) => void
  activeView?: string
}

export function Sidebar({ onNavigate, activeView = "DASHBOARD" }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("MAIN_SYS")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)

  // Données fictives pour les projets et compositions
  const projects = [
    {
      id: 1,
      title: "ALBUM_CONCEPT",
      compositions: [
        { id: 101, title: "INTRO_MASTER" },
        { id: 102, title: "VERSE_EXP" },
        { id: 103, title: "BRIDGE_SECTION" },
      ],
    },
    {
      id: 2,
      title: "EP_COLLAB",
      compositions: [
        { id: 201, title: "MAIN_THEME" },
        { id: 202, title: "OUTRO_AMBIENT" },
      ],
    },
    {
      id: 3,
      title: "SINGLE_RELEASE",
      compositions: [{ id: 301, title: "VOCAL_TRACK" }],
    },
  ]

  const handleNavigation = (view: string, params?: any) => {
    if (onNavigate) {
      onNavigate(view, params)
    }
  }

  const toggleProject = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  return (
    <aside className="w-64 h-full border-r border-[#333333] flex flex-col bg-[#0D0D0D]">
      {/* Logo */}
      <div className="p-4 border-b border-[#333333]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-[#FFFFFF] flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight glow-text">SOUNDFLOW</span>
        </div>
      </div>

      {/* User Profile avec menu */}
      <div className="p-4 border-b border-[#333333]">
        <UserMenu onNavigate={handleNavigation} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-auto">
        <div className="mb-4 relative">
          <div
            className="px-2 py-1.5 text-xs text-[#EFEFEF] uppercase tracking-wider flex justify-between items-center"
            onMouseEnter={() => setActiveSection("MAIN_SYS")}
          >
            <span className={activeSection === "MAIN_SYS" ? "glow-text" : ""}>MAIN_SYS</span>
            {activeSection === "MAIN_SYS" && (
              <div className="w-8 h-8">
                <MiniVisualizer type="cube" />
              </div>
            )}
          </div>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleNavigation("DASHBOARD")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "DASHBOARD" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <Home size={18} />
                <span>DASHBOARD</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("PROJECTS")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "PROJECTS" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <Music2 size={18} />
                <span>PROJECTS</span>
              </button>
            </li>

            {/* Liste des projets avec compositions dépliables */}
            {projects.map((project) => (
              <li key={project.id} className="ml-4">
                <div className="flex items-center">
                  <button
                    onClick={() => toggleProject(project.id)}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-[#EFEFEF] hover:text-[#FFFFFF]"
                  >
                    {expandedProject === project.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  <button
                    onClick={() => handleNavigation("PROJECT_DETAIL", { projectId: project.id })}
                    className={`flex items-center gap-2 px-2 py-1 text-xs rounded ${
                      activeView === "PROJECT_DETAIL" && activeSection === `PROJECT_${project.id}`
                        ? "text-[#FFFFFF] font-medium"
                        : "text-[#EFEFEF] hover:text-[#FFFFFF]"
                    }`}
                  >
                    {project.title}
                  </button>
                </div>

                {expandedProject === project.id && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {project.compositions.map((composition) => (
                      <li key={composition.id}>
                        <button
                          onClick={() =>
                            handleNavigation("COMPOSITION_DETAIL", {
                              projectId: project.id,
                              compositionId: composition.id,
                            })
                          }
                          className={`flex items-center gap-2 px-2 py-1 text-xs rounded ${
                            activeView === "COMPOSITION_DETAIL" && activeSection === `COMPOSITION_${composition.id}`
                              ? "text-[#FFFFFF] bg-[#1e1e1e]"
                              : "text-[#EFEFEF] hover:text-[#FFFFFF]"
                          }`}
                        >
                          <FileMusic size={12} />
                          {composition.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li>
              <button
                onClick={() => handleNavigation("PLAYLIST")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "PLAYLIST" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <PlaySquare size={18} />
                <span>PLAYLIST</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("ARCHIVED")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "ARCHIVED" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <Archive size={18} />
                <span>ARCHIVED</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4 relative">
          <div
            className="px-2 py-1.5 text-xs text-[#EFEFEF] uppercase tracking-wider flex justify-between items-center"
            onMouseEnter={() => setActiveSection("COLLAB_SYS")}
          >
            <span className={activeSection === "COLLAB_SYS" ? "glow-text" : ""}>COLLAB_SYS</span>
            {activeSection === "COLLAB_SYS" && (
              <div className="w-8 h-8">
                <MiniVisualizer type="wave" />
              </div>
            )}
          </div>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleNavigation("LISTENERS")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "LISTENERS" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <Users size={18} />
                <span>LISTENERS</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("SHARE")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "SHARE" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <Share2 size={18} />
                <span>SHARE</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-4 relative">
          <div
            className="px-2 py-1.5 text-xs text-[#EFEFEF] uppercase tracking-wider flex justify-between items-center"
            onMouseEnter={() => setActiveSection("TOOLS_SYS")}
          >
            <span className={activeSection === "TOOLS_SYS" ? "glow-text" : ""}>TOOLS_SYS</span>
            {activeSection === "TOOLS_SYS" && (
              <div className="w-8 h-8">
                <MiniVisualizer type="circles" />
              </div>
            )}
          </div>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => handleNavigation("COMPARE")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "COMPARE" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <GitCompare size={18} />
                <span>A/B_COMPARE</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("METADATA")}
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
                  activeView === "METADATA" ? "bg-[#1e1e1e] text-[#FFFFFF]" : "hover:bg-[#1e1e1e] text-[#EFEFEF]"
                }`}
              >
                <Tag size={18} />
                <span>METADATA</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}

