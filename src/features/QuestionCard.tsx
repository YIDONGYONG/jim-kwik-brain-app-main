import React, { useMemo } from 'react';
import { Question, BrainType } from '../entities/codeData';
import { motion } from 'motion/react';

interface QuestionCardProps {
  question: Question;
  onSelect: (type: BrainType) => void;
}

/**
 * 診断の各質問を表示するカードコンポーネント。
 * 選択肢の表示順をランダム化し、ユーザーの入力を受け付けます。
 */
export function QuestionCard({ question, onSelect }: QuestionCardProps) {
  // 選択肢をランダムにシャッフル（質問ごとに一度だけ実行）
  const shuffledOptions = useMemo(() => {
    if (!question?.options) return [];
    
    const options = [...question.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
  }, [question?.id]);

  if (!question) return null;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full mx-auto"
    >
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6 flex">
          <span className="inline-flex items-center justify-center bg-black text-white font-bold text-sm px-3 py-1 rounded-lg">
            Q{question.id}
          </span>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 leading-snug break-words">
          {question.text}
        </h2>
        
        <div className="flex flex-col gap-3">
          {shuffledOptions.map((option, idx) => (
            <button
              key={`${question.id}-${idx}`}
              onClick={() => onSelect(option.type)}
              className="w-full text-left p-4 sm:p-5 rounded-xl border-2 border-gray-100 hover:border-black hover:bg-gray-50 active:scale-[0.98] transition-all font-medium text-gray-700 hover:text-black leading-relaxed break-words whitespace-normal"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
