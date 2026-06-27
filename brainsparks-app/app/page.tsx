'use client';

import React, { useState, useEffect } from 'react';
import { mockQuizQuestions, QuizQuestion } from '../data/flashcards';
import { FlashcardComponent } from '../components/Flashcard';

export default function Home() {
  // CONFIGURATION STATES
  const [isConfiguring, setIsConfiguring] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Logic' | 'Programming'>('All');
  const [reviewMode, setReviewMode] = useState<'instan' | 'akhir'>('instan');

  // CORE QUIZ STATES
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: boolean | null }>({});
  
  // TRACKER KHUSUS ASSESSMENTDAY: Menyimpan indeks opsi yang dipilih user di setiap nomor soal
  const [selectedIndicesTracker, setSelectedIndicesTracker] = useState<{ [key: number]: number | null }>({});

  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(7200); // 120 Menit
  const [totalXp, setTotalXp] = useState<number>(0);

  useEffect(() => {
    const savedXp = localStorage.getItem('apple_academy_xp');
    if (savedXp) setTotalXp(parseInt(savedXp, 10));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || isFinished || isConfiguring) {
      if (timeLeft === 0 && !isConfiguring) finishQuiz(null, null);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, isConfiguring]);

  const startQuizSession = () => {
    let filtered = [...mockQuizQuestions];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    const scrambled = filtered.sort(() => Math.random() - 0.5);
    
    setShuffledQuestions(scrambled);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedIndicesTracker({});
    setTimeLeft(7200);
    setIsFinished(false);
    setIsConfiguring(false);
  };

  // Fungsi dimodifikasi agar menerima payload data pilihan indeks dari komponen Flashcard
  const handleNextQuestionWithIndex = (isCorrect: boolean, chosenOptionIndex: number | null) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: isCorrect }));
    setSelectedIndicesTracker((prev) => ({ ...prev, [currentIndex]: chosenOptionIndex }));

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz(isCorrect, chosenOptionIndex);
    }
  };

  const handleSkipQuestion = () => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: null }));
    setSelectedIndicesTracker((prev) => ({ ...prev, [currentIndex]: null }));

    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz(null, null);
    }
  };

  const finishQuiz = (lastAnswerStatus: boolean | null, lastChosenIndex: number | null) => {
    setIsFinished(true);
    
    let correct = 0;
    let wrong = 0;
    shuffledQuestions.forEach((_, index) => {
      let ans = userAnswers[index];
      if (index === currentIndex) ans = lastAnswerStatus;
      if (ans === true) correct++;
      else if (ans === false) wrong++;
    });

    const sessionScore = (correct * 4) + (wrong * -1);
    const addedXp = sessionScore > 0 ? sessionScore : 0; 
    
    const newTotalXp = totalXp + addedXp;
    setTotalXp(newTotalXp);
    localStorage.setItem('apple_academy_xp', newTotalXp.toString());

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

  const getRankInfo = (xp: number) => {
    if (xp < 30) return { level: 1, title: 'Novice Thinker 🥚', desc: 'Mulai biasakan otak dengan pola penalaran mekanis.' };
    if (xp < 80) return { level: 2, title: 'Logic Learner 🐣', desc: 'Kamu sudah mulai paham membaca jebakan kode dan deret matematika.' };
    if (xp < 150) return { level: 3, title: 'Problem Solver 🐥', desc: 'Otak kanan dan kirimu seimbang mengurai logika rumit.' };
    return { level: 4, title: 'Code Alchemist 🦅', desc: 'Level Juara! Logikamu siap bersaing ketat di Online Test Academy!' };
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

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center p-6">
      
      {/* LEVEL HEADER */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <span className="bg-indigo-500/30 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            Level {currentRank.level} — {currentRank.title}
          </span>
          <p className="text-xs text-slate-300 mt-1 max-w-md">{currentRank.desc}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block font-medium">Total XP Terkumpul:</span>
          <span className="text-2xl font-black text-amber-400">{totalXp} <span className="text-sm font-normal text-slate-300">XP</span></span>
        </div>
      </div>

      {/* SCREEN 1: CONFIGURATION */}
      {isConfiguring ? (
        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-slate-200 mt-4">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">🛠️ Set Sesi Latihan Kamu</h2>
          <p className="text-sm text-slate-500 mb-6">Sesuaikan jenis soal dan tipe penilaian sebelum mulai agar latihanmu maksimal.</p>

          <div className="mb-6">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">🎯 Pilih Materi Latihan</label>
            <div className="grid grid-cols-3 gap-3">
              {(['All', 'Logic', 'Programming'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                    selectedCategory === cat ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {cat === 'All' ? '📚 Mix' : cat === 'Logic' ? '🧠 Logic' : '💻 Code'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">⏱️ Sistem Koreksi Jawaban</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setReviewMode('instan')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${reviewMode === 'instan' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
              >
                <span className="block font-bold text-sm">⚡ Langsung Koreksi (Belajar)</span>
                <span className="block text-xs mt-1 text-slate-500 opacity-80">Kunci jawaban & penjelasan langsung terbuka di tiap nomor soal.</span>
              </button>
              <button
                onClick={() => setReviewMode('akhir')}
                className={`p-4 rounded-xl border-2 text-left transition-all ${reviewMode === 'akhir' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
              >
                <span className="block font-bold text-sm">📝 Koreksi Akhir </span>
                <span className="block text-xs mt-1 text-slate-500 opacity-80">Kunci jawaban dirahasiakan selama tes. Semua lembar kerja di-review lengkap di akhir kuis.</span>
              </button>
            </div>
          </div>

          <button onClick={startQuizSession} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
            Mulai Sesi Latihan Sekarang 🔥
          </button>
        </div>
      ) : !isFinished ? (
        
        /* SCREEN 2: LIVE QUIZ PLAYING */
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-4xl bg-white shadow-sm border border-slate-200 rounded-2xl p-4 flex justify-between items-center gap-4 mb-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Materi: {selectedCategory === 'All' ? 'Gabungan' : selectedCategory}</p>
              <p className="text-xs font-medium text-slate-500">Mode: {reviewMode === 'instan' ? 'Koreksi Langsung' : 'AssessmentDay Style'}</p>
            </div>
            <div className="bg-slate-900 border border-slate-900 text-emerald-400 px-4 py-2 rounded-xl font-mono font-bold">⏱️ {formatTime(timeLeft)}</div>
          </div>

          <div className="w-full max-w-2xl bg-slate-200 h-2 rounded-full overflow-hidden mb-4 shadow-inner">
            <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${(currentIndex / shuffledQuestions.length) * 100}%` }} />
          </div>

          <div className="w-full max-w-2xl flex justify-between items-center px-1 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Soal {currentIndex + 1} dari {shuffledQuestions.length}</span>
            <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">Sub: {currentQuestion.subCategory}</span>
          </div>

          <FlashcardComponent
            key={currentQuestion.id}
            question={currentQuestion.question}
            codeSnippet={currentQuestion.codeSnippet}
            options={currentQuestion.options}
            correctAnswerIndex={currentQuestion.correctAnswerIndex}
            explanation={currentQuestion.explanation}
            category={currentQuestion.category}
            reviewMode={reviewMode}
            onNext={(isCorrect) => {
              // Untuk mencadangkan opsi mana yang di-klik user saat ini, kita ambil value dari elemen active (atau dihandle via callback internal)
              // Agar aman dan kompatibel dengan Flashcard.tsx terbaru, kita pass state yang diatur oleh FlashcardComponent
            }}
            // Trik oper data: kita ganti callback onNext bawaan komponen dengan fungsi penangkap index di bawah
            // (Kita ganti di FlashcardComponent agar memanggil callback khusus yang mensuplai index)
          />
          {/* Untuk menghubungkan data index secara sempurna, kita bypass via custom function */}
          <div className="hidden">
            {/* Hanya penanda, logika asli dieksekusi di komponen kuis bawah */}
          </div>
          
          {/* RE-RENDER COMPONENT DENGAN HOOKS PENERIMA INDEX BARU */}
          <div className="w-full flex flex-col items-center -mt-8">
            <FlashcardComponent
              key={currentQuestion.id + "-fixed"}
              question={currentQuestion.question}
              codeSnippet={currentQuestion.codeSnippet}
              options={currentQuestion.options}
              correctAnswerIndex={currentQuestion.correctAnswerIndex}
              explanation={currentQuestion.explanation}
              category={currentQuestion.category}
              reviewMode={reviewMode}
              onNext={(isCorrect) => {
                // Di handle via modifikasi FlashcardComponent di bawah yang otomatis mengoper status
              }}
              // Kita pasang fungsi interseptor penampung state indeks pilihan
              onNextWithIndex={(isCorrect, chosenIdx) => handleNextQuestionWithIndex(isCorrect, chosenIdx)}
            />
          </div>

          <button onClick={handleSkipQuestion} className="mt-2 text-sm font-semibold text-slate-500 hover:text-slate-800 underline transition-all">
            Lewati Soal Ini (0 Poin, Hindari Minus)
          </button>
        </div>
      ) : (
        
        /* SCREEN 3: ASSESSMENTDAY STYLE REVIEW PAGE (HALAMAN PASCA UJIAN) */
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-slate-200 animate-fade-in flex flex-col items-center">
          <span className="text-5xl mb-2">📊</span>
          <h2 className="text-3xl font-black text-slate-900">Lembar Review Hasil Ujian</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6 text-center">Evaluasi seluruh jawabanmu di bawah ini untuk mengasah sensitivitas logikamu.</p>

          {/* GRID SKOR UTAMA */}
          <div className="w-full grid grid-cols-4 gap-3 mb-8 text-center">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
              <span className="block text-xs font-bold text-emerald-700 uppercase">Benar (+4)</span>
              <span className="text-2xl font-black text-emerald-600">{stats.correct}</span>
            </div>
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
              <span className="block text-xs font-bold text-rose-700 uppercase">Salah (-1)</span>
              <span className="text-2xl font-black text-rose-600">{stats.wrong}</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
              <span className="block text-xs font-bold text-slate-500 uppercase">Kosong (0)</span>
              <span className="text-2xl font-black text-slate-700">{stats.skipped}</span>
            </div>
            <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-md">
              <span className="block text-xs font-bold text-indigo-200 uppercase">Total Skor</span>
              <span className="text-2xl font-black text-white">{stats.totalScore}</span>
            </div>
          </div>

          {/* AREA REVIEW DAFTAR SOAL SATU PER SATU (ALA ASSESSMENTDAY) */}
          <div className="w-full border-t border-slate-200 pt-6 text-left flex flex-col gap-8">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">📋 Pembahasan Lembar Jawaban:</h3>
            
            {shuffledQuestions.map((q, idx) => {
              const statusJawaban = userAnswers[idx]; // true, false, atau null
              const indexOpsiTerpilih = selectedIndicesTracker[idx]; // angka indeks atau null
              
              let statusBadge = "bg-slate-100 text-slate-600 border-slate-200";
              let statusText = "⚠️ DILEWATI (0 Poin)";
              
              if (statusJawaban === true) {
                statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
                statusText = "✅ BENAR (+4 Poin)";
              } else if (statusJawaban === false) {
                statusBadge = "bg-rose-50 text-rose-700 border-rose-200";
                statusText = "❌ SALAH (-1 Poin)";
              }

              return (
                <div key={q.id} className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col gap-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <span className="text-sm font-bold text-slate-500">Soal Nomor {idx + 1}</span>
                    <span className={`px-2.5 py-0.5 text-xs font-bold border rounded-md ${statusBadge}`}>{statusText}</span>
                  </div>

                  <p className="text-base font-semibold text-slate-800 leading-relaxed">{q.question}</p>

                  {q.codeSnippet && (
                    <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                      <code>{q.codeSnippet}</code>
                    </pre>
                  )}

                  {/* Daftar Opsi dan Status Klik-nya */}
                  <div className="flex flex-col gap-2 mt-2">
                    {q.options.map((opt, optIdx) => {
                      let borderStyle = "border-slate-200 bg-white text-slate-700";
                      
                      // Highlight Jawaban Asli yang Benar
                      if (optIdx === q.correctAnswerIndex) {
                        borderStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                      }
                      // Highlight Pilihan User jika ternyata Salah
                      else if (indexOpsiTerpilih === optIdx && optIdx !== q.correctAnswerIndex) {
                        borderStyle = "border-rose-400 bg-rose-50 text-rose-800 line-through";
                      }

                      return (
                        <div key={optIdx} className={`p-3 border rounded-lg text-sm flex justify-between items-center ${borderStyle}`}>
                          <span>{opt}</span>
                          {optIdx === q.correctAnswerIndex && <span className="text-xs font-bold text-emerald-600 bg-emerald-100/50 px-1.5 py-0.5 rounded">Kunci Jawaban</span>}
                          {indexOpsiTerpilih === optIdx && optIdx !== q.correctAnswerIndex && <span className="text-xs font-bold text-rose-600 bg-rose-100/50 px-1.5 py-0.5 rounded">Pilihan Kamu</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* KOTAK PENJELASAN (Selalu Muncul ala AssessmentDay) */}
                  <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl text-xs sm:text-sm text-slate-600 mt-2">
                    <strong className="text-indigo-900 font-bold block mb-1">💡 Pembahasan Detail:</strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => setIsConfiguring(true)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md mt-8">
            Buat Sesi Ujian Baru 🔄
          </button>
        </div>
      )}
    </main>
  );
}