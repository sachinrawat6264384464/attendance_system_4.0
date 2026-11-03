'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import {
  Users,
  UserPlus,
  BookOpen,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react';

interface StudentItem {
  id: string;
  rollNumber?: string;
  class: { name: string };
  section: { name: string };
  student: {
    admissionNumber: string;
    guardianName?: string;
    guardianPhone?: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export default function CoordinatorDashboardPage() {
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Student Form
  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    admissionNumber: '',
    rollNumber: '',
    classId: '',
    sectionId: '',
    academicYearId: '',
    guardianName: '',
    guardianPhone: '',
  });

  const [classes, setClasses] = useState<any[]>([]);
  const [academicYears, setAcademicYears] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const [studentsRes, classesRes, yearsRes] = await Promise.all([
        apiClient<{ data: StudentItem[] }>('/users/students?pageSize=20').catch(() => null),
        apiClient<any[]>('/academics/classes').catch(() => null),
        apiClient<any[]>('/academics/years').catch(() => null),
      ]);

      if (studentsRes?.data?.data) {
        setStudents(studentsRes.data.data);
      }
      if (classesRes?.data) setClasses(classesRes.data);
      if (yearsRes?.data) {
        setAcademicYears(yearsRes.data);
        const currentYear = yearsRes.data.find((y: any) => y.isCurrent) || yearsRes.data[0];
        if (currentYear) {
          setStudentForm((prev) => ({ ...prev, academicYearId: currentYear.id }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient('/users/students', {
        method: 'POST',
        body: JSON.stringify(studentForm),
      });
      setMessage('Student enrolled successfully with temporary credentials.');
      setIsCreating(false);
      setStudentForm({
        firstName: '',
        lastName: '',
        email: '',
        admissionNumber: '',
        rollNumber: '',
        classId: '',
        sectionId: '',
        academicYearId: studentForm.academicYearId,
        guardianName: '',
        guardianPhone: '',
      });
      loadData();
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    }
  };

  const selectedClass = classes.find((c) => c.id === studentForm.classId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Operations & Rostering</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage student enrollments, teacher assignments, and timetable scheduling.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          <UserPlus className="w-4 h-4" />
          Enroll New Student
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-indigo-400 hover:text-indigo-600">×</button>
        </div>
      )}

      {/* Enroll Student Drawer / Card */}
      {isCreating && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-indigo-200 shadow-md">
          <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-600" />
            Quick Student Enrollment Form
          </h3>

          <form onSubmit={handleCreateStudent} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={studentForm.firstName}
                  onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })}
                  placeholder="e.g. Diya"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={studentForm.lastName}
                  onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })}
                  placeholder="e.g. Sharma"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  placeholder="diya.sharma@apexschool.edu"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Admission No. *</label>
                <input
                  type="text"
                  required
                  value={studentForm.admissionNumber}
                  onChange={(e) => setStudentForm({ ...studentForm, admissionNumber: e.target.value })}
                  placeholder="ADM-2026-002"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Roll Number</label>
                <input
                  type="text"
                  value={studentForm.rollNumber}
                  onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                  placeholder="02"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Class *</label>
                <select
                  required
                  value={studentForm.classId}
                  onChange={(e) => setStudentForm({ ...studentForm, classId: e.target.value, sectionId: '' })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Section *</label>
                <select
                  required
                  value={studentForm.sectionId}
                  onChange={(e) => setStudentForm({ ...studentForm, sectionId: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                  disabled={!selectedClass}
                >
                  <option value="">Select Section</option>
                  {selectedClass?.sections?.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm"
              >
                Complete Enrollment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Enrolled Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Active Enrolled Students Roster</h3>
              <p className="text-xs text-slate-500">Official student records for the academic year</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name / admission..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Admission No.</th>
                <th className="px-6 py-3.5">Student Name</th>
                <th className="px-6 py-3.5">Class & Section</th>
                <th className="px-6 py-3.5">Roll No.</th>
                <th className="px-6 py-3.5">Parent / Guardian</th>
                <th className="px-6 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                    No student records found. Click &quot;Enroll New Student&quot; to add records.
                  </td>
                </tr>
              ) : (
                students.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-3.5 font-bold text-indigo-600">
                      {enr.student.admissionNumber}
                    </td>
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      {enr.student.user.firstName} {enr.student.user.lastName}
                      <div className="text-[10px] text-slate-400 font-normal">{enr.student.user.email}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {enr.class.name} - {enr.section.name}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-slate-700">
                      {enr.rollNumber || '—'}
                    </td>
                    <td className="px-6 py-3.5">
                      {enr.student.guardianName || '—'}
                      <div className="text-[10px] text-slate-400">{enr.student.guardianPhone}</div>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

