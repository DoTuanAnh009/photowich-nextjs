import React, { useState, useRef, useEffect } from "react";
import type { BlogHighlightSection } from "@/types/home";
import { StrapiImage } from "@/components/ui/StrapiImage";

export function BlogHighlightSection({ heading, blogs }: BlogHighlightSection) {
"use client";
  const [activeIndex, setActiveIndex] = useState(0);
  const blogCount = blogs?.length || 0;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  // Responsive: 3 item desktop, 1 item mobile
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024 ? 3 : 1;
    }
    return 1;
  };
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (blogCount <= visibleCount) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + visibleCount) % blogCount);
    }, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [blogCount, visibleCount]);

  // Arrow navigation
  const goToPrev = () => setActiveIndex((prev) => (prev - visibleCount + blogCount) % blogCount);
  const goToNext = () => setActiveIndex((prev) => (prev + visibleCount) % blogCount);

  if (!blogs || blogs.length === 0) return null;

  // Get visible blogs
  const visibleBlogs = blogs.slice(activeIndex, activeIndex + visibleCount);
  if (visibleBlogs.length < visibleCount) {
    visibleBlogs.push(...blogs.slice(0, visibleCount - visibleBlogs.length));
  }

  return (
    <section className="bg-navy-custom py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl font-black uppercase mb-4">OUR BLOGS</h2>
          {heading && (
            <p className="text-slate-300 text-lg">{heading}</p>
          )}
        </div>
        <div className="relative flex items-center justify-center group">
          {/* Nút điều hướng trái */}
          {blogCount > visibleCount && (
            <button
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-sm"
              onClick={goToPrev}
              aria-label="Previous blogs"
              tabIndex={0}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          )}
          {/* Slider block */}
          <div className="flex gap-6 w-full justify-center pb-8">
            {visibleBlogs.map((blog, idx) => (
              <article
                key={blog.id}
                className="min-w-full md:min-w-[380px] snap-start bg-white rounded-[1.5rem] overflow-hidden shadow-xl hover:-translate-y-2 hover:scale-105 transition-transform duration-500 ease-in-out animate-fade-in"
                style={{ animationDelay: `${150 + idx * 100}ms` }}
              >
                <StrapiImage
                  media={blog.cover_image}
                  alt={blog.title}
                  width={380}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-4 font-bold">
                    <span>{blog.author || "Staff"}</span>
                    <span>{blog.date || ""}</span>
                  </div>
                  <h3 className="text-navy-custom text-xl font-black mb-3 leading-tight">{blog.title}</h3>
                  {blog.description && (
                    <p className="text-slate-500 text-sm mb-6 line-clamp-3">{blog.description}</p>
                  )}
                  <a
                    href={blog.slug ? `/blog/${blog.slug}` : "#"}
                    className="text-navy-custom font-black uppercase text-sm tracking-wider flex items-center gap-2 transition-all duration-200 hover:text-primary hover:underline hover:font-extrabold focus:text-primary focus:underline focus:font-extrabold active:text-primary active:underline active:font-extrabold"
                    style={{ textDecoration: 'none' }}
                  >
                    READ MORE <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          {/* Nút điều hướng phải */}
          {blogCount > visibleCount && (
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-sm"
              onClick={goToNext}
              aria-label="Next blogs"
              tabIndex={0}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
