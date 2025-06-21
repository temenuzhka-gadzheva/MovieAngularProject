#!/bin/bash
echo "Webhook received. Starting update process..."

# Navigate to the docker-compose directory
# The script is run from inside the webhook container, so the path is relative to the mounted volume
cd /app/MovieAngularProject/docker

# Pull the latest image for the service from Docker Hub
echo "Pulling latest image: ${DOCKER_USERNAME}/angular-app:test-workflow"
docker-compose pull angular-app

# Restart the services to apply the new image
echo "Restarting services..."
docker-compose up -d --remove-orphans

echo "Update process completed." 