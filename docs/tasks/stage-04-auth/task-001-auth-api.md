# Task 001 - Auth API

## Status

Planned.

## Goal

Implement the backend authentication API using Laravel Sanctum.

## Context

Sanctum is installed, but no authentication endpoints exist yet. This task introduces the backend auth flow after foundation and quality tooling are in place.

## Scope

- Configure Sanctum for the chosen local SPA/API flow.
- Add registration, login, logout, and current-user endpoints.
- Add request validation.
- Add feature tests for success and failure cases.
- Document endpoints with Scribe.

## Out of Scope

- Frontend auth UI.
- OAuth/social login.
- Password reset.
- Product domain features.

## Files Likely To Change

- `apps/api/routes/api.php`
- `apps/api/app/Http/Controllers/`
- `apps/api/app/Http/Requests/`
- `apps/api/tests/Feature/`
- `apps/api/config/sanctum.php`
- `apps/api/config/cors.php` if present or needed

## Acceptance Criteria

- Users can register, log in, log out, and fetch the authenticated user.
- Auth endpoints are covered by feature tests.
- Scribe docs generation succeeds.
- No frontend auth implementation is included.

## Verification Commands

```bash
make api-test
make route-list
make scribe-generate
```

## Completion Notes

Not started.
