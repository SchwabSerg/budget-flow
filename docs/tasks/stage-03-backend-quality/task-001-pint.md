# Task 001 - Pint

## Status

Planned.

## Goal

Add Laravel Pint formatting workflow for backend PHP code.

## Context

Before feature development grows, the backend should have a consistent automated formatting command that can be used locally and in CI.

## Scope

- Confirm Laravel Pint is available from the Laravel app dependencies.
- Add a Pint configuration if needed.
- Add Makefile commands for checking and fixing PHP formatting.
- Add CI formatting check if appropriate.
- Document the workflow in README.

## Out of Scope

- Large code style refactors unrelated to Pint.
- Static analysis.
- Application business logic.

## Files Likely To Change

- `apps/api/pint.json` if needed
- `Makefile`
- `.github/workflows/ci.yml`
- `README.md`

## Acceptance Criteria

- A container-first Pint check command exists.
- A container-first Pint fix command exists if useful.
- CI can run the formatter check.
- Existing backend tests still pass.

## Verification Commands

```bash
make composer-validate
make api-test
make pint
```

## Completion Notes

Not started.
