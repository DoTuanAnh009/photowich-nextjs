import { StrapiImage } from "@/components/ui/StrapiImage";
import type { ProcessStepsSection } from "@/types/home";
import { useState } from "react";
// Icon mặc định cho từng bước (hardcoded)
const DEFAULT_ICONS = [
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40" aria-label="Upload Files"><circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" /><path d="M20 26V14M20 14l-5 5M20 14l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40" aria-label="Fotober Editing"><circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" /><path d="M20 12v16M12 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40" aria-label="Quality Control"><circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" /><path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  <svg width="40" height="40" fill="none" viewBox="0 0 40 40" aria-label="Get Them Delivered"><circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" /><path d="M14 26h12M14 14h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
];

export function HowDoesThisWorkSection({ heading, steps }: ProcessStepsSection) {
  "use client";
  const [hovered, setHovered] = useState<number | null>(null);

  if (!steps || steps.length === 0) return null;

  // Icon mapping: nếu có icon từ API thì render, nếu không thì dùng icon mặc định

  return (
    <section className="relative py-20 px-4 md:px-8 bg-linear-to-b from-slate-900/80 to-white">
      {heading && (
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-white">{heading}</h2>
      )}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 max-w-5xl mx-auto relative">
        {/* Vạch kẻ ngang */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 md:h-1 bg-white/40 z-0" style={{ transform: 'translateY(-50%)' }} />
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="relative flex-1 flex flex-col items-center z-10"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            tabIndex={0}
            aria-label={step.title}
          >
            {/* Vạch kẻ riêng cho step khi hover */}
            <div
              className={`absolute top-1/2 left-0 right-0 h-1 transition-all duration-300 ease-in-out ${hovered === idx ? 'bg-navy-custom' : 'bg-white/40'}`}
              style={{ transform: 'translateY(-50%)' }}
            />
            {/* Icon step: nếu có icon từ API thì render, không thì dùng mặc định */}
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full border-4 border-white bg-white transition-all duration-300 ease-in-out mb-4 shadow-lg ${hovered === idx ? 'bg-navy-custom text-white scale-105' : 'text-navy-custom'}`}
            >
              {step.icon ? (
                <StrapiImage
                  media={step.icon}
                  alt={step.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                DEFAULT_ICONS[idx] || DEFAULT_ICONS[0]
              )}
            </div>
            {/* Số thứ tự */}
            <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-navy-custom text-white font-bold text-lg absolute top-1/2 left-1/2 z-20 shadow transition-all duration-300 ease-in-out`} style={{ transform: 'translate(-50%, -50%)' }}>
              {idx + 1}
            </div>
            {/* Tiêu đề và mô tả */}
            <h3 className="mt-12 text-lg md:text-xl font-bold text-white text-center">{step.title}</h3>
            {step.description && (
              <p className="text-sm text-white/80 text-center mt-2 max-w-xs">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
