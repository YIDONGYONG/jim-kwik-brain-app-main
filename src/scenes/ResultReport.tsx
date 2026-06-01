import React, { useEffect } from 'react';
import { ResultProfile } from '../entities/codeData';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AnimalFace } from '../features/AnimalFace';
import { AdBanner } from '../features/AdBanner';

interface ResultReportProps {
  profile: ResultProfile;
  onRetake: () => void;
}

/**
 * ResultReport Component (src/scenes/ResultReport.tsx)
 * FSDにおける `scenes` (または `pages`) レイヤー。
 * 診断完了後に表示される結果画面全体を構成します。
 * 各特徴(特徴アニメーションなど)やエンティティ(ResultProfileデータ)を組み合わせて表示します。
 */
export function ResultReport({ profile, onRetake }: ResultReportProps) {
  useEffect(() => {
    // コンポーネントマウント時の紙吹雪（パンパレ）演出
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl w-full mx-auto pb-4"
    >
      <div className={`p-6 sm:p-10 rounded-3xl mb-6 shadow-sm ${profile.bgColor}`}>
        <div className="text-center mb-6">
          <p className="text-sm font-bold text-gray-500 mb-2 font-mono">YOUR COGNITIVE STYLE</p>
          <h1 className={`text-3xl sm:text-4xl font-extrabold mb-3 break-words ${profile.color}`}>
            {profile.title}
          </h1>
          <p className="text-lg font-medium text-gray-700">{profile.subtitle}</p>
        </div>
        
        {/* 動物の顔のアニメーション (featuresレイヤーからインポート) */}
        <div className={`w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8 rounded-full shadow-lg border-4 border-white flex items-center justify-center bg-gradient-to-br overflow-hidden ${profile.gradientFrom} ${profile.gradientTo}`}>
          <AnimalFace type={profile.type} className="w-full h-full object-cover p-2" />
        </div>

        {/* キーワードタグ */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {profile.keywords.map((kw, i) => (
            <span key={i} className="px-3 py-1 bg-white rounded-full text-sm font-bold text-gray-800 shadow-sm border border-gray-100">
              #{kw}
            </span>
          ))}
        </div>

        {/* タイプの詳細説明文 */}
        <div className="bg-white/80 p-5 rounded-2xl mb-8">
          <p className="text-gray-800 font-medium leading-relaxed break-words whitespace-pre-wrap">
            {profile.description}
          </p>
        </div>

        {/* カスタムレポートエリア */}
        <div className="space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-emerald-500">✅</span> 最適な学習・仕事戦略
            </h3>
            <ul className="space-y-3">
              {profile.bestLearning.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 font-medium break-words">
                  <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-rose-500">🚫</span> 避けるべき環境
            </h3>
            <p className="text-gray-700 font-medium break-words">
              {profile.worstLearning}
            </p>
          </section>
        </div>
      </div>

      {/* もう一度診断するボタン */}
      <div className="px-6 sm:px-0">
        <motion.button
          onClick={onRetake}
          whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-sm"
        >
          <RotateCcw className="w-5 h-5" />
          もう一度診断する
        </motion.button>
      </div>

      <div className="mt-6 w-full">
        <AdBanner />
      </div>
    </motion.div>
  );
}
