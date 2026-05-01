# BudgetFlow Progress

## Current Project Status

BudgetFlow has a committed production-style monorepo foundation. The repository contains a Laravel API in `apps/api`, a Vue 3 + TypeScript + Vite frontend in `apps/web`, a container-first local Docker runtime, Makefile workflow shortcuts, a CI workflow, and backend infrastructure packages for Sanctum, Horizon, Reverb, and Scribe.

The API surface remains minimal and currently exposes only `GET /api/health`.

## Current Stage

Stage 02 - Frontend Foundation.

The next recommended task is [Stage 02 / Task 001 - Frontend Foundation](tasks/stage-02-frontend-foundation/task-001-frontend-foundation.md).

## Last Completed Commit

```text
c2812c3 Initialize BudgetFlow production-style foundation
```

## Completed Tasks

| Stage | Task | Status | Commit |
| --- | --- | --- | --- |
| Stage 01 | Initialize monorepo | Done | `c2812c3` |
| Stage 01 | Local Docker runtime | Done | `c2812c3` |
| Stage 01 | CI workflow | Done | `c2812c3` |
| Stage 01 | Laravel infrastructure | Done | `c2812c3` |
| Stage 01 | Git baseline | Done | `c2812c3` |

## In Progress

No task is currently in progress.

## Next Tasks

| Priority | Task | Status |
| --- | --- | --- |
| 1 | [Stage 02 / Task 001 - Frontend Foundation](tasks/stage-02-frontend-foundation/task-001-frontend-foundation.md) | Planned |
| 2 | [Stage 02 / Task 002 - API Client and Health Check](tasks/stage-02-frontend-foundation/task-002-api-client-and-health-check.md) | Planned |
| 3 | [Stage 03 / Task 001 - Pint](tasks/stage-03-backend-quality/task-001-pint.md) | Planned |
| 4 | [Stage 03 / Task 002 - Larastan](tasks/stage-03-backend-quality/task-002-larastan.md) | Planned |

## Architecture Decisions

- Use a monorepo to keep the frontend, backend, Docker runtime, docs, and CI in one production-style project.
- Use container-first local development. Host PHP, Composer, Node, and npm should not be required for normal development.
- Use Laravel behind Nginx and PHP-FPM rather than Octane or FrankenPHP at this stage.
- Use PostgreSQL as the application database and Redis for cache, queue, and future rate limiting.
- Use Horizon for queue supervision, Reverb for future realtime features, and Scribe for API documentation.
- Keep the API minimal until the frontend and backend foundations are ready.
- Keep production deployment separate from CI until Docker image build, GHCR publishing, Traefik, and VPS deployment are introduced deliberately.
