# Task 001 - Design System Foundation

## Status
Planned.

## Goal
Install the BudgetFlow design system tokens, money formatter, and design
documentation. Wire fonts and base styles into the frontend so all subsequent
feature work can reference them.

## Scope
- Add `docs/design/system.md` (provided).
- Add `apps/web/src/shared/ui/tokens.css` (provided).
- Add `apps/web/src/shared/utils/money.ts` (provided).
- Add `apps/web/src/shared/utils/money.spec.ts` (provided).
- Install Inter and Bricolage Grotesque via Fontsource:
  `npm install @fontsource-variable/inter @fontsource-variable/bricolage-grotesque`
- Install Tailwind CSS v4 (or v3 if v4 is not stable) with PostCSS.
- Install lucide-vue-next for iconography.
- Import font CSS and tokens.css in `apps/web/src/main.ts`.
- Configure Tailwind to read CSS variables from tokens.css
  (extend theme with our color/spacing/radius tokens so utility classes work).
- Verify that `make web-test` runs the new money.spec.ts tests and they pass.
- Verify `make web-build` succeeds.

## Out of Scope
- Building any actual UI components (Button, Input, Card, etc.) — those are
  separate tasks.
- Modifying any existing screens.
- Dark mode.
- Adding any new feature code.

## Acceptance Criteria
- All four provided files are placed at the documented paths verbatim.
- Fonts load and render in the dev environment.
- Tailwind utility classes resolve our design tokens
  (e.g., `bg-primary-500` produces `#D85A30`).
- `make web-test` passes including the new money tests.
- `make web-build` succeeds.
- No unrelated changes.

## Verification Commands
```bash
make web-build
make web-test
```

## Completion Notes
[To be filled in after implementation]