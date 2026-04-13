import type { StrapiMedia } from '@/types/strapi';

/**
 * Global Logo Media Object
 * Using direct Cloudinary URL provided by the user.
 * Integrated with StrapiMedia type for compatibility with StrapiImage component.
 */
export const LOGO_MEDIA: StrapiMedia = {
  id: 0,
  name: 'PhotoWitch Logo',
  alternativeText: 'PhotoWitch - Real Estate & eCommerce Post-Production',
  caption: 'PhotoWitch Logo',
  width: 200, // Approximate width, StrapiImage will handle scaling
  height: 200, // Approximate height
  url: 'https://res.cloudinary.com/dcgv5oras/image/upload/v1775488123/logo_z0cxmj.png',
  previewUrl: null,
  provider: 'cloudinary',
  provider_metadata: null,
  formats: {},
};
