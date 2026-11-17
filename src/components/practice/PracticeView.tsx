import { useRef } from 'react'
import { RotateCcw } from 'lucide-react'
import { Keyword, ScoreBar, SectionHeading } from '@/components/ds'
import { ErrorCorrectionItem, ErrorCorrectionParagraph } from '@/components/practice/ErrorCorrection'
import { GapFill } from '@/components/practice/GapFill'
import { GuidedSentence } from '@/components/practice/GuidedSentence'
import { MultipleChoice } from '@/components/practice/MultipleChoice'
import { Rewrite } from '@/components/practice/Rewrite'
import { Button } from '@/components/ui/button'
import { flattenItems, scoreUnit } from '@/lib/answers'
import { useGrammarStore } from '@/store/useGrammarStore'
import type { ExerciseGroup, ExerciseType, GrammarUnit } from '@/types/grammar'

interface PracticeViewProps {
  unit: GrammarUnit
}

const GROUP_ICON: Record<ExerciseType, string> = {
  'guided-sentence': 'PencilLine',
  'gap-fill': 'ListChecks',
  rewrite: 'PencilLine',
  'multiple-choice': 'ListChecks',
  'error-correction': 'AlertTriangle',
}

export function PracticeView({ unit }: PracticeViewProps) {
  const answers = useGrammarStore((s) => s.answersByUnitId[unit.id])
  const checkItems = useGrammarStore((s) => s.checkItems)
  const resetUnitAnswers = useGrammarStore((s) => s.resetUnitAnswers)
  const setAnswer = useGrammarStore((s) => s.setAnswer)
  const focusedItemId = useRef<string | null>(null)

  const { correct, total } = scoreUnit(unit.exercises, answers)
  const itemIds = flattenItems(unit.exercises).map((item) => item.id)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
        <ScoreBar correct={correct} total={total} className="sm:min-w-64 sm:flex-1" />
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => checkItems(unit.id, itemIds)}>
            Check all
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => resetUnitAnswers(unit.id)}
          >
            <RotateCcw className="size-4" aria-hidden />
            Reset
          </Button>
        </div>
      </div>

      {unit.exercises.map((group) => (
        <ExerciseGroupView
          key={group.id}
          unitId={unit.id}
          group={group}
          onFocusItem={(itemId) => {
            focusedItemId.current = itemId
          }}
          onWordBank={(word) => {
            const target =
              focusedItemId.current ??
              group.items.find((item) => !(answers?.[item.id]?.value))?.id ??
              group.items[0]?.id
            if (target) setAnswer(unit.id, target, word)
          }}
        />
      ))}
    </div>
  )
}

interface GroupViewProps {
  unitId: string
  group: ExerciseGroup
  onFocusItem: (itemId: string) => void
  onWordBank: (word: string) => void
}

function ExerciseGroupView({ unitId, group, onFocusItem, onWordBank }: GroupViewProps) {
  return (
    <section className="space-y-4">
      <SectionHeading title={group.title} icon={GROUP_ICON[group.type]} />
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {group.instruction}
      </p>

      {group.wordBank && group.wordBank.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {group.wordBank.map((word) => (
            <button key={word} type="button" onClick={() => onWordBank(word)}>
              <Keyword>{word}</Keyword>
            </button>
          ))}
        </div>
      ) : null}

      {group.type === 'error-correction' && group.paragraph ? (
        <ErrorCorrectionParagraph unitId={unitId} group={group} />
      ) : null}

      <div className="space-y-3">
        {group.items.map((item, index) => {
          const n = index + 1
          switch (group.type) {
            case 'guided-sentence':
              return (
                <GuidedSentence
                  key={item.id}
                  unitId={unitId}
                  group={group}
                  item={item}
                  index={n}
                />
              )
            case 'gap-fill':
              return (
                <GapFill
                  key={item.id}
                  unitId={unitId}
                  group={group}
                  item={item}
                  index={n}
                  onFocusItem={onFocusItem}
                />
              )
            case 'rewrite':
              return (
                <Rewrite
                  key={item.id}
                  unitId={unitId}
                  group={group}
                  item={item}
                  index={n}
                />
              )
            case 'multiple-choice':
              return (
                <MultipleChoice
                  key={item.id}
                  unitId={unitId}
                  group={group}
                  item={item}
                  index={n}
                />
              )
            case 'error-correction':
              return (
                <ErrorCorrectionItem
                  key={item.id}
                  unitId={unitId}
                  group={group}
                  item={item}
                  index={n}
                />
              )
            default:
              return null
          }
        })}
      </div>
    </section>
  )
}
