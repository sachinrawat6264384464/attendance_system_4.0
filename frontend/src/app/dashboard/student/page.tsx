'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import {
  CalendarCheck,
  FileCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react';

interface AttendanceSummary {
  totalPeriods: number;
  presentPeriods: number;
  absentPeriods: number;
  overallPercentage: number;
  subjectBreakdown: Array<{
    subjectId: string;
    name: string;
    code: string;
    totalPeriods: number;
    attendedPeriods: number;
    percentage: number;
  }>;
}

export default function StudentDashboardPage() {
  const [attendance, setAttendance] = useState<AttendanceSummary>({
    totalPeriods: 25,
    presentPeriods: 23,
    absentPeriods: 2,
    overallPercentage: 92.0,
    subjectBreakdown: [
      { subjectId: '1', name: 'Early Literacy & Phonics', code: 'LIT-101', totalPeriods: 5, attendedPeriods: 5, percentage: 100 },
      { subjectId: '2', name: 'Numeracy & Shapes', code: 'NUM-101', totalPeriods: 5, attendedPeriods: 5, percentage: 100 },
      { subjectId: '3', name: 'Sensory & Nature Play', code: 'SEN-101', totalPeriods: 5, attendedPeriods: 4, percentage: 80 },
      { subjectId: '4', name: 'Creative Arts & Puppetry', code: 'ART-101', totalPeriods: 5, attendedPeriods: 5, percentage: 100 },
      { subjectId: '5', name: 'Gross Motor & Agility', code: 'PHY-101', totalPeriods: 5, attendedPeriods: 4, percentage: 80 },
    ],
  });

  const [assignments, setAssignments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'attendance' | 'assignments'>('attendance');
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [attRes, assignRes] = await Promise.all([
        apiClient<AttendanceSummary>('/attendance/student/my-summary').catch(() => null),
        apiClient<any[]>('/assignments').catch(() => null),
      ]);

      if (attRes?.data) setAttendance(attRes.data);
      if (assignRes?.data) setAssignments(assignRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStartAssignment = async (id: string) => {
    try {
      await apiClient(`/assignments/${id}/start`, { method: 'PATCH' });
      setFeedbackMsg('Assignment marked as Started.');
      loadData();
    } catch (err: any) {
      setFeedbackMsg(`Error: ${err.message}`);
    }
  };

  const handleSubmitWork = async (id: string) => {
    try {
      await apiClient(`/assignments/${id}/submit`, {
        method: 'POST',
        body: JSON.stringify({ submissionText: submissionNotes }),
      });
      setFeedbackMsg('Homework submitted successfully to your teacher!');
      setSubmittingId(null);
      setSubmissionNotes('');
      loadData();
    } catch (err: any) {
      setFeedbackMsg(`Error: ${err.message}`);
    }
  };

  const isAttendanceSafe = attendance.overallPercentage >= 75;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Academic Portal</h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalized period-level attendance tracking and coursework submission vault.
          </p>
        </div>

        <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'attendance'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Attendance Radar
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === 'assignments'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assignments Vault
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold flex items-center justify-between">
          <span>{feedbackMsg}</span>
          <button onClick={() => setFeedbackMsg(null)} className="text-indigo-400">×</button>
        </div>
      )}

      {/* ---------------- ATTENDANCE TAB ---------------- */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center sm:text-left">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Overall Attendance
              </span>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-extrabold ${isAttendanceSafe ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {attendance.overallPercentage}%
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {isAttendanceSafe ? 'Above CBSE 75%' : 'Below Threshold'}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Total Periods Logged
              </span>
              <div className="text-3xl font-extrabold text-slate-900">{attendance.totalPeriods}</div>
              <div className="text-xs text-slate-500 mt-1">Conducted by teachers this term</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Attended (Present / Late)
              </span>
              <div className="text-3xl font-extrabold text-emerald-600">{attendance.presentPeriods}</div>
              <div className="text-xs text-slate-500 mt-1">Active periods verified</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Absences Recorded
              </span>
              <div className="text-3xl font-extrabold text-rose-500">{attendance.absentPeriods}</div>
              <div className="text-xs text-slate-500 mt-1">Total missed period slots</div>
            </div>
          </div>

          {/* Subject-Wise Attendance Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Subject-Wise Period Attendance Breakdown</h3>
                <p className="text-xs text-slate-500">Continuous attendance records by academic subject</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                Target: 75%+ Per Subject
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5">Subject</th>
                    <th className="px-6 py-3.5">Subject Code</th>
                    <th className="px-6 py-3.5">Total Periods</th>
                    <th className="px-6 py-3.5">Attended Periods</th>
                    <th className="px-6 py-3.5">Attendance Metric</th>
                    <th className="px-6 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {attendance.subjectBreakdown.map((sub) => {
                    const isSubSafe = sub.percentage >= 75;
                    return (
                      <tr key={sub.subjectId} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-bold text-slate-900">{sub.name}</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{sub.code}</td>
                        <td className="px-6 py-4">{sub.totalPeriods}</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{sub.attendedPeriods}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${isSubSafe ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                style={{ width: `${Math.min(sub.percentage, 100)}%` }}
                              />
                            </div>
                            <span className="font-bold text-slate-800">{sub.percentage}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isSubSafe
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {isSubSafe ? 'On Track' : 'Warning'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ASSIGNMENTS TAB ---------------- */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {assignments.length === 0 ? (
              <div className="col-span-2 p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                No active assignments assigned to your class at this time.
              </div>
            ) : (
              assignments.map((assign) => {
                const sub = assign.submissions?.[0];
                const status = sub?.status || 'NOT_STARTED';
                const isStarted = status === 'STARTED';
                const isSubmitted = status === 'SUBMITTED';
                const isReviewed = status === 'REVIEWED';

                return (
                  <div key={assign.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase">
                          {assign.subject?.name}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base mt-2">{assign.title}</h4>
                      </div>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        {assign.maxMarks} Marks
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{assign.description}</p>
                    {assign.instructions && (
                      <div className="p-3 rounded-lg bg-slate-50 text-[11px] text-slate-600 border border-slate-100">
                        <strong>Instructions:</strong> {assign.instructions}
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        Due: {new Date(assign.dueDate).toLocaleDateString()}
                      </span>
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wide ${
                          isReviewed
                            ? 'bg-purple-100 text-purple-700'
                            : isSubmitted
                            ? 'bg-emerald-100 text-emerald-700'
                            : isStarted
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Teacher Feedback if Reviewed */}
                    {isReviewed && sub?.review && (
                      <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-purple-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-purple-800">
                          <Award className="w-4 h-4" />
                          <span>Marks Awarded: {sub.review.marksObtained} / {assign.maxMarks}</span>
                        </div>
                        {sub.review.feedback && (
                          <p className="text-[11px] text-purple-700 italic">&quot;{sub.review.feedback}&quot;</p>
                        )}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center gap-2">
                      {status === 'NOT_STARTED' && (
                        <button
                          onClick={() => handleStartAssignment(assign.id)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
                        >
                          Mark as Started
                        </button>
                      )}

                      {!isSubmitted && !isReviewed && (
                        <button
                          onClick={() => setSubmittingId(submittingId === assign.id ? null : assign.id)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition"
                        >
                          {submittingId === assign.id ? 'Close' : 'Submit Homework'}
                        </button>
                      )}
                    </div>

                    {/* Inline Submit Drawer */}
                    {submittingId === assign.id && (
                      <div className="pt-3 border-t border-slate-100 space-y-3">
                        <textarea
                          rows={2}
                          value={submissionNotes}
                          onChange={(e) => setSubmissionNotes(e.target.value)}
                          placeholder="Add homework answers or link to your online work..."
                          className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => handleSubmitWork(assign.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Finalize Submission
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

