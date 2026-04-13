export interface ServiceCategory {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  description: string | null;
}
/**
 * STRAPI DATA CONTRACT — HOMEPAGE TYPES (Strapi v5)
 *
 * Types dành riêng cho Homepage Single Type và các Dynamic Zone components.
 * Phản ánh đúng schema từ Strapi CMS v5 (flatten response).
 */

import type {
  BaseComponent,
  SEO,
  StrapiBaseEntity,
  StrapiMedia,
  StrapiResponse,
} from './strapi';

/* ============================================================================
 * Homepage — Hero Slider Section
 * ========================================================================== */

export interface HeroSlide {
  id: number;
  heading: string;
  subheading?: string | null;
  primary_cta_text?: string | null;
  primary_cta_link?: string | null;
  background_image?: StrapiMedia | null;
}

export interface HeroSliderSection extends BaseComponent {
  __component: 'home.hero-slider-section';
  slides: HeroSlide[];
}

/* ============================================================================
 * Homepage — Why Choose Us Section
 * ========================================================================== */

export interface WhyChooseUsItem {
  id: number;
  title: string;
  description?: string | null;
  icon_type?: string | null;
}

export interface WhyChooseUsSection extends BaseComponent {
  __component: 'home.why-choose-us-section';
  heading?: string | null;
  items: WhyChooseUsItem[];
}

/* ============================================================================
 * Homepage — Service List Section
 * ========================================================================== */

export interface ServiceReference extends StrapiBaseEntity {
  title: string;
  slug: string;
  description: string;
  service_type?: 'pillar' | 'cluster' | null;
  category?: ServiceCategory | null;
  background_image?: StrapiMedia | null;
  /** Ảnh trước khi dùng dịch vụ (so sánh before/after) */
  background_image_before?: StrapiMedia | null;
  /** Ảnh sau khi dùng dịch vụ (so sánh before/after) */
  background_image_after?: StrapiMedia | null;
  // Add SEO field for service reference (populated in Strapi query)
  seo?: SEO | null;
}

export interface ServiceListSection extends BaseComponent {
  __component: 'home.service-list-section';
  heading?: string | null;
  seo: SEO | null;
  services: ServiceReference[];
}

/* ============================================================================
 * Homepage — Process Steps Section
 * ========================================================================== */

export interface ProcessStep {
  id: number;
  title: string;
  description?: string | null;
  icon?: StrapiMedia | null;
}

export interface ProcessStepsSection extends BaseComponent {
  __component: 'home.process-steps-section';
  heading?: string | null;
  steps: ProcessStep[];
}

/* ============================================================================
 * Homepage — How To Work Section
 * ========================================================================== */

export interface HowToWorkSection extends BaseComponent {
  __component: 'home.how-to-work-section';
  title?: string | null;
  description?: string | null;
  items: ProcessStep[];
  background_image?: StrapiMedia | null;
}

/* ============================================================================
 * Homepage — Testimonial Section
 * ========================================================================== */

export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  role?: string | null;
  avatar?: StrapiMedia | null;
}

export interface TestimonialSection extends BaseComponent {
  __component: 'home.testimonial-section';
  heading?: string | null;
  headingDescription?: string | null;
  testimonials: Testimonial[];
}

/* ============================================================================
 * Homepage — Partners Section
 * ========================================================================== */

export interface Partner {
  id: number;
  name?: string | null;
  logo?: StrapiMedia | null;
}

export interface PartnersSection extends BaseComponent {
  __component: 'home.partners-section';
  heading?: string | null;
  partners: Partner[];
}

/* ============================================================================
 * Homepage — Blog Highlight Section
 * ========================================================================== */

export interface BlogAuthor {
  id: number;
  documentId: string;
  name: string;
  avatar?: StrapiMedia | null;
  slug?: string;
}

export interface BlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug?: string;
}

export interface BlogReference extends StrapiBaseEntity {
  title: string;
  excerpt?: string;
  author?: BlogAuthor | null;
  category?: BlogCategory | null;
  publishedAt?: string;
  createdAt?: string;
  slug: string;
  hero?: {
    id: number;
    title?: string;
    featured_image?: StrapiMedia | null;
  } | null;
}

export interface BlogHighlightSection extends BaseComponent {
  __component: 'home.blog-highlight-section';
  heading?: string | null;
  description?: string | null;
  blog_posts: BlogReference[];
}

/* ============================================================================
 * Homepage — Try For Free Section
 * ========================================================================== */

export interface TryForFreeSection extends BaseComponent {
  __component: 'home.try-for-free-section';
  heading: string;
  description: string;
  bullets: Array<{
    id: number;
    heading: string;
    description: string;
  }>;
  services?: { title: string; slug: string, documentId: string }[];
}

/* ============================================================================
 * Homepage — Dynamic Zone Union Type
 * ========================================================================== */

export type HomepageSection =
  | HeroSliderSection
  | WhyChooseUsSection
  | ServiceListSection
  | ProcessStepsSection
  | HowToWorkSection
  | TestimonialSection
  | PartnersSection
  | BlogHighlightSection
  | TryForFreeSection;

/* ============================================================================
 * Homepage — Entity & API Response (Strapi v5 Flatten)
 * ========================================================================== */

export interface Homepage extends StrapiBaseEntity {
  seo?: SEO | null;
  sections: HomepageSection[];
}

export type HomepageResponse = StrapiResponse<Homepage>;
