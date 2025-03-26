"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Play, Clock, Music, MoreHorizontal } from "lucide-react"
import { MiniVisualizer } from "@/components/mini-visualizer"

interface PlaylistTrack {
  id: number
  title: string
  artist: string
  duration: string
  added: string
}

interface Playlist {
  id: number
  title: string
  trackCount: number
  duration: string
  lastUpdated: string
}

export function PlaylistView() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(1)

  // Données fictives pour la démo
  const playlists: Playlist[] = [
    { id: 1, title: "INSPIRATION_AMBIENT", trackCount: 12, duration: "48:32", lastUpdated: "2D_AGO" },
    { id: 2, title: "REFERENCE_TRACKS", trackCount: 8, duration: "32:15", lastUpdated: "1W_AGO" },
    { id: 3, title: "PRODUCTION_TECHNIQUES", trackCount: 15, duration: "62:47", lastUpdated: "2W_AGO" },
    { id: 4, title: "SOUND_DESIGN_IDEAS", trackCount: 10, duration: "41:20", lastUpdated: "1M_AGO" },
  ]

  const playlistTracks: PlaylistTrack[] = [
    { id: 1, title: "AMBIENT_TEXTURE_01", artist: "ARTIST_A", duration: "4:32", added: "24/03/2025" },
    { id: 2, title: "DRONE_SEQUENCE", artist: "ARTIST_B", duration: "6:18", added: "23/03/2025" },
    { id: 3, title: "FIELD_RECORDING_PROCESSED", artist: "ARTIST_C", duration: "3:45", added: "22/03/2025" },
    { id: 4, title: "GENERATIVE_PATTERN", artist: "ARTIST_A", duration: "5:21", added: "21/03/2025" },
    { id: 5, title: "GRANULAR_SYNTHESIS_DEMO", artist: "ARTIST_D", duration: "4:12", added: "20/03/2025" },
    { id: 6, title: "MODULAR_SEQUENCE_03", artist: "ARTIST_B", duration: "7:05", added: "19/03/2025" },
    { id: 7, title: "REVERB_EXPERIMENT", artist: "ARTIST_C", duration: "3:58", added: "18/03/2025" },
    { id: 8, title: "SPATIAL_AUDIO_TEST", artist: "ARTIST_D", duration: "5:42", added: "17/03/2025" },
  ]

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center relative">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text">PLAYLIST_SYS</h1>
          <p className="text-[#EFEFEF]">ORGANIZE_AND_DISCOVER_AUDIO</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-transparent border border-[#FFFFFF] hover:bg-[#1e1e1e] text-[#FFFFFF] glow-button">
            <Plus className="mr-2 h-4 w-4" /> NEW_PLAYLIST
          </Button>

          {/* Mini visualiseur dans le coin */}
          <div className="w-8 h-8">
            <MiniVisualizer type="circles" />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Liste des playlists */}
        <div className="w-full md:w-64 space-y-4">
          <div className="p-4 bg-[#0D0D0D] border border-[#333333] rounded-lg">
            <h2 className="text-lg font-medium mb-4 glow-text-sm">YOUR_PLAYLISTS</h2>
            <div className="space-y-2">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedPlaylist === playlist.id
                      ? "bg-[#1e1e1e] border border-[#FFFFFF] glow-card"
                      : "hover:bg-[#1e1e1e]"
                  }`}
                  onClick={() => setSelectedPlaylist(playlist.id)}
                >
                  <div className="font-medium">{playlist.title}</div>
                  <div className="flex items-center justify-between text-xs text-[#EFEFEF]">
                    <span>{playlist.trackCount} TRACKS</span>
                    <span>{playlist.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Détails de la playlist */}
        <div className="flex-1">
          <div className="p-4 bg-[#0D0D0D] border border-[#333333] rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-medium glow-text-sm">
                  {playlists.find((p) => p.id === selectedPlaylist)?.title || "SELECT_PLAYLIST"}
                </h2>
                <p className="text-sm text-[#EFEFEF]">
                  {playlists.find((p) => p.id === selectedPlaylist)?.trackCount || 0} TRACKS •{" "}
                  {playlists.find((p) => p.id === selectedPlaylist)?.duration || "00:00"}
                </p>
              </div>
              <Button className="bg-[#FFFFFF] text-[#0D0D0D] hover:bg-[#EFEFEF]">
                <Play className="mr-2 h-4 w-4" /> PLAY_ALL
              </Button>
            </div>

            {/* En-tête du tableau */}
            <div className="grid grid-cols-12 gap-4 py-2 border-b border-[#333333] text-xs text-[#EFEFEF] uppercase">
              <div className="col-span-1">#</div>
              <div className="col-span-5">TITLE</div>
              <div className="col-span-3">ARTIST</div>
              <div className="col-span-2 flex items-center">
                <Clock size={14} />
              </div>
              <div className="col-span-1"></div>
            </div>

            {/* Liste des pistes */}
            <div className="space-y-1 mt-2">
              {playlistTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="grid grid-cols-12 gap-4 py-3 hover:bg-[#1e1e1e] rounded-md transition-colors"
                >
                  <div className="col-span-1 flex items-center text-[#EFEFEF]">{index + 1}</div>
                  <div className="col-span-5 flex items-center gap-2">
                    <Music size={16} className="text-[#EFEFEF]" />
                    <span>{track.title}</span>
                  </div>
                  <div className="col-span-3 flex items-center text-[#EFEFEF]">{track.artist}</div>
                  <div className="col-span-2 flex items-center text-[#EFEFEF]">{track.duration}</div>
                  <div className="col-span-1 flex items-center justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

