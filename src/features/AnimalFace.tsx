import React from 'react';
import { motion } from 'motion/react';
import { BrainType } from '../entities/codeData';

const CuteEye = ({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) => (
  <motion.g
    animate={{ scaleY: [1, 1, 0.1, 1] }}
    transition={{
      repeat: Infinity,
      duration: 4,
      times: [0, 0.92, 0.96, 1],
      delay: delay
    }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  >
    <circle cx={cx} cy={cy} r="6" fill="#1f2937" />
    <circle cx={cx - 1.5} cy={cy - 2} r="2.5" fill="white" />
    <circle cx={cx + 2} cy={cy + 1.5} r="1.2" fill="white" />
  </motion.g>
);

interface AnimalFaceProps {
  type: BrainType;
  className?: string;
}

export function AnimalFace({ type, className = "" }: AnimalFaceProps) {
  if (type === 'Cheetah') {
    // Cheetah (치타)
    return (
      <motion.svg viewBox="0 0 100 100" className={className} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
        {/* Ears */}
        <circle cx="28" cy="25" r="10" fill="#f59e0b" />
        <circle cx="28" cy="25" r="5" fill="#fef3c7" />
        <circle cx="72" cy="25" r="10" fill="#f59e0b" />
        <circle cx="72" cy="25" r="5" fill="#fef3c7" />

        {/* Head */}
        <circle cx="50" cy="55" r="38" fill="#fbbf24" />

        {/* Cheetah spots */}
        <circle cx="35" cy="35" r="3" fill="#1f2937" />
        <circle cx="65" cy="35" r="3" fill="#1f2937" />
        <circle cx="50" cy="25" r="2.5" fill="#1f2937" />
        <circle cx="20" cy="55" r="2.5" fill="#1f2937" />
        <circle cx="80" cy="55" r="2.5" fill="#1f2937" />

        {/* Tear marks */}
        <path d="M 34 50 Q 34 70 42 75" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 66 50 Q 66 70 58 75" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Snout area */}
        <ellipse cx="50" cy="72" rx="14" ry="10" fill="#fffbeb" />

        {/* Eyes */}
        <CuteEye cx={34} cy={50} />
        <CuteEye cx={66} cy={50} />

        {/* Nose */}
        <path d="M 46 68 L 54 68 L 50 74 Z" fill="#1f2937" />
        
        {/* Cheeks */}
        <circle cx="25" cy="65" r="4" fill="#fca5a5" opacity="0.6" />
        <circle cx="75" cy="65" r="4" fill="#fca5a5" opacity="0.6" />
      </motion.svg>
    );
  }

  if (type === 'Owl') {
    // Owl (올빼미)
    return (
      <motion.svg viewBox="0 0 100 100" className={className} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}>
        {/* Head/Body */}
        <ellipse cx="50" cy="55" rx="40" ry="35" fill="#64748b" />
        
        {/* Ear tufts */}
        <path d="M 20 30 L 30 40 L 15 45 Z" fill="#475569" />
        <path d="M 80 30 L 70 40 L 85 45 Z" fill="#475569" />

        {/* Eye circles */}
        <circle cx="35" cy="50" r="18" fill="#f8fafc" />
        <circle cx="65" cy="50" r="18" fill="#f8fafc" />

        {/* Eyes */}
        <CuteEye cx={35} cy={50} />
        <CuteEye cx={65} cy={50} />

        {/* Beak */}
        <path d="M 46 65 L 54 65 L 50 75 Z" fill="#f59e0b" />

        {/* Cheeks */}
        <circle cx="20" cy="60" r="4" fill="#fca5a5" opacity="0.5" />
        <circle cx="80" cy="60" r="4" fill="#fca5a5" opacity="0.5" />
      </motion.svg>
    );
  }

  if (type === 'Elephant') {
    // Elephant (코끼리)
    return (
      <motion.svg viewBox="0 0 100 100" className={className} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
        {/* Ears */}
        <ellipse cx="20" cy="50" rx="18" ry="25" fill="#818cf8" />
        <ellipse cx="80" cy="50" rx="18" ry="25" fill="#818cf8" />
        <ellipse cx="22" cy="50" rx="12" ry="18" fill="#a5b4fc" />
        <ellipse cx="78" cy="50" rx="12" ry="18" fill="#a5b4fc" />

        {/* Head */}
        <circle cx="50" cy="55" r="35" fill="#6366f1" />

        {/* Trunk */}
        <motion.path 
          d="M 50 65 Q 50 90 65 85" 
          stroke="#6366f1" 
          strokeWidth="12" 
          fill="none" 
          strokeLinecap="round"
          animate={{ d: ["M 50 65 Q 50 90 65 85", "M 50 65 Q 50 90 70 80", "M 50 65 Q 50 90 65 85"] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />

        {/* Eyes */}
        <CuteEye cx={35} cy={50} />
        <CuteEye cx={65} cy={50} />

        {/* Cheeks */}
        <circle cx="28" cy="62" r="6" fill="#fca5a5" opacity="0.6" />
        <circle cx="72" cy="62" r="6" fill="#fca5a5" opacity="0.6" />
      </motion.svg>
    );
  }

  if (type === 'Dolphin') {
    // Dolphin (돌고래)
    return (
      <motion.svg viewBox="0 0 100 100" className={className} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
        {/* Body */}
        <path d="M 10 60 Q 50 20 90 60 Q 50 80 10 60" fill="#10b981" />
        
        {/* Fins */}
        <path d="M 50 35 L 65 15 L 75 40 Z" fill="#059669" />
        <path d="M 20 65 L 5 80 L 25 75 Z" fill="#059669" />

        {/* Underbelly */}
        <path d="M 15 62 Q 50 75 85 62 Q 50 68 15 62" fill="#ecfdf5" />

        {/* Eyes */}
        <CuteEye cx={65} cy={45} />

        {/* Smile */}
        <path d="M 75 52 Q 85 52 88 48" stroke="#064e3b" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Cheeks */}
        <circle cx="55" cy="55" r="4" fill="#fca5a5" opacity="0.6" />
      </motion.svg>
    );
  }

  return null;
}
