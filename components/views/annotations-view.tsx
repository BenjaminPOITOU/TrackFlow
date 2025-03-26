"use client"
import { Button } from "@/components/ui/button"
import { Plus, Filter, SortDesc, Search, MessageSquare, Clock, Check } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { AnnotationItem } from "@/components/annotation-item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnnotationsView() {
  // Données fictives pour la démo
  const annotations = [
    {
      id: 1,
      type: "FEEDBACK",
      timeMarker: "1:24",
      author: "COLLAB_1",
      content: "INCREASE_BASS_LEVEL",
      status: "PENDING",
      project: "ALBUM_CONCEPT",
      date: "24/03/2025",
    },
    {
      id: 2,
      type: "IDEA",
      timeMarker: "2:36",
      author: "YOU",
      content: "ADD_ATMOSPHERIC_SYNTH",
      status: "IN_PROGRESS",
      project: "ALBUM_CONCEPT",
      date: "23/03/2025",
    },
    {
      id: 3,
      type: "FIX",
      timeMarker: "0:58",
      author: "COLLAB_2",
      content: "FIX_DRUM_TIMING",
      status: "RESOLVED",
      project: "EP_COLLAB",
      date: "22/03/2025",
    },
    {
      id: 4,
      type: "FEEDBACK",
      timeMarker: "3:42",
      author: "COLLAB_3",
      content: "REDUCE_REVERB_ON_VOCALS",
      status: "PENDING",
      project: "SINGLE_RELEASE",
      date: "21/03/2025",
    },
    {
      id: 5,
      type: "IDEA",
      timeMarker: "1:15",
      author: "YOU",
      content: "TRY_DIFFERENT_CHORD_PROGRESSION",
      status: "IN_PROGRESS",
      project: "ALBUM_CONCEPT",
      date: "20/03/2025",
    },
    {
      id: 6,
      type: "FIX",
      timeMarker: "4:08",
      author: "COLLAB_1",
      content: "ADJUST_EQ_ON_SYNTH_LEAD",
      status: "RESOLVED",
      project: "REMIX_PACK",
      date: "19/03/2025",
    },
    {
      id: 7,
      type: "FEEDBACK",
      timeMarker: "2:27",
      author: "COLLAB_2",
      content: "MORE_DYNAMIC_RANGE_NEEDED",
      status: "PENDING",
      project: "EP_COLLAB",
      date: "18/03/2025",
    },
    {
      id: 8,
      type: "IDEA",
      timeMarker: "0:45",
      author: "YOU",
      content: "ADD_VOCAL_SAMPLE_HERE",
      status: "IN_PROGRESS",
      project: "SINGLE_RELEASE",
      date: "17/03/2025",
    },
  ]

  // Statistiques des annotations
  const stats = {
    total: annotations.length,
    pending: annotations.filter((a) => a.status === "PENDING").length,
    inProgress: annotations.filter((a) => a.status === "IN_PROGRESS").length,
    resolved: annotations.filter((a) => a.status === "RESOLVED").length,
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">ANNOTATIONS_SYS</h1>
          <p className="text-[#EFEFEF]">MANAGE_FEEDBACK_AND_COMMENTS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button">
            <Plus className="mr-2 h-4 w-4" /> NEW_ANNOTATION
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="wave" />
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#EFEFEF]">TOTAL</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#FFFFFF] flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#FFB800]">PENDING</p>
              <h3 className="text-2xl font-bold text-[#FFB800]">{stats.pending}</h3>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#FFB800] flex items-center justify-center text-[#FFB800]">
              <Clock size={20} />
            </div>
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#00A3FF]">IN_PROGRESS</p>
              <h3 className="text-2xl font-bold text-[#00A3FF]">{stats.inProgress}</h3>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#00A3FF] flex items-center justify-center text-[#00A3FF]">
              <Clock size={20} />
            </div>
          </div>
        </div>

        <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#00FF85]">RESOLVED</p>
              <h3 className="text-2xl font-bold text-[#00FF85]">{stats.resolved}</h3>
            </div>
            <div className="w-10 h-10 rounded-full border border-[#00FF85] flex items-center justify-center text-[#00FF85]">
              <Check size={20} />
            </div>
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
            placeholder="SEARCH_ANNOTATIONS"
            className="pl-8 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
          />
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-[#0D0D0D] border border-[#333333] p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            ALL
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            PENDING
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]"
          >
            IN_PROGRESS
          </TabsTrigger>
          <TabsTrigger value="resolved" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            RESOLVED
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
            {annotations.map((annotation) => (
              <AnnotationItem key={annotation.id} annotation={annotation} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
            {annotations
              .filter((a) => a.status === "PENDING")
              .map((annotation) => (
                <AnnotationItem key={annotation.id} annotation={annotation} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-4">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
            {annotations
              .filter((a) => a.status === "IN_PROGRESS")
              .map((annotation) => (
                <AnnotationItem key={annotation.id} annotation={annotation} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="mt-4">
          <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
            {annotations
              .filter((a) => a.status === "RESOLVED")
              .map((annotation) => (
                <AnnotationItem key={annotation.id} annotation={annotation} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

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

