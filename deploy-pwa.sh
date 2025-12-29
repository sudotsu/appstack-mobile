#!/bin/bash

echo "🚀 Deploying Mastery Lab to Vercel (PWA)..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this from the project root directory"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Deploy to Vercel
echo ""
echo "🌐 Deploying to Vercel..."
echo "You may need to login if this is your first time."
echo ""
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📱 To install on Android:"
echo "1. Open the URL above in Chrome on your phone"
echo "2. Tap the menu (⋮) and select 'Install app'"
echo "3. Done! The app will be on your home screen"
echo ""
