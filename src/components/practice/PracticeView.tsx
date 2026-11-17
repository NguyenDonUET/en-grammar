import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { CompleteBurst, Keyword, ScoreBar, SectionHeading } from '@/components/ds'
import { ErrorCorrectionItem, ErrorCorrectionParagraph } from '@/components/practice/ErrorCorrection'
import { GapFill } from '@/components/practice/GapFill'
import { GuidedSentence } from '@/components/practice/GuidedSentence'
import { MultipleChoice } from '@/components/practice/MultipleChoice'
import { Rewrite } from '@/components/practice/Rewrite'
import { Button } from '@/components/ui/button'
import { flattenItems, scoreUnit } from '@/lib/answers'
import { exerciseGroupElementId } from '@/lib/exercise-groups'
import { prefersReducedMotion } from '@/lib/motion'
import { playCue } from '@/lib/sound'
import { cn } from '@/lib/utils'
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

function scrollToGroup(groupId: string) {
  document.getElementById(exerciseGroupElementId(groupId))?.scrollIntoView({
    block: 'start',
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

export function PracticeView({ unit }: PracticeViewProps) {
  const answers = useGrammarStore((s) => s.answersByUnitId[unit.id])
  const checkItems = useGrammarStore((s) => s.checkItems)
  const resetUnitAnswers = useGrammarStore((s) => s.resetUnitAnswers)
  const setAnswer = useGrammarStore((s) => s.setAnswer)
  const activeGroupId = useGrammarStore((s) => s.activeExerciseGroupByUnit[unit.id])
  const setActiveExerciseGroup = useGrammarStore((s) => s.setActiveExerciseGroup)
  const focusedItemId = useRef<string | null>(null)
  const restoredForUnit = useRef<string | null>(null)
  const prevCorrect = useRef<number | null>(null)
  const [showBurst, setShowBurst] = useState(false)

  const { correct, total } = scoreUnit(unit.exercises, answers)
  const itemIds = flattenItems(unit.exercises).map((item) => item.id)
  const currentGroupId = activeGroupId ?? unit.exercises[0]?.id
  const isComplete = total > 0 && correct === total

  useEffect(() => {
    if (!activeGroupId) return
    if (restoredForUnit.current === unit.id) return
    restoredForUnit.current = unit.id
    scrollToGroup(activeGroupId)
  }, [activeGroupId, unit.id])

  useEffect(() => {
    if (prevCorrect.current === null) {
      prevCorrect.current = correct
      return
    }
    if (isComplete && prevCorrect.current < total) {
      window.setTimeout(() => playCue('complete'), 160)
      setShowBurst(true)
    }
    if (!isComplete) setShowBurst(false)
    prevCorrect.current = correct
  }, [correct, isComplete, total])

  function handleCheckAll() {
    checkItems(unit.id, itemIds)
    const next = useGrammarStore.getState().answersByUnitId[unit.id]
    const scored = scoreUnit(unit.exercises, next)
    if (!(scored.total > 0 && scored.correct === scored.total)) {
      playCue('incorrect')
    }
  }

  function handleReset() {
    resetUnitAnswers(unit.id)
    setShowBurst(false)
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-[var(--header-offset)] z-10 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-end">
            <ScoreBar correct={correct} total={total} className="sm:min-w-64 sm:flex-1" />
            {isComplete ? <CompleteBurst animated={showBurst} /> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={handleCheckAll}>
              Check all
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="size-4" aria-hidden />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {unit.exercises.length > 1 ? (
        <nav aria-label="Exercise groups" className="flex flex-wrap gap-2">
          {unit.exercises.map((group) => {
            const isCurrent = group.id === currentGroupId
            return (
              <Button
                key={group.id}
                type="button"
                size="sm"
                variant={isCurrent ? 'default' : 'outline'}
                aria-current={isCurrent ? 'true' : undefined}
                onClick={() => {
                  setActiveExerciseGroup(unit.id, group.id)
                  scrollToGroup(group.id)
                }}
              >
                {group.title}
              </Button>
            )
          })}
        </nav>
      ) : null}

      {unit.exercises.map((group) => (
        <ExerciseGroupView
          key={group.id}
          unitId={unit.id}
          group={group}
          isCurrent={group.id === currentGroupId}
          onActivateGroup={() => setActiveExerciseGroup(unit.id, group.id)}
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
  isCurrent: boolean
  onActivateGroup: () => void
  onFocusItem: (itemId: string) => void
  onWordBank: (word: string) => void
}

function ExerciseGroupView({
  unitId,
  group,
  isCurrent,
  onActivateGroup,
  onFocusItem,
  onWordBank,
}: GroupViewProps) {
  return (
    <section
      id={exerciseGroupElementId(group.id)}
      className={cn(
        'scroll-mt-[calc(var(--header-offset)+6.5rem)] space-y-4 rounded-xl',
        isCurrent && 'ring-offset-background',
      )}
      onFocusCapture={onActivateGroup}
    >
      <SectionHeading title={group.title} icon={GROUP_ICON[group.type]} />
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {group.instruction}
      </p>

      {group.wordBank && group.wordBank.length > 0 ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Word bank">
          {group.wordBank.map((word) => (
            <button
              key={word}
              type="button"
              aria-label={`Insert ${word} into the focused gap`}
              className="rounded-md focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              onClick={() => onWordBank(word)}
            >
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
