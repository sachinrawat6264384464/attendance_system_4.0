'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ShowcasePhotoItem {
  id: string;
  title: string;
  image: string;
  cardClasses: string;
  shapeClasses: string;
}

// 12 High-Definition Photos tiled in a balanced, gapless mosaic:
// Four Rows of 4 Columns each (sums to 4 cols per row on desktop, 2 cols on mobile)
// Row 1: 2 + 1 + 1 = 4 cols
// Row 2: 1 + 1 + 2 = 4 cols
// Row 3: 1 + 2 + 1 = 4 cols
// Row 4: 2 + 1 + 1 = 4 cols
// Every row is 100% flush and even with ZERO bottom gap or empty space!
const SHOWCASE_PHOTOS: ShowcasePhotoItem[] = [
  // --- ROW 1 (2 + 1 + 1 = 4 cols) ---
  {
    id: 'smart-class',
    title: 'Smart Digital Classroom',
    image: '/images/om-smart-classroom.jpg',
    cardClasses: 'col-span-2',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
  {
    id: 'computer-lab',
    title: 'Computer Science & Coding Lab',
    image: '/images/om-computer-lab.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-t-[2.5rem] sm:rounded-t-[3rem] rounded-b-2xl',
  },
  {
    id: 'sports-ground',
    title: 'Athletic Sports Field & Tracks',
    image: '/images/om-sports-ground.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-[2rem] sm:rounded-[2.8rem]',
  },

  // --- ROW 2 (1 + 1 + 2 = 4 cols) ---
  {
    id: 'library',
    title: 'Children Reading Library',
    image: '/images/om-library.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-2xl sm:rounded-3xl border-2 border-amber-300/40',
  },
  {
    id: 'science-lab',
    title: 'Science Practical Laboratory',
    image: '/images/om-science-lab.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-tl-3xl rounded-br-3xl rounded-tr-xl rounded-bl-xl',
  },
  {
    id: 'cultural-celebration',
    title: 'Annual Day Stage Performance',
    image: '/images/om-cultural-celebration.jpg',
    cardClasses: 'col-span-2',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },

  // --- ROW 3 (1 + 2 + 1 = 4 cols) ---
  {
    id: 'campus-facade',
    title: 'School Campus Front Entrance',
    image: '/images/om-school-building.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-t-2xl rounded-b-[2.5rem]',
  },
  {
    id: 'campus-aerial',
    title: 'Om Public School Dabra Campus',
    image: '/images/om-hero-campus-hd.jpg',
    cardClasses: 'col-span-2',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
  {
    id: 'kindergarten-play',
    title: 'Kindergarten Montessori Activity Room',
    image: '/images/om-kindergarten-play.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-[2rem] sm:rounded-[2.5rem]',
  },

  // --- ROW 4 (2 + 1 + 1 = 4 cols) ---
  {
    id: 'yoga-assembly',
    title: 'Morning Assembly & Yoga Courtyard',
    image: '/images/om-yoga-assembly.jpg',
    cardClasses: 'col-span-2',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
  {
    id: 'learning-corner',
    title: 'Classroom Activity & Discovery',
    image: '/images/gallery-1.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl',
  },
  {
    id: 'creative-arts',
    title: 'Creative Arts & Music Session',
    image: '/images/gallery-2.jpg',
    cardClasses: 'col-span-1',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
];

export default function CampusScrollShowcase() {
  const [activeModalPhoto, setActiveModalPhoto] = useState<ShowcasePhotoItem | null>(null);

  return (
    <div className="relative">
      {/* 100% Flush, Gapless Responsive Grid: Zero empty gaps at bottom! */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4.5">
        {SHOWCASE_PHOTOS.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalPhoto(item)}
            className={`group relative overflow-hidden bg-slate-100 border-2 border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-40 sm:h-56 lg:h-64 ${
              item.cardClasses
            } ${item.shapeClasses || 'rounded-2xl sm:rounded-3xl'}`}
          >
            {/* Pure Clean HD Image - 100% Bright & Vibrant at all times */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Full-Screen Pure Lightbox on Tap / Click */}
      {activeModalPhoto && (
        <div
          onClick={() => setActiveModalPhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-black rounded-2xl sm:rounded-3xl overflow-hidden max-w-5xl w-full border border-white/20 shadow-2xl"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
              <Image
                src={activeModalPhoto.image}
                alt={activeModalPhoto.title}
                fill
                sizes="(max-width: 1200px) 95vw, 1200px"
                className="object-contain"
              />
              <button
                onClick={() => setActiveModalPhoto(null)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 sm:p-2.5 rounded-full bg-black/70 text-white hover:bg-[#D32F2F] transition border border-white/20 cursor-pointer shadow-lg"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
