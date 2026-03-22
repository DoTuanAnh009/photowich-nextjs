/**
 * STRAPI DATA CONTRACT — BASE TYPES (Strapi v5)
 *
 * Đây là hợp đồng dữ liệu giữa Strapi CMS và Next.js frontend.
 * - KHÔNG bịa field
 * - KHÔNG logic
 * - KHÔNG hardcode
 * - Phản ánh đúng shape API Strapi v5 (flatten response)
 *
 * Nếu CMS thay đổi → TypeScript phải báo lỗi.
 */

/* ============================================================================
 * Base Response Wrappers (Strapi v5)
 * ========================================================================== */

/**
 * Wrapper chuẩn của Strapi API
 */
export interface StrapiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

/**
 * Pagination metadata từ Strapi
 */
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Base fields cho mọi entity trong Strapi v5
 */
export interface StrapiBaseEntity {
  id: number;
  documentId: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/* ============================================================================
 * Media (Upload Plugin) - Strapi v5 Flatten Format
 * ========================================================================== */

export interface StrapiMediaFormat {
  name: string;
  url: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  size: number;
  sizeInBytes: number;
}

export interface StrapiMedia {
  id: number;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  url: string;
  formats?: Record<string, StrapiMediaFormat>;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
}

/* ============================================================================
 * SEO Component (Shared)
 * ========================================================================== */

export interface SEO {
  id: number;
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
}

/* ============================================================================
 * Dynamic Zone — Base Component
 * ========================================================================== */

/**
 * Base interface cho mọi component trong Dynamic Zone
 * __component PHẢI khớp 100% với Strapi
 */
export interface BaseComponent {
  id: number;
  __component: string;
}

/* ============================================================================
 * Re-export Page-specific Types
 * ========================================================================== */

export * from './home';
export * from './service';

// Import for use in this file
import type { HomepageSection } from './home';
import { ServiceDetailSection } from './service';

/* ============================================================================
 * Dynamic Zone — Global Union Type
 * 
 * Union của tất cả Dynamic Zone components từ mọi content types.
 * Thêm các page-specific sections khi có thêm pages.
 * ========================================================================== */

export type DynamicZoneComponent = 
  | HomepageSection
  | ServiceDetailSection
  | BaseComponent; // Fallback cho unknown components

/* ============================================================================
 * Navigation & Global Settings
 * ========================================================================== */

export interface NavigationLink {
  id: number;
  label: string;
  url: string;
  isExternal?: boolean;
  children?: NavigationLink[] | null;
}

export interface GlobalSettingsAttributes {
  siteName: string;
  siteDescription?: string | null;
  logo?: StrapiMedia;
  favicon?: StrapiMedia;
  navigation?: NavigationLink[];
  footerNavigation?: NavigationLink[];
}

export interface GlobalSettings {
  id: number;
  attributes: GlobalSettingsAttributes;
}
