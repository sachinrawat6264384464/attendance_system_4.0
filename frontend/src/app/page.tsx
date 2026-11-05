'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import CampusScrollShowcase from '@/components/CampusScrollShowcase';
import AcademicWingsSection from '@/components/AcademicWingsSection';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Phone,
  MapPin,
  CheckCircle2,
  BookOpen,
  Award,
  ShieldCheck,
  Users,
  Compass,
  Trophy,
  Clock,
  Camera,
  Eye,
  X,
  Palette,
  ExternalLink,
} from 'lucide-react';

export default function HomePage() {
  const whyChoosePoints = [
    {
      title: 'English Medium Education',
      description: 'Comprehensive English medium curriculum focusing on strong foundational literacy, numeracy, and fluent communication.',
      icon: BookOpen,
    },
    {
      title: 'Qualified & Experienced Teachers',
      description: 'Dedicated faculty committed to patient mentorship, conceptual clarity, and personal attention for every learner.',
      icon: Users,
    },
    {
      title: 'Smart Classes & Modern Teaching',
      description: 'Interactive audio-visual smart classroom technology making complex concepts easy, engaging, and memorable.',
      icon: Sparkles,
    },
    {
      title: 'Special Focus on English Speaking',
      description: 'Daily phonics, conversation drills, storytelling, and public speaking clubs to build lifelong confidence in English.',
      icon: Compass,
    },
    {
      title: 'Sports & Cultural Activities',
      description: 'Robust sports programs, annual sports day, dance, drama, art, and music nurturing both physical stamina and creative expression.',
      icon: Trophy,
    },
    {
      title: 'Discipline & Moral Values',
      description: 'Inculcating Indian cultural ethos, mutual respect, civic sense, and ethical integrity as core building blocks of character.',
      icon: Award,
    },
    {
      title: 'Safe and Friendly Environment',
      description: 'CCTV monitored campus, child-safe infrastructure, loving caretakers, and high sanitation standards providing complete peace of mind.',
      icon: ShieldCheck,
    },
    {
      title: 'Quality Education for a Better Tomorrow',
      description: 'Holistic growth from Playgroup to 8th class, empowering students to lead, innovate, and succeed in higher secondary pursuits.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-sans overflow-x-hidden">
      <Navbar />

      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="relative overflow-hidden pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-14">
        {/* Full-Width and Full-Height HD Background Campus Image */}
        {/* NO heavy blue blur or dark blue overlay! Clean, bright, vivid real school campus */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/om-hero-campus-hd.jpg"
            alt="Om Public School Dabra Campus Exterior"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full brightness-[1.02] contrast-[1.03]"
          />
          {/* Subtle neutral scrim: preserves crisp colors of building while ensuring white text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content: School Identity & Information (7 Cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              {/* Institution Excellence Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[#FFD600] text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD600] shrink-0" />
                <span>Premier English Medium Institution • Deedar Colony, Dabra</span>
              </div>

              {/* Main Heading */}
              <div>
                <span className="text-[11px] sm:text-sm md:text-base font-extrabold text-[#FFD600] tracking-widest uppercase block mb-1 drop-shadow-sm">
                  Learn... Grow... Achieve...
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
                  OM PUBLIC <span className="text-[#FF5252]">SCHOOL</span>
                  <span className="inline-block ml-2 sm:ml-3 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-[#D32F2F] text-[#FFD600] rounded-xl sm:rounded-2xl text-lg sm:text-2xl font-black uppercase shadow-lg align-middle border border-white/20">
                    DABRA
                  </span>
                </h1>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-xl font-bold text-slate-100 italic drop-shadow-sm">
                  &ldquo;Quality Education for a Better Tomorrow&rdquo;
                </p>
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-sm font-medium">
                Welcome to <strong className="text-white">Om Public School, Dabra (District Gwalior, M.P.)</strong>. We provide holistic, child-centric English Medium schooling from <strong className="text-[#FFD600]">Playgroup (PG) to 8th Standard</strong>, empowering children with interactive smart classroom learning, strong English speaking confidence, and noble moral values.
              </p>

              {/* Highlight Stats Box (Paired 2-by-2 on mobile) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 max-w-xl mx-auto lg:mx-0">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-wide">Classes</div>
                  <div className="text-xs sm:text-base font-black text-[#FFD600]">PG to 8th</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-wide">Medium</div>
                  <div className="text-xs sm:text-base font-black text-white">English Medium</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-wide">Smart Classes</div>
                  <div className="text-xs sm:text-base font-black text-emerald-300">Audio-Visual</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-center shadow-xs">
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-wide">Campus Focus</div>
                  <div className="text-xs sm:text-base font-black text-amber-300">Values & Sports</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-2">
                <Link
                  href="/academics"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  <span>Explore Academics</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/gallery"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/20 hover:bg-white/30 text-white border border-white/40 font-extrabold text-xs sm:text-sm rounded-full backdrop-blur-md transition flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-amber-300" />
                  <span>Campus Photos</span>
                </Link>

                <a
                  href="tel:+917999083379"
                  className="px-4 sm:px-5 py-3 sm:py-3.5 bg-white hover:bg-slate-100 text-[#0D2056] font-extrabold text-xs sm:text-sm rounded-full shadow-md transition flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#D32F2F]" />
                  <span>7999083379</span>
                </a>
              </div>

              {/* Campus Address quick indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[10px] sm:text-xs text-slate-200 pt-1 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#FF5252] shrink-0" />
                <span>Deedar Colony, Dabra, Dist. Gwalior (M.P.) • Contact: 7999083379, 9516469021</span>
              </div>
            </div>

            {/* Right Real Campus Photo (5 Cols) - Border none, no text, filling the box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full max-w-lg rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group border-0">
                <Image
                  src="/images/om-smart-classroom.jpg"
                  alt="Om Public School Dabra Smart Digital Classroom"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. WHY CHOOSE OM PUBLIC SCHOOL? (Paired 2-by-2 on mobile) ---------------- */}
      <section id="why-us" className="py-12 sm:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-black text-[10px] sm:text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5 text-black" />
              <span>Official Institutional Features</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight">
              Why Choose <span className="text-[#D32F2F]">Om Public School?</span>
            </h2>
            <p className="text-xs sm:text-base text-black font-medium">
              We provide a disciplined, nurturing, and modern English medium learning environment that lays a solid foundation for your child&apos;s lifelong success.
            </p>
          </div>

          {/* 8 Feature Cards Grid (Paired 2-by-2 on mobile: grid-cols-2 lg:grid-cols-4) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
            {whyChoosePoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border-2 border-slate-300 hover:border-black shadow-xs hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2 sm:space-y-3">
                    <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-[12px] sm:text-base font-black text-black leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-black font-medium leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 sm:pt-4 mt-2 sm:mt-3 border-t border-slate-200 flex items-center gap-1 sm:gap-1.5 text-black text-[9px] sm:text-xs font-black">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>Verified Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 3. ACADEMIC WINGS (PG TO 8TH) (Scroll Slide from Left & Right) ---------------- */}
      <AcademicWingsSection />

      {/* ---------------- NEW SECTION: CAMPUS INFRASTRUCTURE & PHOTO SHOWCASE ---------------- */}
      {/* 6 to 7 HD Images in Diverse Structural Shapes and Creative Masonry / Bento Layout */}
      <section className="py-14 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-[#0D2056] text-[10px] sm:text-xs font-black uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-[#D32F2F]" />
              <span>Campus Life & Infrastructure Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#0D2056] tracking-tight">
              Modern Campus <span className="text-[#D32F2F]">Highlights</span>
            </h2>
            <p className="text-xs sm:text-base text-slate-600 font-medium">
              Take an interactive visual tour of our modern learning spaces, specialized science and computer laboratories, expansive sports grounds, and vibrant stage arts.
            </p>
          </div>

          {/* Scroll-Driven Dynamic Showcase: Emerge from left/right in dark form, illuminating to clean in center */}
          <CampusScrollShowcase />

          {/* Bottom Action: Direct Link to Complete Gallery */}
          <div className="mt-10 sm:mt-14 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0D2056] hover:bg-[#D32F2F] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            >
              <Camera className="w-4 h-4 text-amber-300" />
              <span>Explore Complete Campus Photo Gallery (8+ Photos)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 4. ADMISSION OPEN 2027-28 CALLOUT BANNER ---------------- */}
      <section className="py-12 sm:py-16 bg-[#0D2056] text-white relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border-8 border-white/5 pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-8 border-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-[#D32F2F] via-[#b71c1c] to-[#0D2056] rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl border-4 border-amber-300 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
              <span className="px-3 py-1 rounded-full bg-[#FFD600] text-[#0D2056] text-[10px] sm:text-xs font-black uppercase tracking-wider inline-block shadow-xs">
                Limited Seats Available!
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                ADMISSION OPEN <span className="text-[#FFD600]">SESSION 2027–28</span>
              </h2>
              <p className="text-xs sm:text-base text-white/90 max-w-xl font-medium">
                Enroll your child today at <strong>Om Public School, Dabra</strong>. Secure a bright, disciplined, and successful future with our smart classrooms and caring teachers.
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-amber-200">
                <span>✓ Classes: PG to 8th</span>
                <span>•</span>
                <span>✓ English Medium</span>
                <span>•</span>
                <span>✓ Deedar Colony, Dabra</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <Link
                href="/admissions"
                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FFD600] hover:bg-[#ffca28] text-[#0D2056] font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-xl transition transform hover:scale-105"
              >
                Apply Online Now
              </Link>
              <a
                href="tel:+917999083379"
                className="w-full sm:w-auto text-center px-5 sm:px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 font-bold text-xs uppercase tracking-wider rounded-full transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#FFD600]" />
                <span>Call: 7999083379</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. CAMPUS LOCATION & CONTACT (Paired 2-by-2 on mobile) ---------------- */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Campus Details Cards: Paired on mobile */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs font-black text-[#D32F2F] uppercase tracking-wider">
                  Visit Our Campus
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0D2056] tracking-tight mt-1">
                  Om Public School, Dabra
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                  We welcome parents and guardians to visit our school campus, meet our leadership team, and witness our modern smart classrooms firsthand.
                </p>
              </div>

              {/* 3 Info Cards: Paired 2-by-2 on mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-4">
                <div className="col-span-2 lg:col-span-1 flex items-start gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-100 text-[#D32F2F] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Official Address</h4>
                    <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Deedar Colony, Dabra, District Gwalior (Madhya Pradesh)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 text-[#0D2056] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Phone Contacts</h4>
                    <p className="text-[10px] sm:text-xs text-slate-700 font-bold mt-0.5">
                      <a href="tel:+917999083379" className="hover:text-[#D32F2F]">7999083379</a>
                    </p>
                    <p className="text-[9px] sm:text-[11px] text-slate-500 mt-0.5">9516469021</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">Office Timings</h4>
                    <p className="text-[10px] sm:text-xs text-slate-600 mt-0.5">
                      Mon – Sat: 8:00 AM – 2:30 PM
                    </p>
                    <p className="text-[9px] sm:text-[11px] text-rose-500 font-bold mt-0.5">Sunday Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Admission Enquiry Form */}
            <div className="bg-[#EEF4FF] p-5 sm:p-8 rounded-3xl border-2 border-blue-200 shadow-lg space-y-4 sm:space-y-5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#0D2056]">Online Admission Enquiry</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1">
                  Fill in your details and our admission counselor will call you back promptly.
                </p>
              </div>

              <form action="/admissions" method="GET" className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-700 uppercase mb-1">Parent&apos;s Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter parent or guardian full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-[#0D2056] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-700 uppercase mb-1">Mobile Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7999083379"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-[#0D2056] focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-700 uppercase mb-1">Seeking Class *</label>
                    <select
                      className="w-full px-2.5 sm:px-3 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-[#0D2056] focus:outline-hidden"
                    >
                      <option>Playgroup (PG)</option>
                      <option>Nursery</option>
                      <option>LKG</option>
                      <option>UKG</option>
                      <option>Class 1st</option>
                      <option>Class 2nd</option>
                      <option>Class 3rd</option>
                      <option>Class 4th</option>
                      <option>Class 5th</option>
                      <option>Class 6th</option>
                      <option>Class 7th</option>
                      <option>Class 8th</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-slate-700 uppercase mb-1">Academic Session</label>
                    <input
                      type="text"
                      readOnly
                      value="2027–28"
                      className="w-full px-2.5 sm:px-3 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-700 font-bold text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition"
                >
                  Proceed to Full Admission Application →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </div>
  );
}
