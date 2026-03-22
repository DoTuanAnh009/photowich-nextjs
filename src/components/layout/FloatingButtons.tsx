/**
 * Floating Buttons Component
 * 
 * Fixed position buttons for chat, CTA, and scroll-to-top.
 * Client Component for interactivity.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function ChatButton() {
  return (
    <button
      type="button"
      aria-label="Open chat"
      className="size-14 rounded-full bg-[#00A3FF] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
    >
      <span className="material-symbols-outlined text-3xl!">chat_bubble</span>
    </button>
  );
}

function FreeTrialButton() {
  return (
    <Link
      href="/contact"
      className="h-14 px-6 rounded-full bg-navy-custom text-white flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
    >
      <span className="material-symbols-outlined">ads_click</span>
      <span className="font-black text-sm whitespace-nowrap">START FREE TRIAL</span>
    </Link>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="size-14 rounded-full bg-navy-custom text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
    >
      <span className="material-symbols-outlined">keyboard_arrow_up</span>
    </button>
  );
}

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col items-end gap-3">
      <ChatButton />
      <FreeTrialButton />
      <ScrollToTopButton />
    </div>
  );
}
