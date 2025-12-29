// Comprehensive tips library for rotating content throughout the learning journey

export const AI_COLLABORATION_TIPS = [
  // Prompting Strategies
  "Tell your AI: 'Add TypeScript types to this' - it'll do it perfectly. You just need to understand WHAT it did.",
  "Instead of 'build me a user profile page', say 'create a UserProfile component that takes user data as props'",
  "Tell your AI your design preferences upfront: 'Use blue as primary color, rounded corners, shadow effects'",
  "Always ask your AI: 'Explain this code like I'm learning' - it'll break down exactly what it did",
  "Copy error messages to your AI and say: 'Fix this error' - but understanding WHY helps you catch it next time",
  "Show your AI your data structure and say: 'Create a component that displays this list' - it handles the mapping",
  "Tell your AI: 'I need a component that tracks X and updates when Y happens' - it'll set up state correctly",
  
  // Iteration & Refinement
  "Start with 'Make this work' → then 'Make it look good' → then 'Make it production-ready'",
  "Don't ask for perfection in one shot. Build iteratively: rough draft → refinement → polish",
  "When AI code works but looks ugly, say: 'Keep the logic, improve the UI/styling'",
  "If AI gives you something close, tell it: 'Keep the approach, but change X to Y'",
  "Use AI to refactor: 'This works but it's messy - clean it up while keeping the same functionality'",
  "When stuck, ask: 'What are 3 different ways to solve this?' then pick the one that makes sense to you",
  "Build in public with AI - show it what you have, ask what could be better",
  
  // Understanding & Learning  
  "AI can write it, but YOU need to understand it. Always ask: 'What does this line do?'",
  "When AI uses a pattern you don't recognize, ask: 'Why did you do it this way instead of X?'",
  "Request variations: 'Show me 2 other ways to do this' - learn multiple approaches",
  "After AI solves something, ask: 'What are common mistakes people make with this?'",
  "When you get working code, ask: 'How would I modify this to do X instead?' - test your understanding",
  "Don't just copy-paste. Read each function and ask yourself: 'What would break if I removed this?'",
  "Use AI as your rubber duck: explain your problem in detail, it often reveals the solution",
  
  // Debugging & Problem-Solving
  "When things break, give AI the full context: error message + your code + what you're trying to do",
  "Don't say 'it doesn't work' - say 'I expected X but got Y, here's the error'",
  "Share your attempts: 'I tried X and Y, both failed with these errors - what am I missing?'",
  "When debugging, ask AI: 'What are the most common causes of this error?'",
  "If AI's first solution doesn't work, say: 'That didn't fix it, here's the new error' - iterate",
  "Use AI to trace execution: 'Walk me through what happens when I run this code'",
  "When performance is bad, ask: 'What's the bottleneck here and how do I fix it?'",
  
  // Code Quality & Best Practices
  "Ask: 'What would a senior developer change about this code?' - level up your quality",
  "Request error handling: 'Add proper error handling to this' - AI knows the patterns",
  "Say: 'Make this more readable' or 'Add comments explaining the tricky parts'",
  "Check accessibility: 'Does this meet accessibility standards? What's missing?'",
  "Ask about edge cases: 'What inputs would break this? How do I handle them?'",
  "Request validation: 'Add input validation and error messages to this form'",
  "Optimize later: 'This works but feels slow - how do I make it faster?'",
  
  // Workflow & Productivity
  "Break big tasks into chunks: 'First, help me build the data structure' → then 'Now the UI' → then 'Now connect them'",
  "Use AI for boilerplate: 'Generate the basic setup for X' then customize the interesting parts yourself",
  "When copying code, ask: 'What dependencies does this need?' so you don't miss imports",
  "Before deploying, ask: 'What could go wrong in production?' - catch issues early",
  "Use AI for documentation: 'Write a README explaining how to use this'",
  "Generate tests: 'Write tests for these functions' - AI is great at test coverage",
  "Ask for file structure: 'How should I organize this project?' before you start building",
  
  // Specific to This App/Learning
  "You're not replacing developers - you're becoming one who uses the best tools available",
  "AI writes code fast, but YOU make the decisions about what to build and why",
  "Every 'AI-generated' app is really 'AI-assisted' - your ideas and judgment matter most",
  "The goal isn't to understand every line - it's to understand the CONCEPTS so you can direct AI effectively",
  "Think of AI as your junior dev: great at implementation, needs your guidance on architecture",
  "You're learning to be a 'code conductor' - orchestrating AI to build your vision",
  "The best AI users aren't the best coders - they're the best problem-solvers and communicators",
  
  // Real Talk / Mindset
  "It's okay to not understand everything. Pro devs don't either - they just know what to Google (or ask AI)",
  "Errors are information, not failure. Each error is AI telling you what to fix next",
  "Your first version will be messy. Ship it anyway, then iterate",
  "Copying code from AI is fine. Copying without understanding is a time bomb",
  "If you can explain your goal clearly, AI can build it. Practice describing what you want",
  "You don't need to memorize syntax. You need to understand concepts and patterns",
  "The 'right' way to code is the way that ships working software"
];

