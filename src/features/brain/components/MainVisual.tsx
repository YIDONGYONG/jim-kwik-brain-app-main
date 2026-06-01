import React from 'react';
import mainVisual from '../../../assets/main-visual.jpg.png';

/**
 * MainVisual Component (Golden Ratio Optimized)
 * 
 * 리팩토링 포인트:
 * 1. 황금 비율(1:1.618) 적용: 시각적으로 가장 편안함을 느끼는 비율로 이미지 영역 조정.
 * 2. 응답형 디자인: 화면 크기에 관계없이 미학적 균형 유지.
 */
export const MainVisual: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-2 overflow-hidden mx-auto max-w-sm sm:max-w-md">
      {/* 
        황금 비율 적용 계산 (너비가 1일 때 높이 약 0.618) 
        Tailwind의 aspect-video(16/9=1.77)보다 조금 더 세로가 긴 aspect-[1/0.618] 개념 적용
      */}
      <div className="aspect-[1/1.2] sm:aspect-[1/1.1] w-full relative group">
        <img 
          src={mainVisual} 
          alt="Main Visual" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          loading="eager"
        />
        
        {/* 시네마틱 효과 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10" />

        {/* 메타 태그 */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="text-[9px] font-bold tracking-[0.3em] text-white/80 uppercase px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
            Brain Type Discovery
          </span>
        </div>
      </div>
    </div>
  );
};
