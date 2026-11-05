'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import DandelionLogo from '@/components/DandelionLogo';
import {
  LogIn,
  AlertCircle,
  Shield,
  UserCheck,
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await login(email, password);
      redirectByRole(user.roles);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please check credentials.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectByRole = (roles: string[]) => {
    if (roles.includes('PRINCIPAL')) {
      router.push('/dashboard/principal');
    } else if (roles.includes('COORDINATOR')) {
      router.push('/dashboard/coordinator');
    } else if (roles.includes('TEACHER')) {
      router.push('/dashboard/teacher');
    } else if (roles.includes('STUDENT')) {
      router.push('/dashboard/student');
    } else {
      router.push('/dashboard/principal');
    }
  };

  // Demo account quick filler
  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFDF7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block mb-6">
          <div className="inline-flex items-center justify-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
            <DandelionLogo />
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B365D] tracking-tight">
          Institutional Portal Login
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
          Sign in to access your role-based academic dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-lg shadow-slate-100 border border-slate-200/80 rounded-3xl">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL INPUT */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative rounded-2xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. principal@apexschool.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative rounded-2xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition disabled:opacity-50 hover:scale-[1.01]"
              >
                {isLoading ? (
                  'Verifying Credentials...'
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Fillers */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="block text-[11px] font-extrabold text-[#0D2056] uppercase tracking-wider text-center mb-3">
              One-Click Demo Fast Logins
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => fillDemo('principal@apexschool.edu', 'Principal@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#0D2056] hover:bg-[#EBF3FA] text-slate-800 font-bold flex items-center gap-2 transition group cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#0D2056] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-extrabold">Principal</div>
                  <div className="text-[10px] text-slate-400 font-normal">Dr. Vikram Malhotra</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('coordinator@apexschool.edu', 'Coordinator@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#7B1FA2] hover:bg-[#F4ECF8] text-slate-800 font-bold flex items-center gap-2 transition group cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#7B1FA2] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-extrabold">Coordinator</div>
                  <div className="text-[10px] text-slate-400 font-normal">Sunita Nambiar</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('teacher.priya@apexschool.edu', 'Teacher@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#76A136] hover:bg-[#F0F7E8] text-slate-800 font-bold flex items-center gap-2 transition group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#76A136] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-extrabold">Teacher (English)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Priya Shah</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('teacher.anjali@apexschool.edu', 'Teacher@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#76A136] hover:bg-[#F0F7E8] text-slate-800 font-bold flex items-center gap-2 transition group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#76A136] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-extrabold">Teacher (Math)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Anjali Sharma</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('student.aarav@apexschool.edu', 'Student@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#E87722] hover:bg-[#FDF1E6] text-slate-800 font-bold flex items-center gap-2 transition group cursor-pointer"
              >
                <User className="w-4 h-4 text-[#E87722] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-extrabold">Student (Aarav)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Playhouse • Roll 01</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('student.vanya54@apexschool.edu', 'Student@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#E87722] hover:bg-[#FDF1E6] text-slate-800 font-bold flex items-center gap-2 transition group cursor-pointer"
              >
                <User className="w-4 h-4 text-[#E87722] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-extrabold">Student (Vanya)</div>
                  <div className="text-[10px] text-slate-400 font-normal">Jr. Kg • Roll 01</div>
                </div>
              </button>
            </div>
          </div>

          {/* Institutional Credentials Master Sheet */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <details className="text-xs text-slate-600 group">
              <summary className="font-bold text-[#0D2056] cursor-pointer hover:underline flex items-center justify-between">
                <span>📋 Official Credentials Master List</span>
                <span className="text-[10px] text-slate-400">Click to expand</span>
              </summary>
              <div className="mt-3 p-3 bg-slate-50 rounded-2xl space-y-2 text-[11px] font-mono border border-slate-200">
                <div className="font-bold text-[#0D2056] font-sans pb-1 border-b border-slate-200">
                  Principal & Administration
                </div>
                <div>Principal: <span className="font-bold text-slate-800">principal@apexschool.edu</span> | Pass: <span className="text-emerald-700 font-bold">Principal@123</span></div>
                <div>Coordinator: <span className="font-bold text-slate-800">coordinator@apexschool.edu</span> | Pass: <span className="text-emerald-700 font-bold">Coordinator@123</span></div>

                <div className="font-bold text-[#0D2056] font-sans pt-2 pb-1 border-b border-slate-200">
                  Teaching Faculty (Password: <span className="text-emerald-700 font-bold">Teacher@123</span>)
                </div>
                <div>English: <span className="font-bold text-slate-800">teacher.priya@apexschool.edu</span> (Priya Shah)</div>
                <div>Math: <span className="font-bold text-slate-800">teacher.anjali@apexschool.edu</span> (Anjali Sharma)</div>
                <div>Science: <span className="font-bold text-slate-800">teacher.kavita@apexschool.edu</span> (Kavita Mehta)</div>
                <div>Arts: <span className="font-bold text-slate-800">teacher.rohan@apexschool.edu</span> (Rohan Verma)</div>
                <div>Sports: <span className="font-bold text-slate-800">teacher.sunil@apexschool.edu</span> (Sunil Patel)</div>

                <div className="font-bold text-[#0D2056] font-sans pt-2 pb-1 border-b border-slate-200">
                  Enrolled Students (Password: <span className="text-emerald-700 font-bold">Student@123</span>)
                </div>
                <div>Playhouse A: <span className="font-bold text-slate-800">student.aarav@apexschool.edu</span></div>
                <div>Playhouse B: <span className="font-bold text-slate-800">student.prisha16@apexschool.edu</span></div>
                <div>Nursery A: <span className="font-bold text-slate-800">student.laksh31@apexschool.edu</span></div>
                <div>Nursery B: <span className="font-bold text-slate-800">student.aryan43@apexschool.edu</span></div>
                <div>Jr. Kg A: <span className="font-bold text-slate-800">student.vanya54@apexschool.edu</span></div>
              </div>
            </details>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-[#0D2056] font-extrabold hover:text-[#D32F2F] hover:underline inline-flex items-center gap-1">
            ← Back to Om Public School Dabra Website
          </Link>
        </div>
      </div>
    </div>
  );
}
