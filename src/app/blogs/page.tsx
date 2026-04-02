export const dynamic = "force-dynamic";
import { BlogCategorySection } from '@/components/blog/BlogCategorySection';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogLatestList } from '@/components/blog/BlogLatestList';
import { ExploreServicesSection } from '@/components/sections/service/ExploreServicesSection';
import { fetchBlogIndex, fetchLatestPosts, fetchPostsByCategory } from '@/lib/blog';
import { generatePageMetadata } from '@/lib/seo';
import { fetchAllServices } from '@/lib/service';
import type { BlogCategory } from '@/types/blog';
import { Services } from '@/types/service';

export default async function BlogIndexPage() {
  // Fetch main blog index data
  const blogIndex = await fetchBlogIndex();
  if (!blogIndex) {
    return <main className="max-w-4xl mx-auto py-12 text-center text-gray-500">Không thể tải dữ liệu blog.</main>;
  }

  // Fetch latest posts
  const latestPosts = await fetchLatestPosts(blogIndex.layout?.latest_limit || 4);
  // Fetch posts for each category (parallel)
  const categoryPosts = await Promise.all(
    (blogIndex.blog_categories || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(async (cat: BlogCategory) => ({
      category: cat,
      posts: await fetchPostsByCategory(cat.slug, blogIndex.layout?.posts_per_category || 6),
    }))
  );

  // Fetch all services for the Explore section
  const services = await fetchAllServices() as unknown as Services[];

  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero section */}
      {blogIndex.hero && <BlogHero hero={blogIndex.hero} categories={blogIndex.blog_categories} />}

      {/* Latest posts */}
      {latestPosts && latestPosts.length > 0 && <BlogLatestList posts={latestPosts} />}
      {/* Category sections */}
      {categoryPosts.map(({ category, posts }) =>
        posts && posts.length > 0 ? (
          <BlogCategorySection key={category.id} category={category} posts={posts} />
        ) : null
      )}

      {/* Explore Services section */}
      <div className="py-12 border-t border-slate-100 dark:border-slate-800">
        <ExploreServicesSection heading="Explore Our Services" services={services} />
      </div>
    </main>
  );
}

export async function generateMetadata() {
  const blogIndex = await fetchBlogIndex();
  const seo = blogIndex?.seo;
  return generatePageMetadata({
    title: seo?.title || blogIndex?.hero?.title || 'Blogs',
    description: seo?.description || blogIndex?.hero?.excerpt || '',
    canonicalUrl: seo?.canonical || '/blog',
    pathname: '/blog',
  });
}
