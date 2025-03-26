"use client"
import { Button } from "@/components/ui/button"
import { Plus, Filter, SortDesc, Search } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { CompositionItem } from "@/components/composition-item"

export function CompositionsView() {
  // Données fictives pour la démo
  const compositions = [
    { id: 1, title: "INTRO_MASTER", branch: "main", duration: "3:42", date: "24/03/2025" },
    { id: 2, title: "VERSE_EXP", branch: "dev", duration: "2:18", date: "23/03/2025" },
    { id: 3, title: "BRIDGE_SECTION", branch: "feature/vocals", duration: "1:56", date: "22/03/2025" },
    { id: 4, title: "OUTRO_AMBIENT", branch: "main", duration: "4:12", date: "21/03/2025" },
    { id: 5, title: "CHORUS_VARIATION", branch: "dev", duration: "2:45", date: "20/03/2025" },
    { id: 6, title: "DRUM_PATTERN_V2", branch: "feature/drums", duration: "1:32", date: "19/03/2025" },
    { id: 7, title: "SYNTH_LEAD", branch: "dev", duration: "3:08", date: "18/03/2025" },
    { id: 8, title: "BASS_SEQUENCE", branch: "main", duration: "2:24", date: "17/03/2025" },
  ]

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">COMPOSITIONS_SYS</h1>
          <p className="text-[#EFEFEF]">MANAGE_YOUR_AUDIO_COMPOSITIONS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button">
            <Plus className="mr-2 h-4 w-4" /> NEW_COMPOSITION
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="wave" />
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4 bg-[#0D0D0D] border border-[#333333] rounded-lg">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]">
            <Filter className="mr-2 h-4 w-4" /> FILTER
          </Button>
          <Button variant="outline" className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]">
            <SortDesc className="mr-2 h-4 w-4" /> SORT
          </Button>
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
          <Input
            placeholder="SEARCH_COMPOSITIONS"
            className="pl-8 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
          />
        </div>
      </div>

      {/* Liste des compositions */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
        {compositions.map((composition) => (
          <CompositionItem key={composition.id} composition={composition} />
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
    </div>
  )
}

