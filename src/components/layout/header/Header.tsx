/**
 * Header Component
 * 
 * Main header component that composes all header sub-components.
 * Client Component for mobile menu interactivity.
 */

'use client';

import type { HeaderProps } from '@/types/header';
import { useState } from 'react';
import { CTAButton } from './CTAButton';
import { DesktopNav } from './DesktopNav';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { MobileMenuButton } from './MobileMenuButton';
import { buildNavItems } from './buildNavItems';

export function Header({ services, blogCategories }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = buildNavItems(services, blogCategories);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Logo />
          <DesktopNav navItems={navItems} />
          <div className="flex items-center gap-4">
            <CTAButton />
            <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
