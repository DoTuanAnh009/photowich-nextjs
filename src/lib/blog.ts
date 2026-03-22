import type { BlogCategory, BlogIndexData, BlogPostSummary } from '@/types/blog';
import type { StrapiResponse } from '@/types/strapi';
import qs from 'qs';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

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
  const res = await fetch(`${API_URL}/blog?${query}`);
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
  const res = await fetch(`${API_URL}/api/blog-posts?${query}`);
  if (!res.ok) return [];
  const json = await res.json();
  // Map categorySlug cho BlogPostSummary
  return (json.data || []).map((post: any) => ({
    ...post,
    categorySlug: post.category?.slug || '',
  }));
}

// Fetch posts by category slug
export async function fetchPostsByCategory(slug: string, limit = 6): Promise<BlogPostSummary[]> {
  const query = buildQuery({
    filters: { category: { slug: { $eq: slug } } },
    sort: 'publishedAt:desc',
    pagination: { limit },
    fields: ['title', 'slug', 'excerpt', 'publishedAt'],
    populate: {
      author: { fields: ['name', 'slug'] },
      hero: { populate: ['featured_image'] },
    },
  });
  const res = await fetch(`${API_URL}/api/blog-posts?${query}`);
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
  const res = await fetch(`${API_URL}/api/blog-categories?${query}`);
  if (!res.ok) return [];
  const json: StrapiResponse<BlogCategory[]> = await res.json();
  return json.data || [];
}
