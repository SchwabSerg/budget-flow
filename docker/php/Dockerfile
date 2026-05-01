FROM php:8.4-fpm-alpine

ARG APP_UID=1000
ARG APP_GID=1000

WORKDIR /var/www/html

RUN apk add --no-cache \
        bash \
        icu-dev \
        libzip-dev \
        linux-headers \
        oniguruma-dev \
        postgresql-dev \
        unzip \
        zip \
    && docker-php-ext-install \
        bcmath \
        intl \
        mbstring \
        opcache \
        pcntl \
        pdo \
        pdo_pgsql \
        zip \
    && apk add --no-cache --virtual .phpize-deps $PHPIZE_DEPS \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .phpize-deps

RUN addgroup -g "${APP_GID}" -S app \
    && adduser -u "${APP_UID}" -S -D -G app app \
    && sed -i 's/^user = .*/user = app/' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/^group = .*/group = app/' /usr/local/etc/php-fpm.d/www.conf

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

USER app
