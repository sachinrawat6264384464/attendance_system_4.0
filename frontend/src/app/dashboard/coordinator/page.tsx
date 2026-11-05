'use client';

import React, { useEffect, useState, useMemo } from 'react';
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
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  Trash2,
  PlusCircle,
  School,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface StudentItem {
  id: string;
  rollNumber?: string;
  class: { id: string; name: string };
  section: { id: string; name: string };
  academicYear?: { name: string };
  student: {
    id: string;
    admissionNumber: string;
    guardianName?: string;
    guardianPhone?: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
    };
  };
}

interface TeacherItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  teacherProfile?: {
    id: string;
    employeeId: string;
    qualification?: string;
    specialization?: string;
    department?: { name: string };
    _count?: {
      teacherAllocations: number;
    };
  };
}

interface AllocationItem {
  id: string;
  teacher: {
    id: string;
    employeeId: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  class: { id: string; name: string };
  section: { id: string; name: string };
  subject: { id: string; name: string; code: string };
}

export default function CoordinatorDashboardPage() {
  // Navigation Tabs: 'students' | 'teachers' | 'allocations' | 'academics'
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'allocations' | 'academics'>('students');
  const [academicSubTab, setAcademicSubTab] = useState<'classes' | 'subjects' | 'timetable'>('classes');

  // Master Data
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [allocations, setAllocations] = useState<AllocationItem[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [academicYears, setAcademicYears] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('ALL');

  // Modal / Form States
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);
  const [isCreatingTeacher, setIsCreatingTeacher] = useState(false);
  const [isCreatingAllocation, setIsCreatingAllocation] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

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

  // Teacher Form
  const [teacherForm, setTeacherForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
    phone: '',
    qualification: '',
    specialization: '',
  });

  // Allocation Form
  const [allocationForm, setAllocationForm] = useState({
    teacherId: '', // TeacherProfile.id
    classId: '',
    sectionId: '',
    subjectId: '',
    academicYearId: '',
  });

  // Academic Structure Forms
  const [classForm, setClassForm] = useState({
    name: '',
    numericOrder: 1,
  });

  const [sectionForm, setSectionForm] = useState({
    classId: '',
    name: '',
    roomNumber: '',
  });

  const [subjectForm, setSubjectForm] = useState({
    name: '',
    code: '',
    isElective: false,
  });

  const [timetableForm, setTimetableForm] = useState({
    classId: '',
    sectionId: '',
    subjectId: '',
    teacherId: '',
    dayOfWeek: 1,
    periodNumber: 1,
    startTime: '08:30',
    endTime: '09:15',
  });

  const [activeTimetableSlots, setActiveTimetableSlots] = useState<any[]>([]);
  const [viewTimetableClassId, setViewTimetableClassId] = useState('');
  const [viewTimetableSectionId, setViewTimetableSectionId] = useState('');

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [studentsRes, teachersRes, allocRes, classesRes, subjectsRes, yearsRes] = await Promise.all([
        apiClient<any>('/users/students?pageSize=200').catch(() => null),
        apiClient<any>('/users/teachers?pageSize=50').catch(() => null),
        apiClient<any>('/allocations').catch(() => null),
        apiClient<any>('/academics/classes').catch(() => null),
        apiClient<any>('/academics/subjects').catch(() => null),
        apiClient<any>('/academics/years').catch(() => null),
      ]);

      // Extract Students Array
      const studentList: StudentItem[] = Array.isArray(studentsRes?.data)
        ? studentsRes.data
        : (studentsRes?.data as any)?.data || [];
      setStudents(studentList);

      // Extract Teachers Array
      const teacherList: TeacherItem[] = Array.isArray(teachersRes?.data)
        ? teachersRes.data
        : (teachersRes?.data as any)?.data || [];
      setTeachers(teacherList);

      // Extract Allocations Array
      const allocList: AllocationItem[] = Array.isArray(allocRes?.data)
        ? allocRes.data
        : (allocRes?.data as any)?.data || [];
      setAllocations(allocList);

