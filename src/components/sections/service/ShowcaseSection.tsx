"use client";
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { BeforeAfterItem, ShowcaseSection as ShowcaseSectionType } from '@/types/service';
import Link from 'next/link';
import { useState } from 'react';
import ReactCompareImage from 'react-compare-image';

export function ShowCaseSection({ heading, before_after, cta_text, cta_link, description, is_slide }: ShowcaseSectionType) {
  const [showAll, setShowAll] = useState(false);
  if (!before_after || before_after.length === 0) return null;

  // Helper: render item
  function renderItem(item: BeforeAfterItem) {
    // Case: render video if link_url is youtube
    if (item.link_url && item.link_url.includes('youtube.com')) {
      return (
        <div className="h-full relative aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-lg">
          <iframe
            src={item.link_url.replace('watch?v=', 'embed/')}
            title={item.caption || 'Video'}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      );
    }
    // Case: render compare image if before_image & after_image
    if (item.before_image && item.after_image) {
      const displayTitle = item.caption || item.description || 'Service';
      return (
        <div className={
          `relative w-full  mx-auto rounded-xl overflow-hidden group cursor-pointer shadow-lg max-h-max` +
          (is_slide ? '' : ' ')
        }>
          <>
            <ReactCompareImage
              leftImage={getStrapiMediaUrl(item.before_image)}
              rightImage={getStrapiMediaUrl(item.after_image)}
              leftImageAlt={displayTitle + ' - before'}
              rightImageAlt={displayTitle + ' - after'}
              sliderLineColor="#ffffff"
              sliderLineWidth={4}
              handleSize={32}
              vertical={false}
              hover
              skeleton={<div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse" style={{ minHeight: 180 }}>Loading...</div>}
            /></>
        </div>
      );
    }
    // Final fallback: render placeholder
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden flex items-center justify-center bg-slate-200 dark:bg-slate-700 group cursor-pointer shadow-lg">
        <span className="text-slate-500 dark:text-slate-300 text-lg font-semibold">No image available</span>
      </div>
    );
  }

  // Slide UI
  if (is_slide) {
    const [active, setActive] = useState(0);

    const item = before_after[active];
    // Lấy slug và text từ item hoặc prop (ưu tiên item)
    const orderText = cta_text || 'Place an Order';
    const orderSlug = cta_link || '';
    return (
      <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
          {heading && (
            <h2 className="text-2xl md:text-4xl font-black text-center uppercase tracking-tight text-navy-custom dark:text-white">
              {heading}
            </h2>
          )}

          <div className="relative group/slider max-w-4xl mx-auto w-full">
            {/* Main Visual Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-slate-200">
              {/* Navigation Buttons - Overlay */}
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover/slider:opacity-100 -translate-x-4 group-hover/slider:translate-x-0"
                onClick={() => setActive((active - 1 + before_after.length) % before_after.length)}
                aria-label="Previous"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>

              <div className="w-full h-full relative">
                {item.link_url && item.link_url.includes('youtube.com') ? (
                  <iframe
                    src={item.link_url.replace('watch?v=', 'embed/')}
                    title={item.caption || 'Video'}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className="absolute top-6 left-6 z-20 pointer-events-none">
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-white/20">Before</span>
                    </div>
                    <div className="absolute top-6 right-6 z-20 pointer-events-none">
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-white/20">After</span>
                    </div>
                    {renderItem(item)}
                  </>
                )}
              </div>

              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 opacity-0 group-hover/slider:opacity-100 translate-x-4 group-hover/slider:translate-x-0"
                onClick={() => setActive((active + 1) % before_after.length)}
                aria-label="Next"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>

              {/* CTA Overlay - Bottom */}
              {orderSlug && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover/slider:opacity-100 translate-y-4 group-hover/slider:translate-y-0 transition-all duration-500">
                  <Link
                    href={orderSlug}
                    className="flex items-center gap-3 bg-orange-custom text-navy-custom font-black px-8 py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 uppercase tracking-widest text-sm"
                  >
                    {orderText}
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Pagination / Dots (Optional but nice) */}
            <div className="flex justify-center gap-2 mt-6">
              {before_after.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${active === idx ? 'w-8 bg-primary' : 'w-2 bg-slate-300 dark:bg-slate-700'}`}
                />
              ))}
            </div>
          </div>

          {(item.caption || item.description) && (
            <div className="text-center animate-fade-in">
              <p className="text-navy-custom dark:text-slate-300 text-lg font-bold tracking-tight">
                {item.caption || item.description}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Grid UI
  const maxItems = 6;
  const gridItems = showAll ? before_after : before_after.slice(0, maxItems);
  const hasMore = before_after.length > maxItems && !showAll;

  return (
    <section className="py-6 max-w-5xl mx-auto px-6">
      {heading && <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary dark:text-white">{heading}</h2>}
      {description && <p className="mb-6 text-lg text-slate-600 dark:text-slate-400">{description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gridItems.map((item, idx) => (
          <div
            key={item.id}
            className={`space-y-4 transition-all duration-500 animate-showcase-item`}
            style={showAll ? { animationDelay: `${idx * 60}ms` } : {}}
          >
            <p className="font-semibold text-black dark:text-slate-400">{item.caption || item.description}</p>
            <div className="relative w-full h-[265px] md:h-[265px] overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-xl">
              {renderItem(item)}
              {
                !item.link_url && <>
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-white/20">Before</span>
                  </div>
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-white/20">After</span>
                  </div></>
              }
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .animate-showcase-item {
          animation: showcase-fade-in 0.5s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes showcase-fade-in {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all uppercase tracking-wider text-sm"
            onClick={() => setShowAll(true)}
          >
            Read More
          </button>
        </div>
      )}
    </section>
  );
}
