#!/bin/bash

echo "🚀 Deploying to Netlify..."

# Build the project first
echo "📦 Building project..."
npm run build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
echo "2" | npx netlify-cli deploy --prod --dir=dist

echo "✅ Deployment complete!" 