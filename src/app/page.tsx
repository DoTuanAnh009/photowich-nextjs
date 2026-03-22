/**
 * Homepage
 * 
 * Server Component that fetches homepage data from Strapi.
 * Strapi v5 uses flatten response format.
 */
export const dynamic = "force-dynamic";
import { DynamicZone } from '@/components/dynamic-zone';
import { generatePageMetadata } from '@/lib/seo';
import { fetchStrapi } from '@/lib/strapi';
import type { Homepage } from '@/types/strapi';
import type { Metadata } from 'next';

/**
 * Build homepage populate query for Strapi
 * Each section needs explicit populate for nested relations
 */
function buildHomepageQuery(): Record<string, string> {
  return {
    'populate[seo]': '*',
    'populate[sections][on][home.hero-slider-section][populate]': 'slides.background_image',
    'populate[sections][on][home.why-choose-us-section][populate]': 'items',
    'populate[sections][on][home.service-list-section][populate][services][populate][0]': 'background_image',
    'populate[sections][on][home.service-list-section][populate][services][populate][1]': 'seo',
    'populate[sections][on][home.service-list-section][populate][services][populate][2]': 'background_image_before',
    'populate[sections][on][home.service-list-section][populate][services][populate][3]': 'background_image_after',
    'populate[sections][on][home.service-list-section][populate][services][populate][4]': 'category',
    'populate[sections][on][home.testimonial-section][populate]': 'testimonials.avatar',
    'populate[sections][on][home.partners-section][populate]': 'partners.logo',
    'populate[sections][on][home.try-for-free-section][populate]': 'bullets',
    'populate[sections][on][sections.process-steps-section][populate]': '*',
  };
}

/**
 * Fetch homepage data from Strapi
 */
async function getHomepage(): Promise<Homepage | null> {
  try {
    const { data } = await fetchStrapi<Homepage>({
      endpoint: '/homepage',
      query: buildHomepageQuery(),
      tags: ['homepage'],
      revalidate: 60,
    });
    // Strapi v5: data is flatten, no attributes wrapper
    return data ?? null;
  } catch (error) {
    console.error('Failed to fetch homepage:', error);
    return null;
  }
}

/**
 * Generate SEO metadata from CMS
 */
export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  const seo = homepage?.seo;
  
  return generatePageMetadata({
    title: seo?.title,
    description: seo?.description,
    canonicalUrl: seo?.canonical,
    pathname: '/',
  });
}

export default async function HomePage() {
  const homepage = await getHomepage();
  if (!homepage) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          Homepage content not available. Please configure in CMS.
        </p>
      </main>
    );
  }
  return (
    <main>
      <DynamicZone sections={homepage.sections} />
    </main>
  );
}
