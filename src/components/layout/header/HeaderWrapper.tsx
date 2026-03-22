/**
 * Header Wrapper - Server Component
 * 
 * Fetches navigation data from Strapi and passes to Header client component.
 */

import { getServicesForNav } from '@/lib/strapi';
import { Header } from './Header';
import { getBlogCategoriesForNav } from '@/lib/blog';

export async function HeaderWrapper() {
  const services = await getServicesForNav();
  const blogCategories = await getBlogCategoriesForNav();

  return <Header services={services} blogCategories={blogCategories} />;
}
