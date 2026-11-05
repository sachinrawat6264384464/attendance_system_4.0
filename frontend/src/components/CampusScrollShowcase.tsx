'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ShowcasePhotoItem {
  id: string;
  title: string;
  image: string;
  cardClasses: string;
  shapeClasses: string;
}

// Varied Bento / Mosaic Layout:
// Some images are WIDER (col-span-2 landscape), some are TALLER (aspect-[3/4] portrait height), and some are compact!
const SHOWCASE_PHOTOS: ShowcasePhotoItem[] = [
  {
    id: 'smart-class',
    title: 'Smart Digital Classroom',
    image: '/images/om-smart-classroom.jpg',
    // WIDE WIDTH: spans 2 columns in landscape
    cardClasses: 'col-span-2 sm:col-span-2 lg:col-span-2 aspect-[16/10] sm:aspect-[16/9]',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
  {
    id: 'computer-lab',
    title: 'Computer Science & Coding Lab',
    image: '/images/om-computer-lab.jpg',
    // TALL HEIGHT: portrait archway
    cardClasses: 'col-span-1 aspect-[3/4] sm:aspect-[2/3]',
    shapeClasses: 'rounded-t-[2.5rem] sm:rounded-t-[3.5rem] rounded-b-2xl',
  },
  {
    id: 'sports-ground',
    title: 'Athletic Sports Field & Tracks',
    image: '/images/om-sports-ground.jpg',
    cardClasses: 'col-span-1 aspect-square sm:aspect-[4/3]',
    shapeClasses: 'rounded-[2rem] sm:rounded-[2.8rem]',
  },
  {
    id: 'library',
    title: 'Children Reading Library',
    image: '/images/om-library.jpg',
    cardClasses: 'col-span-1 aspect-square',
    shapeClasses: 'rounded-2xl sm:rounded-3xl border-2 border-amber-300/40',
  },
  {
    id: 'science-lab',
    title: 'Science Practical Laboratory',
    image: '/images/om-science-lab.jpg',
    // TALL HEIGHT: asymmetric portrait
    cardClasses: 'col-span-1 aspect-[3/4] sm:aspect-[2/3]',
    shapeClasses: 'rounded-tl-3xl rounded-br-3xl rounded-tr-xl rounded-bl-xl',
  },
  {
    id: 'cultural-celebration',
    title: 'Annual Day Stage Performance',
    image: '/images/om-cultural-celebration.jpg',
    // WIDE WIDTH: panoramic stage
    cardClasses: 'col-span-2 sm:col-span-2 lg:col-span-2 aspect-[16/9] sm:aspect-[21/9]',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
  {
    id: 'campus-facade',
    title: 'School Campus Front Entrance',
    image: '/images/om-school-building.jpg',
    cardClasses: 'col-span-1 aspect-[4/3]',
    shapeClasses: 'rounded-t-2xl rounded-b-[2.5rem]',
  },
  {
    id: 'campus-aerial',
    title: 'Om Public School Dabra Campus',
    image: '/images/om-hero-campus-hd.jpg',
    // WIDE WIDTH: sprawling campus view
    cardClasses: 'col-span-2 sm:col-span-2 lg:col-span-2 aspect-[16/10]',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
  {
    id: 'kindergarten-play',
    title: 'Kindergarten Montessori Activity Room',
    image: '/images/om-kindergarten-play.jpg',
    cardClasses: 'col-span-1 aspect-[4/3] sm:aspect-square',
    shapeClasses: 'rounded-[2rem] sm:rounded-[2.5rem]',
  },
  {
    id: 'yoga-assembly',
    title: 'Morning Assembly & Yoga Courtyard',
    image: '/images/om-yoga-assembly.jpg',
    // TALL HEIGHT: vertical assembly posture
    cardClasses: 'col-span-1 aspect-[3/4] sm:aspect-[2/3]',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
  {
    id: 'learning-corner',
    title: 'Classroom Activity & Discovery',
    image: '/images/gallery-1.jpg',
    cardClasses: 'col-span-1 aspect-square',
    shapeClasses: 'rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-tl-xl rounded-br-xl',
  },
  {
    id: 'creative-arts',
    title: 'Creative Arts & Music Session',
    image: '/images/gallery-2.jpg',
    cardClasses: 'col-span-1 aspect-[4/3]',
    shapeClasses: 'rounded-2xl sm:rounded-3xl',
  },
];

export default function CampusScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeModalPhoto, setActiveModalPhoto] = useState<ShowcasePhotoItem | null>(null);
  const [cardFactors, setCardFactors] = useState<{ [index: number]: number }>({});
  const [windowWidth, setWindowWidth] = useState<number>(1024);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        const newFactors: { [index: number]: number } = {};

        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);

          // Focus zone: within center 48% of screen, factor drops to 0 (clean & bright)
          // Near top/bottom edges of screen, factor approaches 1 (dark form)
          const maxDist = viewportHeight * 0.48;
          const factor = Math.min(1, Math.max(0, dist / maxDist));
          newFactors[idx] = factor;
        });

        setCardFactors(newFactors);
      });
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Dynamic Bento Grid: Varied Widths (col-span-2) and Heights (aspect-[3/4]) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 items-center">
        {SHOWCASE_PHOTOS.map((item, idx) => {
          // Direction of entry: left columns shift left (-1), right columns shift right (+1)
          let dir = -1;
          if (windowWidth >= 1024) {
            dir = idx % 4 < 2 ? -1 : 1;
          } else if (windowWidth >= 640) {
            dir = idx % 3 === 0 ? -1 : idx % 3 === 2 ? 1 : 0;
          } else {
            // Mobile: 2 cols
            dir = idx % 2 === 0 ? -1 : 1;
          }

          // factor: 0 at center of screen, 1 at screen top/bottom
          const factor = cardFactors[idx] !== undefined ? cardFactors[idx] : 0.8;

          // Scroll Transition:
          // In center (factor = 0):
          //   translateX = 0, brightness = 1.0, dark overlay = 0%, clean & bright!
          // Outside (factor = 1):
          //   translateX = dir * 28px (slides from left/right)
          //   brightness = 0.32 (dark form)
          //   dark overlay = 55%
          const translateX = dir * factor * 28;
          const brightness = Math.max(0.3, 1 - factor * 0.7);
          const contrast = 1.05 - factor * 0.15;
          const grayscale = factor * 0.35;
          const scale = 1 - factor * 0.05;
          const opacity = Math.max(0.65, 1 - factor * 0.35);

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => setActiveModalPhoto(item)}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                filter: `brightness(${brightness}) contrast(${contrast}) grayscale(${grayscale})`,
                opacity: opacity,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease, opacity 0.45s ease',
                willChange: 'transform, filter, opacity',
              }}
              className={`group relative overflow-hidden bg-slate-900 border-2 border-slate-200/90 shadow-md hover:!brightness-100 hover:!contrast-105 hover:!grayscale-0 hover:!scale-105 hover:!translate-x-0 hover:!opacity-100 hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                item.cardClasses
              } ${item.shapeClasses || 'rounded-2xl sm:rounded-3xl'}`}
            >
              {/* Pure High-Definition Image - 100% Clean, NO Text, NO Badges */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dynamic Dark Form Overlay that Fades Away When Centered */}
              <div
                style={{ opacity: factor * 0.55 }}
                className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 group-hover:!opacity-0"
              />
            </div>
          );
        })}
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
