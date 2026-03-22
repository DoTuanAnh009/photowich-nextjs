import type { BlogPostSummary, BlogTag } from '@/types/blog';
import type { StrapiResponse } from '@/types/strapi';
import qs from 'qs';

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://nginx"
    : "http://localhost";
function buildQuery(params: Record<string, any>): string {
  return qs.stringify(params, { encodeValuesOnly: true });
}

// Fetch related posts by tags (exclude current post by slug)
export async function fetchRelatedPostsByTags(tags: BlogTag[], excludeSlug: string, limit = 4): Promise<BlogPostSummary[]> {
  if (!tags || tags.length === 0) return [];
  // Lấy mảng slug của tag để query
  const tagSlugs = tags.map(tag => tag.slug);
  const query = buildQuery({
    filters: {
      tags: { slug: { $in: tagSlugs } },
      slug: { $ne: excludeSlug },
    },
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
  const json: StrapiResponse<BlogPostSummary[]> = await res.json();
  return json.data || [];
}
