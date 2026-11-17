import { RichText } from '@/components/ds/RichText'
import { cn } from '@/lib/utils'

interface ExampleRowProps {
  use: string
  example: string
  className?: string
}

export function ExampleRow({ use, example, className }: ExampleRowProps) {
  return (
    <div
      className={cn(
        'grid gap-2 rounded-lg bg-example/50 px-4 py-3 sm:grid-cols-[minmax(10rem,16rem)_1fr] sm:items-start sm:gap-6',
        className,
      )}
    >
      <p className="text-sm font-medium text-example-foreground">{use}</p>
      <p className="text-sm leading-relaxed text-foreground">
        <RichText text={example} />
      </p>
    </div>
  )
}
