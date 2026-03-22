/**
 * Footer Logo Component
 */

import Link from 'next/link';

export function FooterLogo() {
  return (
    <div className="flex flex-col gap-6 max-w-xs">
      <Link href="/" className="flex items-center gap-3">
        <div className="logo-container scale-75 origin-left">
          <div className="logo-backdrop" />
          <div className="logo-house-shape">
            <div className="logo-camera-lens">
              <div className="logo-lens-inner" />
            </div>
          </div>
        </div>
        <span className="text-white text-2xl font-bold">PhotoWitch</span>
      </Link>
      <p className="text-sm leading-relaxed text-slate-300">
        Leading specialist in Real Estate and eCommerce post-production with
        professional workflow and record delivery speeds.
      </p>
    </div>
  );
}
