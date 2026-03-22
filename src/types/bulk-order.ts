// Types for Bulk Order API response

export interface BulkOrderResponse {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sections: BulkOrderSection[];
    seo?: BulkOrderSeo;
  };
  meta: unknown;
}

export type BulkOrderSection =
  | BlogHeroSection
  | TryForFreeSection;

export interface BlogHeroSection {
  __component: 'blog.blog-hero-section';
  id: number;
  title: string;
  excerpt: string;
  link_url: string | null;
  featured_image?: BulkOrderImage;
}

export interface TryForFreeSection {
  __component: 'home.try-for-free-section';
  id: number;
  heading: string;
  description?: string;
  bullets: TryForFreeBullet[];
}

export interface TryForFreeBullet {
  id: number;
  heading: string;
  description?: string;
}

export interface BulkOrderImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: BulkOrderImageFormat;
    small?: BulkOrderImageFormat;
    medium?: BulkOrderImageFormat;
    large?: BulkOrderImageFormat;
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

export interface BulkOrderImageFormat {
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

export interface BulkOrderSeo {
  id: number;
  title: string;
  description: string | null;
  canonical: string | null;
}
