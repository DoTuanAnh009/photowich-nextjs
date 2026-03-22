"use client";
import type { TestimonialSection } from "@/types/home";
import { useState, useRef, useEffect } from "react";
import { useEffect as useIsomorphicLayoutEffect, useState as useIsomorphicState } from "react";
import { StrapiImage } from "@/components/ui/StrapiImage";

export function TestimonialSection({ heading,headingDescription, testimonials }: TestimonialSection) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const blockCount = testimonials?.length || 0;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive: 1 block mobile, 3 block desktop
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    function handleResize() {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Arrow navigation
  const goToPrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - visibleCount + blockCount) % blockCount);
  };
  const goToNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + visibleCount) % blockCount);
  };

  if (!testimonials || testimonials.length === 0) return null;

  // Get visible testimonials (slide window)
  let visibleTestimonials = testimonials.slice(activeIndex, activeIndex + visibleCount);
  if (visibleTestimonials.length < visibleCount) {
    visibleTestimonials = visibleTestimonials.concat(testimonials.slice(0, visibleCount - visibleTestimonials.length));
  }

  return (
    <section className="bg-white dark:bg-slate-900 py-6 px-2">
      <div className="max-w-4xl w-full mx-auto text-center">
        <h2 className="text-navy-custom dark:text-white text-2xl md:text-3xl font-black uppercase mb-6">{heading || "CUSTOMER TESTIMONIAL"}</h2>
        {typeof headingDescription === "string" && headingDescription && (
          <p className="text-slate-500 dark:text-slate-400 text-base mb-6 max-w-3xl mx-auto px-2 leading-snug">
            {headingDescription}
          </p>
        )}
        <div className="relative px-2 md:px-0">
          {/* Nút điều hướng trái */}
          {blockCount > visibleCount && (
            <button
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full border-2 border-navy-custom/20 flex items-center justify-center text-navy-custom bg-white hover:bg-navy-custom hover:text-white transition-all shadow-md"
              onClick={goToPrev}
              aria-label="Previous testimonials"
              tabIndex={0}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          )}
          {/* Slider block */}
          <div className={`grid gap-4 w-full justify-center overflow-hidden md:min-h-[320px] ${visibleCount === 1 ? 'grid-cols-1' : 'grid-cols-3'}`}> 
            {visibleTestimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`w-full bg-navy-custom p-6 md:p-7 rounded-3xl text-left text-white shadow-2xl flex flex-col justify-between h-full testimonial-slide ${direction === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
                style={{ animationDelay: `${150 + idx * 100}ms` }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined star-rating">star</span>
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-white italic mb-3">{`"${t.quote}"`}</p>
                </div>
                <div className="flex items-center gap-4">
                  <StrapiImage
                    media={t.avatar}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="size-14 rounded-full border-2 border-white/20 object-cover"
                  />
                  <div>
                    <h5 className="text-orange-custom font-black text-lg">{t.name}</h5>
                    {t.role && <p className="text-sm text-white/70">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Nút điều hướng phải */}
          {blockCount > visibleCount && (
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full border-2 border-navy-custom/20 flex items-center justify-center text-navy-custom bg-white hover:bg-navy-custom hover:text-white transition-all shadow-md"
              onClick={goToNext}
              aria-label="Next testimonials"
              tabIndex={0}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          )}
        </div>
        <style>{`
          .testimonial-slide {
            opacity: 0;
            transform: translateX(40px);
            animation: testimonial-fade-in 0.6s cubic-bezier(.4,0,.2,1) forwards;
          }
          .slide-in-left {
            animation-name: testimonial-slide-in-left;
          }
          .slide-in-right {
            animation-name: testimonial-slide-in-right;
          }
          @keyframes testimonial-slide-in-left {
            0% { opacity: 0; transform: translateX(-40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes testimonial-slide-in-right {
            0% { opacity: 0; transform: translateX(40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes testimonial-fade-in {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
