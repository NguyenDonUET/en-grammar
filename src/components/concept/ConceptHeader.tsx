import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { LEVELS, levelPath } from "@/data/catalog";
import type { GrammarUnit } from "@/types/grammar";

interface ConceptHeaderProps {
  unit: GrammarUnit;
}

export function ConceptHeader({ unit }: ConceptHeaderProps) {
  const levelLabel =
    LEVELS.find((level) => level.id === unit.level)?.label ?? unit.level;

  return (
    <div className="space-y-3">
      <Link
        to={levelPath(unit.level)}
        className="text-sm block mb-2 font-medium text-muted-foreground hover:text-foreground"
      >
        ← All units
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{levelLabel}</Badge>
        <Badge variant="secondary">Unit {unit.unitNumber}</Badge>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-balance">
        {unit.title}
      </h1>
      <p className="max-w-2xl text-muted-foreground">{unit.subtitle}</p>
    </div>
  );
}
