"use client";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { PartnersSection } from "@/types/home";
import { useEffect, useRef, useState } from "react";

export function PartnersSection({ heading, partners }: PartnersSection) {
  const [activeIndex, setActiveIndex] = useState(0);
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 640) return 3;
      return 2;
    }
    return 4;
  };
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [isHovered, setIsHovered] = useState(false);
  const slideCount = partners?.length || 0;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  if (!partners || partners.length === 0) return null;

  // Auto-play logic
  useEffect(() => {
    if (isHovered || slideCount <= visibleCount) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 2500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, slideCount, visibleCount]);

  // Arrow navigation
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  const goToNext = () => setActiveIndex((prev) => (prev + 1) % slideCount);
  const goToSlide = (idx: number) => setActiveIndex(idx);

  // Nếu số lượng item <= visibleCount thì không trượt, không arrow/indicator, width 100%, căn giữa
  const isStatic = slideCount <= visibleCount;
  return (
    <section
      className="bg-white dark:bg-slate-900 py-8 px-2 border-t border-slate-100 dark:border-slate-800"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Partner slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}  
    >
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-navy-custom dark:text-white text-3xl font-black uppercase mb-6 text-center tracking-wider">
          {heading || "OUR PARTNERS"}
        </h2>
        <div className="relative w-full flex flex-col items-center justify-center min-h-[100px]">
          <div className="w-full overflow-hidden relative">
            <div
              className={`flex gap-4 transition-transform duration-700 ease-in-out ${isStatic ? 'justify-center' : ''}`}
              style={isStatic ? {
                width: '100%',
                transform: 'none',
              } : {
                width: `${slideCount * (100 / visibleCount)}%`,
                transform: `translateX(-${(activeIndex * (100 / slideCount))}%)`,
              }}
            >
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className={
                    [
                      "swiper-slide swiper-slide-active border-solid !flex border-[3px] border-[#043263] rounded-[17px] lg:rounded-[31px] !h-[80px] !w-[150px] max-w-[150px] md:!w-[200px] md:max-w-[200px] md:!h-[110px] items-center justify-center p-6",
                      // ...add any dynamic classes if needed...
                    ].join(" ")
                  }
                  style={{
                    flex: `0 0 calc(100% / ${visibleCount})`,
                    opacity: 1,
                    transition: 'opacity 0.5s cubic-bezier(.4,0,.2,1)',
                  }}
                >
                  {partner.logo ? (
                    <StrapiImage
                      media={partner.logo}
                      alt={partner.name || "Partner logo"}
                      width={76}
                      height={32}
                      className="object-contain w-[76px] h-auto max-h-8 mx-auto"
                    />
                  ) : (
                    <span className="text-xs sm:text-base font-black text-navy-custom tracking-tight">
                      {partner.name || "Partner"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Arrow navigation */}
          {!isStatic && (
            <>
              <button
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-20 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                style={{left: 0}}
                onClick={goToPrev}
                aria-label="Previous partner"
                tabIndex={0}
              >
                <span aria-hidden="true">&#8592;</span>
              </button>
              <button
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-20 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                style={{right: 0}}
                onClick={goToNext}
                aria-label="Next partner"
                tabIndex={0}
              >
                <span aria-hidden="true">&#8594;</span>
              </button>
              {/* Mobile: show inside content */}
              <button
                className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={goToPrev}
                aria-label="Previous partner"
                tabIndex={0}
              >
                <span aria-hidden="true">&#8592;</span>
              </button>
              <button
                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={goToNext}
                aria-label="Next partner"
                tabIndex={0}
              >
                <span aria-hidden="true">&#8594;</span>
              </button>
            </>
          )}
          {/* Slide indicators */}
          {!isStatic && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 z-30 mt-8">
              {partners.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300
                    ${idx === activeIndex ? "bg-primary scale-125 shadow-lg animate-scale-in animation-delay-400" : "bg-white/60"}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to partner ${idx + 1}`}
                  aria-current={idx === activeIndex}
                  tabIndex={0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
