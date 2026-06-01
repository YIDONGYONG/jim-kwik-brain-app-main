import React from 'react';
import { useBrainType } from '../hooks/useBrainType';
import { BrainTypeCard } from '../components/BrainTypeCard';

/**
 * 脳タイプの状態を管理し、画面を構成するコンテナコンポーネント
 * ビジネスロジックフック(useBrainType)を使用してデータを取得し、UIコンポーネントへ注入します。
 */
export const BrainDashboardContainer: React.FC = () => {
  const { currentBrainData, allBrainTypes, selectBrainType } = useBrainType();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
          あなたの脳タイプは何ですか？
        </h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto break-keep leading-relaxed">
          ジム・クイック(Jim Kwik)の4つの脳タイプモデル。自分に最も合うタイプを選択して、その特性を確認してみましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {allBrainTypes.map((brain) => (
          <BrainTypeCard 
            key={brain.type}
            data={brain}
            isSelected={currentBrainData?.type === brain.type}
            onClick={() => selectBrainType(brain.type)}
          />
        ))}
      </div>

      {currentBrainData && (
        <div className="mt-12 p-8 bg-white border border-gray-200 rounded-3xl shadow-sm text-center transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-900 mb-2">選択されたタイプ: {currentBrainData.title}</h3>
          <p className="text-gray-600">
            {currentBrainData.title}タイプは <strong>{currentBrainData.subtitle}</strong> という特徴を持っています。
            自分の強みを活かして最高のパフォーマンスを発揮しましょう！
          </p>
        </div>
      )}
    </div>
  );
};
