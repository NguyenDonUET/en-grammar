import type { AnswerState, ExerciseGroup, ExerciseItem } from '@/types/grammar'

export function normalizeAnswer(raw: string): string {
  return raw.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function matchesAccepted(value: string, acceptedAnswers: string[]): boolean {
  const normalized = normalizeAnswer(value)
  if (!normalized) return false
  return acceptedAnswers.some((accepted) => normalizeAnswer(accepted) === normalized)
}

export function isItemCorrect(
  item: ExerciseItem,
  answer: AnswerState | undefined,
  group: ExerciseGroup,
): boolean {
  if (!answer) return false
  if (group.type === 'error-correction' && item.targetSpan) {
    if (answer.selected !== item.targetSpan) return false
  }
  return matchesAccepted(answer.value, item.acceptedAnswers)
}

export function flattenItems(groups: ExerciseGroup[]): ExerciseItem[] {
  return groups.flatMap((group) => group.items)
}

export function scoreUnit(
  groups: ExerciseGroup[],
  answers: Record<string, AnswerState> | undefined,
): { correct: number; total: number } {
  const items = flattenItems(groups)
  const byId = new Map(groups.flatMap((group) => group.items.map((item) => [item.id, group])))
  const correct = items.filter((item) => {
    const group = byId.get(item.id)
    if (!group) return false
    const answer = answers?.[item.id]
    return Boolean(answer?.checked && isItemCorrect(item, answer, group))
  }).length
  return { correct, total: items.length }
}
