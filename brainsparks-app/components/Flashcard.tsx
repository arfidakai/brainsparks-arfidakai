'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  question: string;
  answer: string;
  category: string;
  onAnswered: (level: 'easy' | 'medium' | 'hard') => void;
}

export const FlashcardComponent: React.FC<FlashcardProps> = ({
  question,
  answer,
  category,
  onAnswered,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-md h-80 perspective-1000 cursor-pointer my-6">
      <motion.div
        className="w-full h-full relative preserve-3d duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* SISI DEPAN (Pertanyaan) */}
        <div className="absolute w-full h-full backface-hidden bg-white shadow-xl rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
          <div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-600 uppercase tracking-wider">
              {category}
            </span>
            <h3 className="text-xl font-medium text-slate-800 mt-6 leading-relaxed">
              {question}
            </h3>
          </div>
          <p className="text-xs text-slate-400 text-center font-medium animate-pulse">
            👆 Ketuk kartu untuk melihat jawaban
          </p>
        </div>

        {/* SISI BELAKANG (Jawaban & Tombol SRS) */}
        <div 
          className="absolute w-full h-full backface-hidden bg-slate-900 shadow-xl rounded-2xl p-6 flex flex-col justify-between text-white"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div>
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-indigo-300 uppercase tracking-wider">
              Jawaban
            </span>
            <p className="text-base text-slate-200 mt-4 leading-relaxed overflow-y-auto max-h-40">
              {answer}
            </p>
          </div>

          {/* Sistem Penilaian Spaced Repetition */}
          <div className="grid grid-cols-3 gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setIsFlipped(false); onAnswered('hard'); }}
              className="bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-all text-xs font-medium py-2 px-1 rounded-xl border border-rose-500/30"
            >
              🔴 Sulit
            </button>
            <button
              onClick={() => { setIsFlipped(false); onAnswered('medium'); }}
              className="bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white transition-all text-xs font-medium py-2 px-1 rounded-xl border border-amber-500/30"
            >
              🟡 Sedang
            </button>
            <button
              onClick={() => { setIsFlipped(false); onAnswered('easy'); }}
              className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-all text-xs font-medium py-2 px-1 rounded-xl border border-emerald-500/30"
            >
              🟢 Mudah
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};