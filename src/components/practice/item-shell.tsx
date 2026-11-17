import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ItemShellProps {
  index: number
  checked: boolean
  correct: boolean
  onCheck: () => void
  children: ReactNode
  footer?: ReactNode
}

export function ItemShell({
  index,
  checked,
  correct,
  onCheck,
  children,
  footer,
}: ItemShellProps) {
  return (
    <div
      className={cn(
        'space-y-3 rounded-xl border bg-card p-4 sm:p-5',
        checked && correct && 'border-success-foreground/30 bg-success/40',
        checked && !correct && 'border-incorrect-foreground/30 bg-incorrect/40',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {index}
        </span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          aria-label={`Check item ${index}`}
          onClick={onCheck}
        >
          Check
        </Button>
      </div>
      {children}
      {footer}
    </div>
  )
}
