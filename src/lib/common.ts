import type { ContactApiResponse, ContactData } from '@/types/contact';

const baseUrl =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL;
export async function fetchContact(): Promise<ContactData> {
  const res = await fetch(
    `${baseUrl}/api/contact?populate[sections][on][blog.blog-hero-section][populate][featured_image]=true&populate[seo]=*&populate[sections][on][blog.text-section]=*`,
    { next: { revalidate: 60 }, cache: 'no-store' }
  );
  const json = await res.json();
  const data: ContactApiResponse = json.data;

  // Find hero section
  const heroSection = data.sections.find(s => s.__component === 'blog.blog-hero-section');
  const hero = heroSection
    ? {
        title: heroSection.title,
        subtitle: heroSection.excerpt,
        image: heroSection.featured_image || undefined,
      }
    : undefined;

  return {
    hero,
    seo: data.seo,
  };
}
// Định dạng ngày theo dạng: Oct 24, 2023
export function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
