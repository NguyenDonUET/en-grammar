import { RichText } from '@/components/ds'
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

export function Rewrite({ unitId, group, item, index }: Props) {
  const { state, correct, setValue, check } = useExerciseItem(unitId, group, item)

  return (
    <ItemShell index={index} checked={state.checked} correct={correct} onCheck={check}>
      <p className="text-[0.975rem] leading-relaxed">
        <RichText text={item.prompt} />
      </p>
      <Input
        value={state.value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Rewrite the sentence"
        aria-label={`Rewrite ${index}`}
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
