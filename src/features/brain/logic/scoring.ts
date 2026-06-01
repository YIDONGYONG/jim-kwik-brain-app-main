import { BrainType, brainTypes, ResultProfile } from '../../../entities/codeData';

/**
 * 脳タイプ診断のスコア計算および結果判定を行うビジネスロジック。
 * 
 * @param answers ユーザーが選択した脳タイプの配列
 * @returns 判定された脳タイプの結果プロファイル
 */
export const calculateBrainTypeResult = (answers: BrainType[]): ResultProfile => {
  const scores: Record<BrainType, number> = { 
    Cheetah: 0, 
    Owl: 0, 
    Elephant: 0, 
    Dolphin: 0 
  };

  // 各タイプのスコアを集計
  answers.forEach((type) => {
    if (scores[type] !== undefined) {
      scores[type] += 1;
    }
  });

  /**
   * 最高得点のタイプを決定する。
   * 同点の場合は、以下の優先順位で最初のものを採用するタイブレーク戦略をとる。
   * Cheetah > Owl > Elephant > Dolphin
   */
  let maxScore = -1;
  let winningType: BrainType = 'Cheetah';
  
  const types: BrainType[] = ['Cheetah', 'Owl', 'Elephant', 'Dolphin'];
  
  for (const type of types) {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      winningType = type;
    }
  }

  return brainTypes[winningType];
};

/**
 * スコアデータをテレメトリ送信用にフォーマットする。
 */
export const formatTelemetryData = (type: BrainType, scores: Record<BrainType, number>) => {
  return {
    brainType: type,
    scores,
    calculatedAt: new Date().toISOString(),
  };
};
