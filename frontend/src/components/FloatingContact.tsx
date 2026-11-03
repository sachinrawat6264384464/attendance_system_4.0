'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone Call Button */}
      <a
        href="tel:+919876543210"
        title="Call Campus Desk"
        className="w-12 h-12 rounded-full bg-[#1B365D] hover:bg-[#152a48] text-white flex items-center justify-center shadow-lg hover:scale-105 transition duration-200"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Dandelion%20Kidz,%20I%20would%20like%20to%20enquire%20about%20admissions."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg hover:scale-105 transition duration-200"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}

