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
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              One-Click Demo Roles
            </span>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => fillDemo('principal@apexschool.edu', 'Principal@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#1B365D] hover:bg-[#EBF3FA] text-slate-800 font-bold flex items-center gap-2 transition group"
              >
                <Shield className="w-4 h-4 text-[#1B365D] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Principal</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('coordinator@apexschool.edu', 'Coordinator@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#7B1FA2] hover:bg-[#F4ECF8] text-slate-800 font-bold flex items-center gap-2 transition group"
              >
                <UserCheck className="w-4 h-4 text-[#7B1FA2] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Coordinator</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('teacher.math@apexschool.edu', 'Teacher@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#76A136] hover:bg-[#F0F7E8] text-slate-800 font-bold flex items-center gap-2 transition group"
              >
                <BookOpen className="w-4 h-4 text-[#76A136] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Teacher</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('student.aarav@apexschool.edu', 'Student@123')}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-[#E87722] hover:bg-[#FDF1E6] text-slate-800 font-bold flex items-center gap-2 transition group"
              >
                <User className="w-4 h-4 text-[#E87722] shrink-0 group-hover:scale-110 transition-transform" />
                <span>Parent/Student</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-[#76A136] font-bold hover:underline inline-flex items-center gap-1">
            ← Back to Dandelion Kidz Website
          </Link>
        </div>
      </div>
    </div>
  );
}
