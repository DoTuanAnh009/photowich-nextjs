/**
 * CTA Button Component
 */

import Link from 'next/link';

export function CTAButton() {
  return (
    <Link
      href="/bulk-order"
      className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors uppercase tracking-wider"
    >
      START FREE TRIAL
    </Link>
  );
}
