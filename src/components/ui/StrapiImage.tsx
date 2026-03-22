/**
 * StrapiImage Component
 * 
 * Wrapper around Next.js Image component for Strapi media.
 * Handles URL transformation and provides sensible defaults.
 * 
 * Strapi v5 Media format (flatten): { id, url, width, height, formats, ... }
 */

// import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { StrapiMedia } from '@/types/strapi';

interface StrapiImageProps {
  media: StrapiMedia | null | undefined;
  /** Override alt text from Strapi */
  alt?: string;
  /** Image size variant to use */
  variant?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original';
  /** Fill container (requires parent to have position: relative) */
  fill?: boolean;
  /** Fixed width (ignored if fill is true) */
  width?: number;
  /** Fixed height (ignored if fill is true) */
  height?: number;
  /** CSS class name */
  className?: string;
  /** Image priority for LCP optimization */
  priority?: boolean;
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * Get image URL based on variant (Strapi v5 flatten format)
 */
function getImageUrl(
  media: StrapiMedia,
  variant: StrapiImageProps['variant'] = 'original'
): string | null {
  if (variant === 'original') {
    return getStrapiMediaUrl(media);
  }

  const format = media.formats?.[variant];

  if (format) {
    return getStrapiMediaUrl(format);
  }

  // Fallback to original if variant not available
  return getStrapiMediaUrl(media);
}

/**
 * Get image dimensions based on variant (Strapi v5 flatten format)
 */
function getImageDimensions(
  media: StrapiMedia,
  variant: StrapiImageProps['variant'] = 'original'
): { width: number; height: number } {
  if (variant === 'original') {
    return {
      width: media.width ?? 1, // fallback tránh undefined
      height: media.height ?? 1,
    };
  }
  const format = media.formats?.[variant];
  if (format) {
    return {
      width: format.width ?? 1,
      height: format.height ?? 1,
    };
  }
  return {
    width: media.width ?? 1,
    height: media.height ?? 1,
  };
}

export function StrapiImage({
  media,
  alt,
  variant = 'original',
  fill = false,
  width,
  height,
  className,
  priority = false,
  objectFit = 'cover',
}: StrapiImageProps) {
  // Strapi v5: Media is flatten, no data.attributes wrapper
  if (!media?.url) {
    return null;
  }

  const imageUrl = getImageUrl(media, variant);
  if (!imageUrl) {
    return null;
  }
  const finalAlt = alt || media.alternativeText || '';
  const dimensions = getImageDimensions(media, variant);
  const style = objectFit ? { objectFit } : undefined;

  // Nếu fill=true thì vẫn trả về img thường, parent phải tự xử lý relative/absolute
  return (
    <img
      src={imageUrl}
      alt={finalAlt}
      width={fill ? undefined : (width || dimensions.width)}
      height={fill ? undefined : (height || dimensions.height)}
      className={className}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
