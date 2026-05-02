# Task 003 - Currency Default UAH

## Status

Done.

## Goal

Change the backend default expense currency from `USD` to `UAH`.

## Context

The frontend design system and money formatting plan use Ukrainian money formatting by default. The backend expense data layer already supports multi-currency through the `currency` column, but the default needed to align with `UAH` before frontend money UI work begins.

## Scope

- Add a new migration that changes the `expenses.currency` default to `UAH`.
- Keep the `currency` column for future multi-currency support.
- Update the expense factory default to `UAH`.
- Update backend test fixtures from `USD` to `UAH`.
- Update request/Scribe examples from `USD` to `UAH`.
- Update README and progress documentation.

## Out of Scope

- Removing the `currency` column.
- Adding user currency preferences.
- Currency conversion logic.
- Frontend changes.

## Files Likely To Change

- `apps/api/database/migrations/`
- `apps/api/database/factories/ExpenseFactory.php`
- `apps/api/app/Http/Requests/StoreExpenseRequest.php`
- `apps/api/app/Http/Requests/UpdateExpenseRequest.php`
- `apps/api/tests/Feature/Expenses/ExpenseApiTest.php`
- `README.md`
- `docs/progress.md`
- `docs/tasks/stage-05-expenses/task-002-expenses-api.md`

## Acceptance Criteria

- New migration runs cleanly with `make api-migrate-fresh`.
- Existing backend feature tests pass with `UAH` fixtures.
- Pint passes.
- PHPStan passes.
- Scribe docs generation succeeds with `UAH` examples.
- No frontend files are modified.

## Verification Commands

```bash
make api-migrate-fresh
make api-test
make pint
make phpstan
make route-list
make scribe-generate
```

## Completion Notes

Implemented with a new default-altering migration using Laravel schema APIs. Updated expense factory defaults, request examples, tests, README, progress docs, and the Stage 05 expenses task notes. `docs/project-plan.md` is now referenced from `docs/progress.md` as the authoritative implementation plan.
