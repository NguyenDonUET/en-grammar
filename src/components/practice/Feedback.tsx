import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeedbackProps {
  checked: boolean
  correct: boolean
  expected: string[]
  explanation?: string
  hint?: string
}

export function Feedback({
  checked,
  correct,
  expected,
  explanation,
  hint,
}: FeedbackProps) {
  if (!checked) return null

  if (correct) {
    return (
      <p className="flex items-center gap-1.5 text-sm font-medium text-success-foreground">
        <CheckCircle2 className="size-4 shrink-0" aria-hidden />
        Correct
      </p>
    )
  }

  const expectedLabel = expected[0]

  return (
    <div className="space-y-1 text-sm text-incorrect-foreground">
      <p className="flex items-start gap-1.5 font-medium">
        <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>
          Incorrect
          {expectedLabel ? (
            <>
              {' '}
              · expected <span className="font-semibold">{expectedLabel}</span>
            </>
          ) : null}
        </span>
      </p>
      {hint ? <p className={cn('pl-5')}>{hint}</p> : null}
      {explanation ? <p className={cn('pl-5', 'opacity-90')}>{explanation}</p> : null}
    </div>
  )
}
