import {
  Callout,
  ExampleRow,
  FormulaBox,
  Keyword,
  RichText,
  SectionHeading,
} from '@/components/ds'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { TheoryBlock, TheorySection } from '@/types/grammar'

interface TheoryViewProps {
  sections: TheorySection[]
}

export function TheoryView({ sections }: TheoryViewProps) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <article key={section.id} className="space-y-4">
          <SectionHeading title={section.title} icon={section.icon} />
          {section.blocks.map((block, index) => (
            <TheoryBlockView
              key={`${section.id}-${block.type}-${index}`}
              block={block}
            />
          ))}
        </article>
      ))}
    </div>
  )
}

function TheoryBlockView({ block }: { block: TheoryBlock }) {
  switch (block.type) {
    case 'prose':
      return (
        <p className="max-w-3xl text-[0.975rem] leading-relaxed text-muted-foreground">
          <RichText text={block.text} />
        </p>
      )
    case 'form-table':
      return (
        <FormulaBox>
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <caption className="sr-only">Form table</caption>
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wide opacity-80">
                <th className="px-4 py-3">Form</th>
                <th className="px-4 py-3">{block.statementLabel ?? 'Statement'}</th>
                <th className="px-4 py-3">{block.negativeLabel ?? 'Negative'}</th>
                <th className="px-4 py-3">{block.questionLabel ?? 'Question'}</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.person} className="border-t border-primary/10">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.person}</td>
                  <td className="px-4 py-3">
                    <RichText text={row.statement} />
                  </td>
                  <td className="px-4 py-3">
                    <RichText text={row.negative} />
                  </td>
                  <td className="px-4 py-3">
                    <RichText text={row.question} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FormulaBox>
      )
    case 'use-examples':
      return (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="grid gap-2 border-b bg-muted/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-6">
            <span>Use</span>
            <span>Example</span>
          </div>
          <div className="divide-y">
            {block.rows.map((row) => (
              <ExampleRow key={row.use} use={row.use} example={row.example} />
            ))}
          </div>
        </div>
      )
    case 'hints':
      return (
        <Callout variant="hint">
          {block.intro ? (
            <p>
              <RichText text={block.intro} />
            </p>
          ) : null}
          <ul className="list-disc space-y-1.5 pl-5">
            {block.items.map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </Callout>
      )
    case 'watch-out':
      return (
        <Callout variant="watchout">
          <p>
            <RichText text={block.text} />
          </p>
          {block.note ? (
            <p className="opacity-90">
              <RichText text={block.note} />
            </p>
          ) : null}
        </Callout>
      )
    case 'word-list':
      return (
        <div className="rounded-xl border bg-card p-4 sm:p-5">
          {block.intro ? (
            <p className="mb-3 text-sm font-medium text-foreground">{block.intro}</p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {block.words.map((word) => (
              <Keyword key={word}>{word}</Keyword>
            ))}
          </div>
        </div>
      )
    case 'correct-incorrect':
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-xl bg-success p-4 text-success-foreground">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
              <Badge className="mb-2 bg-success-foreground/10 text-success-foreground">
                Correct
              </Badge>
              <p className="text-sm leading-relaxed">
                <RichText text={block.correct} />
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl bg-incorrect p-4 text-incorrect-foreground">
            <XCircle className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
              <Badge className="mb-2 bg-incorrect-foreground/10 text-incorrect-foreground">
                Incorrect
              </Badge>
              <p className="text-sm leading-relaxed line-through opacity-80">
                <RichText text={block.incorrect} />
              </p>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}
