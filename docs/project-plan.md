# BudgetFlow Project Plan

This is the full implementation plan from the current state through demo-ready.
It is the source of truth for sequencing, scope, and milestones. If a task is
not in this plan, it is not in scope.

---

## Snapshot

- **Goal:** Production-style portfolio project demo-ready for technical interviews.
- **Timeline:** 2–3 weeks from start of Stage 5.5.
- **Demo scope:** Auth + categories + expenses + dashboard + calendar + savings + assets.
- **Hero feature:** Real-time dashboard updates via Reverb.
- **Out of scope:** Bank imports, multi-currency aggregation, dark mode, mobile-native apps.

---

## Current State

- Stage 1–5 complete: monorepo, Docker, CI, Laravel infra, frontend foundation, Pint, PHPStan, Auth API+frontend, Categories API, Expenses API.
- Frontend uses old teal/slate styles from initial scaffold.
- Backend defaults expense currency to UAH.
- No design system, no money formatting utility, no Vitest, no Tailwind beyond defaults.

---

## Task Inventory

Each task has: ID, name, scope summary, dependencies, estimate (in working days
assuming focused execution), and acceptance signal.

Estimates assume Codex implements and you review. They do not include calendar
time lost to context switches, debugging, or unexpected issues. Add ~30%
buffer for realistic calendar time.

### Stage 5.5 — Backend cleanup

Status: Done.

| ID | Task | Est | Depends on |
|---|---|---|---|
| 5.5 | Currency default UAH | 0.25d | — |

**Acceptance:** Currency defaults to UAH everywhere. All existing tests pass with UAH fixtures.

---

### Stage 6 — Design system foundation

| ID | Task | Est | Depends on |
|---|---|---|---|
| 6.1 | Frontend tooling (Tailwind, Vitest, Fontsource, Lucide) | 0.5d | 5.5 |
| 6.2 | Design tokens + money formatter | 0.5d | 6.1 |
| 6.3 | Migrate app shell + auth screens to tokens | 1d | 6.2 |

**Acceptance:** Existing app uses new visual language end-to-end. Money formatter tested. No old teal/slate anywhere.

---

### Stage 7 — Component primitives + categories schema

| ID | Task | Est | Depends on |
|---|---|---|---|
| 7.1 | Component primitives (Button, Input, Card, ListRow, CategoryPill, EmptyState, Modal) | 1.5d | 6.3 |
| 7.2 | Categories schema migration (add emoji, color enum) | 0.5d | 6.2 |

**Acceptance:** All primitives have Vitest + Vue Test Utils tests. Categories store emoji + color name. API and tests updated.

7.1 and 7.2 can run in parallel if you have bandwidth — 7.1 is frontend, 7.2 is backend.

---

### Stage 8 — Expense + category UI (the first vertical slice)

| ID | Task | Est | Depends on |
|---|---|---|---|
| 8.1 | App shell with bottom tab bar + protected route layout | 0.5d | 7.1 |
| 8.2 | Categories management screen (list, create, edit, delete) | 1d | 7.1, 7.2 |
| 8.3 | Expenses list screen (with filters: month, category) | 1d | 7.1, 8.2 |
| 8.4 | Expense create/edit modal sheet | 1d | 7.1, 8.2 |
| 8.5 | Expense detail screen (read-only with edit/delete actions) | 0.5d | 8.4 |

**Acceptance:** User can sign up, create categories, log expenses, view them filtered by month and category, edit, delete. Full CRUD vertical slice working end-to-end.

This is the **first interview-demoable milestone**. If timeline pressure hits, stopping here is acceptable.

---

### Stage 9 — Dashboard

| ID | Task | Est | Depends on |
|---|---|---|---|
| 9.1 | Dashboard summary API (monthly totals, category breakdown, recent transactions) | 1d | 5.5, 8.5 |
| 9.2 | Dashboard summary API tests + caching | 0.5d | 9.1 |
| 9.3 | Dashboard screen (hero card, quick stats, category breakdown, recent list) | 1d | 9.1, 7.1 |
| 9.4 | Reverb integration: real-time dashboard refresh on expense changes | 1d | 9.3 |

**Acceptance:** Dashboard loads quickly, updates in real time when expenses change in another browser tab. This is the hero feature for interview demo.

---

### Stage 10 — Calendar view

