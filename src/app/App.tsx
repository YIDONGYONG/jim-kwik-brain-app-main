import React, { useEffect, useState, useCallback } from 'react';
import { BrainType, questions, brainTypes, ResultProfile } from '../entities/codeData';
import { ProgressBar } from '../features/ProgressBar';
import { QuestionCard } from '../features/QuestionCard';
import { ResultReport } from '../scenes/ResultReport';
import { AdBanner } from '../features/AdBanner';
import { AnimatePresence, motion } from 'motion/react';
import { BrainCircuit } from 'lucide-react';
import { calculateBrainTypeResult } from '../features/brain/logic/scoring';
import { MainVisual } from '../features/brain/components/MainVisual';

// アプリケーションの状態（フェーズ）定義
type Step = 'welcome' | 'quiz' | 'calculating' | 'result';

/**
 * Appコンポーネント
 */
export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<BrainType[]>([]);
  const [result, setResult] = useState<ResultProfile | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('codeApp_result');
    if (!savedResult) return;
    try {
      const parsed = JSON.parse(savedResult);
      const type = parsed?.type as BrainType;
      if (type && brainTypes[type]) {
        setResult(brainTypes[type]);
      }
    } catch (error) {
      localStorage.removeItem('codeApp_result');
    }
  }, []);

  const startQuiz = useCallback(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('type')) {
      url.searchParams.delete('type');
      window.history.pushState({}, '', url.pathname);
    }
    setStep('quiz');
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sendTelemetry = useCallback(async (type: string, finalAnswers: BrainType[]) => {
    try {
      let browserId = localStorage.getItem('codeApp_bid');
      if (!browserId) {
        browserId = crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15);
        localStorage.setItem('codeApp_bid', browserId);
      }
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ browserId, brainType: type, answerCount: finalAnswers.length, timestamp: new Date().toISOString() })
      });
    } catch (error) {}
  }, []);

  const handleCalculateResult = useCallback((finalAnswers: BrainType[]) => {
    setStep('calculating');
    const finalResult = calculateBrainTypeResult(finalAnswers);
    sendTelemetry(finalResult.type, finalAnswers);
    setTimeout(() => {
      setResult(finalResult);
      localStorage.setItem('codeApp_result', JSON.stringify({ type: finalResult.type, timestamp: new Date().toISOString() }));
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  }, [sendTelemetry]);

  const handleAnswerSelect = (type: BrainType) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      handleCalculateResult(newAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-black selection:text-white items-center">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 w-full z-10 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black tracking-tight cursor-pointer" onClick={() => setStep('welcome')}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span>脳タイプ診断</span>
          </div>
          {step === 'quiz' && (
            <div className="w-1/3 max-w-[120px]">
              <ProgressBar current={currentQuestionIdx + 1} total={questions.length} />
            </div>
          )}
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center p-4 pt-10 pb-6">
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-md w-full"
              >
                <MainVisual />
                
                <div className="px-4 space-y-1">
                  <button
                    onClick={startQuiz}
                    className="w-full bg-black hover:bg-gray-800 text-white p-5 rounded-2xl text-xl font-bold transition-all active:scale-[0.98] shadow-xl shadow-black/10"
                  >
                    診断を始める →
                  </button>

                  {result && (
                    <button
                      onClick={() => setStep('result')}
                      className="w-full bg-white border-2 border-gray-100 text-gray-700 hover:border-black p-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
                    >
                      前回の結果を表示
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'quiz' && (
              <QuestionCard 
                question={questions[currentQuestionIdx]} 
                onSelect={handleAnswerSelect} 
              />
            )}

            {step === 'calculating' && (
              <motion.div key="calculating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6" />
                <h2 className="text-2xl font-bold mb-2">結果を分析中...</h2>
                <p className="text-gray-500 font-medium">回答データを解析してあなたのタイプを特定しています。</p>
              </motion.div>
            )}

            {step === 'result' && result && (
               <ResultReport profile={result} onRetake={startQuiz} />
            )}
          </AnimatePresence>
        </div>

        {step !== 'result' && (
          <div className="mt-4 w-full text-center">
            <AdBanner />
          </div>
        )}

        <footer className="w-full mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 leading-relaxed">
          <p>© 2026 君の脳は All Rights Reserved.</p>
          <p className="mt-2">
            ※このアプリは、挫折寸前の脳と大量のカフェインで駆動しています。<br />
            エラー画面に負けず、今夜もデバッグを続けるすべての受講生に、無限のコンパイル成功を！
          </p>
        </footer>
      </main>
    </div>
  );
}
