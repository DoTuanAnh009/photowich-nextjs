// Contact API response types

import { StrapiMedia } from "./strapi";

export interface ContactHeroSection {
  __component: 'blog.blog-hero-section';
  id: number;
  title: string;
  excerpt: string;
  link_url?: string | null;
  featured_image?: StrapiMedia | null;
}

export interface ContactSeo {
  id: number;
  title: string;
  description: string;
  canonical?: string;
}

export interface ContactApiResponse {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sections: ContactHeroSection[];
  seo: ContactSeo;
}

export interface ContactData {
  hero?: {
    title: string;
    subtitle: string;
    image?: StrapiMedia;
  };
  seo?: ContactSeo;
}
