# Task 001 - Frontend Design System Foundation

## Status
Done.

## Goal
Stand up the frontend design system foundation without migrating existing screens. Future UI tasks can build on Tailwind CSS, design tokens, Fontsource fonts, Lucide icons, Vitest, and the shared money formatter.

## Context
Task 6 prepares the tooling and shared design assets for later frontend work. The existing app remains in its previous visual language until the app shell, auth screens, and feature UI are migrated in later tasks.

## Scope
- Install Tailwind CSS v4 with the official Vite plugin.
- Install Fontsource packages for Inter and Bricolage Grotesque.
- Install Lucide Vue icons.
- Install Vitest, Vue Test Utils, jsdom, and V8 coverage support.
- Wire provided design tokens into Tailwind utilities.
- Add frontend test and type-check scripts.
- Add root Makefile shortcuts for frontend tests and type checks.
- Commit the provided design system documentation, tokens, money formatter, and money formatter tests.

## Out of Scope
- Building UI component primitives.
- Migrating existing screens to the new design system.
- Adding Storybook or component documentation infrastructure.
- Implementing product features.
- Adding dark mode.

## Files Likely to Change
- `apps/web/package.json`
- `apps/web/package-lock.json`
- `apps/web/vite.config.ts`
- `apps/web/vitest.config.ts`
- `apps/web/src/main.ts`
- `apps/web/src/main.css`
- `apps/web/src/__sanity__.spec.ts`
- `apps/web/src/shared/ui/tokens.css`
- `apps/web/src/shared/utils/money.ts`
- `apps/web/src/shared/utils/money.spec.ts`
- `docs/design/system.md`
- `Makefile`
- `README.md`
- `AGENTS.md`
- `docs/progress.md`
- `docs/project-plan.md`

## Acceptance Criteria
- Tailwind CSS v4 is installed with versions compatible with Vite 8.
- Tailwind utilities resolve BudgetFlow design tokens.
- Fontsource fonts are imported through the frontend entrypoint.
- Vitest runs in jsdom and discovers frontend specs.
- `money.spec.ts` passes without modifying the provided money utility files.
- `make web-test`, `make web-build`, `make web-type-check`, and `make api-test` pass.
- Existing screens are not migrated in this task.

## Verification Commands
```bash
make web-test
make web-build
make web-type-check
make api-test
```

## Completion Notes
Tailwind CSS v4 was configured through `@tailwindcss/vite` and token mappings in `apps/web/src/main.css`. Fontsource imports, existing styles, tokens, and Tailwind are imported in the frontend entrypoint in that order so existing scoped styles continue to work while token variables win collisions. Vitest was added with a sanity test and the provided money formatter tests.
