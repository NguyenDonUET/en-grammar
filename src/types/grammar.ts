export type LevelId = 'b1' | 'b2' | 'c1-c2'

export type ConceptTab = 'theory' | 'practice'

export interface FormTableRow {
  person: string
  statement: string
  negative: string
  question: string
}

export interface UseExampleRow {
  use: string
  example: string
}

export type TheoryBlock =
  | { type: 'prose'; text: string }
  | {
      type: 'form-table'
      statementLabel?: string
      negativeLabel?: string
      questionLabel?: string
      rows: FormTableRow[]
    }
  | { type: 'use-examples'; rows: UseExampleRow[] }
  | { type: 'hints'; intro?: string; items: string[] }
  | { type: 'watch-out'; text: string; note?: string }
  | { type: 'word-list'; intro?: string; words: string[] }
  | { type: 'correct-incorrect'; correct: string; incorrect: string }

export interface TheorySection {
  id: string
  title: string
  icon: string
  blocks: TheoryBlock[]
}

export type ExerciseType =
  | 'guided-sentence'
  | 'gap-fill'
  | 'rewrite'
  | 'multiple-choice'
  | 'error-correction'

export interface ExerciseItem {
  id: string
  prompt: string
  options?: string[]
  acceptedAnswers: string[]
  explanation?: string
  /** Verb (or phrase) the learner should click in an error-correction paragraph. */
  targetSpan?: string
}

export interface ExerciseGroup {
  id: string
  type: ExerciseType
  title: string
  instruction: string
  wordBank?: string[]
  /** Shared paragraph for error-correction groups; verbs use `{click:phrase}`. */
  paragraph?: string
  items: ExerciseItem[]
}

export interface GrammarUnit {
  id: string
  level: LevelId
  unitNumber: number
  title: string
  subtitle: string
  theory: TheorySection[]
  exercises: ExerciseGroup[]
}

export interface UnitSummary {
  id: string
  level: LevelId
  unitNumber: number
  title: string
  subtitle: string
}

export interface AnswerState {
  value: string
  checked: boolean
  selected?: string
}

export type AnswersByUnitId = Record<string, Record<string, AnswerState>>
