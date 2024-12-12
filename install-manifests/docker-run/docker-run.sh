#!/bin/bash

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo ".env file not found. Please create one with the necessary environment variables."
  exit 1
fi

# Check if models directory exists
if [ ! -d "./models" ]; then
  echo "/models directory not found. Please follow the instructions in the README to add the necessary files."
  exit 1
fi

# Load environment variables from the .env file
export $(grep -v '^#' .env | xargs)

# Check if cert.pem and key.pem exist in certs directory
if [ -f "./certs/cert.pem" ] && [ -f "./certs/key.pem" ]; then
  echo "Found cert.pem and key.pem in /certs directory."
  if [ -z "${PORT}" ]; then
    PORT=443
    SSL=true
    echo "PORT environment variable not found in .env file. Defaulting to ${PORT}."
  fi
  # Run the Docker container with the determined port with SSL
  docker run -p ${PORT}:${PORT} \
    --env-file .env \
    -v $(pwd)/certs:/home/appuser/stat-ee/certs \
    -v $(pwd)/models:/home/appuser/stat-ee//models \
    stat-ee:latest
else
  echo "Did not find cert.pem or key.pem in /certs directory."
  if [ -z "${PORT}" ]; then
    PORT=80
    SSL=false
    echo "PORT environment variable not found in .env file. Defaulting to ${PORT}."
  fi
  # Run the Docker container with the determined port without SSL
  docker run -p ${PORT}:${PORT} \
    --env-file .env \
    -v $(pwd)/models:/home/appuser/stat-ee//models \
    stat-ee:latest
fi