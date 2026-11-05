'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { apiClient } from '@/lib/api';
import {
  FileText,
  Plus,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface AssignmentItem {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  dueDate: string;
  maxMarks: number;
  subject?: { name: string; code: string };
  class?: { name: string };
  section?: { name: string };
  submissions?: Array<{
    id: string;
    status: string;
    marksObtained?: number;
    submittedAt?: string;
    student?: {
      user?: {
        firstName: string;
        lastName: string;
      };
    };
  }>;
}

interface ClassItem {
  id: string;
  name: string;
  sections?: Array<{ id: string; name: string }>;
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

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Metadata
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYearItem[]>([]);

  // Modal / Form states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAssignmentForReview, setSelectedAssignmentForReview] = useState<AssignmentItem | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [submittingForm, setSubmittingForm] = useState(false);

  // New Assignment Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    classId: '',
    sectionId: '',
    subjectId: '',
    dueDate: '',
    maxMarks: 100,
  });

  // Filter & Pagination
  const [classFilter, setClassFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const loadData = async () => {
    setLoading(true);
    try {
      const [assignmentsRes, classesRes, subjectsRes, yearsRes] = await Promise.all([
        apiClient<AssignmentItem[]>('/assignments').catch(() => null),
        apiClient<ClassItem[]>('/academics/classes').catch(() => null),
        apiClient<SubjectItem[]>('/academics/subjects').catch(() => null),
        apiClient<AcademicYearItem[]>('/academics/years').catch(() => null),
      ]);

      if (assignmentsRes?.data && Array.isArray(assignmentsRes.data)) {
        setAssignments(assignmentsRes.data);
      }
      if (classesRes?.data && Array.isArray(classesRes.data) && classesRes.data.length > 0) {
        setClasses(classesRes.data);
        const firstCls = classesRes.data[0];
        setFormData((prev) => ({
          ...prev,
          classId: firstCls.id,
          sectionId: firstCls.sections?.[0]?.id || '',
        }));
      }
      if (subjectsRes?.data && Array.isArray(subjectsRes.data) && subjectsRes.data.length > 0) {
        setSubjects(subjectsRes.data);
        setFormData((prev) => ({ ...prev, subjectId: subjectsRes.data[0].id }));
      }
      if (yearsRes?.data) setAcademicYears(yearsRes.data);
    } catch (err) {
      console.error('Failed to load assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16);
    setFormData((prev) => ({ ...prev, dueDate: nextWeek }));
    loadData();
  }, []);

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = academicYears.find((y) => y.isCurrent) || academicYears[0];
    if (!currentYear) {
      setActionMessage('No active academic year found in database.');
      return;
    }

    setSubmittingForm(true);
    setActionMessage(null);

    try {
      await apiClient('/assignments', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          instructions: formData.instructions,
          academicYearId: currentYear.id,
          classId: formData.classId,
          sectionId: formData.sectionId,
          subjectId: formData.subjectId,
          dueDate: new Date(formData.dueDate).toISOString(),
          maxMarks: Number(formData.maxMarks),
          attachmentUrls: [],
        }),
      });

      setActionMessage('Assignment published and assigned to class successfully!');
      setShowCreateModal(false);
      setFormData((prev) => ({ ...prev, title: '', description: '', instructions: '' }));
      loadData();
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    } finally {
      setSubmittingForm(false);
    }
  };

  const filteredAssignments = useMemo(() => {
    if (classFilter === 'ALL') return assignments;
    return assignments.filter((a) => a.class?.name === classFilter);
  }, [assignments, classFilter]);

  const totalPages = Math.ceil(filteredAssignments.length / pageSize) || 1;
  const paginatedAssignments = useMemo(() => {
    return filteredAssignments.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredAssignments, currentPage]);

  const currentClassForForm = classes.find((c) => c.id === formData.classId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-[#0D2056] tracking-tight">
              Assignments & Coursework Vault
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-wider">
              Academic Tasks
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
            Create, track, and grade student homework and academic evaluations.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-[#0D2056] hover:bg-[#152a48] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-emerald-700 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* 2. Paired Stats Boxes on Mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Active Tasks
          </span>
          <div className="text-xl sm:text-3xl font-black text-slate-900">{assignments.length}</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">Published in portal</div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Student Submissions
          </span>
          <div className="text-xl sm:text-3xl font-black text-emerald-600">
            {assignments.reduce((sum, a) => sum + (a.submissions?.length || 0), 0)}
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">Received for review</div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Enrolled Classes
          </span>
          <div className="text-xl sm:text-3xl font-black text-[#0D2056]">{classes.length || 4}</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">PG, Nursery, LKG, UKG</div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Curriculum Subjects
          </span>
          <div className="text-xl sm:text-3xl font-black text-amber-600">{subjects.length || 6}</div>
          <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">English, Math, EVS, Art</div>
        </div>
      </div>

      {/* 3. Class Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Class Filter:</span>
          {['ALL', ...(classes.length > 0 ? classes.map((c) => c.name) : ['Playgroup', 'Nursery', 'LKG', 'UKG'])].map((clsName) => (
            <button
              key={clsName}
              onClick={() => {
                setClassFilter(clsName);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                classFilter === clsName
                  ? 'bg-[#0D2056] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {clsName}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Assignments Grid (Paired 2-by-2 on mobile) */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs font-semibold">
          Loading coursework assignments from database...
        </div>
      ) : filteredAssignments.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Coursework Assigned</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click &quot;Create New Assignment&quot; to assign coursework, reading tasks, or homework.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {paginatedAssignments.map((item) => {
            const dueDateFormatted = new Date(item.dueDate).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0D2056] text-[10px] font-black uppercase">
                      {item.class?.name || 'Class'} - Sec {item.section?.name || 'A'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-[10px] font-bold">
                      {item.subject?.name || 'Subject'}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-500" />
                      <span>Due: {dueDateFormatted}</span>
                    </span>
                    <span className="font-bold text-slate-800">Max: {item.maxMarks} Pts</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {item.submissions?.length || 0} Submissions
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedAssignmentForReview(item)}
                      className="px-3 py-1 bg-slate-100 hover:bg-[#0D2056] hover:text-white rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
                    >
                      Inspect Submissions
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. Pagination */}
      {filteredAssignments.length > pageSize && (
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="text-xs text-slate-500 font-semibold">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredAssignments.length)} of{' '}
            {filteredAssignments.length} Assignments
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-xs font-black px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* 6. Create Assignment Modal */}
      {showCreateModal && (
        <div
          onClick={() => setShowCreateModal(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D32F2F]" />
                <span>Create New Assignment Task</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. English Phonics & Rhymes Recitation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0D2056] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Class Grade *
                  </label>
                  <select
                    value={formData.classId}
                    onChange={(e) => {
                      const newClsId = e.target.value;
                      const cls = classes.find((c) => c.id === newClsId);
                      setFormData({
                        ...formData,
                        classId: newClsId,
                        sectionId: cls?.sections?.[0]?.id || '',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0D2056] bg-white"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Section *
                  </label>
                  <select
                    value={formData.sectionId}
                    onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0D2056] bg-white"
                  >
                    {currentClassForForm?.sections?.map((s) => (
                      <option key={s.id} value={s.id}>
                        Section {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Subject *
                  </label>
                  <select
                    value={formData.subjectId}
                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0D2056] bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Maximum Marks *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formData.maxMarks}
                    onChange={(e) =>
                      setFormData({ ...formData, maxMarks: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0D2056]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Submission Due Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0D2056]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Description / Topic Overview *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Provide instructions, chapter pages, or homework guidelines..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#0D2056]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingForm}
                  className="px-5 py-2 bg-[#0D2056] text-white rounded-xl font-bold shadow-md hover:bg-[#152a48] disabled:opacity-50"
                >
                  {submittingForm ? 'Publishing...' : 'Publish Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Submissions Review Modal */}
      {selectedAssignmentForReview && (
        <div
          onClick={() => setSelectedAssignmentForReview(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  Submissions: {selectedAssignmentForReview.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedAssignmentForReview.class?.name} -{' '}
                  {selectedAssignmentForReview.section?.name} • Due:{' '}
                  {new Date(selectedAssignmentForReview.dueDate).toLocaleDateString('en-IN')}
                </p>
              </div>
              <button
                onClick={() => setSelectedAssignmentForReview(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs divide-y divide-slate-100">
              {(!selectedAssignmentForReview.submissions ||
                selectedAssignmentForReview.submissions.length === 0) ? (
                <div className="py-8 text-center text-slate-400">
                  No student submissions received for this assignment yet.
                </div>
              ) : (
                selectedAssignmentForReview.submissions.map((sub) => (
                  <div key={sub.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {sub.student?.user?.firstName} {sub.student?.user?.lastName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Status: {sub.status}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black">
                      Score: {sub.marksObtained ?? 'Ungraded'} /{' '}
                      {selectedAssignmentForReview.maxMarks}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAssignmentForReview(null)}
                className="px-4 py-2 bg-[#0D2056] text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
