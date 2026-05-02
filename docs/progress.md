# BudgetFlow Progress

## Current Project Status

BudgetFlow has a committed production-style monorepo foundation. The repository contains a Laravel API in `apps/api`, a Vue 3 + TypeScript + Vite frontend in `apps/web`, a container-first local Docker runtime, Makefile workflow shortcuts, a CI workflow, backend infrastructure packages for Sanctum, Horizon, Reverb, and Scribe, a frontend application shell with Vue Router and Pinia, a typed frontend health check through the shared API client, a token-based auth frontend, user-scoped category and expense API endpoints, Laravel Pint formatting workflow, and Larastan/PHPStan static analysis for backend PHP code.

The API surface currently exposes `GET /api/health`, Sanctum token authentication endpoints, authenticated category endpoints, and authenticated expense endpoints.

The authoritative implementation sequence is [BudgetFlow Project Plan](project-plan.md).

## Current Stage

Stage 07 - Component primitives.

The next recommended task is Task 8 - App shell, navigation, and auth screen migration.

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
| Stage 02 | Frontend foundation | Done | Pending |
| Stage 02 | API client and health check | Done | Pending |
| Stage 03 | Pint | Done | Pending |
| Stage 03 | Larastan | Done | Pending |
| Stage 04 | Auth API | Done | Pending |
| Stage 04 | Auth Frontend | Done | Pending |
| Stage 05 | Categories API | Done | Pending |
| Stage 05 | Expenses API | Done | Pending |
| Stage 05.5 | Currency default UAH | Done | Pending |
| Stage 06 | Frontend design system foundation | Done | Pending |
| Stage 07 | Component primitives library | Done | Pending |

## In Progress

No task is currently in progress.

## Next Tasks

| Priority | Task | Status |
| --- | --- | --- |
| 1 | Task 8 - App shell, navigation, and auth screen migration | Planned |
| 2 | Task 9 - Categories schema and management UI | Planned |
| 3 | Task 10 - Expenses UI | Planned |

## Architecture Decisions

- Use a monorepo to keep the frontend, backend, Docker runtime, docs, and CI in one production-style project.
- Use container-first local development. Host PHP, Composer, Node, and npm should not be required for normal development.
- Use Laravel behind Nginx and PHP-FPM rather than Octane or FrankenPHP at this stage.
- Use PostgreSQL as the application database and Redis for cache, queue, and future rate limiting.
- Use Horizon for queue supervision, Reverb for future realtime features, and Scribe for API documentation.
- Use Sanctum personal access tokens for the first API auth flow; SPA cookie/session auth can be revisited when frontend auth is implemented.
- Store the first frontend auth token in browser local storage for the portfolio-stage app; hardening can be revisited before production deployment.
- Categories are user-scoped and provide the first product-owned API resource for organizing future expenses.
- Expenses are user-scoped, store money as integer minor units in `amount_cents`, default to `UAH`, and initially support `manual` and `recurring` types.
- Keep the API minimal until the frontend and backend foundations are ready.
- Use Vue Router and Pinia as the frontend routing and state foundation before product features are implemented.
- Frontend uses feature-based architecture with domain-inspired boundaries.
- Frontend design tokens are defined in `apps/web/src/shared/ui/tokens.css`, documented in `docs/design/system.md`, and exposed through Tailwind CSS v4 utilities.
- Frontend feature UI should compose from shared primitives in `apps/web/src/shared/ui` before introducing feature-specific components.
- Backend PHP formatting is enforced with Laravel Pint through container-first Makefile commands and CI.
- Backend static analysis is enforced with Larastan/PHPStan through container-first Makefile commands and CI.
- Local bind-mounted containers run as the configured host UID/GID to avoid root-owned generated files; production should use immutable non-root images without source bind mounts.
- Keep production deployment separate from CI until Docker image build, GHCR publishing, Traefik, and VPS deployment are introduced deliberately.
