import type { ServiceDetail } from '@/types/service';
import { StrapiResponse } from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

// Fetch chi tiết dịch vụ theo slug
export async function fetchDetailService(slug: string): Promise<ServiceDetail | null> {
  const url = `${STRAPI_URL}/api/services?filters[slug][$eq]=${slug}` +
    '&populate[background_image][populate]=*'
    + '&populate[category][fields][0]=title'
    + '&populate[category][fields][1]=slug'
    + '&populate[seo]=*'
    + '&populate[sections][populate]=*'
    + '&populate[sections][on][sections.showcase-section][populate][before_after][populate][before_image]=true'
    + '&populate[sections][on][sections.showcase-section][populate][before_after][populate][after_image]=true'
    + '&populate[sections][on][home.testimonial-section][populate][testimonials][populate][avatar]=true'
    + '&populate[sections][on][blog.blog-hero-section][populate][featured_image]=true'
    + '&populate[sections][on][sections.faq-section][populate]=*'
    + '&populate[sections][on][sections.rich-text-section][populate]=*'
    + '&populate[sections][on][home.why-choose-us-section][populate][items][populate][icon_image]=true';

  const res = await fetch(url);
  if (!res.ok) return null;
  // Parse đúng theo response
    const json: StrapiResponse<ServiceDetail[]> = await res.json();
    return json.data && json.data.length > 0 ? json.data[0] : null;
}

// Fetch danh sách toàn bộ dịch vụ (simple)
export async function fetchAllServices(): Promise<ServiceDetail[]> {
  // Use exact query string for service list
  // Use correct array-style populate query string for Strapi v5
  const url = `${STRAPI_URL}/api/services?populate[0]=background_image_before&populate[1]=background_image_after&populate[2]=background_image&populate[3]=seo`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const json: { data: ServiceDetail[] } = await res.json();

  return json.data || [];
}
