/**
 * Footer Links Component
 */

import type { FooterSection } from '@/types/footer';
import Link from 'next/link';

interface FooterLinksProps {
  sections: FooterSection[];
}

export function FooterLinks({ sections }: FooterLinksProps) {
  return (
    <div className="grid grid-cols-2 gap-16">
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-4">
          <h4 className="text-white font-black text-sm uppercase tracking-widest">
            {section.title}
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
