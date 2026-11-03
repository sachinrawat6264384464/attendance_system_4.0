'use client';

import React from 'react';

export default function DandelionLogo({ className = 'h-14', showSubtitle = true }: { className?: string; showSubtitle?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Logo Emblem */}
      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
          {/* Stem & Leaves */}
          <path
            d="M50 85 C48 70, 48 55, 50 40"
            stroke="#76A136"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M50 72 C38 68, 28 75, 24 82 C34 84, 44 80, 50 72 Z"
            fill="#76A136"
          />
          <path
            d="M50 65 C62 60, 72 66, 76 74 C66 77, 56 72, 50 65 Z"
            fill="#8CB843"
          />

          {/* Child Silhouette */}
          <circle cx="36" cy="38" r="7" fill="#1B365D" />
          <path
            d="M32 46 C28 52, 28 65, 32 75 C36 75, 42 75, 45 68 C43 60, 40 52, 38 46 Z"
            fill="#1B365D"
          />
          <path
            d="M38 50 C44 46, 48 42, 50 38"
            stroke="#1B365D"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Dandelion Flower Seeds */}
          <circle cx="58" cy="32" r="3.5" fill="#1B365D" />
          <line x1="58" y1="32" x2="68" y2="24" stroke="#76A136" strokeWidth="1.5" />
          <line x1="58" y1="32" x2="72" y2="32" stroke="#76A136" strokeWidth="1.5" />
          <line x1="58" y1="32" x2="66" y2="42" stroke="#76A136" strokeWidth="1.5" />
          <line x1="58" y1="32" x2="52" y2="20" stroke="#76A136" strokeWidth="1.5" />
          <line x1="58" y1="32" x2="58" y2="18" stroke="#76A136" strokeWidth="1.5" />

          {/* Flying seeds */}
          <circle cx="78" cy="20" r="1.5" fill="#1B365D" />
          <line x1="78" y1="20" x2="84" y2="15" stroke="#76A136" strokeWidth="1" />
          <circle cx="86" cy="28" r="1.5" fill="#1B365D" />
          <line x1="86" y1="28" x2="92" y2="25" stroke="#76A136" strokeWidth="1" />
        </svg>
      </div>

      {/* Typography */}
      <div className="leading-tight">
        <span className="font-extrabold text-lg sm:text-xl text-[#1B365D] tracking-tight block uppercase">
          DANDELION <span className="text-[#76A136]">KIDZ</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-[#76A136] font-medium tracking-wider block italic font-serif">
            Wings for Future...
          </span>
        )}
      </div>
    </div>
  );
}

