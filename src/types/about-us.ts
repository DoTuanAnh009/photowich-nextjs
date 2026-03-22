// Types for About Us API response

export interface AboutUsResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sections: AboutUsSection[];
    seo?: AboutUsSeo;
  };
  meta: unknown;
}

export type AboutUsSection = BlogHeroSection | BlogTextSection;

export interface BlogHeroSection {
  __component: 'blog.blog-hero-section';
  id: number;
  title: string;
  excerpt: string;
  link_url: string | null;
  featured_image?: AboutUsImage;
}

export interface BlogTextSection {
  __component: 'blog.text-section';
  id: number;
  text: string; // markdown
}

export interface AboutUsImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: AboutUsImageFormat;
    small?: AboutUsImageFormat;
    medium?: AboutUsImageFormat;
    large?: AboutUsImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AboutUsImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface AboutUsSeo {
  id: number;
  title: string;
  description: string | null;
  canonical: string | null;
}
