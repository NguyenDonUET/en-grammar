import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AnswersByUnitId, ConceptTab } from '@/types/grammar'

interface GrammarState {
  activeTabByUnit: Record<string, ConceptTab>
  answersByUnitId: AnswersByUnitId
  soundEnabled: boolean
  setActiveTab: (unitId: string, tab: ConceptTab) => void
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
      answersByUnitId: {},
      soundEnabled: true,
      setActiveTab: (unitId, tab) =>
        set((state) => ({
          activeTabByUnit: { ...state.activeTabByUnit, [unitId]: tab },
        })),
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
        answersByUnitId: state.answersByUnitId,
        soundEnabled: state.soundEnabled,
      }),
    },
  ),
)
