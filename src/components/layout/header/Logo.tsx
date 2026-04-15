/**
 * Logo Component
 */

import { SiteLogoHeader } from '@/components/ui/SiteLogo_header';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <SiteLogoHeader size={80} className="drop-shadow-sm text-navy-custom" />
    </Link>
  );
}
