"use client";
import { StrapiImage } from '@/components/ui/StrapiImage';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { Services } from '@/types/service';
import Link from 'next/link';
import { useState } from 'react';
import ReactCompareImage from 'react-compare-image';

interface ExploreServicesSectionProps {
  heading?: string;
  services?: Services[] | null;
}

export function ExploreServicesSection({ heading, services }: ExploreServicesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  if (!services || services.length === 0) return null;
  const maxItems = 6;
  const displayServices = showAll ? services : services.slice(0, maxItems);
  const hasMore = services.length > maxItems;

  return (
    <section className=" max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center uppercase tracking-wider text-primary dark:text-white">
        {heading || 'Explore All Services'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-3">
        {displayServices.map((service, idx) => (
          <div
            key={service.documentId}
            className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary flex flex-col h-full"
            style={{ animationDelay: `${150 + idx * 100}ms` }}
            tabIndex={0}
            aria-label={service.title}
          >
            <div className="relative w-full h-48 md:max-h-56 overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-700">
              <div className="absolute top-2 left-2 z-10">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">Before</span>
              </div>
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow">After</span>
              </div>
              {service.background_image_before && service.background_image_after ? (
                <div className='relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden group cursor-pointer shadow-lg max-h-max'
                >
                  <>
                    <ReactCompareImage
                      leftImage={getStrapiMediaUrl(service.background_image_before)}
                      rightImage={getStrapiMediaUrl(service.background_image_after)}
                      leftImageAlt={service.title + ' - before'}
                      rightImageAlt={service.title + ' - after'}
                      sliderLineColor="#fff"
                      sliderLineWidth={4}
                      handleSize={32}
                      vertical={false}
                      hover
                      skeleton={<div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse" style={{ minHeight: 180 }}>Loading...</div>}
                    />
                  </>
                </div>
              ) : service.background_image ? (
                <StrapiImage
                  media={service.background_image}
                  alt={service.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">No image</div>
              )}
              <div style={{ pointerEvents: 'none' }} className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-6 flex flex-col gap-2 items-center flex-1 w-full text-center h-full">
              <h3 className="text-lg md:text-xl font-bold text-navy-custom dark:text-white group-hover:text-primary transition-colors text-center">
                {service.title}
              </h3>
              {service.seo?.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-2 line-clamp-2">{service.seo.description}</p>
              )}
              <div className="flex-1 w-full" />
              <Link
                href={`/service/${service.slug}`}
                className="mt-2 flex items-center px-6 py-2 rounded-full bg-yellow-400 text-navy-custom font-bold text-sm shadow hover:bg-yellow-500 transition-colors min-w-[140px]"
                tabIndex={0}
                aria-label={`Xem dịch vụ ${service.title}`}
                style={{ height: 40, lineHeight: '40px' }}
              >
                View service
              </Link>
            </div>
          </div>
        ))}
      </div>
      {hasMore && !showAll && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-primary text-white px-8 py-3 rounded font-bold hover:opacity-90 transition-all uppercase tracking-wider text-sm"
            onClick={() => setShowAll(true)}
          >
            Read More
          </button>
        </div>
      )}
    </section>
  );
}
