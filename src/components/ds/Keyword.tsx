import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface KeywordProps {
  children: string
  className?: string
}

export function Keyword({ children, className }: KeywordProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'mx-0.5 align-middle font-medium text-formula-foreground bg-formula border-transparent',
        className,
      )}
    >
      {children}
    </Badge>
  )
}
