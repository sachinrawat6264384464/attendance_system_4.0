'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import DandelionLogo from './DandelionLogo';
import { LogIn, LayoutDashboard, Menu, X, Phone, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.roles.includes('PRINCIPAL')) return '/dashboard/principal';
    if (user.roles.includes('COORDINATOR')) return '/dashboard/coordinator';
    if (user.roles.includes('TEACHER')) return '/dashboard/teacher';
    if (user.roles.includes('STUDENT')) return '/dashboard/student';
    return '/dashboard/principal';
  };

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About School', href: '/academics' },
    { title: 'Why Choose Us?', href: '/#why-us' },
    { title: 'Facilities', href: '/facilities' },
    { title: 'Faculty', href: '/faculty' },
    { title: 'Gallery', href: '/gallery' },
    { title: 'Admissions', href: '/admissions' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      {/* 1. Official Top Alert & Contact Strip */}
      <div className="bg-[#0D2056] text-white py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2">
          {/* Location & Contact Info */}
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Deedar Colony, Dabra (M.P.)</span>
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-slate-100 whitespace-nowrap">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href="tel:+917999083379" className="hover:text-amber-300 transition">7999083379</a>,{' '}
              <a href="tel:+919516469021" className="hover:text-amber-300 transition">9516469021</a>
            </span>
          </div>

          {/* Admission Badge */}
          <div className="flex items-center">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D32F2F] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider hover:bg-[#b71c1c] transition shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-amber-300 shrink-0 animate-spin" />
              <span>Admission Open: 2027–28 (PG to 8th)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Emblem Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="bg-white py-1 px-2.5 sm:px-3 rounded-2xl shadow-xs border border-slate-100 hover:shadow-md transition">
              <DandelionLogo />
            </div>
          </Link>

          {/* Desktop Navigation Links (Visible on XL screens 1280px+) */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`text-sm font-bold transition-colors relative py-1.5 ${
                    isActive ? 'text-[#0D2056]' : 'text-slate-600 hover:text-[#D32F2F]'
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0D2056]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs for Desktop */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <Link
              href="/admissions"
              className="px-4 py-2 text-xs font-black text-white bg-[#D32F2F] hover:bg-[#b71c1c] rounded-full shadow-md hover:shadow-lg transition uppercase tracking-wider flex items-center gap-1.5 transform hover:scale-105"
            >
              <span>Apply Now</span>
              <span className="bg-[#FFD600] text-[#0D2056] text-[10px] font-black px-1.5 py-0.5 rounded-full">
                2027-28
              </span>
            </Link>

            {user ? (
              <Link
                href={getDashboardLink()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0D2056] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#0D2056]" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                Portal Login
              </Link>
            )}
          </div>

          {/* Medium Screen CTAs & Mobile Hamburger (Below XL < 1280px) */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 text-xs font-black text-white bg-[#D32F2F] hover:bg-[#b71c1c] rounded-full shadow-xs uppercase tracking-wider"
            >
              <span>Apply Now</span>
              <span className="bg-[#FFD600] text-[#0D2056] text-[9px] font-black px-1 rounded-sm">
                27-28
              </span>
            </Link>

            <Link
              href={getDashboardLink()}
              className="hidden md:inline-flex items-center gap-1 px-3 py-2 text-xs font-bold text-[#0D2056] bg-blue-50 border border-blue-200 rounded-full"
            >
              {user ? 'Dashboard' : 'Login'}
            </Link>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#0D2056] hover:bg-slate-100 transition focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D32F2F]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Responsive Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="divide-y divide-slate-100">
            <div className="py-2 space-y-1">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition ${
                      isActive
                        ? 'bg-[#0D2056]/5 text-[#0D2056]'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#D32F2F]'
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 pb-2 space-y-2.5">
              <Link
                href="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-black text-white bg-[#D32F2F] hover:bg-[#b71c1c] rounded-xl uppercase tracking-wider shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply for Admission 2027–28</span>
              </Link>

              <Link
                href={getDashboardLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-[#0D2056] bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-xl transition"
              >
                {user ? (
                  <>
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Institutional Dashboard</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Staff & Student Portal Login</span>
                  </>
                )}
              </Link>
            </div>

            {/* School Contact Footer in Drawer */}
            <div className="pt-3 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Deedar Colony, Dabra, Dist. Gwalior (M.P.)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#0D2056] shrink-0" />
                <a href="tel:+917999083379" className="text-[#0D2056] font-bold">7999083379</a>,{' '}
                <a href="tel:+919516469021" className="text-[#0D2056] font-bold">9516469021</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
