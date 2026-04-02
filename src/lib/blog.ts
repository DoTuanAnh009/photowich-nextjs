import type { BlogCategory, BlogIndexData, BlogPostSummary } from '@/types/blog';
import type { StrapiResponse } from '@/types/strapi';
import qs from 'qs';

const baseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;
function buildQuery(params: Record<string, any>): string {
  return qs.stringify(params, { encodeValuesOnly: true });
}

// Fetch Blog Index (hero, categories, layout, seo)
export async function fetchBlogIndex(): Promise<BlogIndexData | null> {
  const query = buildQuery({
    populate: {
      hero: { populate: ['featured_image'] },
      blog_categories: { populate: '*' },
      layout: { populate: '*' },
      seo: { populate: '*' },
    },
  });
  const res = await fetch(`${baseUrl}/api/blog?${query}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json: StrapiResponse<BlogIndexData> = await res.json();
  return json.data ?? null;
}

// Fetch latest posts
export async function fetchLatestPosts(limit = 4): Promise<BlogPostSummary[]> {
  const query = buildQuery({
    sort: 'publishedAt:desc',
    pagination: { limit },
    fields: ['title', 'slug', 'excerpt', 'publishedAt'],
    populate: {
      author: { fields: ['name', 'slug'] },
      hero: { populate: ['featured_image'] },
      category: { fields: ['title', 'slug'] },
    },
  });
  const res = await fetch(`${baseUrl}/api/blog-posts?${query}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json = await res.json();
  // Map categorySlug cho BlogPostSummary
  return (json.data || []).map((post: any) => ({
    ...post,
    categorySlug: post.category?.slug || '',
  }));
}

// Fetch posts by category slug
export async function fetchPostsByCategory(slug: string, limit = 12): Promise<BlogPostSummary[]> {
  const query = buildQuery({
    filters: { category: { slug: { $eq: slug } } },
    sort: 'publishedAt:desc',
    pagination: { limit },
    fields: ['title', 'slug', 'excerpt', 'publishedAt'],
    populate: {
      author: { fields: ['name', 'slug'] },
      hero: { populate: ['featured_image'] },
      category: { fields: ['title', 'slug'] },
    },
  });
  const res = await fetch(`${baseUrl}/api/blog-posts?${query}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json: StrapiResponse<BlogPostSummary[]> = await res.json();
  return json.data || [];
}
/**
 * Fetch blog categories for navigation menu
 * Only active categories, sorted by order
 */
export async function getBlogCategoriesForNav(): Promise<BlogCategory[]> {
  const query = qs.stringify({
    sort: ['order:asc'],
    fields: ['id', 'title', 'slug', 'description', 'order'],
    filters: { is_active: { $eq: true } },
  }, { encodeValuesOnly: true });
  const res = await fetch(`${baseUrl}/api/blog-categories?${query}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json: StrapiResponse<BlogCategory[]> = await res.json();
  return json.data || [];
}

/**
 * Fetch a specific category by slug for the category detail page
 */
export async function fetchCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const query = qs.stringify({
    filters: { slug: { $eq: slug }, is_active: { $eq: true } },
    fields: ['title', 'slug', 'description'],
  }, { encodeValuesOnly: true });
  const res = await fetch(`${baseUrl}/api/blog-categories?${query}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json: StrapiResponse<BlogCategory[]> = await res.json();
  return (json.data && json.data.length > 0) ? json.data[0] : null;
}
