'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { apiClient } from '@/lib/api';
import { Send, CheckCircle2, AlertCircle, PhoneCall, Sparkles, MapPin, Mail } from 'lucide-react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    email: '',
    phone: '',
    applyingForGrade: 'Playhouse (2 to 3 years)',
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
        applyingForGrade: 'Playhouse (2 to 3 years)',
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

      <div className="bg-[#FAFDF7] py-12 sm:py-16 border-b border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <span className="text-xs font-bold text-[#76A136] uppercase tracking-widest block mb-2">
            Admissions Open 2026-2027
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-[#1B365D]">Enroll Your Child at </span>
            <span className="text-[#76A136]">Dandelion Kidz</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-600">
            Take the first step toward joyful, natural childhood development. Complete the enquiry form below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Info Card */}
          <div className="space-y-6">
            <div className="bg-[#1B365D] text-white p-8 rounded-3xl shadow-sm">
              <h3 className="font-extrabold text-lg mb-4 text-[#76A136]">Admission Journey</h3>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-200">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#76A136] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <span>Submit online preliminary admission enquiry.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#76A136] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <span>Experience our 7+ Learning Corners through an interactive campus walk.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#76A136] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <span>Simple onboarding and digital parent portal activation.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-3xl space-y-3 shadow-xs">
              <h4 className="font-bold text-xs text-[#1B365D] uppercase tracking-wider">Campus Desk</h4>
              <p className="text-xs text-slate-600">
                Rajhans Society 3, Opp. Aradhana Tea, Raiya Road, Rajkot - 360007, Gujarat
              </p>
              <div className="pt-2 space-y-2 text-xs font-bold text-[#1B365D]">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#76A136]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#76A136]" />
                  <span>info@dandelionkidz.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
            {success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#F0F7E8] text-[#76A136] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1B365D]">Enquiry Received with Joy!</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for your interest in Dandelion Kidz. Our admissions coordinator will reach out to schedule your personalized campus tour within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-6 py-2.5 text-xs font-bold text-white bg-[#1B365D] hover:bg-[#152a48] rounded-full transition"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-extrabold text-[#1B365D] pb-3 border-b border-slate-100">
                  Child & Parent Details
                </h3>

                {error && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Child Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Ananya Patel"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="e.g. Hitesh Patel"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hitesh.patel@example.com"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Program Interested In *
                  </label>
                  <select
                    value={formData.applyingForGrade}
                    onChange={(e) => setFormData({ ...formData, applyingForGrade: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all"
                  >
                    <option value="Todd Care (1 to 2 years)">Todd Care (1 to 2 years | 2 Hours)</option>
                    <option value="Playhouse (2 to 3 years)">Playhouse (2 to 3 years | 3 Hours)</option>
                    <option value="Nursery (3 to 4 years)">Nursery (3 to 4 years | 3 Hours)</option>
                    <option value="Junior Kg (4 to 5 years)">Junior Kg (4 to 5 years | 3.5 Hours)</option>
                    <option value="Senior Kg (5 to 6 years)">Senior Kg (5 to 6 years | 3.5 Hours)</option>
                    <option value="Day Care & Activity Center">Day Care & Activity Center (Full / Half Day)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message / Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your child's age, dietary preferences, or timing requirements..."
                    className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-[#1B365D] focus:ring-4 focus:ring-[#1B365D]/10 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1B365D] hover:bg-[#152a48] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Admission Enquiry
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
