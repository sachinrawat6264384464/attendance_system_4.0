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
  Rocket,
  CheckCircle2,
  Eye,
  X,
} from 'lucide-react';

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; title: string } | null>(null);

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

  const galleryImages = [
    { id: 1, src: '/images/gallery-1.jpg', title: 'Jamboree Stage Celebration' },
    { id: 2, src: '/images/gallery-2.jpg', title: 'Campus Evening Festival & Light Canopy' },
    { id: 3, src: '/images/gallery-3.jpg', title: 'Sensory Botanical Chemistry Glasses' },
    { id: 4, src: '/images/gallery-4.jpg', title: 'Children Community Meal Table' },
    { id: 5, src: '/images/gallery-5.jpg', title: 'Outdoor Sensory Sand Pit Play' },
    { id: 6, src: '/images/gallery-6.jpg', title: 'Theatrical Stage Presentation' },
    { id: 7, src: '/images/gallery-7.jpg', title: 'Mentors Felicitation Ceremony' },
    { id: 8, src: '/images/gallery-8.jpg', title: 'Parents & Community Annual Day Gathering' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      {/* ---------------- 1. HERO SLIDER SECTION (Cleaned - No Dummy Navbar) ---------------- */}
      <section className="relative w-full overflow-hidden bg-slate-900">
        <div className="relative h-[380px] sm:h-[480px] md:h-[560px] w-full">
          <Image
            src={heroSlides[activeSlide].image}
            alt="Dandelion Kidz Classroom Sanctuary"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover object-center transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent flex items-end">
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
              className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#1B365D] shadow-md flex items-center justify-center transition hover:scale-105"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#1B365D] shadow-md flex items-center justify-center transition hover:scale-105"
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

      {/* ---------------- 2. WELCOME TO DANDELION KIDZ ---------------- */}
      <section className="py-12 sm:py-20 relative overflow-hidden bg-[#FCFDFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Clean Entrance Image with Balloon Accents */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-slate-100">
                <Image
                  src="/images/welcome-entrance.jpg"
                  alt="Dandelion Kidz Campus Entrance"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
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

      {/* ---------------- 3. HOW ARE WE DIFFERENT ? ---------------- */}
      <section id="why-us" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Rocket & Balloon */}
          <div className="flex items-center justify-center gap-4 mb-16 text-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 -rotate-45">
              <Rocket className="w-6 h-6 text-indigo-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-[#1B365D]">How Are </span>
              <span className="text-[#76A136]">We Different ?</span>
            </h2>

            <div className="w-6 h-8 rounded-full bg-blue-600 shadow-md inline-block transform rotate-12 shrink-0" />
          </div>

          {/* 6 Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className={`bg-white rounded-3xl border-2 ${item.borderColor} p-6 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center relative pt-8`}
              >
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

      {/* ---------------- 4. FRANCHISEE MODEL (Positioned Above Programs) ---------------- */}
      <section id="franchise" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Curving Dandelion Seed Vine Trajectory SVG */}
        <div className="w-full absolute top-8 left-0 right-0 opacity-20 pointer-events-none hidden md:block">
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
                Start your own Dandelion-kidz pre-school and make a difference in society by nurturing futures, facilitating success and helping children achieve happy milestones.
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

            {/* Right Playground Slide Cartoon */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#F0F7E8] to-white p-6 border border-slate-100 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/franchisee-playground.jpg"
                  alt="Dandelion Kidz Children Playground"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Dandelion Vine with Stem & Floating Seeds at bottom of Franchisee */}
          <div className="mt-12 pt-6 relative flex items-center justify-center">
            <svg viewBox="0 0 1000 80" className="w-full max-w-4xl h-16 stroke-[#1B365D] fill-none">
              <path
                d="M 50,40 Q 250,80 500,40 T 900,40"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Floating Dandelion puffs */}
              <circle cx="150" cy="50" r="3" fill="#76A136" />
              <line x1="150" y1="50" x2="160" y2="40" stroke="#76A136" strokeWidth="1" />
              <circle cx="350" cy="30" r="3" fill="#76A136" />
              <line x1="350" y1="30" x2="360" y2="20" stroke="#76A136" strokeWidth="1" />
              <circle cx="600" cy="50" r="3" fill="#76A136" />
              <line x1="600" y1="50" x2="610" y2="40" stroke="#76A136" strokeWidth="1" />
              <circle cx="750" cy="30" r="3" fill="#76A136" />
              <line x1="750" y1="30" x2="760" y2="20" stroke="#76A136" strokeWidth="1" />
              {/* Big Dandelion flower on right */}
              <circle cx="900" cy="40" r="5" fill="#1B365D" />
              <circle cx="900" cy="40" r="16" stroke="#1B365D" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
        </div>
      </section>

      {/* ---------------- 5. OUR PROGRAMS AT A GLANCE (Wavy Transition) ---------------- */}
      <section id="programs" className="py-16 sm:py-24 bg-[#FAFDF7] relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Cartoon Baby Faces on Left & Cloud Stars on Right */}
          <div className="relative text-center max-w-2xl mx-auto mb-16 space-y-2">
            {/* Cute Baby Faces Accent on Left */}
            <div className="absolute -top-6 -left-12 hidden md:block">
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="#A0AEC0" strokeWidth="2">
                <circle cx="40" cy="40" r="24" />
                <circle cx="34" cy="36" r="2.5" fill="#A0AEC0" />
                <circle cx="46" cy="36" r="2.5" fill="#A0AEC0" />
                <path d="M36 46 Q40 52 44 46" />
                <circle cx="65" cy="55" r="20" />
                <circle cx="60" cy="52" r="2" fill="#A0AEC0" />
                <circle cx="70" cy="52" r="2" fill="#A0AEC0" />
                <path d="M62 60 Q65 65 68 60" />
              </svg>
            </div>

            {/* Cloud & Stars Accent on Right */}
            <div className="absolute -top-6 -right-12 hidden md:block">
              <svg width="60" height="40" viewBox="0 0 120 80" fill="none" stroke="#A0AEC0" strokeWidth="2">
                <path d="M20 50 C10 50 10 30 25 30 C25 15 45 10 55 20 C65 10 85 15 85 30 C100 30 100 50 90 50 Z" />
                <circle cx="25" cy="18" r="1.5" fill="#FFD13B" stroke="none" />
                <circle cx="85" cy="15" r="1.5" fill="#FFD13B" stroke="none" />
              </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-[#1B365D]">Our Programs </span>
              <span className="text-[#76A136]">at a Glance...</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our programs are designed to help children acquire social skills and become future ready citizens.
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

      {/* ---------------- 6. OUR GALLERY (Matching Image 3) ---------------- */}
      <section id="gallery" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Shooting Star & Caterpillar */}
          <div className="relative mb-12">
            {/* Shooting Star with Rainbow Tail on Left */}
            <div className="absolute left-2 sm:left-6 -top-2 flex items-center">
              <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
                {/* Rainbow Tail */}
                <path d="M50 30 Q70 20 85 30" stroke="#E91E63" strokeWidth="3" fill="none" />
                <path d="M48 34 Q68 24 83 34" stroke="#FF9800" strokeWidth="3" fill="none" />
                <path d="M46 38 Q66 28 81 38" stroke="#76A136" strokeWidth="3" fill="none" />
                <path d="M44 42 Q64 32 79 42" stroke="#2196F3" strokeWidth="3" fill="none" />
                {/* Star Face */}
                <polygon points="30,10 36,25 52,25 39,35 44,50 30,40 16,50 21,35 8,25 24,25" fill="#EBF4FB" stroke="#90CAF9" strokeWidth="2" />
                <circle cx="26" cy="27" r="1.5" fill="#1B365D" />
                <circle cx="34" cy="27" r="1.5" fill="#1B365D" />
                <path d="M28 32 Q30 35 32 32" stroke="#1B365D" strokeWidth="1" fill="none" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="text-[#1B365D]">Our </span>
                <span className="text-[#76A136]">Gallery</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                A curated collection of our finest moments, creative expressions, and visual stories.
              </p>
            </div>

            {/* View All Button & Cute Caterpillar on Right */}
            <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
              <Link
                href="/gallery"
                className="px-5 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white text-xs font-bold rounded-full shadow transition"
              >
                View all
              </Link>
              {/* Cute Green Caterpillar */}
              <div className="hidden md:block">
                <svg width="44" height="24" viewBox="0 0 100 50">
                  <circle cx="20" cy="30" r="12" fill="#76A136" />
                  <circle cx="38" cy="28" r="11" fill="#8EA63A" />
                  <circle cx="56" cy="28" r="11" fill="#76A136" />
                  <circle cx="74" cy="30" r="12" fill="#8EA63A" />
                  {/* Caterpillar Eyes */}
                  <circle cx="16" cy="26" r="3" fill="white" />
                  <circle cx="16" cy="26" r="1.5" fill="#1B365D" />
                  <circle cx="24" cy="26" r="3" fill="white" />
                  <circle cx="24" cy="26" r="1.5" fill="#1B365D" />
                </svg>
              </div>
            </div>
          </div>

          {/* 8 Photo Grid (4 Columns x 2 Rows) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                onClick={() => setLightboxPhoto(img)}
                className="group relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <span className="w-10 h-10 rounded-full bg-white/90 text-[#1B365D] flex items-center justify-center shadow">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative h-72 sm:h-96 w-full bg-slate-900">
              <Image
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-[#1B365D]">
                {lightboxPhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 7. INTEGRATED PORTAL BANNER ---------------- */}
      <section className="py-12 bg-gradient-to-r from-[#1B365D] to-[#254673] text-white relative">
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

      {/* ---------------- 8. DANDELION KIDZ OFFICIAL FOOTER (Image 2) ---------------- */}
      <Footer />
    </div>
  );
}
