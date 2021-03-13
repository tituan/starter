#!/bin/sh

echo "Composer install..."
composer install

echo "Loading Node dependencies..."
npm install

echo "Generating assets..."
grunt
