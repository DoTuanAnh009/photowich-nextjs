/**
 * Logo Component
 */

import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="logo-container">
        <div className="logo-backdrop" />
        <div className="logo-house-shape">
          <div className="logo-camera-lens">
            <div className="logo-lens-inner" />
          </div>
        </div>
      </div>
      <h2 className="text-navy-custom dark:text-white text-xl font-black leading-tight tracking-tight">
        PhotoWitch
      </h2>
    </Link>
  );
}
