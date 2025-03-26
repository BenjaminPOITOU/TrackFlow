import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset", {
  variants: {
    variant: {
      default: "bg-[#1e1e1e] text-[#EFEFEF] ring-[#333333]",
      electronic: "bg-[#6366F1] text-white ring-[#4F46E5]",
      ambient: "bg-[#10B981] text-white ring-[#059669]",
      jazz: "bg-[#8B5CF6] text-white ring-[#7C3AED]",
      rock: "bg-[#EF4444] text-white ring-[#DC2626]",
      pop: "bg-[#F59E0B] text-black ring-[#D97706]",
      classical: "bg-[#3B82F6] text-white ring-[#2563EB]",
      hiphop: "bg-[#EC4899] text-white ring-[#DB2777]",
      rnb: "bg-[#06B6D4] text-white ring-[#0891B2]",
      folk: "bg-[#F97316] text-white ring-[#EA580C]",
      country: "bg-[#84CC16] text-black ring-[#65A30D]",
      metal: "bg-[#475569] text-white ring-[#334155]",
      // Instruments
      synth: "bg-[#6366F1] text-white ring-[#4F46E5]",
      drums: "bg-[#F97316] text-white ring-[#EA580C]",
      bass: "bg-[#3B82F6] text-white ring-[#2563EB]",
      guitar: "bg-[#F59E0B] text-black ring-[#D97706]",
      piano: "bg-[#8B5CF6] text-white ring-[#7C3AED]",
      vocals: "bg-[#EF4444] text-white ring-[#DC2626]",
      strings: "bg-[#06B6D4] text-white ring-[#0891B2]",
      brass: "bg-[#EC4899] text-white ring-[#DB2777]",
      woodwinds: "bg-[#84CC16] text-black ring-[#65A30D]",
      percussion: "bg-[#F97316] text-white ring-[#EA580C]",
      ambient_textures: "bg-[#10B981] text-white ring-[#059669]",
      // Branches
      main: "bg-[#3B82F6] text-white ring-[#2563EB]",
      dev: "bg-[#8B5CF6] text-white ring-[#7C3AED]",
      feature: "bg-[#10B981] text-white ring-[#059669]",
      hotfix: "bg-[#EF4444] text-white ring-[#DC2626]",
      release: "bg-[#F59E0B] text-black ring-[#D97706]",
      // Status
      pending: "bg-[#F59E0B] text-black ring-[#D97706]",
      inprogress: "bg-[#3B82F6] text-white ring-[#2563EB]",
      resolved: "bg-[#10B981] text-white ring-[#059669]",
      rejected: "bg-[#EF4444] text-white ring-[#DC2626]",
    },
    size: {
      default: "text-xs",
      sm: "text-[10px]",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface TagProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tagVariants> {}

export function Tag({ className, variant, size, ...props }: TagProps) {
  return <div className={cn(tagVariants({ variant, size }), className)} {...props} />
}

