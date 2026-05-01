# Task 001 - Frontend Foundation

## Status

Planned.

## Goal

Turn the fresh Vue 3 + TypeScript + Vite scaffold into a real application shell without implementing product business logic.

## Context

The frontend currently exists as a scaffolded Vite app. The next step is to prepare structure, routing, state management, environment conventions, layout, and placeholder pages for future product work.

## Scope

- Add Vue Router.
- Add Pinia.
- Define frontend folder conventions for layouts, pages, components, stores, services, and types.
- Add a mobile-first application layout.
- Add placeholder routes/pages for Dashboard, Expenses, Calendar, Assets, Savings, Settings, Login, and Register.
- Add basic not-found handling.
- Add frontend environment variable examples needed for API and future Reverb integration.
- Keep the UI simple, clean, and clearly marked as placeholders.

## Out of Scope

- Auth implementation.
- API-backed business data.
- Expense/category models.
- Reverb event handling.
- Tailwind or design system installation unless explicitly chosen for this task.

## Files Likely To Change

- `apps/web/package.json`
- `apps/web/package-lock.json`
- `apps/web/src/`
- `apps/web/.env.example` if added
- `README.md`
- `Makefile` only if new frontend commands are needed

## Acceptance Criteria

- Frontend routes render successfully.
- App has a stable layout and navigation structure.
- Pinia is registered.
- Placeholder pages are present for planned product areas.
- `npm run build` passes inside the `web` container.
- No real product business logic is implemented.

## Verification Commands

```bash
make npm-install
make web-build
docker compose -f docker-compose.local.yml ps
```

## Completion Notes

Not started.
