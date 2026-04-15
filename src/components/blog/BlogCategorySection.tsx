
import type { BlogCategory, BlogPostSummary } from '@/types/blog';
import Link from 'next/link';
import { StrapiImage } from '../ui/StrapiImage';
import { formatDate } from '@/lib/common';

const DEFAULT_IMAGE = '/images/blog-default.jpg';
const DEFAULT_AUTHOR = 'Ẩn danh';
const DEFAULT_EXCERPT = 'Không có mô tả.';

export function BlogCategorySection({ category, posts }: { category: BlogCategory, posts: BlogPostSummary[] }) {
  if (!posts || posts.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-navy-custom">{category.title}</h2>
          <Link href={`/blogs/${category.slug}`} className="text-primary font-bold text-sm hover:underline" aria-label={`Xem tất cả bài viết chuyên mục ${category.title}`}>See All</Link>
        </div>
        <p className="text-center text-gray-500">Chưa có bài viết</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-navy-custom">{category.title}</h2>
        <Link href={`/blogs/${category.slug}`} className="text-primary font-bold text-sm hover:underline" aria-label={`Xem tất cả bài viết chuyên mục ${category.title}`}>See All</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-lg transition-shadow duration-300 animate-fadein group"
            style={{ animationDelay: `${(idx + 1) * 80}ms`, animationFillMode: 'both' }}
          >
            <Link href={`/blogs/${category.slug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
              <StrapiImage
                media={post.hero?.featured_image}
                alt={post.hero?.featured_image?.alternativeText || post.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <div className="text-[10px] text-slate-400 font-bold mb-3 uppercase">
                {post.author?.name || DEFAULT_AUTHOR} • {formatDate(post.publishedAt)}
              </div>
              <Link href={`/blogs/${category.slug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
                <h3 className="font-bold text-lg mb-4 leading-snug text-navy-custom dark:text-white hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1">
                {post.excerpt || DEFAULT_EXCERPT}
              </p>
              <Link href={`/blogs/${category.slug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
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
  );
}

export default BlogCategorySection;
