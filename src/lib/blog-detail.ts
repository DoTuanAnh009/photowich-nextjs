import qs from 'qs';
import type { StrapiResponse } from '@/types/strapi';
import { BlogPostDetail } from '@/types/blog-detail';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

function buildQuery(params: Record<string, any>): string {
  return qs.stringify(params, { encodeValuesOnly: true });
}

// Fetch blog detail by slug
export async function fetchBlogDetailBySlug(slug: string): Promise<BlogPostDetail | null> {
  const query = buildQuery({
    filters: { slug: { $eq: slug } },
    populate: {
      author: { fields: ['name', 'slug'] },
      hero: { populate: ['featured_image'] },
      category: { fields: ['title', 'slug'] },
      seo: '*',
      content: { populate: '*' }, // Dynamic Zone
      tags: { fields: ['id', 'name', 'slug'] },
    },
    fields: ['title', 'slug', 'excerpt', 'publishedAt'],
  });
  const res = await fetch(`${API_URL}/api/blog-posts?${query}`);
  if (!res.ok) return null;
  const json: StrapiResponse<BlogPostDetail[]> = await res.json();
  return json.data && json.data.length > 0 ? json.data[0] : null;
}
