'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { GraduationCap, LogIn, AlertCircle, Shield, UserCheck, BookOpen, User } from 'lucide-react';

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
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <GraduationCap className="w-7 h-7" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Apex Academy</span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Institutional Portal Login</h2>
        <p className="mt-1 text-sm text-slate-500">Sign in to access your role-based academic dashboard</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200 rounded-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@apexschool.edu"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-100 transition disabled:opacity-50"
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

          {/* Quick Demo Logins for Fast Review */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              Quick Demo Fillers
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemo('principal@apexschool.edu', 'Principal@123')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 font-medium flex items-center gap-2 transition"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Principal</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('coordinator@apexschool.edu', 'Coordinator@123')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 font-medium flex items-center gap-2 transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Coordinator</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('teacher.math@apexschool.edu', 'Teacher@123')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 font-medium flex items-center gap-2 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Math Teacher</span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo('student.aarav@apexschool.edu', 'Student@123')}
                className="p-2.5 rounded-lg border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700 font-medium flex items-center gap-2 transition"
              >
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Student</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-indigo-600 hover:underline">
            ← Back to Public School Website
          </Link>
        </div>
      </div>
    </div>
  );
}

