# Task 002 - API Client and Health Check

## Status

Done.

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

- `apps/web/src/shared/api/`
- `apps/web/src/shared/config/`
- `apps/web/src/shared/types/`
- `apps/web/src/features/dashboard/api/`
- `apps/web/src/features/dashboard/stores/`
- `apps/web/src/features/dashboard/pages/`
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
make route-list
```

## Completion Notes

Implemented a typed shared HTTP client, frontend API base URL config, shared health API helper, dashboard feature API wrapper, and dashboard health store/UI states for loading, success, and error. The frontend calls the existing `GET /api/health` endpoint without adding backend routes or product business logic.
