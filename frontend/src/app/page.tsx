'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
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
  Smile,
  CalendarCheck,
  Clock,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  const whyChoosePoints = [
    {
      title: 'English Medium Education',
      description: 'Comprehensive English medium curriculum focusing on strong foundational literacy, numeracy, and fluent communication.',
      icon: BookOpen,
      color: 'bg-blue-600',
      lightBg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      title: 'Qualified & Experienced Teachers',
      description: 'Dedicated faculty committed to patient mentorship, conceptual clarity, and personal attention for every learner.',
      icon: Users,
      color: 'bg-emerald-600',
      lightBg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      title: 'Smart Classes & Modern Teaching',
      description: 'Interactive audio-visual smart classroom technology making complex concepts easy, engaging, and memorable.',
      icon: Sparkles,
      color: 'bg-purple-600',
      lightBg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      title: 'Special Focus on English Speaking',
      description: 'Daily phonics, conversation drills, storytelling, and public speaking clubs to build lifelong confidence in English.',
      icon: Compass,
      color: 'bg-amber-600',
      lightBg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      title: 'Sports & Cultural Activities',
      description: 'Robust sports programs, annual sports day, dance, drama, art, and music nurturing both physical stamina and creative expression.',
      icon: Trophy,
      color: 'bg-rose-600',
      lightBg: 'bg-rose-50',
      border: 'border-rose-200',
    },
    {
      title: 'Discipline & Moral Values',
      description: 'Inculcating Indian cultural ethos, mutual respect, civic sense, and ethical integrity as core building blocks of character.',
      icon: Award,
      color: 'bg-indigo-600',
      lightBg: 'bg-indigo-50',
      border: 'border-indigo-200',
    },
    {
      title: 'Safe and Friendly Environment',
      description: 'CCTV monitored campus, child-safe infrastructure, loving caretakers, and high sanitation standards providing complete peace of mind.',
      icon: ShieldCheck,
      color: 'bg-teal-600',
      lightBg: 'bg-teal-50',
      border: 'border-teal-200',
    },
    {
      title: 'Quality Education for a Better Tomorrow',
      description: 'Holistic growth from Playgroup to 8th class, empowering students to lead, innovate, and succeed in higher secondary pursuits.',
      icon: GraduationCap,
      color: 'bg-[#D32F2F]',
      lightBg: 'bg-red-50',
      border: 'border-red-200',
    },
  ];

  const classWings = [
    {
      wing: 'Pre-Primary Wing',
      badge: 'Early Childhood Care',
      classes: 'PG, Nursery, LKG, UKG',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      features: ['Sensory Play & Phonics', 'Motor Skill Development', 'Rhymes & Storytelling', 'Nurturing Playrooms'],
    },
    {
      wing: 'Primary Wing',
      badge: 'Foundational Stage',
      classes: 'Class 1st to 5th',
      color: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      features: ['Mathematical Logic', 'Environmental Science', 'Hindi & English Grammar', 'Smart Classroom Learning'],
    },
    {
      wing: 'Middle Wing',
      badge: 'Preparatory & Experiential',
      classes: 'Class 6th to 8th',
      color: 'from-emerald-600 to-teal-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      features: ['Science Lab & Computers', 'Analytical Problem Solving', 'Social Sciences & Civics', 'Sports & Leadership'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-sans">
      <Navbar />

      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center overflow-hidden py-16 sm:py-20">
        {/* Full-Width HD Background Campus Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/om-hero-campus-hd.jpg"
            alt="Om Public School Dabra Campus"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Deep Royal Multi-Stop Gradient Overlay for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071333]/98 via-[#0D2056]/90 to-[#0D2056]/65 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#0D2056]/40 to-[#071333]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge strip */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD600] text-xs font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-4 h-4 text-[#FFD600] animate-spin-slow" />
                <span>Admission Open • Session 2027–28 • Limited Seats</span>
              </div>

              {/* Main Heading */}
              <div>
                <span className="text-sm sm:text-base font-extrabold text-[#FFD600] tracking-widest uppercase block mb-1">
                  Learn... Grow... Achieve...
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  OM PUBLIC <span className="text-[#FF5252]">SCHOOL</span>
                  <span className="inline-block ml-3 px-3.5 py-1 bg-[#D32F2F] text-[#FFD600] rounded-2xl text-2xl sm:text-3xl font-black uppercase shadow-lg align-middle transform -rotate-1 border border-white/20">
                    DABRA
                  </span>
                </h1>
                <p className="mt-3 text-lg sm:text-xl font-bold text-slate-200 italic">
                  &ldquo;Quality Education for a Better Tomorrow&rdquo;
                </p>
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Welcome to <strong className="text-white">Om Public School, Dabra (District Gwalior, M.P.)</strong>. We provide holistic, English Medium education from <strong className="text-[#FFD600]">Playgroup (PG) to 8th Standard</strong>, empowering children with academic excellence, strong communication skills, and noble moral values.
              </p>

              {/* Highlight Glass Stats Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 max-w-lg mx-auto lg:mx-0">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-sm">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Classes</div>
                  <div className="text-base font-black text-[#FFD600]">PG to 8th</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-sm">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Medium</div>
                  <div className="text-base font-black text-white">English Medium</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-sm col-span-2 sm:col-span-1">
                  <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">Curriculum</div>
                  <div className="text-base font-black text-emerald-300">Modern & Value-Based</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/admissions"
                  className="px-8 py-4 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-black text-sm uppercase tracking-wider rounded-full shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="tel:+917999083379"
                  className="px-7 py-4 bg-white hover:bg-slate-100 text-[#0D2056] font-extrabold text-sm rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#D32F2F]" />
                  <span>Call: 7999083379</span>
                </a>

                <Link
                  href="/login"
                  className="px-6 py-4 bg-[#FFD600] hover:bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition"
                >
                  Portal Login
                </Link>
              </div>

              {/* Campus Address quick indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-300 pt-1 font-semibold">
                <MapPin className="w-4 h-4 text-[#FF5252] shrink-0" />
                <span>Deedar Colony, Dabra, District Gwalior (M.P.) • Contact: 7999083379, 9516469021</span>
              </div>
            </div>

            {/* Right Poster Graphic (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white/10 backdrop-blur-md p-3 rounded-3xl shadow-2xl border-4 border-[#FFD600]/80 overflow-hidden group">
                {/* Poster Frame */}
                <div className="relative aspect-[975/1024] w-full rounded-2xl overflow-hidden bg-white">
                  <Image
                    src="/images/om-public-school-poster.jpg"
                    alt="Om Public School Dabra Official Admission Banner Session 2027-28"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-contain transform group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Floating Admission Badge */}
                <div className="absolute top-6 right-6 bg-[#D32F2F] text-[#FFD600] px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider shadow-xl border-2 border-white animate-bounce">
                  Limited Seats!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. WHY CHOOSE OM PUBLIC SCHOOL? ---------------- */}
      <section id="why-us" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Official Institutional Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0D2056] tracking-tight">
              Why Choose <span className="text-[#D32F2F]">Om Public School?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              We provide a disciplined, nurturing, and modern English medium learning environment that lays a solid foundation for your child&apos;s lifelong success.
            </p>
          </div>

          {/* 8 Feature Cards Grid (Paired 2-by-2 on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
            {whyChoosePoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-3.5 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl border-2 ${item.border} ${item.lightBg} hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between`}
                >
                  <div className="space-y-2 sm:space-y-4">
                    <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${item.color} text-white flex items-center justify-center shadow-xs sm:shadow-md`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="text-xs sm:text-base font-black text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-2 sm:pt-4 flex items-center gap-1 sm:gap-1.5 text-[#0D2056] text-[10px] sm:text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                    <span>Verified Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 3. ACADEMIC WINGS (PG TO 8TH) ---------------- */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F8FAFC] to-[#EEF4FF] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black text-[#D32F2F] uppercase tracking-wider">
              Comprehensive Schooling Structure
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2056] tracking-tight">
              Academic Wings: <span className="text-[#D32F2F]">Classes PG to 8th</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Age-appropriate pedagogy designed to spark curiosity, build mastery, and instill confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classWings.map((wing, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-7 border-2 ${wing.borderColor} shadow-md hover:shadow-xl transition`}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px] uppercase tracking-wider mb-3">
                  {wing.badge}
                </div>
                <h3 className="text-xl font-black text-[#0D2056]">{wing.wing}</h3>
                <div className="text-lg font-black text-[#D32F2F] mt-1 mb-4">
                  {wing.classes}
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  {wing.features.map((feat, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <Link
                    href="/admissions"
                    className="w-full inline-block text-center py-2.5 px-4 rounded-xl bg-[#0D2056] hover:bg-[#D32F2F] text-white font-bold text-xs uppercase tracking-wider transition"
                  >
                    Enquire for {wing.wing}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. ADMISSION OPEN 2027-28 CALLOUT BANNER ---------------- */}
      <section className="py-16 bg-[#0D2056] text-white relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border-8 border-white/5 pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-8 border-white/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-[#D32F2F] via-[#b71c1c] to-[#0D2056] rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-amber-300 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="px-3.5 py-1 rounded-full bg-[#FFD600] text-[#0D2056] text-xs font-black uppercase tracking-wider inline-block">
                Limited Seats Available!
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                ADMISSION OPEN <span className="text-[#FFD600]">SESSION 2027–28</span>
              </h2>
              <p className="text-sm sm:text-base text-white/90 max-w-xl font-medium">
                Enroll your child today at <strong>Om Public School, Dabra</strong>. Secure a bright, disciplined, and successful future with our smart classrooms and caring teachers.
              </p>
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-amber-200">
                <span>✓ Classes: PG to 8th</span>
                <span>•</span>
                <span>✓ English Medium</span>
                <span>•</span>
                <span>✓ Deedar Colony, Dabra</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/admissions"
                className="px-8 py-4 bg-[#FFD600] hover:bg-[#ffca28] text-[#0D2056] font-black text-sm uppercase tracking-wider rounded-full shadow-xl transition transform hover:scale-105"
              >
                Apply Online Now
              </Link>
              <a
                href="tel:+917999083379"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 font-bold text-xs uppercase tracking-wider rounded-full transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#FFD600]" />
                <span>Call: 7999083379</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 5. CAMPUS LOCATION & CONTACT ---------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Campus Details Card */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-black text-[#D32F2F] uppercase tracking-wider">
                  Visit Our Campus
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0D2056] tracking-tight mt-1">
                  Om Public School, Dabra
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  We welcome parents and guardians to visit our school campus, meet our leadership team, and witness our modern smart classrooms firsthand.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#D32F2F] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Official Address</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Deedar Colony, Dabra, District Gwalior (Madhya Pradesh)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0D2056] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">Admissions Contact Numbers</h4>
                    <p className="text-xs text-slate-700 font-bold mt-0.5">
                      <a href="tel:+917999083379" className="hover:text-[#D32F2F]">7999083379</a>,{' '}
                      <a href="tel:+919516469021" className="hover:text-[#D32F2F]">9516469021</a>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Available Monday to Saturday: 8:00 AM – 2:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">School Office Timings</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monday to Saturday : 08:00 AM to 02:30 PM (Sunday Closed)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Admission Enquiry Form */}
            <div className="bg-[#EEF4FF] p-8 rounded-3xl border-2 border-blue-200 shadow-lg space-y-5">
              <div>
                <h3 className="text-xl font-black text-[#0D2056]">Online Admission Enquiry</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Fill in your details and our admission counselor will call you back promptly.
                </p>
              </div>

              <form action="/admissions" method="GET" className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parent&apos;s Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter parent or guardian full name"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-[#0D2056] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 7999083379"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-[#0D2056] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Seeking Class *</label>
                    <select
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-xs focus:border-[#0D2056] focus:outline-none"
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
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Academic Session</label>
                    <input
                      type="text"
                      readOnly
                      value="2027–28"
                      className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-100 text-slate-700 font-bold text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition"
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
