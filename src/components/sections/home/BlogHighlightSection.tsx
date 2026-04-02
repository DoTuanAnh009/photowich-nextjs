"use client";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { BlogHighlightSection } from "@/types/home";
import { useEffect, useRef, useState } from "react";

export function BlogHighlightSection({ heading, blog_posts, description }: BlogHighlightSection) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Auto detect visible count
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize(); // run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const baseBlogs = blog_posts || [];
  const blockCount = baseBlogs.length;

  // Seamless infinite slider setup (Ghost Track)
  const minRequiredLength = visibleCount * 2 + blockCount;
  const repeatTimes = blockCount > 0 ? Math.max(3, Math.ceil(minRequiredLength / blockCount)) : 0;
  const extendedBlogs = Array(repeatTimes).fill(baseBlogs).flat();

  const [activeIndex, setActiveIndex] = useState(blockCount);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Arrow Navigation
  const goToPrev = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev - 1);
  };
  const goToNext = () => {
    if (!isTransitioning) return;
    setActiveIndex((prev) => prev + 1);
  };

  // Handle wrap-around seamlessly
  const handleTransitionEnd = () => {
    if (activeIndex >= blockCount * 2) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex - blockCount);
    } else if (activeIndex < blockCount) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex + blockCount);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => setIsTransitioning(true), 20);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  // Auto Play setup
  useEffect(() => {
    if (isHovered || blockCount <= 1) return;
    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 4000); // 4 seconds delay
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, blockCount, activeIndex, isTransitioning]);

  if (!blog_posts || blog_posts.length === 0) return null;

  return (
    <section
      className="bg-navy-custom py-12 px-2 md:px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="text-center mb-10">
          {heading && (
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase mb-3 tracking-wide">{heading}</h2>
          )}
          {description && (
            <p className="text-slate-300 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">{description}</p>
          )}
        </div>

        <div className="relative group px-2 md:px-0">
          {/* Nút điều hướng trái */}
          {blockCount > visibleCount && (
            <button
              className="absolute -left-3 md:-left-12 top-1/2 -translate-y-1/2 z-30 size-10 flex items-center justify-center text-white/50 hover:text-white transition-all ring-1 ring-white/20 hover:ring-white/50 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100"
              onClick={goToPrev}
              aria-label="Previous blogs"
              tabIndex={0}
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
          )}

          {/* Slider Container */}
          <div className="overflow-hidden w-full pb-8">
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${(activeIndex * 100) / extendedBlogs.length}%)`,
                width: `${(extendedBlogs.length * 100) / visibleCount}%`
              }}
            >
              {extendedBlogs.map((blog, idx) => {
                const dateStr = blog.publishedAt || blog.createdAt;
                const formattedDate = dateStr
                  ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateStr))
                  : "";

                return (
                  <div
                    key={`${blog.id}-${idx}`}
                    style={{ flex: `0 0 ${100 / extendedBlogs.length}%` }}
                    className="px-3"
                  >
                    <article
                      className="w-full bg-white rounded-[1.25rem] shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col p-3 h-full group/card"
                    >
                      <div className="overflow-hidden rounded-lg">
                        <StrapiImage
                          media={blog.hero?.featured_image}
                          alt={blog.title}
                          width={320}
                          height={180}
                          className="w-full h-[180px] md:h-[190px] object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
                      </div>

                      <div className="pt-5 pb-3 px-2 flex-1 flex flex-col">
                        <div className="flex justify-between items-center text-[11px] text-slate-500 mb-4 font-semibold uppercase tracking-wider">
                          <a
                            href={blog.slug ? `/blogs/${blog.slug}` : "#"}
                            className="hover:text-primary transition-colors hover:underline"
                          >
                            By: {blog.author?.name || "Staff"}
                          </a>
                          <span>{formattedDate}</span>
                        </div>
                        <h3 className="text-navy-custom text-base md:text-[17px] font-black mb-3 leading-snug line-clamp-2">{blog.title}</h3>
                        {blog.excerpt && (
                          <p className="text-slate-600/90 text-[13px] mb-5 line-clamp-3 flex-1 leading-relaxed">{blog.excerpt}</p>
                        )}
                        <a
                          href={blog.slug ? `/blogs/${blog.category?.slug}/${blog.slug}` : "#"}
                          className="text-slate-400 font-bold uppercase text-[11px] tracking-widest flex items-center gap-1.5 transition-colors duration-200 hover:text-navy-custom mt-auto"
                          style={{ textDecoration: 'none' }}
                        >
                          READ MORE
                        </a>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nút điều hướng phải */}
          {blockCount > visibleCount && (
            <button
              className="absolute -right-3 md:-right-12 top-1/2 -translate-y-1/2 z-30 size-10 flex items-center justify-center text-white/50 hover:text-white transition-all ring-1 ring-white/20 hover:ring-white/50 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100"
              onClick={goToNext}
              aria-label="Next blogs"
              tabIndex={0}
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          )}

          {/* Dấu chấm điều hướng */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {baseBlogs.map((_, idx) => (
              <button
                key={idx}
                className={`transition-all duration-300 rounded-full h-1.5 ${(activeIndex % blockCount) === idx
                  ? "bg-white w-6"
                  : "bg-white/30 w-1.5 hover:bg-white/50"
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
