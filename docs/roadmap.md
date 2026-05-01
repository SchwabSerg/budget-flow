# BudgetFlow Development Roadmap

## 1. Project Goal

BudgetFlow is a production-style full-stack personal finance tracker built as a portfolio project.

The goal is to demonstrate practical skills in:

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Laravel API
- PostgreSQL
- Redis
- Laravel Horizon
- Laravel Reverb
- Scribe API documentation
- Docker
- Traefik
- GitHub Actions
- GitHub Container Registry
- VPS deployment

The project should not look like a simple CRUD demo. It should look like a real-world product with a clean architecture, good developer experience, documented API, real-time features, background jobs and production-style deployment.

---

## 2. Current Baseline

Initial baseline commit:

```text
c2812c3 Initialize BudgetFlow production-style foundation
````

Current state:

* Monorepo structure created.
* Laravel API app created in `apps/api`.
* Vue 3 + TypeScript + Vite app created in `apps/web`.
* Local Docker runtime implemented.
* PostgreSQL and Redis are running locally.
* Laravel runs through PHP-FPM + Nginx.
* Frontend runs through Vite dev server.
* Makefile developer workflow added.
* CI workflow added.
* Laravel Sanctum installed.
* Laravel Horizon installed.
* Laravel Reverb installed.
* Scribe installed.
* API currently exposes only `GET /api/health`.
* No business logic has been implemented yet.

---

## 3. High-Level Architecture

```text
budget-flow/
├── apps/
│   ├── api/                 # Laravel API
│   └── web/                 # Vue 3 + TypeScript frontend
│
├── docker/                  # Docker configs
├── docs/                    # Project documentation
├── docker-compose.local.yml
├── docker-compose.prod.yml
├── Makefile
└── .github/workflows/
```

Local development:

```text
Vue app
↓
Laravel API
↓
PostgreSQL
Redis
Horizon
Reverb
```

Future production:

```text
GitHub Actions
↓
Build Docker images
↓
Push images to GitHub Container Registry
↓
Hetzner VPS pulls images
↓
Docker Compose starts services
↓
Traefik handles HTTPS and routing
```

---

# 4. Development Milestones

## Milestone 1 — Foundation

Status: Done.

Goal: Prepare the project foundation without business logic.

Completed:

* Monorepo initialized.
* Laravel app scaffolded through Dockerized Composer.
* Vue app scaffolded through Dockerized Node.
* Local Docker runtime added.
* PostgreSQL added.
* Redis added.
* Makefile added.
* CI workflow added.
* Sanctum, Horizon, Reverb, Scribe installed.
* Baseline commit created.

---

## Milestone 2 — Frontend Application Foundation

Goal: Prepare the frontend structure before implementing product features.

Architecture reference: [Frontend Architecture](architecture/frontend.md).

Tasks:

* Install and configure Vue Router.
* Install and configure Pinia.
* Use a feature-based architecture with domain-inspired boundaries.
* Add API client wrapper.
* Add base TypeScript types structure.
* Add application layout.
* Add mobile-first navigation.
* Add placeholder pages:

    * Dashboard
    * Expenses
    * Calendar
    * Assets
    * Savings
    * Settings
    * Login/Register
* Add basic error/loading states.
* Add initial frontend environment variables.
* Prepare Laravel Echo placeholder for future Reverb integration.
* Keep UI simple but clean.

Target structure:

```text
apps/web/src/
├── app/
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   └── providers/
│       └── pinia.ts
├── layouts/
├── features/
│   ├── dashboard/
│   ├── expenses/
│   ├── calendar/
│   ├── assets/
│   ├── savings/
│   ├── auth/
│   ├── notifications/
│   └── settings/
├── shared/
└── main.ts
```

Expected result:

* Frontend has a real app structure.
* Feature code is grouped under `features/`.
* Reusable low-level code is grouped under `shared/`.
* Routes work.
* Pinia store is ready.
* API client can call `GET /api/health`.
* No complex business UI yet.

Suggested commit:

```text
Add frontend application foundation
```

---

## Milestone 3 — Backend API Architecture Foundation

Goal: Prepare Laravel structure for clean API development.

Tasks:

* Define backend folder conventions:

    * Actions
    * Services
    * DTOs if needed
    * API Resources
    * Form Requests
    * Policies
* Add base API response structure if needed.
* Add authenticated `/api/user` endpoint.
* Configure Sanctum for SPA/API usage.
* Add basic user model adjustments.
* Add basic feature tests.
* Configure Scribe groups for future API documentation.
* Add Laravel Pint.
* Add Larastan/PHPStan if reasonable.
* Add Makefile commands for:

    * pint
    * phpstan
    * test
    * ci-like local checks

Expected result:

* Backend has clear conventions.
* API is ready for real modules.
* Quality tools are in place.

Suggested commit:

```text
Add backend API architecture foundation
```

---

## Milestone 4 — Authentication

Goal: Implement user authentication.

Tasks:

* Add registration endpoint.
* Add login endpoint.
* Add logout endpoint.
* Add authenticated user endpoint.
* Add Sanctum-based auth flow.
* Add frontend auth store.
* Add login/register pages.
* Add route guards.
* Add authenticated app layout.
* Add guest layout.
* Add tests for auth endpoints.
* Document auth endpoints with Scribe.

Expected result:

* User can register.
* User can log in.
* User can log out.
* Frontend knows current user.
* Protected routes work.

Suggested commit:

```text
Add authentication flow
```

---

## Milestone 5 — Categories

Goal: Implement expense categories.

Tasks:

* Create categories table.
* Add default category seeding.
* Add category model.
* Add category API:

    * `GET /api/categories`
    * `POST /api/categories`
    * `PATCH /api/categories/{category}`
    * `DELETE /api/categories/{category}`
* Add policies so users only manage their own custom categories.
* Add frontend category store.
* Add category select component.
* Add tests.
* Add Scribe docs.

Default categories:

* Rent
* Utilities
* Internet
* Mobile
* Subscriptions
* Groceries
* Transport
* Health
* Education
* Family
* Entertainment
* Clothes
* Gifts
* Other

Expected result:

* Categories are available in frontend.
* User can use default and custom categories.

Suggested commit:

```text
Add expense categories
```

---

## Milestone 6 — Expenses CRUD

Goal: Implement core expense management.

Tasks:

* Create expenses table.
* Add expense model.
* Add expense types:

    * recurring
    * manual
    * imported
* Add API:

    * `GET /api/expenses`
    * `POST /api/expenses`
    * `GET /api/expenses/{expense}`
    * `PATCH /api/expenses/{expense}`
    * `DELETE /api/expenses/{expense}`
* Add filters:

    * month
    * category
    * type
    * date range
* Add frontend expenses list.
* Add expense form.
* Add edit/delete flows.
* Add validation.
* Add tests.
* Add Scribe docs.

Expected result:

* User can add, edit and delete expenses.
* User can filter expenses.
* Monthly expense list works.

Suggested commit:

```text
Add expenses CRUD
```

---

## Milestone 7 — Dashboard Summary

Goal: Implement monthly financial summary.

Tasks:

* Add dashboard summary endpoint:

```text
GET /api/dashboard/monthly-summary?month=YYYY-MM
```

* Calculate:

    * total expenses
    * recurring expenses
    * manual expenses
    * imported expenses
    * category totals
    * daily totals
    * current month balance
* Add Redis caching for dashboard summary.
* Invalidate cache after expense changes.
* Add frontend dashboard cards.
* Add simple charts.
* Add tests.
* Add Scribe docs.

Expected result:

* Dashboard shows useful monthly analytics.
* Summary is cached with Redis.
* Cache is invalidated correctly after data changes.

Suggested commit:

```text
Add monthly dashboard summary
```

---

## Milestone 8 — Calendar View

Goal: Show expenses by calendar days.

Tasks:

* Add calendar endpoint:

```text
GET /api/calendar?month=YYYY-MM
```

* Return daily totals and daily expenses.
* Add frontend calendar page.
* Add day details drawer/modal.
* Add ability to create expense for selected day.
* Add tests.
* Add Scribe docs.

Expected result:

* User can see expenses by day.
* User can open a day and inspect transactions.

Suggested commit:

```text
Add expense calendar
```

---

## Milestone 9 — Savings

Goal: Track monthly savings.

Tasks:

* Create savings table.
* Add savings model.
* Add API:

    * `GET /api/savings`
    * `POST /api/savings`
    * `PATCH /api/savings/{saving}`
    * `DELETE /api/savings/{saving}`
* Add monthly savings target.
* Add savings rate calculation.
* Add frontend savings page.
* Add dashboard savings card.
* Add tests.
* Add Scribe docs.

Expected result:

* User can track how much was saved each month.
* Dashboard shows savings progress.

Suggested commit:

```text
Add savings tracking
```

---

## Milestone 10 — Assets / Investments

Goal: Track personal assets and investments.

Tasks:

* Create assets table.
* Add asset types:

    * cash
    * deposit
    * crypto
    * stocks
    * bonds
    * real_estate
    * other
* Add API:

    * `GET /api/assets`
    * `POST /api/assets`
    * `PATCH /api/assets/{asset}`
    * `DELETE /api/assets/{asset}`
* Add frontend assets page.
* Add asset summary card on dashboard.
* Add tests.
* Add Scribe docs.

Expected result:

* User can add and manage assets.
* Dashboard shows total assets value.

Suggested commit:

```text
Add asset tracking
```

---

## Milestone 11 — Reverb Real-Time Dashboard Updates

Goal: Replace polling with WebSocket-based real-time updates.

Tasks:

* Configure Laravel broadcasting channels.
* Configure Laravel Echo in frontend.
* Add private user channel.
* Broadcast dashboard update events:

    * `ExpenseCreated`
    * `ExpenseUpdated`
    * `ExpenseDeleted`
    * `MonthlySummaryUpdated`
* Update Pinia dashboard store when events are received.
* Add notification UI placeholder.
* Add tests where reasonable.

Expected result:

* Dashboard updates without page reload.
* No polling is needed for dashboard refresh.
* Reverb integration is demonstrated clearly.

Suggested commit:

```text
Add real-time dashboard updates with Reverb
```

---

## Milestone 12 — Notifications

Goal: Add real-time user notifications.

Tasks:

* Create notifications table or use Laravel notifications.
* Add events:

    * budget limit reached
    * large expense detected
    * monthly summary recalculated
    * import completed
* Add frontend notification dropdown/page.
* Broadcast notifications through Reverb.
* Add tests.

Expected result:

* User receives real-time notifications.
* Notifications can be marked as read.

Suggested commit:

```text
Add real-time notifications
```

---

## Milestone 13 — Background Jobs and Horizon

Goal: Use Redis queue and Horizon for real async processes.

Tasks:

* Add queue jobs:

    * `RecalculateMonthlySummaryJob`
    * `GenerateMonthlyReportJob`
    * `SendBudgetNotificationJob`
* Configure Horizon queues.
* Add failed jobs handling.
* Add README section about Horizon.
* Protect Horizon locally/prod conceptually.
* Add tests where reasonable.

Expected result:

* Background jobs run through Redis queue.
* Horizon shows jobs and failed jobs.
* Project demonstrates async processing.

Suggested commit:

```text
Add Redis queue jobs and Horizon monitoring
```

---

## Milestone 14 — Bank Import Foundation

Goal: Prepare bank import architecture without full Monobank integration yet.

Tasks:

* Create bank_connections table.
* Create bank_imports table.
* Create imported_transactions table.
* Add import statuses:

    * pending
    * processing
    * completed
    * failed
* Add API:

    * `POST /api/imports/monobank`
    * `GET /api/imports/{import}/status`
* Add fake/mock import job first.
* Broadcast import progress through Reverb.
* Show progress in frontend.
* Add tests.
* Add Scribe docs.

Expected result:

* User can start a mock import.
* Import is processed in background.
* Progress updates in real time.
* Horizon shows import job.

Suggested commit:

```text
Add bank import foundation
```

---

## Milestone 15 — Monobank Integration

Goal: Add real Monobank transaction import.

Tasks:

* Add encrypted token storage.
* Add Monobank API client.
* Fetch accounts.
* Fetch statements.
* Store imported transactions.
* Deduplicate transactions.
* Add import filters:

    * account/card
    * merchant
    * amount range
    * description contains
    * income/internal transfers
* Add category auto-detection.
* Add tests with mocked API responses.
* Document security considerations.

Expected result:

* User can import Monobank transactions.
* Imported transactions are added to monthly expenses.
* User can exclude imported transactions from analytics.
* Original imported transaction data is not manually editable.

Suggested commit:

```text
Add Monobank transaction import
```

---

## Milestone 16 — Production Docker Images

Goal: Prepare production images.

Tasks:

* Add production Dockerfile for API.
* Add production Dockerfile for frontend.
* Decide how to serve Laravel public files.
* Build API image.
* Build frontend static Nginx image.
* Add production image labels/tags.
* Add `.dockerignore` improvements.
* Test image build locally.

Expected result:

* API and frontend can be built as production Docker images.
* Images are ready for GHCR publishing.

Suggested commit:

```text
Add production Docker images
```

---

## Milestone 17 — Production Docker Compose + Traefik

Goal: Prepare production stack for VPS.

Tasks:

* Implement `docker-compose.prod.yml`.
* Add Traefik service.
* Add frontend service.
* Add API services.
* Add PostgreSQL.
* Add Redis.
* Add Horizon.
* Add Scheduler.
* Add Reverb.
* Add networks:

    * public/traefik
    * internal
* Add volumes:

    * postgres
    * redis
    * traefik certificates
* Add Traefik labels.
* Add HTTPS routing.
* Add Horizon protection plan.

Expected result:

* Production stack is defined.
* VPS can run services using images from GHCR.

Suggested commit:

```text
Add production Docker Compose with Traefik
```

---

## Milestone 18 — GitHub Container Registry

Goal: Build and push Docker images from CI.

Tasks:

* Update GitHub Actions.
* Build API image.
* Build frontend image.
* Tag images with:

    * latest
    * commit SHA
* Push images to GHCR.
* Do not deploy yet.
* Add README documentation.

Expected result:

* Every push to main builds and publishes images.
* Images are versioned.

Suggested commit:

```text
Add GHCR image publishing workflow
```

---

## Milestone 19 — VPS Deployment

Goal: Deploy the application to Hetzner VPS.

Tasks:

* Create Hetzner VPS.
* Install Docker.
* Configure firewall.
* Configure domain DNS.
* Add production `.env`.
* Authenticate VPS to GHCR.
* Pull images.
* Start production stack.
* Verify HTTPS.
* Verify API.
* Verify frontend.
* Verify Reverb.
* Verify Horizon.
* Add deploy documentation.

Expected result:

* Application is live on VPS.
* Traefik handles HTTPS.
* Frontend and API are accessible through domain.

Suggested commit:

```text
Document VPS deployment
```

---

## Milestone 20 — GitHub Actions Deployment

Goal: Add automatic production deployment.

Tasks:

* Add deploy workflow.
* SSH from GitHub Actions to VPS.
* Pull latest images.
* Run Docker Compose update.
* Run migrations.
* Clear/cache Laravel config.
* Add deployment health checks.
* Add rollback notes.
* Add GitHub secrets documentation.

Expected result:

* Push to main can deploy to VPS.
* Deployment is production-style.

Suggested commit:

```text
Add production deployment workflow
```

---

## Milestone 21 — Polish and Portfolio Readiness

Goal: Prepare project for public portfolio usage.

Tasks:

* Improve README.
* Add screenshots.
* Add architecture diagram.
* Add API docs link.
* Add deployment section.
* Add security notes.
* Add roadmap/status section.
* Add demo credentials if needed.
* Add LinkedIn-ready project description.
* Add license.
* Add GitHub topics.

Expected result:

* GitHub repo looks professional.
* Project can be shown in LinkedIn and interviews.

Suggested commit:

```text
Prepare project for portfolio presentation
```

---

# 5. Recommended Immediate Next Step

The next practical task after the current baseline is:

```text
Milestone 2 — Frontend Application Foundation
```

Why:

* backend infrastructure is already installed;
* no product UI exists yet;
* frontend currently is only a Vite scaffold;
* we need app routing, layouts, Pinia, API client and placeholder pages before starting product features.

Next Codex task should be:

```text
Add Vue Router, Pinia, API client, app layout and placeholder pages.
```

---

# 6. Development Rules

## 6.1 One milestone = one or several clean commits

Avoid huge mixed commits.

Good commit examples:

```text
Add frontend application foundation
Add authentication API
Add expense categories
Add expenses CRUD
Add monthly dashboard summary
Add Reverb dashboard updates
Add production Docker Compose with Traefik
```

## 6.2 Do not mix infrastructure and business logic unless necessary

Bad:

```text
Install Reverb + add expenses + build dashboard + change Docker
```

Good:

```text
Install Reverb infrastructure
Add expenses CRUD
Add dashboard update events
```

## 6.3 Keep docs updated

When adding important architecture decisions, update:

```text
docs/setup.md
docs/roadmap.md
README.md
```

## 6.4 Keep container-first workflow

Do not rely on host PHP or host Node.

Use:

```bash
make up
make artisan CMD=\"...\"
make composer-validate
make api-test
make web-build
```

## 6.5 Keep API documented

Every meaningful API module should be documented with Scribe.

## 6.6 Keep real-time features purposeful

Use Reverb for:

* dashboard refresh;
* import progress;
* notifications;
* multi-device sync in the future.

Do not use WebSockets where simple HTTP is enough.

---

# 7. Final Target

The final project should demonstrate:

* clean Vue 3 frontend architecture;
* TypeScript usage;
* Pinia state management;
* Vue Router;
* Laravel API design;
* authentication;
* PostgreSQL data modeling;
* Redis cache and queues;
* Horizon monitoring;
* Reverb WebSockets;
* Scribe API docs;
* Dockerized local and production environments;
* Traefik HTTPS routing;
* GitHub Actions CI/CD;
* GHCR image publishing;
* VPS deployment.

The project should be strong enough to show as a portfolio project in LinkedIn and discuss during technical interviews.
