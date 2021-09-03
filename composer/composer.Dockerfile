FROM php:7.4-fpm


RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

# Extension mysql driver for mysql
RUN docker-php-ext-install pdo_mysql mysqli

RUN apt-get update && apt-get install -y libzip-dev 


# # Extension zip for laravel
RUN docker-php-ext-install zip 

# RUN apt-get update && apt-get install -y \
# libbz2-dev \
# libfreetype6-dev \
# libjpeg62-turbo-dev \
# libpng-dev \
# build-essential \
# mariadb-client \
# libjpeg62-turbo-dev \
# libfreetype6-dev \
# locales \
# libzip-dev \
# zip \
# jpegoptim optipng pngquant gifsicle \
# vim \
# unzip \
# curl \
# libxml++2.6-dev\
# && docker-php-ext-configure gd --with-freetype --with-jpeg \
# && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql



# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
