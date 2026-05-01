# Testing Strategy

## Goal

BudgetFlow should demonstrate serious engineering discipline.

Testing is required for meaningful backend and frontend behavior.

The goal is not to reach artificial 100% coverage. The goal is to protect important behavior and show that the project is built like a real application.

---

# Testing Pyramid

The preferred testing balance:

```text
Many:
- backend feature tests
- backend unit tests for calculations/actions
- frontend store tests
- frontend utility tests

Some:
- frontend component tests
- integration-style tests for important flows

Few, later:
- end-to-end tests with Playwright
````

---

# Backend Testing

Backend tests use PHPUnit.

## Feature Tests

Use feature tests for API behavior.

Feature tests should cover:

* successful requests;
* validation errors;
* authorization errors;
* filtering;
* ownership boundaries;
* expected response structure;
* cache invalidation where relevant;
* job dispatching where relevant;
* event broadcasting where relevant.

Every new meaningful API endpoint should have feature tests.

Examples:

```text
GET /api/categories
POST /api/expenses
GET /api/dashboard/monthly-summary
POST /api/imports/monobank
```

---

## Unit Tests

Use unit tests for isolated business logic.

Unit tests should cover:

* dashboard summary calculations;
* savings rate calculations;
* monthly totals;
* category totals;
* import filtering rules;
* transaction categorization;
* formatting helpers if they contain logic.

---

## Validation Tests

Validation rules must be tested when they are important to business behavior.

Examples:

* amount must be positive;
* category must belong to the user or be available as default;
* expense type must be valid;
* month format must be valid;
* date ranges must be valid.

---

## Authorization Tests

User-owned resources must have authorization tests.

Examples:

* user cannot update another user’s expense;
* user cannot delete another user’s asset;
* user cannot view another user’s import;
* user cannot modify another user’s category.

---

## Queue and Job Tests

Jobs should be tested when they contain meaningful logic.

Examples:

* import job stores transactions;
* import job deduplicates transactions;
* summary recalculation job updates cache or data correctly;
* notification job dispatches expected notification.

---

## Reverb / Broadcasting Tests

Broadcasting should be tested where reasonable.

Examples:

* expense creation dispatches dashboard update event;
* import progress event is broadcast;
* notification event is created for the correct user.

Do not over-test framework internals.

---

## External Integration Tests

External services must be mocked.

For Monobank:

* do not call real Monobank API in tests;
* use fake HTTP responses;
* test success responses;
* test API errors;
* test empty statements;
* test duplicated transactions;
* test invalid token behavior.

---

# Frontend Testing

Frontend tests use Vitest.

Vue component tests use Vue Test Utils.

## What to Test

Test:

* Pinia stores;
* API client behavior;
* formatters and utilities;
* form validation logic;
* important UI interactions;
* route guards when auth is implemented;
* Reverb event handlers;
* dashboard state updates;
* import progress UI behavior.

---

## Store Tests

Pinia stores should be tested when they contain logic.

Examples:

* health store loads API health status;
* expenses store loads and stores expenses;
* dashboard store updates state after API response;
* dashboard store handles real-time update event.

---

## API Client Tests

API client behavior should be tested.

Examples:

* correct base URL is used;
* errors are normalized;
* typed response is returned;
* unauthorized responses are handled consistently.

---

## Component Tests

Component tests should focus on behavior, not static markup.

Test:

* form submission;
* validation messages;
* loading states;
* empty states;
* important conditional rendering;
* user interactions.

Do not test every static placeholder page.

---

## Utilities Tests

Utilities should be tested when they contain logic.

Examples:

* money formatting;
* date formatting;
* month parsing;
* percent/savings rate calculation.

---

# What Not To Over-Test

Do not over-test:

* static placeholder pages;
* simple presentational components without logic;
* framework behavior;
* CSS-only styling;
* generated files;
* implementation details that users cannot observe.

---

# Test Data

Tests should use clear, readable data.

Backend tests should use factories when possible.

Frontend tests should use small fixtures.

Avoid huge test setups unless required.

---

# Definition of Tested Feature

A feature is considered tested when:

* important successful paths are covered;
* important failure paths are covered;
* validation is tested;
* authorization is tested where relevant;
* state changes are verified;
* documentation and task completion notes mention the tests.

---

# Commands

Expected future commands:

```bash
make api-test
make web-test
make quality
```

Until all tools are added, use the available Makefile commands and document any missing quality commands in task completion notes.
