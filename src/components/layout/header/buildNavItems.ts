/**
 * Build Navigation Items
 * 
 * Utility function to build navigation items with dynamic services.
 */

import type { NavService } from '@/lib/strapi';
import type { BlogCategory } from '@/types/blog';
import type { MenuCategory, NavItem } from '@/types/header';


export function buildNavItems(
  services?: Record<string, NavService[]>,
  blogCategories?: BlogCategory[]
): NavItem[] {
  // Build services dropdown from API data
  const servicesDropdown: MenuCategory[] = [];
  let serviceDetail = "";
  if (services) {
     serviceDetail = services[Object.keys(services)[0]]?.flatMap((arr) => arr).find((s) => s.slug === 'real-estate-photo-editing')?.slug ?? "";
    Object.entries(services).forEach(([cat, arr]) => {
      if (arr.length > 0) {
        servicesDropdown.push({
          title: cat.charAt(0).toUpperCase() + cat.slice(1),
          items: arr.map((s) => ({
            label: s.title,
            href: `/service/${s.slug}`,
            description: s.description,
          })),
        });
      }
    });
  }
  // Fallback if no services from API
  if (servicesDropdown.length === 0) {
    servicesDropdown.push(
      {
        title: 'Photo Editing',
        items: [
          { label: 'Real Estate Photo Editing', href: '/service/real-estate-photo-editing' },
          { label: 'Day To Dusk', href: '/service/day-to-dusk' },
        ],
      },
      {
        title: 'Video Editing',
        items: [
          { label: 'Real Estate Video Editing', href: '/service/real-estate-video-editing' },
        ],
      }
    );
  }

  // Build blog categories dropdown from API data
  const blogDropdown: MenuCategory[] = [];
  if (blogCategories && blogCategories.length > 0) {
    blogDropdown.push({
      title: 'Blog Categories',
      // items: blogCategories.map((cat) => ({
      //   label: cat.title,
      //   description: cat.description || '',
      //   href: `/blog/${cat.slug}`,
      //   // icon: cat.icon (nếu có)
      // })),
    });
  }

  return [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: `/service/${serviceDetail}`,
      dropdown: servicesDropdown,
    },
    { label: 'Bulk Order', href: '/bulk-order' },
    blogDropdown.length > 0
      ? {
          label: 'Blog',
          href: '/blogs',
        }
      : { label: 'Blog', href: '/blogs' },
    {
      label: 'Company',
      href: '/about',
      dropdown: [
        {
          title: 'Company',
          items: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact Us', href: '/contact' },
          ],
        },
      ],
    },
  ];
}
