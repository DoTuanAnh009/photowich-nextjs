"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";

// Import react-compare-image động để tránh SSR lỗi
const ReactCompareImage = dynamic(() => import('react-compare-image'), { ssr: false });
import type { ServiceCategory, ServiceListSection as ServiceListSectionType, ServiceReference } from "@/types/home";
// Nếu chưa có trường description, có thể bổ sung vào ServiceReference ở types/home.ts
import { StrapiImage } from "@/components/ui/StrapiImage";

// Hàm lấy url đầy đủ từ media object của Strapi
function getStrapiMediaUrl(media?: { url?: string } | null): string {
  if (!media || !media.url) return "";
  // Nếu url đã có domain thì trả về luôn, nếu không thì nối với baseURL
  if (media.url.startsWith("http")) return media.url;
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  return baseURL.replace(/\/$/, "") + media.url;
}



export function ServiceListSection({ heading, services }: ServiceListSectionType) {
  // Category filter: local state only, no URL hash
  const [activeCategory, setActiveCategory] = useState<string | null>(
    () => {
      // Tự động active category đầu tiên nếu có
      if (services && services.length > 0) {
        const firstCat = services.find(s => s.category)?.category;
        return firstCat ? firstCat.title : null;
      }
      return null;
    }
  );
  if (!services || services.length === 0) return null;


  // Get unique categories and dynamic labels from services
  const categoryLabels: Record<string, string> = {};
  const categories = services
    .map(s => {
      if (s.category) {
        categoryLabels[s.category.title] =
          s.category.title.charAt(0).toUpperCase() + s.category.title.slice(1);
        return s.category;
      }
      return null;
    })
    .filter(Boolean)
    .reduce<ServiceCategory[]>((acc, cat) => {
      // Loại bỏ trùng nhau dựa trên id
      if (!acc.some(c => c.id === (cat as ServiceCategory).id)) {
        acc.push(cat as ServiceCategory);
      }
      return acc;
    }, []);

  // Filter services by active category
const filteredServices = useMemo(() => (
  activeCategory
    ? services.filter(s => s.category?.title === activeCategory)
    : services
), [services, activeCategory]);

  return (
    <section className="max-w-4xl w-full mx-auto py-8 px-2 md:px-4">
      {heading && (
        <h2 className="text-2xl md:text-3xl font-black text-center mb-6 animate-slide-up animation-delay-100">
          {heading}
        </h2>
      )}
      {/* Category filter buttons */}
      {categories.length > 0 && (
        <div className="flex justify-center gap-4 mb-10" role="tablist" aria-label="Service categories">
          {categories.map((cat) => (
            <button
              key={cat.title}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.title}
              aria-controls="service-list"
              tabIndex={0}
              className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider border transition-colors ${activeCategory === cat.title ? "bg-primary text-white border-primary" : "bg-white dark:bg-slate-900 text-primary border-primary/30 hover:bg-primary/10"}`}
              onClick={() => setActiveCategory(cat.title)}
            >
              {categoryLabels[cat.title] || cat.title}
            </button>
          ))}
        </div>
      )}
      <div id="service-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service, idx) => {
          // Ưu tiên hiển thị title/description từ service.seo nếu có, fallback sang title/description gốc
          const displayTitle = service.seo?.title || service.title;
          const displayDescription = service.seo?.description || service.description;
          return (
            <div
              key={service.id}
              className={`group bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary animate-fade-in animation-delay-${(idx+1)*100} p-4 w-full flex flex-col`}
              style={{ animationDelay: `${150 + idx * 100}ms` }}
              tabIndex={0}
              aria-label={displayTitle}
            >
              <div className="relative w-full h-48 md:h-56 overflow-hidden flex items-center justify-center">
                {/* Custom label Before/After ở góc trên */}
                {service.background_image_before && service.background_image_after ? (
                  <>
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">Before</span>
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">After</span>
                    </div>
                                <ReactCompareImage
                                  leftImage={getStrapiMediaUrl(service.background_image_before)}
                                  rightImage={getStrapiMediaUrl(service.background_image_after)}
                                  leftImageAlt={displayTitle + " - before"}
                                  rightImageAlt={displayTitle + " - after"}
                                  sliderLineColor="#ffffff"
                                  sliderLineWidth={4}
                                  handleSize={40}
                                  vertical={false}
                                  hover
                                  skeleton={<div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse" style={{minHeight: 180}}>Loading...</div>}
                                />
                  </>
                ) : (
                  <StrapiImage
                    media={service.background_image}
                    alt={displayTitle}
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    priority={idx === 0}
                  />
                )}
            <div style={{ pointerEvents: 'none' }} className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />              </div>
              <div className="p-6 flex flex-col gap-2 items-center flex-1 w-full">
                <h3 className="text-lg md:text-xl font-bold text-navy-custom dark:text-white group-hover:text-primary transition-colors text-center">
                  {displayTitle}
                </h3>
                {displayDescription && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-2">{displayDescription}</p>
                )}
                <div className="flex-1 w-full" />
                <a
                  href={`/service/${service.slug}`}
                  className="mt-2 px-6 py-2 rounded-full bg-yellow-400 text-navy-custom font-bold text-sm shadow hover:bg-yellow-500 transition-colors"
                  tabIndex={0}
                  aria-label={`Xem dịch vụ ${displayTitle}`}
                >
                  View service
                </a>
                
              </div>
            </div>
          );
        })}
      </div>
      {/* Button TRY OUR SERVICES cuối section */}
      <div className="flex justify-center mt-12">
        <button
          type="button"
          className="fade-in-animate px-8 py-3 rounded-full border-2 border-navy-custom bg-navy-custom text-white font-bold text-base tracking-wide shadow transition-all duration-300 ease-in-out hover:bg-white hover:text-navy-custom hover:border-navy-custom focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ animationDelay: "300ms" }}
          aria-label="Try our services"
          onClick={() => {
            const el = document.getElementById('try-for-free-form');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }}
        >
          TRY OUR SERVICES
        </button>
      </div>
    </section>
  );
}
