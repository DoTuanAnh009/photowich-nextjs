import { fetchBulkOrder } from '@/lib/bulk-order';
import { fetchAllServices } from '@/lib/service';
import { DynamicZone } from '@/components/dynamic-zone';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata() {
	const data = await fetchBulkOrder();
	const seo = data.seo;
	return generatePageMetadata({
		title: seo?.title,
		description: seo?.description,
		canonicalUrl: seo?.canonical,
		pathname: '/bulk-order',
	});
}

export default async function BulkOrderPage() {
	const data = await fetchBulkOrder();
	const services = await fetchAllServices();
	console.log('BulkOrderPage data:', services);
	return (
		<main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900">
			<DynamicZone sections={data.sections} services={services} />
		</main>
	);
}
