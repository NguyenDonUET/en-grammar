import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FormulaBoxProps {
  children: ReactNode
  className?: string
}

export function FormulaBox({ children, className }: FormulaBoxProps) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-xl border border-primary/15 bg-formula p-1 text-formula-foreground',
        className,
      )}
    >
      {children}
    </div>
  )
}
