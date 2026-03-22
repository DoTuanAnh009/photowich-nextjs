/**
 * Strapi API Client
 * 
 * Centralized fetch utility for Strapi API calls.
 * All API requests should go through this module.
 */

import type { ServiceCategory, StrapiMedia, StrapiPagination, StrapiResponse } from '@/types/strapi';

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://nginx"
    : "http://localhost";
interface StrapiRequestOptions {
  endpoint: string;
  query?: Record<string, string>;
  tags?: string[];
  revalidate?: number | false;
}

interface StrapiResponseWithMeta<T> extends StrapiResponse<T> {
  meta?: {
    pagination?: StrapiPagination;
  };
}

/**
 * Build URL with query parameters for Strapi API
 */
function buildUrl(endpoint: string, query?: Record<string, string>): string {
  const url = new URL(`api/${endpoint}`, API_URL);
  
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
}

/**
 * Get request headers for Strapi API
 */
function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (API_URL) {
    headers['Authorization'] = `Bearer ${API_URL}`;
  }

  return headers;
}

/**
 * Fetch data from Strapi API
 * 
 * @example
 * // Fetch homepage data
 * const { data } = await fetchStrapi<Homepage>({
 *   endpoint: '/homepage',
 *   query: { 'populate': 'deep' },
 *   tags: ['homepage'],
 *   revalidate: 60
 * });
 */
export async function fetchStrapi<T>({
  endpoint,
  query,
  tags,
  revalidate = 60,
}: StrapiRequestOptions): Promise<StrapiResponseWithMeta<T>> {
  const url = buildUrl(endpoint, query);

  const response = await fetch(url, {
    headers: getHeaders(),
    next: {
      tags,
      revalidate,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get full URL for Strapi media files
 */
export function getStrapiMediaUrl(media?: { url?: string } | null): string {
  if (!media || !media.url) return "";
  // Nếu url đã có domain thì trả về luôn, nếu không thì nối với baseURL
  if (media.url.startsWith("http")) return media.url;
  
const isServer = typeof window === "undefined";

const API_URL = isServer
  ? "http://localhost:1337"
  : process.env.NEXT_PUBLIC_STRAPI_URL || "/api";
  const baseURL = API_URL;
  return baseURL.replace(/\/$/, "") + media.url;
}


/**
 * Extract media URL from Strapi Media object (Strapi v5 flatten format)
 */
export function getMediaUrl(media: StrapiMedia | null | undefined): string | null {
  if (!media?.url) return null;
  return getStrapiMediaUrl(media);
}

/**
 * Extract alt text from Strapi Media object (Strapi v5 flatten format)
 */
export function getMediaAlt(media: StrapiMedia | null | undefined): string {
  return media?.alternativeText || '';
}

/* ============================================================================
 * Navigation Data Fetchers
 * ========================================================================== */

export interface NavService {
  id: number;
  title: string;
  slug: string;
  category?: ServiceCategory | null;
  description?: string;
  icon?: string;
}

/**
 * Fetch services for navigation menu
 * Groups services by category (dynamic)
 */
export async function getServicesForNav(): Promise<Record<string, NavService[]>> {
  try {
    const { data } = await fetchStrapi<NavService[]>({
      endpoint: '/services',
      query: {
        'fields[0]': 'title',
        'fields[1]': 'slug',
        '[populate]': 'category',
        'sort': 'title:asc',
      },
      tags: ['services', 'navigation'],
      revalidate: 300, // 5 minutes - nav doesn't change often
    });

    // Group by category (dynamic)
    const grouped: Record<string, NavService[]> = {};
    for (const service of data) {
      const cat = service.category?.title || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(service);
    }
    return grouped;
  } catch (error) {
    console.error('Failed to fetch services for nav:', error);
    return {};
  }
}

