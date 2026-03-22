export const dynamic = "force-dynamic";
import { DynamicZone } from '@/components/dynamic-zone';
import { generatePageMetadata } from '@/lib/seo';
import { fetchAllServices, fetchDetailService } from '@/lib/service';
import type { Metadata } from 'next';

interface ServiceDetailPageProps {
  params: { slug: string };
}


export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await fetchDetailService(slug);
  return generatePageMetadata({
    title: detail?.seo?.title || detail?.title,
    description: detail?.seo?.description,
    canonicalUrl: detail?.seo?.canonical,
    pathname: `/service/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const detail = await fetchDetailService(slug);
  const services = await fetchAllServices();

  if (!detail) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Service detail not available. Please configure in CMS.</p>
      </main>
    );
  }

  // H1: ServiceDetail.title
  // SEO meta: ServiceDetail.seo
  // Mapping từng block từ detail.sections
  // Explore Services: services
  return (
    <main>
      <DynamicZone sections={detail.sections} services={services} />
    </main>
  );
}
