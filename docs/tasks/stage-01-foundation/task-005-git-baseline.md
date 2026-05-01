# Task 005 - Git Baseline

## Status

Done.

## Goal

Initialize Git safely and create the first clean baseline commit.

## Context

The project foundation existed before Git initialization. Runtime, generated, sensitive, and local-only files needed to be excluded before committing.

## Scope

- Inspect ignore rules.
- Initialize Git if needed.
- Keep sensitive and generated files out of the commit.
- Create the first baseline commit on `main`.

## Out of Scope

- Adding a remote.
- Pushing to GitHub.
- Application code changes.
- Package installation.

## Files Likely To Change

- `.gitignore`

## Acceptance Criteria

- Git repository is initialized.
- Initial branch is `main`.
- Runtime files such as `.env`, `vendor`, `node_modules`, caches, logs, and generated docs are ignored.
- First baseline commit is created.

## Verification Commands

```bash
git status --short --branch
git diff --cached --name-only
git log --oneline -1
```

## Completion Notes

Completed in baseline commit `c2812c3 Initialize BudgetFlow production-style foundation`. `docs/setup.md` was intentionally kept out of Git at that time.
