/**
 * Dropdown Menu Component
 */

import Link from 'next/link';
import type { MenuCategory } from '@/types/header';
import PhotographyIcon from '@/components/icons/PhotographyIcon';
import VideographyIcon from '@/components/icons/VideographyIcon';
import SofaIcon from '@/components/icons/SofaIcon';
import LaptopIcon from '@/components/icons/LaptopIcon';
import MarketingIcon from '@/components/icons/MarketingIcon';
import MagicWandIcon from '@/components/icons/MagicWandIcon';
import EraserIcon from '@/components/icons/EraserIcon';
import Image360Icon from '@/components/icons/Image360Icon';
import SunIcon from '@/components/icons/SunIcon';

const iconMap: Record<string, React.ReactNode> = {
    about: <span className="material-symbols-outlined mr-3">workspace_premium</span>,
    'about us': <span className="material-symbols-outlined mr-3">workspace_premium</span>,
    contact: <span className="material-symbols-outlined mr-3">support_agent</span>,
    'contact us': <span className="material-symbols-outlined mr-3">support_agent</span>,
  // Blog categories
  photography: <PhotographyIcon className="w-7 h-7 mr-3 shrink-0" />,
  videography: <VideographyIcon className="w-7 h-7 mr-3 shrink-0" />,
  'architecture-and-interior': <SofaIcon className="w-7 h-7 mr-3 shrink-0" />,
  'technology-and-tool': <LaptopIcon className="w-7 h-7 mr-3 shrink-0" />,
  marketing: <MarketingIcon className="w-7 h-7 mr-3 shrink-0" />,
  // Service slugs
  'real-estate-photo-editing': <MagicWandIcon className="w-7 h-7 mr-3 shrink-0" />,
  'real-estate-video-editing': (
    <svg className="w-7 h-7 mr-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="5" width="15" height="14" rx="2" stroke="currentColor" fill="none" />
      <polygon points="16,7 22,12 16,17" fill="currentColor" />
    </svg>
  ),
  'day-to-dusk': <SunIcon className="w-7 h-7 mr-3 shrink-0" />,
  'item-removal': <EraserIcon className="w-7 h-7 mr-3 shrink-0" />,
  '360-image-enhancement': <Image360Icon className="w-7 h-7 mr-3 shrink-0" />,
  'twilight-photo-editing-for-real-estate-listings': <SunIcon className="w-7 h-7 mr-3 shrink-0" />,
};

// Fallback SVG icon (star)
const defaultServiceIcon = (
  <svg className="w-7 h-7 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);

interface DropdownMenuProps {
  categories: MenuCategory[];
}

export function DropdownMenu({ categories }: DropdownMenuProps) {
  const isWideDropdown = categories.length > 1;

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
        isWideDropdown ? 'w-150' : 'w-60'
      }`}
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className={`grid ${isWideDropdown ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {categories.map((category) => (
            <div key={category.title} className="p-4">
              {isWideDropdown && (
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 px-3">
                  {category.title}
                </h4>
              )}
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {/* Icon mapping by slug (label lowercased, slug, or custom field) */}
                      {iconMap[item.href.split('/').pop()?.toLowerCase() || ''] || defaultServiceIcon}
                      <span className="block text-sm font-bold text-navy-custom dark:text-white">
                        {item.label}
                      </span>
                      {/* {item.description && (
                        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.description}
                        </span>
                      )} */}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
