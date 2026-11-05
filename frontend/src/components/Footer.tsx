'use client';

import React from 'react';
import Link from 'next/link';
import DandelionLogo from './DandelionLogo';

export default function Footer() {
  return (
    <footer className="relative bg-[#091538] text-white pt-10 pb-8 overflow-hidden border-t-4 border-[#D32F2F]">
      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="footer-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1.5" fill="#FFFFFF" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Columns: Paired 2-by-2 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          {/* Column 1: School Identity (Desktop 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <DandelionLogo variant="light" />
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Om Public School Dabra</strong> is dedicated to delivering English Medium education from Playgroup (PG) to 8th standard, fostering academic excellence, moral values, and all-round student development.
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold">
              <span>Session 2027–28 Admissions Open</span>
            </div>
          </div>

          {/* Middle Group: Paired 2-by-2 on mobile (Desktop 5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
            {/* Column 2: Key Academic Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider">
                Why Choose Us?
              </h4>
              <div className="w-10 sm:w-12 h-1 bg-[#D32F2F] rounded-full" />
              <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>English Medium Education</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>Expert Faculty Team</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>Interactive Smart Classes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>English Speaking Focus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>Sports & Cultural Arts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F] shrink-0" />
                  <span>Safe & Caring Campus</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider">
                Quick Links
              </h4>
              <div className="w-10 sm:w-12 h-1 bg-[#D32F2F] rounded-full" />
              <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-300">
                <li>
                  <Link href="/" className="hover:text-amber-300 transition">Home Page</Link>
                </li>
                <li>
                  <Link href="/academics" className="hover:text-amber-300 transition">About School</Link>
                </li>
                <li>
                  <Link href="/facilities" className="hover:text-amber-300 transition">Facilities</Link>
                </li>
                <li>
                  <Link href="/faculty" className="hover:text-amber-300 transition">Faculty Team</Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-amber-300 transition">Photo Gallery</Link>
                </li>
                <li>
                  <Link href="/admissions" className="hover:text-amber-300 transition font-bold text-rose-300">
                    Apply Online
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-amber-300 transition">
                    Portal Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Official Contact & Address (Desktop 3 cols) - Clean, No Icons */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider">
              Campus Contact
            </h4>
            <div className="w-10 sm:w-12 h-1 bg-[#D32F2F] rounded-full" />
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 text-xs text-slate-300">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">Campus Location</span>
                <span className="leading-relaxed text-[11px] sm:text-xs">
                  <strong>Deedar Colony</strong>,<br />
                  Dabra, Dist. Gwalior (M.P.)
                </span>
              </div>

              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">School Hours</span>
                <span className="text-[11px] sm:text-xs">
                  Mon – Sat: 8:00 AM – 2:30 PM
                </span>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-0.5">Helpline Phone</span>
                <div className="text-[11px] sm:text-xs">
                  <a href="tel:+917999083379" className="hover:text-amber-300 font-bold">7999083379</a>,{' '}
                  <a href="tel:+919516469021" className="hover:text-amber-300 font-bold">9516469021</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grand School Name in Majestic Red & Chrome Silver Typography */}
        <div className="pt-10 pb-6 my-4 border-t border-white/10 text-center select-none">
          <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight sm:tracking-wider leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5252] via-[#D32F2F] to-[#b71c1c] drop-shadow-[0_2px_14px_rgba(211,47,47,0.6)]">
              OM PUBLIC SCHOOL
            </span>{' '}
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-300 drop-shadow-[0_2px_14px_rgba(255,255,255,0.4)]">
              DABRA
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 pt-3 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-slate-300">
            <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#D32F2F] to-transparent" />
            <span className="text-slate-300 font-extrabold">Learn • Grow • Achieve</span>
            <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
        </div>

        {/* Bottom Copyright & Credit Line with User Name */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <strong>Om Public School, Dabra</strong>. All Rights Reserved.
          </div>
          <div className="text-slate-300 font-medium text-center sm:text-right">
            Designed &amp; Developed by <strong className="text-white font-extrabold hover:text-amber-300 transition">Sachin Rawat</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
