#!/bin/bash
set -e  # Exit on error

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running"
    exit 1
fi

# Check for required files
if [ ! -f ".env" ]; then
    echo "Error: .env file not found"
    exit 1
fi

if [ ! -d "./models" ]; then
    echo "Error: /models directory not found"
    exit 1
fi

# Load environment variables
set -a  # Automatically export all variables
source .env
set +a

# Validate required environment variables
if [ -z "${PORT}" ]; then
    echo "Error: PORT is not set in .env file"
    exit 1
fi

# Stop and remove existing container if it exists
if docker ps -a | grep -q stat-ee; then
    echo "Stopping and removing existing stat-ee container"
    docker stop stat-ee > /dev/null 2>&1 || true
    docker rm stat-ee > /dev/null 2>&1 || true
fi

# Base docker run command with common settings
DOCKER_CMD="docker run -d \
    --name stat-ee \
    -p ${PORT}:${PORT} \
    --env-file .env \
    -v $(pwd)/models:/home/appuser/stat-ee/models:ro"

# Add network volume if directory exists and is not empty (ignoring .gitkeep)
if [ -d "./network" ] && [ "$(ls -A ./network | grep -v .gitkeep)" ]; then
    echo "Enabling Oracle network configuration"
    DOCKER_CMD+=" -v $(pwd)/network:/opt/oracle/instantclient/network:ro"
fi

# Add SSL configuration if enabled
if [ "${SSL}" = "true" ]; then
    if [ ! -f "./certs/cert.pem" ] || [ ! -f "./certs/key.pem" ]; then
        echo "Error: SSL is enabled but certificates are missing"
        exit 1
    fi
    echo "Enabling SSL with provided certificates"
    DOCKER_CMD+=" -v $(pwd)/certs:/home/appuser/stat-ee/certs:ro"
fi

# Check if image exists locally
if ! docker image inspect stat-ee:latest >/dev/null 2>&1; then
    echo "Error: stat-ee:latest image not found locally"
    echo "Please build the image first using docker build command"
    exit 1
fi

# Execute docker command
echo "Starting stat-ee container..."
if ! eval "${DOCKER_CMD} stat-ee:latest"; then
    echo "Error: Failed to start container"
    exit 1
fi

# Verify container is running
if ! docker ps | grep -q stat-ee; then
    echo "Error: Container failed to start"
    echo "Container logs:"
    docker logs stat-ee
    exit 1
fi

if [ "${SSL}" = "true" ]; then
    echo "Container started successfully on port ${PORT} with SSL enabled"
else
    echo "Container started successfully on port ${PORT}"
fi
