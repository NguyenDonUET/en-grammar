import type { ReactNode } from 'react'
import { AlertTriangle, Lightbulb, Sparkles, Table2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const VARIANTS = {
  hint: {
    wrap: 'bg-hint text-hint-foreground',
    icon: Lightbulb,
    label: 'Helpful hints',
  },
  watchout: {
    wrap: 'bg-watchout text-watchout-foreground',
    icon: AlertTriangle,
    label: 'Watch out',
  },
  formula: {
    wrap: 'bg-formula text-formula-foreground',
    icon: Table2,
    label: 'Form',
  },
  example: {
    wrap: 'bg-example text-example-foreground',
    icon: Sparkles,
    label: 'Example',
  },
} as const

export type CalloutVariant = keyof typeof VARIANTS

interface CalloutProps {
  variant: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

export function Callout({ variant, title, children, className }: CalloutProps) {
  const config = VARIANTS[variant]
  const Icon: LucideIcon = config.icon

  return (
    <aside
      className={cn('rounded-xl p-4 sm:p-5', config.wrap, className)}
      role="note"
    >
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <Icon className="size-5 shrink-0" aria-hidden />
        <span>{title ?? config.label}</span>
      </div>
      <div className="space-y-2 text-sm leading-relaxed sm:text-[0.95rem]">
        {children}
      </div>
    </aside>
  )
}
