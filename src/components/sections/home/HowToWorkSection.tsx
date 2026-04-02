"use client";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { HowToWorkSection } from "@/types/home";
import { useState } from "react";

// Default icons if none are provided
const DEFAULT_ICONS = [
  // 1: Upload
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
  // 2: Star (Căn giữa hoàn hảo)
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /></svg>,
  // 3: Quality Control (Check circle)
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  // 4: Delivered (Image/Inbox)
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
];

export function HowToWorkSection({ title, description, items, background_image }: HowToWorkSection) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  // Render background image URL
  const bgUrl = background_image?.url
    ? (background_image.url.startsWith('http') ? background_image.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${background_image.url}`)
    : '';

  return (
    <section
      className="relative py-12 px-4 md:px-8 bg-slate-900 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : undefined }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75 z-0"></div>

      <div className="relative z-10 max-w-[1000px] mx-auto">
        <div className="text-center mb-10">
          {title && (
            <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-2 tracking-wide">{title}</h2>
          )}
          {description && (
            <p className="text-base text-white/90">{description}</p>
          )}
        </div>

        <div className="relative pt-4 pb-12">
          {/* Vạch kẻ ngang (chỉ hiện trên desktop) */}
          <div className="hidden md:block absolute top-[88px] left-[10%] right-[10%] h-[3px] bg-slate-700/80 z-0 overflow-hidden rounded-full">
            {/* Thanh tiến trình giả lập hiệu ứng hover */}
            <div
              className="h-full bg-navy-custom transition-all duration-500 ease-in-out"
              style={{ width: hovered !== null ? `${((hovered + 0.5) / items.length) * 100}%` : '0%' }}
            />
          </div>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0 relative z-10">
            {items.map((step, idx) => (
              <div
                key={step.id}
                className="relative flex-1 flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                tabIndex={0}
                aria-label={step.title}
              >
                {/* Phần 1: Icon phía trên */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-[1.5px] transition-all duration-300 ease-in-out mb-4 shadow-lg bg-transparent ${hovered === idx ? 'border-[#0084ff] bg-[#0084ff] text-white scale-110' : 'border-white text-white/90 hover:border-blue-400'}`}
                >
                  {step.icon ? (
                    <StrapiImage
                      media={step.icon}
                      alt={step.title}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <span className={`scale-[0.85] transition-transform duration-300 group-hover:scale-100 ${hovered === idx ? 'opacity-100' : 'opacity-90'}`}>{DEFAULT_ICONS[idx % DEFAULT_ICONS.length]}</span>
                  )}
                </div>

                {/* Phần 2: Vòng tròn số nằm ngay trên vạch kẻ */}
                <div
                  className={`hidden md:flex w-6 h-6 items-center justify-center rounded-full border-[2.5px] border-slate-900 text-xs font-bold shadow-md transition-all duration-300 ease-in-out z-20 ${hovered === idx || (hovered !== null && idx <= hovered) ? 'bg-navy-custom text-white border-navy-custom ring-2 ring-black' : 'bg-[#003466] text-white border-slate-900 ring-2 ring-slate-800'}`}
                >
                  {idx + 1}
                </div>

                {/* Phần 3: Tiêu đề và mô tả phía dưới */}
                <div className="mt-4 md:mt-5 text-center px-2 max-w-[200px]">
                  <h3 className={`text-[14px] md:text-[15px] font-bold transition-colors duration-300 ${hovered === idx ? 'text-white' : 'text-slate-100'}`}>{step.title}</h3>
                  {step.description && (
                    <p className={`text-[12px] md:text-[13px] leading-relaxed mt-1.5 transition-colors duration-300 ${hovered === idx ? 'text-white/95' : 'text-white/70'}`}>{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
