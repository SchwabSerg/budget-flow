# Code Quality Standards

## Goal

BudgetFlow is a production-style portfolio project. Code quality is one of the main goals of the project.

The codebase should demonstrate:

- clean architecture;
- framework conventions;
- maintainability;
- testability;
- strong typing where reasonable;
- clear separation of concerns;
- predictable project structure;
- production-style thinking.

The project should not look like a quick demo or tutorial application.

---

# Backend Code Quality

## Laravel Conventions

Backend code should follow Laravel conventions unless there is a clear reason not to.

Use:

- Controllers for HTTP orchestration only.
- Form Requests for validation.
- API Resources for response formatting.
- Policies for authorization.
- Services or Actions for business use cases when controller logic becomes non-trivial.
- Jobs for background work.
- Events for cross-cutting or real-time updates.
- Feature tests for API behavior.
- Unit tests for isolated business calculations.

Avoid:

- business logic in routes;
- large controllers;
- large models with unrelated responsibilities;
- duplicated validation logic;
- returning raw models directly from complex API endpoints;
- leaking sensitive fields in API responses;
- mixing infrastructure code with business logic.

---

## Controllers

Controllers should be thin.

A controller may:

- receive a request;
- call a Form Request;
- call an Action/Service;
- return an API Resource or JSON response.

A controller should not contain large business workflows.

Good:

```php
public function store(StoreExpenseRequest $request, CreateExpenseAction $action): ExpenseResource
{
    $expense = $action->handle($request->user(), $request->validated());

    return new ExpenseResource($expense);
}
````

Bad:

```php
public function store(Request $request)
{
    // validation
    // authorization
    // category lookup
    // calculations
    // cache invalidation
    // broadcasting
    // response formatting
}
```

---

## Form Requests

Use Form Requests for validation when adding or updating API resources.

Validation rules should be explicit and readable.

Validation behavior should be covered by feature tests for important endpoints.

---

## API Resources

Use API Resources for structured responses when returning models or collections.

API responses should be predictable and should avoid leaking internal database structure.

---

## Policies

Use Policies for user-owned resources.

Any endpoint that reads, updates or deletes user-owned data must ensure the authenticated user has access to that resource.

Examples:

* expenses;
* categories;
* savings;
* assets;
* bank connections;
* imports;
* notifications.

---

## Services and Actions

Use Services or Actions when a use case becomes more than simple CRUD.

Examples:

* calculating dashboard summaries;
* importing bank transactions;
* recalculating monthly statistics;
* applying import filters;
* categorizing transactions;
* broadcasting real-time updates.

Suggested naming:

```text
app/Actions/Expenses/CreateExpenseAction.php
app/Actions/Dashboard/BuildMonthlySummaryAction.php
app/Services/Banking/MonobankClient.php
```

Do not create abstractions too early. Add them when they improve clarity.

---

## Models

Models should define:

* relationships;
* casts;
* scopes;
* simple model-specific helpers.

Avoid placing large business workflows in models.

---

## Database

Migrations should be explicit and readable.

Use:

* foreign keys where appropriate;
* indexes for common filters;
* clear column names;
* enums or constrained strings where useful;
* timestamps;
* soft deletes only when the domain requires it.

---

## Redis Usage

Redis should be used intentionally:

* cache dashboard summaries;
* queue background jobs;
* rate-limit expensive endpoints;
* store temporary import progress if needed.

Do not use Redis just for demonstration if a simpler database approach is better.

---

## Reverb / WebSockets

Use Reverb only where real-time behavior is meaningful:

* dashboard refresh after expense changes;
* import progress;
* notifications;
* future multi-device sync.

Do not replace normal HTTP requests with WebSockets unnecessarily.

---

## Error Handling

API errors should be clear and consistent.

Avoid exposing internal exception messages to users.

Expected error responses should be tested.

---

## Security

Never commit secrets.

Never expose:

* `.env`;
* API tokens;
* Monobank tokens;
* database passwords;
* private keys;
* generated secrets.

Bank tokens and sensitive user data must never be stored in frontend state, localStorage, or committed files.

---

# Frontend Code Quality

## Architecture

The frontend uses a feature-based architecture with domain-inspired boundaries.

Code should be grouped by business capability:

* dashboard;
* expenses;
* calendar;
* assets;
* savings;
* auth;
* notifications;
* settings.

Avoid a flat structure where all components, stores, services and types are placed in global folders.

---

## Folder Responsibility

Use:

```text
src/app         # application bootstrap, router, providers
src/layouts     # layout shells
src/features    # business features
src/shared      # reusable low-level code
```

`shared/` should contain only truly reusable code.

Do not put domain-specific components such as `ExpenseForm.vue` into `shared/`.

---

## Components

Components should be small and focused.

A component should usually have one clear responsibility.

Avoid:

* large components with many unrelated concerns;
* deeply nested conditional rendering;
* API calls directly inside presentational components;
* duplicated form logic.

---

## Pinia Stores

Pinia stores should manage feature state and orchestration.

Avoid turning stores into huge service classes.

Good store responsibilities:

* loading state;
* current data;
* calling feature API modules;
* updating state after actions;
* reacting to WebSocket events.

Complex business calculations should live in separate functions or backend endpoints.

---

## API Layer

API calls should live in:

```text
src/shared/api/
```

or inside feature-specific folders:

```text
src/features/expenses/api/
src/features/dashboard/api/
```

Do not scatter fetch calls across random components.

Use typed API responses.

---

## TypeScript

Use TypeScript types/interfaces for:

* API responses;
* request payloads;
* domain entities;
* store state;
* reusable UI props.

Avoid `any` unless there is a clear reason.

If `unknown` is used, narrow it before using.

---

## Environment Config

Do not hardcode backend URLs.

Use Vite environment variables:

```text
VITE_API_BASE_URL=http://localhost:8086
```

Environment parsing should be centralized in shared config.

---

## Styling

The project should use a clean, mobile-first UI.

Do not over-invest in visual polish before architecture and core functionality are stable.

Keep UI reusable and consistent.

---

## Documentation

When architecture or workflow changes, update relevant documentation:

* README.md
* docs/setup.md
* docs/roadmap.md
* docs/progress.md
* docs/architecture/*
* docs/engineering/*
* task files

---

# Quality Tools

Planned backend tools:

* PHPUnit
* Laravel Pint
* Larastan / PHPStan

Planned frontend tools:

* Vitest
* Vue Test Utils
* vue-tsc
* ESLint
* Prettier

Quality tools should be added before major feature development.
