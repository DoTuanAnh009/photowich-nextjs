import { BlogHero } from '@/components/blog/BlogHero';
import { BlogLatestList } from '@/components/blog/BlogLatestList';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { fetchBlogIndex, fetchCategoryBySlug, fetchPostsByCategory } from '@/lib/blog';
import { fetchAllServices } from '@/lib/service';
import { formatDate } from '@/lib/common';
import { generatePageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExploreServicesSection } from '@/components/sections/service/ExploreServicesSection';
import { Services } from '@/types/service';

const DEFAULT_AUTHOR = 'Ẩn danh';
const DEFAULT_EXCERPT = 'Không có mô tả.';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

async function resolveParams(params: Promise<any>) {
  const resolved = await params;
  if (typeof resolved === 'string') {
    try {
      return JSON.parse(resolved);
    } catch {
      return { category: resolved };
    }
  }
  return resolved;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await resolveParams(params);
  const categoryData = await fetchCategoryBySlug(category);
  if (!categoryData) return {};

  return generatePageMetadata({
    title: `${categoryData.title} Archives - Blog`,
    description: categoryData.description || `Xem bài viết thuộc chuyên mục ${categoryData.title}`,
    pathname: `/blogs/${category}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await resolveParams(params);

  const categoryData = await fetchCategoryBySlug(category);

  if (!categoryData) {
    notFound();
  }

  // 1. Fetch BlogIndex to reuse the exact BlogHero layout
  const blogIndex = await fetchBlogIndex();

  // 2. Fetch Latest Posts for THIS CATEGORY
  const latestPosts = await fetchPostsByCategory(category, 4);

  // 3. Fetch all other posts for THIS CATEGORY (skipping the first 4 if they exist, or just getting a larger batch)
  // To keep it simple, fetch all posts with limit 16
  const allPosts = await fetchPostsByCategory(category, 16);

  // Lấy ra danh sách các bài ở lưới (bỏ qua 4 bài mới nhất đã hiện ở trên)
  const gridPosts = allPosts.length > 4 ? allPosts : [];

  if (blogIndex?.hero) {
    blogIndex.hero.title = categoryData.title
    blogIndex.hero.excerpt = categoryData.description
  }

  // Explore services
  const services = await fetchAllServices() as unknown as Services[];
  return (
    <main className="bg-white dark:bg-slate-900 min-h-screen">

      {/* 1. Hero section tái sử dụng từ /blogs (hoặc Custom Hero nhưng theo form đó) */}
      {blogIndex?.hero && (
        <BlogHero 
          hero={blogIndex.hero} 
          categories={blogIndex.blog_categories} 
          activeSlug={category}
        />
      )}

      {/* 2. Latest posts NHƯNG CHỈ TRONG CATEGORY NÀY */}
      {latestPosts && latestPosts.length > 0 && (
        <BlogLatestList posts={latestPosts} />
      )}

      {/* 3. Lưới các bài viết còn lại trong danh mục */}
      {gridPosts && gridPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary">More in {categoryData.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gridPosts.map((post, idx) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-lg transition-shadow duration-300 animate-fadein group"
                style={{ animationDelay: `${(idx + 1) * 80}ms`, animationFillMode: 'both' }}
              >
                <Link href={`/blogs/${post.categorySlug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
                  <StrapiImage
                    media={post.hero?.featured_image}
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase">
                    {post.author?.name || DEFAULT_AUTHOR} • {formatDate(post.publishedAt)}
                  </div>
                  <Link href={`/blogs/${post.categorySlug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
                    <h3 className="font-bold text-lg mb-4 leading-snug text-slate-800 dark:text-white hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-3">
                    {post.excerpt || DEFAULT_EXCERPT}
                  </p>
                  <Link href={`/blogs/${post.categorySlug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
                    <button className="w-fit bg-primary text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Read more</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            @keyframes fadein {
              from { opacity: 0; transform: translateY(32px); }
              to { opacity: 1; transform: none; }
            }
            .animate-fadein {
              animation: fadein 0.6s cubic-bezier(0.4,0,0.2,1) both;
            }
          `}</style>
        </section>
      )}

      {/* Explore Services section */}
      <div className="py-12 border-t border-slate-100 dark:border-slate-800">
        <ExploreServicesSection heading="Explore Our Services" services={services} />
      </div>
    </main>
  );
}
