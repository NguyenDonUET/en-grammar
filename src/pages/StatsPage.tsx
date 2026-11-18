import { ProgressCircle } from '@/components/stats/ProgressCircle'
import { LEVELS, getFullUnitsByLevel } from '@/data/catalog'
import { scoreUnit } from '@/lib/answers'
import { useGrammarStore } from '@/store/useGrammarStore'
import type { AnswersByUnitId, LevelId } from '@/types/grammar'

function levelCompletionPercent(level: LevelId, answersByUnitId: AnswersByUnitId) {
  const units = getFullUnitsByLevel(level)
  let correct = 0
  let total = 0

  for (const unit of units) {
    const score = scoreUnit(unit.exercises, answersByUnitId[unit.id])
    correct += score.correct
    total += score.total
  }

  return total === 0 ? 0 : Math.round((correct / total) * 100)
}

export function StatsPage() {
  const answersByUnitId = useGrammarStore((s) => s.answersByUnitId)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Stats</h1>
        <p className="max-w-2xl text-muted-foreground">
          Percent of units completed at each level, based on checked practice answers in this
          browser.
        </p>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-10 py-6 sm:gap-16">
        {LEVELS.map((level) => (
          <ProgressCircle
            key={level.id}
            label={level.label}
            percent={levelCompletionPercent(level.id, answersByUnitId)}
          />
        ))}
      </div>
    </div>
  )
}
