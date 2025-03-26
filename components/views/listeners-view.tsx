"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, Trash2, Search, Settings, ChevronDown, X, Plus } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface Listener {
  id: number
  name: string
  email: string
  role: string
  status: "ONLINE" | "OFFLINE" | "AWAY"
  lastActive: string
  accessibleVersions?: string[]
  accessExpiration?: string
  accessLevel?: "LISTEN_ONLY" | "LISTEN_AND_ANNOTATION" | "FULL_EDIT"
}

export function ListenersView() {
  const [showAccessSettings, setShowAccessSettings] = useState(false)
  const [selectedListener, setSelectedListener] = useState<Listener | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  // Données fictives pour la démo
  const listeners: Listener[] = [
    {
      id: 1,
      name: "COLLABORATOR_01",
      email: "collab01@soundflow.io",
      role: "PRODUCER",
      status: "ONLINE",
      lastActive: "NOW",
      accessibleVersions: ["PROJECT_A/COMP_1/V1.0", "PROJECT_B/COMP_2/V2.1"],
      accessExpiration: "30/04/2025",
      accessLevel: "FULL_EDIT",
    },
    {
      id: 2,
      name: "SOUND_ENGINEER",
      email: "engineer@soundflow.io",
      role: "ENGINEER",
      status: "AWAY",
      lastActive: "10M_AGO",
      accessibleVersions: ["PROJECT_A/COMP_1/V1.0"],
      accessExpiration: "15/05/2025",
      accessLevel: "LISTEN_AND_ANNOTATION",
    },
    {
      id: 3,
      name: "VOCALIST_MAIN",
      email: "vocalist@soundflow.io",
      role: "ARTIST",
      status: "OFFLINE",
      lastActive: "2H_AGO",
      accessibleVersions: ["PROJECT_C/COMP_3/V1.2"],
      accessExpiration: "01/06/2025",
      accessLevel: "LISTEN_ONLY",
    },
    {
      id: 4,
      name: "MIXING_EXPERT",
      email: "mixer@soundflow.io",
      role: "ENGINEER",
      status: "OFFLINE",
      lastActive: "1D_AGO",
      accessibleVersions: ["PROJECT_A/COMP_1/V1.0", "PROJECT_A/COMP_1/V1.1"],
      accessExpiration: "10/05/2025",
      accessLevel: "LISTEN_AND_ANNOTATION",
    },
    {
      id: 5,
      name: "LABEL_MANAGER",
      email: "label@soundflow.io",
      role: "MANAGER",
      status: "OFFLINE",
      lastActive: "3D_AGO",
      accessibleVersions: ["PROJECT_B/COMP_2/V2.0"],
      accessExpiration: "20/04/2025",
      accessLevel: "LISTEN_ONLY",
    },
    {
      id: 6,
      name: "SESSION_MUSICIAN",
      email: "session@soundflow.io",
      role: "ARTIST",
      status: "ONLINE",
      lastActive: "NOW",
      accessibleVersions: ["PROJECT_C/COMP_3/V1.0", "PROJECT_C/COMP_3/V1.1", "PROJECT_C/COMP_3/V1.2"],
      accessExpiration: "05/05/2025",
      accessLevel: "LISTEN_AND_ANNOTATION",
    },
  ]

  // Fonction pour obtenir la couleur en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "bg-[#00FF85]" // Vert
      case "AWAY":
        return "bg-[#FFB800]" // Ambre
      case "OFFLINE":
        return "bg-[#666666]" // Gris
      default:
        return "bg-[#FFFFFF]" // Blanc par défaut
    }
  }

  // Fonction pour obtenir la couleur en fonction du rôle
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "PRODUCER":
        return "bg-[#00A3FF] text-white" // Bleu
      case "ENGINEER":
        return "bg-[#8000FF] text-white" // Violet
      case "ARTIST":
        return "bg-[#FF0080] text-white" // Rose
      case "MANAGER":
        return "bg-[#FFB800] text-black" // Ambre
      default:
        return "bg-[#EFEFEF] text-black" // Gris clair par défaut
    }
  }

  // Fonction pour obtenir la couleur en fonction du niveau d'accès
  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "LISTEN_ONLY":
        return "text-[#00FF85]" // Vert
      case "LISTEN_AND_ANNOTATION":
        return "text-[#FFB800]" // Ambre
      case "FULL_EDIT":
        return "text-[#FF0080]" // Rose
      default:
        return "text-[#EFEFEF]" // Blanc par défaut
    }
  }

  const handleOpenAccessSettings = (listener: Listener) => {
    setSelectedListener(listener)
    setShowAccessSettings(true)
    if (listener.accessExpiration) {
      const [day, month, year] = listener.accessExpiration.split("/").map(Number)
      setDate(new Date(year, month - 1, day))
    }
  }

  const handleCloseAccessSettings = () => {
    setSelectedListener(null)
    setShowAccessSettings(false)
    setDate(undefined)
  }

  const handleSaveAccessSettings = () => {
    // Logique pour sauvegarder les paramètres d'accès
    handleCloseAccessSettings()
  }

  const handleDeleteListener = (id: number) => {
    // Logique pour supprimer un listener
    setConfirmDelete(null)
    // Ici, vous pourriez filtrer la liste des listeners pour supprimer celui avec l'ID correspondant
  }

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">LISTENERS_SYS</h1>
          <p className="text-[#EFEFEF]">MANAGE_YOUR_COLLABORATORS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button">
            <UserPlus className="mr-2 h-4 w-4" /> INVITE_LISTENER
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="grid" />
          </div>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
        <Input
          placeholder="SEARCH_LISTENERS"
          className="pl-10 py-6 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
        />
      </div>

      {/* Liste des auditeurs */}
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase font-bold">
          <div className="col-span-1">STATUS</div>
          <div className="col-span-2">NAME</div>
          <div className="col-span-3">EMAIL</div>
          <div className="col-span-1">ROLE</div>
          <div className="col-span-2">ACCESS</div>
          <div className="col-span-2">LAST_ACTIVE</div>
          <div className="col-span-1">ACTIONS</div>
        </div>

        {listeners.map((listener) => (
          <div
            key={listener.id}
            className="grid grid-cols-12 gap-4 p-4 border-b border-[#333333] hover:bg-[#1e1e1e] transition-colors"
          >
            <div className="col-span-1 flex items-center">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(listener.status)}`}></div>
                <div
                  className={`absolute inset-0 w-3 h-3 rounded-full ${getStatusColor(listener.status)} animate-ping opacity-50`}
                  style={{ animationDuration: "2s" }}
                ></div>
              </div>
            </div>
            <div className="col-span-2 flex items-center font-medium">{listener.name}</div>
            <div className="col-span-3 flex items-center text-[#EFEFEF]">{listener.email}</div>
            <div className="col-span-1 flex items-center">
              <Badge className={`${getRoleBadgeClass(listener.role)}`}>{listener.role}</Badge>
            </div>
            <div className="col-span-2 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 px-2 text-xs border border-[#333333] flex items-center">
                    <span className={`mr-1 ${listener.accessLevel ? getAccessLevelColor(listener.accessLevel) : ""}`}>
                      {listener.accessLevel || "NO_ACCESS"}
                    </span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <div className="px-2 py-1.5 text-xs font-semibold">ACCESSIBLE_VERSIONS</div>
                  {listener.accessibleVersions && listener.accessibleVersions.length > 0 ? (
                    listener.accessibleVersions.map((version, idx) => (
                      <DropdownMenuItem key={idx} className="text-xs cursor-default">
                        {version}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="text-xs cursor-default">NO_VERSIONS_ACCESSIBLE</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span>EXPIRES:</span>
                      <span>{listener.accessExpiration || "NEVER"}</span>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="col-span-2 flex items-center text-[#EFEFEF]">{listener.lastActive}</div>
            <div className="col-span-1 flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full border border-[#333333]"
                onClick={() => handleOpenAccessSettings(listener)}
              >
                <Settings size={16} />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full border border-[#333333] text-[#EF4444]"
                  >
                    <Trash2 size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3 bg-[#0D0D0D] border-[#333333]">
                  <div className="space-y-2">
                    <p className="text-sm">CONFIRM_DELETE_LISTENER?</p>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
                      >
                        CANCEL
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 bg-[#EF4444] hover:bg-[#DC2626] text-white"
                        onClick={() => handleDeleteListener(listener.id)}
                      >
                        DELETE
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>

      {/* Modale de paramètres d'accès */}
      <Dialog open={showAccessSettings} onOpenChange={(open) => !open && handleCloseAccessSettings()}>
        <DialogContent className="bg-[#0D0D0D] border border-[#333333] text-[#EFEFEF] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight glow-text">EDIT_ACCESS_SETTINGS</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {selectedListener && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedListener.name}</h3>
                    <p className="text-sm text-[#EFEFEF]">{selectedListener.email}</p>
                  </div>
                  <Badge className={`${getRoleBadgeClass(selectedListener.role)}`}>{selectedListener.role}</Badge>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[#EFEFEF]">VERSION_ACCESS_LEVEL</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 p-2 border border-[#333333] rounded-md hover:bg-[#1e1e1e] cursor-pointer">
                        <input
                          type="radio"
                          id="listen-only"
                          name="access-level"
                          className="text-[#FFFFFF] bg-[#0D0D0D] border-[#333333]"
                          defaultChecked={selectedListener.accessLevel === "LISTEN_ONLY"}
                        />
                        <Label htmlFor="listen-only" className="cursor-pointer">
                          LISTEN_ONLY
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-2 border border-[#333333] rounded-md hover:bg-[#1e1e1e] cursor-pointer">
                        <input
                          type="radio"
                          id="listen-annotation"
                          name="access-level"
                          className="text-[#FFFFFF] bg-[#0D0D0D] border-[#333333]"
                          defaultChecked={selectedListener.accessLevel === "LISTEN_AND_ANNOTATION"}
                        />
                        <Label htmlFor="listen-annotation" className="cursor-pointer">
                          LISTEN_AND_ANNOTATION
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="expiration" className="text-[#EFEFEF]">
                        SET_EXPIRATION
                      </Label>
                      <Switch id="expiration" defaultChecked={!!selectedListener.accessExpiration} />
                    </div>
                    {selectedListener.accessExpiration && (
                      <div className="p-2 border border-[#333333] rounded-md">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#EFEFEF]">ACCESSIBLE_VERSIONS</Label>
                    <div className="p-2 border border-[#333333] rounded-md max-h-40 overflow-y-auto">
                      {selectedListener.accessibleVersions && selectedListener.accessibleVersions.length > 0 ? (
                        selectedListener.accessibleVersions.map((version, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-1 border-b border-[#333333] last:border-0"
                          >
                            <span className="text-sm">{version}</span>
                            <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full text-[#EF4444]">
                              <X size={14} />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-[#666666] py-2">NO_VERSIONS_ACCESSIBLE</div>
                      )}
                    </div>
                    <Button className="w-full bg-transparent border border-[#333333] hover:bg-[#1e1e1e] text-[#EFEFEF] mt-2">
                      <Plus size={14} className="mr-2" /> ADD_VERSION_ACCESS
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleCloseAccessSettings}
              className="bg-transparent border border-[#333333] hover:bg-[#1e1e1e] text-[#EFEFEF]"
            >
              CANCEL
            </Button>
            <Button onClick={handleSaveAccessSettings} className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]">
              SAVE_SETTINGS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

