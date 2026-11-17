import type { GrammarUnit, LevelId, UnitSummary } from '@/types/grammar'
import unit01PresentTenses from '@/data/b1/unit-01-present-tenses.json' with { type: 'json' }

export const LEVELS: { id: LevelId; label: string; description: string }[] = [
  { id: 'b1', label: 'B1', description: 'Intermediate' },
  { id: 'b2', label: 'B2', description: 'Upper-intermediate' },
  { id: 'c1-c2', label: 'C1 & C2', description: 'Advanced' },
]

const units: GrammarUnit[] = [unit01PresentTenses as GrammarUnit]

export function getUnitsByLevel(level: LevelId): UnitSummary[] {
  return units
    .filter((unit) => unit.level === level)
    .map(({ id, level, unitNumber, title, subtitle }) => ({
      id,
      level,
      unitNumber,
      title,
      subtitle,
    }))
}

export function getUnit(level: LevelId, unitId: string): GrammarUnit | undefined {
  return units.find((unit) => unit.level === level && unit.id === unitId)
}

export function isLevelId(value: string | undefined): value is LevelId {
  return value === 'b1' || value === 'b2' || value === 'c1-c2'
}

export function levelPath(level: LevelId) {
  return `/${level}`
}

export function unitPath(level: LevelId, unitId: string) {
  return `/${level}/${unitId}`
}
