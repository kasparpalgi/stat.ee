#!/bin/bash

# Function to check if a command was successful
check_command_success() {
    if [ $? -ne 0 ]; then
        echo "Error: $1 failed."
        exit 1
    fi
}

# Define the Docker image name and tag
IMAGE_NAME="stat-ee"
IMAGE_TAG="latest"
TAR_FILE="stat-ee.tar"

# Build the Docker image
echo "Building Docker image..."
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
check_command_success "Docker build"

# Save the Docker image to a tar file
echo "Saving Docker image to ${TAR_FILE}..."
docker save -o ${TAR_FILE} ${IMAGE_NAME}:${IMAGE_TAG}
check_command_success "Docker save"

echo "Docker image built and saved successfully."