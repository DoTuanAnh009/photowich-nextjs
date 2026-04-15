
import type { WhyChooseUsSection as WhyChooseUsSectionType } from "@/types/home";
import React from "react";

// Icon mapping for icon_type (expand as needed)
const ICONS: Record<string, React.ReactNode> = {
  // Twilight Images icons
  twilight: <span className="material-symbols-outlined text-4xl text-primary">nights_stay</span>, // Eye-Catching Twilight Images
  details: <span className="material-symbols-outlined text-4xl text-primary">filter_hdr</span>, // Crystal Clear Details
  color: <span className="material-symbols-outlined text-4xl text-primary">palette</span>, // True-to-Life Colors
  no_glare: <span className="material-symbols-outlined text-4xl text-primary">light_mode</span>, // No Harsh Glare or Shadows
  // Remove Unwanted Items icons
  cleaner: <span className="material-symbols-outlined text-4xl text-primary">cleaning_services</span>, // Cleaner Look
  spacious: <span className="material-symbols-outlined text-4xl text-primary">open_in_full</span>, // Bigger Space Vibes
  highlight: <span className="material-symbols-outlined text-4xl text-primary">flare</span>, // Highlight Key Features
  neutral: <span className="material-symbols-outlined text-4xl text-primary">person_off</span>, // Neutral Appeal
  boost: <span className="material-symbols-outlined text-4xl text-primary">trending_up</span>, // Boosted Listing Appeal
  warm_light: <span className="material-symbols-outlined text-4xl text-primary">wb_incandescent</span>, // Warm and Inviting Lighting
  sunset: <span className="material-symbols-outlined text-4xl text-primary">wb_twilight</span>, // Beautiful Sunset Effects
  depth: <span className="material-symbols-outlined text-4xl text-primary">blur_on</span>, // Dramatic Visual Depth
  timeless: <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>, // Timeless Appeal
  fast: <span className="material-symbols-outlined text-4xl text-primary">bolt</span>,
  quality: <span className="material-symbols-outlined text-4xl text-primary">star_rate</span>,
  support: <span className="material-symbols-outlined text-4xl text-primary">support_agent</span>,
  time: <span className="material-symbols-outlined text-4xl text-primary">schedule</span>,
  // Custom keys for WhyChooseUsSection
  engagement: <span className="material-symbols-outlined text-4xl text-primary">visibility</span>, // Boost Viewer Engagement
  features: <span className="material-symbols-outlined text-4xl text-primary">highlight</span>, // Highlight Key Features
  emotion: <span className="material-symbols-outlined text-4xl text-primary">favorite</span>, // Create Emotional Connections
  visual: <span className="material-symbols-outlined text-4xl text-primary">palette</span>, // Professional Visual Appeal
  social: <span className="material-symbols-outlined text-4xl text-primary">share</span>, // Elevate Social Media Performance
};

export function WhyChooseUsSection({ heading, items }: WhyChooseUsSectionType) {
  if (!items || items.length === 0) return null;

  const gridCols = items.length === 5
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-5'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';

  return (
    <section className="max-w-6xl w-full mx-auto py-6 px-2 md:px-4">
      <div className="flex flex-col md:flex-col md:items-center md:gap-4">
        {heading && (
          <h2 className="text-2xl flex items-center justify-center md:text-3xl font-black mb-4 md:mb-0 md:mr-6 animate-slide-up animation-delay-100 text-center w-full break-words">
            {heading}
          </h2>
        )}
        <div className={`flex-1 grid ${gridCols} gap-4`}>
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-4 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 animate-fade-in animation-delay-${(idx + 1) * 100}`}
              style={{ animationDelay: `${150 + idx * 100}ms` }}
            >
              {/* Icon on top */}
              <span
                className="why-choose-icon material-symbols-outlined text-5xl text-primary cursor-pointer mb-4"
                tabIndex={0}
                aria-label={item.icon_type || 'icon'}
              >
                {item.icon_type && ICONS[item.icon_type] ? (
                  // @ts-ignore
                  ICONS[item.icon_type].props.children
                ) : (
                  'star'
                )}
              </span>
              <h3 className="text-xl font-bold mb-2 text-navy-custom dark:text-white">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Bell swing animation style */}
      <style>{`
        .why-choose-icon {
          transition: transform 0.3s cubic-bezier(.36,1.56,.64,1);
          display: inline-block;
        }
        .why-choose-icon:hover, .why-choose-icon:focus {
          animation: bell-swing 0.7s cubic-bezier(.36,1.56,.64,1);
        }
        @keyframes bell-swing {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(-18deg); }
          20% { transform: rotate(16deg); }
          30% { transform: rotate(-12deg); }
          40% { transform: rotate(9deg); }
          50% { transform: rotate(-6deg); }
          60% { transform: rotate(4deg); }
          70% { transform: rotate(-2deg); }
          80% { transform: rotate(1deg); }
          90% { transform: rotate(-0.5deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
