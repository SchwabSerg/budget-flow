# Task 001 - Categories API

## Status

Planned.

## Goal

Add the backend API for expense categories.

## Context

Categories are needed before expenses can be created and organized. This task should come after authentication so category data can be scoped to a user if required by the chosen domain model.

## Scope

- Add category database schema.
- Add category model.
- Add category API endpoints.
- Add request validation and API resources.
- Add feature tests.
- Add Scribe documentation.

## Out of Scope

- Frontend category UI.
- Expense creation.
- Import logic.
- Dashboard calculations.

## Files Likely To Change

- `apps/api/database/migrations/`
- `apps/api/app/Models/`
- `apps/api/app/Http/Controllers/`
- `apps/api/app/Http/Requests/`
- `apps/api/app/Http/Resources/`
- `apps/api/routes/api.php`
- `apps/api/tests/Feature/`

## Acceptance Criteria

- Category endpoints are implemented and tested.
- Validation covers required category fields.
- Responses use API resources.
- Scribe generation succeeds.

## Verification Commands

```bash
make api-migrate-fresh
make api-test
make route-list
make scribe-generate
```

## Completion Notes

Not started.
