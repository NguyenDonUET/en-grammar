import type { CSSProperties } from 'react'
import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

const DOTS = [
  { x: '-1.6rem', y: '-1.2rem' },
  { x: '1.8rem', y: '-1.4rem' },
  { x: '2.1rem', y: '0.4rem' },
  { x: '-2rem', y: '0.6rem' },
  { x: '0.2rem', y: '-1.8rem' },
  { x: '1.2rem', y: '1.4rem' },
]

interface CompleteBurstProps {
  className?: string
  animated?: boolean
}

export function CompleteBurst({ className, animated = false }: CompleteBurstProps) {
  const reduceMotion = usePrefersReducedMotion()
  const showDots = animated && !reduceMotion

  return (
    <div className={cn('relative inline-flex', className)}>
      <Badge className={cn('gap-1.5', animated && 'motion-safe:animate-pop')}>
        <Sparkles className="size-3.5" aria-hidden />
        Unit complete
      </Badge>
      {showDots
        ? DOTS.map((dot) => (
            <span
              key={`${dot.x}-${dot.y}`}
              aria-hidden
              className="animate-burst pointer-events-none absolute top-1/2 left-1/2 size-1.5 rounded-full bg-highlight-foreground"
              style={
                {
                  '--burst-x': dot.x,
                  '--burst-y': dot.y,
                } as CSSProperties
              }
            />
          ))
        : null}
    </div>
  )
}
