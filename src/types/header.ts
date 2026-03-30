/**
 * Header Types
 * 
 * Type definitions for header components.
 */

import type { NavService } from '@/lib/strapi';
import { BlogCategory } from './blog';

export interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface MenuCategory {
  title: string;
  items?: SubMenuItem[];
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: MenuCategory[];
}

export interface HeaderProps {
  services?: Record<string, NavService[]>;
  blogCategories?: BlogCategory[];
}
