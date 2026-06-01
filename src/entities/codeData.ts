export type BrainType = 'Cheetah' | 'Owl' | 'Elephant' | 'Dolphin';

export interface Question {
  id: number;
  text: string;
  options: { text: string; type: BrainType }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "あなたの行動スタイルは？",
    options: [
      { text: "すぐに行動し、素早く結果を出したい", type: 'Cheetah' },
      { text: "じっくり戦略を立ててから動き出したい", type: 'Owl' },
      { text: "過去の経験を活かして丁寧に進めたい", type: 'Elephant' },
      { text: "周りと協力しながら楽しく進めたい", type: 'Dolphin' }
    ]
  },
  {
    id: 2,
    text: "新しい情報を学ぶとき、どうする？",
    options: [
      { text: "要点だけを素早く掴み、即実践する", type: 'Cheetah' },
      { text: "論理的に納得できるまで深く掘り下げる", type: 'Owl' },
      { text: "体系的に順序立てて一つずつ覚える", type: 'Elephant' },
      { text: "人と意見を交わしながら対話で学ぶ", type: 'Dolphin' }
    ]
  },
  {
    id: 3,
    text: "一番ストレスを感じる瞬間は？",
    options: [
      { text: "物事が停滞し、スピード感が失われること", type: 'Cheetah' },
      { text: "根拠のない決断や、論理性の欠如", type: 'Owl' },
      { text: "急な予定変更や、安定が損なわれること", type: 'Elephant' },
      { text: "対立や孤立など、人間関係の不調和", type: 'Dolphin' }
    ]
  },
  {
    id: 4,
    text: "自分の最大の強みは？",
    options: [
      { text: "圧倒的なスピードと実行力", type: 'Cheetah' },
      { text: "鋭い洞察力と冷静な分析力", type: 'Owl' },
      { text: "豊富な知識と揺るぎない安定感", type: 'Elephant' },
      { text: "高い共感力とチームをまとめる力", type: 'Dolphin' }
    ]
  },
  {
    id: 5,
    text: "トラブルが起きたとき、どう動く？",
    options: [
      { text: "まずは解決策を試し、走りながら考える", type: 'Cheetah' },
      { text: "原因を徹底的に分析し、根本から解決する", type: 'Owl' },
      { text: "過去の似た事例を思い出し、確実に対処する", type: 'Elephant' },
      { text: "周囲に相談し、全員が納得できる道を探す", type: 'Dolphin' }
    ]
  },
  {
    id: 6,
    text: "最も大切にしている価値観は？",
    options: [
      { text: "効率性とスピード", type: 'Cheetah' },
      { text: "正確性と知性", type: 'Owl' },
      { text: "安定と経験", type: 'Elephant' },
      { text: "調和とつながり", type: 'Dolphin' }
    ]
  },
  {
    id: 7,
    text: "周りから言われるあなたの印象は？",
    options: [
      { text: "エネルギッシュで決断が早い人", type: 'Cheetah' },
      { text: "頭の回転が速く、冷静でスマートな人", type: 'Owl' },
      { text: "頼りがいがあって記憶力が抜群な人", type: 'Elephant' },
      { text: "優しくてコミュニケーション能力が高い人", type: 'Dolphin' }
    ]
  }
];

export interface ResultProfile {
  type: BrainType;
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  emoji: string;
  imageUrl: string;
  keywords: string[];
  description: string;
  bestLearning: string[];
  worstLearning: string;
  dailyMission: string;
}

export const brainTypes: Record<BrainType, ResultProfile> = {
  Cheetah: {
    type: 'Cheetah',
    title: 'チーター',
    subtitle: '圧倒的なスピードと即断即決',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    gradientFrom: 'from-orange-100',
    gradientTo: 'to-orange-300',
    emoji: '🐆',
    imageUrl: 'https://img.freepik.com/free-vector/cute-cheetah-cartoon-vector-illustration_1308-124458.jpg',
    keywords: ['スピード', '直感', '実行力', '適応'],
    description: 'あなたは瞬発力に優れたチータータイプです。目標に向かって真っ直ぐ突き進む姿は周囲に活力を与えます。',
    bestLearning: ['短期間の集中学習', 'ゲーム感覚の課題', '即時のフィードバック'],
    worstLearning: '長引く会議や、実行のない計画',
    dailyMission: '今日一番やりたいことを、すぐに5分だけ実行してみましょう。'
  },
  Owl: {
    type: 'Owl',
    title: 'フクロウ',
    subtitle: '冷静沈着な分析家',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    gradientFrom: 'from-slate-200',
    gradientTo: 'to-slate-400',
    emoji: '🦉',
    imageUrl: 'https://img.freepik.com/free-vector/cute-owl-cartoon-vector-illustration_1308-124446.jpg',
    keywords: ['論理性', '洞察力', '戦略', '静寂'],
    description: 'あなたは夜の森を見渡すフクロウのように、物事の本質を冷静に見抜く力を持っています。',
    bestLearning: ['体系的な理論学習', 'マインドマップの活用', '深い内省'],
    worstLearning: '根拠のない指示や、騒がしい環境',
    dailyMission: '今日得た知識を一つ、論理的に整理して書き留めてみましょう。'
  },
  Elephant: {
    type: 'Elephant',
    title: 'ゾウ',
    subtitle: '確かな記憶と安定感',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-300',
    emoji: '🐘',
    imageUrl: 'https://img.freepik.com/free-vector/cute-elephant-cartoon-vector-illustration_1308-124430.jpg',
    keywords: ['記憶力', '安定', '伝統', '忍耐'],
    description: 'あなたは一度覚えたことを忘れないゾウのように、豊富な知識と経験を活かして着実に歩むタイプです。',
    bestLearning: ['反復学習', '過去の事例研究', '視覚的なストーリー'],
    worstLearning: '急激な変化や、無秩序な環境',
    dailyMission: '過去に学んだ大切なことを一つ思い出し、今の状況に活かしてみましょう。'
  },
  Dolphin: {
    type: 'Dolphin',
    title: 'イルカ',
    subtitle: '調和と共感のメッセンジャー',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    gradientFrom: 'from-emerald-100',
    gradientTo: 'to-emerald-300',
    emoji: '🐬',
    imageUrl: 'https://cdn.pixabay.com/photo/2014/04/03/11/47/dolphin-312111_1280.png',
    keywords: ['共感', '繋がり', '協調', '癒やし'],
    description: 'あなたは海を自由に泳ぐイルカのように、周囲とのコミュニケーションを大切にし、調和を生み出すタイプです。',
    bestLearning: ['ディスカッション', 'ペア学習', '感情を込めた学習'],
    worstLearning: '過度な競争や、冷淡な人間関係',
    dailyMission: '大切な人に感謝のメッセージを一つ送ってみましょう。'
  }
};
