"use client";
import React, { useState, useRef, useEffect } from "react";
import type { HeroSliderSection } from "@/types/home";
import { StrapiImage } from "@/components/ui/StrapiImage";

export function HeroSliderSection({ slides }: HeroSliderSection) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [revealWordCount, setRevealWordCount] = useState(0); // for heading animation
  const [showSubheading, setShowSubheading] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const headingAnimTimeout = useRef<NodeJS.Timeout | null>(null);
  const slideCount = slides?.length || 0;
  // Auto-play logic
  useEffect(() => {
    if (isHovered || slideCount <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 5500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, slideCount]);

  // Heading animation (word/space by word/space) for first slide, only on first mount
  useEffect(() => {
    if (activeIndex !== 0) return;
    const heading = slides[0]?.heading || "";
    // Split giữ nguyên dấu space (bao gồm cả nhiều space liên tiếp)
    const parts = heading.split(/(\s+)/);
    setRevealWordCount(0);
    setShowSubheading(false);
    setShowCTA(false);
    if (!heading) return;
    let i = 0;
    function revealNext() {
      setRevealWordCount(i + 1);
      i++;
      if (i < parts.length) {
        headingAnimTimeout.current = setTimeout(revealNext, 180);
      } else {
        // After heading animation, show subheading
        setTimeout(() => setShowSubheading(true), 300);
        // After subheading, show CTA
        setTimeout(() => setShowCTA(true), 700);
      }
    }
    revealNext();
    return () => {
      if (headingAnimTimeout.current) clearTimeout(headingAnimTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, slides[0]?.heading]);

  // Arrow navigation
  const goToPrev = () => setActiveIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  const goToNext = () => setActiveIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));

  // Indicator navigation
  const goToSlide = (idx: number) => setActiveIndex(idx);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <section
      className="relative w-full min-h-[420px] md:min-h-[600px] overflow-hidden"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Hero slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {/* Slides */}
      <div className="w-full h-full relative">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full min-h-[420px] md:min-h-[600px] transition-all duration-700 ease-in-out
              ${idx === activeIndex ? "opacity-100 scale-100 z-10 animate-fade-in" : "opacity-0 scale-95 z-0 pointer-events-none"}`}
            aria-hidden={idx !== activeIndex}
            aria-current={idx === activeIndex}
            role="group"
          >
            {/* Background image dùng StrapiImage */}
            <div className="relative w-full h-full min-h-[420px] md:min-h-[600px]">
              <StrapiImage
                media={slide.background_image}
                variant="small"
                alt={slide.heading || "Hero background"}
                fill
                className="object-cover w-full h-full"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              {idx === 0 ? (
                <h1 className="text-white text-3xl md:text-5xl font-black mb-4 animate-slide-up animation-delay-100" style={{ whiteSpace: 'pre-line' }}>
                  {/* Word-by-word reveal */}
                  {(() => {
                    // Split giữ nguyên dấu space (bao gồm cả nhiều space liên tiếp)
                    const parts = slide.heading.split(/(\s+)/);
                    return parts.map((part, i) => (
                      <span
                        key={i}
                        className={`transition-opacity duration-200 ${i < revealWordCount ? "opacity-100" : "opacity-0"}`}
                        aria-hidden={i >= revealWordCount}
                      >
                        {part}
                      </span>
                    ));
                  })()}
                </h1>
              ) : (
                <h2 className="text-white text-3xl md:text-5xl font-black mb-4 animate-slide-up animation-delay-100">
                  {slide.heading}
                </h2>
              )}
              {/* Subheading animation */}
              {slide.subheading && (
                <p
                  className={`text-slate-200 text-lg mb-6 transition-opacity duration-500 ${idx === 0 ? (showSubheading ? "opacity-100" : "opacity-0") : "opacity-100"}`}
                  style={idx === 0 ? { transitionDelay: "0.2s" } : undefined}
                >
                  {slide.subheading}
                </p>
              )}
              {/* CTA animation */}
              <div className={`flex flex-col md:flex-row gap-4 justify-center transition-opacity duration-500 ${idx === 0 ? (showCTA ? "opacity-100" : "opacity-0") : "opacity-100"}`}>
                {slide.primary_cta_text && (
                  <a
                    href={slide.primary_cta_link || "#"}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    tabIndex={0}
                  >
                    {slide.primary_cta_text}
                  </a>
                )}
                {/* Secondary CTA nếu có */}
                {/* {slide.secondary_cta_text && (
                  <a href={slide.secondary_cta_link || "#"} className="bg-white text-primary px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:bg-primary/10 transition-colors">
                    {slide.secondary_cta_text}
                  </a>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow navigation */}
      {slideCount > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={goToPrev}
            aria-label="Previous slide"
            tabIndex={0}
          >
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={goToNext}
            aria-label="Next slide"
            tabIndex={0}
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </>
      )}

      {/* Slide indicators */}
      {slideCount > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300
                ${idx === activeIndex ? "bg-primary scale-125 shadow-lg animate-scale-in animation-delay-400" : "bg-white/60"}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === activeIndex}
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
