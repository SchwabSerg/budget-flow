# Task 002 - Local Docker Runtime

## Status

Done.

## Goal

Provide a local Docker Compose runtime so the project can run without relying on host PHP, Composer, Node, or npm.

## Context

BudgetFlow uses a container-first development approach. Local services should run through Docker and expose predictable local ports.

## Scope

- Add local Docker Compose services.
- Run Vue/Vite through a Node container.
- Run Laravel through PHP-FPM and Nginx.
- Add PostgreSQL and Redis.
- Add persistent local volumes and healthchecks.

## Out of Scope

- Production Docker image publishing.
- Traefik.
- Deployment.
- Business logic.

## Files Likely To Change

- `docker-compose.local.yml`
- `docker/php/Dockerfile`
- `docker/nginx/api.local.conf`
- `README.md`
- `Makefile`

## Acceptance Criteria

- Local stack starts with Docker Compose.
- Frontend is reachable at `http://localhost:3000`.
- API health endpoint is reachable at `http://localhost:8086/api/health`.
- PostgreSQL and Redis run as local services.

## Verification Commands

```bash
docker compose -f docker-compose.local.yml config
docker compose -f docker-compose.local.yml up -d --build
docker compose -f docker-compose.local.yml ps
curl -s http://localhost:8086/api/health
```

## Completion Notes

Completed in baseline commit `c2812c3 Initialize BudgetFlow production-style foundation`. The local stack includes `web`, `api-php`, `api-nginx`, `postgres`, and `redis`, later extended with infrastructure services.
