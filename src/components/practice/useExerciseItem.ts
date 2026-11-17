import { isItemCorrect } from '@/lib/answers'
import { playCue } from '@/lib/sound'
import { useGrammarStore } from '@/store/useGrammarStore'
import type { AnswerState, ExerciseGroup, ExerciseItem } from '@/types/grammar'

export function useExerciseItem(unitId: string, group: ExerciseGroup, item: ExerciseItem) {
  const answer = useGrammarStore((s) => s.answersByUnitId[unitId]?.[item.id])
  const setAnswer = useGrammarStore((s) => s.setAnswer)
  const setSelected = useGrammarStore((s) => s.setSelected)
  const markChecked = useGrammarStore((s) => s.markChecked)

  const state: AnswerState = answer ?? { value: '', checked: false }
  const correct = isItemCorrect(item, state, group)

  return {
    state,
    correct,
    setValue: (value: string) => setAnswer(unitId, item.id, value),
    setSelectedSpan: (selected: string) => setSelected(unitId, item.id, selected),
    check: () => {
      markChecked(unitId, item.id, true)
      playCue(correct ? 'correct' : 'incorrect')
    },
  }
}
