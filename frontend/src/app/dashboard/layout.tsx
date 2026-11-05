'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import {
  CalendarCheck,
  Users,
  LogOut,
  Shield,
  BookOpen,
  ClipboardList,
  FileText,
  Menu,
  X,
  ChevronRight,
  Globe,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFDF7]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#76A136] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  const primaryRole = user.roles[0] || 'USER';

  const navItems = [
    {
      title: 'Principal View',
      href: '/dashboard/principal',
      icon: Shield,
      visible: user.roles.includes('PRINCIPAL') || user.roles.includes('COORDINATOR'),
    },
    {
      title: 'Coordinator Operations',
      href: '/dashboard/coordinator',
      icon: Users,
      visible: user.roles.includes('COORDINATOR') || user.roles.includes('PRINCIPAL'),
    },
    {
      title: 'Attendance Marking Pad',
      href: '/dashboard/teacher',
      icon: CalendarCheck,
      visible: user.roles.includes('TEACHER') || user.roles.includes('PRINCIPAL') || user.roles.includes('COORDINATOR'),
    },
    {
      title: 'Attendance History & Logs',
      href: '/dashboard/attendance-logs',
      icon: ClipboardList,
      visible: user.roles.includes('TEACHER') || user.roles.includes('PRINCIPAL') || user.roles.includes('COORDINATOR'),
    },
    {
      title: 'Assignments & Coursework',
      href: '/dashboard/assignments',
      icon: FileText,
      visible: user.roles.includes('TEACHER') || user.roles.includes('PRINCIPAL') || user.roles.includes('COORDINATOR') || user.roles.includes('STUDENT'),
    },
    {
      title: 'Student & Parent Portal',
      href: '/dashboard/student',
      icon: BookOpen,
      visible: user.roles.includes('STUDENT') || user.roles.includes('PRINCIPAL') || user.roles.includes('COORDINATOR'),
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#FAFDF7]">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#1B365D] text-slate-300 flex flex-col shrink-0 hidden md:flex border-r border-[#152a48]">
        <div className="p-5 border-b border-white/10 bg-white/5">
          <Link href="/" className="block">
            <span className="font-black text-white text-base block tracking-tight">
              OM PUBLIC <span className="text-[#FFD600]">SCHOOL</span>
            </span>
            <span className="text-[10px] text-[#FFD600] font-black uppercase tracking-wider block">
              Dabra • Academic Platform
            </span>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 mt-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs font-bold text-white truncate">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-[11px] text-slate-300 truncate">{user.email}</div>
          <div className="mt-2.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#76A136]/30 text-[#8CB843] font-bold text-[10px] uppercase tracking-wide">
              {primaryRole}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          {navItems
            .filter((item) => item.visible)
            .map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#76A136] text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-white/5 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden flex"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-4/5 max-w-xs bg-[#1B365D] text-slate-300 flex flex-col h-full shadow-2xl p-4 animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="font-black text-white text-sm block">OM PUBLIC SCHOOL</span>
                <span className="text-[10px] text-[#FFD600] font-bold uppercase">Dabra Console</span>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile User Card */}
            <div className="p-3 my-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold text-white truncate">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#76A136]/30 text-[#8CB843] font-bold text-[9px] uppercase">
                {primaryRole}
              </span>
            </div>

            {/* Navigation in Mobile Drawer */}
            <nav className="space-y-1 flex-1 overflow-y-auto">
              {navItems
                .filter((item) => item.visible)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                        isActive ? 'bg-[#76A136] text-white shadow-sm' : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  );
                })}

              <div className="pt-2 border-t border-white/10 mt-2">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-white/10"
                >
                  <Globe className="w-4 h-4" />
                  <span>Public Website</span>
                </Link>
              </div>
            </nav>

            <button
              onClick={() => logout()}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-rose-300 bg-rose-950/40 border border-rose-500/30 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar Header */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-200/80 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Hamburger button on Mobile */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 md:hidden shrink-0"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-5 h-5 text-[#0D2056]" />
            </button>

            <span className="text-[11px] sm:text-xs font-black text-[#0D2056] uppercase tracking-wider truncate">
              OPS Console
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#76A136] bg-[#F0F7E8] px-2 py-0.5 rounded-full border border-[#76A136]/20 whitespace-nowrap">
              Session 2026–27
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/"
              className="text-xs font-bold text-[#1B365D] hover:text-[#76A136] transition hidden sm:inline"
            >
              Public Website
            </Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <button
              onClick={() => logout()}
              className="px-2.5 py-1 text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-3 sm:p-5 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
