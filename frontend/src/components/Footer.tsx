'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0D2847] text-white pt-0 overflow-hidden">
      {/* 1. Top Puffy Cloud Wavy Border */}
      <div className="w-full overflow-hidden leading-none relative z-10 -mt-1">
        <svg
          className="relative block w-full h-12 sm:h-16 text-[#FCFDFD]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C120,70 240,10 360,50 C480,90 600,20 720,60 C840,100 960,30 1080,70 C1140,90 1180,50 1200,60 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 relative z-10">
        {/* Smiling Cartoon Sun Accent near center-top */}
        <div className="flex justify-center -mt-4 mb-6">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
              {/* Sun Rays */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="50"
                  y1="10"
                  x2="50"
                  y2="20"
                  stroke="#FFD13B"
                  strokeWidth="5"
                  strokeLinecap="round"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
              {/* Sun Face */}
              <circle cx="50" cy="50" r="26" fill="#FFD13B" />
              {/* Cute Smiling Face */}
              <circle cx="42" cy="45" r="3" fill="#B27B00" />
              <circle cx="58" cy="45" r="3" fill="#B27B00" />
              {/* Rosy cheeks */}
              <circle cx="37" cy="52" r="3" fill="#FF9E80" opacity="0.8" />
              <circle cx="63" cy="52" r="3" fill="#FF9E80" opacity="0.8" />
              {/* Smile arc */}
              <path
                d="M42,54 Q50,62 58,54"
                stroke="#B27B00"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* 4 Columns matching Dandelion Kidz exact footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-8">
          {/* Column 1: Brand Logo in White */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                {/* Dandelion Silhouette Icon */}
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center p-2 border border-white/20">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                    <circle cx="50" cy="30" r="8" />
                    <path d="M48 40 L52 40 L54 65 L46 65 Z" />
                    <path d="M46 65 L43 90 L48 90 L50 75 L52 90 L57 90 L54 65 Z" />
                    <line x1="50" y1="30" x2="30" y2="15" stroke="currentColor" strokeWidth="3" />
                    <line x1="50" y1="30" x2="70" y2="15" stroke="currentColor" strokeWidth="3" />
                    <line x1="50" y1="30" x2="50" y2="10" stroke="currentColor" strokeWidth="3" />
                    <circle cx="30" cy="15" r="3" />
                    <circle cx="70" cy="15" r="3" />
                    <circle cx="50" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-black tracking-wider text-white">
                    DANDELION KIDZ
                  </div>
                  <div className="text-[11px] font-medium text-emerald-300 italic tracking-wide">
                    Wings for Future...
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed pr-2">
              Pre School | Day Care | Activity Center. Providing a safe haven where learning occurs effortlessly.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-white tracking-wide">Quick Links</h4>
            {/* Squiggly Underline */}
            <div className="text-amber-400 text-xs font-mono select-none tracking-widest leading-none">
              〰〰〰〰
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-200 pt-1">
              <Link href="/#franchise" className="hover:text-emerald-300 transition">Franchise</Link>
              <Link href="/gallery" className="hover:text-emerald-300 transition">Gallery</Link>
              <Link href="/" className="hover:text-emerald-300 transition">Home</Link>
              <Link href="/facilities" className="hover:text-emerald-300 transition">Facilities</Link>
              <Link href="/academics" className="hover:text-emerald-300 transition">About us</Link>
              <Link href="/admissions" className="hover:text-emerald-300 transition">Contact Us</Link>
              <Link href="/#why-us" className="hover:text-emerald-300 transition col-span-2">
                Why Dandelion Kidz?
              </Link>
            </div>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-white tracking-wide">Get In Touch</h4>
            {/* Squiggly Underline */}
            <div className="text-amber-400 text-xs font-mono select-none tracking-widest leading-none">
              〰〰〰〰
            </div>

            <div className="space-y-2 text-xs text-slate-200 pt-1">
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Monday to Saturday : 08:30 AM - 07:00 PM<br />
                <span className="text-amber-300 font-semibold">Sunday: Close</span>
              </p>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+917417470570" className="hover:text-emerald-300 font-semibold">
                  +91 7417470570
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:info@dandelionkidz.in" className="hover:text-emerald-300">
                  info@dandelionkidz.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Registration */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-white tracking-wide">Registration</h4>
            {/* Squiggly Underline */}
            <div className="text-amber-400 text-xs font-mono select-none tracking-widest leading-none">
              〰〰〰〰
            </div>

            <p className="text-xs text-slate-300 pt-1 leading-relaxed">
              Enrol your child in a Session now
            </p>

            <div className="pt-2">
              <Link
                href="/admissions"
                className="inline-block px-6 py-2.5 bg-[#76A136] hover:bg-[#688f30] text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Start Registration
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Marching Children across Green Grass Illustration */}
      <div className="relative w-full max-w-6xl mx-auto px-4 -mb-2 overflow-hidden">
        <div className="relative w-full h-36 sm:h-44 md:h-52">
          <Image
            src="/images/footer-kids-walking.png"
            alt="Children Walking in Nature at Dandelion Kidz"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* 4. White Puffy Bottom Cloud Border */}
      <div className="w-full overflow-hidden leading-none relative z-10 bg-transparent">
        <svg
          className="relative block w-full h-6 sm:h-8 text-[#FCFDFD]"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 L1200,40 L1200,20 C1080,0 960,30 840,10 C720,30 600,0 480,20 C360,0 240,30 120,10 L0,20 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 5. Copyright sub-bar */}
      <div className="bg-[#FCFDFD] py-3 text-center text-[11px] text-slate-500 font-medium">
        © 2026 Dandelion Kidz Pre-School & Day Care. All rights reserved.
      </div>
    </footer>
  );
}
