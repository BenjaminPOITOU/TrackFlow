"use client"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal, Archive, Copy, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectMenuProps {
  onArchive?: () => void
  onDuplicate?: () => void
  onDelete?: () => void
}

export function ProjectMenu({ onArchive, onDuplicate, onDelete }: ProjectMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleAction = (action: () => void | undefined) => {
    if (action) action()
    setIsOpen(false)
  }

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-[#1e1e1e]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontal size={16} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-1 bg-[#0D0D0D] border border-[#333333] rounded-md shadow-lg z-50 py-1 w-32">
          <button
            className="w-full text-left px-3 py-2 hover:bg-[#1e1e1e] flex items-center gap-2"
            onClick={() => handleAction(onDuplicate)}
          >
            <Copy size={14} />
            <span className="text-sm">DUPLICATE</span>
          </button>
          <button
            className="w-full text-left px-3 py-2 hover:bg-[#1e1e1e] flex items-center gap-2"
            onClick={() => handleAction(onArchive)}
          >
            <Archive size={14} />
            <span className="text-sm">ARCHIVE</span>
          </button>
          <button
            className="w-full text-left px-3 py-2 hover:bg-[#1e1e1e] flex items-center gap-2 text-[#EF4444]"
            onClick={() => handleAction(onDelete)}
          >
            <Trash2 size={14} />
            <span className="text-sm">DELETE</span>
          </button>
        </div>
      )}
    </div>
  )
}

