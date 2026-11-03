'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/FloatingContact';
import { Sparkles, Camera, ArrowRight, Eye, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tagColor: string;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Play & Sensory',
    'Celebrations',
    'Puppet Theatre',
    'Campus & Dining',
    'Learning Corners',
    'Outdoor Playground',
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'jamboree',
      title: 'Jamboree Annual Day Stage Celebration',
      category: 'Celebrations',
      image: '/images/gallery-1.jpg',
      description:
        'Our vibrant annual cultural extravaganza celebrating our young achievers with music, drama, and heartfelt applause.',
      tagColor: 'bg-[#1B365D]',
    },
    {
      id: 'night-festival',
      title: 'Illuminated Campus Evening Carnival',
      category: 'Celebrations',
      image: '/images/gallery-2.jpg',
      description:
        'Magical fairyland evening with colorful canopies, fairy lights, and joyful bonding between parents, children, and teachers.',
      tagColor: 'bg-[#E91E63]',
    },
    {
      id: 'sensory-science',
      title: 'Botanical & Color Sensory Chemistry',
      category: 'Play & Sensory',
      image: '/images/gallery-3.jpg',
      description:
        'Hands-on natural science exploration with botanical infusions, colorful water jars, and olfactory discovery.',
      tagColor: 'bg-[#76A136]',
    },
    {
      id: 'community-dining',
      title: 'Community Meal Dining & Food Gratitude',
      category: 'Campus & Dining',
      image: '/images/gallery-4.jpg',
      description:
        'Shared wholesome dining sessions fostering table etiquette, conscious nutrition, mindful eating habits, and camaraderie.',
      tagColor: 'bg-[#E87722]',
    },
    {
      id: 'sand-pit',
      title: 'Sensory Sand Pit & Fine Motor Play',
      category: 'Play & Sensory',
      image: '/images/gallery-5.jpg',
      description:
        'Tactile outdoor sand exploration where children build fine motor grip, spatial awareness, and imaginative castles.',
      tagColor: 'bg-[#00695C]',
    },
    {
      id: 'theatrical-singing',
      title: 'Theatrical Stage & Cultural Role-Play',
      category: 'Celebrations',
      image: '/images/gallery-6.jpg',
      description:
        'Fostering stage confidence, vocal projection, and traditional cultural awareness with joyful musical performances.',
      tagColor: 'bg-[#7B1FA2]',
    },
    {
      id: 'mentor-felicitation',
      title: 'Mentor Felicitation & Academic Excellence',
      category: 'Celebrations',
      image: '/images/gallery-7.jpg',
      description:
        'Honoring our certified early childhood educators and Montessorians for nurturing young minds with care.',
      tagColor: 'bg-[#1B365D]',
    },
    {
      id: 'community-gathering',
      title: 'Parents & Educators Community Gathering',
      category: 'Celebrations',
      image: '/images/gallery-8.jpg',
      description:
        'Strong parent-school collaboration creating a supportive, transparent ecosystem for every child’s holistic growth.',
      tagColor: 'bg-[#76A136]',
    },
    {
      id: 'ball-pit',
      title: 'Sensory Ball Pit & Soft Play Area',
      category: 'Play & Sensory',
      image: '/images/hero-playroom.jpg',
      description:
        'A vibrant, padded sensory exploration arena with non-toxic colorful balls, rocking animal trainers, and joyful wall murals.',
      tagColor: 'bg-[#1B365D]',
    },
    {
      id: 'welcome-arch',
      title: 'Dandelion Kidz Campus Entrance & Welcome Arch',
      category: 'Campus & Dining',
      image: '/images/welcome-entrance.jpg',
      description:
        'Colorful circular balloon canopy welcoming our little stars each morning into a secure and joyful learning sanctuary.',
      tagColor: 'bg-[#76A136]',
    },
    {
      id: 'puppet-theatre',
      title: 'The Puppet Theatre & Storytelling Corner',
      category: 'Puppet Theatre',
      image: '/images/hero-playroom.jpg',
      description:
        'Handmade animal puppets where children build verbal communication, self-expression, and empathetic role-play instincts.',
      tagColor: 'bg-[#E87722]',
    },
    {
      id: 'outdoor-play',
      title: 'Outdoor Adventure Slides & Playground',
      category: 'Outdoor Playground',
      image: '/images/franchisee-playground.jpg',
      description:
        'Child-safe turf, ladder bridges, and swings designed to refine gross motor agility, balance, and cooperative play.',
      tagColor: 'bg-[#E91E63]',
    },
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
      <section className="bg-gradient-to-b from-[#F0F7E8] to-[#FCFDFD] pt-12 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#76A136] text-xs font-bold uppercase tracking-widest shadow-xs border border-[#76A136]/20">
            <Camera className="w-4 h-4" />
            Life at Dandelion Kidz
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-[#1B365D]">Campus </span>
            <span className="text-[#76A136]">Photo Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
            Take a visual tour through our thoughtfully designed child-friendly campus, sensory ball pits, puppet theatre, and joyful learning corners.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-[#1B365D] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/90 text-[#1B365D] flex items-center justify-center shadow-lg">
                    <Eye className="w-6 h-6" />
                  </span>
                </div>
                <span
                  className={`absolute top-4 left-4 text-[11px] font-bold text-white px-3 py-1 rounded-full shadow-sm ${item.tagColor}`}
                >
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-[#1B365D] mb-2 group-hover:text-[#76A136] transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#76A136]">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-96 w-full bg-slate-900">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <span
                className={`inline-block text-[11px] font-bold text-white px-3 py-1 rounded-full ${activePhoto.tagColor}`}
              >
                {activePhoto.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B365D]">
                {activePhoto.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activePhoto.description}
              </p>
              <div className="pt-2">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1B365D] hover:bg-[#152a48] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow transition"
                >
                  Book Campus Visit
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Footer Section */}
      <section className="bg-gradient-to-r from-[#1B365D] to-[#254673] py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Want to Experience Our Campus in Person?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            We welcome parents to visit Dandelion Kidz Rajkot campus, tour our facilities, and observe our Reggio-inspired classrooms.
          </p>
          <div className="pt-2">
            <Link
              href="/admissions"
              className="px-8 py-3 bg-[#76A136] hover:bg-[#688f30] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition inline-flex items-center gap-2"
            >
              Schedule A Campus Tour
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
