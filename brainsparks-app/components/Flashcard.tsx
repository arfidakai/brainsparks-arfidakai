'use client';

import React, { useState, useEffect } from 'react';

interface QuizProps {
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: string;
  reviewMode: 'instan' | 'akhir';
  onNext: (isCorrect: boolean) => void;
  onNextWithIndex?: (isCorrect: boolean, chosenOptionIndex: number | null) => void; // Prop opsional penampung data index
}

export const FlashcardComponent: React.FC<QuizProps> = ({
  question,
  codeSnippet,
  options,
  correctAnswerIndex,
  explanation,
  category,
  reviewMode,
  onNext,
  onNextWithIndex,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
  }, [question]);

  const handleOptionClick = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOption(index);
  };

  const handleActionClick = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === correctAnswerIndex;

    // Jika Mode Instan (Belajar langsung)
    if (reviewMode === 'instan') {
      if (!hasSubmitted) {
        setHasSubmitted(true);
      } else {
        if (onNextWithIndex) {
          onNextWithIndex(isCorrect, selectedOption);
        } else {
          onNext(isCorrect);
        }
      }
    } 
    // Jika Mode Akhir (AssessmentDay Style)
    else {
      if (onNextWithIndex) {
        onNextWithIndex(isCorrect, selectedOption);
      } else {
        onNext(isCorrect);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 border border-slate-100 my-2">
      <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
        category === 'Logic' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
      }`}>
        {category} Test
      </span>

      <h3 className="text-lg font-semibold text-slate-800 mt-4 leading-relaxed">
        {question}
      </h3>

      {codeSnippet && (
        <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-sm my-4 overflow-x-auto whitespace-pre-wrap">
          <code>{codeSnippet}</code>
        </pre>
      )}

      <div className="flex flex-col gap-3 mt-6">
        {options.map((option, index) => {
          let optionStyle = "border-slate-200 hover:bg-slate-50 text-slate-700";
          
          if (selectedOption === index) {
            optionStyle = "border-indigo-600 bg-indigo-50 text-indigo-700 font-medium";
          }

          if (reviewMode === 'instan' && hasSubmitted) {
            if (index === correctAnswerIndex) {
              optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold";
            } else if (selectedOption === index && index !== correctAnswerIndex) {
              optionStyle = "border-rose-500 bg-rose-50 text-rose-700 line-through";
            } else {
              optionStyle = "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
            }
          }

          return (
            <button
              key={index}
              disabled={reviewMode === 'instan' && hasSubmitted}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${optionStyle}`}
            >
              <span>{option}</span>
              {reviewMode === 'instan' && hasSubmitted && index === correctAnswerIndex && <span>✅</span>}
              {reviewMode === 'instan' && hasSubmitted && selectedOption === index && index !== correctAnswerIndex && <span>❌</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-4">
        {reviewMode === 'instan' && hasSubmitted && (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm text-slate-600 leading-relaxed">
            <strong className="text-slate-800 block mb-1">💡 Penjelasan:</strong>
            {explanation}
          </div>
        )}

        <button
          onClick={handleActionClick}
          disabled={selectedOption === null}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
            selectedOption !== null ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          {reviewMode === 'instan' 
            ? (!hasSubmitted ? 'Kunci Jawaban' : 'Lanjut ke Soal Berikutnya →')
            : 'Simpan & Lanjut →'}
        </button>
      </div>
    </div>
  );
};