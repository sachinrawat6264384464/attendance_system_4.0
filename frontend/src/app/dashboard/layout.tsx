'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import DandelionLogo from '@/components/DandelionLogo';
import {
  CalendarCheck,
  Users,
  LogOut,
  Shield,
  BookOpen,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

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
      title: 'Teacher Attendance & Tasks',
      href: '/dashboard/teacher',
      icon: CalendarCheck,
      visible: user.roles.includes('TEACHER') || user.roles.includes('PRINCIPAL') || user.roles.includes('COORDINATOR'),
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
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B365D] text-slate-300 flex flex-col shrink-0 hidden md:flex border-r border-[#152a48]">
        <div className="p-5 border-b border-white/10 bg-white/5">
          <Link href="/" className="block">
            <span className="font-extrabold text-white text-base block tracking-tight">
              DANDELION <span className="text-[#8CB843]">KIDZ</span>
            </span>
            <span className="text-[10px] text-[#8CB843] font-semibold uppercase tracking-wider block">
              Academic Platform
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

        {/* Navigation */}
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
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-rose-300 hover:bg-white/5 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#1B365D] uppercase tracking-wider">
              Dandelion Kidz Console
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-bold text-[#76A136] bg-[#F0F7E8] px-2.5 py-0.5 rounded-full border border-[#76A136]/20">
              Session 2026-2027
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-bold text-[#1B365D] hover:text-[#76A136] transition hidden sm:inline"
            >
              Public Website
            </Link>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <button
              onClick={() => logout()}
              className="md:hidden text-xs text-rose-600 font-semibold"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
