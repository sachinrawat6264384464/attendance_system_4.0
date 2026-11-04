'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import DandelionLogo from './DandelionLogo';
import { LogIn, LayoutDashboard, Menu, X, Phone, MapPin, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100">
      {/* 1. Official Top Alert & Contact Strip */}
      <div className="bg-[#0D2056] text-white py-1.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              Deedar Colony, Dabra, Dist. Gwalior (M.P.)
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-slate-100">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <a href="tel:+917999083379" className="hover:text-amber-300">7999083379</a>,{' '}
              <a href="tel:+919516469021" className="hover:text-amber-300">9516469021</a>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D32F2F] text-white text-[11px] font-black uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Admission Open: Session 2027–28 (PG to 8th)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Shield Shape */}
          <Link href="/" className="flex items-center">
            <div className="bg-white py-1.5 px-3 rounded-2xl shadow-xs border border-slate-100 hover:shadow-md transition">
              <DandelionLogo />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`text-sm font-bold transition relative py-2 ${
                    isActive ? 'text-[#0D2056]' : 'text-slate-600 hover:text-[#D32F2F]'
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                      <span className="w-2 h-1.5 rounded-full bg-[#0D2056]" />
                      <span className="w-2 h-1.5 rounded-full bg-[#D32F2F]" />
                      <span className="w-2 h-1.5 rounded-full bg-[#FFD600]" />
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admissions"
              className="px-5 py-2.5 text-xs font-black text-white bg-[#D32F2F] hover:bg-[#b71c1c] rounded-full shadow-md hover:shadow-lg transition uppercase tracking-wider flex items-center gap-1.5 transform hover:scale-105"
            >
              <span>Apply Now</span>
              <span className="bg-[#FFD600] text-[#0D2056] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                2027-28
              </span>
            </Link>

            {user ? (
              <Link
                href={getDashboardLink()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0D2056] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-full transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#0D2056]" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                Portal Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#0D2056]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-6 space-y-3">
          {navLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800 hover:text-[#D32F2F]"
            >
              {item.title}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-black text-white bg-[#D32F2F] rounded-full uppercase tracking-wider"
            >
              Apply for Admission 2027–28
            </Link>
            <Link
              href={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-[#0D2056] bg-blue-50 border border-blue-200 rounded-full"
            >
              {user ? 'Open Academic Dashboard' : 'Staff & Parent Portal Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
