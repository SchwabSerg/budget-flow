# Task 001 - Component Primitives Library

## Status
Done.

## Goal
Build the shared Vue component primitives that future feature screens compose from.

## Context
Task 6 installed the design system foundation: Tailwind, tokens, fonts, Vitest, and the money formatter. Task 7 adds the reusable presentation components required before the app shell and feature UI migration work begins.

## Scope
- Add nine shared UI primitives:
  - `AppButton`
  - `AppInput`
  - `AppCard`
  - `AppListRow`
  - `AppCategoryPill`
  - `AppEmptyState`
  - `AppModalSheet`
  - `AppHeader`
  - `AppBottomTabBar`
- Add co-located Vitest + Vue Test Utils specs for each primitive.
- Add `apps/web/src/shared/ui/index.ts` exports.
- Add a dev-only `/dev/components` showcase route.
- Add `--color-backdrop` to the design tokens for modal overlays.
- Update project progress and documentation.

## Out of Scope
- Migrating existing app screens to these primitives.
- Building feature-specific UI.
- Storybook or visual regression tooling.
- Pinia stores, API calls, route guards, or business logic.

## Files Likely to Change
- `apps/web/src/shared/ui/*.vue`
- `apps/web/src/shared/ui/*.spec.ts`
- `apps/web/src/shared/ui/index.ts`
- `apps/web/src/features/dev/pages/ComponentsPage.vue`
- `apps/web/src/app/router/index.ts`
- `apps/web/src/shared/ui/tokens.css`
- `docs/design/system.md`
- `docs/progress.md`
- `docs/project-plan.md`
- `README.md`

## Acceptance Criteria
- All nine primitives exist in `apps/web/src/shared/ui`.
- Every primitive has a co-located spec file.
- `shared/ui/index.ts` exports all primitives.
- `/dev/components` exists only in dev builds.
- Components use design tokens and avoid hardcoded colors outside `tokens.css`.
- `make web-test`, `make web-build`, `make web-type-check`, and `make api-test` pass.

## Verification Commands
```bash
make web-test
make web-build
make web-type-check
make api-test
```

## Completion Notes
Implemented the shared primitives library, added behavior-focused tests, and registered a dev-only components showcase route. `AppModalSheet` uses the new `--color-backdrop` token and includes focus management for open/close behavior. Existing product screens were not migrated in this task.
