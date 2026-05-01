COMPOSE := docker compose -f docker-compose.local.yml
EXEC := $(COMPOSE) exec -T
HOST_UID := $(shell id -u)
HOST_GID := $(shell id -g)

.DEFAULT_GOAL := help

.PHONY: help up down restart build ps logs setup fix-ownership api-env api-key composer-install composer-validate npm-install artisan route-list api-migrate api-migrate-fresh api-test pint pint-fix phpstan horizon reverb queue-work scribe-generate scribe-open web-build api-health api-shell web-shell

help:
	@printf '%s\n' 'BudgetFlow container-first commands:'
	@printf '%s\n' ''
	@printf '%s\n' '  make up                 Build and start the local stack'
	@printf '%s\n' '  make down               Stop and remove local stack containers'
	@printf '%s\n' '  make restart            Restart the local stack'
	@printf '%s\n' '  make ps                 Show local stack status'
	@printf '%s\n' '  make logs               Follow all service logs'
	@printf '%s\n' '  make logs SERVICE=web   Follow logs for one service'
	@printf '%s\n' '  make setup              Start stack and install local dependencies'
	@printf '%s\n' '  make fix-ownership      Repair local bind-mounted file ownership'
	@printf '%s\n' '  make api-env            Create apps/api/.env from example if missing'
	@printf '%s\n' '  make api-key            Generate Laravel APP_KEY in apps/api/.env'
	@printf '%s\n' '  make composer-install   Install backend dependencies in api-php'
	@printf '%s\n' '  make composer-validate  Validate backend composer.json in api-php'
	@printf '%s\n' '  make npm-install        Install frontend dependencies in web'
	@printf '%s\n' '  make artisan CMD=...    Run a Laravel artisan command in api-php'
	@printf '%s\n' '  make route-list         Show API routes'
	@printf '%s\n' '  make api-migrate        Run Laravel migrations'
	@printf '%s\n' '  make api-migrate-fresh  Rebuild the local database from migrations'
	@printf '%s\n' '  make api-test           Run Laravel tests'
	@printf '%s\n' '  make pint               Check backend PHP formatting'
	@printf '%s\n' '  make pint-fix           Fix backend PHP formatting'
	@printf '%s\n' '  make phpstan            Run backend static analysis'
	@printf '%s\n' '  make horizon            Start the Horizon service'
	@printf '%s\n' '  make reverb             Start the Reverb service'
	@printf '%s\n' '  make queue-work         Run a foreground queue worker'
	@printf '%s\n' '  make scribe-generate    Generate Scribe API documentation'
	@printf '%s\n' '  make scribe-open        Print the local Scribe docs URL'
	@printf '%s\n' '  make web-build          Build the frontend'
	@printf '%s\n' '  make api-health         Check API health through api-nginx'
	@printf '%s\n' '  make api-shell          Open a shell in api-php'
	@printf '%s\n' '  make web-shell          Open a shell in web'

up:
	$(COMPOSE) up -d --build

down:
	$(COMPOSE) down

restart: down up

build:
	$(COMPOSE) build

ps:
	$(COMPOSE) ps

logs:
	$(COMPOSE) logs -f $(SERVICE)

setup: up composer-install npm-install api-env api-key

fix-ownership:
	$(COMPOSE) run --rm --no-deps --user root api-php sh -lc 'chown -R $(HOST_UID):$(HOST_GID) /var/www/html'
	$(COMPOSE) run --rm --no-deps --user root web sh -lc 'chown -R $(HOST_UID):$(HOST_GID) /app/apps/web/node_modules /app/apps/web/dist 2>/dev/null || true'

api-env:
	test -f apps/api/.env || cp apps/api/.env.example apps/api/.env

api-key: api-env
	$(EXEC) api-php php artisan key:generate

composer-install:
	$(EXEC) api-php composer install

composer-validate:
	$(EXEC) api-php composer validate --strict

npm-install:
	$(EXEC) web npm install

artisan:
	$(EXEC) api-php php artisan $(CMD)

route-list:
	$(EXEC) api-php php artisan route:list --path=api --except-vendor

api-migrate:
	$(EXEC) api-php php artisan migrate

api-migrate-fresh:
	$(EXEC) api-php php artisan migrate:fresh

api-test:
	$(EXEC) api-php sh -lc 'cleanup=0; if [ ! -f .env ]; then cp .env.example .env; cleanup=1; fi; php artisan test; status=$$?; if [ "$$cleanup" = "1" ]; then rm -f .env; fi; rm -f .phpunit.result.cache; exit $$status'

pint:
	$(EXEC) api-php ./vendor/bin/pint --test

pint-fix:
	$(EXEC) api-php ./vendor/bin/pint

phpstan:
	$(EXEC) api-php ./vendor/bin/phpstan analyse --memory-limit=512M

horizon:
	$(COMPOSE) up -d horizon

reverb:
	$(COMPOSE) up -d reverb

queue-work:
	$(EXEC) api-php php artisan queue:work

scribe-generate:
	$(EXEC) api-php php artisan scribe:generate

scribe-open:
	@printf '%s\n' 'Scribe docs: http://localhost:8086/docs'

web-build:
	$(EXEC) web npm run build

api-health:
	$(EXEC) api-nginx wget -qO- http://localhost/api/health

api-shell:
	$(COMPOSE) exec api-php sh

web-shell:
	$(COMPOSE) exec web sh
