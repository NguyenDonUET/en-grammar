import { Feedback } from '@/components/practice/Feedback'
import { ItemShell } from '@/components/practice/item-shell'
import { useExerciseItem } from '@/components/practice/useExerciseItem'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useGrammarStore } from '@/store/useGrammarStore'
import type { ExerciseGroup, ExerciseItem } from '@/types/grammar'

const CLICK_TOKEN = /(\{click:[^}]+\})/g

interface GroupProps {
  unitId: string
  group: ExerciseGroup
}

export function ErrorCorrectionParagraph({ unitId, group }: GroupProps) {
  const answers = useGrammarStore((s) => s.answersByUnitId[unitId])
  const setSelected = useGrammarStore((s) => s.setSelected)
  const text = group.paragraph ?? ''
  const selectedSet = new Set(
    Object.values(answers ?? {})
      .map((answer) => answer.selected)
      .filter(Boolean),
  )

  const parts = text.split(CLICK_TOKEN)

  return (
    <p className="rounded-xl border bg-example/50 p-4 text-[0.975rem] leading-relaxed text-example-foreground sm:p-5">
      {parts.map((part, index) => {
        const match = /^\{click:([^}]+)\}$/.exec(part)
        if (!match) {
          return <span key={`t-${index}`}>{part}</span>
        }

        const span = match[1]
        const item = group.items.find((entry) => entry.targetSpan === span)
        const isSelected = selectedSet.has(span)

        return (
          <button
            key={`c-${span}-${index}`}
            type="button"
            className={cn(
              'rounded-sm px-0.5 font-medium underline decoration-dotted underline-offset-4',
              'hover:bg-highlight hover:text-highlight-foreground',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
              isSelected && 'bg-highlight text-highlight-foreground no-underline',
            )}
            onClick={() => {
              if (item) setSelected(unitId, item.id, span)
            }}
          >
            {span}
          </button>
        )
      })}
    </p>
  )
}

interface ItemProps {
  unitId: string
  group: ExerciseGroup
  item: ExerciseItem
  index: number
}

export function ErrorCorrectionItem({ unitId, group, item, index }: ItemProps) {
  const { state, correct, setValue, check } = useExerciseItem(unitId, group, item)
  const selectedOk = Boolean(item.targetSpan && state.selected === item.targetSpan)

  return (
    <ItemShell index={index} checked={state.checked} correct={correct} onCheck={check}>
      <p className="text-sm text-muted-foreground">
        {item.prompt}
        {state.selected ? (
          <>
            {' '}
            · selected <span className="font-medium text-foreground">{state.selected}</span>
          </>
        ) : (
          ' · tap a verb in the paragraph first'
        )}
      </p>
      <Input
        value={state.value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Correct form"
        aria-label={`Correction ${index}`}
        aria-invalid={state.checked && !correct}
        onKeyDown={(event) => {
          if (event.key === 'Enter') check()
        }}
      />
      <Feedback
        checked={state.checked}
        correct={correct}
        expected={item.acceptedAnswers}
        explanation={item.explanation}
        hint={
          state.checked && !selectedOk
            ? `Select “${item.targetSpan}” in the paragraph.`
            : undefined
        }
      />
    </ItemShell>
  )
}
