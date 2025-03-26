import { Play, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CompositionItemProps {
  composition: {
    id: number
    title: string
    branch: string
    duration: string
    date: string
  }
}

// Modifier le composant pour ajouter des couleurs aux branches
export function CompositionItem({ composition }: CompositionItemProps) {
  // Fonction pour déterminer la couleur de la branche
  const getBranchColor = (branch: string) => {
    const branchColors: Record<string, string> = {
      main: "branch-main",
      dev: "branch-dev",
      "feature/vocals": "branch-feature",
      hotfix: "branch-hotfix",
      release: "branch-release",
    }

    return branchColors[branch] || "branch-default"
  }

  return (
    <div className="flex items-center justify-between p-3 border-b border-[#333333] hover:bg-[#0a0a0a] transition-colors">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
          <Play size={16} />
        </Button>
        <div>
          <div className="font-medium glow-text-sm">{composition.title}</div>
          <div className="flex items-center gap-2 text-xs text-[#EFEFEF]">
            <div className={`border border-[#333333] px-1.5 py-0 text-xs ${getBranchColor(composition.branch)}`}>
              {composition.branch}
            </div>
            <span>{composition.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-[#EFEFEF]">{composition.date}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-[#333333]">
          <MoreHorizontal size={16} />
        </Button>
      </div>
    </div>
  )
}

