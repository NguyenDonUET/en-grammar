import { Feedback } from '@/components/practice/Feedback'
import { ItemShell } from '@/components/practice/item-shell'
import { useExerciseItem } from '@/components/practice/useExerciseItem'
import { Input } from '@/components/ui/input'
import type { ExerciseGroup, ExerciseItem } from '@/types/grammar'

interface Props {
  unitId: string
  group: ExerciseGroup
  item: ExerciseItem
  index: number
  onFocusItem?: (itemId: string) => void
}

export function GapFill({ unitId, group, item, index, onFocusItem }: Props) {
  const { state, correct, setValue, check } = useExerciseItem(unitId, group, item)
  const parts = item.prompt.split('___')

  return (
    <ItemShell index={index} checked={state.checked} correct={correct} onCheck={check}>
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-2 text-[0.975rem] leading-relaxed">
        {parts.map((part, partIndex) => (
          <span key={`${item.id}-part-${partIndex}`} className="contents">
            {part ? <span>{part}</span> : null}
            {partIndex < parts.length - 1 ? (
              <Input
                value={state.value}
                onChange={(event) => setValue(event.target.value)}
                onFocus={() => onFocusItem?.(item.id)}
                aria-label={`Gap ${index}`}
                aria-invalid={state.checked && !correct}
                className="inline-flex h-8 w-40 min-w-[8rem] md:text-sm"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') check()
                }}
              />
            ) : null}
          </span>
        ))}
      </p>
      <Feedback
        checked={state.checked}
        correct={correct}
        expected={item.acceptedAnswers}
        explanation={item.explanation}
      />
    </ItemShell>
  )
}
