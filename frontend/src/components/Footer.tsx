'use client';

import Link from 'next/link';
import DandelionLogo from './DandelionLogo';
import { Mail, Phone, MapPin, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-white pt-16 pb-12 border-t border-slate-100 overflow-hidden">
      {/* Decorative Dandelion Background Puffs */}
      <div className="absolute top-4 left-6 opacity-10 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="#76A136" strokeWidth="1">
          <circle cx="50" cy="50" r="4" fill="#76A136" />
          <line x1="50" y1="50" x2="20" y2="20" />
          <line x1="50" y1="50" x2="80" y2="20" />
          <line x1="50" y1="50" x2="20" y2="80" />
          <line x1="50" y1="50" x2="80" y2="80" />
          <line x1="50" y1="50" x2="50" y2="10" />
          <line x1="50" y1="50" x2="10" y2="50" />
          <line x1="50" y1="50" x2="90" y2="50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <DandelionLogo />
            <p className="text-xs text-slate-500 leading-relaxed">
              At Dandelion Kidz, we provide a safe, joyous sanctuary where children explore with curiosity, develop social instincts, and learn effortlessly.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7E8] text-[#76A136] text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              NEP 2020 & NCF 2023 Aligned
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">Early Programs</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/#programs" className="hover:text-[#76A136] transition">Todd Care (1 - 2 Years)</Link></li>
              <li><Link href="/#programs" className="hover:text-[#76A136] transition">Playhouse (2 - 3 Years)</Link></li>
              <li><Link href="/#programs" className="hover:text-[#76A136] transition">Nursery (3 - 4 Years)</Link></li>
              <li><Link href="/#programs" className="hover:text-[#76A136] transition">Junior & Senior KG</Link></li>
              <li><Link href="/#programs" className="hover:text-[#76A136] transition">Day Care & Activity Center</Link></li>
            </ul>
          </div>

          {/* Highlights & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/academics" className="hover:text-[#76A136] transition">Why Dandelion Kidz?</Link></li>
              <li><Link href="/faculty" className="hover:text-[#76A136] transition">Mentors & Caregivers</Link></li>
              <li><Link href="/admissions" className="hover:text-[#76A136] transition">Admission Enquiries</Link></li>
              <li><Link href="/login" className="hover:text-[#76A136] transition">Staff & Parent Portal</Link></li>
            </ul>
          </div>

          {/* Campus Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">Campus Details</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#76A136] shrink-0 mt-0.5" />
                <span>Rajhans Society 3, Opp. Aradhana Tea, Raiya Road, Rajkot - 360007, Gujarat</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#76A136] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#76A136] shrink-0" />
                <span>info@dandelionkidz.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 Dandelion Kidz Pre-School & Academic Platform. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Young Minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
