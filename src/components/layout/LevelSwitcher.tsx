import { Link, useLocation } from 'react-router'
import { LEVELS, levelPath } from '@/data/catalog'
import { cn } from '@/lib/utils'

export function LevelSwitcher() {
  const { pathname } = useLocation()

  return (
    <nav aria-label="Proficiency level" className="flex w-full items-center gap-1 sm:w-auto">
      {LEVELS.map((level) => {
        const href = levelPath(level.id)
        const isCurrent = pathname === href || pathname.startsWith(`${href}/`)

        return (
          <Link
            key={level.id}
            to={href}
            aria-current={isCurrent ? 'page' : undefined}
            className={cn(
              'relative flex flex-1 flex-col items-center justify-center rounded-full px-4 py-1.5 text-center transition-colors sm:flex-none',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
              isCurrent
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            <span className="text-sm font-semibold tracking-wide">{level.label}</span>
            <span
              className={cn(
                'hidden text-[10px] leading-tight font-medium sm:block',
                isCurrent ? 'text-primary-foreground/80' : 'text-muted-foreground/80',
              )}
            >
              {level.description}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
