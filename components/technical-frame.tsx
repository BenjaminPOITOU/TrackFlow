import type React from "react"
interface TechnicalFrameProps {
  children: React.ReactNode
}

export function TechnicalFrame({ children }: TechnicalFrameProps) {
  return (
    <div className="relative h-full">
      {/* Marqueurs techniques en périphérie - Haut */}
      <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-4 text-xs text-[#EFEFEF]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-[#FFFFFF] flex items-center justify-center">
            <div className="w-1 h-1 bg-[#FFFFFF] rounded-full"></div>
          </div>
          <span>SOUNDFLOW_SYS</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-0.5 h-3 bg-[#FFFFFF]"></div>
            ))}
          </div>
          <div className="border border-[#FFFFFF] rounded-md px-2 py-0.5">HMNRM: 04.2</div>
        </div>
      </div>

      {/* Marqueurs techniques en périphérie - Gauche */}
      <div className="absolute top-0 left-0 bottom-0 w-6 flex flex-col items-center justify-between py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="w-0.5 h-8 bg-[#FFFFFF]"></div>
          <div className="w-2 h-2 rounded-full border border-[#FFFFFF]"></div>
          <div className="w-2 h-2 rounded-full border border-[#FFFFFF]"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-2 h-2 bg-[#FFFFFF] rounded-full"></div>
          <div className="w-0.5 h-16 bg-[#FFFFFF]"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs rotate-90 whitespace-nowrap">{Math.floor(Math.random() * 900) + 100}</div>
          <div className="w-2 h-2 bg-[#FFFFFF] rounded-full"></div>
        </div>
      </div>

      {/* Marqueurs techniques en périphérie - Droite */}
      <div className="absolute top-0 right-0 bottom-0 w-6 flex flex-col items-center justify-between py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs">FW</div>
          <div className="w-6 h-6 border border-[#FFFFFF] rounded-full flex items-center justify-center">
            <div className="w-3 h-3 border border-[#FFFFFF] rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border border-[#FFFFFF] rounded-full flex items-center justify-center">
            <div className="text-xs">+</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs">NIN</div>
          <div className="text-xs">14</div>
        </div>
      </div>

      {/* Marqueurs techniques en périphérie - Bas */}
      <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-between px-12 text-xs text-[#EFEFEF]">
        <div className="flex items-center gap-2">
          <div className="text-xs">PROUDLY CRAFTED BY:</div>
          <div className="text-xs">RHOX [IG HANDLE: @rhox_]</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`w-1 h-${i + 2} bg-[#FFFFFF]`}></div>
            ))}
          </div>
          <div className="border border-[#FFFFFF] rounded-md px-2 py-0.5 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFFFFF] rounded-full"></div>
            <span>005.42 _ESC 32°</span>
          </div>
        </div>
      </div>

      {/* Contenu principal avec padding pour les marqueurs */}
      <div className="h-full overflow-auto p-12">{children}</div>
    </div>
  )
}

