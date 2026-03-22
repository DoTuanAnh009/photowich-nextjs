import { AboutUsResponse } from '@/types/about-us';

const baseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;

export async function fetchAboutUs(): Promise<AboutUsResponse['data']> {
  const res = await fetch(
    `${baseUrl}/api/about-us?populate[sections][on][blog.blog-hero-section][populate][featured_image]=true&populate[seo]=*&populate[sections][on][blog.text-section]=*`,
    { next: { revalidate: 60 }, cache: 'no-store' },
    
  );
  if (!res.ok) throw new Error('Failed to fetch about us data');
  const json: AboutUsResponse = await res.json();
  return json.data;
}
