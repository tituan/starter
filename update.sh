#!/bin/sh

echo "Loading Node dependencies..."
npm ci

echo "Generating assets..."
grunt
