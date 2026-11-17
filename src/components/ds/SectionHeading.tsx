import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  ListChecks,
  PencilLine,
  Sparkles,
  Table2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Table2,
  PencilLine,
  ListChecks,
}

interface SectionHeadingProps {
  title: string
  icon?: string
  className?: string
}

export function SectionHeading({ title, icon = 'BookOpen', className }: SectionHeadingProps) {
  const Icon = ICONS[icon] ?? BookOpen

  return (
    <h2
      className={cn(
        'flex items-center gap-2.5 text-xl font-semibold tracking-tight text-foreground',
        className,
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </span>
      {title}
    </h2>
  )
}
