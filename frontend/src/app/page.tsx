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
  ChevronLeft,
  ChevronRight,
  Heart,
  Rocket,
  Compass,
  Smile,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: '/images/hero-playroom.jpg',
      title: 'Vibrant Play & Sensory Learning Sanctuary',
      subtitle: 'Nurturing curiosity through experiential play, puppet theatre, and sensory corners.',
    },
    {
      image: '/images/welcome-entrance.jpg',
      title: 'A Safe Haven Where Learning Occurs Effortlessly',
      subtitle: 'Where every child is celebrated, building trust, independence, and joy.',
    },
  ];

  const programs = [
    {
      id: 'todd-care',
      title: 'Todd Care',
      age: '1 to 2 years',
      duration: '2 Hours',
      color: '#1B365D',
      bgCard: 'bg-[#EBF3FA]',
      dotColor: 'bg-[#1B365D]',
      image: '/images/hero-playroom.jpg',
      description:
        'A nurturing space where toddlers ease into early separation, build trust, and explore the world around them through their senses.',
    },
    {
      id: 'playhouse',
      title: 'Playhouse',
      age: '2 to 3 years',
      duration: '3 Hours',
      color: '#76A136',
      bgCard: 'bg-[#F0F7E8]',
      dotColor: 'bg-[#76A136]',
      image: '/images/welcome-entrance.jpg',
      description:
        'A transition space from toddler to preschooler, focused on self-expression, imagination, and early independence.',
    },
    {
      id: 'nursery',
      title: 'Nursery',
      age: '3 to 4 years',
      duration: '3 Hours',
      color: '#E87722',
      bgCard: 'bg-[#FDF1E6]',
      dotColor: 'bg-[#E87722]',
      image: '/images/hero-playroom.jpg',
      description:
        'A foundation year focusing on conceptual understanding, creativity, language development, and cognitive exploration.',
    },
    {
      id: 'jr-kg',
      title: 'Jr. Kg.',
      age: '4 to 5 years',
      duration: '3.5 Hours',
      color: '#E91E63',
      bgCard: 'bg-[#FCE8EF]',
      dotColor: 'bg-[#E91E63]',
      image: '/images/welcome-entrance.jpg',
      description:
        'Cultivating early literacy, mathematical reasoning, social bonding, and self-confidence through structured play.',
    },
    {
      id: 'sr-kg',
      title: 'Sr. Kg.',
      age: '5 to 6 years',
      duration: '3.5 Hours',
      color: '#2A7B9B',
      bgCard: 'bg-[#EAF4F7]',
      dotColor: 'bg-[#2A7B9B]',
      image: '/images/hero-playroom.jpg',
      description:
        'Comprehensive school-readiness curriculum aligned with NEP 2020, focusing on critical thinking and communication.',
    },
    {
      id: 'day-care',
      title: 'Day Care',
      age: '1 to 10 years',
      duration: 'Full Day / Flexible',
      color: '#7B1FA2',
      bgCard: 'bg-[#F4ECF8]',
      dotColor: 'bg-[#7B1FA2]',
      image: '/images/welcome-entrance.jpg',
      description:
        'Secure extended care with wholesome nutrition, nap routines, guided evening hobby activities, and warm supervision.',
    },
  ];

  const differentiators = [
    {
      title: 'Nature - Based Learning',
      headerBg: 'bg-[#1B365D]',
      borderColor: 'border-[#1B365D]',
      description:
        'Reggio-inspired classroom activities focus on interacting with natural elements that eliminates forced learning for a child.',
    },
    {
      title: '7+ Learning Corners',
      headerBg: 'bg-[#76A136]',
      borderColor: 'border-[#76A136]',
      description:
        'Thoughtfully designed for providing exclusive learning experience where a child evolves at their own pace.',
    },
    {
      title: 'Social & Bonding Activities',
      headerBg: 'bg-[#E87722]',
      borderColor: 'border-[#E87722]',
      description:
        'Playful activities that imbibe friendship, empathy, and natural socializing instincts in a supportive environment.',
    },
    {
      title: '6+ Trips & Walks',
      headerBg: 'bg-[#E91E63]',
      borderColor: 'border-[#E91E63]',
      description:
        'Sensory-rich excursions to botanical gardens, local farms, fire stations, and nature trails that build experiential understanding.',
    },
    {
      title: 'Community Meal',
      headerBg: 'bg-[#7B1FA2]',
      borderColor: 'border-[#7B1FA2]',
      description:
        'Wholesome shared dining experiences teaching table etiquette, food gratitude, mindful eating, and sharing.',
    },
    {
      title: 'Parents Partnership',
      headerBg: 'bg-[#00695C]',
      borderColor: 'border-[#00695C]',
      description:
        'Collaborative workshops, milestone tracking, and daily digital portal insights keeping parents closely involved.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      {/* ---------------- 1. HERO SLIDER SECTION (Image 1) ---------------- */}
      <section className="relative w-full overflow-hidden bg-slate-900">
        <div className="relative h-[420px] sm:h-[520px] md:h-[620px] w-full">
          <Image
            src={heroSlides[activeSlide].image}
            alt="Dandelion Kidz Classroom"
            fill
            priority
            className="object-cover object-center transition-all duration-700 brightness-[0.92]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-6 pb-20 sm:pb-24 text-white text-center w-full">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-xs font-bold uppercase tracking-widest mb-3">
                Pre School • Day Care • Activity Center
              </span>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                {heroSlides[activeSlide].title}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto drop-shadow-sm hidden sm:block">
                {heroSlides[activeSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            <button
              onClick={() => setActiveSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1B365D] shadow-md flex items-center justify-center transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1B365D] shadow-md flex items-center justify-center transition"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wavy Cloud Bottom Divider */}
        <div className="w-full overflow-hidden leading-none -mt-8 sm:-mt-12 relative z-10">
          <svg
            className="relative block w-full h-12 sm:h-20 text-[#FCFDFD]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ---------------- 2. WELCOME TO DANDELION KIDZ (Image 2) ---------------- */}
      <section className="py-12 sm:py-20 relative overflow-hidden bg-[#FCFDFD]">
        {/* Dandelion seed floating illustrations */}
        <div className="absolute right-4 top-10 opacity-15 pointer-events-none hidden md:block">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="none" stroke="#76A136" strokeWidth="1">
            <circle cx="30" cy="70" r="4" fill="#76A136" />
            <line x1="30" y1="70" x2="70" y2="30" />
            <line x1="70" y1="30" x2="85" y2="15" />
            <line x1="70" y1="30" x2="90" y2="35" />
            <line x1="70" y1="30" x2="60" y2="15" />
            <line x1="30" y1="70" x2="20" y2="90" strokeWidth="2" stroke="#76A136" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image with colorful balloons */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src="/images/welcome-entrance.jpg"
                  alt="Dandelion Kidz Campus Entrance"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Balloon Accents */}
              <div className="absolute -top-6 right-6 flex -space-x-2">
                <span className="w-7 h-9 rounded-full bg-red-500 shadow-md inline-block transform -rotate-6" />
                <span className="w-8 h-10 rounded-full bg-amber-400 shadow-md inline-block transform rotate-6" />
                <span className="w-7 h-9 rounded-full bg-blue-500 shadow-md inline-block transform -rotate-3" />
                <span className="w-7 h-9 rounded-full bg-emerald-500 shadow-md inline-block transform rotate-12" />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-[#76A136]">
                <GraduationCap className="w-7 h-7" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="text-[#1B365D]">Welcome to </span>
                <span className="text-[#76A136]">Dandelion Kidz</span>
              </h2>

              <div className="text-sm sm:text-base font-bold text-slate-700 tracking-wide uppercase">
                Pre School | Day Care | Activity Center
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                At Dandelion Kidz, we make conscious efforts to provide children with their safe place, filled with freedom to make mistakes and explore. Our aim is to create an environment where learning occurs effortlessly, which results in natural curiosity, joyful confidence, and genuine social empathy.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>Reggio-Inspired Play</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>7+ Sensory Learning Corners</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>5C Curriculum Methodology</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>Live Parent Communication</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/admissions"
                  className="px-6 py-3 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition"
                >
                  Schedule A Campus Visit
                </Link>
                <Link
                  href="/academics"
                  className="px-6 py-3 bg-[#F0F7E8] hover:bg-[#e4f0d8] text-[#76A136] font-bold text-xs uppercase tracking-wider rounded-full border border-[#76A136]/30 transition"
                >
                  Read Our Philosophy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. HOW ARE WE DIFFERENT ? (Image 3) ---------------- */}
      <section id="why-us" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Rocket and Balloon */}
          <div className="flex items-center justify-center gap-4 mb-16 text-center">
            {/* Cartoon Rocket Illustration */}
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 -rotate-45">
              <Rocket className="w-6 h-6 text-indigo-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-[#1B365D]">How Are </span>
              <span className="text-[#76A136]">We Different ?</span>
            </h2>

            {/* Blue Balloon Accent */}
            <div className="w-6 h-8 rounded-full bg-blue-600 shadow-md inline-block transform rotate-12 shrink-0" />
          </div>

          {/* 6 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className={`bg-white rounded-3xl border-2 ${item.borderColor} p-6 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center relative pt-8`}
              >
                {/* Pill Title Header */}
                <div
                  className={`absolute -top-5 px-6 py-2 rounded-full text-white font-bold text-xs tracking-wider shadow-sm ${item.headerBg}`}
                >
                  {item.title}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. OUR PROGRAMS AT A GLANCE (Image 5) ---------------- */}
      <section id="programs" className="py-16 sm:py-24 bg-[#FAFDF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-[#1B365D]">Our Programs </span>
              <span className="text-[#76A136]">at a Glance...</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our programs are designed to help children acquire social skills and become future-ready citizens.
            </p>
          </div>

          {/* 6 House-Gabled Program Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className={`${prog.bgCard} rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/60 flex flex-col justify-between hover:-translate-y-1 transition duration-300 relative overflow-hidden`}
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-center mb-4" style={{ color: prog.color }}>
                    {prog.title}
                  </h3>

                  {/* Photo with rounded borders */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden shadow-inner mb-5">
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-center min-h-[64px]">
                    {prog.description}
                  </p>
                </div>

                {/* Age & Timing Footer */}
                <div className="pt-6 text-center border-t border-black/5 mt-4">
                  <div className="text-xs font-bold text-slate-800">{prog.age}</div>
                  <div className="text-[11px] font-semibold text-slate-500">{prog.duration}</div>

                  {/* Center Dot Indicator */}
                  <div className="mt-3 flex justify-center">
                    <span className={`w-4 h-4 rounded-full ${prog.dotColor} inline-block`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 5. FRANCHISEE & CAMPUS COMMUNITY (Image 4) ---------------- */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Curving Dandelion Seed Trajectory SVG */}
        <div className="w-full absolute top-10 left-0 right-0 opacity-20 pointer-events-none hidden md:block">
          <svg viewBox="0 0 1200 120" className="w-full h-24 stroke-[#1B365D]" fill="none">
            <path
              d="M0,60 Q300,10 600,60 T1200,60"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="text-[#1B365D]">Franchisee </span>
                <span className="text-[#76A136]">Model</span>
              </h2>

              <p className="text-base sm:text-lg font-bold text-[#76A136]">
                Planning to start a pre-school? Talk to our experts!
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                Start your own Dandelion-Kidz pre-school and make a difference in society by nurturing futures, facilitating success, and helping children achieve happy early milestones. Benefit from complete curriculum support, teacher training, and academic platform systems.
              </p>

              <div className="pt-2">
                <Link
                  href="/admissions"
                  className="px-8 py-3 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition inline-flex items-center gap-2"
                >
                  Explore Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Cartoon Illustration */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#F0F7E8] to-white p-6 border border-slate-100 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/franchisee-playground.jpg"
                  alt="Dandelion Kidz Children Playground"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 6. CONNECTED ACADEMIC MANAGEMENT BANNER ---------------- */}
      <section className="py-14 bg-gradient-to-r from-[#1B365D] to-[#254673] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Integrated Staff & Parent Digital Portal
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              Access live period-wise attendance, daily activity tracking, coursework, and teacher notes.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-6 py-3 bg-[#76A136] hover:bg-[#688f30] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition"
            >
              Sign In to Portal
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
