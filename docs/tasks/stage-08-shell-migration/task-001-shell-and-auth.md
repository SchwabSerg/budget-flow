# Task 001 - App Shell and Auth Migration

## Status
Done.

## Goal
Land the production-style frontend layout shells, primary navigation, route structure, and migrate auth screens to the BudgetFlow design system.

## Context
Task 7 introduced the shared component primitives. Task 8 applies those primitives to the app shell and auth screens while keeping product feature screens as placeholders.

## Scope
- Add authenticated `AppLayout` with `AppHeader`, profile action, and `AppBottomTabBar`.
- Add guest `AuthLayout` for login and register pages.
- Restructure routes around layout parents.
- Add placeholder pages for dashboard, expenses, calendar, savings, assets, and settings.
- Migrate login and register pages to design-system primitives.
- Extend `AppBottomTabBar` with disabled item support.
- Remove old global `style.css` and unused scaffold assets.
- Add tests for layouts, auth pages, router guards, and disabled tab behavior.

## Out of Scope
- Product feature UI beyond placeholders.
- Profile editing.
- Password reset or email verification.
- Backend changes.
- Analytics, localization, or visual regression testing.

## Files Likely to Change
- `apps/web/src/app/router/index.ts`
- `apps/web/src/layouts/AppLayout.vue`
- `apps/web/src/layouts/AuthLayout.vue`
- `apps/web/src/features/auth/pages/LoginPage.vue`
- `apps/web/src/features/auth/pages/RegisterPage.vue`
- `apps/web/src/features/*/pages/*PlaceholderPage.vue`
- `apps/web/src/shared/ui/AppBottomTabBar.vue`
- `apps/web/src/main.ts`
- `apps/web/src/style.css`
- `README.md`
- `docs/progress.md`
- `docs/project-plan.md`

## Acceptance Criteria
- Routes resolve through the correct authenticated or guest layout.
- Login and register use shared primitives and preserve auth store behavior.
- Dashboard, expenses, calendar, savings, assets, and settings placeholders exist.
- Settings includes a logout action.
- Dashboard and expenses tabs are enabled; calendar, savings, and assets tabs are disabled.
- No hardcoded hex colors exist outside `tokens.css`.
- `make web-test`, `make web-build`, `make web-type-check`, and `make api-test` pass.

## Verification Commands
```bash
make web-test
make web-build
make web-type-check
make api-test
```

## Completion Notes
Implemented route-level `AuthLayout` and `AppLayout`, migrated login and register to shared primitives, added placeholders for authenticated product routes, and removed the old scaffold/global style layer. Route guards now redirect based on token presence while preserving the existing auth store flow.
