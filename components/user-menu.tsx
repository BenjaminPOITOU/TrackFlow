"use client"

import { useState, useRef, useEffect } from "react"
import { LogOut, User } from "lucide-react"

interface UserMenuProps {
  onNavigate?: (view: string) => void
}

export function UserMenu({ onNavigate }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleNavigate = (view: string) => {
    if (onNavigate) {
      onNavigate(view)
    }
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
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-[#1e1e1e] p-2 rounded-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 rounded-full border border-[#FFFFFF] flex items-center justify-center">
          <span className="text-xs">US</span>
        </div>
        <div>
          <div className="font-medium">USER_STUDIO</div>
          <div className="text-xs text-[#EFEFEF]">ONLINE_STATUS</div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-[#0D0D0D] border border-[#333333] rounded-md shadow-lg z-50 py-1">
          <div
            className="px-4 py-2 hover:bg-[#1e1e1e] cursor-pointer flex items-center gap-2"
            onClick={() => handleNavigate("SETTINGS")}
          >
            <User size={16} />
            <span>PROFILE</span>
          </div>
          <div className="border-t border-[#333333] my-1"></div>
          <div
            className="px-4 py-2 hover:bg-[#1e1e1e] cursor-pointer flex items-center gap-2 text-[#EF4444]"
            onClick={() => console.log("Logout")}
          >
            <LogOut size={16} />
            <span>LOGOUT</span>
          </div>
        </div>
      )}
    </div>
  )
}

