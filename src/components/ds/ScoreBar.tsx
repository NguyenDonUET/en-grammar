import { cn } from '@/lib/utils'

interface ScoreBarProps {
  correct: number
  total: number
  className?: string
  label?: string
}

export function ScoreBar({ correct, total, className, label = 'Score' }: ScoreBarProps) {
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">
          {correct} / {total}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${correct} of ${total}`}
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-success-foreground/80 transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
