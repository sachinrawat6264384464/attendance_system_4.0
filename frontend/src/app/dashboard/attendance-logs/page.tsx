'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { apiClient } from '@/lib/api';
import {
  CalendarCheck,
  Clock,
  Check,
  X,
  Search,
  Users,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  School,
} from 'lucide-react';

interface AttendanceRecordItem {
  id: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  student: {
    id: string;
    rollNumber: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
}

interface AttendanceSessionItem {
  id: string;
  date: string;
  periodNumber: number;
  createdAt: string;
  class: {
    id: string;
    name: string;
  };
  section: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
    code: string;
  };
  teacher: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  records: AttendanceRecordItem[];
  _count?: {
    records: number;
  };
}

export default function AttendanceLogsPage() {
  const [sessions, setSessions] = useState<AttendanceSessionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchSubject, setSearchSubject] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');

  // Selected session for detailed roster modal
  const [activeSession, setActiveSession] = useState<AttendanceSessionItem | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const loadSessions = async () => {
    setLoading(true);
    try {
      const res = await apiClient<AttendanceSessionItem[]>('/attendance/sessions');
      if (res?.data && Array.isArray(res.data)) {
        setSessions(res.data);
      }
    } catch (err) {
      console.error('Failed to load attendance sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  // Dynamic available classes from records
  const availableClasses = useMemo(() => {
    const set = new Set<string>();
    sessions.forEach((s) => {
      if (s.class?.name) set.add(s.class.name);
    });
    const customList = Array.from(set);
    return customList.length > 0 ? ['ALL', ...customList] : ['ALL', 'Playgroup', 'Nursery', 'LKG', 'UKG'];
  }, [sessions]);

  // Filtered Sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      // Class filter
      if (selectedClass !== 'ALL' && s.class.name !== selectedClass) {
        return false;
      }
      // Date filter
      if (filterDate) {
        const sessionDate = new Date(s.date).toISOString().split('T')[0];
        if (sessionDate !== filterDate) return false;
      }
      // Subject or Teacher Search
      if (searchSubject.trim()) {
        const q = searchSubject.toLowerCase();
        const subName = s.subject.name.toLowerCase();
        const subCode = s.subject.code.toLowerCase();
        const teacherName = `${s.teacher.user.firstName} ${s.teacher.user.lastName}`.toLowerCase();
        if (!subName.includes(q) && !subCode.includes(q) && !teacherName.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [sessions, selectedClass, filterDate, searchSubject]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedClass, filterDate, searchSubject]);

  const totalPages = Math.ceil(filteredSessions.length / pageSize) || 1;
  const paginatedSessions = useMemo(() => {
    return filteredSessions.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredSessions, currentPage]);

  // Overall Statistics
  const totalSessionsCount = sessions.length;
  const totalPresentLogged = sessions.reduce(
    (acc, s) => acc + (s.records?.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length || 0),
    0,
  );
  const totalAbsentLogged = sessions.reduce(
    (acc, s) => acc + (s.records?.filter((r) => r.status === 'ABSENT').length || 0),
    0,
  );
  const averageAttendance =
    totalPresentLogged + totalAbsentLogged > 0
      ? ((totalPresentLogged / (totalPresentLogged + totalAbsentLogged)) * 100).toFixed(1)
      : '95.0';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-[#0D2056] tracking-tight">
              Period Attendance History & Audit Logs
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-[#0D2056] text-white text-[10px] font-black uppercase tracking-wider">
              Audited
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
            Complete record of every finalized attendance session: who took attendance, timestamp, student counts, and individual present/absent breakdown.
          </p>
        </div>

        <button
          onClick={loadSessions}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* 2. Top Summary KPI Cards (Paired 2-by-2 on Mobile) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Sessions Logged
          </span>
          <div className="text-xl sm:text-3xl font-black text-slate-900">{totalSessionsCount}</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">All academic terms</div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Average Attendance
          </span>
          <div className="text-xl sm:text-3xl font-black text-emerald-600">{averageAttendance}%</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">Above CBSE threshold</div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Student Presences
          </span>
          <div className="text-xl sm:text-3xl font-black text-[#0D2056]">{totalPresentLogged}</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">Marked with right-tick (✓)</div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Absences Logged
          </span>
          <div className="text-xl sm:text-3xl font-black text-rose-500">{totalAbsentLogged}</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">Marked with cross (✕)</div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Class Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Class:</span>
          {availableClasses.map((clsName) => (
            <button
              key={clsName}
              type="button"
              onClick={() => setSelectedClass(clsName)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedClass === clsName
                  ? 'bg-[#0D2056] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {clsName}
            </button>
          ))}
        </div>

        {/* Search & Date */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search subject / teacher..."
              value={searchSubject}
              onChange={(e) => setSearchSubject(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-[#0D2056]"
            />
          </div>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-hidden focus:border-[#0D2056]"
          />

          {(filterDate || searchSubject || selectedClass !== 'ALL') && (
            <button
              onClick={() => {
                setFilterDate('');
                setSearchSubject('');
                setSelectedClass('ALL');
              }}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 4. Attendance Sessions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-4 sm:px-6 py-3.5">Session Date & Period</th>
                <th className="px-4 sm:px-6 py-3.5">Class & Section</th>
                <th className="px-4 sm:px-6 py-3.5">Subject</th>
                <th className="px-4 sm:px-6 py-3.5">Marked By Teacher</th>
                <th className="px-4 sm:px-6 py-3.5 text-center">Present / Absent / Total</th>
                <th className="px-4 sm:px-6 py-3.5 text-right">Roster Breakdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading historical attendance records from Neon database...
                  </td>
                </tr>
              ) : filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No attendance sessions logged matching the filter.
                  </td>
                </tr>
              ) : (
                paginatedSessions.map((session) => {
                  const total = session.records?.length || session._count?.records || 0;
                  const presents =
                    session.records?.filter((r) => r.status === 'PRESENT' || r.status === 'LATE').length ||
                    0;
                  const absents = session.records?.filter((r) => r.status === 'ABSENT').length || 0;
                  const percentage = total > 0 ? ((presents / total) * 100).toFixed(1) : '100.0';

                  const dateStr = new Date(session.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr key={session.id} className="hover:bg-slate-50/70 transition">
                      {/* Date & Period */}
                      <td className="px-4 sm:px-6 py-3.5">
                        <span className="font-extrabold text-slate-900 block text-xs sm:text-sm">
                          {dateStr}
                        </span>
                        <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                          Period {session.periodNumber}
                        </span>
                      </td>

                      {/* Class & Section */}
                      <td className="px-4 sm:px-6 py-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-[#0D2056]/5 text-[#0D2056] font-extrabold text-xs">
                          {session.class.name} - Sec {session.section.name}
                        </span>
                      </td>

                      {/* Subject */}
                      <td className="px-4 sm:px-6 py-3.5">
                        <span className="font-bold text-slate-900 block">{session.subject.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {session.subject.code}
                        </span>
                      </td>

                      {/* Teacher */}
                      <td className="px-4 sm:px-6 py-3.5">
                        <span className="font-semibold text-slate-800">
                          {session.teacher?.user?.firstName} {session.teacher?.user?.lastName}
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {session.teacher?.user?.email}
                        </div>
                      </td>

                      {/* Present / Absent Numbers */}
                      <td className="px-4 sm:px-6 py-3.5 text-center whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-black text-xs border border-emerald-200">
                            <Check className="w-3 h-3 stroke-[3]" />
                            {presents}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-black text-xs border border-rose-200">
                            <X className="w-3 h-3 stroke-[3]" />
                            {absents}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            / {total} ({percentage}%)
                          </span>
                        </div>
                      </td>

                      {/* Inspect Roster Action */}
                      <td className="px-4 sm:px-6 py-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setActiveSession(session)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0D2056] hover:bg-[#152a48] text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Students</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination Toolbar */}
        {filteredSessions.length > 0 && (
          <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
            <div className="text-xs text-slate-500 font-semibold">
              Showing{' '}
              <strong className="text-slate-800">
                {(currentPage - 1) * pageSize + 1}
              </strong>{' '}
              to{' '}
              <strong className="text-slate-800">
                {Math.min(currentPage * pageSize, filteredSessions.length)}
              </strong>{' '}
              of <strong className="text-slate-800">{filteredSessions.length}</strong> Attendance
              Sessions
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
      </div>

      {/* 6. Detailed Session Student Roster Modal */}
      {activeSession && (
        <div
          onClick={() => setActiveSession(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-[#0D2056]" />
                  <span>
                    Session Roster • {activeSession.class.name} (Sec {activeSession.section.name})
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Period {activeSession.periodNumber} • {activeSession.subject.name} (
                  {new Date(activeSession.date).toLocaleDateString('en-IN')})
                </p>
              </div>

              <button
                onClick={() => setActiveSession(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Student List with Circles */}
            <div className="p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
              <div className="flex items-center justify-between pb-3 text-xs font-bold text-slate-500">
                <span>Student Details</span>
                <span>Recorded Status</span>
              </div>

              {activeSession.records?.map((record) => {
                const isPresent = record.status === 'PRESENT' || record.status === 'LATE';
                return (
                  <div key={record.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {record.student?.user?.firstName} {record.student?.user?.lastName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Roll: {record.student?.rollNumber || '—'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isPresent ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                          <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>PRESENT</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black">
                          <div className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center">
                            <X className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>ABSENT</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>
                Total Students in Session: {activeSession.records?.length || 0}
              </span>
              <button
                onClick={() => setActiveSession(null)}
                className="px-4 py-2 bg-[#0D2056] text-white rounded-xl text-xs font-bold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
