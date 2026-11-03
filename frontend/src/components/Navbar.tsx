'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import DandelionLogo from './DandelionLogo';
import { LogIn, LayoutDashboard, Menu, X } from 'lucide-react';
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
    { title: 'About us', href: '/academics' },
    { title: 'Why Dandelion Kidz?', href: '/#why-us' },
    { title: 'Programs', href: '/#programs' },
    { title: 'Facilities', href: '/#facilities' },
    { title: 'Faculty', href: '/faculty' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-xs border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Shield Shape */}
          <Link href="/" className="flex items-center">
            <div className="bg-white py-2 px-3 rounded-b-2xl shadow-xs border-b border-x border-slate-100">
              <DandelionLogo />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`text-sm font-semibold transition relative py-2 ${
                    isActive ? 'text-[#1B365D]' : 'text-slate-600 hover:text-[#76A136]'
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#76A136]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1B365D]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E87722]" />
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
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#1B365D] hover:bg-[#152a48] rounded-full shadow-sm hover:shadow transition uppercase tracking-wider"
            >
              Contact Us
            </Link>

            {user ? (
              <Link
                href={getDashboardLink()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#76A136] bg-[#F0F7E8] hover:bg-[#e4f0d8] border border-[#76A136]/30 rounded-full transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#1B365D]"
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
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-[#76A136]"
            >
              {item.title}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/admissions"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-white bg-[#1B365D] rounded-full uppercase tracking-wider"
            >
              Contact Us / Admissions
            </Link>
            <Link
              href={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-[#76A136] bg-[#F0F7E8] border border-[#76A136]/30 rounded-full"
            >
              {user ? 'Open Academic Dashboard' : 'Staff & Parent Portal Login'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
