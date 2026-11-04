'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { apiClient } from '@/lib/api';
import { User, Award, BookOpen, GraduationCap, Heart, Sparkles } from 'lucide-react';

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

const omSchoolEducators: FacultyMember[] = [
  {
    id: 'f-1',
    employeeId: 'EMP-T-101',
    qualification: 'M.A. Child Psychology, B.Ed.',
    specialization: 'Early Literacy & Phonics English',
    user: { firstName: 'Priya', lastName: 'Shah' },
    department: { name: 'English Medium Wing', code: 'ENG' },
  },
  {
    id: 'f-2',
    employeeId: 'EMP-T-102',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    specialization: 'Foundational Mathematics & Logic',
    user: { firstName: 'Anjali', lastName: 'Sharma' },
    department: { name: 'Mathematics Department', code: 'MATH' },
  },
  {
    id: 'f-3',
    employeeId: 'EMP-T-103',
    qualification: 'B.Sc. Environmental Studies, B.Ed.',
    specialization: 'Science & Environmental Discovery',
    user: { firstName: 'Kavita', lastName: 'Mehta' },
    department: { name: 'General Science Wing', code: 'SCI' },
  },
  {
    id: 'f-4',
    employeeId: 'EMP-T-104',
    qualification: 'B.F.A. Fine Arts, D.El.Ed.',
    specialization: 'Creative Arts, Puppetry & Drama',
    user: { firstName: 'Rohan', lastName: 'Verma' },
    department: { name: 'Arts & Cultural Wing', code: 'ARTS' },
  },
  {
    id: 'f-5',
    employeeId: 'EMP-T-105',
    qualification: 'B.P.Ed. Physical Education',
    specialization: 'Sports, Physical Agility & Yoga',
    user: { firstName: 'Sunil', lastName: 'Patel' },
    department: { name: 'Sports & Physical Health', code: 'SPORTS' },
  },
];

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<FacultyMember[]>(omSchoolEducators);

  useEffect(() => {
    async function loadFaculty() {
      try {
        const res = await apiClient<FacultyMember[]>('/public/faculty-directory');
        if (res.data && res.data.length > 0) {
          setFaculty(res.data);
        }
      } catch {
        // fallback to omSchoolEducators
      }
    }
    loadFaculty();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      <div className="bg-gradient-to-r from-[#0D2056] via-[#1a3885] to-[#0D2056] py-12 sm:py-16 text-white text-center border-b-4 border-[#D32F2F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D32F2F] text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Qualified & Experienced Teachers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Our Dedicated <span className="text-amber-300">Educators</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200">
            Passionate teachers committed to student mentorship, English conversational confidence, and conceptual mastery at Om Public School Dabra.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl border-2 border-slate-200 p-7 shadow-sm hover:shadow-lg transition text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-[#0D2056]/30 flex items-center justify-center text-[#0D2056] mb-4 shadow-inner">
                <User className="w-10 h-10" />
              </div>

              <h3 className="font-black text-lg text-[#0D2056]">
                {member.user.firstName} {member.user.lastName}
              </h3>
              <p className="text-xs text-[#D32F2F] font-black mt-0.5">
                {member.department?.name || 'Faculty Member'}
              </p>

              <div className="w-full border-t border-slate-100 my-4" />

              <div className="text-xs text-slate-600 space-y-2 text-left w-full">
                <div className="flex items-start gap-2 text-slate-800 font-semibold">
                  <GraduationCap className="w-4 h-4 text-[#0D2056] shrink-0 mt-0.5" />
                  <span className="leading-tight">{member.qualification || 'Educator'}</span>
                </div>
                {member.specialization && (
                  <div className="flex items-start gap-2 text-slate-600 font-medium">
                    <Heart className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
                    <span className="leading-tight">{member.specialization}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-mono">Faculty ID: {member.employeeId}</span>
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