| ID | Task | Est | Depends on |
|---|---|---|---|
| 10.1 | Calendar API endpoint (daily totals for a month) | 0.5d | 8.5 |
| 10.2 | Calendar screen (month grid with daily totals + tap-to-see-day) | 1d | 10.1, 7.1 |

**Acceptance:** User can navigate months, see daily spending intensity, tap a day to see that day's expenses.

---

### Stage 11 — Savings + assets

| ID | Task | Est | Depends on |
|---|---|---|---|
| 11.1 | Savings API (CRUD for savings goals with target + current amount) | 0.5d | 5.5 |
| 11.2 | Savings screen (list of goals with progress bars) | 0.75d | 11.1, 7.1 |
| 11.3 | Assets API (CRUD for tracked assets with name, category, current value) | 0.5d | 5.5 |
| 11.4 | Assets screen (list with total net worth) | 0.75d | 11.3, 7.1 |
| 11.5 | Settings screen (profile, logout, app version) | 0.5d | 7.1 |

**Acceptance:** Savings goals show progress. Assets list with computed total. Settings screen exists.

---

### Stage 12 — Polish + deploy

| ID | Task | Est | Depends on |
|---|---|---|---|
| 12.1 | Error boundary + global error handling on the frontend | 0.5d | All UI tasks |
| 12.2 | Loading skeletons across all data-driven screens | 0.5d | All UI tasks |
| 12.3 | Empty states across all lists | 0.5d | All UI tasks |
| 12.4 | Production Docker build (multi-stage, non-root user, no source bind mount) | 1d | All API tasks |
| 12.5 | GitHub Actions: build + push images to GHCR | 0.5d | 12.4 |
| 12.6 | VPS deployment on Hetzner with Traefik (TLS, Reverb WebSocket route) | 1.5d | 12.5 |
| 12.7 | Demo data seeder (one-command realistic dataset for screenshots/demo) | 0.25d | All API tasks |
| 12.8 | README polish: screenshots, architecture diagram, demo link, setup instructions | 0.5d | 12.6, 12.7 |

**Acceptance:** App is live at a public URL. README is interview-ready with screenshots and a working demo link.

---

## Total Estimates

| Stage | Estimate |
|---|---|
| 5.5 cleanup | 0.25d |
| 6 design system | 2.0d |
| 7 primitives + categories schema | 2.0d |
| 8 expense vertical slice | 4.0d |
| 9 dashboard + Reverb | 3.5d |
| 10 calendar | 1.5d |
| 11 savings + assets + settings | 3.0d |
| 12 polish + deploy | 5.25d |
| **Total** | **~21.5 days** |

That's 21.5 days of focused implementation work. Compressed into 14–21 calendar days as you originally targeted, this is **tight but doable** — assuming Codex stays focused, no major surprises, and you don't accumulate review backlog.

---

## Milestone Plan

### Week 1 — Foundation (target: end of day 7)
- Stage 5.5, 6, 7 complete.
- Component primitives shipped, tested.
- App visually consistent in new design language.
- Auth screens migrated. Categories schema updated.

**Cut signal:** if at end of week 1 you've only completed Stage 6, drop Stage 11 (savings/assets) entirely from the demo. Keep auth + expenses + dashboard + calendar.

### Week 2 — Vertical slice + dashboard (target: end of day 14)
- Stage 8 complete: expense CRUD vertical slice works.
- Stage 9 complete: dashboard with real-time updates.
- Optional: Stage 10 calendar started.

**Cut signal:** if dashboard is not done by day 12, drop Reverb realtime (Task 9.4) and ship dashboard with manual refresh. Reverb stays as a "ready to demo, just needs flag flip" detail you mention in interviews.

### Week 3 — Breadth + deploy (target: end of day 21)
- Stage 10, 11, 12 complete.
- App deployed to VPS.
- README polished with screenshots.

**Cut signal:** if at day 17 you're behind, deployment becomes the absolute priority. A deployed app with fewer features beats a feature-complete app running on localhost.

---

## Risk Register

### Critical risks

**R1 — Codex producing inconsistent UI across features.**
*Likelihood: high without intervention.*
*Mitigation: every frontend task prompt explicitly references docs/design/system.md. Component primitives (Stage 7) must ship before any feature UI starts. No exceptions, no shortcuts.*

