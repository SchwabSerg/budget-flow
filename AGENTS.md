# AGENTS.md — BudgetFlow Project Instructions

## Project

BudgetFlow is a production-style full-stack personal finance tracker.

The project is built as a portfolio-grade codebase to demonstrate:

- Laravel API development;
- Vue 3 + TypeScript frontend development;
- Docker-first local development;
- PostgreSQL;
- Redis;
- Horizon;
- Reverb;
- Scribe;
- Traefik;
- GitHub Actions;
- GitHub Container Registry;
- VPS deployment;
- clean architecture;
- testing discipline;
- documentation discipline.

---

# Required Reading Before Work

Before editing files, read the relevant documentation.

Always start with:

- README.md
- docs/progress.md

Then read the task-specific and architecture-specific docs:

- docs/setup.md
- docs/roadmap.md
- docs/architecture/frontend.md
- docs/engineering/code-quality.md
- docs/engineering/testing-strategy.md
- docs/engineering/development-rules.md
- the relevant task file from docs/tasks/

If the task is frontend-related, read:

- docs/architecture/frontend.md

If the task changes behavior, read:

- docs/engineering/testing-strategy.md

If the task changes architecture or workflow, update the relevant docs.

---

# Working Rules

## One Task At A Time

Implement only the requested task.

Do not implement future milestones early.

Do not expand scope without explicit approval.

---

## Container-First Workflow

Do not require host PHP or host Node.

Use Makefile and Docker-based commands.

Preferred commands:

```bash
make up
make ps
make composer-validate
make api-test
make web-build
make api-health
make artisan CMD="..."
````

When new quality commands are added, use them.

---

## Code Quality

Follow:

* docs/engineering/code-quality.md
* docs/engineering/testing-strategy.md
* docs/engineering/development-rules.md

Backend:

* thin controllers;
* Form Requests for validation;
* API Resources for responses;
* Policies for authorization;
* Services/Actions for non-trivial use cases;
* PHPUnit tests for backend behavior.

Frontend:

* feature-based architecture with domain-inspired boundaries;
* Pinia for state;
* typed API responses;
* Vitest tests for frontend logic;
* no unrelated feature coupling.

---

## Testing

Behavior changes require tests.

Backend:

* use PHPUnit;
* API endpoints require feature tests;
* validation and authorization must be tested;
* business calculations require tests.

Frontend:

* use Vitest;
* test stores, API clients, utilities and important UI behavior;
* do not over-test static placeholders.

If tests are not added for a behavior change, explain why.

---

## Documentation

Update documentation when changing:

* architecture;
* workflow;
* API behavior;
* development process;
* project status.

Common docs:

* README.md
* docs/progress.md
* docs/roadmap.md
* docs/setup.md
* docs/architecture/*
* docs/engineering/*
* docs/tasks/*

After completing a task:

* update docs/progress.md;
* update the task file completion notes;
* set the next recommended task.

---

## Safety

Never commit secrets or runtime files:

* .env
* API tokens
* Monobank tokens
* database dumps
* private keys
* vendor/
* node_modules/
* generated caches
* logs
* IDE files

Check git status before finishing.

---

# Completion Report

When finishing, report:

* files created/modified;
* packages installed;
* commands run;
* verification results;
* tests added;
* documentation updated;
* issues encountered;
* recommended commit message;
* recommended next task.

Do not claim something passed unless it was actually run.