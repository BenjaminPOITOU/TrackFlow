"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, GitBranch, Upload, Clock, Music, FileMusic, MessageSquare } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Textarea } from "@/components/ui/textarea"
import { Tag } from "@/components/ui/tag"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Annotation {
  id: number
  timeMarker: string
  content: string
  status: string
  author: string
  date: string
}

interface NewVersionDialogProps {
  projectId: number
  projectTitle: string
  compositionId: number
  compositionTitle: string
  previousVersionAnnotations: Annotation[]
  onClose: () => void
  onSave?: (data: any) => void
}

export function NewVersionDialog({
  projectId,
  projectTitle,
  compositionId,
  compositionTitle,
  previousVersionAnnotations,
  onClose,
  onSave,
}: NewVersionDialogProps) {
  const [title, setTitle] = useState("")
  const [tempo, setTempo] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("main")
  const [newBranchName, setNewBranchName] = useState("")
  const [newBranchDescription, setNewBranchDescription] = useState("")
  const [createNewBranch, setCreateNewBranch] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [annotationStatuses, setAnnotationStatuses] = useState<Record<number, string>>(
    previousVersionAnnotations.reduce(
      (acc, annotation) => {
        acc[annotation.id] = annotation.status
        return acc
      },
      {} as Record<number, string>,
    ),
  )

  const branches = ["main", "dev", "feature/vocals", "feature/drums", "hotfix/timing"]

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  const handleAnnotationStatusChange = (id: number, status: string) => {
    setAnnotationStatuses({
      ...annotationStatuses,
      [id]: status,
    })
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        projectId,
        compositionId,
        title,
        tempo,
        branch: createNewBranch ? newBranchName : selectedBranch,
        branchDescription: createNewBranch ? newBranchDescription : "",
        audioFile,
        annotations: Object.entries(annotationStatuses).map(([id, status]) => ({
          id: Number.parseInt(id),
          status,
        })),
      })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#0D0D0D] border border-[#333333] rounded-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Bouton de fermeture */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 rounded-full border border-[#333333]"
          onClick={onClose}
        >
          <X size={16} />
        </Button>

        {/* En-tête */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#FFFFFF] flex items-center justify-center">
            <GitBranch size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold glow-text-sm">NEW_VERSION</h2>
            <p className="text-xs text-[#EFEFEF]">
              PROJECT: {projectTitle} • COMPOSITION: {compositionTitle}
            </p>
          </div>

          {/* Mini visualiseur dans le coin */}
          <div className="absolute right-12 top-4 w-6 h-6">
            <MiniVisualizer type="wave" />
          </div>
        </div>

        {/* Formulaire */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version-title" className="text-[#EFEFEF]">
                VERSION_TITLE
              </Label>
              <Input
                id="version-title"
                placeholder="e.g. V1.0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="version-tempo" className="text-[#EFEFEF] flex items-center gap-1">
                <Clock size={14} /> TEMPO (BPM)
              </Label>
              <Input
                id="version-tempo"
                placeholder="e.g. 120"
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="version-branch" className="text-[#EFEFEF]">
                  BRANCH
                </Label>
                <div className="flex items-center gap-2">
                  <Switch id="create-new-branch" checked={createNewBranch} onCheckedChange={setCreateNewBranch} />
                  <Label htmlFor="create-new-branch" className="text-xs text-[#EFEFEF]">
                    CREATE_NEW_BRANCH
                  </Label>
                </div>
              </div>

              {createNewBranch ? (
                <div className="space-y-2">
                  <Input
                    id="new-branch-name"
                    placeholder="NEW_BRANCH_NAME"
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                  />
                  <Textarea
                    id="new-branch-description"
                    placeholder="BRANCH_DESCRIPTION"
                    value={newBranchDescription}
                    onChange={(e) => setNewBranchDescription(e.target.value)}
                    className="h-16 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                  />
                </div>
              ) : (
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        <div className="flex items-center gap-2">
                          <Tag variant={branch.split("/")[0] as any} size="sm">
                            {branch}
                          </Tag>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio-file" className="text-[#EFEFEF] flex items-center gap-2">
              <Music size={14} /> AUDIO_FILE
            </Label>
            <div className="border border-dashed border-[#333333] rounded-md p-4 flex items-center justify-center">
              {audioFile ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <FileMusic size={20} />
                    <div>
                      <p className="text-sm">{audioFile.name}</p>
                      <p className="text-xs text-[#EFEFEF]">{(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setAudioFile(null)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-[#EFEFEF] py-4">
                  <Upload size={24} className="mb-2" />
                  <p className="text-sm">DRAG_OR_CLICK_TO_UPLOAD_AUDIO</p>
                  <p className="text-xs text-[#666666] mb-2">SUPPORTED_FORMATS: WAV, MP3, FLAC</p>
                  <input type="file" id="audio-file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs"
                    onClick={() => document.getElementById("audio-file")?.click()}
                  >
                    BROWSE_FILES
                  </Button>
                </div>
              )}
            </div>
          </div>

          {previousVersionAnnotations.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-[#EFEFEF] flex items-center gap-2">
                  <MessageSquare size={14} /> PREVIOUS_VERSION_ANNOTATIONS
                </Label>
                <p className="text-xs text-[#EFEFEF]">SELECT_ANNOTATIONS_TO_INCLUDE</p>
              </div>
              <div className="border border-[#333333] rounded-md divide-y divide-[#333333]">
                {previousVersionAnnotations.map((annotation) => (
                  <div key={annotation.id} className="p-3 flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-8 h-8 rounded-full border border-[#333333] flex items-center justify-center">
                        <MessageSquare size={16} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="border border-[#333333] px-1.5 py-0 text-xs">{annotation.timeMarker}</div>
                        <span className="text-sm font-medium">{annotation.author}</span>
                        <span className="text-xs text-[#666666]">{annotation.date}</span>
                      </div>
                      <p className="text-sm mb-2">{annotation.content}</p>
                    </div>
                    <div>
                      <Select
                        value={annotationStatuses[annotation.id]}
                        onValueChange={(value) => handleAnnotationStatusChange(annotation.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs bg-[#0D0D0D] border-[#333333]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                          <SelectItem value="PENDING">
                            <Tag variant="pending" size="sm">
                              A_TRAITER
                            </Tag>
                          </SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            <Tag variant="inprogress" size="sm">
                              EN_REFLEXION
                            </Tag>
                          </SelectItem>
                          <SelectItem value="RESOLVED">
                            <Tag variant="resolved" size="sm">
                              RESOLUE
                            </Tag>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              className="border-[#333333] bg-transparent hover:bg-[#1e1e1e] text-[#EFEFEF]"
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button
              className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]"
              onClick={handleSave}
              disabled={!title.trim() || !audioFile}
            >
              CREATE_VERSION
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

