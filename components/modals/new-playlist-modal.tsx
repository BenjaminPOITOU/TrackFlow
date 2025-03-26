"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { X } from "lucide-react"

interface NewPlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePlaylist: (data: { title: string; description: string }) => void
}

export function NewPlaylistModal({ isOpen, onClose, onCreatePlaylist }: NewPlaylistModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreatePlaylist({ title, description })
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#0D0D0D] border border-[#333333] text-[#EFEFEF] sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold tracking-tight glow-text">NEW_PLAYLIST</DialogTitle>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6">
                <MiniVisualizer type="circles" />
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full">
                <X size={16} />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-title" className="text-[#EFEFEF]">
                PLAYLIST_TITLE
              </Label>
              <Input
                id="playlist-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
                placeholder="ENTER_PLAYLIST_TITLE"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playlist-description" className="text-[#EFEFEF]">
                DESCRIPTION
              </Label>
              <textarea
                id="playlist-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-24 px-3 py-2 bg-[#0D0D0D] border border-[#333333] rounded-md text-[#EFEFEF] focus:outline-none focus:ring-2 focus:ring-[#FFFFFF]"
                placeholder="ENTER_PLAYLIST_DESCRIPTION"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={onClose}
              className="bg-transparent border border-[#333333] hover:bg-[#1e1e1e] text-[#EFEFEF]"
            >
              CANCEL
            </Button>
            <Button type="submit" className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]">
              CREATE_PLAYLIST
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

