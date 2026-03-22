/**
 * Mobile Menu Component
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NavItem } from '@/types/header';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <span className="font-bold text-navy-custom dark:text-white">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-navy-custom dark:text-white"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="p-4">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-slate-100 dark:border-slate-800">
              {item.dropdown ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full py-3 text-sm font-bold uppercase tracking-wider text-navy-custom dark:text-white"
                  >
                    {item.label}
                    <span
                      className={`material-symbols-outlined transition-transform ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {openDropdown === item.label && (
                    <div className="pb-3">
                      {item.dropdown.map((category) => (
                        <div key={category.title} className="mb-2">
                          {item.dropdown!.length > 1 && (
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 px-2">
                              {category.title}
                            </h4>
                          )}
                          {category.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={onClose}
                              className="block py-2 px-2 text-sm text-slate-600 dark:text-slate-300 hover:text-primary"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-sm font-bold uppercase tracking-wider text-navy-custom dark:text-white"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="p-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full bg-primary text-white px-4 py-3 rounded-lg text-sm font-bold text-center hover:bg-primary/90 transition-colors uppercase tracking-wider"
          >
            START FREE TRIAL
          </Link>
        </div>
      </div>
    </div>
  );
}
