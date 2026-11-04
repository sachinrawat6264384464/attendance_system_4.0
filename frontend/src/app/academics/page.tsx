'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, CheckCircle2, Award, BookOpen, Compass, Trophy, ShieldCheck, Users, MapPin, Phone } from 'lucide-react';

export default function AboutAndAcademicsPage() {
  const corePillars = [
    {
      title: 'English Medium Pedagogy',
      desc: 'Structured English medium education from foundational Playgroup (PG) through Class 8th, emphasizing phonetic mastery and fluent dialogue.',
      color: '#0D2056',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      title: 'Smart Classes & AV Learning',
      desc: 'Modern audiovisual smart classrooms that convert textbook lessons into engaging visual animations and real-world demonstrations.',
      color: '#D32F2F',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
    },
    {
      title: 'English Speaking Excellence',
      desc: 'Dedicated daily speaking periods, elocution, debates, and vocabulary enrichment ensuring students speak English naturally and fearlessly.',
      color: '#B78103',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      title: 'Discipline & Cultural Ethos',
      desc: 'Deep grounding in timeless Indian values, respect for elders, community service, and lifelong ethical leadership.',
      color: '#1B5E20',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      title: 'Sports & Cultural Flourishing',
      desc: 'Physical education, yoga, athletics, and cultural performances cultivating physical fitness, sportsmanship, and artistic talents.',
      color: '#7B1FA2',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
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
            <span>Official Institutional Profile</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            About <span className="text-amber-300">Om Public School</span>, Dabra
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            &ldquo;Quality Education for a Better Tomorrow&rdquo; • Providing an empowering English Medium foundation from Playgroup to 8th Standard in Dabra, Gwalior (M.P.).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 flex-1">
        {/* School Overview Card with Building Picture */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-slate-200 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-black text-[#D32F2F] uppercase tracking-wider block">
                Foundational Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0D2056]">
                Empowering Young Minds in Dabra Since Inception
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong>Om Public School Dabra</strong> was established with the vision to make high-standard English Medium education accessible to every student in Deedar Colony, Dabra and surrounding areas of Gwalior district.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By blending traditional Indian moral values with 21st-century smart classroom technology and English conversational fluency, we ensure that every student is thoroughly prepared for competitive academic excellence and responsible citizenship.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs font-bold">
                <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0D2056]">
                  ✓ English Medium
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-rose-100 text-[#D32F2F]">
                  ✓ Classes: PG to 8th
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800">
                  ✓ Smart Classroom Enabled
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800">
                  ✓ Safe & Secure Campus
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-[#0D2056]">
                <Image
                  src="/images/om-school-building.jpg"
                  alt="Om Public School Dabra Modern Campus Building"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <h2 className="text-3xl font-black text-[#0D2056]">
              Our Five <span className="text-[#D32F2F]">Pillars of Excellence</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Guiding principles that define everyday student life at Om Public School Dabra.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {corePillars.map((item, idx) => (
              <div
                key={idx}
                className={`${item.bg} rounded-3xl p-6 text-center border-2 ${item.border} shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-md"
                    style={{ backgroundColor: item.color }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="font-extrabold text-base mb-2 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Callout to Admission */}
        <div className="bg-[#0D2056] text-white rounded-3xl p-8 sm:p-10 border-4 border-amber-300 text-center space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#D32F2F] text-amber-300 text-xs font-black uppercase tracking-wider inline-block">
            Admission Notice • Session 2027–28
          </span>
          <h3 className="text-2xl sm:text-3xl font-black">
            Limited Seats Available for Classes PG to 8th
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Give your child the gift of quality education, moral strength, and a bright future at Om Public School Dabra.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="px-8 py-3 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition"
            >
              Apply Online
            </Link>
            <a
              href="tel:+917999083379"
              className="px-6 py-3 bg-white text-[#0D2056] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition"
            >
              Call Desk: 7999083379
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
