# BudgetFlow

BudgetFlow is a production-style full-stack pet project for a personal finance and budget tracking product.

The planned product is a mobile-first budget tracker with monthly expense analysis, recurring and manual expenses, savings, assets, future bank imports, realtime dashboard updates, and background processing.

## Architecture

This repository is organized as a monorepo:

- `apps/api` - Laravel API application.
- `apps/web` - Vue 3, TypeScript, and Vite frontend application.
- `docker` - Docker infrastructure files, to be added incrementally.
- `.github/workflows` - CI/CD workflow definitions, to be added later.

The intended production runtime is:

```text
Traefik -> Nginx -> PHP-FPM -> Laravel API
Traefik -> Nginx -> Vue static frontend
```

## Local Development

Local development is container-first. Do not rely on host PHP, Composer, Node, or npm versions when creating, installing, or verifying the applications.

Local containers run as the configured host UID/GID so bind-mounted files remain editable on the host:

```bash
APP_UID=1000
APP_GID=1000
```

Initial scaffold commands used for this foundation:

```bash
docker run --rm -u 1000:1000 -v "$PWD:/app" -w /app composer:2 create-project laravel/laravel apps/api
docker run --rm -u 1000:1000 -v "$PWD:/app" -w /app node:22-alpine npm create vite@latest apps/web -- --template vue-ts
docker run --rm -u 1000:1000 -v "$PWD:/app" -w /app/apps/web node:22-alpine npm install
```

## Project Documentation

- [Setup notes](docs/setup.md)
- [Roadmap](docs/roadmap.md)
- [Progress tracker](docs/progress.md)
- [Task backlog](docs/tasks/)
- [Frontend architecture](docs/architecture/frontend.md)

## Local Docker Runtime

Build and start the local stack:

```bash
docker compose -f docker-compose.local.yml up -d --build
```

Create the local Laravel env file and generate an app key:

```bash
cp apps/api/.env.example apps/api/.env
docker compose -f docker-compose.local.yml exec api-php php artisan key:generate
```

Install backend Composer dependencies through the PHP container:

```bash
docker compose -f docker-compose.local.yml exec api-php composer install
```

Install frontend npm dependencies through the Node container:

```bash
docker compose -f docker-compose.local.yml exec web npm install
```

Run Laravel artisan commands through the PHP container:

```bash
docker compose -f docker-compose.local.yml exec api-php php artisan route:list
```

Run the frontend production build through the Node container:

```bash
docker compose -f docker-compose.local.yml exec web npm run build
```

Local service URLs:

- Frontend: http://localhost:3000
- API health endpoint: http://localhost:8086/api/health
- Scribe API docs: http://localhost:8086/docs
- Horizon dashboard: http://localhost:8086/horizon
- Reverb WebSocket server: ws://localhost:8091. Laravel containers publish to `reverb:8080`; browsers connect through the mapped localhost port.
- PostgreSQL: inside Docker as `postgres:5432`, database `budgetflow`, user `budgetflow`, password `secret`
- Redis: available inside Docker as `redis:6379`

## Frontend Architecture

The Vue app uses a feature-based architecture with domain-inspired boundaries. Product areas live under feature folders, reusable low-level code lives in `shared/`, bootstrap code lives in `app/`, and layout shells live in `layouts/`.

See [Frontend Architecture](docs/architecture/frontend.md) for the target structure and import rules.

Frontend API calls read the backend base URL from Vite env:

```bash
VITE_API_BASE_URL=http://localhost:8086
```

The shared frontend API foundation lives in `apps/web/src/shared/api`. Feature code should call APIs through feature-level wrappers, such as the dashboard health check, rather than coupling directly to unrelated feature internals.

The auth frontend lives in `apps/web/src/features/auth`. It uses the backend Sanctum token endpoints, stores the current token in browser local storage, loads the current user on guarded routes, and keeps guest-only login/register routes separate from protected app routes.

## Make Shortcuts

The root `Makefile` wraps the same Docker Compose commands. PHP, Composer, Node, and npm still run inside containers.

```bash
make up
make fix-ownership
make api-env
make api-key
make ps
make composer-install
make composer-validate
make npm-install
make route-list
make api-migrate
make artisan CMD="about"
make api-test
make pint
make pint-fix
make phpstan
make horizon
make reverb
make scribe-generate
make scribe-open
make web-build
make api-health
make down
```

For a fresh local setup, use:

```bash
make setup
```

Open container shells when needed:

```bash
make api-shell
make web-shell
```

If older container commands created files owned by `root` or `nobody:nogroup`, repair local bind-mounted ownership with:

```bash
make fix-ownership
```

This is a local development repair command. Production images should not bind-mount application source.

## Backend Quality

Laravel Pint is configured for backend PHP formatting in `apps/api/pint.json`.

Check formatting without changing files:

```bash
make pint
```

Fix formatting:

```bash
make pint-fix
```

CI runs the Pint check before backend tests.

Larastan/PHPStan is configured in `apps/api/phpstan.neon`.

Run backend static analysis:

```bash
make phpstan
```

## Production Runtime Notes

Production should use built images, not host source bind mounts. Application code and dependencies should be copied into immutable images during build, containers should run as a non-root app user, `.env` files should not be copied into images, and only Laravel runtime directories such as `storage/` and `bootstrap/cache/` should be writable.

## Backend Infrastructure

The API foundation includes Laravel Sanctum, Horizon, Reverb, and Scribe.

Sanctum is configured for the first token-based API authentication flow.

The backend exposes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/user`
- `POST /api/auth/logout`

Authenticated requests should send the returned token as a Bearer token. Frontend auth screens and route guards are intentionally deferred.

Horizon runs as a local Docker service and is available through the API gateway at http://localhost:8086/horizon. It must not be exposed directly to the public internet in production; production protection will be handled later with Laravel authorization plus reverse-proxy controls.

Reverb runs as a local Docker service at `ws://localhost:8091`. It will later power real-time dashboard updates, bank import progress, and notifications. No events are implemented yet.

Scribe is configured for API documentation. Generate docs with:

```bash
make scribe-generate
```

## CI

The first GitHub Actions workflow runs on pushes and pull requests to `main`.

It checks the Laravel API by installing Composer dependencies, validating `composer.json`, preparing a CI `.env`, generating `APP_KEY`, running tests with SQLite in memory, and verifying that `php artisan route:list` boots the app.

It checks the Vue app by installing dependencies with `npm ci` on Node 22 and running the production build.

Deployment is intentionally not part of this workflow. Docker image builds, GitHub Container Registry publishing, and VPS deployment will be added later as the production pipeline.

## Planned Stack

- Laravel API
- Vue 3 + TypeScript + Vite
- PostgreSQL
- Redis
- Laravel Horizon
- Laravel Reverb
- Docker Compose
- Traefik
- GitHub Actions
- GitHub Container Registry
