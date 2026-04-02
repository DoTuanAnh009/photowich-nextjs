"use client";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { TestimonialSection } from "@/types/home";
import { useEffect, useRef, useState } from "react";

export function TestimonialSection({ heading, headingDescription, testimonials }: TestimonialSection) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  // Start in the middle set to allow seamless left/right movement
  // Tinh chỉnh Responsive chi tiết hơn
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // To handle very few testimonials (e.g. 1 or 2), we repeat the list enough times to fill the view
  const baseTestimonials = testimonials || [];
  const blockCount = baseTestimonials.length;

  // Calculate how many times we need to repeat the list to ensure infinite loop
  const minRequiredLength = visibleCount * 2 + blockCount;
  const repeatTimes = blockCount > 0 ? Math.max(3, Math.ceil(minRequiredLength / blockCount)) : 0;
  const extendedTestimonials = Array(repeatTimes).fill(baseTestimonials).flat();

  const [activeIndex, setActiveIndex] = useState(blockCount);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Arrow navigation
  const goToPrev = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev - 1);
  };
  const goToNext = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev + 1);
  };

  // Handle seamless loop (Silent Jump)
  const handleTransitionEnd = () => {
    // If we've moved into the third set, jump back to middle set
    if (activeIndex >= blockCount * 2) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex - blockCount);
    }
    // If we've moved into the first set, jump forward to middle set
    else if (activeIndex < blockCount) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex + blockCount);
    }
  };

  // Re-enable transition after silent jump
  useEffect(() => {
    if (!isTransitioning) {
      // Small delay to allow the "instant" jump to render without animation
      const timeout = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  // Auto-play logic
  useEffect(() => {
    if (isHovered || blockCount <= 1) return;
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, blockCount, activeIndex, isTransitioning]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      className="bg-white dark:bg-slate-900 py-12 px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl w-full mx-auto text-center">
        <h2 className="text-navy-custom dark:text-white text-2xl md:text-4xl font-black uppercase mb-4 tracking-tight">
          {heading || "CUSTOMER TESTIMONIAL"}
        </h2>
        {typeof headingDescription === "string" && headingDescription && (
          <p className="text-slate-500 dark:text-slate-400 text-base mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
            {headingDescription}
          </p>
        )}

        <div className="relative px-2 md:px-0 group">
          {/* Previous Arrow */}
          {blockCount > 1 && (
            <button
              className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 size-10 md:size-12 rounded-full border-2 border-navy-custom/20 flex items-center justify-center text-navy-custom bg-white hover:bg-navy-custom hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
              onClick={goToPrev}
              aria-label="Previous testimonials"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          )}

          {/* Slider Container */}
          <div className="overflow-hidden w-full pb-12">
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${(activeIndex * 100) / extendedTestimonials.length}%)`,
                width: `${(extendedTestimonials.length * 100) / visibleCount}%`
              }}
            >
              {extendedTestimonials.map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  style={{ flex: `0 0 ${100 / extendedTestimonials.length}%` }}
                  className="px-3"
                >
                  <div className="bg-navy-custom p-6 md:p-8 rounded-[2rem] text-left text-white shadow-xl flex flex-col justify-between h-full group/card transition-all duration-300 hover:shadow-primary/30">
                    <div>
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-orange-custom text-xl">star</span>
                        ))}
                      </div>
                      <p className="text-sm md:text-base leading-relaxed text-white/90 italic mb-6 line-clamp-6">
                        {`"${t.quote}"`}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                      <StrapiImage
                        media={t.avatar}
                        alt={t.name}
                        width={60}
                        height={60}
                        className="size-14 rounded-full border-2 border-orange-custom/50 object-cover"
                      />
                      <div>
                        <h5 className="text-orange-custom font-bold text-lg leading-none mb-1">{t.name}</h5>
                        {t.role && <p className="text-sm text-white/60">{t.role}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nút Phải */}
          {blockCount > 1 && (
            <button
              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 size-10 md:size-12 rounded-full border-2 border-navy-custom/20 flex items-center justify-center text-navy-custom bg-white hover:bg-navy-custom hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100"
              onClick={goToNext}
              aria-label="Next testimonials"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          )}

          {/* Dấu chấm điều hướng (Indicators) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {baseTestimonials.map((_, idx) => (
              <button
                key={idx}
                className={`transition-all duration-300 rounded-full h-2 ${(activeIndex % blockCount) === idx
                    ? "bg-orange-custom w-8"
                    : "bg-slate-300 dark:bg-slate-700 w-2 hover:bg-slate-400"
                  }`}
                onClick={() => {
                  if (!isTransitioning) return;
                  setActiveIndex(blockCount + idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
