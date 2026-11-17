import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { unitPath } from '@/data/catalog'
import type { UnitSummary } from '@/types/grammar'

interface UnitCardProps {
  unit: UnitSummary
}

export function UnitCard({ unit }: UnitCardProps) {
  return (
    <Link
      to={unitPath(unit.level, unit.id)}
      className="group block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader className="gap-3">
          <Badge variant="secondary">Unit {unit.unitNumber}</Badge>
          <CardTitle className="text-lg leading-snug">{unit.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-end justify-between gap-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{unit.subtitle}</p>
          <ArrowRight
            className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </CardContent>
      </Card>
    </Link>
  )
}
