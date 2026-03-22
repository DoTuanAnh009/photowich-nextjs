/**
 * Footer Wrapper - Server Component
 * 
 * Fetches services data from Strapi and passes to Footer component.
 */

import { getServicesForNav } from '@/lib/strapi';
import { Footer } from './Footer';

export async function FooterWrapper() {
  const services = await getServicesForNav();

  return <Footer services={services} />;
}
