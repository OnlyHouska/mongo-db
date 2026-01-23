FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libssl-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo mbstring exif pcntl bcmath gd

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Create entrypoint script that runs composer install at startup
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
# Fix permissions for storage and cache directories\n\
mkdir -p /var/www/html/storage/framework/{sessions,views,cache}\n\
mkdir -p /var/www/html/storage/logs\n\
mkdir -p /var/www/html/bootstrap/cache\n\
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache\n\
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache\n\
\n\
# Fix git ownership warning\n\
git config --global --add safe.directory /var/www/html\n\
\n\
# Always run composer update (volume mount overwrites container vendor)\n\
cd /var/www/html\n\
composer update --no-interaction --prefer-dist --optimize-autoloader 2>&1 || true\n\
\n\
# Generate JWT secret if needed\n\
php artisan jwt:secret --force 2>/dev/null || true\n\
\n\
exec "$@"' > /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 9000 for PHP-FPM
EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["php-fpm"]
