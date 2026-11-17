import { BookOpen, PencilLine } from 'lucide-react'
import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router'
import { EmptyState } from '@/components/ds'
import { ConceptHeader } from '@/components/concept/ConceptHeader'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { PracticeView } from '@/components/practice/PracticeView'
import { TheoryView } from '@/components/theory/TheoryView'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getUnit, isLevelId, levelPath } from '@/data/catalog'
import { useGrammarStore } from '@/store/useGrammarStore'
import type { ConceptTab, GrammarUnit } from '@/types/grammar'

export function conceptLoader({ params }: LoaderFunctionArgs) {
  const { level, unitId } = params
  if (!isLevelId(level) || !unitId) {
    throw redirect('/b1')
  }

  const unit = getUnit(level, unitId)
  if (!unit) {
    throw redirect(levelPath(level))
  }

  return { unit }
}

export function ConceptPage() {
  const { unit } = useLoaderData() as { unit: GrammarUnit }
  const activeTabByUnit = useGrammarStore((s) => s.activeTabByUnit)
  const setActiveTab = useGrammarStore((s) => s.setActiveTab)

  const tab: ConceptTab = activeTabByUnit[unit.id] ?? 'theory'

  return (
    <div className="space-y-8">
      <ScrollToTop />
      <ConceptHeader unit={unit} />
      <Tabs
        value={tab}
        onValueChange={(value) => setActiveTab(unit.id, value as ConceptTab)}
        className="gap-6"
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="theory" className="gap-2 px-4">
            <BookOpen className="size-4" aria-hidden />
            Lý thuyết
          </TabsTrigger>
          <TabsTrigger value="practice" className="gap-2 px-4">
            <PencilLine className="size-4" aria-hidden />
            Bài tập
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="theory"
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200"
        >
          <TheoryView sections={unit.theory} />
        </TabsContent>
        <TabsContent
          value="practice"
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200"
        >
          {unit.exercises.length > 0 ? (
            <PracticeView key={unit.id} unit={unit} />
          ) : (
            <EmptyState
              icon={PencilLine}
              title="No exercises yet"
              description="Practice items for this unit will appear here once they are added to the JSON."
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
