# Task 001 - Frontend Foundation

## Status

Done.

## Goal

Turn the fresh Vue 3 + TypeScript + Vite scaffold into a real application shell without implementing product business logic.

## Context

The frontend currently exists as a scaffolded Vite app. The next step is to prepare structure, routing, state management, environment conventions, layout, and placeholder pages for future product work.

## Scope

- Add Vue Router.
- Add Pinia.
- Document and follow feature-based frontend architecture with domain-inspired boundaries.
- Define frontend folder conventions for `app/`, `layouts/`, `features/`, `shared/`, and `main.ts`.
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

## Target Frontend Structure

The target structure should follow [Frontend Architecture](../../architecture/frontend.md):

```text
apps/web/src/
├── app/
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   └── providers/
│       └── pinia.ts
│
├── layouts/
│   ├── AppLayout.vue
│   └── AuthLayout.vue
│
├── features/
│   ├── dashboard/
│   │   ├── pages/
│   │   │   └── DashboardPage.vue
│   │   ├── components/
│   │   ├── stores/
│   │   │   └── dashboardStore.ts
│   │   ├── api/
│   │   │   └── dashboardApi.ts
│   │   └── types/
│   │       └── dashboard.ts
│   │
│   ├── expenses/
│   │   ├── pages/
│   │   │   └── ExpensesPage.vue
│   │   ├── components/
│   │   ├── stores/
│   │   ├── api/
│   │   └── types/
│   │
│   ├── calendar/
│   │   └── pages/
│   │       └── CalendarPage.vue
│   │
│   ├── assets/
│   │   └── pages/
│   │       └── AssetsPage.vue
│   │
│   ├── savings/
│   │   └── pages/
│   │       └── SavingsPage.vue
│   │
│   ├── auth/
│   │   └── pages/
│   │       └── LoginPage.vue
│   │
│   ├── notifications/
│   └── settings/
│       └── pages/
│           └── SettingsPage.vue
│
├── shared/
│   ├── api/
│   │   ├── httpClient.ts
│   │   └── healthApi.ts
│   ├── config/
│   │   └── env.ts
│   ├── ui/
│   │   ├── AppCard.vue
│   │   └── EmptyState.vue
│   ├── utils/
│   └── types/
│       └── api.ts
│
└── main.ts
```

## Acceptance Criteria

- Frontend routes render successfully.
- Frontend structure follows `docs/architecture/frontend.md`.
- Shared code is separated from feature code.
- App has a stable layout and navigation structure.
- Pinia is registered.
- Placeholder pages are present for planned product areas.
- `npm run build` passes inside the `web` container.
- No real product business logic is implemented.
- No business logic is implemented yet.

## Verification Commands

```bash
make npm-install
make web-build
docker compose -f docker-compose.local.yml ps
```

## Completion Notes

Implemented the frontend application shell with Vue Router, Pinia, app/auth layouts, placeholder route pages, a typed health API client, frontend environment example, and mobile-first navigation. No authentication or product business logic was added.

The frontend source tree was aligned to the feature-based structure documented in `docs/architecture/frontend.md`. App bootstrap code lives in `app/`, layouts remain in `layouts/`, feature pages/stores live under `features/`, and reusable API/types live under `shared/`.
