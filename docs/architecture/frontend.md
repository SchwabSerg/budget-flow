# Frontend Architecture

## Chosen Approach

BudgetFlow uses a feature-based frontend architecture with domain-inspired boundaries.

Business-related code is grouped by feature or domain area, such as dashboard, expenses, calendar, assets, savings, auth, notifications, and settings. Truly reusable low-level code lives in `shared/`. App bootstrap code lives in `app/`, and layout shells live in `layouts/`.

## Why We Chose It

- It scales better than a purely technical folder structure as product areas grow.
- It makes feature ownership clearer because pages, components, stores, API calls, and types can live near the feature they support.
- It reduces coupling by discouraging unrelated features from importing each other's internals.
- It makes navigation during development easier because code is organized around product concepts.
- It demonstrates architectural thinking for portfolio reviews and interviews without over-engineering a pet project.

## What We Are Not Doing

- This is not a heavy backend-style DDD implementation.
- This is not a fully strict Feature-Sliced Design implementation.
- This is not a flat technical structure organized only by global `components/`, `pages/`, `stores/`, and `services/` folders.

## Target Structure

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

## Folder Responsibilities

- `app/` owns application bootstrap code such as the root app component, router setup, and provider wiring.
- `layouts/` owns page shells that define the surrounding structure for authenticated and guest screens.
- `features/` owns domain or feature code. A feature can contain its own pages, components, stores, API helpers, types, and utilities.
- `shared/` owns reusable low-level code that is not specific to one product feature, such as HTTP clients, environment config, generic UI components, utilities, and shared types.
- `main.ts` is the Vite entrypoint and should stay small. It mounts the app and wires app-level providers.

## Import Rules

- Feature code can import from `shared/`.
- Feature code should avoid importing internals from unrelated features.
- `shared/` should not import from `features/`.
- `app/` can wire providers, router, and features together.
- `layouts/` can use shared UI and router links.
- Cross-feature communication should happen through API calls, route params, events, or higher-level app coordination, not direct tight coupling between feature internals.

## Interview Explanation

In an interview, describe this as a pragmatic feature-based Vue architecture: the app is organized around product areas rather than technical file types, while shared infrastructure remains centralized. It is intentionally lighter than strict DDD or strict Feature-Sliced Design, but it gives clear ownership boundaries, reduces coupling, and keeps the codebase easier to navigate as the product grows.
