'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { GraduationCap, LogIn, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.roles.includes('PRINCIPAL')) return '/dashboard/principal';
    if (user.roles.includes('COORDINATOR')) return '/dashboard/coordinator';
    if (user.roles.includes('TEACHER')) return '/dashboard/teacher';
    if (user.roles.includes('STUDENT')) return '/dashboard/student';
    return '/dashboard/principal';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-tight">
                Apex Academy
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                CBSE Affiliated Senior Secondary
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Home
            </Link>
            <Link
              href="/academics"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Academics
            </Link>
            <Link
              href="/admissions"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Admissions
            </Link>
            <Link
              href="/faculty"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              Faculty
            </Link>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href={getDashboardLink()}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                <LogIn className="w-4 h-4" />
                Portal Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/academics"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Academics
          </Link>
          <Link
            href="/admissions"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Admissions
          </Link>
          <Link
            href="/faculty"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            Faculty
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <Link
              href={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-indigo-600 rounded-lg"
            >
              {user ? 'Open Dashboard' : 'Portal Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

