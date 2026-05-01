# Task 002 - Expenses API

## Status

Planned.

## Goal

Add the backend API for manual and recurring expenses.

## Context

Expenses are the first core product domain. This task should build on authentication and categories.

## Scope

- Add expense database schema.
- Add expense model and relationships.
- Add expense API endpoints.
- Add request validation and API resources.
- Add filtering basics for month, category, and type if appropriate.
- Add feature tests.
- Add Scribe documentation.

## Out of Scope

- Bank imports.
- Dashboard aggregation.
- Calendar UI.
- Frontend expense management.
- Realtime events unless explicitly added in a later task.

## Files Likely To Change

- `apps/api/database/migrations/`
- `apps/api/app/Models/`
- `apps/api/app/Http/Controllers/`
- `apps/api/app/Http/Requests/`
- `apps/api/app/Http/Resources/`
- `apps/api/routes/api.php`
- `apps/api/tests/Feature/`

## Acceptance Criteria

- Expense endpoints are implemented and tested.
- Expenses can be associated with categories.
- Validation covers required fields and supported expense types.
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
