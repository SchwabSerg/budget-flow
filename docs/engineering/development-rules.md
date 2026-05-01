# LLM Development Rules

## Goal

This document defines how Codex or any other LLM coding assistant must work in this repository.

BudgetFlow is a production-style portfolio project. The assistant must prioritize correctness, maintainability, tests, documentation and small reviewable changes.

---

# Core Rules

## 1. Read Documentation First

Before making changes, always read the relevant documentation:

- README.md
- docs/setup.md
- docs/roadmap.md
- docs/progress.md
- relevant task file from docs/tasks/
- relevant architecture docs
- relevant engineering docs

Do not start editing files before understanding the current task scope.

---

## 2. Work On One Task At A Time

Only implement the requested task.

Do not implement future milestones early.

Do not add unrelated improvements unless explicitly requested.

If a related issue is discovered, document it as a follow-up instead of expanding the scope.

---

## 3. Keep Changes Small And Reviewable

Prefer small, clear changes.

Avoid large mixed changes that combine:

- infrastructure;
- backend business logic;
- frontend UI;
- tests;
- documentation;
- deployment.

A task may touch multiple areas only if the task explicitly requires it.

---

## 4. Follow The Project Architecture

Frontend must follow:

- feature-based architecture with domain-inspired boundaries;
- shared code only in `shared/`;
- no direct coupling between unrelated feature internals.

Backend must follow:

- Laravel conventions;
- thin controllers;
- Form Requests;
- API Resources;
- Policies;
- Services/Actions where useful;
- tests for meaningful behavior.

---

## 5. Tests Are Required For Behavior Changes

When adding or changing behavior:

- backend behavior requires PHPUnit tests;
- frontend logic requires Vitest tests;
- API endpoints require feature tests;
- validation rules require tests;
- authorization requires tests;
- business calculations require tests.

If tests are not added, explain why in completion notes.

---

## 6. Update Documentation

When changing architecture, workflow or public behavior, update relevant docs.

Possible files:

- README.md
- docs/setup.md
- docs/roadmap.md
- docs/progress.md
- docs/architecture/*
- docs/engineering/*
- task files

---

## 7. Update Progress

After completing a task:

- update `docs/progress.md`;
- update the task file completion notes;
- mark task status correctly;
- set the next recommended task.

---

## 8. Run Verification Commands

Run relevant verification commands before reporting completion.

Examples:

```bash
make composer-validate
make api-test
make web-build
make api-health
make ps
````

When quality tools are added, also run:

```bash
make api-pint
make api-phpstan
make web-test
make web-type-check
make web-lint
make quality
```

If a command cannot be run, explain why.

---

## 9. Never Commit Secrets Or Runtime Files

Never commit:

* `.env`;
* real API tokens;
* Monobank tokens;
* database dumps;
* private keys;
* `vendor/`;
* `node_modules/`;
* generated caches;
* logs;
* local IDE files;
* generated Scribe docs unless intentionally required.

Check `.gitignore` before staging files.

---

## 10. Do Not Hide Problems

If something is uncertain, failing or incomplete, report it clearly.

Do not claim that something works unless it was verified.

---

## 11. Prefer Explicit Assumptions

If assumptions are needed, state them.

Example:

```text
Assumption: Authentication endpoints are not implemented yet, so frontend route guards were not added in this task.
```

---

## 12. Keep The Project Container-First

Do not require host PHP or host Node.

Use Docker and Makefile commands.

Host tools may exist, but the documented workflow must be container-first.

---

# Task Completion Format

When finishing a task, report:

```text
Files created/modified
Packages installed
Commands run
Verification results
Tests added
Docs updated
Issues encountered
Recommended commit message
Recommended next task
```

---

# Scope Control

If the user asks for a task, do exactly that task.

Do not start the next task automatically.

Do not create extra features because they seem useful.

Do not refactor unrelated code.

---

# Project Standard

A task is complete only when:

* implementation matches the task scope;
* relevant tests are added;
* documentation is updated;
* verification commands pass;
* no unrelated files are changed;
* progress is updated;
* completion notes are written.