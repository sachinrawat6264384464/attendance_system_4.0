'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone Call Button */}
      <a
        href="tel:+917999083379"
        title="Call Om Public School Dabra Desk"
        className="w-13 h-13 rounded-full bg-[#0D2056] hover:bg-[#D32F2F] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition duration-200 border-2 border-white"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917999083379?text=Hello%20Om%20Public%20School%20Dabra,%20I%20would%20like%20to%20enquire%20about%20Admissions%20for%20Session%202027-28."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp with Admissions Desk"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition duration-200 border-2 border-white"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
