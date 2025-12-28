# 🚀 Deployment Guide

## What You're About to Deploy

**Mastery Lab v2.0** - A complete rebuild with:
- ✅ Week-based progression system
- ✅ Meta-learning content ("here's how we built this")
- ✅ AI validation via Claude API
- ✅ Modern, clean UI
- ✅ Progressive challenge unlocking
- ✅ Customization system (coming in Week 4 challenges)
- ✅ Both PWA and native Android support

---

## Option 1: PWA (FASTEST - 10 minutes)

### Step 1: Extract and Navigate
```bash
tar -xzf mastery-lab-v2.tar.gz
cd mastery-lab-v2
```

### Step 2: Deploy
```bash
./deploy-pwa.sh
```

That's it. The script:
- Installs dependencies
- Deploys to Vercel
- Gives you a URL

### Step 3: Install on Android
1. Open the Vercel URL in **Chrome** on your phone
2. Tap **⋮** menu → **"Install app"**
3. App is now on your home screen

---

## Option 2: Native Android APK (2-3 hours)

### Prerequisites
- Android Studio installed OR
- Android SDK command-line tools
- ANDROID_HOME environment variable set

### Step 1: Build APK
```bash
cd mastery-lab-v2
./deploy-android.sh
```

The script:
- Configures Next.js for static export
- Builds the app
- Adds Android platform
- Generates APK

### Step 2: Install APK
```bash
# Via USB (phone in developer mode)
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or copy APK to phone and open it
```

---

## Push to GitHub

```bash
cd mastery-lab-v2

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/mastery-lab-v2.git
git branch -M main
git push -u origin main
```

---

## What's Next

### Current State (v2.0)
- **7 challenges** across Weeks 1-2
- Foundation + Building Features
- Full AI validation system
- Progress tracking
- Meta-learning narratives

### Coming Soon
- **Week 3**: Meta-build challenges (how we built this)
- **Week 4**: Customization system
  - Theme designer
  - Content editor
  - Branding tools
- **Week 5**: Deployment challenges
  - Deploy workflows
  - Play Store prep
  - Monetization strategies

### Your Mission
1. Complete the current challenges
2. Test the AI validation
3. Deploy both PWA and native
4. Start thinking about YOUR niche customization

---

## Testing Checklist

- [ ] PWA deploys to Vercel
- [ ] Can install as app on Android
- [ ] Progress saves between sessions
- [ ] AI validation works (needs Claude API)
- [ ] Challenge unlocking works correctly
- [ ] Hints and solutions display properly
- [ ] Mobile-responsive on phone
- [ ] Looks good on desktop too

---

## Troubleshooting

### PWA won't install on Android
- Must use Chrome browser
- Must be on deployed URL (not localhost)
- Try refreshing the page

### Android build fails
- Check ANDROID_HOME is set: `echo $ANDROID_HOME`
- Verify Android SDK installed: `ls ~/Android/Sdk`
- Make sure gradlew is executable: `chmod +x android/gradlew`

### Progress not saving
- Check browser localStorage isn't disabled
- Don't use incognito mode
- Check browser console for errors

---

## The Vision

This is **v2.0** - the foundation.

By **v3.0**, graduates will:
- Customize and rebrand for their niche
- Deploy their own versions
- Sell/license their custom platforms
- Have a complete portfolio piece

You're building the thing that teaches others to build.

Meta as fuck. 🔥

---

**Let's ship this.**
