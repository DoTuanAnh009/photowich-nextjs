import { AboutUsResponse } from '@/types/about-us';

const isServer = typeof window === "undefined";

const API_URL = isServer
  ? "http://strapi:1337"
  : process.env.NEXT_PUBLIC_STRAPI_URL || "/api";

export async function fetchAboutUs(): Promise<AboutUsResponse['data']> {
  const res = await fetch(
    `${API_URL}/about-us?populate[sections][on][blog.blog-hero-section][populate][featured_image]=true&populate[seo]=*&populate[sections][on][blog.text-section]=*`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch about us data');
  const json: AboutUsResponse = await res.json();
  return json.data;
}
