import { MessageSquare, Check, Clock } from "lucide-react"

interface AnnotationItemProps {
  annotation: {
    id: number
    type: string
    timeMarker: string
    author: string
    content: string
    status: string
  }
}

// Modifier le composant pour ajouter des couleurs aux statuts
export function AnnotationItem({ annotation }: AnnotationItemProps) {
  // Déterminer l'icône et la couleur en fonction du statut
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return { icon: <Clock size={14} />, color: "text-[#FFB800]", bgColor: "bg-[#FFB800]" }
      case "IN_PROGRESS":
        return { icon: <Clock size={14} />, color: "text-[#00A3FF]", bgColor: "bg-[#00A3FF]" }
      case "RESOLVED":
        return { icon: <Check size={14} />, color: "text-[#00FF85]", bgColor: "bg-[#00FF85]" }
      default:
        return { icon: <Clock size={14} />, color: "text-[#FFFFFF]", bgColor: "bg-[#FFFFFF]" }
    }
  }

  const statusInfo = getStatusInfo(annotation.status)

  return (
    <div className="flex items-start gap-3 p-3 border-b border-[#333333] hover:bg-[#0a0a0a] transition-colors">
      <div className="mt-1">
        <div className="w-8 h-8 rounded-full border border-[#333333] flex items-center justify-center">
          <MessageSquare size={16} />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="border border-[#333333] px-1.5 py-0 text-xs">{annotation.timeMarker}</div>
          <span className="text-sm font-medium">{annotation.author}</span>
        </div>

        <p className="text-sm mb-2 glow-text-sm">{annotation.content}</p>

        <div className="flex items-center gap-1 text-xs">
          <div className={`w-2 h-2 rounded-full ${statusInfo.bgColor}`}></div>
          <span className={statusInfo.color}>{annotation.status}</span>
        </div>
      </div>
    </div>
  )
}

