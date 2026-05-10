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
    const categoriesWithIndex = Object.entries(services)
      .map(([cat, arr]) => {
        const sortedArr = [...arr].sort((a, b) => (a.index || 0) - (b.index || 0));
        return {
          title: cat.charAt(0).toUpperCase() + cat.slice(1),
          minIndex: sortedArr.length > 0 ? (sortedArr[0].index || 0) : 0,
          items: sortedArr.map((s) => ({
            label: s.title,
            href: `/service/${s.slug}`,
            description: s.description,
          })),
        };
      })
      .filter((cat) => cat.items.length > 0)
      .sort((a, b) => a.minIndex - b.minIndex);

    categoriesWithIndex.forEach(({ title, items }) => {
      servicesDropdown.push({ title, items });
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
      items: blogCategories.map((cat) => ({
        label: cat.title,
        description: cat.description || '',
        href: `/blogs/${cat.slug}`,
        // icon: cat.icon (nếu có)
      })),
    });
  }

  return [
    { label: 'Home', href: '/' },
    {
      label: 'Services',
      href: `/service/${serviceDetail}`,
      dropdown: servicesDropdown,
    },
    { label: 'Order', href: '/bulk-order' },
    blogDropdown.length > 0
      ? {
        label: 'Blog',
        href: '/blogs',
        dropdown: blogDropdown,
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
