import { RichText } from '@/components/ds'
import { Feedback } from '@/components/practice/Feedback'
import { ItemShell } from '@/components/practice/item-shell'
import { useExerciseItem } from '@/components/practice/useExerciseItem'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { ExerciseGroup, ExerciseItem } from '@/types/grammar'

interface Props {
  unitId: string
  group: ExerciseGroup
  item: ExerciseItem
  index: number
}

export function MultipleChoice({ unitId, group, item, index }: Props) {
  const { state, correct, setValue, check } = useExerciseItem(unitId, group, item)
  const options = item.options ?? []

  return (
    <ItemShell index={index} checked={state.checked} correct={correct} onCheck={check}>
      <p className="text-[0.975rem] leading-relaxed">
        <RichText text={item.prompt} />
      </p>
      <RadioGroup
        value={state.value}
        onValueChange={setValue}
        className="gap-2"
        aria-label={`Options for item ${index}`}
      >
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-lg border bg-background px-3 py-2 text-sm has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50"
          >
            <RadioGroupItem value={option} />
            <span>{option}</span>
          </label>
        ))}
      </RadioGroup>
      <Feedback
        checked={state.checked}
        correct={correct}
        expected={item.acceptedAnswers}
        explanation={item.explanation}
      />
    </ItemShell>
  )
}
