'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apiClient } from '@/lib/api';
import { User, Award, BookOpen, GraduationCap } from 'lucide-react';

interface FacultyMember {
  id: string;
  employeeId: string;
  qualification?: string;
  specialization?: string;
  user: {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
  department?: {
    name: string;
    code: string;
  };
}

const fallbackFaculty: FacultyMember[] = [
  {
    id: 'f-1',
    employeeId: 'EMP-MATH-01',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    specialization: 'Advanced Calculus & Algebra',
    user: { firstName: 'Rajesh', lastName: 'Sharma' },
    department: { name: 'Mathematics & Science', code: 'SCI' },
  },
  {
    id: 'f-2',
    employeeId: 'EMP-PHY-01',
    qualification: 'Ph.D. Applied Physics',
    specialization: 'Electromagnetism & Quantum Mechanics',
    user: { firstName: 'Dr. Anita', lastName: 'Deshmukh' },
    department: { name: 'Physics & STEM', code: 'PHY' },
  },
  {
    id: 'f-3',
    employeeId: 'EMP-ENG-01',
    qualification: 'M.A. English Literature, M.Phil',
    specialization: 'Rhetoric & World Literature',
    user: { firstName: 'Kavita', lastName: 'Menon' },
    department: { name: 'Languages & Humanities', code: 'ENG' },
  },
  {
    id: 'f-4',
    employeeId: 'EMP-COMM-01',
    qualification: 'M.Com, Chartered Accountant (Inter)',
    specialization: 'Corporate Accountancy & Taxation',
    user: { firstName: 'Arun', lastName: 'Mehta' },
    department: { name: 'Commerce & Economics', code: 'COMM' },
  },
];

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<FacultyMember[]>(fallbackFaculty);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaculty() {
      try {
        const res = await apiClient<FacultyMember[]>('/public/faculty-directory');
        if (res.data && res.data.length > 0) {
          setFaculty(res.data);
        }
      } catch {
        // use fallback if backend isn't running yet
      } finally {
        setLoading(false);
      }
    }
    loadFaculty();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-slate-50 py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest block mb-2">
            Academic Mentors
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Distinguished Faculty
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Accomplished educators, subject experts, and research scholars dedicated to student growth.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-inner">
                <User className="w-10 h-10" />
              </div>

              <h3 className="font-bold text-base text-slate-900">
                {member.user.firstName} {member.user.lastName}
              </h3>
              <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                {member.department?.name || 'Department Faculty'}
              </p>

              <div className="w-full border-t border-slate-100 my-4" />

              <div className="text-xs text-slate-500 space-y-1 text-left w-full">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{member.qualification || 'Educator'}</span>
                </div>
                {member.specialization && (
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{member.specialization}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1">
                  <Award className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>ID: {member.employeeId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

