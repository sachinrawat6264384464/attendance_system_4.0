'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { Sparkles, Camera, ArrowRight, Eye, X } from 'lucide-react';
import { GalleryItem, getStoredGalleryItems } from '@/lib/gallery-store';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setGalleryItems(getStoredGalleryItems());

    const handleUpdate = () => {
      setGalleryItems(getStoredGalleryItems());
    };
    window.addEventListener('gallery-updated', handleUpdate);
    return () => window.removeEventListener('gallery-updated', handleUpdate);
  }, []);

  const categories = [
    'All',
    'Smart Classrooms',
    'Computer & STEM Lab',
    'Sports & Athletics',
    'Library & Reading',
    'Campus & Building',
    'Events & Celebrations',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#EEF4FF] to-[#FCFDFD] pt-12 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D32F2F] text-xs font-black uppercase tracking-widest shadow-xs border border-rose-200">
            <Camera className="w-4 h-4 text-[#D32F2F]" />
            Life at Om Public School Dabra
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-[#0D2056]">Campus </span>
            <span className="text-[#D32F2F]">Photo Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Explore our state-of-the-art campus, digital smart classrooms, computer laboratory, sports facilities, and joyful learning environment at Deedar Colony, Dabra.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0D2056] text-white shadow-md shadow-blue-900/20 scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid: Paired 2-by-2 on mobile */}
      <section className="py-8 sm:py-14 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-4">
                  <div className="text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Fullscreen</span>
                  </div>
                </div>
                <span
                  className={`absolute top-2 sm:top-4 left-2 sm:left-4 ${item.tagColor} text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs`}
                >
                  {item.category}
                </span>
              </div>

              <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-base group-hover:text-[#0D2056] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 sm:line-clamp-3 leading-relaxed mt-1 sm:mt-2 hidden sm:block">
                    {item.description}
                  </p>
                </div>
                <div className="pt-1.5 sm:pt-2 flex items-center justify-between text-[10px] sm:text-xs font-bold text-[#0D2056] group-hover:text-[#D32F2F] transition-colors border-t border-slate-100">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 animate-scale-up"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 bg-white space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`${activePhoto.tagColor} text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full`}
                >
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">Om Public School Dabra Campus</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0D2056] tracking-tight">
                {activePhoto.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Campus Visit Banner */}
      <section className="bg-gradient-to-r from-[#0D2056] via-[#152a48] to-[#0D2056] text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#FFD600] text-xs font-black uppercase tracking-wider border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Schedule a Guided Walkthrough</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Experience Om Public School in Person
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Parents and prospective students are cordially invited to visit our campus at Deedar Colony, Dabra. Tour our smart classrooms, playground, and computer lab with our admissions counselors.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admissions"
              className="px-6 py-3 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:shadow-lg transition"
            >
              Apply for Admission (PG to 8th)
            </Link>
            <a
              href="tel:+917999083379"
              className="px-6 py-3 bg-white hover:bg-slate-100 text-[#0D2056] font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition"
            >
              Call Campus Desk: 7999083379
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
