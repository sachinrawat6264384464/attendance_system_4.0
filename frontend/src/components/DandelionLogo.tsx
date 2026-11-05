'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
}

export default function DandelionLogo({
  className = '',
  variant = 'dark',
}: LogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Official Emblem */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0 flex items-center justify-center drop-shadow-xs">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Outer Golden Sunburst Ring */}
          <circle cx="60" cy="60" r="56" fill="#FBC02D" stroke="#D32F2F" strokeWidth="3" />
          
          {/* Deep Royal Blue Circle */}
          <circle cx="60" cy="60" r="48" fill="#0D2056" />

          {/* Golden Inner Ring */}
          <circle cx="60" cy="60" r="42" fill="none" stroke="#FFD600" strokeWidth="2" strokeDasharray="3 3" />

          {/* Central Sacred 'Om' ॐ Symbol in Gold */}
          <text
            x="60"
            y="56"
            textAnchor="middle"
            fontSize="30"
            fontWeight="bold"
            fill="#FFD600"
            fontFamily="Arial, sans-serif"
          >
            ॐ
          </text>

          {/* Open Academic Book Base in White & Gold */}
          <path
            d="M 38,70 Q 60,65 60,78 Q 60,65 82,70 L 82,82 Q 60,76 60,86 Q 60,76 38,82 Z"
            fill="#FFFFFF"
            stroke="#D32F2F"
            strokeWidth="1.5"
          />
          <line x1="60" y1="78" x2="60" y2="86" stroke="#0D2056" strokeWidth="1.5" />

          {/* Stars */}
          <circle cx="32" cy="60" r="2" fill="#FFD600" />
          <circle cx="88" cy="60" r="2" fill="#FFD600" />
        </svg>
      </div>

      {/* Official Typography placed cleanly under the logo emblem */}
      <div className="mt-1 leading-none">
        <span
          className={`font-black text-[10px] sm:text-xs md:text-sm tracking-tight block uppercase whitespace-nowrap ${
            isLight ? 'text-white' : 'text-[#0D2056]'
          }`}
        >
          OM PUBLIC <span className="text-[#D32F2F]">SCHOOL</span>
        </span>
      </div>
    </div>
  );
}

export { DandelionLogo as OmSchoolLogo };
