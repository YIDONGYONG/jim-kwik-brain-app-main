import React from 'react';
import { ResultProfile } from '@/src/entities/codeData';

interface BrainTypeCardProps {
  data: ResultProfile;
  isSelected?: boolean;
  onClick?: () => void;
}

/**
 * 뇌 유형의 특징을 화면에 표시하는 순수 UI 컴포넌트(Presentational)
 * 상태를 가지지 않으며 props로 받은 데이터만 렌더링합니다.
 */
export const BrainTypeCard: React.FC<BrainTypeCardProps> = ({ data, isSelected = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        p-6 rounded-2xl cursor-pointer transition-all duration-200 border-2 flex flex-col h-full
        ${isSelected ? 'border-gray-900 shadow-md transform scale-[1.02]' : 'border-transparent shadow-sm hover:shadow-md hover:scale-[1.01]'}
        ${data.bgColor}
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`text-xl font-bold ${data.color}`}>{data.emoji} {data.type}</span>
        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">
          {data.type}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
        {data.title}
      </h3>
      
      <p className="text-sm text-gray-700 leading-relaxed mb-4 break-keep">
        {data.subtitle}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {data.keywords.map((keyword, index) => (
          <span 
            key={index}
            className="px-2 py-1 text-xs font-semibold bg-white/60 text-gray-800 rounded-md"
          >
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  );
};
