import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { ScoreBar } from '@/components/ds'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUnit, unitPath } from '@/data/catalog'
import { scoreUnit } from '@/lib/answers'
import { useGrammarStore } from '@/store/useGrammarStore'
import type { UnitSummary } from '@/types/grammar'

interface UnitCardProps {
  unit: UnitSummary
  index?: number
}

export function UnitCard({ unit, index = 0 }: UnitCardProps) {
  const answers = useGrammarStore((s) => s.answersByUnitId[unit.id])
  const fullUnit = getUnit(unit.level, unit.id)
  const { correct, total } = fullUnit
    ? scoreUnit(fullUnit.exercises, answers)
    : { correct: 0, total: 0 }
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100)

  return (
    <Link
      to={unitPath(unit.level, unit.id)}
      className="group motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:fill-mode-both block rounded-xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary">Unit {unit.unitNumber}</Badge>
            <span className="text-xs font-medium text-muted-foreground">
              {total === 0 ? 'No practice yet' : `${percent}% complete`}
            </span>
          </div>
          <CardTitle className="text-lg leading-snug">{unit.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{unit.subtitle}</p>
          <div className="flex items-end justify-between gap-4">
            {total > 0 ? (
              <ScoreBar
                correct={correct}
                total={total}
                label="Progress"
                className="min-w-0 flex-1"
              />
            ) : (
              <span />
            )}
            <ArrowRight
              className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
