import { useState, useMemo } from 'react';
import { BrainType, brainTypes } from '@/src/entities/codeData';

/**
 * 脳タイプに関連する状態とビジネスロジックを提供するカスタムフック
 */
export const useBrainType = () => {
  // 現在選択されている脳タイプ
  const [currentType, setCurrentType] = useState<BrainType | null>(null);

  // すべての脳タイプデータリスト
  const allBrainTypes = useMemo(() => Object.values(brainTypes), []);

  // 現在選択されている脳タイプの詳細データ
  const currentBrainData = useMemo(() => {
    if (!currentType) return null;
    return brainTypes[currentType];
  }, [currentType]);

  // 特定の脳タイプを選択するハンドラー
  const selectBrainType = (type: BrainType) => {
    setCurrentType(type);
  };

  return {
    currentType,
    currentBrainData,
    allBrainTypes,
    selectBrainType,
  };
};
