/**
 * Footer Data
 * 
 * Build footer sections from API services data.
 */

import type { FooterProps, FooterSection } from '@/types/footer';

/**
 * Build footer sections with dynamic services
 */
export function buildFooterSections(services?: FooterProps['services']): FooterSection[] {
  // Build services links from API data
  const serviceLinks: FooterSection['links'] = [];

  if (services?.photo && services.photo.length > 0) {
    services.photo.forEach((s) => {
      serviceLinks.push({
        label: s.title,
        href: `/service/${s.slug}`,
      });
    });
  }

  if (services?.video && services.video.length > 0) {
    services.video.forEach((s) => {
      serviceLinks.push({
        label: s.title,
        href: `/service/${s.slug}`,
      });
    });
  }

  // Fallback if no services from API
  if (serviceLinks.length === 0) {
    serviceLinks.push(
      { label: 'Photo Editing', href: '/service/real-estate-photo-editing' },
      { label: 'Day to Dusk', href: '/service/day-to-dusk' },
      { label: 'Video Editing', href: '/service/real-estate-video-editing' },
    );
  }

  return [
    {
      title: 'Services',
      links: serviceLinks,
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];
}
