import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, GraduationCap, Award, Compass, Microscope, Code } from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="bg-slate-50 py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest block mb-2">
            Curriculum & Pedagogy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Academic Excellence at Apex
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Affiliated to the Central Board of Secondary Education (CBSE), delivering innovative STEM and Humanities integration.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 flex-1">
        {/* Core Streams */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Senior Secondary Streams (Grades 11 & 12)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Science Stream (PCM & PCB)</h3>
              <p className="text-sm text-slate-600 mt-2 mb-4 leading-relaxed">
                Designed for aspirants of engineering, medicine, and research sciences. State-of-the-art physics, chemistry, and biology labs with specialized coaching support.
              </p>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Subjects:</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Physics</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Chemistry</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Mathematics</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Biology</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Computer Science (Python)</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Commerce & Economics</h3>
              <p className="text-sm text-slate-600 mt-2 mb-4 leading-relaxed">
                Empowering future business leaders, accountants, and finance strategists with quantitative economics, accountancy principles, and entrepreneurship.
              </p>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Subjects:</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Accountancy</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Business Studies</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Economics</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Applied Mathematics</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs">Informatics Practices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Academic Tracking Callout */}
        <div className="p-8 sm:p-10 rounded-2xl bg-indigo-50 border border-indigo-100 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-indigo-950">Daily Digital Attendance & Assignment Feedback</h3>
            <p className="text-sm text-indigo-700 mt-1 max-w-xl">
              Parents and students access live, period-level attendance tracking and coursework feedback through the dedicated student portal.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

