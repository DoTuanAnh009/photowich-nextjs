/**
 * Footer Types
 * 
 * Type definitions for footer components.
 */

import type { NavService } from '@/lib/strapi';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  services?: Record<string, NavService[]>
}
