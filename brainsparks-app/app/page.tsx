 'use client';

import React, { useState, useEffect } from 'react';
import { mockQuizQuestions, QuizQuestion } from '../data/flashcards';
import { FlashcardComponent } from '../components/Flashcard';
import { useI18n, LanguageSwitcher } from '../lib/i18n';
import { studyMaterials as studyMaterialsId } from '../data/studyMaterials';
import { studyMaterials as studyMaterialsEn } from '../data/studyMaterials.en';

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'review' | 'materials'>('dashboard');
  
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Logic' | 'Programming'>('All');
  const [reviewMode, setReviewMode] = useState<'instan' | 'akhir'>('instan');

  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: boolean | null }>({});
  const [selectedIndicesTracker, setSelectedIndicesTracker] = useState<{ [key: number]: number | null }>({});

  const [timeLeft, setTimeLeft] = useState<number>(7200); // 120 Mins
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const [totalXp, setTotalXp] = useState<number>(0);
  const [testsTaken, setTestsTaken] = useState<number>(0);
  const [lifetimeCorrect, setLifetimeCorrect] = useState<number>(0);
  const [lifetimeWrong, setLifetimeWrong] = useState<number>(0);

  const [streakCount, setStreakCount] = useState<number>(0);

  const [isGeneratingExam, setIsGeneratingExam] = useState<boolean>(false);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  const [subCategoryStats, setSubCategoryStats] = useState<Record<string, { correct: number; wrong: number }>>({});
  const [completedMaterials, setCompletedMaterials] = useState<string[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTotalXp(parseInt(localStorage.getItem('apple_academy_xp') || '0', 10));
      setTestsTaken(parseInt(localStorage.getItem('apple_academy_tests') || '0', 10));
      setLifetimeCorrect(parseInt(localStorage.getItem('apple_academy_correct') || '0', 10));
      setLifetimeWrong(parseInt(localStorage.getItem('apple_academy_wrong') || '0', 10));

      const rawSubCategoryStats = localStorage.getItem('apple_academy_subcategory_stats');
      setSubCategoryStats(rawSubCategoryStats ? JSON.parse(rawSubCategoryStats) : {});

      const savedMaterials = localStorage.getItem('apple_academy_completed_materials');
      setCompletedMaterials(savedMaterials ? JSON.parse(savedMaterials) : []);

      const savedStreak = parseInt(localStorage.getItem('apple_academy_streak') || '0', 10);
      const lastActiveDateStr = localStorage.getItem('apple_academy_last_active_date');
      
      if (lastActiveDateStr && savedStreak > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lastDate = new Date(lastActiveDateStr);
        lastDate.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(today.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          setStreakCount(0);
          localStorage.setItem('apple_academy_streak', '0');
        } else {
          setStreakCount(savedStreak);
        }
      } else {
        setStreakCount(savedStreak);
      }
    }
  }, []);
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0 || currentView !== 'quiz') return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerTimeoutFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft, currentView]);

  const triggerTimeoutFinish = () => {
    setIsTimerActive(false);
    calculateAndSaveResults(null, null);
  };
  const getRankLevel = (xp: number) => {
    if (xp < 30) return 1;
    if (xp < 80) return 2;
    if (xp < 150) return 3;
    return 4;
  };

  type SubCategoryStats = Record<string, { correct: number; wrong: number }>;

  const readSubCategoryStats = (): SubCategoryStats => {
    if (typeof window === 'undefined') return {};
    const raw = localStorage.getItem('apple_academy_subcategory_stats');
    return raw ? JSON.parse(raw) : {};
  };

  const recordSubCategoryResult = (subCategory: string, isCorrect: boolean) => {
    if (typeof window === 'undefined') return;
    const stats = readSubCategoryStats();
    const entry = stats[subCategory] || { correct: 0, wrong: 0 };
    if (isCorrect) entry.correct += 1;
    else entry.wrong += 1;
    stats[subCategory] = entry;
    localStorage.setItem('apple_academy_subcategory_stats', JSON.stringify(stats));
    setSubCategoryStats({ ...stats });
  };

  const getWeakSubCategories = (): string[] => {
    const stats = readSubCategoryStats();
    return Object.entries(stats)
      .filter(([, s]) => s.correct + s.wrong >= 2 && s.correct / (s.correct + s.wrong) < 0.6)
      .sort((a, b) => a[1].correct / (a[1].correct + a[1].wrong) - b[1].correct / (b[1].correct + b[1].wrong))
      .slice(0, 5)
      .map(([subCategory]) => subCategory);
  };

  const getFallbackQuestions = (category: 'All' | 'Logic' | 'Programming') => {
    let filtered = [...mockQuizQuestions];
    if (category !== 'All') {
      filtered = filtered.filter(q => q.category === category);
    }
    return filtered.sort(() => Math.random() - 0.5);
  };

  const beginExamWithQuestions = (questions: QuizQuestion[]) => {
    setShuffledQuestions(questions);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedIndicesTracker({});
    setTimeLeft(7200);
    setIsTimerActive(true);
    setCurrentView('quiz');

    if (typeof window !== 'undefined') {
      const prevRaw = localStorage.getItem('apple_academy_recent_subcategories');
      const prev: string[] = prevRaw ? JSON.parse(prevRaw) : [];
      const updated = [...prev, ...questions.map(q => q.subCategory)].slice(-20);
      localStorage.setItem('apple_academy_recent_subcategories', JSON.stringify(updated));
    }
  };

  const markMaterialAsDone = (materialId: string) => {
    const updated = Array.from(new Set([...completedMaterials, materialId]));
    setCompletedMaterials(updated);
    localStorage.setItem('apple_academy_completed_materials', JSON.stringify(updated));
  };

  const openMaterialsView = () => {
    setSelectedTrackId(null);
    setSelectedSubtopicId(null);
    setCurrentView('materials');
  };

  const { t, locale } = useI18n();
  const studyMaterials = locale === 'en' ? studyMaterialsEn : studyMaterialsId;

  const activeTrack = selectedTrackId ? studyMaterials.find((material) => material.id === selectedTrackId) ?? null : null;
  const activeSubtopic = activeTrack && selectedSubtopicId
    ? activeTrack.subtopics.find((subtopic) => subtopic.id === selectedSubtopicId) ?? null
    : null;

  const startExam = async (category: 'All' | 'Logic' | 'Programming') => {
    setSelectedCategory(category);
    setIsGeneratingExam(true);
    setGenerationNotice(null);

    const totalLifetimeAnswers = lifetimeCorrect + lifetimeWrong;
    const recentAccuracy = totalLifetimeAnswers > 0 ? (lifetimeCorrect / totalLifetimeAnswers) * 100 : 0;
    const recentSubCategories: string[] = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('apple_academy_recent_subcategories') || '[]')
      : [];
    const weakSubCategories = getWeakSubCategories();

    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          rank: getRankLevel(totalXp),
          recentAccuracy,
          recentSubCategories,
          weakSubCategories,
        }),
      });

      if (!res.ok) throw new Error('Generation request failed');
      const data = await res.json();
      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No questions returned');
      }

      beginExamWithQuestions(data.questions as QuizQuestion[]);
    } catch (err) {
      console.error('AI question generation failed, falling back to practice set', err);
      setGenerationNotice('Could not reach the AI question generator — using the built-in practice set instead.');
      beginExamWithQuestions(getFallbackQuestions(category));
    } finally {
      setIsGeneratingExam(false);
    }
  };

  const handleNextQuestionWithIndex = (isCorrect: boolean, chosenOptionIndex: number | null) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: isCorrect }));
    setSelectedIndicesTracker((prev) => ({ ...prev, [currentIndex]: chosenOptionIndex }));
    recordSubCategoryResult(shuffledQuestions[currentIndex].subCategory, isCorrect);

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      calculateAndSaveResults(isCorrect, chosenOptionIndex);
    }
  };

  const handleSkipQuestion = () => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: null }));
    setSelectedIndicesTracker((prev) => ({ ...prev, [currentIndex]: null }));

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      calculateAndSaveResults(null, null);
    }
  };

  const calculateAndSaveResults = (lastAnswerStatus: boolean | null, lastChosenIndex: number | null) => {
    setIsTimerActive(false);
    setCurrentView('review');

    let sessionCorrect = 0;
    let sessionWrong = 0;

    shuffledQuestions.forEach((_, index) => {
      let ans = userAnswers[index];
      if (index === currentIndex) ans = lastAnswerStatus;
      if (ans === true) sessionCorrect++;
      else if (ans === false) sessionWrong++;
    });

    const sessionScore = (sessionCorrect * 4) + (sessionWrong * -1);
    const addedXp = sessionScore > 0 ? sessionScore : 0;

    const newTotalXp = totalXp + addedXp;
    const newTestsTaken = testsTaken + 1;
    const newLifetimeCorrect = lifetimeCorrect + sessionCorrect;
    const newLifetimeWrong = lifetimeWrong + sessionWrong;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastActiveDateStr = localStorage.getItem('apple_academy_last_active_date');
    let newStreak = streakCount;

    if (!lastActiveDateStr) {
      newStreak = 1;
    } else {
      const lastDate = new Date(lastActiveDateStr);
      lastDate.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak = streakCount + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }

    setTotalXp(newTotalXp);
    setTestsTaken(newTestsTaken);
    setLifetimeCorrect(newLifetimeCorrect);
    setLifetimeWrong(newLifetimeWrong);
    setStreakCount(newStreak);

    localStorage.setItem('apple_academy_xp', newTotalXp.toString());
    localStorage.setItem('apple_academy_tests', newTestsTaken.toString());
    localStorage.setItem('apple_academy_correct', newLifetimeCorrect.toString());
    localStorage.setItem('apple_academy_wrong', newLifetimeWrong.toString());
    localStorage.setItem('apple_academy_streak', newStreak.toString());
    localStorage.setItem('apple_academy_last_active_date', today.toISOString());

    import('canvas-confetti').then((cf) => {
      cf.default({ particleCount: 150, spread: 80 });
    });
  };

  const calculateFinalStats = () => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    shuffledQuestions.forEach((_, index) => {
      const ans = userAnswers[index];
      if (ans === true) correct++;
      else if (ans === false) wrong++;
      else skipped++;
    });

    const totalScore = (correct * 4) + (wrong * -1);
    const maxPossibleScore = shuffledQuestions.length * 4;
    return { correct, wrong, skipped, totalScore, maxPossibleScore };
  };

  // LEVEL SYSTEM LOGIC
  const getRankInfo = (xp: number) => {
    if (xp < 30) return { level: 1, title: 'Novice Thinker 🥚', desc: 'Keep practicing to develop muscle memory for logic puzzles.', nextMilestone: 30 };
    if (xp < 80) return { level: 2, title: 'Logic Learner 🐣', desc: 'Good progress! You are beginning to spot syntax traps and pattern jumps.', nextMilestone: 80 };
    if (xp < 150) return { level: 3, title: 'Problem Solver 🐥', desc: 'Impressive! Your structural analytical thinking is very well balanced.', nextMilestone: 150 };
    return { level: 4, title: 'Code Alchemist 🦅', desc: 'Master Rank! Your processing speed is highly ready for the Academy test.', nextMilestone: 500 };
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentRank = getRankInfo(totalXp);
  const stats = calculateFinalStats();
  const currentQuestion = shuffledQuestions[currentIndex];

  // Hitung persentase akurasi global seumur hidup
  const totalLifetimeAnswers = lifetimeCorrect + lifetimeWrong;
  const globalAccuracy = totalLifetimeAnswers > 0 ? ((lifetimeCorrect / totalLifetimeAnswers) * 100).toFixed(1) : '0.0';

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 sm:p-8 flex flex-col items-center">
      
      {/* VIEW 1: MAIN LEARNING DASHBOARD */}
      {currentView === 'dashboard' && (
        <div className="w-full max-w-4xl space-y-8 animate-fade-in">
          
          {/* WELCOME CARD */}
          <div className="w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-slate-800">
              <div className="space-y-2 w-full md:w-auto">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Level {currentRank.level} — {currentRank.title}
                </span>
                
                {/* STREAK BADGE CHIP */}
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full border flex items-center gap-1 shadow-sm ${
                  streakCount > 0 
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse' 
                    : 'bg-slate-800 text-slate-400 border-slate-700/60'
                }`}>
                  {t('streakPrefix')} {streakCount} {t('dayStreak')}
                </span>
              </div>
              
              <div className="mt-2">
                <LanguageSwitcher />
              </div>
              <p className="text-slate-400 text-sm max-w-lg leading-relaxed">{t('welcomeDesc')}</p>
              
              {/* Progress Bar to Next Level */}
              <div className="pt-2 w-full max-w-xs">
                <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                  <span>{t('progressToNext')}</span>
                  <span>{totalXp} / {currentRank.nextMilestone} XP</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full" style={{ width: `${Math.min((totalXp / currentRank.nextMilestone) * 100, 100)}%` }} />
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center min-w-[140px] shadow-inner backdrop-blur-sm self-stretch md:self-auto flex md:flex-col justify-center items-center gap-2 md:gap-0">
              <div>
                <span className="text-xs text-indigo-200 block font-bold uppercase tracking-wider mb-1">{t('totalPower')}</span>
                <span className="text-4xl font-black text-amber-400 tracking-tight">{totalXp}</span>
                <span className="text-xs text-slate-400 block font-medium mt-0.5">{t('xpPoints')}</span>
              </div>
            </div>
          </div>

          {/* GLOBAL PERFORMANCE STATISTICS GRAPH ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-xl">...</div>
              <div>
                <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">{t('totalDrills')}</span>
                <span className="text-2xl font-black text-slate-800">{testsTaken} <span className="text-xs font-medium text-slate-400">{t('sessions')}</span></span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-xl">🎯</div>
              <div>
                <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">{t('globalAccuracy')}</span>
                <span className="text-2xl font-black text-slate-800">{globalAccuracy}%</span>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-500 rounded-xl text-xl">🔥</div>
              <div>
                <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">{t('correctAnswers')}</span>
                <span className="text-2xl font-black text-slate-800">{lifetimeCorrect} <span className="text-xs font-medium text-slate-400">{t('items')}</span></span>
              </div>
            </div>
          </div>

          {/* TOPIC MASTERY BREAKDOWN */}
          {Object.keys(subCategoryStats).length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">📊 {t('topicMasteryTitle')}</h3>
                  <span className="text-xs text-slate-400 font-medium">{t('topicMasterySubtitle')}</span>
              </div>
              <div className="space-y-2.5">
                {Object.entries(subCategoryStats)
                  .map(([subCategory, s]) => ({
                    subCategory,
                    total: s.correct + s.wrong,
                    accuracy: Math.round((s.correct / (s.correct + s.wrong)) * 100),
                  }))
                  .sort((a, b) => a.accuracy - b.accuracy)
                  .slice(0, 8)
                  .map((item) => (
                    <div key={item.subCategory} className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-600 w-36 sm:w-44 truncate" title={item.subCategory}>
                        {item.subCategory}
                      </span>
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.accuracy < 60 ? 'bg-rose-400' : item.accuracy < 85 ? 'bg-amber-400' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${item.accuracy}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500 w-20 text-right shrink-0">
                        {item.accuracy}% <span className="text-slate-400 font-medium">({item.total})</span>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SETTINGS PRE-EXAM QUICK TOGGLE */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-slate-800">{t('settingsTitle')}</h3>
              <p className="text-xs text-slate-400 font-medium">{t('settingsDesc')}</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto">
                <button 
                onClick={() => setReviewMode('instan')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${reviewMode === 'instan' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t('instantFeedback')}
              </button>
              <button 
                onClick={() => setReviewMode('akhir')}
                className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all ${reviewMode === 'akhir' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {t('assessmentStyle')}
              </button>
            </div>
          </div>

          {generationNotice && (
            <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-xl p-3">
              {t('generationNoticePrefix')} {generationNotice}
            </div>
          )}

          {/* SYLLABUS CORE STUDY CARDS SECTION */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">🎯 {t('syllabusTitle')}</h2>
                <p className="text-xs text-slate-400 font-medium -mt-2">{t('syllabusDesc')}</p>
              </div>
              <button onClick={openMaterialsView} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700">
                📘 Study Materials
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* TRACK 1: MIXED TOPICS */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📚</div>
                  <h3 className="text-lg font-bold text-slate-800">{t('mixedTitle')}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('mixedDesc')}</p>
                </div>
                <button onClick={() => startExam('All')} disabled={isGeneratingExam} className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-50">
                  {isGeneratingExam ? t('generating') : t('mixedButton')}
                </button>
              </div>

              {/* TRACK 2: LOGIC & REASONING ONLY */}
              <div className="bg-white border-2 border-amber-200 bg-amber-50/20 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🧠</div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-800">{t('logicTitle')}</h3>
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded">High Priority</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('logicDesc')}</p>
                </div>
                <button onClick={() => startExam('Logic')} disabled={isGeneratingExam} className="w-full mt-6 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-amber-50">
                  {isGeneratingExam ? t('generating') : t('logicButton')}
                </button>
              </div>

              {/* TRACK 3: PROGRAMMING BASIC ONLY */}
              <div className="bg-white border-2 border-blue-200 bg-blue-50/20 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💻</div>
                  <h3 className="text-lg font-bold text-slate-800">{t('programmingTitle')}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('programmingDesc')}</p>
                </div>
                <button onClick={() => startExam('Programming')} disabled={isGeneratingExam} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-blue-50">
                  {isGeneratingExam ? t('generating') : t('programmingButton')}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: STUDY MATERIALS */}
      {currentView === 'materials' && (
        <div className="w-full max-w-5xl space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-900">📘 Study Materials</h2>
              <p className="text-sm text-slate-500">Klik topik utama, lanjut ke subtopik, lalu buka materi detail yang kamu butuhkan.</p>
            </div>
            <button
              onClick={() => {
                setSelectedTrackId(null);
                setSelectedSubtopicId(null);
                setCurrentView('dashboard');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
            >
              ← Back to Dashboard
            </button>
          </div>

          {!activeTrack && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {studyMaterials.map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedTrackId(track.id);
                    setSelectedSubtopicId(null);
                  }}
                  className="text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl">
                        {track.emoji}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600">Topik Utama</p>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">{track.title}</h3>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {track.subtopics.length} subtopik
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed">{track.description}</p>
                  <div className="mt-4 text-sm font-semibold text-indigo-700">Klik untuk buka materi →</div>
                </button>
              ))}
            </div>
          )}

          {activeTrack && (
            <div className="space-y-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">Topik Utama</p>
                  <h3 className="text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
                    <span>{activeTrack.emoji}</span>
                    <span>{activeTrack.title}</span>
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-2xl">{activeTrack.description}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedTrackId(null);
                    setSelectedSubtopicId(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold"
                >
                  ← Lihat semua topik
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeTrack.subtopics.map((subtopic) => {
                  const isActive = selectedSubtopicId === subtopic.id;
                  return (
                    <button
                      key={subtopic.id}
                      onClick={() => setSelectedSubtopicId(subtopic.id)}
                      className={`text-left rounded-2xl border p-5 shadow-sm transition-all ${isActive ? 'border-indigo-300 bg-indigo-50/60' : 'border-slate-200 bg-white hover:shadow-md'}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Subtopik</p>
                          <h4 className="text-lg font-bold text-slate-900 mt-1">{subtopic.title}</h4>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          {subtopic.materials.length} materi
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-3 leading-relaxed">{subtopic.description}</p>
                      <div className="mt-4 text-sm font-semibold text-indigo-700">Klik untuk lihat detail →</div>
                    </button>
                  );
                })}
              </div>

              {activeSubtopic && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Materi Detail</p>
                      <h4 className="text-xl font-black text-slate-900 mt-1">{activeSubtopic.title}</h4>
                    </div>
                    <button
                      onClick={() => setSelectedSubtopicId(null)}
                      className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold"
                    >
                      Tutup subtopik
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {activeSubtopic.materials.map((material) => {
                      const isCompleted = completedMaterials.includes(material.id);
                      return (
                        <div key={material.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                          <div className="flex items-start justify-between gap-3">
                            <h5 className="text-lg font-bold text-slate-900">{material.title}</h5>
                            {isCompleted && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">✓ Done</span>}
                          </div>

                          <p className="text-sm text-slate-600 mt-3 leading-relaxed">{material.summary}</p>

                          <ul className="mt-4 space-y-2 text-sm text-slate-600">
                            {material.keyPoints.map((point) => (
                              <li key={point} className="flex gap-2">
                                <span className="text-indigo-500">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm text-slate-600">
                            <strong className="text-slate-800">Tip:</strong> {material.quickTip}
                          </div>

                          <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-sm text-slate-600">
                            <strong className="text-indigo-800">Example:</strong> {material.example}
                          </div>

                          <div className="mt-5 flex flex-wrap gap-2">
                            <button onClick={() => markMaterialAsDone(material.id)} className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">
                              {isCompleted ? 'Reviewed' : 'Mark as Read'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: LIVE QUIZ LAYING INTERFACE */}
      {currentView === 'quiz' && (
        <div className="w-full max-w-2xl flex flex-col items-center animate-fade-in">
          <div className="w-full bg-white shadow-sm border border-slate-200 rounded-2xl p-4 flex justify-between items-center gap-4 mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">{t('trackLabel')} {selectedCategory === 'All' ? 'Mixed' : selectedCategory}</p>
              <p className="text-xs font-medium text-slate-500">{t('modeLabel')} {reviewMode === 'instan' ? t('instantFeedback') : t('assessmentStyle')}</p>
            </div>
            <div className="bg-slate-900 text-emerald-400 px-4 py-2 rounded-xl font-mono font-bold tracking-wider">
              ⏱️ {formatTime(timeLeft)}
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-4 shadow-inner">
            <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${(currentIndex / shuffledQuestions.length) * 100}%` }} />
          </div>

          <div className="w-full flex justify-between items-center px-1 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>{t('questionLabel')} {currentIndex + 1} of {shuffledQuestions.length}</span>
            <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">Sub: {currentQuestion.subCategory}</span>
          </div>

          <FlashcardComponent
            key={currentQuestion.id + "-dashboard-active"}
            question={currentQuestion.question}
            codeSnippet={currentQuestion.codeSnippet}
            options={currentQuestion.options}
            correctAnswerIndex={currentQuestion.correctAnswerIndex}
            explanation={currentQuestion.explanation}
            category={currentQuestion.category}
            reviewMode={reviewMode}
            onNext={() => {}}
            onNextWithIndex={(isCorrect, chosenIdx) => handleNextQuestionWithIndex(isCorrect, chosenIdx)}
          />

          <button onClick={handleSkipQuestion} className="mt-2 text-sm font-semibold text-slate-400 hover:text-slate-700 underline transition-all">
            {t('skipButton')}
          </button>
        </div>
      )}

      {/* VIEW 3: FULL REPORT REVIEW SHEET (ALA ASSESSMENTDAY) */}
      {currentView === 'review' && (
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-slate-200 animate-fade-in flex flex-col items-center">
          <span className="text-5xl mb-2">🏅</span>
          <h2 className="text-3xl font-black text-slate-900">{t('performanceReviewTitle')}</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6 text-center">Analyze your answers item by item to discover mistakes and master structural logic traps.</p>

          <div className="w-full grid grid-cols-4 gap-3 mb-8 text-center">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
              <span className="block text-xs font-bold text-emerald-700 uppercase">{t('correctPlus')}</span>
              <span className="text-2xl font-black text-emerald-600">{stats.correct}</span>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
              <span className="block text-xs font-bold text-rose-700 uppercase">{t('incorrectMinus')}</span>
              <span className="text-2xl font-black text-rose-600">{stats.wrong}</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <span className="block text-xs font-bold text-slate-500 uppercase">{t('skipped')}</span>
              <span className="text-2xl font-black text-slate-700">{stats.skipped}</span>
            </div>
            <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-md">
              <span className="block text-xs font-bold text-indigo-200 uppercase">{t('sessionScore')}</span>
              <span className="text-2xl font-black text-white">{stats.totalScore}</span>
            </div>
          </div>

            <div className="w-full border-t border-slate-200 pt-6 text-left flex flex-col gap-8">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">📋 {t('itemizedBreakdown')}</h3>
            
            {shuffledQuestions.map((q, idx) => {
              const statusJawaban = userAnswers[idx];
              const indexOpsiTerpilih = selectedIndicesTracker[idx];
              
              let statusBadge = "bg-slate-100 text-slate-600 border-slate-200";
              let statusText = `⚠️ ${t('skipped')} (0 Pts)`;
              
              if (statusJawaban === true) {
                statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
                statusText = `✅ ${t('correctPlus')} (0 Pts)`;
              } else if (statusJawaban === false) {
                statusBadge = "bg-rose-50 text-rose-700 border-rose-200";
                statusText = `❌ ${t('incorrectMinus')} (0 Pts)`;
              }

              return (
                <div key={q.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col gap-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <span className="text-sm font-bold text-slate-500">{t('questionLabel')} #{idx + 1}</span>
                    <span className={`px-2.5 py-0.5 text-xs font-bold border rounded-md ${statusBadge}`}>{statusText}</span>
                  </div>

                  <p className="text-base font-semibold text-slate-800 leading-relaxed">{q.question}</p>

                  {q.codeSnippet && (
                    <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                      <code>{q.codeSnippet}</code>
                    </pre>
                  )}

                  <div className="flex flex-col gap-2 mt-2">
                    {q.options.map((opt, optIdx) => {
                      let borderStyle = "border-slate-200 bg-white text-slate-700";
                      
                      if (optIdx === q.correctAnswerIndex) {
                        borderStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                      } else if (indexOpsiTerpilih === optIdx && optIdx !== q.correctAnswerIndex) {
                        borderStyle = "border-rose-400 bg-rose-50 text-rose-800 line-through";
                      }

                      return (
                        <div key={optIdx} className={`p-3 border rounded-lg text-sm flex justify-between items-center ${borderStyle}`}>
                          <span>{opt}</span>
                          {optIdx === q.correctAnswerIndex && <span className="text-xs font-bold text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 rounded">{t('correctAnswerLabel')}</span>}
                          {indexOpsiTerpilih === optIdx && optIdx !== q.correctAnswerIndex && <span className="text-xs font-bold text-rose-600 bg-rose-100/50 px-1.5 py-0.5 rounded">{t('yourChoiceLabel')}</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl text-xs sm:text-sm text-slate-600 mt-2">
                    <strong className="text-indigo-900 font-bold block mb-1">{t('solutionExplanationLabel')}</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => setCurrentView('dashboard')} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md mt-8">
            {t('backToDashboard')}
          </button>
        </div>
      )}

    </main>
  );
}