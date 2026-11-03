'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import {
  GraduationCap,
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Users,
  LogOut,
  Shield,
  Clock,
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
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
      visible: user.roles.includes('PRINCIPAL'),
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
      visible: user.roles.includes('TEACHER') || user.roles.includes('PRINCIPAL'),
    },
    {
      title: 'Student Portal',
      href: '/dashboard/student',
      icon: BookOpen,
      visible: user.roles.includes('STUDENT') || user.roles.includes('PRINCIPAL'),
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100/70">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 hidden md:flex border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white text-base block tracking-tight">Apex Academy</span>
              <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider block">
                Single-Institution
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 mt-4 rounded-xl bg-slate-800/60 border border-slate-800">
          <div className="text-xs font-bold text-white truncate">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
          <div className="mt-2.5">
            <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold text-[10px] uppercase tracking-wide">
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
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Academic Console
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              Session 2026-2027
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-medium text-slate-500 hover:text-slate-900 transition hidden sm:inline"
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

