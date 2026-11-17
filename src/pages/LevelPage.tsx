import { BookMarked } from 'lucide-react'
import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { EmptyState } from '@/components/ds'
import { UnitCard } from '@/components/concept/UnitCard'
import { LEVELS, getUnitsByLevel, isLevelId } from '@/data/catalog'
import type { LevelId } from '@/types/grammar'

export function levelLoader({ params }: LoaderFunctionArgs) {
  if (!isLevelId(params.level)) {
    throw redirect('/b1')
  }

  return { level: params.level }
}

export function LevelPage() {
  const { level } = useLoaderData() as { level: LevelId }
  const meta = LEVELS.find((item) => item.id === level) ?? LEVELS[0]
  const units = getUnitsByLevel(level)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">
          {meta.label} · {meta.description}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Grammar units</h1>
        <p className="max-w-2xl text-muted-foreground">
          Units for {meta.label} only. Completion is saved in this browser as you check
          answers.
        </p>
      </div>

      {units.length === 0 ? (
        <EmptyState
          icon={BookMarked}
          title={`No ${meta.label} units yet`}
          description="Send the next unit images to add content."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {units.map((unit, index) => (
            <UnitCard key={unit.id} unit={unit} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
