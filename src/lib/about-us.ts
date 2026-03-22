import { AboutUsResponse } from '@/types/about-us';
export const dynamic = "force-dynamic";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://nginx"
    : "http://localhost";
export async function fetchAboutUs(): Promise<AboutUsResponse['data']> {
  const res = await fetch(
    `${API_URL}/api/about-us?populate[sections][on][blog.blog-hero-section][populate][featured_image]=true&populate[seo]=*&populate[sections][on][blog.text-section]=*`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch about us data');
  const json: AboutUsResponse = await res.json();
  return json.data;
}
