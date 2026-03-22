import { BulkOrderResponse } from '@/types/bulk-order';

export const dynamic = "force-dynamic";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://nginx"
    : "http://localhost";
export async function fetchBulkOrder(): Promise<BulkOrderResponse['data']> {
    const url = `${API_URL}/api/bulk-order?populate[sections][on][blog.blog-hero-section][populate][featured_image]=true&populate[seo]=*&populate[sections][on][home.try-for-free-section][populate]=bullets`;

  const res = await fetch(url,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch bulk order data');
  const json: BulkOrderResponse = await res.json();
  return json.data;
}
