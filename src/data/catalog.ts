import type { GrammarUnit, LevelId, UnitSummary } from '@/types/grammar'
import unit01PresentTenses from '@/data/b1/unit-01-present-tenses.json' with { type: 'json' }
import unit02PastTenses from '@/data/b1/unit-02-past-tenses.json' with { type: 'json' }
import unit04PresentPerfect from '@/data/b1/unit-04-present-perfect.json' with { type: 'json' }
import unit05PastPerfect from '@/data/b1/unit-05-past-perfect.json' with { type: 'json' }
import unit07FutureTime from '@/data/b1/unit-07-future-time.json' with { type: 'json' }
import unit08Prepositions from '@/data/b1/unit-08-prepositions.json' with { type: 'json' }
import unit10Passive1 from '@/data/b1/unit-10-passive-1.json' with { type: 'json' }
import unit11Passive2 from '@/data/b1/unit-11-passive-2.json' with { type: 'json' }
import unit13CountableUncountable from '@/data/b1/unit-13-countable-uncountable.json' with { type: 'json' }
import unit14Articles from '@/data/b1/unit-14-articles.json' with { type: 'json' }
import unit16Pronouns from '@/data/b1/unit-16-pronouns.json' with { type: 'json' }
import unit17RelativeClauses from '@/data/b1/unit-17-relative-clauses.json' with { type: 'json' }
import unit19Modals1 from '@/data/b1/unit-19-modals-1.json' with { type: 'json' }
import unit20Modals2 from '@/data/b1/unit-20-modals-2.json' with { type: 'json' }

export const LEVELS: { id: LevelId; label: string; description: string }[] = [
  { id: 'b1', label: 'B1', description: 'Intermediate' },
  { id: 'b2', label: 'B2', description: 'Upper-intermediate' },
  { id: 'c1-c2', label: 'C1 & C2', description: 'Advanced' },
]

// Register each new JSON file here. Schema: src/data/README.md
const units: GrammarUnit[] = [
  unit01PresentTenses as GrammarUnit,
  unit02PastTenses as GrammarUnit,
  unit04PresentPerfect as GrammarUnit,
  unit05PastPerfect as GrammarUnit,
  unit07FutureTime as GrammarUnit,
  unit08Prepositions as GrammarUnit,
  unit10Passive1 as GrammarUnit,
  unit11Passive2 as GrammarUnit,
  unit13CountableUncountable as GrammarUnit,
  unit14Articles as GrammarUnit,
  unit16Pronouns as GrammarUnit,
  unit17RelativeClauses as GrammarUnit,
  unit19Modals1 as GrammarUnit,
  unit20Modals2 as GrammarUnit,
]

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
