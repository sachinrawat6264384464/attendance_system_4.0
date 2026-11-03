'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, CheckCircle2, Heart, Smile, BookOpen, Compass, Award } from 'lucide-react';

export default function AboutAndAcademicsPage() {
  const fiveC = [
    {
      c: 'Class',
      color: '#1B365D',
      bg: 'bg-[#EBF3FA]',
      desc: 'Fostering self-expression, courtesy, active listening, and early social values in every interaction.',
    },
    {
      c: 'Culture',
      color: '#76A136',
      bg: 'bg-[#F0F7E8]',
      desc: 'Introducing cultural celebrations, Indian traditions, universal ethics, and respect for nature from the earliest years.',
    },
    {
      c: 'Creativity',
      color: '#E87722',
      bg: 'bg-[#FDF1E6]',
      desc: 'Encouraging unconstrained imagination, sensory arts, craft discovery, and resourceful problem-solving.',
    },
    {
      c: 'Cognitive',
      color: '#E91E63',
      bg: 'bg-[#FCE8EF]',
      desc: 'Nurturing analytical thinking, early numeracy, phonetic awareness, and scientific curiosity.',
    },
    {
      c: 'Collaboration',
      color: '#7B1FA2',
      bg: 'bg-[#F4ECF8]',
      desc: 'Building peer teamwork, active sharing, empathetic communication, and active parent-teacher synergy.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      {/* Header Banner */}
      <div className="bg-[#FAFDF7] py-14 sm:py-20 border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="text-xs font-bold text-[#76A136] uppercase tracking-widest block mb-2">
            Why Dandelion Kidz?
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-[#1B365D]">Nurturing the </span>
            <span className="text-[#76A136]">Seeds of Tomorrow</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Our curriculum integrates the National Education Policy (NEP 2020) and National Curriculum Framework (NCF 2023) through our proprietary 5C child-centric approach.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 flex-1">
        {/* The 5C Approach */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B365D]">
              The Unique <span className="text-[#76A136]">5C Approach</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Holistic developmental milestones tailored to every child&apos;s natural developmental rhythm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {fiveC.map((item) => (
              <div
                key={item.c}
                className={`${item.bg} rounded-3xl p-6 text-center border border-slate-200/50 shadow-xs flex flex-col items-center justify-between hover:scale-105 transition duration-200`}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-full text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.c[0]}
                  </div>
                  <h3 className="font-extrabold text-lg mb-2" style={{ color: item.color }}>
                    {item.c}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7+ Learning Corners Showcase */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#E87722] uppercase tracking-wider block">
                Exclusive Campus Environments
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B365D]">
                7+ Specially Designed Learning Corners
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rather than confining children to rigid desks, Dandelion Kidz classrooms are divided into vibrant interactive zones where children self-select activities based on their innate curiosity:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>The Puppet Theatre</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>Sensory Ball Pool</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>Storytelling & Book Nook</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>Blocks & Construction Lab</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>Nature Discovery Corner</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                  <span>Creative Paint Studio</span>
                </li>
              </ul>
            </div>

            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/hero-playroom.jpg"
                alt="Dandelion Kidz 7 Learning Corners"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
