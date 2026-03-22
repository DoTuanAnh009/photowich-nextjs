import type { BlogPostSummary, BlogTag } from '@/types/blog';
import type { StrapiResponse } from '@/types/strapi';
import qs from 'qs';
const baseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;
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
  const res = await fetch(`${baseUrl}/api/blog-posts?${query}`, { cache: 'no-store' });
  if (!res.ok) return [];
  const json: StrapiResponse<BlogPostSummary[]> = await res.json();
  return json.data || [];
}