export const REAL_WORLD_USE_TIPS = [
  // Error Understanding
  {
    concept: "Type errors",
    tip: "When AI generates code, you'll see type errors. They're not bugs - they're TypeScript helping you catch mistakes before runtime.",
    commonErrors: ["Property 'x' does not exist", "Type 'string' is not assignable to type 'number'"],
    reality: "Every TypeScript project has these. Fix them as you go, not all at once."
  },
  {
    concept: "Import errors", 
    tip: "When AI uses a library, you'll need to install it. That's normal - not every package comes bundled.",
    commonErrors: ["Cannot find module 'lucide-react'", "Module not found: Can't resolve 'X'"],
    reality: "Just run: npm install [package-name]. This happens constantly in real development."
  },
  {
    concept: "Build warnings",
    tip: "Your build will show warnings. Most are safe to ignore if the app works.",
    commonErrors: ["Warning: React Hook useEffect has a missing dependency", "Compiled with warnings"],
    reality: "Production apps ship with warnings all the time. Fix critical ones, ship the rest."
  },
  {
    concept: "Console errors",
    tip: "Browser console will show errors during development. They're your debugging friends, not enemies.",
    commonErrors: ["Warning: Each child in a list should have a unique 'key' prop", "Failed to load resource"],
    reality: "Real apps have console noise. Focus on errors that break functionality, not all errors."
  },
  
  // Development Reality
  {
    concept: "Hot reload",
    tip: "When you save code, the page auto-refreshes. Sometimes it breaks - just refresh manually.",
    commonErrors: ["Fast Refresh had to perform a full reload", "Unhandled Runtime Error"],
    reality: "Hot reload is magic when it works, annoying when it doesn't. Full refresh fixes 90% of issues."
  },
  {
    concept: "Node modules",
    tip: "The node_modules folder will be HUGE (100+ MB). That's normal - it's all your dependencies.",
    commonErrors: ["ENOSPC: no space left on device", "Maximum call stack size exceeded during install"],
    reality: "Never commit node_modules. Delete it if things break, run npm install again."
  },
  {
    concept: "Package versions",
    tip: "Sometimes packages conflict. You'll see 'peer dependency' warnings - usually safe to ignore.",
    commonErrors: ["npm WARN ERESOLVE overriding peer dependency", "conflicting peer dependency"],
    reality: "Package management is messy. If the app runs, you're good. Fix only if something breaks."
  },
  {
    concept: "Build times",
    tip: "First build takes forever (1-2 min). Subsequent builds are faster thanks to caching.",
    commonErrors: ["webpack compiled with 1 warning", "Generating static pages (X/Y)"],
    reality: "Everyone complains about build times. Production builds are slower than dev - that's expected."
  },
  
  // Production Reality
  {
    concept: "Environment variables",
    tip: "API keys and secrets go in .env files. Never commit them to git - use .env.local for local dev.",
    commonErrors: ["API key is undefined", "process.env.X is undefined"],
    reality: "Every deployed app needs env vars configured. Vercel, Netlify, etc. have UI for this."
  },
  {
    concept: "CORS errors",
    tip: "If your API calls fail with CORS errors, the backend needs to allow your domain.",
    commonErrors: ["Access-Control-Allow-Origin header is missing", "CORS policy blocked"],
    reality: "CORS is the #1 API integration headache. Not your fault - the backend needs to whitelist you."
  },
  {
    concept: "Deployment fails",
    tip: "Builds that work locally can fail in production. Check logs, fix environment-specific issues.",
    commonErrors: ["Build failed: command exited with code 1", "Module not found in production"],
    reality: "Everyone has deployment fails. Read the error, fix it, redeploy. That's the cycle."
  },
  {
    concept: "Mobile responsiveness",
    tip: "What looks good on desktop might break on mobile. Test on actual devices, not just browser resize.",
    commonErrors: ["Text too small to read", "Buttons too small to tap", "Horizontal scroll"],
    reality: "Mobile-first is real. Most users are on phones. Tailwind's sm/md/lg breakpoints handle this."
  },
  
  // Code Quality Reality
  {
    concept: "Messy code",
    tip: "Your first version will be a mess. That's fine - refactor after it works, not before.",
    commonErrors: ["This code is spaghetti", "Too many useEffects", "Prop drilling hell"],
    reality: "All code starts messy. Ship it, then clean it. Don't over-optimize code nobody's using yet."
  },
  {
    concept: "Copy-paste code",
    tip: "Copying working code is how most development happens. Understand it, customize it, make it yours.",
    commonErrors: ["This exact code exists on Stack Overflow", "I don't fully get what this does"],
    reality: "Pro devs copy-paste constantly. The skill is knowing WHAT to copy and WHERE to modify."
  },
  {
    concept: "Technical debt",
    tip: "'I'll fix this later' is valid. Ship working code, document what needs improvement, iterate.",
    commonErrors: ["TODO: refactor this", "HACK: this is temporary", "FIXME: not ideal"],
    reality: "Every codebase has TODOs. The ones in production get fixed. The ones in 'perfect' code never ship."
  },
  {
    concept: "Breaking changes",
    tip: "Updating packages can break your app. Read changelogs, test after updates, pin versions if stable.",
    commonErrors: ["After updating X, Y stopped working", "New version has breaking changes"],
    reality: "Package updates are risky. Update when you need new features, not just because versions exist."
  },
  
  // Performance Reality
  {
    concept: "Slow first load",
    tip: "First page load is always slower - browser downloads everything. Subsequent loads use cache.",
    commonErrors: ["Page takes 3 seconds to load", "Large bundle size warning"],
    reality: "Sub-second loads are hard. Under 3 seconds is fine. Optimize only if users complain."
  },
  {
    concept: "Re-renders",
    tip: "React re-renders components often. That's fine - only optimize if you see visible lag.",
    commonErrors: ["Component re-rendering too much", "Unnecessary re-renders"],
    reality: "Don't premature optimize. React is fast enough. Use React DevTools Profiler if actually slow."
  },
  {
    concept: "Memory leaks",
    tip: "Forgetting to cleanup useEffect can leak memory. Browsers handle small leaks fine.",
    commonErrors: ["Can't perform React state update on unmounted component", "Memory usage growing"],
    reality: "Small leaks don't matter. Fix them if you notice performance degradation over time."
  },
  
  // Testing Reality
  {
    concept: "Manual testing",
    tip: "Click through your app yourself. That's testing. Automated tests come later (or never).",
    commonErrors: ["This feature broke and I didn't notice", "Works on my machine"],
    reality: "Most small projects have zero automated tests. Manual testing is 90% of quality assurance."
  },
  {
    concept: "Edge cases",
    tip: "Users will do weird things. Empty inputs, spam clicks, back button at wrong time.",
    commonErrors: ["App crashes on empty form submit", "Button works once then breaks"],
    reality: "You can't catch every edge case. Handle obvious ones, fix obscure ones as users report them."
  },
  {
    concept: "Browser differences",
    tip: "Works in Chrome doesn't mean works in Safari. Test in multiple browsers before calling it done.",
    commonErrors: ["Safari rendering differently", "IE doesn't support this"],
    reality: "Chrome, Firefox, Safari are must-test. Ignore IE unless you hate yourself."
  },
  
  // Collaboration Reality  
  {
    concept: "Git commits",
    tip: "Commit often with clear messages. 'WIP' and 'fix stuff' are fine for personal projects.",
    commonErrors: ["Forgot what this commit changed", "Accidentally committed sensitive data"],
    reality: "Commit messages matter more in teams. Solo projects can be messier. Just commit frequently."
  },
  {
    concept: "Code reviews",
    tip: "AI can review your code. Ask: 'What would you improve?' and 'What security issues do you see?'",
    commonErrors: ["Didn't catch obvious bug before deploying", "Security vulnerability shipped"],
    reality: "Self-review with AI is better than no review. Even a 2-minute check catches most issues."
  },
  {
    concept: "Documentation",
    tip: "README with setup steps is enough. Don't over-document code that's self-explanatory.",
    commonErrors: ["Can't remember how to run this project", "No one knows what this function does"],
    reality: "Document the 'why' and 'how to run it'. The 'what' should be obvious from good names."
  }
];

// Function to get a random tip
export function getRandomAITip(): string {
  return AI_COLLABORATION_TIPS[Math.floor(Math.random() * AI_COLLABORATION_TIPS.length)];
}

export function getRandomRealWorldTip(): { concept: string; tip: string; commonErrors?: string[]; reality: string } {
  return REAL_WORLD_USE_TIPS[Math.floor(Math.random() * REAL_WORLD_USE_TIPS.length)];
}

// Categories for organizing tips
export const TIP_CATEGORIES = {
  prompting: AI_COLLABORATION_TIPS.slice(0, 7),
  iteration: AI_COLLABORATION_TIPS.slice(7, 14),
  understanding: AI_COLLABORATION_TIPS.slice(14, 21),
  debugging: AI_COLLABORATION_TIPS.slice(21, 28),
  quality: AI_COLLABORATION_TIPS.slice(28, 35),
  workflow: AI_COLLABORATION_TIPS.slice(35, 42),
  learning: AI_COLLABORATION_TIPS.slice(42, 49),
  mindset: AI_COLLABORATION_TIPS.slice(49)
};
