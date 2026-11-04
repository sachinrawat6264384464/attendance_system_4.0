'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { apiClient } from '@/lib/api';
import { Send, CheckCircle2, AlertCircle, PhoneCall, Sparkles, MapPin, Mail, Award, Clock } from 'lucide-react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    email: '',
    phone: '',
    applyingForGrade: 'Playgroup (PG)',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await apiClient('/public/admission-enquiry', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({
        studentName: '',
        guardianName: '',
        email: '',
        phone: '',
        applyingForGrade: 'Playgroup (PG)',
        message: '',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit admission enquiry';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0D2056] via-[#152e75] to-[#0D2056] py-12 sm:py-16 text-white text-center border-b-4 border-[#D32F2F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D32F2F] text-amber-300 text-xs font-black uppercase tracking-wider mb-3 shadow-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admission Open • Session 2027–28 • Limited Seats Available</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Enroll at <span className="text-amber-300">Om Public School</span>, Dabra
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-200 font-medium max-w-xl mx-auto">
            Take the first step toward a bright future. Complete the online admission registration enquiry form below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Info Card */}
          <div className="space-y-6">
            <div className="bg-[#0D2056] text-white p-7 rounded-3xl shadow-lg border-2 border-amber-300/40 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#D32F2F] text-white text-[11px] font-black uppercase tracking-wider">
                Admission Guide
              </div>
              <h3 className="font-black text-lg text-amber-300">Simple 3-Step Process</h3>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
                <li className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                    1
                  </div>
                  <span>Fill and submit online preliminary admission form.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                    2
                  </div>
                  <span>Visit campus at Deedar Colony, Dabra for interactive faculty counseling.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                    3
                  </div>
                  <span>Document verification and official admission confirmation.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3.5 shadow-sm">
              <h4 className="font-extrabold text-xs text-[#0D2056] uppercase tracking-wider">Campus Admissions Desk</h4>
              <div className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Deedar Colony, Dabra, District Gwalior (Madhya Pradesh)</span>
              </div>
              
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs font-bold text-[#0D2056]">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#D32F2F]" />
                  <a href="tel:+917999083379" className="hover:text-[#D32F2F]">7999083379</a>,{' '}
                  <a href="tel:+919516469021" className="hover:text-[#D32F2F]">9516469021</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D32F2F]" />
                  <a href="mailto:info@ompublicschool.edu.in" className="hover:text-[#D32F2F]">info@ompublicschool.edu.in</a>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-normal">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mon to Sat: 8:00 AM – 2:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border-2 border-slate-200 shadow-lg">
            {success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0D2056]">Enquiry Submitted Successfully!</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for applying to <strong>Om Public School, Dabra</strong>. Our admissions counselor will contact you at <strong>{formData.phone || 'your phone number'}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 text-xs font-bold text-white bg-[#0D2056] hover:bg-[#D32F2F] rounded-full transition"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-xl font-black text-[#0D2056]">
                    Student & Guardian Details
                  </h3>
                  <span className="text-xs font-bold text-[#D32F2F] uppercase">Session 2027–28</span>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Child / Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Aarav Rawat"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0D2056] focus:ring-4 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="e.g. Rajesh Rawat"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0D2056] focus:ring-4 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Contact Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 7999083379"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0D2056] focus:ring-4 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0D2056] focus:ring-4 focus:ring-blue-100 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                    Admission Seeking for Class *
                  </label>
                  <select
                    value={formData.applyingForGrade}
                    onChange={(e) => setFormData({ ...formData, applyingForGrade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-bold text-sm focus:outline-none focus:border-[#0D2056] focus:ring-4 focus:ring-blue-100 transition cursor-pointer"
                  >
                    <optgroup label="Pre-Primary Section">
                      <option value="Playgroup (PG)">Playgroup (PG)</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG (Lower Kindergarten)</option>
                      <option value="UKG">UKG (Upper Kindergarten)</option>
                    </optgroup>
                    <optgroup label="Primary Section">
                      <option value="Class 1st">Class 1st (English Medium)</option>
                      <option value="Class 2nd">Class 2nd (English Medium)</option>
                      <option value="Class 3rd">Class 3rd (English Medium)</option>
                      <option value="Class 4th">Class 4th (English Medium)</option>
                      <option value="Class 5th">Class 5th (English Medium)</option>
                    </optgroup>
                    <optgroup label="Middle Section">
                      <option value="Class 6th">Class 6th (English Medium)</option>
                      <option value="Class 7th">Class 7th (English Medium)</option>
                      <option value="Class 8th">Class 8th (English Medium)</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-1.5">
                    Any Message / Queries for Admissions Team
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about school bus timings, fees structure, smart class demos, etc..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#0D2056] focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      'Submitting Registration...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Admission Application (2027–28)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
