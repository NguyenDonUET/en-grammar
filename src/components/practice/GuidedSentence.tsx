import { Keyword } from '@/components/ds'
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
}

export function GuidedSentence({ unitId, group, item, index }: Props) {
  const { state, correct, setValue, check } = useExerciseItem(unitId, group, item)
  const chips = item.prompt.split('/').map((part) => part.trim()).filter(Boolean)

  return (
    <ItemShell index={index} checked={state.checked} correct={correct} onCheck={check}>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <Keyword key={chip}>{chip}</Keyword>
        ))}
      </div>
      <Input
        value={state.value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write the full sentence"
        aria-label={`Sentence ${index}`}
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
      />
    </ItemShell>
  )
}
