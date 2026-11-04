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
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
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

          {/* Column 2: Key Academic Highlights */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
              Why Om Public School?
            </h4>
            <div className="w-12 h-1 bg-[#D32F2F] rounded-full" />
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>English Medium Education</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Qualified & Experienced Teachers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Smart Classes & Modern Teaching</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Special Focus on English Speaking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sports & Cultural Activities</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Safe and Friendly Environment</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <div className="w-12 h-1 bg-[#D32F2F] rounded-full" />
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-amber-300 transition">Home Page</Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-amber-300 transition">About School & Vision</Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-amber-300 transition">Smart Classes & Infrastructure</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-amber-300 transition">Experienced Faculty Team</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition">School Activity Gallery</Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-amber-300 transition font-bold text-rose-300">
                  Admission Enquiry 2027–28
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-300 transition">
                  Staff & Student Academic Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
              Campus Contact
            </h4>
            <div className="w-12 h-1 bg-[#D32F2F] rounded-full" />
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Deedar Colony, Dabra</strong>,<br />
                  District Gwalior (Madhya Pradesh)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="space-x-1 font-bold">
                  <a href="tel:+917999083379" className="hover:text-amber-300">7999083379</a>,
                  <a href="tel:+919516469021" className="hover:text-amber-300"> 9516469021</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@ompublicschool.edu.in" className="hover:text-amber-300">
                  info@ompublicschool.edu.in
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Mon to Sat : 08:00 AM - 02:30 PM<br />Sunday: Closed</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/admissions"
                  className="w-full inline-block text-center py-2 px-4 rounded-xl bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-extrabold text-xs shadow-md transition"
                >
                  Apply Online for 2027–28
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} <strong>Om Public School Dabra</strong> (Gwalior, M.P.). All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-300 font-semibold">Affiliated Standard: Nursery to 8th</span>
            <span>•</span>
            <Link href="/login" className="hover:text-white transition">Institutional Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