      // Classes, Subjects, Years
      if (classesRes?.data) setClasses(classesRes.data);
      if (subjectsRes?.data) setSubjects(subjectsRes.data);
      if (yearsRes?.data) {
        setAcademicYears(yearsRes.data);
        const currentYear = yearsRes.data.find((y: any) => y.isCurrent) || yearsRes.data[0];
        if (currentYear) {
          setStudentForm((prev) => ({ ...prev, academicYearId: currentYear.id }));
          setAllocationForm((prev) => ({ ...prev, academicYearId: currentYear.id }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Class filter
      if (selectedClassFilter !== 'ALL' && s.class?.name !== selectedClassFilter) {
        return false;
      }
      // Section filter
      if (selectedSectionFilter !== 'ALL' && s.section?.name !== selectedSectionFilter) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        const fullName = `${s.student.user.firstName} ${s.student.user.lastName}`.toLowerCase();
        const adm = s.student.admissionNumber?.toLowerCase() || '';
        const roll = s.rollNumber?.toLowerCase() || '';
        const parent = s.student.guardianName?.toLowerCase() || '';
        if (!fullName.includes(query) && !adm.includes(query) && !roll.includes(query) && !parent.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [students, selectedClassFilter, selectedSectionFilter, search]);

  // Student Pagination
  const [studentCurrentPage, setStudentCurrentPage] = useState(1);
  const studentPageSize = 10;
  const totalStudentPages = Math.ceil(filteredStudents.length / studentPageSize) || 1;
  const paginatedStudents = useMemo(() => {
    return filteredStudents.slice(
      (studentCurrentPage - 1) * studentPageSize,
      studentCurrentPage * studentPageSize,
    );
  }, [filteredStudents, studentCurrentPage]);

  // Reset page when filters change
  useEffect(() => {
    setStudentCurrentPage(1);
  }, [selectedClassFilter, selectedSectionFilter, search]);

  // Handle Create Student
  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient('/users/students', {
        method: 'POST',
        body: JSON.stringify(studentForm),
      });
      setActionMessage({
        text: `Student ${studentForm.firstName} enrolled successfully with admission number ${studentForm.admissionNumber}.`,
        type: 'success',
      });
      setIsCreatingStudent(false);
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
      loadAllData();
    } catch (err: any) {
      setActionMessage({ text: `Failed to enroll student: ${err.message}`, type: 'error' });
    }
  };

  // Handle Create Teacher
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient('/users/teachers', {
        method: 'POST',
        body: JSON.stringify(teacherForm),
      });
      setActionMessage({
        text: `Teacher ${teacherForm.firstName} ${teacherForm.lastName} registered successfully with ID ${teacherForm.employeeId}.`,
        type: 'success',
      });
      setIsCreatingTeacher(false);
      setTeacherForm({
        firstName: '',
        lastName: '',
        email: '',
        employeeId: '',
        phone: '',
        qualification: '',
        specialization: '',
      });
      loadAllData();
    } catch (err: any) {
      setActionMessage({ text: `Failed to register teacher: ${err.message}`, type: 'error' });
    }
  };

