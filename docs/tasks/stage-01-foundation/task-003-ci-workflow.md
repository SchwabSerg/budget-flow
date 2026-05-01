# Task 003 - CI Workflow

## Status

Done.

## Goal

Add the first GitHub Actions workflow to validate the backend and frontend on push and pull request.

## Context

The project needs a lightweight CI baseline before feature development begins.

## Scope

- Add CI workflow for pushes and pull requests to `main`.
- Install backend dependencies in `apps/api`.
- Validate Composer configuration.
- Prepare a CI Laravel environment.
- Run Laravel tests and route boot check.
- Install frontend dependencies in `apps/web`.
- Run frontend build.

## Out of Scope

- Docker image builds.
- GHCR publishing.
- Deployment.
- Secrets.
- PostgreSQL service in CI unless required by tests.

## Files Likely To Change

- `.github/workflows/ci.yml`
- `README.md`

## Acceptance Criteria

- CI workflow exists.
- Backend checks run with a PHP version compatible with Laravel.
- Frontend checks run on Node 22.
- No deployment steps are included.

## Verification Commands

```bash
make composer-validate
make api-test
make web-build
```

## Completion Notes

Completed in baseline commit `c2812c3 Initialize BudgetFlow production-style foundation`. CI validates Composer, Laravel tests, route booting, npm install, and frontend build.
