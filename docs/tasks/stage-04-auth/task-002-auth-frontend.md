# Task 002 - Auth Frontend

## Status

Done.

## Goal

Implement the frontend authentication flow against the Sanctum-backed API.

## Context

This task depends on the Auth API task. The frontend should support guest and authenticated application states.

## Scope

- Add auth store.
- Add login and register forms.
- Add logout action.
- Add current-user loading.
- Add route guards for protected pages.
- Add guest and authenticated layout handling.
- Add basic validation and error states.

## Out of Scope

- Password reset.
- OAuth/social login.
- Product domain features.
- Advanced design system work.

## Files Likely To Change

- `apps/web/src/stores/`
- `apps/web/src/pages/`
- `apps/web/src/router/`
- `apps/web/src/services/`
- `apps/web/src/types/`

## Acceptance Criteria

- User can register and log in through the frontend.
- User can log out.
- Protected routes require authentication.
- Guest routes redirect appropriately.
- `make web-build` passes.

## Verification Commands

```bash
make up
make api-test
make web-build
```

## Completion Notes

Implemented auth API wrappers, a Pinia auth store, login/register pages, logout action, current-user loading, protected route guards, and guest-only redirects. The implementation uses the existing feature-based frontend architecture and does not add product domain features.
