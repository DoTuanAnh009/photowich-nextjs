/**
 * STRAPI DATA CONTRACT — SERVICE TYPES (Strapi v5)
 *
 * Types dành riêng cho Service Collection Type và các Dynamic Zone components.
 * Phản ánh đúng schema từ Strapi CMS v5 (flatten response).
 */

import type {
  BaseComponent,
  StrapiMedia,
  StrapiBaseEntity,
  StrapiResponse,
  SEO,
} from './strapi';
import type {
  WhyChooseUsSection,
  TestimonialSection,
  ServiceCategory,
} from './home';
import { BlogHero } from './blog';

/* ============================================================================
 * Service — Base Types
 * ========================================================================== */

export type ServiceType = 'pillar' | 'cluster';

/* ============================================================================
 * Service — Hero Section
 * ========================================================================== */

export interface ServiceHeroSection extends BaseComponent {
  __component: 'service.hero-section';
  heading: string;
  subheading?: string | null;
  background_image?: StrapiMedia | null;
}

/* ============================================================================
 * Service — Before / After Section
 * ========================================================================== */

export interface BeforeAfterItem {
  id: number;
  before_image: StrapiMedia;
  after_image: StrapiMedia;
  description?: string | null;
}

export interface BeforeAfterSection extends BaseComponent {
  __component: 'service.before-after-section';
  heading?: string | null;
  items: BeforeAfterItem[];
}

/* ============================================================================
 * Service — Process Steps Section
 * ========================================================================== */

export interface ServiceProcessStep {
  id: number;
  title: string;
  description?: string | null;
  icon?: StrapiMedia | null;
}

export interface ServiceProcessStepsSection extends BaseComponent {
  __component: 'service.process-steps-section';
  heading?: string | null;
  steps: ServiceProcessStep[];
}

/* ============================================================================
 * Service — Audience Section
 * ========================================================================== */

export interface AudienceItem {
  id: number;
  title: string;
  description?: string | null;
}

export interface AudienceSection extends BaseComponent {
  __component: 'service.audience-section';
  heading?: string | null;
  items: AudienceItem[];
}

/* ============================================================================
 * Service — FAQ Section
 * ========================================================================== */

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQSection extends BaseComponent {
  __component: 'sections.faq-section';
  heading?: string | null;
  faqs: FAQItem[];
}
export interface RichTextSection extends BaseComponent {
  __component: 'sections.rich-text-section';
  heading?: string | null;
  content?: any;
}

/* ============================================================================
 * Service — CTA Section
 * ========================================================================== */

export interface ServiceCTASection extends BaseComponent {
  __component: 'service.cta-section';
  heading: string;
  description?: string | null;
  button_text: string;
  button_link: string;
}

/* ============================================================================
 * Service — Dynamic Zone Union
 * ========================================================================== */

// --- Showcase Section & BeforeAfter ---
export interface BeforeAfterItem {
  id: number;
  caption?: string;
  description?: string | null; 
  before_alt?: string;
  affter_alt?: string;
  link_url?: string | null;
  before_image: StrapiMedia;
  after_image: StrapiMedia;
}

export interface ShowcaseSection {
  __component: 'sections.showcase-section';
  id: number;
  heading?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  description?: string | null;
  is_slide: boolean;
  before_after: BeforeAfterItem[];
}

// --- Service Detail Section Union ---
export type ServiceDetailSection =
  | BlogHero
  | WhyChooseUsSection
  | ShowcaseSection
  | TestimonialSection
  | FAQSection
  | RichTextSection
  ;

// --- Service Detail Entity ---
export interface ServiceDetail extends StrapiBaseEntity {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnail?: StrapiMedia;
  category?: ServiceCategory | null;
  seo?: SEO | null;
  sections: ServiceDetailSection[];
}

// --- Service Detail Entity ---
export interface Services extends StrapiBaseEntity {
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  background_image_before?: StrapiMedia;
  background_image?: StrapiMedia;
  category?: ServiceCategory | null;
  background_image_after?: StrapiMedia;
  seo?: SEO | null;
  sections: ServiceDetailSection[];
}

