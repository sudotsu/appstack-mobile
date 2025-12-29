#!/bin/bash

echo "📱 Building Native Android APK..."
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

# Update next.config.js for static export
echo "⚙️  Configuring for static export..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
EOF

# Build the app
echo "🔨 Building Next.js app..."
npm run build

# Add Android platform if not exists
if [ ! -d "android" ]; then
    echo "📱 Adding Android platform..."
    npx cap add android
fi

# Sync web assets to Android
echo "🔄 Syncing assets to Android..."
npx cap sync android

# Build APK
echo "🏗️  Building APK..."
cd android
./gradlew assembleDebug
cd ..

echo ""
echo "✅ APK built successfully!"
echo ""
echo "📦 APK location:"
echo "android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📲 To install:"
echo "1. Copy the APK to your phone"
echo "2. Open it and tap 'Install'"
echo "   (You may need to enable 'Install from unknown sources')"
echo ""
echo "Or install via USB:"
echo "adb install android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
