import { Keyword } from '@/components/ds/Keyword'

interface RichTextProps {
  text: string
  className?: string
}

const TOKEN = /(\*\*[^*]+\*\*|\{pill:[^}]+\})/g

export function RichText({ text, className }: RichTextProps) {
  const parts = text.split(TOKEN)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <mark
              key={`${part}-${index}`}
              className="rounded-sm bg-highlight px-0.5 font-semibold text-highlight-foreground"
            >
              {part.slice(2, -2)}
            </mark>
          )
        }

        const pill = /^\{pill:([^}]+)\}$/.exec(part)
        if (pill) {
          return <Keyword key={`${part}-${index}`}>{pill[1]}</Keyword>
        }

        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </span>
  )
}
