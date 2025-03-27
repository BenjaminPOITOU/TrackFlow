"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, RotateCcw, Search, Filter, FileMusic, Music2, Clock, Calendar, AlertTriangle } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface TrashItem {
  id: number
  title: string
  type: "PROJECT" | "COMPOSITION" | "VERSION"
  parentTitle?: string
  deletedAt: string
  permanentDeleteAt: string
  tags?: string[]
  details?: string
}

export function TrashView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")

  // Données fictives pour les éléments dans la corbeille
  const trashItems: TrashItem[] = [
    {
      id: 1,
      title: "ABANDONED_PROJECT",
      type: "PROJECT",
      deletedAt: "24/03/2025",
      permanentDeleteAt: "24/04/2025",
      tags: ["ELECTRONIC", "AMBIENT"],
      details: "3 compositions, 8 versions",
    },
    {
      id: 2,
      title: "INTRO_SEQUENCE",
      type: "COMPOSITION",
      parentTitle: "ALBUM_CONCEPT",
      deletedAt: "23/03/2025",
      permanentDeleteAt: "23/04/2025",
      details: "4 versions, 2 branches",
    },
    {
      id: 3,
      title: "V2.3",
      type: "VERSION",
      parentTitle: "BRIDGE_SECTION / ALBUM_CONCEPT",
      deletedAt: "22/03/2025",
      permanentDeleteAt: "22/04/2025",
      details: "branch: feature/vocals",
    },
    {
      id: 4,
      title: "DEMO_PROJECT",
      type: "PROJECT",
      deletedAt: "20/03/2025",
      permanentDeleteAt: "20/04/2025",
      tags: ["JAZZ", "FUSION"],
      details: "2 compositions, 5 versions",
    },
    {
      id: 5,
      title: "OUTRO_AMBIENT",
      type: "COMPOSITION",
      parentTitle: "SINGLE_RELEASE",
      deletedAt: "18/03/2025",
      permanentDeleteAt: "18/04/2025",
      details: "2 versions, 1 branch",
    },
    {
      id: 6,
      title: "V1.4",
      type: "VERSION",
      parentTitle: "MAIN_THEME / EP_COLLAB",
      deletedAt: "15/03/2025",
      permanentDeleteAt: "15/04/2025",
      details: "branch: main",
    },
  ]

  // Filtrer les éléments en fonction de la recherche et du type sélectionné
  const filteredItems = trashItems.filter((item) => {
    // Filtrer par recherche
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.parentTitle && item.parentTitle.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filtrer par type
    const matchesType = selectedType === "all" || item.type.toLowerCase() === selectedType.toLowerCase()

    // Filtrer par onglet
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "soon" &&
        new Date(item.permanentDeleteAt.split("/").reverse().join("-")) <=
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesType && matchesTab
  })

  // Fonction pour obtenir l'icône en fonction du type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PROJECT":
        return <Music2 size={16} className="text-[#EFEFEF]" />
      case "COMPOSITION":
        return <FileMusic size={16} className="text-[#EFEFEF]" />
      case "VERSION":
        return <Clock size={16} className="text-[#EFEFEF]" />
      default:
        return <FileMusic size={16} className="text-[#EFEFEF]" />
    }
  }

  // Fonction pour obtenir la couleur du badge en fonction du type
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "PROJECT":
        return "bg-[#3B82F6] text-white"
      case "COMPOSITION":
        return "bg-[#8B5CF6] text-white"
      case "VERSION":
        return "bg-[#EC4899] text-white"
      default:
        return "bg-[#6B7280] text-white"
    }
  }

  // Calculer les jours restants avant la suppression permanente
  const getDaysRemaining = (permanentDeleteDate: string) => {
    const today = new Date()
    const deleteDate = new Date(permanentDeleteDate.split("/").reverse().join("-"))
    const diffTime = deleteDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">TRASH</h1>
          <p className="text-[#EFEFEF]">DELETED_ITEMS_ARE_KEPT_FOR_30_DAYS_BEFORE_PERMANENT_DELETION</p>
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
            placeholder="SEARCH_TRASH"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-[#EFEFEF]" />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px] bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
              <SelectItem value="all">ALL_TYPES</SelectItem>
              <SelectItem value="project">PROJECTS</SelectItem>
              <SelectItem value="composition">COMPOSITIONS</SelectItem>
              <SelectItem value="version">VERSIONS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="bg-[#0D0D0D] border border-[#333333] p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            ALL_ITEMS
          </TabsTrigger>
          <TabsTrigger value="soon" className="data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#FFFFFF]">
            EXPIRING_SOON
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {/* Liste des éléments dans la corbeille */}
          {filteredItems.length > 0 ? (
            <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
              {/* En-tête du tableau */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
                <div className="col-span-3">ITEM</div>
                <div className="col-span-2">TYPE</div>
                <div className="col-span-2">PARENT</div>
                <div className="col-span-2">DELETED_AT</div>
                <div className="col-span-1">EXPIRES_IN</div>
                <div className="col-span-2">ACTIONS</div>
              </div>

              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors"
                >
                  <div className="col-span-3 flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <div>
                      <span className="font-medium">{item.title}</span>
                      {item.tags && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <Badge className={`${getTypeBadgeClass(item.type)}`}>{item.type}</Badge>
                  </div>
                  <div className="col-span-2 flex items-center text-[#EFEFEF] text-sm">{item.parentTitle || "-"}</div>
                  <div className="col-span-2 flex items-center text-[#EFEFEF] text-sm">
                    <Calendar size={14} className="mr-1" /> {item.deletedAt}
                  </div>
                  <div className="col-span-1 flex items-center">
                    <Badge
                      variant="outline"
                      className={getDaysRemaining(item.permanentDeleteAt) <= 7 ? "text-red-500" : "text-[#EFEFEF]"}
                    >
                      {getDaysRemaining(item.permanentDeleteAt)} DAYS
                    </Badge>
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
              <Trash2 size={48} className="mb-4" />
              <h3 className="text-xl font-medium mb-2">NO_ITEMS_FOUND</h3>
              <p>YOUR_TRASH_IS_EMPTY_OR_NO_ITEMS_MATCH_YOUR_SEARCH</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="soon" className="mt-4">
          {/* Liste des éléments qui expirent bientôt */}
          {filteredItems.length > 0 ? (
            <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
              <div className="p-4 border-b border-[#333333] bg-red-500/10">
                <div className="flex items-center gap-2 text-red-500">
                  <AlertTriangle size={18} />
                  <span className="font-medium">WARNING: THESE_ITEMS_WILL_BE_PERMANENTLY_DELETED_WITHIN_7_DAYS</span>
                </div>
              </div>

              {/* En-tête du tableau */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
                <div className="col-span-3">ITEM</div>
                <div className="col-span-2">TYPE</div>
                <div className="col-span-2">PARENT</div>
                <div className="col-span-2">DELETED_AT</div>
                <div className="col-span-1">EXPIRES_IN</div>
                <div className="col-span-2">ACTIONS</div>
              </div>

              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors"
                >
                  <div className="col-span-3 flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <div>
                      <span className="font-medium">{item.title}</span>
                      {item.tags && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <Badge className={`${getTypeBadgeClass(item.type)}`}>{item.type}</Badge>
                  </div>
                  <div className="col-span-2 flex items-center text-[#EFEFEF] text-sm">{item.parentTitle || "-"}</div>
                  <div className="col-span-2 flex items-center text-[#EFEFEF] text-sm">
                    <Calendar size={14} className="mr-1" /> {item.deletedAt}
                  </div>
                  <div className="col-span-1 flex items-center">
                    <Badge variant="outline" className="text-red-500">
                      {getDaysRemaining(item.permanentDeleteAt)} DAYS
                    </Badge>
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
              <Trash2 size={48} className="mb-4" />
              <h3 className="text-xl font-medium mb-2">NO_ITEMS_EXPIRING_SOON</h3>
              <p>NO_ITEMS_WILL_BE_PERMANENTLY_DELETED_WITHIN_THE_NEXT_7_DAYS</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

