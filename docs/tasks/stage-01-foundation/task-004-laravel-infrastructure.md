# Task 004 - Laravel Infrastructure

## Status

Done.

## Goal

Install and configure core Laravel infrastructure packages without adding application business logic.

## Context

BudgetFlow will use Sanctum for auth, Horizon for queues, Reverb for realtime updates, and Scribe for API documentation.

## Scope

- Install Laravel Sanctum.
- Install Laravel Horizon.
- Install Laravel Reverb.
- Install Scribe as a development dependency.
- Publish required package configuration and migrations.
- Add local Docker services for Horizon, scheduler, and Reverb.
- Add Makefile shortcuts for infrastructure workflows.

## Out of Scope

- Authentication endpoints or UI.
- Expenses, categories, dashboard, imports, assets, or notifications.
- Events, jobs, or realtime application features.
- Production exposure or hardening of Horizon.

## Files Likely To Change

- `apps/api/composer.json`
- `apps/api/composer.lock`
- `apps/api/config/`
- `apps/api/routes/channels.php`
- `apps/api/app/Providers/HorizonServiceProvider.php`
- `docker-compose.local.yml`
- `Makefile`
- `README.md`
- `.github/workflows/ci.yml`

## Acceptance Criteria

- Sanctum, Horizon, Reverb, and Scribe are installed.
- Package configs are present.
- Horizon, scheduler, and Reverb services can run locally.
- `GET /api/health` remains the only application API route.
- Scribe generation works.

## Verification Commands

```bash
make composer-validate
make api-migrate
make route-list
make api-test
make web-build
make scribe-generate
make ps
```

## Completion Notes

Completed in baseline commit `c2812c3 Initialize BudgetFlow production-style foundation`. The backend includes Sanctum, Horizon, Reverb, and Scribe configuration. Local Docker includes `horizon`, `scheduler`, and `reverb`. The API route list remains minimal with `GET /api/health`.