**R2 — Scope creep eating timeline.**
*Likelihood: high.*
*Mitigation: this plan is the source of truth. New ideas go into a "deferred" section, not into the active plan. Codex is instructed (per development-rules.md) to flag, not implement, scope-adjacent improvements.*

**R3 — Real-time Reverb integration consuming more time than estimated.**
*Likelihood: medium. WebSocket integrations always take longer than expected.*
*Mitigation: Task 9.4 is allocated 1 day but flagged as droppable. If it spills into day 2, drop it and ship dashboard with manual refresh.*

**R4 — Deployment problems on VPS in week 3.**
*Likelihood: medium.*
*Mitigation: do a deployment dry-run at end of week 1 with whatever exists at that point. Don't wait until day 18 to discover Traefik certificate issues.*

### Locked decisions

**D1 — Deployment target: Hetzner Cloud.**
Recommended sizing: CX22 (€4.51/month, 2 vCPU, 4GB RAM). Region: Falkenstein
or Helsinki for EU latency. A domain name is required — purchase before
week 3. Suggested: a `.app`, `.dev`, or `.io` for portfolio polish; a
`budgetflow.your-name.dev` subdomain on a domain you already own works too.

**D2 — Reverse proxy: Traefik.**
Matches the stated stack. Adds complexity to Task 12.6 (estimate increased
from 1d to 1.5d). Configuration uses Docker labels for routing, Let's
Encrypt for TLS, and a single network shared between Traefik and the app
services. Will require careful handling of the Reverb WebSocket route
(separate router with `Upgrade` header support).

**D3 — Demo data: pre-seeded demo account.**
A dedicated demo user (`demo@budgetflow.app` / fixed password documented
in README) is created during the deployment pipeline with realistic data:
6–8 categories, ~40 expenses spanning 2–3 months, 2 savings goals at
different progress levels, 3–4 tracked assets. Real signups still create
empty accounts. Task 12.7 produces this seeder.

**D4 — Testing rhythm: alongside every task.**
Tests are written as part of the implementing task, never deferred.
Every task prompt explicitly lists the required tests. A task is not
complete until its tests pass. This is the standard the project's
testing-strategy.md assumes; we are formalizing it as the rule.

### Known unknowns

**U1 — Tailwind v4 readiness with current Vite version.**
Codex's review on Task 6.1 will surface this. Plan B is Tailwind v3.

**U2 — Reverb behind a reverse proxy in production.**
Local dev works; production with TLS and a single domain is an extra config challenge. Allocate buffer time in week 3.

**U3 — Whether the existing auth frontend (already shipped) needs revisiting.**
Per AGENTS.md, frontend auth uses localStorage for tokens. For a portfolio demo this is fine but it's a reviewable decision. Be ready to defend it in interviews.

---

## Deferred Decisions

These are explicitly out of scope for the demo, captured here so they're not forgotten:

- Bank imports (Monobank integration, deduplication, import progress UI).
- Multi-currency aggregation with conversion rates.
- Dark mode.
- Mobile native apps (Capacitor, etc.).
- Multi-user features (shared budgets, family accounts).
- Notifications (push, email).
- Recurring expense automation.
- Receipt photo attachments.
- Export to CSV/PDF.
- Account deletion / GDPR self-service.

If asked about these in an interview, the answer is: "deliberately scoped out of the MVP to focus on demonstrating end-to-end production-style architecture; here's where it would slot in."

---

## How to use this plan

1. **Treat tasks as immutable units.** Don't merge two tasks because they're "small." Don't split a task because it's "big" — if it's too big, that's a sign the plan is wrong and we should re-discuss before splitting.

2. **Check the milestone plan at the end of each week.** If you're behind, apply the cut signal for that week.

3. **Update this doc when reality diverges from plan.** If Task 8.3 takes 2 days instead of 1, log that here. Future estimates calibrate from real history.

4. **No undocumented work.** If Codex implements something not in this plan, that's a process failure that needs surfacing immediately.

---

## Related Documents

- `docs/progress.md` — current task status and last commit
- `docs/roadmap.md` — high-level product roadmap (lighter weight than this plan)
- `docs/tasks/` — individual task files with completion notes
- `docs/design/system.md` — design system reference
- `docs/engineering/development-rules.md` — assistant working rules
