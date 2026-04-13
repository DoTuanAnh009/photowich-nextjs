/**
 * Logo Component
 */

import Link from 'next/link';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { LOGO_MEDIA } from '@/lib/constants';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative">
        <StrapiImage 
          media={LOGO_MEDIA} 
          width={44} 
          height={44} 
          className="object-contain"
          priority
        />
      </div>
      <h2 className="text-navy-custom dark:text-white text-xl font-black leading-tight tracking-tight">
        PhotoWitch
      </h2>
    </Link>
  );
}
