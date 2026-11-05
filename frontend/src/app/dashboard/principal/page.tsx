'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { apiClient } from '@/lib/api';
import {
  Shield,
  Users,
  CalendarCheck,
  FileCheck,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  Phone,
  MapPin,
  GraduationCap,
  Layers,
  Sparkles,
  ExternalLink,
  ClipboardList,
} from 'lucide-react';
import {
  GalleryItem,
  getStoredGalleryItems,
  saveStoredGalleryItems,
} from '@/lib/gallery-store';
import {
  SchoolProfile,
  getStoredSchoolProfile,
  saveStoredSchoolProfile,
} from '@/lib/school-store';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSections: number;
  pendingCorrections: number;
  activeAssignments: number;
  todaySessionsCount: number;
  todayAttendancePercentage: number;
}

interface CorrectionRequest {
  id: string;
  oldStatus: string;
  newStatus: string;
  reason: string;
  createdAt: string;
  requestedBy: {
    firstName: string;
    lastName: string;
    email: string;
  };
  attendanceRecord: {
    student: {
      user: { firstName: string; lastName: string };
    };
    session: {
      date: string;
      periodNumber: number;
      subject: { name: string };
      class: { name: string };
      section: { name: string };
    };
  };
}

interface AdmissionItem {
  id: string;
  studentName: string;
  guardianName: string;
  phone: string;
  email: string;
  applyingForGrade: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function PrincipalDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'gallery-cms' | 'school-cms' | 'admissions' | 'classes'
  >('overview');

  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 136,
    totalTeachers: 4,
    totalClasses: 4,
    totalSections: 4,
    pendingCorrections: 0,
    activeAssignments: 8,
    todaySessionsCount: 16,
    todayAttendancePercentage: 94.2,
  });

  const [corrections, setCorrections] = useState<CorrectionRequest[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionItem[]>([]);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Gallery CMS state
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Smart Classrooms',
    image: '/images/om-smart-classroom.jpg',
    description: '',
  });

  // School Profile CMS state
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(getStoredSchoolProfile());

  const samplePresets = [
    { label: 'Campus Building HD', url: '/images/om-hero-campus-hd.jpg' },
    { label: 'Smart Classroom HD', url: '/images/om-smart-classroom.jpg' },
    { label: 'Computer Lab HD', url: '/images/om-computer-lab.jpg' },
    { label: 'Sports Ground HD', url: '/images/om-sports-ground.jpg' },
    { label: 'School Library HD', url: '/images/om-library.jpg' },
    { label: 'Official Poster HD', url: '/images/om-public-school-poster.jpg' },
    { label: 'Campus Entrance HD', url: '/images/om-school-building.jpg' },
  ];

  const classSummary = [
    { name: 'Playhouse', code: 'PLAY', students: 30, room: 'Room 101', teacher: 'Pooja Verma' },
    { name: 'Nursery', code: 'NUR', students: 23, room: 'Room 102', teacher: 'Sunita Nambiar' },
    { name: 'LKG', code: 'LKG', students: 45, room: 'Room 103', teacher: 'Ramesh Sharma' },
    { name: 'UKG', code: 'UKG', students: 38, room: 'Room 104', teacher: 'Anita Patel' },
  ];

  const loadData = async () => {
    try {
      const [statsRes, correctionsRes, admissionsRes, schoolInfoRes] = await Promise.all([
        apiClient<DashboardStats>('/reports/dashboard/principal').catch(() => null),
        apiClient<CorrectionRequest[]>('/attendance/corrections/pending').catch(() => null),
        apiClient<AdmissionItem[]>('/public/admissions').catch(() => null),
        apiClient<any>('/public/school-info').catch(() => null),
      ]);

      if (statsRes?.data) setStats(statsRes.data);
      if (correctionsRes?.data) setCorrections(correctionsRes.data);
      if (admissionsRes?.data) setAdmissions(admissionsRes.data);
      if (schoolInfoRes?.data) {
        setSchoolProfile((prev) => ({
          ...prev,
          schoolName: schoolInfoRes.data.schoolName || prev.schoolName,
          schoolCode: schoolInfoRes.data.schoolCode || prev.schoolCode,
          affiliationNo: schoolInfoRes.data.affiliationNo || prev.affiliationNo,
          email: schoolInfoRes.data.email || prev.email,
          phone: schoolInfoRes.data.phone || prev.phone,
          address: schoolInfoRes.data.address || prev.address,
        }));
      }
    } catch {
      // Retain robust state
    }
  };

  useEffect(() => {
    loadData();
    setGalleryList(getStoredGalleryItems());
  }, []);

  const handleReviewCorrection = async (id: string, decision: 'APPROVED' | 'REJECTED') => {
    try {
      await apiClient(`/attendance/corrections/${id}/review`, {
        method: 'PATCH',
        body: JSON.stringify({ decision, reviewNotes: 'Reviewed by Principal' }),
      });
      setActionMessage(`Correction request ${decision.toLowerCase()} successfully.`);
      loadData();
    } catch (err: any) {
      setActionMessage(`Error: ${err.message}`);
    }
  };

  const handleSaveSchoolInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setActionMessage(null);
    try {
      saveStoredSchoolProfile(schoolProfile);
      await apiClient('/public/school-info', {
        method: 'PATCH',
        body: JSON.stringify(schoolProfile),
      }).catch(() => null);

      setActionMessage('School Profile & Public Website settings updated successfully!');
    } catch (err: any) {
      setActionMessage(`Saved locally. Network sync: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddGalleryPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title.trim() || !newPhoto.image.trim()) {
      alert('Please provide a title and image URL');
      return;
    }

    const item: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: newPhoto.title.trim(),
      category: newPhoto.category,
      image: newPhoto.image.trim(),
      description: newPhoto.description.trim() || 'Official photograph of Om Public School, Dabra.',
      tagColor: 'bg-[#0D2056]',
    };

    const updated = [item, ...galleryList];
    setGalleryList(updated);
    saveStoredGalleryItems(updated);
    setNewPhoto({
      title: '',
      category: 'Smart Classrooms',
      image: '/images/om-smart-classroom.jpg',
      description: '',
    });
    setActionMessage('New photo published to public gallery!');
  };

  const handleDeleteGalleryPhoto = (id: string) => {
    if (confirm('Are you sure you want to remove this photo from the public gallery?')) {
      const updated = galleryList.filter((item) => item.id !== id);
      setGalleryList(updated);
      saveStoredGalleryItems(updated);
      setActionMessage('Photo removed from public gallery.');
    }
  };

  const handleUpdateAdmissionStatus = async (id: string, status: string) => {
    try {
      await apiClient(`/public/admissions/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }).catch(() => null);

      setAdmissions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );
      setActionMessage(`Application status updated to ${status}.`);
    } catch {
      setAdmissions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Header Bar (Responsive & Compact on Mobile) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-[#0D2056] tracking-tight">
              Principal Executive Console
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-[#D32F2F] text-white text-[10px] font-black uppercase tracking-wider">
              Admin CMS
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
            Full authority over website media, public contact details, admissions, and audited academic records.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold text-slate-700">Om Public School Live</span>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 sm:p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-fade-in">
          <span>{actionMessage}</span>
          <button
            onClick={() => setActionMessage(null)}
            className="text-emerald-600 hover:text-emerald-900 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2. Navigation Tabs (Horizontally Scrollable on Mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 border-b border-slate-200 no-scrollbar">
        {[
          { id: 'overview', label: 'Executive Radar', icon: CalendarCheck },
          { id: 'gallery-cms', label: 'Gallery Photos CMS', icon: ImageIcon },
          { id: 'school-cms', label: 'School Info & Contacts', icon: Settings },
          { id: 'admissions', label: 'Admission Enquiries', icon: ClipboardList },
          { id: 'classes', label: 'Classes & Rosters', icon: GraduationCap },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setActionMessage(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#0D2056] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: EXECUTIVE RADAR (KPIs Paired 2-by-2 on Mobile)          */}
      {/* ============================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Paired 2-per-row KPI Boxes on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Today Attendance
                </span>
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-slate-900">
                {stats.todayAttendancePercentage}%
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium">
                {stats.todaySessionsCount} period sessions finalized
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Enrolled Students
                </span>
                <Users className="w-4 h-4 text-[#0D2056]" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-slate-900">
                {stats.totalStudents}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium">
                Across {stats.totalClasses} classes (PG-UKG)
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Teaching Faculty
                </span>
                <Shield className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-slate-900">
                {stats.totalTeachers}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium">
                Verified subject educators
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  Active Sections
                </span>
                <FileCheck className="w-4 h-4 text-[#D32F2F]" />
              </div>
              <div className="text-xl sm:text-3xl font-black text-slate-900">
                {stats.totalSections}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 mt-1 font-medium">
                Full period allocations active
              </div>
            </div>
          </div>

          {/* Pending Attendance Modification Requests */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    Audited Attendance Correction Requests
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Finalized period records require Principal sign-off to modify
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                {corrections.length} Pending
              </span>
            </div>

            {corrections.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-medium">
                <CheckCircle className="w-7 h-7 text-emerald-500 mx-auto mb-2 opacity-80" />
                All attendance registers are locked and verified. No pending teacher modification requests.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Session</th>
                      <th className="px-4 py-3">Change</th>
                      <th className="px-4 py-3">Reason</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {corrections.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {req.attendanceRecord.student.user.firstName}{' '}
                          {req.attendanceRecord.student.user.lastName}
                        </td>
                        <td className="px-4 py-3 text-[11px]">
                          {req.attendanceRecord.session.class.name} -{' '}
                          {req.attendanceRecord.session.section.name} (Period{' '}
                          {req.attendanceRecord.session.periodNumber})
                        </td>
                        <td className="px-4 py-3">
                          <span className="line-through text-rose-500 mr-1.5">{req.oldStatus}</span>
                          <span className="font-bold text-emerald-600">{req.newStatus}</span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-slate-500 max-w-xs truncate">
                          &quot;{req.reason}&quot;
                        </td>
                        <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleReviewCorrection(req.id, 'APPROVED')}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px]"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReviewCorrection(req.id, 'REJECTED')}
                            className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-lg font-bold text-[11px]"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: GALLERY PHOTOS CMS (Principal Photo Editor)            */}
      {/* ============================================================== */}
      {activeTab === 'gallery-cms' && (
        <div className="space-y-6">
          {/* Add Photo Form */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#D32F2F]" />
                  Add New Photo to Public Gallery
                </h3>
                <p className="text-[11px] text-slate-500">
                  New photos will be visible instantly to parents and visitors on the public website.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddGalleryPhoto} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Science Laboratory Workshop"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056] bg-white"
                  >
                    <option value="Smart Classrooms">Smart Classrooms</option>
                    <option value="Computer & STEM Lab">Computer & STEM Lab</option>
                    <option value="Sports & Athletics">Sports & Athletics</option>
                    <option value="Library & Reading">Library & Reading</option>
                    <option value="Campus & Building">Campus & Building</option>
                    <option value="Events & Celebrations">Events & Celebrations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Photo Source (Choose Preset or Enter Custom Image URL) *
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {samplePresets.map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      onClick={() => setNewPhoto({ ...newPhoto, image: preset.url })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                        newPhoto.image === preset.url
                          ? 'bg-[#0D2056] text-white border-[#0D2056]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  placeholder="/images/photo.jpg or https://..."
                  value={newPhoto.image}
                  onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056] font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description of the event or classroom facility..."
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D32F2F] hover:bg-[#b71c1c] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish to Gallery</span>
                </button>
              </div>
            </form>
          </div>

          {/* Current Gallery Images List */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
              Currently Active Gallery Images ({galleryList.length})
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Click delete on any photo to remove it from the public campus photo gallery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {galleryList.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full bg-slate-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-[#0D2056] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[9px] text-slate-400 font-mono truncate max-w-[150px]">
                        {item.image}
                      </span>
                      <button
                        onClick={() => handleDeleteGalleryPhoto(item.id)}
                        className="p-1 rounded-md text-rose-600 hover:bg-rose-50 transition"
                        title="Delete from Gallery"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: SCHOOL INFO & CONTACTS (Principal Public CMS)           */}
      {/* ============================================================== */}
      {activeTab === 'school-cms' && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#0D2056]" />
                School Profile & Website Contact Info
              </h3>
              <p className="text-[11px] text-slate-500">
                Update school credentials, official phone numbers, and admission session banners across the platform.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSchoolInfo} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  School Name *
                </label>
                <input
                  type="text"
                  required
                  value={schoolProfile.schoolName}
                  onChange={(e) =>
                    setSchoolProfile({ ...schoolProfile, schoolName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  School Code *
                </label>
                <input
                  type="text"
                  required
                  value={schoolProfile.schoolCode}
                  onChange={(e) =>
                    setSchoolProfile({ ...schoolProfile, schoolCode: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Affiliation Number
                </label>
                <input
                  type="text"
                  value={schoolProfile.affiliationNo}
                  onChange={(e) =>
                    setSchoolProfile({ ...schoolProfile, affiliationNo: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Official Contact Phone Numbers *
                </label>
                <input
                  type="text"
                  required
                  value={schoolProfile.phone}
                  onChange={(e) =>
                    setSchoolProfile({ ...schoolProfile, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={schoolProfile.email}
                  onChange={(e) =>
                    setSchoolProfile({ ...schoolProfile, email: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Academic Session Year
                </label>
                <input
                  type="text"
                  value={schoolProfile.sessionYear}
                  onChange={(e) =>
                    setSchoolProfile({ ...schoolProfile, sessionYear: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Campus Physical Address *
              </label>
              <input
                type="text"
                required
                value={schoolProfile.address}
                onChange={(e) =>
                  setSchoolProfile({ ...schoolProfile, address: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Admission Campaign Banner Text *
              </label>
              <input
                type="text"
                required
                value={schoolProfile.admissionBannerText}
                onChange={(e) =>
                  setSchoolProfile({ ...schoolProfile, admissionBannerText: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                School Tagline / Motto
              </label>
              <input
                type="text"
                value={schoolProfile.tagline}
                onChange={(e) =>
                  setSchoolProfile({ ...schoolProfile, tagline: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0D2056]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 bg-[#0D2056] hover:bg-[#152a48] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Saving...' : 'Save School Info'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: ADMISSION ENQUIRIES REVIEW                              */}
      {/* ============================================================== */}
      {activeTab === 'admissions' && (
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[#D32F2F]" />
                Online Admission Applications & Inquiries
              </h3>
              <p className="text-[11px] text-slate-500">
                Prospective student enquiries submitted via public website for Session 2027–28.
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 bg-rose-50 text-[#D32F2F] rounded-full border border-rose-200">
              {admissions.length} Enquiries
            </span>
          </div>

          {admissions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <ClipboardList className="w-7 h-7 text-slate-300 mx-auto mb-2" />
              No online admission enquiries submitted yet today.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Guardian</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Grade</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {admissions.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-bold text-slate-900">{adm.studentName}</td>
                      <td className="px-4 py-3">{adm.guardianName}</td>
                      <td className="px-4 py-3 text-[11px]">
                        <a href={`tel:${adm.phone}`} className="text-[#0D2056] font-bold hover:underline">
                          {adm.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#D32F2F]">{adm.applyingForGrade}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            adm.status === 'ENROLLED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : adm.status === 'CONTACTED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {adm.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateAdmissionStatus(adm.id, 'CONTACTED')}
                          className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md text-[10px] font-bold"
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() => handleUpdateAdmissionStatus(adm.id, 'ENROLLED')}
                          className="px-2 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md text-[10px] font-bold"
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: CLASSES & STUDENT ROSTERS OVERVIEW (2-per-row on Mobile)*/}
      {/* ============================================================== */}
      {activeTab === 'classes' && (
        <div className="space-y-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#0D2056]" />
                Enrolled Students by Class Grade
              </h3>
              <p className="text-[11px] text-slate-500">
                136 total active enrolled students across early childhood education sections.
              </p>
            </div>
            <span className="text-xs font-black px-2.5 py-1 bg-blue-50 text-[#0D2056] rounded-full border border-blue-200">
              Session 2026–27
            </span>
          </div>

          {/* Paired 2-by-2 on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {classSummary.map((cls) => (
              <div
                key={cls.code}
                className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#D32F2F]">
                    {cls.code}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{cls.room}</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-slate-900">{cls.name}</h4>
                <div className="text-xl sm:text-2xl font-black text-[#0D2056] mt-1">
                  {cls.students}{' '}
                  <span className="text-[10px] font-bold text-slate-400">Students</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium mt-1.5 pt-1.5 border-t border-slate-100 truncate">
                  Class Teacher: {cls.teacher}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
