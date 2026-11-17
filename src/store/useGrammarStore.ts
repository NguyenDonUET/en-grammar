import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnswersByUnitId, ConceptTab } from '@/types/grammar'

interface GrammarState {
  activeTabByUnit: Record<string, ConceptTab>
  activeExerciseGroupByUnit: Record<string, string>
  answersByUnitId: AnswersByUnitId
  soundEnabled: boolean
  setActiveTab: (unitId: string, tab: ConceptTab) => void
  setActiveExerciseGroup: (unitId: string, groupId: string) => void
  setAnswer: (unitId: string, itemId: string, value: string) => void
  setSelected: (unitId: string, itemId: string, selected: string) => void
  markChecked: (unitId: string, itemId: string, checked: boolean) => void
  checkItems: (unitId: string, itemIds: string[]) => void
  resetUnitAnswers: (unitId: string) => void
  setSoundEnabled: (enabled: boolean) => void
}

export const useGrammarStore = create<GrammarState>()(
  persist(
    (set) => ({
      activeTabByUnit: {},
      activeExerciseGroupByUnit: {},
      answersByUnitId: {},
      soundEnabled: true,
      setActiveTab: (unitId, tab) =>
        set((state) => ({
          activeTabByUnit: { ...state.activeTabByUnit, [unitId]: tab },
        })),
      setActiveExerciseGroup: (unitId, groupId) =>
        set((state) => {
          if (state.activeExerciseGroupByUnit[unitId] === groupId) return state
          return {
            activeExerciseGroupByUnit: {
              ...state.activeExerciseGroupByUnit,
              [unitId]: groupId,
            },
          }
        }),
      setAnswer: (unitId, itemId, value) =>
        set((state) => {
          const unit = state.answersByUnitId[unitId] ?? {}
          const prev = unit[itemId] ?? { value: '', checked: false }
          return {
            answersByUnitId: {
              ...state.answersByUnitId,
              [unitId]: {
                ...unit,
                [itemId]: { ...prev, value, checked: false },
              },
            },
          }
        }),
      setSelected: (unitId, itemId, selected) =>
        set((state) => {
          const unit = state.answersByUnitId[unitId] ?? {}
          const prev = unit[itemId] ?? { value: '', checked: false }
          return {
            answersByUnitId: {
              ...state.answersByUnitId,
              [unitId]: {
                ...unit,
                [itemId]: { ...prev, selected, checked: false },
              },
            },
          }
        }),
      markChecked: (unitId, itemId, checked) =>
        set((state) => {
          const unit = state.answersByUnitId[unitId] ?? {}
          const prev = unit[itemId] ?? { value: '', checked: false }
          return {
            answersByUnitId: {
              ...state.answersByUnitId,
              [unitId]: { ...unit, [itemId]: { ...prev, checked } },
            },
          }
        }),
      checkItems: (unitId, itemIds) =>
        set((state) => {
          const unit = { ...(state.answersByUnitId[unitId] ?? {}) }
          for (const itemId of itemIds) {
            const prev = unit[itemId] ?? { value: '', checked: false }
            unit[itemId] = { ...prev, checked: true }
          }
          return {
            answersByUnitId: {
              ...state.answersByUnitId,
              [unitId]: unit,
            },
          }
        }),
      resetUnitAnswers: (unitId) =>
        set((state) => {
          const next = { ...state.answersByUnitId }
          delete next[unitId]
          return { answersByUnitId: next }
        }),
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
    }),
    {
      name: 'en-grammar-store',
      partialize: (state) => ({
        activeTabByUnit: state.activeTabByUnit,
        activeExerciseGroupByUnit: state.activeExerciseGroupByUnit,
        answersByUnitId: state.answersByUnitId,
        soundEnabled: state.soundEnabled,
      }),
    },
  ),
)
