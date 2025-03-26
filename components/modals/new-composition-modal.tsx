"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Music, Upload, Clock, Hash } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewCompositionModalProps {
  onClose: () => void
  onSave?: (data: any) => void
}

export function NewCompositionModal({ onClose, onSave }: NewCompositionModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tempo, setTempo] = useState("")
  const [key, setKey] = useState("")
  const [status, setStatus] = useState("EBAUCHE")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])
  const [image, setImage] = useState<string | null>(null)

  const availableGenres = [
    "ELECTRONIC",
    "AMBIENT",
    "JAZZ",
    "FUSION",
    "POP",
    "ROCK",
    "CLASSICAL",
    "HIP-HOP",
    "R&B",
    "FOLK",
    "COUNTRY",
    "METAL",
  ]

  const availableInstruments = [
    "SYNTH",
    "DRUMS",
    "BASS",
    "GUITAR",
    "PIANO",
    "VOCALS",
    "STRINGS",
    "BRASS",
    "WOODWINDS",
    "PERCUSSION",
    "AMBIENT_TEXTURES",
  ]

  const availableKeys = [
    "C MAJOR",
    "C MINOR",
    "C# MAJOR",
    "C# MINOR",
    "D MAJOR",
    "D MINOR",
    "D# MAJOR",
    "D# MINOR",
    "E MAJOR",
    "E MINOR",
    "F MAJOR",
    "F MINOR",
    "F# MAJOR",
    "F# MINOR",
    "G MAJOR",
    "G MINOR",
    "G# MAJOR",
    "G# MINOR",
    "A MAJOR",
    "A MINOR",
    "A# MAJOR",
    "A# MINOR",
    "B MAJOR",
    "B MINOR",
  ]

  const statusOptions = ["EBAUCHE", "EN_COURS", "A_FINALISER", "TERMINÉ"]

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const toggleInstrument = (instrument: string) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(selectedInstruments.filter((i) => i !== instrument))
    } else {
      setSelectedInstruments([...selectedInstruments, instrument])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        title,
        description,
        tempo,
        key,
        status,
        genres: selectedGenres,
        instruments: selectedInstruments,
        image,
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
            <Music size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold glow-text-sm">NEW_COMPOSITION</h2>
            <p className="text-xs text-[#EFEFEF]">CREATE_YOUR_AUDIO_COMPOSITION</p>
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
              <Label htmlFor="composition-title" className="text-[#EFEFEF]">
                COMPOSITION_TITLE
              </Label>
              <Input
                id="composition-title"
                placeholder="ENTER_COMPOSITION_TITLE"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-tempo" className="text-[#EFEFEF] flex items-center gap-1">
                <Clock size={14} /> TEMPO (BPM)
              </Label>
              <Input
                id="composition-tempo"
                placeholder="e.g. 120"
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-key" className="text-[#EFEFEF] flex items-center gap-1">
                <Hash size={14} /> KEY
              </Label>
              <Select value={key} onValueChange={setKey}>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select key" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {availableKeys.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="composition-status" className="text-[#EFEFEF]">
              STATUS
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">GENRES</Label>
              <Select>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {availableGenres.map((genre) => (
                    <SelectItem key={genre} value={genre.toLowerCase()} onClick={() => toggleGenre(genre)}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGenres.map((genre) => (
                  <div
                    key={genre}
                    className={`border border-[#333333] px-1.5 py-0 text-xs branch-${genre.toLowerCase()} cursor-pointer`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre} <span className="ml-1">×</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#EFEFEF]">INSTRUMENTS</Label>
              <Select>
                <SelectTrigger className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  <SelectValue placeholder="Select instruments" />
                </SelectTrigger>
                <SelectContent className="bg-[#0D0D0D] border-[#333333] text-[#EFEFEF]">
                  {availableInstruments.map((instrument) => (
                    <SelectItem
                      key={instrument}
                      value={instrument.toLowerCase()}
                      onClick={() => toggleInstrument(instrument)}
                    >
                      {instrument}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedInstruments.map((instrument) => (
                  <div
                    key={instrument}
                    className={`border border-[#333333] px-1.5 py-0 text-xs branch-${instrument.toLowerCase().replace("_", "-")} cursor-pointer`}
                    onClick={() => toggleInstrument(instrument)}
                  >
                    {instrument} <span className="ml-1">×</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="composition-description" className="text-[#EFEFEF]">
                DESCRIPTION
              </Label>
              <Textarea
                id="composition-description"
                placeholder="ENTER_COMPOSITION_DESCRIPTION"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-32 bg-[#0D0D0D] border-[#333333] text-[#EFEFEF] focus-visible:ring-[#FFFFFF]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="composition-image" className="text-[#EFEFEF]">
                COMPOSITION_ILLUSTRATION
              </Label>
              <div className="border border-dashed border-[#333333] rounded-md p-4 flex flex-col items-center justify-center h-32">
                {image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Composition"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full bg-[#0D0D0D]"
                      onClick={() => setImage(null)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#EFEFEF]">
                    <Upload size={24} className="mb-2" />
                    <p className="text-xs">DRAG_OR_CLICK_TO_UPLOAD</p>
                    <input
                      type="file"
                      id="composition-image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => document.getElementById("composition-image")?.click()}
                    >
                      BROWSE_FILES
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

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
              disabled={!title.trim()}
            >
              CREATE_COMPOSITION
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

