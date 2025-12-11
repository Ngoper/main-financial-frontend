#!/bin/bash
set -e

echo "Starting Frontend Deployment..."

# Navigate to project root (one level up from deployment/)
cd "$(dirname "$0")/.."

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building project..."
npm run build

echo "Frontend Deployment Complete!"
