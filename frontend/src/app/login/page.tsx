'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import DandelionLogo from '@/components/DandelionLogo';
import { LogIn, AlertCircle, Shield, UserCheck, BookOpen, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          <div className="inline-flex items-center justify-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <DandelionLogo />
          </div>
        </Link>
        <h2 className="text-2xl font-extrabold text-[#1B365D] tracking-tight">Institutional Portal Login</h2>
        <p className="mt-1 text-xs text-slate-500">Sign in to access your role-based academic dashboard</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200/80 rounded-3xl">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@dandelionkidz.in"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#76A136] text-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#76A136] text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition disabled:opacity-50 mt-2"
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
          </form>

          {/* Quick Demo Fillers */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              One-Click Demo Roles
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemo('principal@apexschool.edu', 'Principal@123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-[#EBF3FA] hover:border-[#1B365D]/30 text-slate-700 font-semibold flex items-center gap-2 transition"
              >
                <Shield className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
                <span>Principal</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('coordinator@apexschool.edu', 'Coordinator@123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-[#F4ECF8] hover:border-[#7B1FA2]/30 text-slate-700 font-semibold flex items-center gap-2 transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#7B1FA2] shrink-0" />
                <span>Coordinator</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('teacher.math@apexschool.edu', 'Teacher@123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-[#F0F7E8] hover:border-[#76A136]/30 text-slate-700 font-semibold flex items-center gap-2 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#76A136] shrink-0" />
                <span>Teacher</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('student.aarav@apexschool.edu', 'Student@123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-[#FDF1E6] hover:border-[#E87722]/30 text-slate-700 font-semibold flex items-center gap-2 transition"
              >
                <User className="w-3.5 h-3.5 text-[#E87722] shrink-0" />
                <span>Parent/Student</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-[#76A136] font-semibold hover:underline">
            ← Back to Dandelion Kidz Website
          </Link>
        </div>
      </div>
    </div>
  );
}