  // Handle Create Allocation
  const handleCreateAllocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient('/allocations', {
        method: 'POST',
        body: JSON.stringify(allocationForm),
      });
      setActionMessage({
        text: 'Teacher allocated to class, section and subject successfully!',
        type: 'success',
      });
      setIsCreatingAllocation(false);
      loadAllData();
    } catch (err: any) {
      setActionMessage({ text: `Failed to create allocation: ${err.message}`, type: 'error' });
    }
  };

  // Handle Delete Allocation
  const handleDeleteAllocation = async (id: string) => {
    if (!confirm('Are you sure you want to remove this teacher allocation?')) return;
    try {
      await apiClient(`/allocations/${id}`, { method: 'DELETE' });
      setActionMessage({ text: 'Allocation removed successfully.', type: 'success' });
      loadAllData();
    } catch (err: any) {
      setActionMessage({ text: `Failed to delete allocation: ${err.message}`, type: 'error' });
    }
  };

  // ---------------- Academic Structure Handlers ----------------
  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient('/academics/classes', {
        method: 'POST',
        body: JSON.stringify({
          name: classForm.name,
          numericOrder: Number(classForm.numericOrder),
        }),
      });
      setActionMessage({ text: `Class ${classForm.name} created successfully!`, type: 'success' });
      setClassForm({ name: '', numericOrder: classes.length + 1 });
      loadAllData();
    } catch (err: any) {
      setActionMessage({ text: `Failed to create class: ${err.message}`, type: 'error' });
    }
  };

  const handleCreateSection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient('/academics/sections', {
        method: 'POST',
        body: JSON.stringify(sectionForm),
      });
      setActionMessage({ text: `Section ${sectionForm.name} created successfully!`, type: 'success' });
      setSectionForm({ classId: sectionForm.classId, name: '', roomNumber: '' });
      loadAllData();
    } catch (err: any) {
      setActionMessage({ text: `Failed to create section: ${err.message}`, type: 'error' });
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient('/academics/subjects', {
        method: 'POST',
        body: JSON.stringify(subjectForm),
      });
      setActionMessage({ text: `Subject ${subjectForm.name} created successfully!`, type: 'success' });
      setSubjectForm({ name: '', code: '', isElective: false });
      loadAllData();
    } catch (err: any) {
      setActionMessage({ text: `Failed to create subject: ${err.message}`, type: 'error' });
    }
  };

  const handleCreateTimetableSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = academicYears.find((y) => y.isCurrent) || academicYears[0];
    if (!currentYear) {
      setActionMessage({ text: 'No active academic year found.', type: 'error' });
      return;
    }
    try {
      await apiClient('/timetable/slots', {
        method: 'POST',
        body: JSON.stringify({
          ...timetableForm,
          academicYearId: currentYear.id,
          dayOfWeek: Number(timetableForm.dayOfWeek),
          periodNumber: Number(timetableForm.periodNumber),
        }),
      });
      setActionMessage({ text: `Timetable slot for Period ${timetableForm.periodNumber} scheduled!`, type: 'success' });
      if (viewTimetableClassId === timetableForm.classId && viewTimetableSectionId === timetableForm.sectionId) {
        loadTimetableSlots(timetableForm.classId, timetableForm.sectionId);
      }
    } catch (err: any) {
      setActionMessage({ text: `Failed to schedule slot: ${err.message}`, type: 'error' });
    }
  };

  const loadTimetableSlots = async (cId: string, sId: string) => {
    if (!cId || !sId) return;
    try {
      const res = await apiClient<any[]>(`/timetable/section?classId=${cId}&sectionId=${sId}`);
      if (res?.data) setActiveTimetableSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTimetableSlot = async (slotId: string) => {
    if (!confirm('Are you sure you want to delete this period slot?')) return;
    try {
      await apiClient(`/timetable/slots/${slotId}`, { method: 'DELETE' });
      setActionMessage({ text: 'Timetable slot removed successfully.', type: 'success' });
      loadTimetableSlots(viewTimetableClassId, viewTimetableSectionId);
    } catch (err: any) {
      setActionMessage({ text: `Failed to delete slot: ${err.message}`, type: 'error' });
    }
  };

  const selectedStudentClass = classes.find((c) => c.id === studentForm.classId);
  const selectedAllocClass = classes.find((c) => c.id === allocationForm.classId);
  const selectedSectionFormClass = classes.find((c) => c.id === sectionForm.classId);
  const selectedTimetableFormClass = classes.find((c) => c.id === timetableForm.classId);
  const selectedViewTimetableClass = classes.find((c) => c.id === viewTimetableClassId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <School className="w-3.5 h-3.5" />
            <span>Academic Coordinator Central Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B365D] tracking-tight">
            Academic Operations & Rostering
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage student enrollments, faculty profiles, subject allocations, and section rosters.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5">
          {activeTab === 'students' && (
            <button
              onClick={() => setIsCreatingStudent(!isCreatingStudent)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isCreatingStudent ? 'Close Form' : 'Enroll New Student'}</span>
            </button>
          )}

          {activeTab === 'teachers' && (
            <button
              onClick={() => setIsCreatingTeacher(!isCreatingTeacher)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#76A136] hover:bg-[#5e822a] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{isCreatingTeacher ? 'Close Form' : 'Register New Teacher'}</span>
            </button>
          )}

          {activeTab === 'allocations' && (
            <button
              onClick={() => setIsCreatingAllocation(!isCreatingAllocation)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7B1FA2] hover:bg-[#631884] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isCreatingAllocation ? 'Close Form' : 'Assign Teacher Course'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Notification Message */}
      {actionMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between ${
            actionMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {actionMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-slate-400 hover:text-slate-700 font-extrabold text-base px-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap bg-slate-200/90 p-1.5 rounded-2xl text-xs font-bold w-fit shadow-xs gap-1">
        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition cursor-pointer ${
            activeTab === 'students'
              ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Rosters ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('teachers')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition cursor-pointer ${
            activeTab === 'teachers'
              ? 'bg-white text-[#76A136] shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Faculty Directory ({teachers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('allocations')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition cursor-pointer ${
            activeTab === 'allocations'
              ? 'bg-white text-[#7B1FA2] shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Course Allocations ({allocations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('academics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition cursor-pointer ${
            activeTab === 'academics'
              ? 'bg-white text-[#D32F2F] shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Classes, Subjects & Bell Schedule</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. STUDENTS TAB                                          */}
      {/* ======================================================== */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Quick Student Enrollment Form */}
          {isCreatingStudent && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-indigo-200 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#1B365D]">Enroll New Student Record</h3>
                    <p className="text-xs text-slate-500">
                      Creates student login credentials and enrolls into target class & section.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingStudent(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentForm.firstName}
                      onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })}
                      placeholder="e.g. Diya"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentForm.lastName}
                      onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })}
                      placeholder="e.g. Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={studentForm.email}
                      onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                      placeholder="e.g. student.diya@apexschool.edu"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Admission No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentForm.admissionNumber}
                      onChange={(e) => setStudentForm({ ...studentForm, admissionNumber: e.target.value })}
                      placeholder="e.g. DK-2026-137"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      value={studentForm.rollNumber}
                      onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                      placeholder="e.g. 01"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Class Grade *
                    </label>
                    <select
                      required
                      value={studentForm.classId}
                      onChange={(e) => setStudentForm({ ...studentForm, classId: e.target.value, sectionId: '' })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                    >
                      <option value="" className="text-slate-500 font-normal">Select Class</option>
                      {classes.map((c) => (
                        <option key={c.id} value={c.id} className="text-slate-900 font-semibold bg-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Section *
                    </label>
                    <select
                      required
                      value={studentForm.sectionId}
                      onChange={(e) => setStudentForm({ ...studentForm, sectionId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer disabled:bg-slate-100"
                      disabled={!selectedStudentClass}
                    >
                      <option value="" className="text-slate-500 font-normal">Select Section</option>
                      {selectedStudentClass?.sections?.map((s: any) => (
                        <option key={s.id} value={s.id} className="text-slate-900 font-semibold bg-white">
                          Section {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      value={studentForm.guardianName}
                      onChange={(e) => setStudentForm({ ...studentForm, guardianName: e.target.value })}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Parent Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={studentForm.guardianPhone}
                      onChange={(e) => setStudentForm({ ...studentForm, guardianPhone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingStudent(false)}
                    className="px-5 py-2.5 border-2 border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    Complete Enrollment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Class Filter Badges & Search Toolbar */}
          <div className="bg-white p-5 rounded-3xl border-2 border-slate-200/80 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Class Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Class Filter:</span>
                {[
                  { key: 'ALL', label: 'All Classes', count: students.length },
                  { key: 'Playhouse', label: 'Playhouse', count: students.filter((s) => s.class?.name === 'Playhouse').length },
                  { key: 'Nursery', label: 'Nursery', count: students.filter((s) => s.class?.name === 'Nursery').length },
                  { key: 'Jr. Kg', label: 'Jr. Kg', count: students.filter((s) => s.class?.name === 'Jr. Kg').length },
                  { key: 'Sr. Kg', label: 'Sr. Kg', count: students.filter((s) => s.class?.name === 'Sr. Kg').length },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedClassFilter(item.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedClassFilter === item.key
                        ? 'bg-[#1B365D] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label} ({item.count})
                  </button>
                ))}
              </div>

              {/* Section Filter Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700">Section:</label>
                <select
                  value={selectedSectionFilter}
                  onChange={(e) => setSelectedSectionFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs focus:border-[#1B365D] focus:outline-none cursor-pointer"
                >
                  <option value="ALL">All Sections (A & B)</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search students by name, admission no, roll no, or parent details..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition"
              />
            </div>
          </div>

          {/* Enrolled Students Table */}
          <div className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1B365D] text-base">
                    Active Enrolled Students Roster
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Displaying {filteredStudents.length} verified enrolled students for academic session 2026-2027
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Admission No.</th>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Class & Section</th>
                    <th className="px-6 py-4">Roll No.</th>
                    <th className="px-6 py-4">Parent / Guardian</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        {loading ? 'Loading authentic student records...' : 'No enrolled student records found matching filter.'}
                      </td>
                    </tr>
                  ) : (
                    paginatedStudents.map((enr) => (
                      <tr key={enr.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-6 py-3.5 font-bold text-[#1B365D]">
                          {enr.student.admissionNumber}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-bold text-slate-900">
                            {enr.student.user.firstName} {enr.student.user.lastName}
                          </span>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {enr.student.user.email}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="px-3 py-1 rounded-lg bg-[#EBF3FA] text-[#1B365D] font-bold text-xs border border-indigo-100">
                            {enr.class.name} - Sec {enr.section.name}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 font-mono font-bold text-slate-800">
                          {enr.rollNumber || '—'}
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-semibold text-slate-900">{enr.student.guardianName || '—'}</span>
                          <div className="text-[11px] text-slate-500">{enr.student.guardianPhone || '—'}</div>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                            <Check className="w-3 h-3" />
                            Enrolled
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredStudents.length > 0 && (
              <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
                <div className="text-xs text-slate-500 font-semibold">
                  Showing{' '}
                  <strong className="text-slate-800">
                    {(studentCurrentPage - 1) * studentPageSize + 1}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-slate-800">
                    {Math.min(studentCurrentPage * studentPageSize, filteredStudents.length)}
                  </strong>{' '}
                  of <strong className="text-slate-800">{filteredStudents.length}</strong> Students
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={studentCurrentPage <= 1}
                    onClick={() => setStudentCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  {Array.from({ length: totalStudentPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => setStudentCurrentPage(pg)}
                      className={`w-8 h-8 rounded-xl text-xs font-black transition ${
                        studentCurrentPage === pg
                          ? 'bg-[#1B365D] text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {pg}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={studentCurrentPage >= totalStudentPages}
                    onClick={() => setStudentCurrentPage((p) => Math.min(totalStudentPages, p + 1))}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. FACULTY DIRECTORY TAB                                */}
      {/* ======================================================== */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          {/* Quick Teacher Registration Drawer */}
          {isCreatingTeacher && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-200 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#1B365D]">Register New Teacher / Faculty</h3>
                    <p className="text-xs text-slate-500">
                      Creates instructor account with default credentials and generates institutional profile.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingTeacher(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleCreateTeacher} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={teacherForm.firstName}
                      onChange={(e) => setTeacherForm({ ...teacherForm, firstName: e.target.value })}
                      placeholder="e.g. Priya"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={teacherForm.lastName}
                      onChange={(e) => setTeacherForm({ ...teacherForm, lastName: e.target.value })}
                      placeholder="e.g. Shah"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Employee Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={teacherForm.email}
                      onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                      placeholder="teacher.priya@apexschool.edu"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Employee ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={teacherForm.employeeId}
                      onChange={(e) => setTeacherForm({ ...teacherForm, employeeId: e.target.value })}
                      placeholder="e.g. EMP-T-106"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={teacherForm.phone}
                      onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                      placeholder="+91 98765 11223"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={teacherForm.qualification}
                      onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                      placeholder="e.g. M.A. Child Psychology, B.Ed."
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Specialization / Subject
                    </label>
                    <input
                      type="text"
                      value={teacherForm.specialization}
                      onChange={(e) => setTeacherForm({ ...teacherForm, specialization: e.target.value })}
                      placeholder="e.g. Early Literacy & Phonics"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTeacher(false)}
                    className="px-5 py-2.5 border-2 border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#76A136] hover:bg-[#5e822a] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    Register Teacher Profile
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Teacher Directory Cards Grid (Paired 2-by-2 on mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {teachers.map((t) => (
              <div
                key={t.id}
                className="bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-slate-200/80 shadow-xs hover:shadow-md transition space-y-2 sm:space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#1B365D] flex items-center justify-center font-extrabold text-lg">
                    {t.firstName[0]}
                    {t.lastName[0]}
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                    {t.teacherProfile?.employeeId || 'FACULTY'}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    {t.firstName} {t.lastName}
                  </h4>
                  <p className="text-xs text-[#76A136] font-bold mt-0.5">
                    {t.teacherProfile?.specialization || 'Early Childhood Educator'}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-[11px] truncate">{t.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{t.phone || '+91 98765 00000'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-500">
                      {t.teacherProfile?.qualification || 'ECCE Certified, B.Ed.'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Allocations
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold text-xs">
                    {allocations.filter((a) => a.teacher?.id === t.teacherProfile?.id).length} Active Classes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. COURSE ALLOCATIONS TAB                                */}
      {/* ======================================================== */}
      {activeTab === 'allocations' && (
        <div className="space-y-6">
          {/* Quick Course Allocation Drawer */}
          {isCreatingAllocation && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-purple-200 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7B1FA2] flex items-center justify-center font-bold">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#1B365D]">Assign Teacher to Class & Subject</h3>
                    <p className="text-xs text-slate-500">
                      Empowers instructor to mark attendance and manage assignments for this cohort.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingAllocation(false)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleCreateAllocation} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Select Teacher *
                    </label>
                    <select
                      required
                      value={allocationForm.teacherId}
                      onChange={(e) => setAllocationForm({ ...allocationForm, teacherId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-sm focus:border-[#7B1FA2] focus:ring-4 focus:ring-purple-100 focus:outline-none transition cursor-pointer"
                    >
                      <option value="" className="text-slate-500 font-normal">Choose Teacher</option>
                      {teachers
                        .filter((t) => t.teacherProfile?.id)
                        .map((t) => (
                          <option
                            key={t.teacherProfile!.id}
                            value={t.teacherProfile!.id}
                            className="text-slate-900 font-semibold bg-white"
                          >
                            {t.firstName} {t.lastName} ({t.teacherProfile?.employeeId})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Select Class *
                    </label>
                    <select
                      required
                      value={allocationForm.classId}
                      onChange={(e) => setAllocationForm({ ...allocationForm, classId: e.target.value, sectionId: '' })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-sm focus:border-[#7B1FA2] focus:ring-4 focus:ring-purple-100 focus:outline-none transition cursor-pointer"
                    >
                      <option value="" className="text-slate-500 font-normal">Choose Class</option>
                      {classes.map((c) => (
                        <option key={c.id} value={c.id} className="text-slate-900 font-semibold bg-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Select Section *
                    </label>
                    <select
                      required
                      value={allocationForm.sectionId}
                      onChange={(e) => setAllocationForm({ ...allocationForm, sectionId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-sm focus:border-[#7B1FA2] focus:ring-4 focus:ring-purple-100 focus:outline-none transition cursor-pointer disabled:bg-slate-100"
                      disabled={!selectedAllocClass}
                    >
                      <option value="" className="text-slate-500 font-normal">Choose Section</option>
                      {selectedAllocClass?.sections?.map((s: any) => (
                        <option key={s.id} value={s.id} className="text-slate-900 font-semibold bg-white">
                          Section {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Select Subject *
                    </label>
                    <select
                      required
                      value={allocationForm.subjectId}
                      onChange={(e) => setAllocationForm({ ...allocationForm, subjectId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-sm focus:border-[#7B1FA2] focus:ring-4 focus:ring-purple-100 focus:outline-none transition cursor-pointer"
                    >
                      <option value="" className="text-slate-500 font-normal">Choose Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id} className="text-slate-900 font-semibold bg-white">
                          {sub.name} ({sub.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingAllocation(false)}
                    className="px-5 py-2.5 border-2 border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#7B1FA2] hover:bg-[#631884] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    Confirm Course Assignment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Allocations Table */}
          <div className="bg-white rounded-3xl border-2 border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-[#1B365D] text-base">
                  Active Faculty Subject Allocations
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {allocations.length} authorized instructional assignments active in system
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Teacher Name & ID</th>
                    <th className="px-6 py-4">Assigned Subject</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">Section</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {allocations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                        No active allocations found. Click &quot;Assign Teacher Course&quot; to create one.
                      </td>
                    </tr>
                  ) : (
                    allocations.map((alloc) => (
                      <tr key={alloc.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-6 py-3.5">
                          <span className="font-bold text-slate-900">
                            {alloc.teacher.user.firstName} {alloc.teacher.user.lastName}
                          </span>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {alloc.teacher.employeeId} • {alloc.teacher.user.email}
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="font-bold text-[#1B365D]">{alloc.subject.name}</span>
                          <div className="text-[10px] text-slate-400 font-mono">{alloc.subject.code}</div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                            {alloc.class.name}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 font-bold text-slate-800">
                          Section {alloc.section.name}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteAllocation(alloc.id)}
                            className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                            title="Remove Allocation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. ACADEMIC STRUCTURE & TIMETABLE TAB                     */}
      {/* ======================================================== */}
      {activeTab === 'academics' && (
        <div className="space-y-8">
          {/* Sub Tab Switcher */}
          <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-bold w-fit">
            <button
              onClick={() => setAcademicSubTab('classes')}
              className={`px-4 py-2 rounded-lg transition ${
                academicSubTab === 'classes'
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classes & Sections ({classes.length})
            </button>
            <button
              onClick={() => setAcademicSubTab('subjects')}
              className={`px-4 py-2 rounded-lg transition ${
                academicSubTab === 'subjects'
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Subjects Master ({subjects.length})
            </button>
            <button
              onClick={() => {
                setAcademicSubTab('timetable');
                if (classes.length > 0 && !viewTimetableClassId) {
                  const first = classes[0];
                  setViewTimetableClassId(first.id);
                  if (first.sections?.[0]) {
                    setViewTimetableSectionId(first.sections[0].id);
                    loadTimetableSlots(first.id, first.sections[0].id);
                  }
                }
              }}
              className={`px-4 py-2 rounded-lg transition ${
                academicSubTab === 'timetable'
                  ? 'bg-white text-[#1B365D] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bell Schedule & Timetable
            </button>
          </div>

          {/* 4.A CLASSES & SECTIONS */}
          {academicSubTab === 'classes' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Create Class Form */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200/90 shadow-sm">
                  <h3 className="text-base font-extrabold text-[#1B365D] mb-1">Create Class Grade</h3>
                  <p className="text-xs text-slate-500 mb-5">
                    Define new academic grades (e.g., Playhouse, Nursery, Class 1st to 8th).
                  </p>
                  <form onSubmit={handleCreateClass} className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Class Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={classForm.name}
                        onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                        placeholder="e.g. Class 1st, LKG, UKG"
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Grade Numeric Order *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        required
                        value={classForm.numericOrder}
                        onChange={(e) => setClassForm({ ...classForm, numericOrder: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                      + Add Class Grade
                    </button>
                  </form>
                </div>

                {/* Create Section Form */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200/90 shadow-sm">
                  <h3 className="text-base font-extrabold text-[#1B365D] mb-1">Create Section</h3>
                  <p className="text-xs text-slate-500 mb-5">
                    Assign a division/section to an existing class grade level.
                  </p>
                  <form onSubmit={handleCreateSection} className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Target Class *
                      </label>
                      <select
                        required
                        value={sectionForm.classId}
                        onChange={(e) => setSectionForm({ ...sectionForm, classId: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                      >
                        <option value="">Select Target Class</option>
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} (Order: {c.numericOrder})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                          Section Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={sectionForm.name}
                          onChange={(e) => setSectionForm({ ...sectionForm, name: e.target.value })}
                          placeholder="e.g. A, B, Rose"
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                          Room Number
                        </label>
                        <input
                          type="text"
                          value={sectionForm.roomNumber}
                          onChange={(e) => setSectionForm({ ...sectionForm, roomNumber: e.target.value })}
                          placeholder="e.g. Room 101"
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!sectionForm.classId}
                      className="w-full py-3 bg-[#76A136] hover:bg-[#5e822a] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
                    >
                      + Add Section
                    </button>
                  </form>
                </div>
              </div>

              {/* Classes & Sections Roster */}
              <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-7">
                <h3 className="text-base font-extrabold text-[#1B365D] mb-1">
                  Institutional Classes & Sections Directory
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Overview of all registered grades, classroom divisions, and live enrolled student tallies.
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5">
                  {classes.map((cls) => {
                    const totalStudentsInClass =
                      cls.sections?.reduce(
                        (sum: number, s: any) => sum + (s._count?.studentEnrollments || 0),
                        0,
                      ) || 0;
                    return (
                      <div
                        key={cls.id}
                        className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#1B365D] transition group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-base font-black text-[#1B365D]">{cls.name}</h4>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            Grade Order {cls.numericOrder}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-emerald-700 mb-4">
                          {totalStudentsInClass} Active Students Enrolled
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                            Active Sections ({cls.sections?.length || 0})
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {cls.sections?.map((sec: any) => (
                              <span
                                key={sec.id}
                                className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                              >
                                Sec {sec.name}{' '}
                                <span className="text-slate-400 font-normal">
                                  ({sec._count?.studentEnrollments || 0})
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 4.B SUBJECTS MASTER */}
          {academicSubTab === 'subjects' && (
            <div className="space-y-8">
              {/* Add Subject Form */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200/90 shadow-sm max-w-xl">
                <h3 className="text-base font-extrabold text-[#1B365D] mb-1">Create New Subject</h3>
                <p className="text-xs text-slate-500 mb-5">
                  Define academic curriculum subjects and corresponding codes.
                </p>
                <form onSubmit={handleCreateSubject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Subject Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={subjectForm.name}
                      onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                      placeholder="e.g. General English, Mathematics, Hindi"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Subject Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={subjectForm.code}
                      onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value.toUpperCase() })}
                      placeholder="e.g. ENG-01, MATH-01, HIN-01"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm uppercase focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isElectiveCheck"
                      checked={subjectForm.isElective}
                      onChange={(e) => setSubjectForm({ ...subjectForm, isElective: e.target.checked })}
                      className="w-4 h-4 text-[#1B365D] rounded border-slate-300 cursor-pointer"
                    />
                    <label htmlFor="isElectiveCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Elective / Optional Subject
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    + Add Subject
                  </button>
                </form>
              </div>

              {/* Subjects Table */}
              <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-base font-extrabold text-[#1B365D]">Subject Curriculum Directory</h3>
                  <p className="text-xs text-slate-500">
                    All authorized subjects taught across classes at Om Public School Dabra.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-3.5">Subject Code</th>
                        <th className="px-6 py-3.5">Subject Name</th>
                        <th className="px-6 py-3.5">Curriculum Type</th>
                        <th className="px-6 py-3.5">Department</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {subjects.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-6 py-3.5 font-mono font-bold text-slate-900">{sub.code}</td>
                          <td className="px-6 py-3.5 font-bold text-[#1B365D]">{sub.name}</td>
                          <td className="px-6 py-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                sub.isElective
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {sub.isElective ? 'Elective' : 'Core'}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-slate-500">
                            {sub.department?.name || 'Primary & Middle Education'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 4.C BELL SCHEDULE & TIMETABLE SLOTS */}
          {academicSubTab === 'timetable' && (
            <div className="space-y-8">
              {/* Schedule Period Slot Form */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200/90 shadow-sm">
                <h3 className="text-base font-extrabold text-[#1B365D] mb-1">
                  Schedule Class Period Slot
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Allocate subject teacher and time bell for specific class and section period.
                </p>

                <form onSubmit={handleCreateTimetableSlot} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Class *
                      </label>
                      <select
                        required
                        value={timetableForm.classId}
                        onChange={(e) => {
                          const cId = e.target.value;
                          const cls = classes.find((c) => c.id === cId);
                          setTimetableForm({
                            ...timetableForm,
                            classId: cId,
                            sectionId: cls?.sections?.[0]?.id || '',
                          });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                      >
                        <option value="">Select Class</option>
                        {classes.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Section *
                      </label>
                      <select
                        required
                        value={timetableForm.sectionId}
                        onChange={(e) => setTimetableForm({ ...timetableForm, sectionId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                      >
                        <option value="">Select Section</option>
                        {selectedTimetableFormClass?.sections?.map((s: any) => (
                          <option key={s.id} value={s.id}>
                            Section {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Subject *
                      </label>
                      <select
                        required
                        value={timetableForm.subjectId}
                        onChange={(e) => setTimetableForm({ ...timetableForm, subjectId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Faculty *
                      </label>
                      <select
                        required
                        value={timetableForm.teacherId}
                        onChange={(e) => setTimetableForm({ ...timetableForm, teacherId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map((t) => (
                          <option key={t.id} value={t.teacherProfile?.id || ''}>
                            {t.firstName} {t.lastName} ({t.teacherProfile?.employeeId || 'ID'})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Day of Week *
                      </label>
                      <select
                        value={timetableForm.dayOfWeek}
                        onChange={(e) => setTimetableForm({ ...timetableForm, dayOfWeek: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                      >
                        <option value={1}>Monday</option>
                        <option value={2}>Tuesday</option>
                        <option value={3}>Wednesday</option>
                        <option value={4}>Thursday</option>
                        <option value={5}>Friday</option>
                        <option value={6}>Saturday</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Period Slot *
                      </label>
                      <select
                        value={timetableForm.periodNumber}
                        onChange={(e) => setTimetableForm({ ...timetableForm, periodNumber: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                          <option key={p} value={p}>
                            Period {p}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={timetableForm.startTime}
                        onChange={(e) => setTimetableForm({ ...timetableForm, startTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={timetableForm.endTime}
                        onChange={(e) => setTimetableForm({ ...timetableForm, endTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!timetableForm.classId || !timetableForm.sectionId || !timetableForm.subjectId || !timetableForm.teacherId}
                      className="px-6 py-3 bg-[#1B365D] hover:bg-[#152a48] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50"
                    >
                      + Save Period Schedule
                    </button>
                  </div>
                </form>
              </div>

              {/* View Section Schedule */}
              <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base font-extrabold text-[#1B365D]">Weekly Section Timetable Viewer</h3>
                    <p className="text-xs text-slate-500">
                      View all scheduled periods and assigners for the selected classroom.
                    </p>
                  </div>

                  {/* Filter selectors */}
                  <div className="flex items-center gap-3">
                    <select
                      value={viewTimetableClassId}
                      onChange={(e) => {
                        const cId = e.target.value;
                        setViewTimetableClassId(cId);
                        const cls = classes.find((c) => c.id === cId);
                        const sId = cls?.sections?.[0]?.id || '';
                        setViewTimetableSectionId(sId);
                        if (cId && sId) loadTimetableSlots(cId, sId);
                      }}
                      className="px-3.5 py-2 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs"
                    >
                      {classes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={viewTimetableSectionId}
                      onChange={(e) => {
                        const sId = e.target.value;
                        setViewTimetableSectionId(sId);
                        if (viewTimetableClassId && sId) loadTimetableSlots(viewTimetableClassId, sId);
                      }}
                      className="px-3.5 py-2 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-xs"
                    >
                      {selectedViewTimetableClass?.sections?.map((s: any) => (
                        <option key={s.id} value={s.id}>
                          Section {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-3.5">Day</th>
                        <th className="px-6 py-3.5">Period</th>
                        <th className="px-6 py-3.5">Time</th>
                        <th className="px-6 py-3.5">Subject</th>
                        <th className="px-6 py-3.5">Assigned Teacher</th>
                        <th className="px-6 py-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {activeTimetableSlots.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                            No timetable slots scheduled yet for this section. Use the form above to add periods.
                          </td>
                        </tr>
                      ) : (
                        activeTimetableSlots.map((slot) => {
                          const dayNames = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                          return (
                            <tr key={slot.id} className="hover:bg-slate-50/70 transition">
                              <td className="px-6 py-3.5 font-bold text-slate-800">{dayNames[slot.dayOfWeek]}</td>
                              <td className="px-6 py-3.5 font-bold text-indigo-700">Period {slot.periodNumber}</td>
                              <td className="px-6 py-3.5 font-mono text-slate-600">
                                {slot.startTime} - {slot.endTime}
                              </td>
                              <td className="px-6 py-3.5">
                                <span className="font-bold text-[#1B365D]">{slot.subject.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono ml-1.5">
                                  ({slot.subject.code})
                                </span>
                              </td>
                              <td className="px-6 py-3.5 font-bold text-slate-800">
                                {slot.teacher?.user?.firstName} {slot.teacher?.user?.lastName}
                              </td>
                              <td className="px-6 py-3.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTimetableSlot(slot.id)}
                                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                                  title="Delete Slot"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
