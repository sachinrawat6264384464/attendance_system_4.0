'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import {
  CalendarCheck,
  Clock,
  Check,
  X,
  Send,
  AlertCircle,
  FileText,
  History,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users,
} from 'lucide-react';

interface StudentRosterItem {
  id: string; // enrollment id
  rollNumber: string;
  student: {
    id: string; // student profile id
    admissionNumber: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

interface SectionItem {
  id: string;
  name: string;
  _count?: {
    studentEnrollments: number;
  };
}

interface ClassItem {
  id: string;
  name: string;
  sections?: SectionItem[];
}

interface SubjectItem {
  id: string;
  name: string;
  code: string;
}

interface AcademicYearItem {
  id: string;
  name: string;
  isCurrent: boolean;
}

export default function TeacherAttendancePage() {
  // Attendance Metadata
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYearItem[]>([]);

  // Selection states
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [attendanceDate, setAttendanceDate] = useState('');

  // Roster & Attendance states
  const [roster, setRoster] = useState<StudentRosterItem[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'PRESENT' | 'ABSENT'>>({});
  const [submittingAttendance, setSubmittingAttendance] = useState(false);
  const [attendanceStatusMsg, setAttendanceStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [metadataLoading, setMetadataLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setAttendanceDate(today);
  }, []);

  const loadMetadata = async () => {
    setMetadataLoading(true);
    setLoadError(null);
    try {
      const [classesRes, subjectsRes, yearsRes] = await Promise.all([
        apiClient<ClassItem[]>('/academics/classes').catch((err) => {
          console.error('Failed to load classes:', err);
          return null;
        }),
        apiClient<SubjectItem[]>('/academics/subjects').catch(() => null),
        apiClient<AcademicYearItem[]>('/academics/years').catch(() => null),
      ]);

      if (classesRes?.data && Array.isArray(classesRes.data) && classesRes.data.length > 0) {
        setClasses(classesRes.data);
        // Find first class with students, or fallback to first class
        const classWithStudents =
          classesRes.data.find((c: any) =>
            c.sections?.some((s: any) => (s._count?.studentEnrollments || 0) > 0),
          ) || classesRes.data[0];

        setSelectedClassId(classWithStudents.id);
        const activeSec =
          classWithStudents.sections?.find(
            (s: any) => (s._count?.studentEnrollments || 0) > 0,
          ) || classWithStudents.sections?.[0];
        if (activeSec) {
          setSelectedSectionId(activeSec.id);
        }
      } else {
        setLoadError(
          'No academic classes found. If you are Principal or Coordinator, configure them in Coordinator Operations.',
        );
      }

      if (subjectsRes?.data && Array.isArray(subjectsRes.data) && subjectsRes.data.length > 0) {
        setSubjects(subjectsRes.data);
        setSelectedSubjectId(subjectsRes.data[0].id);
      }

      if (yearsRes?.data) setAcademicYears(yearsRes.data);
    } catch (err: any) {
      console.error(err);
      setLoadError(err?.message || 'Failed to connect to backend server. Please check connection.');
    } finally {
      setMetadataLoading(false);
    }
  };

  useEffect(() => {
    loadMetadata();
  }, []);

  // Fetch enrolled students when class & section change
  useEffect(() => {
    if (!selectedClassId || !selectedSectionId) return;

    async function loadStudents() {
      try {
        const res = await apiClient<any>(
          `/users/students?classId=${selectedClassId}&sectionId=${selectedSectionId}&pageSize=100`,
        );
        const rawList: StudentRosterItem[] = Array.isArray(res?.data)
          ? res.data
          : (res?.data as any)?.data || [];

        setRoster(rawList);
        setCurrentPage(1);

        // DEFAULT TO PRESENT: Every student defaults to 'PRESENT'
        const initialMap: Record<string, 'PRESENT' | 'ABSENT'> = {};
        rawList.forEach((item) => {
          if (item?.student?.id) {
            initialMap[item.student.id] = 'PRESENT';
          }
        });
        setAttendanceMap(initialMap);
      } catch (err) {
        console.error(err);
      }
    }
    loadStudents();
  }, [selectedClassId, selectedSectionId]);

  // Set student status directly (Present or Absent circle clicked)
  const handleSetStatus = (studentProfileId: string, status: 'PRESENT' | 'ABSENT') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentProfileId]: status,
    }));
  };

  const handleMarkAll = (status: 'PRESENT' | 'ABSENT') => {
    const updated: Record<string, 'PRESENT' | 'ABSENT'> = {};
    roster.forEach((r) => {
      updated[r.student.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSubmitAttendance = async () => {
    const currentYear = academicYears.find((y) => y.isCurrent) || academicYears[0];
    if (!currentYear) {
      setAttendanceStatusMsg({ type: 'error', text: 'Error: No active academic year found in database.' });
      return;
    }

    setSubmittingAttendance(true);
    setAttendanceStatusMsg(null);

    const records = roster.map((item) => ({
      studentId: item.student.id,
      status: attendanceMap[item.student.id] || 'PRESENT',
    }));

    try {
      await apiClient('/attendance/submit', {
        method: 'POST',
        body: JSON.stringify({
          academicYearId: currentYear.id,
          classId: selectedClassId,
          sectionId: selectedSectionId,
          subjectId: selectedSubjectId,
          date: attendanceDate,
          periodNumber: Number(selectedPeriod),
          records,
        }),
      });

      setAttendanceStatusMsg({
        type: 'success',
        text: `Attendance for ${records.length} students submitted and locked successfully.`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      setAttendanceStatusMsg({ type: 'error', text: `Error: ${message}` });
    } finally {
      setSubmittingAttendance(false);
    }
  };

  const currentClassObj = classes.find((c) => c.id === selectedClassId);
  const presentCount = Object.values(attendanceMap).filter((s) => s === 'PRESENT').length;
  const absentCount = Object.values(attendanceMap).filter((s) => s === 'ABSENT').length;

  // Pagination calculation
  const totalPages = Math.ceil(roster.length / pageSize) || 1;
  const paginatedRoster = roster.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-[#0D2056] tracking-tight">
              Teacher Attendance Marking Pad
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-[#76A136] text-white text-[10px] font-black uppercase tracking-wider">
              Live Session
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
            Mark period-level attendance with one-click circle toggles (✓ Present / ✕ Absent).
          </p>
        </div>

        {/* Quick Shortcut Buttons to History & Assignments */}
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/attendance-logs"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
          >
            <History className="w-3.5 h-3.5 text-[#0D2056]" />
            <span>Attendance Logs</span>
          </Link>

          <Link
            href="/dashboard/assignments"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0D2056] border border-blue-200 text-xs font-bold transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Assignments Vault</span>
          </Link>
        </div>
      </div>

      {loadError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{loadError}</span>
          </div>
          <button
            onClick={loadMetadata}
            className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs hover:bg-rose-700 transition"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* 2. Controls & Filters (Paired 2-by-2 on Mobile) */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        {/* Class Selector */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
            Class Grade
          </label>
          <select
            value={selectedClassId}
            onChange={(e) => {
              const newClassId = e.target.value;
              setSelectedClassId(newClassId);
              const cls = classes.find((c: any) => c.id === newClassId);
              if (cls?.sections?.[0]) {
                const firstWithStudents =
                  cls.sections.find((s: any) => (s._count?.studentEnrollments || 0) > 0) ||
                  cls.sections[0];
                setSelectedSectionId(firstWithStudents.id);
              }
            }}
            className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#0D2056] focus:outline-hidden transition cursor-pointer"
          >
            {classes.length === 0 && <option value="">No Classes Loaded</option>}
            {classes.map((c: any) => {
              const totalStudents =
                c.sections?.reduce(
                  (sum: number, s: any) => sum + (s._count?.studentEnrollments || 0),
                  0,
                ) || 0;
              return (
                <option key={c.id} value={c.id} className="text-slate-900 font-bold bg-white">
                  {c.name} {totalStudents > 0 ? `(${totalStudents})` : '(0)'}
                </option>
              );
            })}
          </select>
        </div>

        {/* Section Selector */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
            Section
          </label>
          <select
            value={selectedSectionId}
            onChange={(e) => setSelectedSectionId(e.target.value)}
            className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#0D2056] focus:outline-hidden transition cursor-pointer"
          >
            {(!currentClassObj?.sections || currentClassObj.sections.length === 0) && (
              <option value="">No Sections</option>
            )}
            {currentClassObj?.sections?.map((s: any) => (
              <option key={s.id} value={s.id} className="text-slate-900 font-bold bg-white">
                Section {s.name}{' '}
                {s._count?.studentEnrollments !== undefined
                  ? `(${s._count.studentEnrollments})`
                  : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selector */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
            Subject
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#0D2056] focus:outline-hidden transition cursor-pointer"
          >
            {subjects.length === 0 && <option value="">No Subjects</option>}
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id} className="text-slate-900 font-bold bg-white">
                {sub.name} ({sub.code})
              </option>
            ))}
          </select>
        </div>

        {/* Period Selector */}
        <div>
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
            Period
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(Number(e.target.value))}
            className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#0D2056] focus:outline-hidden transition cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
              <option key={p} value={p} className="text-slate-900 font-bold bg-white">
                Period {p}
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
            Date
          </label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#0D2056] focus:outline-hidden transition cursor-pointer"
          />
        </div>
      </div>

      {/* 3. Student Attendance Marking Pad */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Attendance Marking Grid
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0D2056] text-[10px] font-black uppercase">
                {currentClassObj?.name || 'Class'} • Sec{' '}
                {currentClassObj?.sections?.find((s) => s.id === selectedSectionId)?.name || 'A'}
              </span>
            </div>
            {/* Live Tally Badges */}
            <div className="flex items-center gap-3 mt-1.5 text-xs font-bold">
              <span className="text-slate-500">
                Total: <strong className="text-slate-900">{roster.length}</strong>
              </span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                Present: <strong>{presentCount}</strong>
              </span>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                <X className="w-3 h-3 stroke-[3]" />
                Absent: <strong>{absentCount}</strong>
              </span>
            </div>
          </div>

          {/* Mass Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleMarkAll('PRESENT')}
              className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition cursor-pointer flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>All Present</span>
            </button>
            <button
              type="button"
              onClick={() => handleMarkAll('ABSENT')}
              className="px-3 py-1.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 text-xs font-bold hover:bg-rose-100 transition cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5 stroke-[3]" />
              <span>All Absent</span>
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 sm:px-6 py-3.5 w-16">Roll</th>
                <th className="px-4 sm:px-6 py-3.5">Student Name</th>
                <th className="px-4 sm:px-6 py-3.5 hidden sm:table-cell">Admission No.</th>
                <th className="px-4 sm:px-6 py-3.5 text-right">Attendance Circles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {roster.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <p className="text-sm font-bold text-slate-700">
                        No students enrolled in {currentClassObj?.name || 'this class'} (Section{' '}
                        {currentClassObj?.sections?.find((s) => s.id === selectedSectionId)?.name || 'A'}
                        ).
                      </p>
                      <p className="text-xs text-slate-500">
                        Switch to an active class to mark attendance:
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        {classes
                          .filter((c: any) =>
                            c.sections?.some((s: any) => (s._count?.studentEnrollments || 0) > 0),
                          )
                          .map((c: any) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setSelectedClassId(c.id);
                                const sec =
                                  c.sections?.find(
                                    (s: any) => (s._count?.studentEnrollments || 0) > 0,
                                  ) || c.sections?.[0];
                                if (sec) setSelectedSectionId(sec.id);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0D2056] text-xs font-bold border border-blue-200 transition"
                            >
                              Switch to {c.name}
                            </button>
                          ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedRoster.map((item) => {
                  const status = attendanceMap[item.student.id] || 'PRESENT';
                  const isPresent = status === 'PRESENT';
                  const isAbsent = status === 'ABSENT';

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      {/* Roll Number */}
                      <td className="px-4 sm:px-6 py-3.5 font-mono font-bold text-slate-800">
                        {item.rollNumber || '—'}
                      </td>

                      {/* Student Name */}
                      <td className="px-4 sm:px-6 py-3.5">
                        <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                          {item.student.user.firstName} {item.student.user.lastName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono sm:hidden">
                          {item.student.admissionNumber}
                        </span>
                      </td>

                      {/* Admission Number */}
                      <td className="px-4 sm:px-6 py-3.5 font-mono text-slate-500 hidden sm:table-cell text-xs">
                        {item.student.admissionNumber}
                      </td>

                      {/* CIRCLE BUTTONS: Present (Tick) & Absent (Cross) */}
                      <td className="px-4 sm:px-6 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2.5">
                          {/* Present Circle Button (Tick ✓) */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(item.student.id, 'PRESENT')}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              isPresent
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-110 ring-2 ring-emerald-300'
                                : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                            }`}
                            title="Mark Present (✓)"
                            aria-label={`Mark ${item.student.user.firstName} Present`}
                          >
                            <Check className="w-5 h-5 stroke-[3]" />
                          </button>

                          {/* Absent Circle Button (Cross ✕) */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(item.student.id, 'ABSENT')}
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              isAbsent
                                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-110 ring-2 ring-rose-300'
                                : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600'
                            }`}
                            title="Mark Absent (✕)"
                            aria-label={`Mark ${item.student.user.firstName} Absent`}
                          >
                            <X className="w-5 h-5 stroke-[3]" />
                          </button>

                          {/* Status Pill Badge */}
                          <span
                            className={`hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider min-w-[70px] text-center ${
                              isPresent
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination Toolbar */}
        {roster.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
            <div className="text-xs text-slate-500 font-semibold">
              Showing{' '}
              <strong className="text-slate-800">
                {(currentPage - 1) * pageSize + 1}
              </strong>{' '}
              to{' '}
              <strong className="text-slate-800">
                {Math.min(currentPage * pageSize, roster.length)}
              </strong>{' '}
              of <strong className="text-slate-800">{roster.length}</strong> Enrolled Students
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  type="button"
                  onClick={() => setCurrentPage(pg)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition ${
                    currentPage === pg
                      ? 'bg-[#0D2056] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 5. Finalize & Submit Button Strip */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Period attendance once submitted is locked according to institutional policy.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {attendanceStatusMsg && (
              <span
                className={`text-xs font-bold ${
                  attendanceStatusMsg.type === 'success' ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {attendanceStatusMsg.text}
              </span>
            )}

            <button
              type="button"
              disabled={submittingAttendance || roster.length === 0}
              onClick={handleSubmitAttendance}
              className="w-full sm:w-auto px-6 py-3 bg-[#0D2056] hover:bg-[#152a48] text-white rounded-xl font-bold text-xs shadow-md hover:shadow-lg disabled:opacity-50 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {submittingAttendance ? 'Submitting & Locking...' : 'Finalize & Submit Attendance'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
