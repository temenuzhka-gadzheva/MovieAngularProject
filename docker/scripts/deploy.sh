#!/bin/bash

set -e

log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

handle_error() {
    log "Error: $1"
    exit 1
}

log "Pulling latest changes from GitHub..."
git pull origin main || handle_error "Failed to pull from GitHub"


log "Building new Docker images..."
docker-compose build || handle_error "Failed to build Docker images"

log "Starting new containers..."
docker-compose up -d || handle_error "Failed to start containers"

log "Waiting for new containers to become healthy..."
sleep 30

CONSUL_URL="http://localhost:8500/v1/health/service/angular-app"
HEALTHY=false
RETRIES=10
COUNT=0

while [ $COUNT -lt $RETRIES ] && [ "$HEALTHY" = false ]; do
    HEALTH_CHECK=$(curl -s $CONSUL_URL)
    if [ $(echo $HEALTH_CHECK | grep -c "passing") -eq 5 ]; then
        HEALTHY=true
        log "All new containers are healthy!"
    else
        log "Waiting for containers to become healthy... Attempt $((COUNT+1))/$RETRIES"
        sleep 10
        COUNT=$((COUNT+1))
    fi
done

if [ "$HEALTHY" = false ]; then
    handle_error "New containers failed to become healthy"
fi

log "Getting list of old containers..."
OLD_CONTAINERS=$(docker ps -q --filter "label=com.docker.compose.project=movieangularproject" --filter "label=com.docker.compose.service=app")

for container in $OLD_CONTAINERS; do
    log "Stopping container $container..."
    docker stop $container || log "Warning: Failed to stop container $container"
    docker rm $container || log "Warning: Failed to remove container $container"
    sleep 5
done

log "Deployment completed successfully!" 