'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface WingItem {
  wing: string;
  badge: string;
  classes: string;
  features: string[];
}

const WINGS_DATA: WingItem[] = [
  {
    wing: 'Pre-Primary Wing',
    badge: 'Early Childhood Care',
    classes: 'PG, Nursery, LKG, UKG',
    features: ['Sensory Play & Phonics', 'Motor Skill Development', 'Rhymes & Storytelling', 'Safe Playrooms'],
  },
  {
    wing: 'Primary Wing',
    badge: 'Foundational Stage',
    classes: 'Class 1st to 5th',
    features: ['Mathematical Logic', 'Environmental Science', 'English Grammar', 'Smart Classrooms'],
  },
  {
    wing: 'Middle Wing',
    badge: 'Preparatory Stage',
    classes: 'Class 6th to 8th',
    features: ['Science Lab & Computers', 'Analytical Thinking', 'Social Studies & Civics', 'Leadership Skills'],
  },
  {
    wing: 'Co-Curricular Wing',
    badge: 'Holistic Development',
    classes: 'PG to 8th Standard',
    features: ['Athletics & Physical Training', 'Art, Craft & Drama', 'Spoken English Club', 'Moral Values & Sanskar'],
  },
];

export default function AcademicWingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-20 bg-gradient-to-b from-[#F8FAFC] to-[#EEF4FF] border-y border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <span className="text-[10px] sm:text-xs font-black text-[#D32F2F] uppercase tracking-wider">
            Comprehensive Schooling Structure
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0D2056] tracking-tight">
            Academic Wings: <span className="text-[#D32F2F]">Classes PG to 8th</span>
          </h2>
          <p className="text-[11px] sm:text-sm text-slate-600">
            Age-appropriate pedagogy designed to spark curiosity, build mastery, and instill confidence.
          </p>
        </div>

        {/* 4 Cards: Slide in from Left and Right on Scroll */}
        {/* Starting 3 Boxes: White background, White border, Black text */}
        {/* 4th Box: Red background, Black text */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {WINGS_DATA.map((wing, i) => {
            // Boxes 0 and 1 emerge from LEFT (-translateX)
            // Boxes 2 and 3 emerge from RIGHT (+translateX)
            const isLeft = i < 2;
            const isFourthBox = i === 3;

            // Stagger animation timing
            const delayClass =
              i === 0
                ? 'delay-0'
                : i === 1
                ? 'delay-100'
                : i === 2
                ? 'delay-200'
                : 'delay-300';

            // Sliding animation:
            // When not in view: left boxes are -translateX, right boxes are +translateX, opacity 0
            // When in view: translateX(0), opacity 100
            const transformClass = isInView
              ? 'translate-x-0 opacity-100'
              : isLeft
              ? '-translate-x-12 sm:-translate-x-20 opacity-0'
              : 'translate-x-12 sm:translate-x-20 opacity-0';

            return (
              <div
                key={i}
                className={`transition-all duration-700 ease-out transform ${delayClass} ${transformClass} rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 flex flex-col justify-between ${
                  isFourthBox
                    ? 'bg-[#D32F2F] border-2 border-red-600 text-black shadow-2xl'
                    : 'bg-white border-2 border-white text-black shadow-xl hover:shadow-2xl'
                }`}
              >
                <div>
                  {/* Badge */}
                  <div
                    className={`inline-block px-2 sm:px-2.5 py-0.5 rounded-full font-black text-[8px] sm:text-[10px] uppercase tracking-wider mb-2 ${
                      isFourthBox
                        ? 'bg-white/90 text-black border border-black/20'
                        : 'bg-slate-100 text-black border border-slate-200'
                    }`}
                  >
                    {wing.badge}
                  </div>

                  {/* Title in Black */}
                  <h3 className="text-xs sm:text-lg font-black text-black leading-tight">
                    {wing.wing}
                  </h3>

                  {/* Classes in Black */}
                  <div
                    className={`text-[11px] sm:text-sm font-black mt-0.5 sm:mt-1 mb-2.5 sm:mb-3 ${
                      isFourthBox ? 'text-black' : 'text-black font-extrabold'
                    }`}
                  >
                    {wing.classes}
                  </div>

                  {/* Features list in Black */}
                  <div
                    className={`space-y-1.5 sm:space-y-2 pt-2 border-t ${
                      isFourthBox ? 'border-black/20' : 'border-slate-100'
                    }`}
                  >
                    {wing.features.map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-1.5 text-[9px] sm:text-xs text-black font-bold"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isFourthBox ? 'bg-black' : 'bg-black'
                          }`}
                        />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="pt-3.5 sm:pt-5">
                  <Link
                    href="/admissions"
                    className={`w-full inline-block text-center py-2 sm:py-2.5 px-2 rounded-xl font-black text-[9px] sm:text-xs uppercase tracking-wider transition shadow-sm ${
                      isFourthBox
                        ? 'bg-black hover:bg-slate-900 text-white'
                        : 'bg-[#0D2056] hover:bg-black text-white'
                    }`}
                  >
                    Enquire Wing
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
