# Grammar unit JSON

Add later Destination units as JSON only. If the schema below stays the same, you do not change React components — only this folder and one catalog line.

## Pipeline (images → app)

1. Send the next unit images (theory + exercises).
2. Author a JSON file that follows this schema. Use original teaching sentences on the same topic; do not copy Macmillan text verbatim.
3. Save it as `src/data/{level}/unit-NN-slug.json`  
   Example: `src/data/b2/unit-03-conditionals.json`
4. Register it in [`catalog.ts`](catalog.ts):

```ts
import unit03Conditionals from '@/data/b2/unit-03-conditionals.json' with { type: 'json' }

const units: GrammarUnit[] = [
  unit01PresentTenses as GrammarUnit,
  unit03Conditionals as GrammarUnit, // add this
]
```

5. Restart the dev server if Vite does not pick up the new file. The unit appears on that level’s catalog automatically.

Empty levels (B2, C1&C2) stay empty until you add at least one file. No extra filters — the catalog is level-only.

If a page needs a **new exercise type** (not in the table below), add a renderer in `src/components/practice/` and extend `ExerciseType` in `src/types/grammar.ts`.

## File shape (`GrammarUnit`)

```json
{
  "id": "unit-02-past-tenses",
  "level": "b1",
  "unitNumber": 2,
  "title": "Past simple and past continuous",
  "subtitle": "Finished actions and actions in progress in the past",
  "theory": [],
  "exercises": []
}
```

| Field | Notes |
| --- | --- |
| `id` | URL slug, unique per app. Prefer `unit-NN-kebab-title`. |
| `level` | `"b1"` \| `"b2"` \| `"c1-c2"` |
| `unitNumber` | Integer shown on the catalog card. |
| `theory` | Array of sections (each with `id`, `title`, `icon`, `blocks`). |
| `exercises` | Array of groups A–F (or however the book splits the page). |

### Theory section

`icon` is a Lucide name already mapped in `SectionHeading`: `BookOpen`, `Lightbulb`, `CheckCircle2`, `AlertTriangle`, `Sparkles`, `Table2`, `PencilLine`, `ListChecks`.

`blocks` is a discriminated union (`type` required):

| `type` | Fields | Use |
| --- | --- | --- |
| `prose` | `text` | Short intro paragraph |
| `form-table` | `rows[]` with `person`, `statement`, `negative`, `question`; optional `statementLabel`, `negativeLabel`, `questionLabel` | Affirmative / negative / question |
| `use-examples` | `rows[]` with `use`, `example` | Use + example |
| `hints` | `items[]`; optional `intro` | Helpful hints |
| `watch-out` | `text`; optional `note` | Common mistakes |
| `word-list` | `words[]`; optional `intro` | Stative verbs, time phrases, … |
| `correct-incorrect` | `correct`, `incorrect` | ✓ / ✗ pair |

### Practice groups (`exercises[]`)

Each group:

| Field | Notes |
| --- | --- |
| `id` | Stable id (`"a"`, `"b"`, …). Last visited group is persisted by this id. |
| `type` | See table below |
| `title` | Shown in the group nav and heading (`A · Write a sentence`) |
| `instruction` | Learner-facing directions |
| `wordBank` | Optional chips; click/tap inserts into the last focused gap |
| `paragraph` | Required for `error-correction`; mark verbs with `{click:phrase}` |
| `items[]` | `id`, `prompt`, `acceptedAnswers[]`, optional `explanation`, `options`, `targetSpan` |

Answers are compared after trim, lowercase, and collapsing spaces. List every acceptable variant in `acceptedAnswers`.

| Book | `type` | Item fields |
| --- | --- | --- |
| A guided sentences | `guided-sentence` | `prompt` is chips split on `/` (e.g. `Lina / take / the train`) |
| B / E gap-fill | `gap-fill` | Put `___` in `prompt` where the input goes; optional group `wordBank` |
| C rewrite | `rewrite` | `prompt` is the source sentence (bold with `**...**`) |
| D circle option | `multiple-choice` | `options` (2+); `acceptedAnswers` is the correct option text |
| F error hunt | `error-correction` | Group `paragraph` with `{click:wrong verb}`; item `targetSpan` must match that verb; `acceptedAnswers` is the correction |

### Inline tokens (no HTML)

Rendered by `RichText` (and clickable verbs in error-correction):

- `**like**` — highlighted emphasis
- `{pill:always}` — adverb / keyword chip
- `{click:am getting}` — only in `error-correction` `paragraph`

Do not use `dangerouslySetInnerHTML` or raw HTML in JSON.

## Checklist for a new unit

- [ ] File name and `id` match; `level` matches the folder
- [ ] Theory blocks cover form, uses, hints, watch-outs as needed
- [ ] Exercises A–F (or the book’s letters) use the types above
- [ ] Every item has at least one `acceptedAnswers` string
- [ ] Error-correction `targetSpan` values match `{click:...}` in the paragraph
- [ ] Import added to `catalog.ts`
- [ ] Catalog card appears under the right level; Practice checks and persists
