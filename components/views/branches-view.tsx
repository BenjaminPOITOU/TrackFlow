"use client"
import { Button } from "@/components/ui/button"
import { Plus, GitBranch, GitMerge, GitCommit, GitPullRequest, Search } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Branch {
  id: number
  name: string
  author: string
  lastCommit: string
  status: "ACTIVE" | "MERGED" | "ARCHIVED"
  commits: number
}

export function BranchesView() {
  // Données fictives pour la démo
  const branches: Branch[] = [
    { id: 1, name: "main", author: "YOU", lastCommit: "2H_AGO", status: "ACTIVE", commits: 24 },
    { id: 2, name: "dev", author: "YOU", lastCommit: "4H_AGO", status: "ACTIVE", commits: 18 },
    { id: 3, name: "feature/vocals", author: "COLLAB_1", lastCommit: "1D_AGO", status: "ACTIVE", commits: 7 },
    { id: 4, name: "feature/drums", author: "COLLAB_2", lastCommit: "2D_AGO", status: "ACTIVE", commits: 5 },
    { id: 5, name: "feature/synths", author: "YOU", lastCommit: "3D_AGO", status: "MERGED", commits: 12 },
    { id: 6, name: "hotfix/mix", author: "COLLAB_3", lastCommit: "5D_AGO", status: "MERGED", commits: 3 },
    { id: 7, name: "experiment/reverb", author: "YOU", lastCommit: "1W_AGO", status: "ARCHIVED", commits: 4 },
  ]

  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-[#00A3FF]" // Bleu
      case "MERGED":
        return "text-[#00FF85]" // Vert
      case "ARCHIVED":
        return "text-[#666666]" // Gris
      default:
        return "text-[#FFFFFF]" // Blanc par défaut
    }
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">BRANCHES_SYS</h1>
          <p className="text-[#EFEFEF]">MANAGE_PROJECT_VERSIONS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button">
            <Plus className="mr-2 h-4 w-4" /> NEW_BRANCH
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="grid" />
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

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
          <Input
            placeholder="SEARCH_BRANCHES"
            className="pl-8 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
          />
        </div>
      </div>

      {/* Visualisation des branches */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-6">
        <h2 className="text-lg font-medium mb-6 glow-text-sm">BRANCH_STRUCTURE</h2>

        <div className="relative h-64 border border-[#333333] rounded bg-black p-4 mb-6 overflow-auto">
          {/* Visualisation simplifiée des branches */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#FFFFFF]"></div>

          {/* Branche principale */}
          <div className="relative pl-8 py-2">
            <div className="absolute left-8 top-1/2 w-8 h-px bg-[#FFFFFF]"></div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0D0D0D] border-2 border-[#00A3FF]"></div>
            <div className="bg-[#1e1e1e] rounded-md p-2 ml-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-[#00A3FF]" />
                  <span className="font-medium">main</span>
                </div>
                <span className="text-xs text-[#EFEFEF]">24 COMMITS</span>
              </div>
            </div>
          </div>

          {/* Branche dev */}
          <div className="relative pl-8 py-2 mt-4">
            <div className="absolute left-8 top-0 h-1/2 w-px bg-[#FFFFFF]"></div>
            <div className="absolute left-8 top-1/2 w-8 h-px bg-[#FFFFFF]"></div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0D0D0D] border-2 border-[#00A3FF]"></div>
            <div className="bg-[#1e1e1e] rounded-md p-2 ml-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-[#00A3FF]" />
                  <span className="font-medium">dev</span>
                </div>
                <span className="text-xs text-[#EFEFEF]">18 COMMITS</span>
              </div>
            </div>
          </div>

          {/* Branches feature */}
          <div className="relative pl-16 py-2">
            <div className="absolute left-16 top-0 h-1/2 w-px bg-[#FFFFFF]"></div>
            <div className="absolute left-16 top-1/2 w-8 h-px bg-[#FFFFFF]"></div>
            <div className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0D0D0D] border-2 border-[#00A3FF]"></div>
            <div className="bg-[#1e1e1e] rounded-md p-2 ml-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-[#00A3FF]" />
                  <span className="font-medium">feature/vocals</span>
                </div>
                <span className="text-xs text-[#EFEFEF]">7 COMMITS</span>
              </div>
            </div>
          </div>

          <div className="relative pl-16 py-2">
            <div className="absolute left-16 top-0 h-1/2 w-px bg-[#FFFFFF]"></div>
            <div className="absolute left-16 top-1/2 w-8 h-px bg-[#FFFFFF]"></div>
            <div className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0D0D0D] border-2 border-[#00A3FF]"></div>
            <div className="bg-[#1e1e1e] rounded-md p-2 ml-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-[#00A3FF]" />
                  <span className="font-medium">feature/drums</span>
                </div>
                <span className="text-xs text-[#EFEFEF]">5 COMMITS</span>
              </div>
            </div>
          </div>

          {/* Branche merged */}
          <div className="relative pl-16 py-2">
            <div className="absolute left-16 top-0 h-1/2 w-px bg-[#FFFFFF]"></div>
            <div className="absolute left-16 top-1/2 w-8 h-px bg-[#FFFFFF]"></div>
            <div className="absolute left-16 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0D0D0D] border-2 border-[#00FF85]"></div>
            <div className="bg-[#1e1e1e] rounded-md p-2 ml-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitMerge size={14} className="text-[#00FF85]" />
                  <span className="font-medium">feature/synths</span>
                </div>
                <span className="text-xs text-[#EFEFEF]">12 COMMITS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des branches */}
        <h2 className="text-lg font-medium mb-4 glow-text-sm">ALL_BRANCHES</h2>
        <div className="space-y-2">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="flex items-center justify-between p-3 border border-[#333333] rounded-lg hover:bg-[#1e1e1e] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#333333] flex items-center justify-center">
                  {branch.status === "MERGED" ? (
                    <GitMerge size={16} className="text-[#00FF85]" />
                  ) : branch.status === "ARCHIVED" ? (
                    <GitBranch size={16} className="text-[#666666]" />
                  ) : (
                    <GitBranch size={16} className="text-[#00A3FF]" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{branch.name}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={getStatusColor(branch.status)}>{branch.status}</span>
                    <span className="text-[#EFEFEF]">BY: {branch.author}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-xs text-[#EFEFEF]">{branch.commits} COMMITS</div>
                <div className="text-xs text-[#EFEFEF]">LAST: {branch.lastCommit}</div>

                <div className="flex items-center gap-1">
                  {branch.status === "ACTIVE" && (
                    <>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
                        <GitCommit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
                        <GitMerge size={16} />
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
                    <GitPullRequest size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

