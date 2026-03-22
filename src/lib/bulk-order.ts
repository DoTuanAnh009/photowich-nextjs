import { BulkOrderResponse } from '@/types/bulk-order';

const baseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;
export async function fetchBulkOrder(): Promise<BulkOrderResponse['data']> {
    const url = `${baseUrl}/api/bulk-order?populate[sections][on][blog.blog-hero-section][populate][featured_image]=true&populate[seo]=*&populate[sections][on][home.try-for-free-section][populate]=bullets`;

  const res = await fetch(url,
    { next: { revalidate: 60 },
  cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch bulk order data');
  const json: BulkOrderResponse = await res.json();
  return json.data;
}
