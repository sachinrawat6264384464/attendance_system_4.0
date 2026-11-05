'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
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
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>English Medium</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Expert Teachers</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Smart Classes</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>English Speaking</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Sports & Games</span>
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Safe Campus</span>
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

          {/* Column 4: Official Contact & Address (Desktop 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider">
              Campus Contact
            </h4>
            <div className="w-10 sm:w-12 h-1 bg-[#D32F2F] rounded-full" />
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px] sm:text-xs">
                  <strong>Deedar Colony</strong>,<br />
                  Dabra, Dist. Gwalior (M.P.)
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] sm:text-xs">
                  Mon – Sat: 8 AM – 2:30 PM
                </span>
              </div>

              <div className="col-span-2 lg:col-span-1 flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[11px] sm:text-xs">
                  <a href="tel:+917999083379" className="hover:text-amber-300 font-bold">7999083379</a>,{' '}
                  <a href="tel:+919516469021" className="hover:text-amber-300 font-bold">9516469021</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Verification Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} <strong>Om Public School, Dabra</strong>. All Rights Reserved.
          </div>
          <div className="text-slate-400 flex items-center gap-2">
            <span>English Medium (PG to 8th)</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">Dabra (Gwalior, M.P.)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
