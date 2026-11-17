# Commit split examples

Illustrative plans only; always follow the actual diff and repo style.

## One commit (default)

**Diff:** New practice UI, hook, and styles for the same feature.

**Plan:** Single commit — one user-facing feature.

```
feat(practice): add answer feedback panel and scoring hook
```

## Initial repository (greenfield)

**Diff:** Full Vite app untracked — config, `src/`, `public/`, README.

**Plan (default):** One commit if everything is one product slice.

```
feat: initial en-grammar practice app
```

**Plan (split only if clearly separable):**

1. `chore: add vite, typescript, and lint tooling`
2. `feat: add grammar practice UI and core flows`

Stage tooling paths first (`package.json`, lockfile, config, husky), then `src/` and `public/`.

## Two commits

**Diff:** Fix null handling in review logic plus unrelated marketing copy on the home page.

**Plan:**

1. `fix(practice): guard empty deck before review loop`
2. `docs(home): update hero copy`

Stage review logic files first; then home page files.

## Three commits (build order)

**Diff:** Shared types moved, service updated, UI wired.

**Plan:**

1. `refactor(types): extract exercise types`
2. `feat(lib): load exercises via shared types`
3. `feat(ui): wire dashboard to exercise service`

## Do not split

**Diff:** `package.json` + `pnpm-lock.yaml` for one new dependency.

**Plan:** One commit — lockfile belongs with the dependency change.

## Secrets excluded

**Diff:** `.env.local` modified alongside app code.

**Plan:** Commit app paths only; leave `.env.local` unstaged; note in report.