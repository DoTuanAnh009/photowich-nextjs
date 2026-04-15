import React from 'react';
import { SiteLogo } from '@/components/ui/SiteLogo';

// Gallery/logo fixed layout for About Us left section
const galleryImages = [
  '/about-us/interior.jpg',
  '/about-us/exterior.jpg',
  '/about-us/kitchen.jpg',
  '/about-us/living-room.jpg',
  '/about-us/modern-design.jpg',
];

export function AboutUsGallery() {
  return (
    <section className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-lg aspect-square">
        {/* Logo center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[80%] opacity-20 blur-2xl bg-primary absolute"></div>
          <div className="w-[60%] h-[60%] transition-transform duration-700 hover:scale-105 flex items-center justify-center">
            <div className="relative w-48 h-48 drop-shadow-2xl transform rotate-3 flex items-center justify-center">
              <SiteLogo size={180} />
            </div>
          </div>
        </div>
        {/* Floating gallery images */}
        <div className="absolute top-[10%] left-[5%] w-32 h-24 rounded-lg overflow-hidden shadow-xl border-2 border-white transform -rotate-12 transition-transform hover:scale-110 duration-300">
          <img alt="Interior" className="w-full h-full object-cover" src={galleryImages[0]} />
        </div>
        <div className="absolute top-[15%] right-[10%] w-28 h-20 rounded-lg overflow-hidden shadow-xl border-2 border-white transform rotate-6 transition-transform hover:scale-110 duration-300">
          <img alt="Exterior" className="w-full h-full object-cover" src={galleryImages[1]} />
        </div>
        <div className="absolute bottom-[20%] left-[10%] w-24 h-24 rounded-lg overflow-hidden shadow-xl border-2 border-white transform -rotate-6 transition-transform hover:scale-110 duration-300">
          <img alt="Kitchen" className="w-full h-full object-cover" src={galleryImages[2]} />
        </div>
        <div className="absolute bottom-[15%] right-[5%] w-36 h-28 rounded-lg overflow-hidden shadow-xl border-2 border-white transform rotate-12 transition-transform hover:scale-110 duration-300">
          <img alt="Living Room" className="w-full h-full object-cover" src={galleryImages[3]} />
        </div>
        <div className="absolute top-1/2 -right-[5%] -translate-y-1/2 w-24 h-32 rounded-lg overflow-hidden shadow-xl border-2 border-white transform -rotate-3 transition-transform hover:scale-110 duration-300">
          <img alt="Modern Design" className="w-full h-full object-cover" src={galleryImages[4]} />
        </div>
      </div>
    </section>
  );
}
