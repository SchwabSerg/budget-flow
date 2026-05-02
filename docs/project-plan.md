# BudgetFlow Project Plan

This is the master implementation plan from current state through demo-ready.

**Authoritative.** If a task is not in this plan, it is not in scope.

---

## Snapshot

- **Goal:** Production-style portfolio project, demo-ready for technical interviews.
- **Timeline:** 2–3 weeks from current state.
- **Demo scope:** Auth + categories + expenses + dashboard + calendar + savings + assets.
- **Hero feature:** Real-time dashboard updates via Reverb.
- **Out of scope:** Bank imports, multi-currency aggregation, dark mode, native apps, recurring expense automation, receipt photos, exports, notifications.

---

## Locked decisions

- Default currency: UAH (locked Task 5.5).
- UI direction: Friendly + approachable, Monzo/Revolut DNA, coral primary.
- Frontend stack: Tailwind from scratch, no UI library.
- Deployment: Hetzner Cloud + Traefik + Let's Encrypt.
- Demo data: pre-seeded demo account on the deployed instance.
- Testing rhythm: alongside every task.

---

## Current state

- **Done:** Stages 1–5 (monorepo, Docker, CI, Laravel infra, frontend foundation, Pint, PHPStan, Auth API+frontend, Categories API, Expenses API). Task 5.5 (UAH default).
- **Done:** Task 6 frontend design system foundation.

---

## Task chunks

Each chunk is a self-contained task delivered to Codex as a single prompt. Each ends in a working, committable state.

| # | Task | Estimate | Depends on |
|---|---|---|---|
| 6 | Frontend design system foundation | 1.5d | 5.5 |
| 7 | Component primitives library | 1.5d | 6 |
| 8 | App shell + navigation + auth screen migration | 1d | 7 |
| 9 | Categories: schema migration + management UI | 1.5d | 7 |
| 10 | Expenses UI: list + filters + create/edit + detail | 2d | 9 |
| 11 | Dashboard: API + screen + Reverb real-time | 2.5d | 10 |
| 12 | Calendar: API + month grid screen | 1d | 10 |
| 13 | Savings: API + UI | 1d | 7 |
| 14 | Assets: API + UI | 1d | 7 |
| 15 | Settings screen + polish pass (loading, errors, empty states) | 1d | 13, 14 |
| 16 | Production Docker images + CI publish to GHCR | 1d | All product tasks |
| 17 | Hetzner deployment + Traefik + TLS + demo seeder | 1.5d | 16 |
| 18 | README polish + screenshots + architecture diagram | 0.5d | 17 |

**Total: ~17 days of focused implementation.**

That's tighter than the previous 21.5d estimate, reflecting both the chunking efficiency and Codex's demonstrated pace on Task 5.5.

---

## What's inside each chunk (one-liners, not specs)

**Task 6 — Frontend design system foundation.** Tailwind, Vitest, Fontsource (Inter + Bricolage), Lucide. Tokens wired into Tailwind theme. Money formatter installed and tested. `make web-test` command. Existing four uncommitted design files committed. App still uses old visual language; nothing migrated yet.

**Task 7 — Component primitives library.** Build and test Button, Input, Card, ListRow, CategoryPill, EmptyState, ModalSheet, AppHeader, BottomTabBar. Each with Vitest + Vue Test Utils tests. Visual demo route at `/dev/components` (gated to dev only) for manual review.

**Task 8 — App shell + navigation + auth migration.** AppLayout with bottom tab bar, AuthLayout for guest screens. Migrate login + register + protected route guard to use new primitives. After this task, the entire app uses the new visual language.

**Task 9 — Categories.** Backend: add `emoji` (string) and migrate `color` from hex to enum (coral|teal|purple|pink|amber|blue|green). Frontend: categories list, create modal, edit, delete with confirmation. Default seed of common categories on user signup.

**Task 10 — Expenses UI.** List with month picker + category filter, create expense modal sheet, edit, detail view, delete with confirmation. Money input uses parseAmount; all displays use formatMoney. **First end-to-end interview-demoable milestone.**

