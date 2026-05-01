# Task 002 - Larastan

## Status

Planned.

## Goal

Add PHPStan/Larastan static analysis for the Laravel API.

## Context

Static analysis should be introduced before domain code grows, so future backend modules get type and framework-aware checks early.

## Scope

- Install Larastan/PHPStan as development dependencies.
- Add a PHPStan configuration suitable for the current Laravel app.
- Add a Makefile command for static analysis.
- Add CI static analysis check.
- Keep the initial level pragmatic for the current codebase.

## Out of Scope

- Business logic.
- Large architectural refactors.
- Frontend linting.

## Files Likely To Change

- `apps/api/composer.json`
- `apps/api/composer.lock`
- `apps/api/phpstan.neon` or `phpstan.neon.dist`
- `Makefile`
- `.github/workflows/ci.yml`
- `README.md`

## Acceptance Criteria

- Static analysis runs inside the API container.
- CI runs static analysis.
- Existing tests and route list checks still pass.

## Verification Commands

```bash
make composer-install
make phpstan
make api-test
```

## Completion Notes

Not started.
