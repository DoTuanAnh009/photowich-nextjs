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
  // Flatten categorized services into a single list
  const allServices: { label: string; href: string }[] = [];
  
  if (services) {
    Object.values(services).forEach(categoryServices => {
      categoryServices.forEach(s => {
        allServices.push({
          label: s.title,
          href: `/service/${s.slug}`,
        });
      });
    });
  }

  // Take a maximum of 4 services
  const displayedServices = allServices.length > 0 
    ? allServices.slice(0, 4) 
    : [
        { label: 'Photo Editing', href: '/service/real-estate-photo-editing' },
        { label: 'Day to Dusk', href: '/service/day-to-dusk' },
        { label: 'Video Editing', href: '/service/real-estate-video-editing' },
        { label: 'Virtual Staging', href: '/service/virtual-staging' },
      ];

  return [
    {
      title: 'Services',
      links: displayedServices,
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Blog', href: '/blogs' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];
}
