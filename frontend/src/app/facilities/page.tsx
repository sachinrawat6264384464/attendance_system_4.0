'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import {
  ShieldCheck,
  Sparkles,
  Award,
  BookOpen,
  Compass,
  ArrowRight,
  CheckCircle2,
  Tv,
  Sun,
  Activity,
  Trophy,
  Users,
} from 'lucide-react';

export default function FacilitiesPage() {
  const facilities = [
    {
      title: 'Smart Classes & Modern AV Teaching',
      tag: 'Interactive Technology',
      color: 'border-blue-600',
      tagBg: 'bg-blue-600',
      icon: Tv,
      description:
        'Equipped with modern multimedia digital projectors and smart boards that bring textbook lessons to life with rich animations, educational videos, and live quizzes.',
      image: '/images/om-school-building.jpg',
      highlights: [
        'Audiovisual interactive curriculum',
        'Animated science & math simulations',
        'Enhanced visual memory & engagement',
      ],
    },
    {
      title: 'English Speaking & Communication Hub',
      tag: 'Language Mastery',
      color: 'border-purple-600',
      tagBg: 'bg-purple-600',
      icon: Compass,
      description:
        'Special emphasis on spoken English from PG to 8th standard. Daily conversational drills, phonics, group discussions, and elocution build fearless English fluency.',
      image: '/images/om-school-building.jpg',
      highlights: [
        'Daily speaking & pronunciation exercises',
        'Storytelling & poem recitation sessions',
        'Public speaking confidence clubs',
      ],
    },
    {
      title: 'Sports, Athletics & Cultural Ground',
      tag: 'Physical Fitness & Agility',
      color: 'border-[#D32F2F]',
      tagBg: 'bg-[#D32F2F]',
      icon: Trophy,
      description:
        'Spacious sports areas and activity grounds dedicated to cricket, football, running, yoga, and gymnastics. Regular physical training promotes discipline and teamwork.',
      image: '/images/om-school-building.jpg',
      highlights: [
        'Dedicated physical training instructors',
        'Annual sports day & athletic meets',
        'Yoga, meditation, and fitness drills',
      ],
    },
    {
      title: 'Safe, CCTV Monitored Campus',
      tag: 'Child Safety & Care',
      color: 'border-emerald-600',
      tagBg: 'bg-emerald-600',
      icon: ShieldCheck,
      description:
        'Round-the-clock CCTV surveillance covering all corridors, gates, and classrooms. Safe, boundary-walled premises with disciplined security staff and caring attendants.',
      image: '/images/om-school-building.jpg',
      highlights: [
        'Complete CCTV coverage & safety gates',
        'Strict visitor registration protocols',
        'Clean drinking water & sanitised washrooms',
      ],
    },
    {
      title: 'Computer Education & Practical Learning',
      tag: 'Digital Literacy',
      color: 'border-amber-600',
      tagBg: 'bg-amber-600',
      icon: Sparkles,
      description:
        'Modern computer education introducing students to IT fundamentals, keyboard skills, coding logic, and responsible internet learning at an early age.',
      image: '/images/om-school-building.jpg',
      highlights: [
        'Individual computer workstations',
        'Age-appropriate digital literacy syllabus',
        'Hands-on practical class projects',
      ],
    },
    {
      title: 'Discipline, Ethics & Moral Education',
      tag: 'Character Building',
      color: 'border-indigo-600',
      tagBg: 'bg-indigo-600',
      icon: Award,
      description:
        'Morning assemblies with prayers, moral stories, Indian cultural heritage teachings, and value-based education that builds empathetic, respectful, and patriotic citizens.',
      image: '/images/om-school-building.jpg',
      highlights: [
        'Morning prayer & patriotic assemblies',
        'Moral value stories & civic awareness',
        'Respect for teachers, elders & nature',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0D2056] via-[#1a3885] to-[#0D2056] py-14 sm:py-20 text-white text-center border-b-4 border-[#D32F2F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D32F2F] text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Infrastructure & Learning Facilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Campus Facilities at <span className="text-amber-300">Om Public School</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            Smart Classes • Experienced Mentorship • Safe & Friendly Environment in Dabra (Gwalior, M.P.)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, i) => {
            const Icon = fac.icon;
            return (
              <div
                key={i}
                className={`bg-white rounded-3xl overflow-hidden border-2 ${fac.color} shadow-sm hover:shadow-xl transition duration-200 flex flex-col justify-between`}
              >
                <div className="p-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider ${fac.tagBg}`}>
                      {fac.tag}
                    </span>
                    <Icon className="w-6 h-6 text-[#0D2056]" />
                  </div>

                  <h3 className="text-xl font-black text-[#0D2056] leading-tight">
                    {fac.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {fac.highlights.map((h, hi) => (
                      <div key={hi} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <Link
                    href="/admissions"
                    className="w-full inline-block text-center py-2.5 px-4 rounded-xl bg-[#0D2056] hover:bg-[#D32F2F] text-white font-bold text-xs uppercase tracking-wider transition"
                  >
                    Experience Campus Facility →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="bg-[#0D2056] text-white rounded-3xl p-8 sm:p-10 border-4 border-amber-300 text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-[#D32F2F] text-white text-xs font-black uppercase tracking-wider inline-block">
            Admission Open Session 2027–28
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Visit Om Public School Dabra Today!
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Deedar Colony, Dabra, District Gwalior (M.P.) • Contact: 7999083379, 9516469021
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/admissions"
              className="px-8 py-3.5 bg-[#FFD600] text-[#0D2056] font-black text-xs uppercase tracking-wider rounded-full shadow-lg hover:scale-105 transition"
            >
              Apply Online Now
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
