/**
 * SEO Utilities
 * 
 * Centralized SEO metadata generation for Next.js pages.
 * All pages should use these utilities for consistent SEO.
 */

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const DEFAULT_TITLE = 'Your Site Name';
const DEFAULT_DESCRIPTION = 'Your site description for SEO';

interface SEOData {
  title?: string | null;
  description?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  noIndex?: boolean;
}

interface GenerateMetadataOptions extends SEOData {
  pathname?: string;
}

/**
 * Generate Next.js Metadata object from CMS SEO data
 * 
 * @example
 * export async function generateMetadata(): Promise<Metadata> {
 *   const page = await getPageData();
 *   return generatePageMetadata({
 *     title: page.seo?.title,
 *     description: page.seo?.description,
 *     pathname: '/services',
 *   });
 * }
 */
export function generatePageMetadata({
  title,
  description,
  canonicalUrl,
  ogImage,
  noIndex = false,
  pathname = '',
}: GenerateMetadataOptions): Metadata {
  const finalTitle = title || DEFAULT_TITLE;
  const finalDescription = description || DEFAULT_DESCRIPTION;
  const finalCanonical = canonicalUrl || `${SITE_URL}${pathname}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: finalCanonical,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: finalCanonical,
      siteName: DEFAULT_TITLE,
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: finalTitle,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      ...(ogImage && { images: [ogImage] }),
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema(data: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
  };
}

/**
 * Generate JSON-LD structured data for service
 */
export function generateServiceSchema(data: {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: data.provider,
    },
    url: data.url,
    ...(data.image && { image: data.image }),
  };
}
