#!/bin/bash
set -e

echo "Starting Frontend Deployment..."

# Navigate to project root (one level up from deployment/)
cd "$(dirname "$0")/.."

# Pull latest changes
echo "Pulling latest changes..."
git pull origin deployments

# Rebuild and restart Docker containers
echo "Rebuilding Docker containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo "Frontend Deployment Complete!"
