export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

// Dynamic Zone block types
export type BlogContentBlock =
  | { __component: 'blog.text-section'; text: string }
  | { __component: 'blog.table-section'; table: string; caption?: string }
  | { __component: 'blog.image-section'; image: StrapiMedia; alternativeText?: string; caption?: string }
  | { __component: 'blog.gallery-section'; images: StrapiMedia[]; caption?: string }
  | { __component: 'blog.video-section'; url: string; caption?: string }
  | { __component: 'blog.quote-section'; quote: string; author: string; position?: string };
// Blog types for Strapi v5 Blog integration
import type { StrapiMedia } from './strapi';

export interface BlogHero {
  __component: 'blog.blog-hero-section'
  id: number;
  title: string;
  excerpt?: string | null;
  link_url?: string | null;
  categories?: BlogCategory[];
  featured_image?: StrapiMedia | null;
}

export interface BlogCategory {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  order?: number | null;
  is_active?: boolean;
  hero_image?: StrapiMedia | null;
  seo?: BlogSEO | null;
  blog_posts?: BlogPostSummary[];
}

export interface BlogAuthor {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPostHero {
  id: number;
  title: string;
  excerpt?: string | null;
  featured_image?: StrapiMedia | null;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  slug: string;
  categorySlug?: string;
  excerpt?: string | null;
  publishedAt: string;
  author?: BlogAuthor | null;
  hero?: BlogPostHero | null;
  tags?: string[];
  category?: BlogCategory | null;
}

export interface BlogLayoutConfig {
  id: number;
  show_latest: boolean;
  latest_limit: number;
  posts_per_category: number;
  show_category_section: boolean;
}

export interface BlogSEO {
  id: number;
  title?: string | null;
  description?: string | null;
  canonical?: string | null;
}

export interface BlogIndexData {
  id: number;
  hero: BlogHero;
  blog_categories: BlogCategory[];
  layout: BlogLayoutConfig;
  seo: BlogSEO;
  tags?: BlogTag[];
}
