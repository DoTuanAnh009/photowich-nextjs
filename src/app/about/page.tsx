export const dynamic = "force-dynamic";
import { fetchAboutUs } from '@/lib/about-us';
// import { DynamicZone } from '@/components/dynamic-zone';
import { AboutUsGallery } from '@/components/sections/about/AboutUsGallery';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { generatePageMetadata } from '@/lib/seo';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export async function generateMetadata() {
	const data = await fetchAboutUs();
	const seo = data.seo;
	return generatePageMetadata({
		title: seo?.title,
		description: seo?.description,
		canonicalUrl: seo?.canonical,
		pathname: '/about',
	});
}

export default async function AboutUsPage() {
	const data = await fetchAboutUs();
	// Find hero and text section
	const hero = data.sections.find(s => s.__component === 'blog.blog-hero-section');
	const textSection = data.sections.find(s => s.__component === 'blog.text-section');

	return (
		<main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900">
			{/* Hero blog section */}
			{hero && (
				<section className="relative w-full h-80 md:h-100 flex items-center justify-center overflow-hidden">
					{/* Render featured_image if exists */}
					{hero.featured_image && (
						<StrapiImage
							media={hero.featured_image}
							alt={hero.title}
							className="absolute inset-0 w-full h-full object-cover z-0"
							fill
						/>
					)}
					<div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40">
						<h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-2 drop-shadow-lg uppercase">{hero.title}</h1>
						<p className="text-lg md:text-xl text-white text-center drop-shadow mb-2 max-w-2xl">{hero.excerpt}</p>
					</div>
				</section>
			)}
			{/* Main content: Gallery left, text markdown right */}
			<div className="max-w-360 mx-auto min-h-[calc(100vh-112px)] flex flex-col lg:flex-row">
				<AboutUsGallery />
				<section className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 py-12 lg:py-24 bg-white dark:bg-background-dark">
					{textSection && (
                        
						<div className="prose dark:prose-invert max-w-xl mx-auto">
							{/* Render markdown using ReactMarkdown */}
							<ReactMarkdown
							  rehypePlugins={[rehypeRaw]}
							  components={{
							    h1: ({children}) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
							    h2: ({children}) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
							    h3: ({children}) => <h3 className="text-xl font-semibold mb-2">{children}</h3>,
							    blockquote: ({children}) => <blockquote className="italic border-l-4 border-slate-300 pl-4 mb-4 mt-4 text-slate-600">{children}</blockquote>,
							    em: ({children}) => <em className="italic text-slate-700">{children}</em>,
							    strong: ({children}) => <strong className="font-bold text-black dark:text-white">{children}</strong>,
							    p: ({children}) => <p className="mb-2 leading-relaxed">{children}</p>,
							  }}
							>{textSection.text}</ReactMarkdown>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
