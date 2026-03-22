/**
 * Desktop Navigation Component
 */

import Link from 'next/link';
import { DropdownMenu } from './DropdownMenu';
import type { NavItem } from '@/types/header';

interface DesktopNavProps {
  navItems: NavItem[];
}

export function DesktopNav({ navItems }: DesktopNavProps) {
  console.log('DesktopNav rendered with navItems:', navItems);
  return (
    <nav className="hidden md:flex items-center gap-8">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-custom dark:text-white hover:text-primary transition-colors py-2"
          >
            {/* Icon cho About Us và Contact Us */}
            {item.label === 'About Us' && (
              <span className="material-symbols-outlined text-2xl text-primary">workspace_premium</span>
            )}
            {item.label === 'Contact Us' && (
              <span className="material-symbols-outlined text-2xl text-primary">support_agent</span>
            )}
            {item.label}
            {item.dropdown && (
              <span className="material-symbols-outlined text-lg!">
                expand_more
              </span>
            )}
          </Link>
          {item.dropdown && <DropdownMenu categories={item.dropdown} />}
        </div>
      ))}
    </nav>
  );
}
