import { BulkOrderResponse } from '@/types/bulk-order';
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchBulkOrder(): Promise<BulkOrderResponse['data']> {
    const url = `${API_URL}/bulk-order?populate[sections][on][blog.blog-hero-section][populate][featured_image]=true&populate[seo]=*&populate[sections][on][home.try-for-free-section][populate]=bullets`;

  const res = await fetch(url,
    { next: { revalidate: 60 },
  cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch bulk order data');
  const json: BulkOrderResponse = await res.json();
  return json.data;
}
