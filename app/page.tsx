'use client';

import { useState, useEffect } from 'react';
import { 
  Code, Trophy, Calendar, Target, Sparkles, BookOpen, 
  CheckCircle2, Lock, Zap, Clock, Lightbulb,
  AlertCircle, ChevronRight, Rocket, Brain, RefreshCw, Users
} from 'lucide-react';
import { CURRICULUM, type Challenge, type UserProgress } from './data/curriculum';
import { getRandomAITip, getRandomRealWorldTip } from './lib/tips';

// Simple localStorage wrapper
const storage = {
  async get(key: string) {
    if (typeof window === 'undefined') return null;
    const value = localStorage.getItem(key);
    return value ? { key, value } : null;
  },
  async set(key: string, value: string) {
    if (typeof window === 'undefined') return null;
    localStorage.setItem(key, value);
    return { key, value };
  }
};

export default function Home() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(CURRICULUM[0]);
  const [userCode, setUserCode] = useState(currentChallenge.starterCode);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [progress, setProgress] = useState<UserProgress>({
    completedChallenges: [],
    currentWeek: 1,
    currentDay: 1,
    startedAt: new Date().toISOString()
  });
  const [showMetaNarrative, setShowMetaNarrative] = useState(false);
  const [aiTip, setAiTip] = useState('');
  const [realWorldTip, setRealWorldTip] = useState<any>(null);

  useEffect(() => {
    loadProgress();
    rotateAITip();
    rotateRealWorldTip();
  }, []);

  useEffect(() => {
    setUserCode(currentChallenge.starterCode);
    setFeedback('');
    setShowHints(false);
    setShowSolution(false);
    setCurrentHintIndex(0);
    setShowMetaNarrative(false);
    rotateRealWorldTip();
  }, [currentChallenge]);

  const loadProgress = async () => {
    const result = await storage.get('mastery-lab-progress');
    if (result) {
      try {
        setProgress(JSON.parse(result.value));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  };

  const saveProgress = async (challengeId: string) => {
    const updated: UserProgress = {
      ...progress,
      completedChallenges: [...new Set([...progress.completedChallenges, challengeId])],
      currentWeek: currentChallenge.week,
      currentDay: currentChallenge.day
    };
    setProgress(updated);
    await storage.set('mastery-lab-progress', JSON.stringify(updated));
  };

  const rotateAITip = () => {
    setAiTip(getRandomAITip());
  };

  const rotateRealWorldTip = () => {
    setRealWorldTip(getRandomRealWorldTip());
  };

  const validateCode = async () => {
    setLoading(true);
    setFeedback('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a coding mentor helping someone learn to build with AI. 

CHALLENGE: ${currentChallenge.title}
LEARNING OBJECTIVE: ${currentChallenge.learningObjective}
CONCEPT: ${currentChallenge.concept}

THEIR CODE:
\`\`\`typescript
${userCode}
\`\`\`

REFERENCE SOLUTION:
\`\`\`typescript
${currentChallenge.solution}
\`\`\`

Evaluate their code:
1. Does it demonstrate understanding of ${currentChallenge.concept}?
2. Would it actually work?
3. What's good about their approach?
4. What needs improvement?

Be encouraging but honest. If they got it right, celebrate. If not, guide them.
Format: [PASS/FAIL/PARTIAL] then 2-3 sentences of feedback.`
          }]
        })
      });

      const data = await response.json();
      const result = data.content.find((c: any) => c.type === 'text')?.text || 'Could not validate';
      
      setFeedback(result);

      if (result.startsWith('[PASS]')) {
        await saveProgress(currentChallenge.id);
      }
    } catch (error) {
      setFeedback('[ERROR] Could not validate. Check your code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getNextHint = () => {
    if (currentHintIndex < currentChallenge.hints.length) {
      setCurrentHintIndex(prev => prev + 1);
      setShowHints(true);
    }
  };

  const isChallengeUnlocked = (challenge: Challenge) => {
    if (!challenge.requires || challenge.requires.length === 0) return true;
    return challenge.requires.every(req => progress.completedChallenges.includes(req));
  };

  const getChallengesByWeek = (week: number) => {
    return CURRICULUM.filter(c => c.week === week);
  };

  const getWeekProgress = (week: number) => {
    const weekChallenges = getChallengesByWeek(week);
    const completed = weekChallenges.filter(c => 
      progress.completedChallenges.includes(c.id)
    ).length;
    return { completed, total: weekChallenges.length, percentage: Math.round((completed / weekChallenges.length) * 100) };
  };

  const totalProgress = Math.round((progress.completedChallenges.length / CURRICULUM.length) * 100);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-dark-surface border-b border-dark-border sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-purple rounded-lg flex items-center justify-center animate-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mastery Lab</h1>
                <p className="text-sm text-gray-400">Your Ideas + AI-Powered Building</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-dark-elevated rounded-lg border border-dark-border">
                <Calendar className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-medium text-gray-300">Week {progress.currentWeek}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-dark-elevated rounded-lg border border-dark-border">
                <Trophy className="w-5 h-5 text-accent-yellow" />
                <span className="text-sm font-semibold text-white">
                  {progress.completedChallenges.length}/{CURRICULUM.length}
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Overall Progress</span>
              <span className="text-sm font-bold text-primary-400">{totalProgress}%</span>
            </div>
            <div className="w-full bg-dark-elevated rounded-full h-2 border border-dark-border">
              <div 
                className="bg-gradient-to-r from-primary-600 to-accent-purple h-2 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-dark-surface rounded-xl shadow-lg border border-dark-border p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary-500" />
                <h2 className="font-bold text-white">Your Journey</h2>
              </div>

              <div className="space-y-4">
                {[1, 2].map(week => {
                  const weekProgress = getWeekProgress(week);
                  const weekChallenges = getChallengesByWeek(week);
                  
                  return (
                    <div key={week} className="border border-dark-border rounded-lg p-3 bg-dark-elevated">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-300">Week {week}</span>
                        <span className="text-xs text-gray-500">{weekProgress.completed}/{weekProgress.total}</span>
                      </div>
                      <div className="w-full bg-dark-bg rounded-full h-1.5 mb-3">
                        <div 
                          className="bg-primary-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${weekProgress.percentage}%` }}
                        />
                      </div>
                      <div className="space-y-1">
                        {weekChallenges.map(challenge => {
                          const isCompleted = progress.completedChallenges.includes(challenge.id);
                          const isUnlocked = isChallengeUnlocked(challenge);
                          const isCurrent = currentChallenge.id === challenge.id;
                          
                          return (
                            <button
                              key={challenge.id}
                              onClick={() => isUnlocked && setCurrentChallenge(challenge)}
                              disabled={!isUnlocked}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                                isCurrent
                                  ? 'bg-primary-600/20 text-primary-400 font-medium border border-primary-600/30'
                                  : isCompleted
                                  ? 'bg-accent-green/10 text-accent-green border border-accent-green/20'
                                  : isUnlocked
                                  ? 'hover:bg-dark-muted text-gray-400'
                                  : 'opacity-40 cursor-not-allowed text-gray-600'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate">Day {challenge.day}</span>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                                ) : !isUnlocked ? (
                                  <Lock className="w-4 h-4 flex-shrink-0" />
                                ) : null}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Philosophy Banner */}
            <div className="bg-gradient-to-r from-primary-600/20 to-accent-purple/20 border border-primary-600/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-white mb-2">You + AI = Unstoppable</h3>
                  <p className="text-sm text-gray-300">
                    You bring the vision and decisions. AI brings the speed and implementation. 
                    This isn't about replacing developers - it's about becoming one who uses the best tools available.
                  </p>
                </div>
              </div>
            </div>

            {/* Challenge Header */}
            <div className="bg-dark-surface rounded-xl shadow-lg border border-dark-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs font-semibold rounded border border-primary-600/30">
                      Week {currentChallenge.week} • Day {currentChallenge.day}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded border ${
                      currentChallenge.difficulty === 'beginner' ? 'bg-accent-green/20 text-accent-green border-accent-green/30' :
                      currentChallenge.difficulty === 'intermediate' ? 'bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30' :
                      'bg-accent-red/20 text-accent-red border-accent-red/30'
                    }`}>
                      {currentChallenge.difficulty}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-accent-purple/20 text-accent-purple text-xs font-semibold rounded border border-accent-purple/30">
                      <Clock className="w-3 h-3" />
                      {currentChallenge.estimatedTime}min
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{currentChallenge.title}</h2>
                  <p className="text-lg text-gray-400 mb-4">{currentChallenge.subtitle}</p>
                  <div className="flex items-start gap-2 p-4 bg-primary-600/10 rounded-lg border border-primary-600/20">
                    <Brain className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white mb-1">Learning Objective</p>
                      <p className="text-sm text-gray-300">{currentChallenge.learningObjective}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Narrative */}
              {currentChallenge.metaNarrative && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowMetaNarrative(!showMetaNarrative)}
                    className="flex items-center gap-2 text-sm font-medium text-accent-purple hover:text-accent-pink transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    {showMetaNarrative ? 'Hide' : 'Show'} How We Built This
                    <ChevronRight className={`w-4 h-4 transition-transform ${showMetaNarrative ? 'rotate-90' : ''}`} />
                  </button>
                  {showMetaNarrative && (
                    <div className="mt-3 p-4 bg-accent-purple/10 border border-accent-purple/30 rounded-lg">
                      <p className="text-sm text-gray-300">{currentChallenge.metaNarrative}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div className="bg-dark-surface rounded-xl shadow-lg border border-dark-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <Code className="w-5 h-5" />
                  Your Solution
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={getNextHint}
                    disabled={currentHintIndex >= currentChallenge.hints.length}
                    className="px-4 py-2 bg-accent-yellow/20 hover:bg-accent-yellow/30 disabled:bg-dark-muted disabled:cursor-not-allowed text-accent-yellow disabled:text-gray-600 rounded-lg text-sm font-semibold transition flex items-center gap-1 border border-accent-yellow/30 disabled:border-dark-border"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Hint ({currentHintIndex}/{currentChallenge.hints.length})
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-4 py-2 bg-accent-red/20 hover:bg-accent-red/30 text-accent-red rounded-lg text-sm font-semibold transition border border-accent-red/30"
                  >
                    {showSolution ? 'Hide' : 'Show'} Solution
                  </button>
                </div>
              </div>
              
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-96 bg-dark-bg text-accent-green font-mono text-sm p-4 rounded-lg border border-dark-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 focus:outline-none resize-none"
                spellCheck={false}
                placeholder="Write your code here..."
              />

              <button
                onClick={validateCode}
                disabled={loading}
                className="mt-4 w-full py-4 bg-gradient-to-r from-primary-600 to-accent-purple hover:from-primary-700 hover:to-accent-purple/90 disabled:from-dark-muted disabled:to-dark-muted text-white rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    Submit Solution
                  </>
                )}
              </button>
            </div>

            {/* Hints */}
            {showHints && currentHintIndex > 0 && (
              <div className="bg-accent-yellow/10 border border-accent-yellow/30 rounded-xl p-6 animate-slide-up">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-accent-yellow">
                  <Lightbulb className="w-5 h-5" />
                  Hints
                </h3>
                <div className="space-y-3">
                  {currentChallenge.hints.slice(0, currentHintIndex).map((hint, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-dark-surface rounded-lg border border-dark-border">
                      <span className="flex-shrink-0 w-6 h-6 bg-accent-yellow/30 text-accent-yellow rounded-full flex items-center justify-center text-sm font-bold border border-accent-yellow/50">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-gray-300">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Solution */}
            {showSolution && (
              <div className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-6 animate-slide-up">
                <h3 className="text-lg font-semibold mb-3 text-accent-red">Reference Solution</h3>
                <pre className="bg-dark-bg text-accent-green p-4 rounded-lg overflow-x-auto text-sm font-mono border border-dark-border">
                  <code>{currentChallenge.solution}</code>
                </pre>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div className={`border rounded-xl p-6 animate-slide-up ${
                feedback.startsWith('[PASS]')
                  ? 'bg-accent-green/10 border-accent-green/30'
                  : feedback.startsWith('[FAIL]')
                  ? 'bg-accent-red/10 border-accent-red/30'
                  : 'bg-primary-600/10 border-primary-600/30'
              }`}>
                <div className="flex items-start gap-3">
                  {feedback.startsWith('[PASS]') ? (
                    <CheckCircle2 className="w-6 h-6 text-accent-green flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${
                      feedback.startsWith('[FAIL]') ? 'text-accent-red' : 'text-primary-400'
                    }`} />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">
                      {feedback.startsWith('[PASS]')
                        ? '🎉 Challenge Complete!'
                        : feedback.startsWith('[FAIL]')
                        ? 'Not Quite There'
                        : 'Partial Solution'}
                    </h3>
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {feedback.replace(/^\[(PASS|FAIL|PARTIAL)\]\s*/, '')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Cards with Rotating Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary-600/10 to-accent-purple/10 border border-primary-600/30 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary-400" />
                    Real-World Reality
                  </h4>
                  <button 
                    onClick={rotateRealWorldTip}
                    className="p-1 hover:bg-primary-600/20 rounded transition"
                    title="Show different tip"
                  >
                    <RefreshCw className="w-4 h-4 text-primary-400" />
                  </button>
                </div>
                {realWorldTip && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-primary-400 uppercase">{realWorldTip.concept}</p>
                    <p className="text-sm text-gray-300">{realWorldTip.tip}</p>
                    {realWorldTip.commonErrors && (
                      <div className="mt-2 p-2 bg-dark-surface/50 rounded border border-dark-border">
                        <p className="text-xs font-medium text-gray-400 mb-1">Common errors you'll see:</p>
                        {realWorldTip.commonErrors.map((err: string, idx: number) => (
                          <p key={idx} className="text-xs text-accent-red font-mono">• {err}</p>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 italic mt-2">Reality: {realWorldTip.reality}</p>
                  </div>
                )}
              </div>
              <div className="bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 border border-accent-purple/30 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent-purple" />
                    AI Collaboration
                  </h4>
                  <button 
                    onClick={rotateAITip}
                    className="p-1 hover:bg-accent-purple/20 rounded transition"
                    title="Show different tip"
                  >
                    <RefreshCw className="w-4 h-4 text-accent-purple" />
                  </button>
                </div>
                <p className="text-sm text-gray-300">{aiTip}</p>
              </div>
            </div>

            {/* Challenge-Specific Context */}
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h4 className="font-semibold text-white mb-4">About This Challenge</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-primary-400 uppercase mb-2">What You'll Actually Encounter</p>
                  <p className="text-sm text-gray-300">{currentChallenge.realWorldContext}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-accent-purple uppercase mb-2">How AI Helps With This</p>
                  <p className="text-sm text-gray-300">{currentChallenge.collaborationPhilosophy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
