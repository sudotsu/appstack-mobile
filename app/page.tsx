'use client';

import { useState, useEffect } from 'react';
import { 
  Code, Trophy, Calendar, Target, Sparkles, BookOpen, 
  CheckCircle2, Lock, ArrowRight, Zap, Clock, Lightbulb,
  AlertCircle, ChevronRight, Rocket, Brain
} from 'lucide-react';
import { CURRICULUM, type Challenge, type UserProgress } from './data/curriculum';

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

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    setUserCode(currentChallenge.starterCode);
    setFeedback('');
    setShowHints(false);
    setShowSolution(false);
    setCurrentHintIndex(0);
    setShowMetaNarrative(false);
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

  const availableChallenges = CURRICULUM.filter(isChallengeUnlocked);
  const totalProgress = Math.round((progress.completedChallenges.length / CURRICULUM.length) * 100);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mastery Lab</h1>
                <p className="text-sm text-gray-600">Build with AI in 4 weeks</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Week {progress.currentWeek}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
                <Trophy className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">
                  {progress.completedChallenges.length}/{CURRICULUM.length}
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-blue-600">{totalProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Challenge Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-gray-900">Your Journey</h2>
              </div>

              <div className="space-y-4">
                {[1, 2].map(week => {
                  const weekProgress = getWeekProgress(week);
                  const weekChallenges = getChallengesByWeek(week);
                  
                  return (
                    <div key={week} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Week {week}</span>
                        <span className="text-xs text-gray-500">{weekProgress.completed}/{weekProgress.total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all"
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
                                  ? 'bg-blue-100 text-blue-900 font-medium'
                                  : isCompleted
                                  ? 'bg-green-50 text-green-900'
                                  : isUnlocked
                                  ? 'hover:bg-gray-50 text-gray-700'
                                  : 'opacity-40 cursor-not-allowed text-gray-500'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate">Day {challenge.day}</span>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
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
            {/* Challenge Header */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      Week {currentChallenge.week} • Day {currentChallenge.day}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      currentChallenge.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                      currentChallenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentChallenge.difficulty}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                      <Clock className="w-3 h-3" />
                      {currentChallenge.estimatedTime}min
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentChallenge.title}</h2>
                  <p className="text-lg text-gray-600 mb-4">{currentChallenge.subtitle}</p>
                  <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg">
                    <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">Learning Objective</p>
                      <p className="text-sm text-gray-700">{currentChallenge.learningObjective}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meta Narrative */}
              {currentChallenge.metaNarrative && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowMetaNarrative(!showMetaNarrative)}
                    className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    <Sparkles className="w-4 h-4" />
                    {showMetaNarrative ? 'Hide' : 'Show'} How We Built This
                    <ChevronRight className={`w-4 h-4 transition-transform ${showMetaNarrative ? 'rotate-90' : ''}`} />
                  </button>
                  {showMetaNarrative && (
                    <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <p className="text-sm text-purple-900">{currentChallenge.metaNarrative}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Code Editor */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Your Solution
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={getNextHint}
                    disabled={currentHintIndex >= currentChallenge.hints.length}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition flex items-center gap-1"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Hint ({currentHintIndex}/{currentChallenge.hints.length})
                  </button>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition"
                  >
                    {showSolution ? 'Hide' : 'Show'} Solution
                  </button>
                </div>
              </div>
              
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-96 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                spellCheck={false}
                placeholder="Write your code here..."
              />

              <button
                onClick={validateCode}
                disabled={loading}
                className="mt-4 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 animate-slide-up">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-yellow-900">
                  <Lightbulb className="w-5 h-5" />
                  Hints
                </h3>
                <div className="space-y-3">
                  {currentChallenge.hints.slice(0, currentHintIndex).map((hint, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-gray-700">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Solution */}
            {showSolution && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-slide-up">
                <h3 className="text-lg font-semibold mb-3 text-red-900">Reference Solution</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{currentChallenge.solution}</code>
                </pre>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div className={`border rounded-xl p-6 animate-slide-up ${
                feedback.startsWith('[PASS]')
                  ? 'bg-green-50 border-green-200'
                  : feedback.startsWith('[FAIL]')
                  ? 'bg-red-50 border-red-200'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-3">
                  {feedback.startsWith('[PASS]') ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${
                      feedback.startsWith('[FAIL]') ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {feedback.startsWith('[PASS]')
                        ? '🎉 Challenge Complete!'
                        : feedback.startsWith('[FAIL]')
                        ? 'Not Quite There'
                        : 'Partial Solution'}
                    </h3>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {feedback.replace(/^\[(PASS|FAIL|PARTIAL)\]\s*/, '')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Real-World Use
                </h4>
                <p className="text-sm text-gray-700">{currentChallenge.realWorldUse}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Collaboration Tip
                </h4>
                <p className="text-sm text-gray-700">{currentChallenge.aiCollaborationTip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
