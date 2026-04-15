
import type { BlogPostSummary } from '@/types/blog';
import Link from 'next/link';
import { StrapiImage } from '../ui/StrapiImage';
import { formatDate } from '@/lib/common';

interface BlogLatestListProps {
  posts: BlogPostSummary[];
}

const DEFAULT_IMAGE = '/images/blog-default.jpg';
const DEFAULT_AUTHOR = 'Ẩn danh';
const DEFAULT_EXCERPT = 'Không có mô tả.';

export function BlogLatestList({ posts }: BlogLatestListProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="max-w-4xl mx-auto py-12 text-center text-gray-500">
        <h2 className="text-2xl font-bold text-navy-custom mb-4">Latest Posts</h2>
        <p>Chưa có bài viết mới.</p>
      </section>
    );
  }

  // Featured post (first)
  const [featured, ...rest] = posts;
  const descDelay = 0; // Không cần delay động nữa

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold text-navy-custom">Latest Posts</h2>
      </div>
      {/* Featured post */}
      <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 mb-8 flex flex-col md:flex-row gap-0 md:gap-8 group cursor-pointer hover:shadow-xl transition-shadow duration-300 animate-fadein" style={{ animationDelay: '80ms', animationFillMode: 'both' }}>
        <div className="md:w-3/5 overflow-hidden">
          <Link href={`/blogs/${featured.categorySlug}/${featured.slug}`} aria-label={`Xem chi tiết bài viết ${featured.title}`} tabIndex={0}>
            <StrapiImage
              media={featured.hero?.featured_image}
              alt={featured.hero?.featured_image?.alternativeText || featured.title}
              className="w-full h-80 md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>
        <div className="p-8 md:w-2/5 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <span className="font-bold text-navy-custom">{featured.author?.name || DEFAULT_AUTHOR}</span>
            <span>•</span>
            <span>{formatDate(featured.publishedAt)}</span>
          </div>
          <Link href={`/blogs/${featured.categorySlug}/${featured.slug}`} aria-label={`Xem chi tiết bài viết ${featured.title}`} tabIndex={0}>
            <h3 className="text-3xl font-bold mb-4 leading-tight text-navy-custom dark:text-white group-hover:text-primary transition-colors">
              {featured.title}
            </h3>
          </Link>
          <p className="text-base text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            {featured.excerpt || DEFAULT_EXCERPT}
          </p>
          <Link href={`/blogs/${featured.categorySlug}/${featured.slug}`} aria-label={`Xem chi tiết bài viết ${featured.title}`} tabIndex={0}>
            <button className="w-fit bg-primary text-white px-8 py-2.5 rounded text-sm font-bold uppercase tracking-wider hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary">Read more</button>
          </Link>
        </div>
      </div>
      {/* Grid of other posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rest.map((post, idx) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-lg transition-shadow duration-300 animate-fadein group"
            style={{ animationDelay: `${(idx + 2) * 80}ms`, animationFillMode: 'both' }}
          >
            <Link href={`/blogs/${post.categorySlug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
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
              <Link href={`/blogs/${post.categorySlug}/${post.slug}`} aria-label={`Xem chi tiết bài viết ${post.title}`} tabIndex={0}>
                <h3 className="font-bold text-lg mb-4 leading-snug text-navy-custom dark:text-white hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1">
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
  );
}

export default BlogLatestList;
