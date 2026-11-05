'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import {
  Clock,
  Check,
  X,
  PlusCircle,
  Send,
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

interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  dueDate: string;
  maxMarks: number;
  subject?: { name: string };
  class?: { name: string };
  section?: { name: string };
  submissions?: Array<{ id: string }>;
}

export default function TeacherDashboardPage() {
  // Active view: 'attendance' or 'assignments'
  const [activeTab, setActiveTab] = useState<'attendance' | 'assignments'>('attendance');

  // Attendance states
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYearItem[]>([]);

  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [attendanceDate, setAttendanceDate] = useState('');

  const [roster, setRoster] = useState<StudentRosterItem[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'PRESENT' | 'ABSENT' | 'LATE'>>({});
  const [submittingAttendance, setSubmittingAttendance] = useState(false);
  const [attendanceStatusMsg, setAttendanceStatusMsg] = useState<string | null>(null);

  // Assignment states
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [assignmentStatusMsg, setAssignmentStatusMsg] = useState<string | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    description: '',
    instructions: '',
    dueDate: '',
    maxMarks: 100,
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16);
    setAttendanceDate(today);
    setAssignmentForm((prev) => ({ ...prev, dueDate: nextWeek }));
  }, []);

  const [metadataLoading, setMetadataLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadMetadata = async () => {
    setMetadataLoading(true);
    setLoadError(null);
    try {
      const [classesRes, subjectsRes, yearsRes, assignmentsRes] = await Promise.all([
        apiClient<ClassItem[]>('/academics/classes').catch((err) => {
          console.error('Failed to load classes:', err);
          return null;
        }),
        apiClient<SubjectItem[]>('/academics/subjects').catch(() => null),
        apiClient<AcademicYearItem[]>('/academics/years').catch(() => null),
        apiClient<AssignmentItem[]>('/assignments').catch(() => null),
      ]);

      if (classesRes?.data && Array.isArray(classesRes.data) && classesRes.data.length > 0) {
        setClasses(classesRes.data);
        // Find the first class that has students, or default to the first class
        const classWithStudents = classesRes.data.find((c: any) =>
          c.sections?.some((s: any) => (s._count?.studentEnrollments || 0) > 0)
        ) || classesRes.data[0];

        setSelectedClassId(classWithStudents.id);
        const activeSec = classWithStudents.sections?.find((s: any) => (s._count?.studentEnrollments || 0) > 0) || classWithStudents.sections?.[0];
        if (activeSec) {
          setSelectedSectionId(activeSec.id);
        }
      } else {
        setLoadError('No academic classes found. If you are Principal or Coordinator, add them in Coordinator Operations.');
      }
      if (subjectsRes?.data && Array.isArray(subjectsRes.data) && subjectsRes.data.length > 0) {
        setSubjects(subjectsRes.data);
        setSelectedSubjectId(subjectsRes.data[0].id);
      }
      if (yearsRes?.data) setAcademicYears(yearsRes.data);
      if (assignmentsRes?.data) setAssignments(assignmentsRes.data);
    } catch (err: any) {
      console.error(err);
      setLoadError(err?.message || 'Failed to connect to backend server. Please check your connection.');
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
        // Default all to PRESENT
        const initialMap: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
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

  const handleToggleStatus = (studentProfileId: string) => {
    setAttendanceMap((prev) => {
      const current = prev[studentProfileId] || 'PRESENT';
      const next = current === 'PRESENT' ? 'ABSENT' : current === 'ABSENT' ? 'LATE' : 'PRESENT';
      return { ...prev, [studentProfileId]: next };
    });
  };

  const handleMarkAll = (status: 'PRESENT' | 'ABSENT') => {
    const updated: Record<string, 'PRESENT' | 'ABSENT' | 'LATE'> = {};
    roster.forEach((r) => {
      updated[r.student.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSubmitAttendance = async () => {
    const currentYear = academicYears.find((y) => y.isCurrent) || academicYears[0];
    if (!currentYear) {
      setAttendanceStatusMsg('Error: No active academic year found.');
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

      setAttendanceStatusMsg('Attendance submitted and finalized successfully. Record is locked.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      setAttendanceStatusMsg(`Error: ${message}`);
    } finally {
      setSubmittingAttendance(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = academicYears.find((y) => y.isCurrent) || academicYears[0];
    if (!currentYear) return;

    try {
      await apiClient('/assignments', {
        method: 'POST',
        body: JSON.stringify({
          ...assignmentForm,
          classId: selectedClassId,
          sectionId: selectedSectionId,
          subjectId: selectedSubjectId,
          academicYearId: currentYear.id,
        }),
      });
      setShowCreateAssignment(false);
      setAssignmentStatusMsg('Assignment published to students successfully!');
      // Reload assignments
      const res = await apiClient<AssignmentItem[]>('/assignments');
      if (res.data) setAssignments(res.data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Creation failed';
      setAssignmentStatusMsg(`Error: ${message}`);
    }
  };

  const currentClassObj = classes.find((c) => c.id === selectedClassId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Teacher Workspace</h1>
          <p className="text-xs text-slate-500 mt-1">
            Period-level attendance marking, course assignments, and student submission evaluations.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-lg transition ${activeTab === 'attendance'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Mark Period Attendance
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 rounded-lg transition ${activeTab === 'assignments'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            Assignments & Coursework
          </button>
        </div>
      </div>

      {loadError && (
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-between">
          <span>⚠️ {loadError}</span>
          <button
            onClick={() => loadMetadata()}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
          >
            Retry Loading
          </button>
        </div>
      )}

      {attendanceStatusMsg && (
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold flex items-center justify-between">
          <span>{attendanceStatusMsg}</span>
          <button onClick={() => setAttendanceStatusMsg(null)} className="text-indigo-400">×</button>
        </div>
      )}

      {/* ---------------- ATTENDANCE TAB ---------------- */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Controls Bar (Paired 2-by-2 on mobile) */}
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Class</label>
              <select
                value={selectedClassId}
                onChange={(e) => {
                  const newClassId = e.target.value;
                  setSelectedClassId(newClassId);
                  const cls = classes.find((c: any) => c.id === newClassId);
                  if (cls?.sections?.[0]) {
                    const firstWithStudents = cls.sections.find((s: any) => (s._count?.studentEnrollments || 0) > 0) || cls.sections[0];
                    setSelectedSectionId(firstWithStudents.id);
                  }
                }}
                className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#1B365D] focus:outline-hidden transition cursor-pointer"
              >
                {classes.length === 0 && <option value="">No Classes Loaded</option>}
                {classes.map((c: any) => {
                  const totalStudents = c.sections?.reduce((sum: number, s: any) => sum + (s._count?.studentEnrollments || 0), 0) || 0;
                  return (
                    <option key={c.id} value={c.id} className="text-slate-900 font-bold bg-white">
                      {c.name} {totalStudents > 0 ? `(${totalStudents})` : '(0)'}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Section</label>
              <select
                value={selectedSectionId}
                onChange={(e) => setSelectedSectionId(e.target.value)}
                className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#1B365D] focus:outline-hidden transition cursor-pointer"
              >
                {(!currentClassObj?.sections || currentClassObj.sections.length === 0) && (
                  <option value="">No Sections</option>
                )}
                {currentClassObj?.sections?.map((s: any) => (
                  <option key={s.id} value={s.id} className="text-slate-900 font-bold bg-white">
                    Section {s.name} {s._count?.studentEnrollments !== undefined ? `(${s._count.studentEnrollments})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Subject</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#1B365D] focus:outline-hidden transition cursor-pointer"
              >
                {subjects.length === 0 && <option value="">No Subjects</option>}
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id} className="text-slate-900 font-bold bg-white">{sub.name} ({sub.code})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#1B365D] focus:outline-hidden transition cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
                  <option key={p} value={p} className="text-slate-900 font-bold bg-white">Period {p}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">Date</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-2.5 sm:px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-xs shadow-2xs focus:border-[#1B365D] focus:outline-hidden transition cursor-pointer"
              />
            </div>
          </div>

          {/* Student Roster Pad */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Enrolled Students Attendance Pad</h3>
                <p className="text-xs text-slate-500">
                  Click on student status badge to toggle between PRESENT, ABSENT, and LATE
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMarkAll('PRESENT')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={() => handleMarkAll('ABSENT')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Mark All Absent
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5">Roll No.</th>
                    <th className="px-6 py-3.5">Student Name</th>
                    <th className="px-6 py-3.5">Admission Number</th>
                    <th className="px-6 py-3.5 text-right">Attendance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {roster.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="max-w-md mx-auto space-y-3">
                          <p className="text-sm font-bold text-slate-700">
                            No students enrolled in {currentClassObj?.name || 'this class'} (Section {currentClassObj?.sections?.find(s => s.id === selectedSectionId)?.name || 'A'}).
                          </p>
                          <p className="text-xs text-slate-500">
                            Switch to a class with active enrollments:
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                            {classes
                              .filter((c: any) => c.sections?.some((s: any) => (s._count?.studentEnrollments || 0) > 0))
                              .map((c: any) => (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedClassId(c.id);
                                    const sec = c.sections?.find((s: any) => (s._count?.studentEnrollments || 0) > 0) || c.sections?.[0];
                                    if (sec) setSelectedSectionId(sec.id);
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-[#1B365D] text-xs font-bold border border-indigo-200 transition"
                                >
                                  Switch to {c.name}
                                </button>
                              ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    roster.map((item) => {
                      const status = attendanceMap[item.student.id] || 'PRESENT';
                      const isPresent = status === 'PRESENT';
                      const isAbsent = status === 'ABSENT';
                      const isLate = status === 'LATE';

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="px-6 py-4 font-mono font-bold text-slate-800">
                            {item.rollNumber || '—'}
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">
                            {item.student.user.firstName} {item.student.user.lastName}
                          </td>
                          <td className="px-6 py-4 font-mono text-slate-500">
                            {item.student.admissionNumber}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(item.student.id)}
                              className={`px-4 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition ${isPresent
                                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                  : isAbsent
                                    ? 'bg-rose-500 text-white hover:bg-rose-600'
                                    : 'bg-amber-500 text-white hover:bg-amber-600'
                                }`}
                            >
                              {isPresent && <Check className="w-3.5 h-3.5" />}
                              {isAbsent && <X className="w-3.5 h-3.5" />}
                              {isLate && <Clock className="w-3.5 h-3.5" />}
                              <span>{status}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {roster.length > 0 && (
              <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Finalizing will lock this record. Any subsequent modification requires an audited Principal approval request.
                </div>
                <button
                  onClick={handleSubmitAttendance}
                  disabled={submittingAttendance}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {submittingAttendance ? 'Finalizing Session...' : 'Submit & Finalize Attendance'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- ASSIGNMENTS TAB ---------------- */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Active Coursework Assignments</h2>
            <button
              onClick={() => setShowCreateAssignment(!showCreateAssignment)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
            >
              <PlusCircle className="w-4 h-4" />
              Create Assignment
            </button>
          </div>

          {showCreateAssignment && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-indigo-200 shadow-md">
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                New Coursework Assignment
              </h3>
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">Title *</label>
                  <input
                    type="text"
                    required
                    value={assignmentForm.title}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                    placeholder="e.g. Activity: Phonics Sound Matching Worksheet"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">Due Date & Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={assignmentForm.dueDate}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">Max Marks</label>
                    <input
                      type="number"
                      required
                      value={assignmentForm.maxMarks}
                      onChange={(e) => setAssignmentForm({ ...assignmentForm, maxMarks: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={assignmentForm.description}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                    placeholder="Describe activity steps, sensory materials required, etc..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">Instructions</label>
                  <input
                    type="text"
                    value={assignmentForm.instructions}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, instructions: e.target.value })}
                    placeholder="e.g. Bring completed worksheet on Monday morning."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 focus:outline-none transition"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateAssignment(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm"
                  >
                    Publish Assignment
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Assignments List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {assignments.length === 0 ? (
              <div className="col-span-2 p-10 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                No assignments created yet. Click &quot;Create Assignment&quot; to publish coursework.
              </div>
            ) : (
              assignments.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase">
                        {item.subject?.name} • {item.class?.name}-{item.section?.name}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base mt-2">{item.title}</h4>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      {item.maxMarks} Marks
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {item.submissions?.length || 0} Submissions
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
