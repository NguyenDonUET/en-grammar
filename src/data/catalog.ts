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
import unit22ModalPerfect from '@/data/b1/unit-22-modal-perfect.json' with { type: 'json' }
import unit23Questions from '@/data/b1/unit-23-questions.json' with { type: 'json' }
import unit25SoSuchTooEnough from '@/data/b1/unit-25-so-such-too-enough.json' with { type: 'json' }
import unit26Comparatives from '@/data/b1/unit-26-comparatives.json' with { type: 'json' }
import unit28Conditionals1 from '@/data/b1/unit-28-conditionals-1.json' with { type: 'json' }
import unit29Conditionals2 from '@/data/b1/unit-29-conditionals-2.json' with { type: 'json' }
import unit31ReportedSpeech from '@/data/b1/unit-31-reported-speech.json' with { type: 'json' }
import unit32ReportedQuestions from '@/data/b1/unit-32-reported-questions.json' with { type: 'json' }
import unit34DirectIndirectObjects from '@/data/b1/unit-34-direct-indirect-objects.json' with { type: 'json' }
import unit35Wish from '@/data/b1/unit-35-wish.json' with { type: 'json' }
import unit37IngInfinitive from '@/data/b1/unit-37-ing-infinitive.json' with { type: 'json' }
import unit38BothEitherNeither from '@/data/b1/unit-38-both-either-neither.json' with { type: 'json' }
import unit40Connectives from '@/data/b1/unit-40-connectives.json' with { type: 'json' }
import unit41Causative from '@/data/b1/unit-41-causative.json' with { type: 'json' }
import unit01PresentTimeB2 from '@/data/b2/unit-01-present-time.json' with { type: 'json' }
import unit03PastTimeB2 from '@/data/b2/unit-03-past-time.json' with { type: 'json' }
import unit05FutureTimeB2 from '@/data/b2/unit-05-future-time.json' with { type: 'json' }
import unit07ArticlesQuantifiersB2 from '@/data/b2/unit-07-articles-quantifiers.json' with { type: 'json' }
import unit09ConditionalsB2 from '@/data/b2/unit-09-conditionals.json' with { type: 'json' }
import unit11ComparativesB2 from '@/data/b2/unit-11-comparatives.json' with { type: 'json' }
import unit13ModalsB2 from '@/data/b2/unit-13-modals.json' with { type: 'json' }
import unit15PassiveCausativeB2 from '@/data/b2/unit-15-passive-causative.json' with { type: 'json' }
import unit17IngInfinitiveB2 from '@/data/b2/unit-17-ing-infinitive.json' with { type: 'json' }
import unit19QuestionsB2 from '@/data/b2/unit-19-questions.json' with { type: 'json' }
import unit21ReportedSpeechB2 from '@/data/b2/unit-21-reported-speech.json' with { type: 'json' }
import unit23RelativeClausesParticiplesB2 from '@/data/b2/unit-23-relative-clauses-participles.json' with { type: 'json' }
import unit25UnrealPastWishesContrastB2 from '@/data/b2/unit-25-unreal-past-wishes-contrast.json' with { type: 'json' }
import unit27InversionsPossessivesB2 from '@/data/b2/unit-27-inversions-possessives.json' with { type: 'json' }
import unit01PresentTimeC1C2 from '@/data/c1-c2/unit-01-present-time.json' with { type: 'json' }
import unit03PastTimeC1C2 from '@/data/c1-c2/unit-03-past-time.json' with { type: 'json' }
import unit05FutureTimeC1C2 from '@/data/c1-c2/unit-05-future-time.json' with { type: 'json' }
import unit07PassivesCausativesC1C2 from '@/data/c1-c2/unit-07-passives-causatives.json' with { type: 'json' }
import unit09ModalsSemiModalsC1C2 from '@/data/c1-c2/unit-09-modals-semi-modals.json' with { type: 'json' }
import unit11ConditionalsC1C2 from '@/data/c1-c2/unit-11-conditionals.json' with { type: 'json' }
import unit13UnrealTimeC1C2 from '@/data/c1-c2/unit-13-unreal-time.json' with { type: 'json' }
import unit15AdjectivesAdverbsC1C2 from '@/data/c1-c2/unit-15-adjectives-adverbs.json' with { type: 'json' }
import unit17ClausesC1C2 from '@/data/c1-c2/unit-17-clauses.json' with { type: 'json' }
import unit19ComplexSentencesC1C2 from '@/data/c1-c2/unit-19-complex-sentences.json' with { type: 'json' }
import unit21NounPhrasesC1C2 from '@/data/c1-c2/unit-21-noun-phrases.json' with { type: 'json' }
import unit23VerbalComplementsC1C2 from '@/data/c1-c2/unit-23-verbal-complements.json' with { type: 'json' }
import unit25ReportingC1C2 from '@/data/c1-c2/unit-25-reporting.json' with { type: 'json' }

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
  unit22ModalPerfect as GrammarUnit,
  unit23Questions as GrammarUnit,
  unit25SoSuchTooEnough as GrammarUnit,
  unit26Comparatives as GrammarUnit,
  unit28Conditionals1 as GrammarUnit,
  unit29Conditionals2 as GrammarUnit,
  unit31ReportedSpeech as GrammarUnit,
  unit32ReportedQuestions as GrammarUnit,
  unit34DirectIndirectObjects as GrammarUnit,
  unit35Wish as GrammarUnit,
  unit37IngInfinitive as GrammarUnit,
  unit38BothEitherNeither as GrammarUnit,
  unit40Connectives as GrammarUnit,
  unit41Causative as GrammarUnit,
  unit01PresentTimeB2 as GrammarUnit,
  unit03PastTimeB2 as GrammarUnit,
  unit05FutureTimeB2 as GrammarUnit,
  unit07ArticlesQuantifiersB2 as GrammarUnit,
  unit09ConditionalsB2 as GrammarUnit,
  unit11ComparativesB2 as GrammarUnit,
  unit13ModalsB2 as GrammarUnit,
  unit15PassiveCausativeB2 as GrammarUnit,
  unit17IngInfinitiveB2 as GrammarUnit,
  unit19QuestionsB2 as GrammarUnit,
  unit21ReportedSpeechB2 as GrammarUnit,
  unit23RelativeClausesParticiplesB2 as GrammarUnit,
  unit25UnrealPastWishesContrastB2 as GrammarUnit,
  unit27InversionsPossessivesB2 as GrammarUnit,
  unit01PresentTimeC1C2 as GrammarUnit,
  unit03PastTimeC1C2 as GrammarUnit,
  unit05FutureTimeC1C2 as GrammarUnit,
  unit07PassivesCausativesC1C2 as GrammarUnit,
  unit09ModalsSemiModalsC1C2 as GrammarUnit,
  unit11ConditionalsC1C2 as GrammarUnit,
  unit13UnrealTimeC1C2 as GrammarUnit,
  unit15AdjectivesAdverbsC1C2 as GrammarUnit,
  unit17ClausesC1C2 as GrammarUnit,
  unit19ComplexSentencesC1C2 as GrammarUnit,
  unit21NounPhrasesC1C2 as GrammarUnit,
  unit23VerbalComplementsC1C2 as GrammarUnit,
  unit25ReportingC1C2 as GrammarUnit,
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
