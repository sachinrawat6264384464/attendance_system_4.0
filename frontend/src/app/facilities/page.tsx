'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import {
  ShieldCheck,
  Sparkles,
  Heart,
  Smile,
  Compass,
  ArrowRight,
  CheckCircle2,
  Tv,
  Utensils,
  Sun,
  Activity,
} from 'lucide-react';

export default function FacilitiesPage() {
  const facilities = [
    {
      title: '7+ Sensory Learning Corners',
      tag: 'Reggio-Emilia Inspired',
      color: 'border-[#1B365D]',
      tagBg: 'bg-[#1B365D]',
      icon: Compass,
      description:
        'Dedicated self-guided learning zones including Language Corner, Numeracy Zone, Sensory Exploration, Construction & Block Play, Art & Craft Studio, and Nature Station.',
      image: '/images/hero-playroom.jpg',
      highlights: [
        'Open-ended Montessori materials',
        'Natural wood & tactile elements',
        'Self-directed child discovery',
      ],
    },
    {
      title: 'Sensory Ball Pit & Soft Play Arena',
      tag: 'Gross Motor Skills',
      color: 'border-[#76A136]',
      tagBg: 'bg-[#76A136]',
      icon: Activity,
      description:
        'A vibrant, padded play arena with certified BPA-free colorful balls, balance rockers, and tumbling mats to build balance, spatial awareness, and muscle coordination.',
      image: '/images/hero-playroom.jpg',
      highlights: [
        'Certified non-toxic soft foam padding',
        'Daily sanitization & hygiene protocols',
        'Rocking trainers & balance agility',
      ],
    },
    {
      title: 'The Puppet Theatre & Dramatic Play',
      tag: 'Expressive Arts & Empathy',
      color: 'border-[#E87722]',
      tagBg: 'bg-[#E87722]',
      icon: Smile,
      description:
        'Our handcrafted wooden puppet theatre encourages role-play, vocal expression, emotional empathy, and confidence building through interactive theatrical storytelling.',
      image: '/images/hero-playroom.jpg',
      highlights: [
        'Handmade fabric animal puppets',
        'Vocal projection & confidence building',
        'Collaborative peer storytelling',
      ],
    },
    {
      title: 'Outdoor Adventure Turf & Playground',
      tag: 'Physical Vitality',
      color: 'border-[#E91E63]',
      tagBg: 'bg-[#E91E63]',
      icon: Sun,
      description:
        'Lush artificial grass play zone with weather-proof multi-play climbing units, slides, and crawl tunnels engineered with rounded corners and shock-absorbing turf.',
      image: '/images/franchisee-playground.jpg',
      highlights: [
        'Child-safe impact absorption flooring',
        'Age-appropriate climbing ladders & slides',
        'Supervised morning fresh-air play',
      ],
    },
    {
      title: '100% CCTV Surveillance & Secure Campus',
      tag: 'Uncompromised Safety',
      color: 'border-[#00695C]',
      tagBg: 'bg-[#00695C]',
      icon: ShieldCheck,
      description:
        'Full perimeter and indoor high-definition CCTV coverage, single-point controlled access gates, verified visitor screening, and round-the-clock trained security.',
      image: '/images/welcome-entrance.jpg',
      highlights: [
        'Complete indoor & outdoor CCTV monitoring',
        'Gated single entry with ID verification',
        'First-aid & pediatric emergency preparedness',
      ],
    },
    {
      title: 'Child-Centric Dining & Hygienic Washrooms',
      tag: 'Health & Wellness',
      color: 'border-[#7B1FA2]',
      tagBg: 'bg-[#7B1FA2]',
      icon: Utensils,
      description:
        'Miniature ergonomic washbasins, child-height hygienic sanitization stations, and a warm community meal space encouraging healthy eating habits and independence.',
      image: '/images/welcome-entrance.jpg',
      highlights: [
        'Ergonomic toddler-height wash basins',
        'Community dining etiquette guidance',
        'Strict hygiene and water filtration standards',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFDFD] text-slate-800">
      <Navbar />
      <FloatingContact />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F0F7E8] to-[#FCFDFD] pt-12 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#76A136] text-xs font-bold uppercase tracking-widest shadow-xs border border-[#76A136]/20">
            <Sparkles className="w-4 h-4" />
            Infrastructure & Safety
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-[#1B365D]">World-Class </span>
            <span className="text-[#76A136]">Campus Facilities</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every inch of Dandelion Kidz is thoughtfully constructed with child psychology, ergonomic safety, and boundless sensory stimulation at heart.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac) => {
            const IconComponent = fac.icon;
            return (
              <div
                key={fac.title}
                className={`bg-white rounded-3xl border-2 ${fac.color} overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col`}
              >
                <div className="relative h-56 sm:h-64 w-full bg-slate-100">
                  <Image
                    src={fac.image}
                    alt={fac.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-[11px] font-bold text-white px-3.5 py-1.5 rounded-full shadow-sm ${fac.tagBg}`}
                    >
                      {fac.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1B365D]">
                        <IconComponent className="w-5 h-5 text-[#76A136]" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B365D]">
                        {fac.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    {fac.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#76A136] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Visit Banner */}
      <section className="bg-gradient-to-r from-[#1B365D] to-[#254673] py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold">
              See the Facilities in Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              Schedule a personalized walk-through with our academic coordinator.
            </p>
          </div>

          <Link
            href="/admissions"
            className="px-6 py-3 bg-[#76A136] hover:bg-[#688f30] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition inline-flex items-center gap-2 shrink-0"
          >
            Schedule Campus Visit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
