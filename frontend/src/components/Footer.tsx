'use client';

import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Apex Academy</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Apex Model Senior Secondary School is dedicated to holistic learning, academic excellence, and character building. Affiliated to CBSE (CBSE-AFF-2024-987).
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/academics" className="hover:text-white transition">Academics & Curriculum</Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-white transition">Admission Enquiries</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-white transition">Faculty Directory</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">Student & Staff Portal</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Contact Campus</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Knowledge City, Sector 4, Educational Hub</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>admin@apexschool.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Apex Academy School Management Platform. Dedicated Single-Institution Edition.</p>
          <div className="flex gap-6">
            <span>Security & Privacy Compliant</span>
            <span>Period-Level Academic Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
