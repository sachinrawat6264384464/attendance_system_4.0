'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apiClient } from '@/lib/api';
import { Send, CheckCircle2, AlertCircle, FileSpreadsheet, Clock, PhoneCall } from 'lucide-react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    email: '',
    phone: '',
    applyingForGrade: 'Grade 11 - Science (PCM)',
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
        applyingForGrade: 'Grade 11 - Science (PCM)',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit admission enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-slate-50 py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest block mb-2">
            Admissions 2026-2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apply to Apex Academy
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Join a community of scholars, innovators, and leaders. Submit your preliminary enquiry below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Info Card */}
          <div className="space-y-6">
            <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-sm">
              <h3 className="font-bold text-lg mb-4">Admission Process</h3>
              <ul className="space-y-4 text-xs sm:text-sm text-indigo-100">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <span>Submit the online enquiry form with valid contact information.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <span>Our admission desk schedules an interactive session & campus walkthrough.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-indigo-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <span>Document verification, fee settlement, and digital student portal onboarding.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <h4 className="font-semibold text-sm text-slate-900">Need Immediate Assistance?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contact our Admissions Counselor directly between 09:00 AM and 04:00 PM (Mon-Sat).
              </p>
              <div className="pt-2 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <PhoneCall className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            {success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted Successfully!</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for your interest in Apex Academy. Our admissions officer will review your enquiry and reach out via phone or email within 1-2 business days.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 px-5 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Student & Guardian Details
                </h3>

                {error && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Rohan Verma"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Guardian / Parent Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="e.g. Suresh Verma"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="suresh.verma@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Applying For Grade / Stream *
                  </label>
                  <select
                    value={formData.applyingForGrade}
                    onChange={(e) => setFormData({ ...formData, applyingForGrade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="Grade 9">Grade 9 (Secondary)</option>
                    <option value="Grade 10">Grade 10 (Secondary)</option>
                    <option value="Grade 11 - Science (PCM)">Grade 11 - Science (Physics, Chemistry, Maths)</option>
                    <option value="Grade 11 - Science (PCB)">Grade 11 - Science (Physics, Chemistry, Biology)</option>
                    <option value="Grade 11 - Commerce">Grade 11 - Commerce & Economics</option>
                    <option value="Grade 12 - Science">Grade 12 - Science</option>
                    <option value="Grade 12 - Commerce">Grade 12 - Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Additional Message / Academic Background
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Previous school name, marks obtained, or specific questions..."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-100 transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Admission Enquiry
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

