---
name: commit-and-push
description: >-
  Commit the working tree and push to GitHub for en-grammar. Groups related
  changes into focused commits; splits into multiple commits when the diff mixes
  independent work. Bootstraps origin and main when needed. Use when the user
  asks to commit, commit and push, ship changes, push to GitHub, or split
  uncommitted work into several commits before pushing.
---

# Commit and push (en-grammar)

Ship work on this repo: inspect the tree, split commits only when needed, commit, push to GitHub, report. Do not stop for plan approval unless secrets must stay out or the tree is clearly unsafe to ship.

## Repository defaults

| Setting | Value |
|---------|--------|
| Remote | `origin` → `https://github.com/NguyenDonUET/en-grammar.git` |
| Branch | `main` |

### Bootstrap (when missing)

Run only what applies; never duplicate an existing `origin`.

```bash
git remote add origin https://github.com/NguyenDonUET/en-grammar.git
git branch -M main
```

First push (no upstream yet):

```bash
git push -u origin main
```

## Safety

- Never update git config.
- Never use `--no-verify`, `--no-gpg-sign`, `reset --hard`, `clean -fdx`, or force-push.
- Never use interactive git (`git add -i`, `git add -p`, `git rebase -i`).
- Never amend unless the user explicitly asked, HEAD is your unpushed commit, and a hook auto-modified files that must be included. Hook rejected a commit → fix and **new** commit.
- Do not commit secrets (`.env`, credentials, keys, tokens). Leave unstaged, note in the report, commit the rest if safe.
- No empty commits. Nothing to commit → say so. Push only when there are unpushed commits.
- Push only to `origin` unless the user named another remote.
- This skill implies push when the user asked to commit and push / ship / push to GitHub.

## 1. Inspect

Run in parallel:

```bash
git status
git diff && git diff --staged
git diff --stat
git log -8 --oneline 2>/dev/null || true
git rev-parse --abbrev-ref HEAD
git rev-parse --abbrev-ref --symbolic-full-name @{upstream} 2>/dev/null || true
git remote get-url origin 2>/dev/null || true
```

Read diffs and recent subjects. Match existing commit style (prefix, tense, scope).

No `origin` → run bootstrap `git remote add origin` (URL above), then continue.

Branch is not `main` and user expects GitHub default → `git branch -M main` before push.

## 2. Plan commits

**Default: one commit.** Split only when separate commits each have their own clear reason for reviewers or history.

| Keep in one commit | Split into separate commits |
|--------------------|-----------------------------|
| Feature + tests/types/styles for that feature | Bugfix + unrelated feature |
| Dependency + lockfile | Docs unrelated to the code change |
| Rename/format tied to the same edit | Refactor in area A + feature in area B |
| Greenfield app: first ship as one logical unit unless clearly separable layers | Tooling-only vs product code when reviewers would care |

Limits:

- Aim for 1 commit; use 2–4 when the diff is genuinely mixed.
- Do not split by folder, layer, or “one file = one concern.”
- If one file mixes two concerns and you cannot stage hunks without interactive git, put the file in the commit it mostly serves; mention the compromise in the report.
- Order commits so each earlier commit still makes sense if checked out alone (types/helpers, then consumers).

State the plan in one or two sentences, then execute.

For split examples, see [examples.md](examples.md).

## 3. Commit (possibly multiple times)

Stage **only** paths for the current commit. Never `git add .` or `git add -A`.

**Multiple commits from a dirty tree**

1. Stage paths for commit 1 → commit.
2. Stage remaining paths for commit 2 → commit.
3. Repeat until `git status` shows no intended changes left (except excluded secrets).

```bash
git add path/to/a path/to/b
git commit -m "$(cat <<'EOF'
Subject in repo style

Optional one sentence on why, when the subject is not enough.
EOF
)"
```

Subject: imperative, focused on why. Body only when needed.

After the last commit: `git status` — confirm intended files are committed; excluded secrets still unstaged/untracked.

## 4. Push

Use shell permissions that allow auth (`all` or equivalent); sandbox often breaks GitHub push.

Ensure branch is `main` if this is the first GitHub push for the repo.

No upstream:

```bash
git push -u origin main
```

Has upstream on `main`:

```bash
git push
```

Push rejected → stop, report the error. No force-push, rebase, or pull unless the user asks.

## 5. Report

- Branch name
- Each commit: short hash and subject
- Push result (remote URL + branch)
- Anything left uncommitted and why