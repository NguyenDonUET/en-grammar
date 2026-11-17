import { cn } from '@/lib/utils'

interface ScoreBarProps {
  correct: number
  total: number
  className?: string
}

export function ScoreBar({ correct, total, className }: ScoreBarProps) {
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Score</span>
        <span className="text-muted-foreground">
          {correct} / {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-success-foreground/80 transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
