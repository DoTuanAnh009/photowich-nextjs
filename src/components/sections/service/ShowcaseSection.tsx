"use client";
import type { BeforeAfterItem, ShowcaseSection as ShowcaseSectionType } from '@/types/service';
import { useState, useEffect } from 'react';
import { StrapiImage } from '@/components/ui/StrapiImage';
import ReactCompareImage from 'react-compare-image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import Link from 'next/link';

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
            skeleton={<div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse" style={{minHeight: 180}}>Loading...</div>}
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
    const orderText =  cta_text || 'Place an Order';
    const orderSlug =  cta_link || '';
    return (
      <section className="py-6 bg-slate-100 dark:bg-[#E8E8E8]">
        <div className="max-w-6xl flex flex-col gap-4 mx-auto px-6 ">
          {heading && <h2 className="text-2xl md:text-3xl font-bold text-center uppercase text-primary dark:text-white">{heading}</h2>}
          <div className="flex items-center justify-center gap-4 md:gap-12  relative">
            <button
              className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              onClick={() => setActive((active - 1 + before_after.length) % before_after.length)}
              aria-label="Previous"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="w-full md:max-h-[600px] relative overflow-hidden">
              {item.link_url && item.link_url.includes('youtube.com') ? (
                <div className="relative h-full aspect-video rounded-xl overflow-hidden group cursor-pointer shadow-lg">
                  <iframe
                    src={item.link_url.replace('watch?v=', 'embed/')}
                    title={item.caption || 'Video'}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <>
                <div className="absolute top-2 left-2 z-10">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">Before</span>
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">After</span>
                    </div>
                {renderItem(item)}
                </>
              )}
            </div>
            <button
              className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              onClick={() => setActive((active + 1) % before_after.length)}
              aria-label="Next"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className={"text-center flex flex-col gap-4" + (item.caption || item.description ? " mt-2" : "")}>
            <p className="text-primary font-bold ">{item.caption || item.description}</p>
            {orderSlug && (
              <div>
                <Link
                href={orderSlug}
                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2 rounded-full
                 transition-all duration-300 ease-in-out shadow text-lg tracking-wider"
              >
                {orderText} <span className="material-symbols-outlined align-middle ml-2">arrow_forward</span>
              </Link></div>
            )}
          </div>
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
                  !item.link_url &&  <>
                  <div className="absolute top-2 left-2 z-10">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">Before</span>
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">After</span>
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
