"use client"

import { useState } from "react"
import { TechnicalFrame } from "@/components/technical-frame"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { ProjectsView } from "@/components/views/projects-view"
import { PlaylistView } from "@/components/views/playlist-view"
import { ListenersView } from "@/components/views/listeners-view"
import { ShareView } from "@/components/views/share-view"
import { CompareView } from "@/components/views/compare-view"
import { MetadataView } from "@/components/views/metadata-view"
import { SettingsView } from "@/components/views/settings-view"
import { ProjectDetailView } from "@/components/views/project-detail-view"
import { CompositionDetailView } from "@/components/views/composition-detail-view"

type ActiveView =
  | "DASHBOARD"
  | "PROJECTS"
  | "PLAYLIST"
  | "LISTENERS"
  | "SHARE"
  | "COMPARE"
  | "METADATA"
  | "SETTINGS"
  | "PROJECT_DETAIL"
  | "COMPOSITION_DETAIL"

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("DASHBOARD")
  const [viewParams, setViewParams] = useState<any>(null)

  // Fonction pour rendre la vue active
  const renderActiveView = () => {
    switch (activeView) {
      case "DASHBOARD":
        return <Dashboard />
      case "PROJECTS":
        return <ProjectsView onSelectProject={(projectId) => handleNavigation("PROJECT_DETAIL", { projectId })} />
      case "PROJECT_DETAIL":
        return (
          <ProjectDetailView
            projectId={viewParams?.projectId}
            onSelectComposition={(compositionId) =>
              handleNavigation("COMPOSITION_DETAIL", {
                projectId: viewParams?.projectId,
                compositionId,
              })
            }
          />
        )
      case "COMPOSITION_DETAIL":
        return <CompositionDetailView projectId={viewParams?.projectId} compositionId={viewParams?.compositionId} />
      case "PLAYLIST":
        return <PlaylistView />
      case "LISTENERS":
        return <ListenersView />
      case "SHARE":
        return <ShareView />
      case "COMPARE":
        return <CompareView />
      case "METADATA":
        return <MetadataView />
      case "SETTINGS":
        return <SettingsView />
      default:
        return <Dashboard />
    }
  }

  const handleNavigation = (view: string, params?: any) => {
    setActiveView(view as ActiveView)
    if (params) {
      setViewParams(params)
    }
  }

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-[#FFFFFF] overflow-hidden">
      <Sidebar onNavigate={handleNavigation} activeView={activeView} />
      <main className="flex-1 overflow-auto">
        <TechnicalFrame>{renderActiveView()}</TechnicalFrame>
      </main>
    </div>
  )
}

