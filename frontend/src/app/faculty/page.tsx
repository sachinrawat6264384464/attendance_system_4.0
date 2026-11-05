'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { apiClient } from '@/lib/api';
import {
  User,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  Sparkles,
  Phone,
  Clock,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Star,
  Quote,
} from 'lucide-react';

interface FacultyMember {
  id: string;
  employeeId: string;
  qualification: string;
  specialization: string;
  experience: string;
  category: 'pre-primary' | 'languages' | 'stem' | 'activities';
  user: {
    firstName: string;
    lastName: string;
    avatarBg: string;
  };
  department: {
    name: string;
    code: string;
  };
}

const omSchoolEducators: FacultyMember[] = [
  {
    id: 'f-1',
    employeeId: 'EMP-T-101',
    qualification: 'M.A. Child Psychology, B.Ed.',
    specialization: 'Early Phonics, Rhymes & Sensory Play',
    experience: '8+ Years',
    category: 'pre-primary',
    user: {
      firstName: 'Priya',
      lastName: 'Shah',
      avatarBg: 'from-rose-500 to-pink-600',
    },
    department: { name: 'Pre-Primary Wing Head (PG to UKG)', code: 'PRE-PRI' },
  },
  {
    id: 'f-2',
    employeeId: 'EMP-T-102',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    specialization: 'Mental Math, Logic & Foundational Numeracy',
    experience: '10+ Years',
    category: 'stem',
    user: {
      firstName: 'Anjali',
      lastName: 'Sharma',
      avatarBg: 'from-blue-600 to-indigo-700',
    },
    department: { name: 'Mathematics Department', code: 'MATH' },
  },
  {
    id: 'f-3',
    employeeId: 'EMP-T-103',
    qualification: 'B.Sc. Environmental Studies, B.Ed.',
    specialization: 'General Science Lab & Nature Exploration',
    experience: '7+ Years',
    category: 'stem',
    user: {
      firstName: 'Kavita',
      lastName: 'Mehta',
      avatarBg: 'from-emerald-500 to-teal-700',
    },
    department: { name: 'General Science & EVS Wing', code: 'SCI' },
  },
  {
    id: 'f-4',
    employeeId: 'EMP-T-104',
    qualification: 'B.F.A. Fine Arts, D.El.Ed.',
    specialization: 'Visual Arts, Clay Modeling & Stage Drama',
    experience: '6+ Years',
    category: 'activities',
    user: {
      firstName: 'Rohan',
      lastName: 'Verma',
      avatarBg: 'from-amber-500 to-orange-600',
    },
    department: { name: 'Fine Arts & Cultural Wing', code: 'ARTS' },
  },
  {
    id: 'f-5',
    employeeId: 'EMP-T-105',
    qualification: 'B.P.Ed., Certified Yoga Acharya',
    specialization: 'Athletics, Track Sports & Morning Yoga',
    experience: '9+ Years',
    category: 'activities',
    user: {
      firstName: 'Sunil',
      lastName: 'Patel',
      avatarBg: 'from-red-600 to-rose-700',
    },
    department: { name: 'Sports, Physical Health & Yoga', code: 'SPORTS' },
  },
  {
    id: 'f-6',
    employeeId: 'EMP-T-106',
    qualification: 'M.A. English Literature, B.Ed.',
    specialization: 'Spoken English Drills, Grammar & Public Speaking',
    experience: '8+ Years',
    category: 'languages',
    user: {
      firstName: 'Neha',
      lastName: 'Gupta',
      avatarBg: 'from-purple-600 to-indigo-800',
    },
    department: { name: 'English Language & Public Speaking', code: 'ENG' },
  },
  {
    id: 'f-7',
    employeeId: 'EMP-T-107',
    qualification: 'M.A. Hindi & Sanskrit, B.Ed.',
    specialization: 'Shlok Recitation, Hindi Grammar & Moral Ethics',
    experience: '12+ Years',
    category: 'languages',
    user: {
      firstName: 'Rajesh',
      lastName: 'Kushwaha',
      avatarBg: 'from-amber-600 to-red-600',
    },
    department: { name: 'Hindi, Sanskrit & Sanskar Wing', code: 'HINDI' },
  },
  {
    id: 'f-8',
    employeeId: 'EMP-T-108',
    qualification: 'MCA, BCA (Computer Applications)',
    specialization: 'Audio-Visual Smart Board & Coding Fundamentals',
    experience: '6+ Years',
    category: 'stem',
    user: {
      firstName: 'Deepak',
      lastName: 'Sharma',
      avatarBg: 'from-sky-600 to-blue-800',
    },
    department: { name: 'Computer Applications & Smart Labs', code: 'CS' },
  },
];

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<FacultyMember[]>(omSchoolEducators);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function loadFaculty() {
      try {
        const res = await apiClient<FacultyMember[]>('/public/faculty-directory');
        if (res.data && res.data.length > 0) {
          // Keep rich data if API provides list
          setFaculty(res.data);
        }
      } catch {
        // Fallback to omSchoolEducators
      }
    }
    loadFaculty();
  }, []);

  const filteredFaculty = selectedCategory === 'all'
    ? faculty
    : faculty.filter((member) => member.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800 font-sans">
      <Navbar />
      <FloatingContact />

      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-r from-[#0D2056] via-[#152e78] to-[#0D2056] py-12 sm:py-16 text-white text-center border-b-4 border-[#D32F2F] relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D32F2F] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Academic Excellence & Mentorship • Dabra</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Our Dedicated <span className="text-[#FFD600]">Educators & Leadership</span>
          </h1>

          <p className="mt-3 text-xs sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Meet the caring, qualified teachers shaping young learners at <strong>Om Public School Dabra</strong> with personal attention, interactive audio-visual learning, and sound character values.
          </p>

          {/* Key Institutional Faculty Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto mt-8 pt-6 border-t border-white/15">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-xl sm:text-2xl font-black text-[#FFD600]">100%</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-200 mt-0.5">Certified (B.Ed / D.El.Ed)</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-xl sm:text-2xl font-black text-white">1:20</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-200 mt-0.5">Student-Teacher Ratio</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-xl sm:text-2xl font-black text-emerald-300">8+ Years</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-200 mt-0.5">Average Experience</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-xl sm:text-2xl font-black text-amber-300">English</div>
              <div className="text-[10px] sm:text-xs font-bold text-slate-200 mt-0.5">Conversational Mentors</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRINCIPAL'S WELCOME DESK SPOTLIGHT */}
      <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/40 rounded-3xl border-2 border-slate-200 p-6 sm:p-10 lg:p-12 shadow-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
              {/* Principal Photo & Details Card */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-tr from-[#0D2056] to-[#152e78]">
                  <Image
                    src="/images/om-hero-campus-hd.jpg"
                    alt="Principal - Om Public School Dabra"
                    fill
                    className="object-cover brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 inset-x-2 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D32F2F] text-white text-[9px] font-black uppercase tracking-wider">
                      Head of School
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#0D2056] mt-3">
                  Smt. Gayatri Sharma
                </h3>
                <p className="text-xs font-black text-[#D32F2F]">
                  Principal & Academic Director
                </p>
                <div className="mt-2 text-[11px] text-slate-600 font-semibold space-y-0.5">
                  <p>M.A. (English), M.Ed. (Gold Medalist)</p>
                  <p className="text-slate-500 font-normal">16+ Years School Leadership Experience</p>
                </div>
              </div>

              {/* Message from the Principal */}
              <div className="lg:col-span-8 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-[#D32F2F]">
                  <Quote className="w-6 h-6 rotate-180" />
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                    Message from the Principal&apos;s Desk
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-black text-[#0D2056] tracking-tight">
                  &ldquo;Nurturing every child with patience, curiosity, and noble values.&rdquo;
                </h2>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  At <strong>Om Public School, Dabra</strong>, we firmly believe that true education extends beyond rote memorization. Our faculty is hand-picked not only for their academic qualifications, but for their genuine empathy and dedication to every single child.
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  From Playgroup phonics drills to 8th Standard scientific inquiry and stage arts, our classrooms blend modern audio-visual smart technology with traditional Indian sanskars. We partner with parents every step of the way to ensure your child blossoms into a confident, articulate, and compassionate human being.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" /> CBSE Pedagogy Certified
                  </span>
                  <span className="flex items-center gap-1 text-blue-700">
                    <CheckCircle2 className="w-4 h-4" /> Regular Teacher Training Workshops
                  </span>
                  <span className="flex items-center gap-1 text-rose-700">
                    <CheckCircle2 className="w-4 h-4" /> Zero-Tolerance to Corporal Punishment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FACULTY DIRECTORY WITH FILTER TABS */}
      <section className="py-12 sm:py-16 bg-[#FDFEFE] flex-1">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#D32F2F]">
              Qualified Teaching Staff
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0D2056] tracking-tight">
              Core Faculty Members
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each faculty member is a subject-matter specialist dedicated to interactive, engaging teaching and continuous child progress monitoring.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-4">
              {[
                { id: 'all', label: 'All Educators (8)' },
                { id: 'pre-primary', label: 'Pre-Primary Wing' },
                { id: 'stem', label: 'Maths & Science' },
                { id: 'languages', label: 'Languages & Fluency' },
                { id: 'activities', label: 'Arts & Sports' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black transition cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-[#0D2056] text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symmetrical Balanced Grid: 2 columns on mobile, 4 columns on large screens (8 cards total) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200 hover:border-[#0D2056] p-4 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Avatar Icon Box with Gradient Background */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${
                        member.user?.avatarBg || 'from-blue-600 to-indigo-700'
                      } text-white flex items-center justify-center font-black text-base sm:text-xl shadow-md group-hover:scale-105 transition-transform duration-300`}
                    >
                      {member.user?.firstName?.[0] || 'T'}
                      {member.user?.lastName?.[0] || ''}
                    </div>

                    <span className="px-2 sm:px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[9px] sm:text-[10px] font-mono font-bold">
                      {member.employeeId}
                    </span>
                  </div>

                  {/* Name & Department */}
                  <h3 className="font-black text-sm sm:text-lg text-[#0D2056] group-hover:text-[#D32F2F] leading-snug transition-colors">
                    {member.user?.firstName} {member.user?.lastName}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#D32F2F] font-bold mt-1 line-clamp-2">
                    {member.department?.name || 'Faculty Member'}
                  </p>

                  <div className="w-full border-t border-slate-100 my-3" />

                  {/* Qualifications & Specialization */}
                  <div className="space-y-2 text-[10px] sm:text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0D2056] shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-800 leading-tight">
                        {member.qualification || 'Certified Educator'}
                      </span>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="leading-tight text-slate-600 font-medium">
                        {member.specialization || 'Foundational Learning'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Experience Badge */}
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>{member.experience || 'Experienced'}</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MENTORSHIP & PEDAGOGY PILLARS */}
      <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2056]">
              Our Mentorship Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              How our faculty ensures every student excels academically and develops positive social habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0D2056] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">Personalized Learning Attention</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                With capped class sizes, our teachers recognize each student&apos;s unique learning pace, addressing reading, writing, and arithmetic difficulties promptly.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#D32F2F] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">Audio-Visual Smart Teaching</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Lessons come alive through animations, interactive diagrams, and digital storytelling so concepts are retained effortlessly without rote cramming.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">Moral Sanskars & Discipline</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Daily prayer, shlok recitation, cleanliness drills, and respectful conduct form the bedrock of character building at Om Public School Dabra.
              </p>
            </div>
          </div>

          {/* Teacher Recruitment Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#0D2056] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-lg sm:text-xl font-black text-[#FFD600]">
                Passionate about teaching? Join Our Faculty!
              </h3>
              <p className="text-xs sm:text-sm text-slate-200">
                We are always seeking talented, certified English medium teachers for Pre-Primary and Primary wings.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-3">
              <a
                href="tel:+917999083379"
                className="px-5 py-3 rounded-full bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call: 7999083379</span>
              </a>
              <Link
                href="/admissions"
                className="px-5 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition"
              >
                Visit Campus →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
