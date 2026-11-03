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

const dandelionEducators: FacultyMember[] = [
  {
    id: 'f-1',
    employeeId: 'DK-ECCE-01',
    qualification: 'Diploma in Early Childhood Care (ECCE)',
    specialization: 'Sensory Development & Toddler Transition',
    user: { firstName: 'Bhavna', lastName: 'Vora' },
    department: { name: 'Todd Care & Playhouse Wing', code: 'TODD' },
  },
  {
    id: 'f-2',
    employeeId: 'DK-REGGIO-02',
    qualification: 'Certified Reggio Emilia Practitioner, B.Ed.',
    specialization: 'Nature-Based Exploration & Sensory Play',
    user: { firstName: 'Kavita', lastName: 'Joshi' },
    department: { name: 'Nursery Learning Center', code: 'NURS' },
  },
  {
    id: 'f-3',
    employeeId: 'DK-MONT-03',
    qualification: 'International Montessori Diploma',
    specialization: 'Phonetics, Early Math & Social Habits',
    user: { firstName: 'Ritu', lastName: 'Shah' },
    department: { name: 'Junior & Senior KG Wing', code: 'KG' },
  },
  {
    id: 'f-4',
    employeeId: 'DK-ACT-04',
    qualification: 'Master of Fine Arts (MFA), Child Nutritionist',
    specialization: 'Puppet Theatre, Clay Modeling & Creative Arts',
    user: { firstName: 'Meera', lastName: 'Patel' },
    department: { name: 'Activity & Day Care Center', code: 'DAYCARE' },
  },
];

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<FacultyMember[]>(dandelionEducators);

  useEffect(() => {
    async function loadFaculty() {
      try {
        const res = await apiClient<FacultyMember[]>('/public/faculty-directory');
        if (res.data && res.data.length > 0) {
          setFaculty(res.data);
        }
      } catch {
        // fallback
      }
    }
    loadFaculty();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      <div className="bg-[#FAFDF7] py-12 sm:py-16 border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <span className="text-xs font-bold text-[#76A136] uppercase tracking-widest block mb-2">
            Loving Mentors & Caregivers
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-[#1B365D]">Our Early Childhood </span>
            <span className="text-[#76A136]">Educators</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-600">
            Passionate teachers trained in early neurological development, empathetic listening, and Reggio Emilia methods.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#F0F7E8] border-2 border-[#76A136]/30 flex items-center justify-center text-[#76A136] mb-4 shadow-inner">
                <User className="w-10 h-10" />
              </div>

              <h3 className="font-extrabold text-base text-[#1B365D]">
                {member.user.firstName} {member.user.lastName}
              </h3>
              <p className="text-xs text-[#76A136] font-bold mt-0.5">
                {member.department?.name || 'Child Care Educator'}
              </p>

              <div className="w-full border-t border-slate-100 my-4" />

              <div className="text-xs text-slate-500 space-y-1.5 text-left w-full">
                <div className="flex items-start gap-1.5 text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-[#76A136] shrink-0 mt-0.5" />
                  <span className="leading-tight">{member.qualification || 'Educator'}</span>
                </div>
                {member.specialization && (
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <Heart className="w-3.5 h-3.5 text-[#E87722] shrink-0 mt-0.5" />
                    <span className="leading-tight">{member.specialization}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1">
                  <Award className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Faculty ID: {member.employeeId}</span>
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
