#!/bin/bash

# Navigate to project directory
cd /app/MovieAngularProject

# Pull latest changes
git pull origin main

# Build and restart containers
cd docker
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "Update completed successfully" 