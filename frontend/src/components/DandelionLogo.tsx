'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
  variant?: 'light' | 'dark';
}

export default function DandelionLogo({
  className = '',
  showSubtitle = true,
  variant = 'dark',
}: LogoProps) {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Official Emblem */}
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 shrink-0 flex items-center justify-center drop-shadow-sm">
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

      {/* Official Typography */}
      <div className="leading-tight">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap">
          <span
            className={`font-black text-xs sm:text-base md:text-xl tracking-tight block uppercase whitespace-nowrap ${
              isLight ? 'text-white' : 'text-[#0D2056]'
            }`}
          >
            OM PUBLIC <span className="text-[#D32F2F]">SCHOOL</span>
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-[#D32F2F] text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider shadow-xs shrink-0">
            DABRA
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[9px] sm:text-[11px] font-bold tracking-wide block italic font-serif mt-0.2 sm:mt-0.5 whitespace-nowrap ${
              isLight ? 'text-amber-300' : 'text-[#D32F2F]'
            }`}
          >
            Learn... Grow... Achieve...
          </span>
        )}
      </div>
    </div>
  );
}

export { DandelionLogo as OmSchoolLogo };
