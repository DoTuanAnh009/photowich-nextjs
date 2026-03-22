/**
 * Footer Component
 * 
 * Main footer component that composes all footer sub-components.
 * Server Component.
 */

import { FooterLogo } from './FooterLogo';
import { FooterLinks } from './FooterLinks';
import { Copyright } from './Copyright';
import { buildFooterSections } from './footerData';
import type { FooterProps } from '@/types/footer';

export function Footer({ services }: FooterProps) {
  const footerSections = buildFooterSections(services);

  return (
    <footer className="bg-navy-custom text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <FooterLogo />
          <FooterLinks sections={footerSections} />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}
