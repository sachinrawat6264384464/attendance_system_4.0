import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  FileCheck,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-indigo-50/60 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" />
              CBSE Affiliated Excellence • Institution Code: APEX-SCH-01
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Empowering Minds, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Inspiring Futures
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Welcome to Apex Academy. A premier educational sanctuary delivering world-class academics, comprehensive digital tracking, and personalized holistic growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition"
              >
                Apply for Admission 2026-27
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition"
              >
                Portal Login (Staff & Students)
              </Link>
            </div>
          </div>

          {/* Key Statistics Cards */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="text-3xl font-extrabold text-indigo-600">99.4%</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wide">
                Board Passing Rate
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="text-3xl font-extrabold text-indigo-600">1:15</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wide">
                Teacher-Student Ratio
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="text-3xl font-extrabold text-indigo-600">100%</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wide">
                Digital Period Attendance
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="text-3xl font-extrabold text-indigo-600">35+</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wide">
                STEM & Arts Clubs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Highlights & Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Academic Wings & Excellence
            </h2>
            <p className="mt-3 text-slate-600">
              Structured progressive curriculum designed to nurture critical reasoning, ethical leadership, and creative mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Foundational & Middle Wing</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Grades 1 to 8 emphasizing inquiry-based discovery, language mastery, foundational mathematics, and experiential science labs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Secondary School (Grades 9 & 10)</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Rigorous CBSE curriculum preparation with intensive concept drills, lab practicals, continuous period assessments, and remedial coaching.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Senior Secondary (11 & 12)</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Specialized Science (PCM/PCB) and Commerce streams with JEE/NEET competitive alignment, computer science, and career guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Platform Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Operational Transparency
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Modern Academic Management & Tracking Engine
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Apex Academy operates with a dedicated, enterprise-grade academic platform that keeps teachers, coordinators, principals, and students seamlessly synchronized.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Period-Wise Attendance with Audit Locks</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Finalized attendance is secured with cryptographic verification and audited principal approval for modifications.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Interactive Coursework & Assignments</h4>
                    <p className="text-xs text-slate-500 mt-0.5">High-speed Cloudinary document delivery, multi-stage submission progress tracking, and detailed grading.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Role-Specific Executive Dashboards</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Isolated dashboards and permissions tailored specifically for Principal, HOD, Coordinator, Teacher, and Student.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
                >
                  Access Platform Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Illustration Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl">
              <div className="flex items-center justify-between border-b border-indigo-800/80 pb-6 mb-6">
                <div>
                  <h4 className="font-bold text-lg">Apex Institutional Console</h4>
                  <p className="text-xs text-indigo-300">Live Academic Year: 2026-2027</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  System Active
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-slate-200">Today Morning Attendance</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">96.8% Marked</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-400" />
                    <span className="text-sm font-medium text-slate-200">Active Coursework Due</span>
                  </div>
                  <span className="text-sm font-bold text-blue-400">14 Assignments</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="text-sm font-medium text-slate-200">Pending Correction Audit</span>
                  </div>
                  <span className="text-sm font-bold text-amber-400">0 Requests</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-indigo-800/80 text-xs text-indigo-300 flex items-center justify-between">
                <span>Enterprise Relational Security</span>
                <span>Argon2id Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
