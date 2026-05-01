# Task 001 - Initialize Monorepo

## Status

Done.

## Goal

Create the initial BudgetFlow monorepo structure with separate backend, frontend, Docker, documentation, and workflow areas.

## Context

BudgetFlow is intended to be a production-style full-stack project with Laravel API, Vue 3 frontend, Docker-based local development, CI/CD, and future VPS deployment.

## Scope

- Create root project structure.
- Add `apps/api` for Laravel.
- Add `apps/web` for Vue 3 + TypeScript + Vite.
- Add Docker, docs, and workflow directories.
- Add root README, environment example, and ignore rules.

## Out of Scope

- Business logic.
- Authentication.
- Expense, category, import, dashboard, or notification features.
- Production deployment.

## Files Likely To Change

- `README.md`
- `.gitignore`
- `.env.example`
- `apps/api/`
- `apps/web/`
- `docker/`
- `.github/workflows/`

## Acceptance Criteria

- Monorepo directories exist.
- Laravel API app exists in `apps/api`.
- Vue 3 + TypeScript + Vite app exists in `apps/web`.
- Root README and ignore rules exist.
- No business logic is implemented.

## Verification Commands

```bash
find . -maxdepth 3 -type d | sort
```

## Completion Notes

Completed in baseline commit `c2812c3 Initialize BudgetFlow production-style foundation`. The monorepo contains `apps/api`, `apps/web`, Docker files, docs, Makefile, CI workflow, and root project metadata.