**Task 11 — Dashboard with Reverb.** Backend: dashboard summary endpoint (monthly total, category breakdown, recent transactions) with Redis caching. Broadcasting on expense changes. Frontend: dashboard screen with hero card, quick stats, category breakdown, recent list. Reverb integration so dashboard updates live when expenses change in another tab. **Hero feature.**

**Task 12 — Calendar.** Backend: daily totals endpoint for a month. Frontend: month grid with daily intensity, tap-to-see-day expenses.

**Task 13 — Savings.** Backend: savings goals CRUD (target amount, current amount, optional deadline). Frontend: list with progress bars, create, edit, delete.

**Task 14 — Assets.** Backend: tracked assets CRUD (name, category, current value). Frontend: list with computed total net worth, create, edit, delete.

**Task 15 — Settings + polish pass.** Settings screen (profile, logout, currency display). Audit every screen for loading skeletons, error boundaries, empty states. Fix gaps.

**Task 16 — Production images + CI.** Multi-stage Dockerfiles for api and web (no source bind mounts, non-root user, immutable). GitHub Actions to build and push images to GHCR on main.

**Task 17 — Deploy to Hetzner.** Provision CX22, install Docker, configure Traefik with Let's Encrypt, deploy `docker-compose.prod.yml`, configure Reverb's WebSocket route through Traefik, run migrations, run demo seeder for `demo@budgetflow.app`.

**Task 18 — README + portfolio polish.** Screenshots, architecture diagram, demo URL, demo credentials, "what I'd do next" section, link to live app.

---

## Milestone plan

### Week 1 — Foundation + first vertical slice
- Tasks 6, 7, 8, 9, 10
- End state: deployed locally, can sign up, manage categories, full expense CRUD with friendly UI.
- **Cut signal:** if at end of week 1 you've only completed through task 8, drop savings + assets (tasks 13, 14) from demo scope.

### Week 2 — Dashboard + breadth
- Tasks 11, 12, 13, 14, 15
- End state: dashboard with real-time updates, calendar, savings, assets, full polish pass.
- **Cut signal:** if dashboard (11) takes more than 3 days, drop Reverb realtime (ship dashboard with manual refresh), keep Reverb infrastructure ready to flip on.

### Week 3 — Deploy
- Tasks 16, 17, 18
- End state: live at public URL with demo account, polished README, portfolio-ready.
- **Cut signal:** if at day 17 you're behind, deployment is the absolute priority. Drop polish pass (15) before dropping deploy.

---

## Risk register

**R1 — UI inconsistency across features.** Mitigated by building primitives (task 7) before any feature UI starts.

**R2 — Scope creep.** Mitigated by this plan being authoritative. New ideas go to "deferred."

**R3 — Reverb integration consuming time.** Droppable per cut signal in week 2.

**R4 — Deployment surprises.** Mitigated by doing a deployment dry-run as soon as task 16 lands (don't wait until week 3 to discover Traefik issues).

**R5 — Codex producing two commits per task with identical messages.** Observed in task 5.5. Mitigation: every task prompt now explicitly requires a single squashed commit at the end.

---

## Deferred (explicitly out of scope)

Bank imports (Monobank), multi-currency conversion, dark mode, mobile native apps, multi-user/family accounts, push notifications, recurring expense automation, receipt photos, CSV/PDF export, GDPR self-service deletion, account recovery flows beyond basic password reset.

If a reviewer asks about any of these in an interview: *"Deliberately scoped out of MVP to focus on demonstrating end-to-end production architecture; here's where it would slot in."*

---

## Working rhythm

For each task:

1. CTO writes prompt referencing this plan.
2. User pastes to Codex.
3. Codex returns pre-implementation review.
4. CTO reviews → green-light or revise.
5. Codex implements.
6. Codex returns completion report (single squashed commit, all tests pass).
7. CTO reviews completion → approve or request fixes.
8. User commits and moves to next task.

**No undocumented work.** If Codex implements something not in this plan, it's a process failure to surface, not a fait accompli to accept.

---

## Calibration log

Recorded actual vs. estimated effort to improve future estimates.

| Task | Estimate | Actual | Notes |
|---|---|---|---|
| 5.5 | 0.25d | <1h | Small contained backend cleanup. Codex faster than estimated. |
| 6 | 1.5d | <1d | Tooling, tokens, fonts, Tailwind v4, Vitest, and money formatter foundation. |
