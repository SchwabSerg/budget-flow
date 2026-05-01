# Task 002 - API Client and Health Check

## Status

Planned.

## Goal

Add a small frontend API client foundation and verify it can call the existing `GET /api/health` endpoint.

## Context

The backend API currently exposes only a health endpoint. This task should establish the frontend API access pattern before product endpoints exist.

## Scope

- Add an API base URL environment variable for the frontend.
- Add a small typed API client wrapper.
- Add health response type definitions.
- Add a lightweight health check call from an appropriate placeholder UI or development surface.
- Add loading and error states for the health check.

## Out of Scope

- Authentication.
- Global error handling architecture beyond what is needed for the health check.
- Expenses, categories, dashboard data, or imports.
- Reverb/Echo integration.

## Files Likely To Change

- `apps/web/src/services/`
- `apps/web/src/types/`
- `apps/web/src/pages/` or `apps/web/src/components/`
- `apps/web/.env.example`
- `README.md`

## Acceptance Criteria

- Frontend can call `GET /api/health`.
- Health call is typed.
- UI handles loading, success, and error states.
- `make web-build` passes.
- API route list remains minimal.

## Verification Commands

```bash
make up
make api-health
make web-build
```

## Completion Notes

Not started.
