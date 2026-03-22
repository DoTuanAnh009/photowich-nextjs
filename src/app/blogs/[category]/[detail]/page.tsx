
export const dynamic = "force-dynamic";
import SocialActionButtons from '@/components/blog/SocialActionButtons';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { fetchBlogDetailBySlug } from '@/lib/blog-detail';
import { fetchRelatedPostsByTags } from '@/lib/blog-related';
import { formatDate } from '@/lib/common';
import { BlogSEO } from '@/types/blog';
import type { BlogPostDetail } from '@/types/blog-detail';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogDetailPageProps {
  params: { category: string; detail: string };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    
    let realParams = params;
  if (typeof params === 'string') {
    try {
      realParams = JSON.parse(params);
    } catch (e) {
      console.error('Cannot parse params string:', params);
    }
  } else if (params && typeof (params as any).then === 'function') {
    realParams = await params;
    if (typeof realParams === 'string') {
      try {
        realParams = JSON.parse(realParams);
      } catch (e) {
        console.error('Cannot parse awaited params string:', realParams);
      }
    }
  }
  const post: BlogPostDetail | null = await fetchBlogDetailBySlug(realParams?.detail);
  if (!post) return notFound();
  // Fetch related posts by tags (loại trừ bài hiện tại)
  const relatedPosts = post.tags && post.tags.length > 0
    ? await fetchRelatedPostsByTags(post.tags, post.slug, 4)
    : [];
  // TOC: parse heading từ markdown các block text/table
  function extractTocFromContent(content: BlogPostDetail['content']) {
    const toc: { level: number; text: string; id: string }[] = [];
    content.forEach(block => {
      if (
        block.__component === 'blog.text-section' ||
        block.__component === 'blog.table-section'
      ) {
        const raw = (block as any).text || (block as any).table || '';
        const lines = raw.split('\n');
        lines.forEach((line: any) => {
          const match = line.match(/^(#{2,3}) (.+)/); // ## hoặc ### heading
          if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text
              .toLowerCase()
              .replace(/[^\w]+/g, '-')
              .replace(/^-+|-+$/g, '');
            toc.push({ level, text, id });
          }
        });
      }
    });
    return toc;
  }
  const toc = extractTocFromContent(post.content);

  // Custom heading để gán id cho anchor
  const markdownComponents = {
    h2: ({ node, ...props }: any) => {
      // Lấy toàn bộ text của heading (kể cả số thứ tự và phần chữ)
      let text = '';
      if (Array.isArray(props.children)) {
        text = props.children.map((c: any) => (typeof c === 'string' ? c : (c?.props?.children ?? ''))).join('');
      } else if (typeof props.children === 'string') {
        text = props.children;
      }
      const id = text
        ? text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '')
        : undefined;
      const { className, ...rest } = props;
      return <h2 id={id} className={className ? `${className} font-bold text-primary` : 'font-bold text-primary'} {...rest}>{props.children}</h2>;
    },
    h3: ({ node, ...props }: any) => {
      let text = '';
      if (Array.isArray(props.children)) {
        text = props.children.map((c: any) => (typeof c === 'string' ? c : (c?.props?.children ?? ''))).join('');
      } else if (typeof props.children === 'string') {
        text = props.children;
      }
      const id = text
        ? text.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '')
        : undefined;
      const { className, ...rest } = props;
      return <h3 id={id} className={className ? `${className} font-bold text-primary` : 'font-bold text-primary'} {...rest}>{props.children}</h3>;
    },
  };
  return (
    <main className="pt-6 pb-24 px-2 md:px-0 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
        <Link href="/blogs" className="hover:underline">Home</Link>
        <span>/</span>
        {post.category?.title && (
          <Link href={`/blogs/${post.category.slug}`} className="hover:underline">{post.category.title}</Link>
        )}
        <span>/</span>
        <span className="text-primary font-medium">{post.title}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight mb-6 dark:text-white">{post.title}</h1>

      {/* Hero image */}
      {post.hero?.featured_image?.url && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
          <StrapiImage
            media={post.hero.featured_image}
            alt={post.hero.featured_image.alternativeText || post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6" />
        </div>
      )}

      {/* Author & date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {post.author && (
            <>
              {/* Avatar nếu có */}
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-lg font-bold">
                {post.author.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold">{post.author.name}</p>
                <p className="text-xs text-slate-500">{formatDate(post.publishedAt)}</p>
              </div>
            </>
          )}
        </div>
        <SocialActionButtons postTitle={post.title} />
      </div>

      {/* TOC */}
      {toc.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl mb-8">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <span className="material-symbols-outlined mr-2 text-primary">list_alt</span>
            Table of Contents
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {toc.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-start ${item.level === 3 ? 'pl-7 md:pl-10' : ''}`}
              >
                <a className="hover:text-primary transition-colors" href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <style>{`
          .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
            background: white;
            border-radius: 0.5em;
            overflow: hidden;
          }
          .prose thead tr {
            background: #f1f5f9;
          }
          .prose th, .prose td {
            border: 1px solid #e2e8f0;
            padding: 0.5em 1em;
            text-align: left;
          }
          .prose th {
            font-weight: bold;
            color: #0ea5e9;
            background: #f1f5f9;
          }
          .prose tr:nth-child(even) td {
            background: #f8fafc;
          }
        `}</style>
        {post.content.map((block, idx) => {
          switch (block.__component) {
            case 'blog.text-section':
              return (
                <ReactMarkdown key={idx} components={markdownComponents} remarkPlugins={[remarkGfm]}>
                  {block.text}
                </ReactMarkdown>
              );
            case 'blog.table-section':
              return (
                <ReactMarkdown key={idx} components={markdownComponents} remarkPlugins={[remarkGfm]}>
                  {block.table}
                </ReactMarkdown>
              );
            case 'blog.image-section':
              return (
                <figure key={idx} className="my-8">
                  <StrapiImage
                    media={block.image}
                    alt={block.alternativeText || post.title}
                    className="rounded-xl mx-auto shadow-md"
                  />
                  {block.caption && (
                    <figcaption className="text-center text-xs text-slate-500 mt-2">{block.caption}</figcaption>
                  )}
                </figure>
              );
            case 'blog.gallery-section':
              return (
                <div key={idx} className="grid grid-cols-2 gap-4 my-8">
                  {block.images.map((img, i) => (
                    <StrapiImage
                      key={i}
                      media={img}
                      alt={img.alternativeText || post.title}
                      className="rounded-xl shadow-md w-full h-auto object-cover"
                    />
                  ))}
                  {block.caption && (
                    <div className="col-span-2 text-center text-xs text-slate-500 mt-2">{block.caption}</div>
                  )}
                </div>
              );
            case 'blog.video-section':
              return (
                <div key={idx} className="my-8">
                  <video controls className="w-full rounded-xl shadow-md">
                    <source src={block.url} />
                  </video>
                  {block.caption && (
                    <div className="text-center text-xs text-slate-500 mt-2">{block.caption}</div>
                  )}
                </div>
              );
            case 'blog.quote-section':
              return (
                <blockquote key={idx} className="border-l-4 border-primary pl-4 italic my-8 text-lg text-slate-700 dark:text-slate-300">
                  “{block.quote}”
                  {block.author && (
                    <footer className="mt-2 text-xs text-slate-500">— {block.author}{block.position ? `, ${block.position}` : ''}</footer>
                  )}
                </blockquote>
              );
            default:
              return null;
          }
        })}
      </article>


      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full font-medium">#{tag.name}</span>
          ))}
        </div>
      )}

      

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16">
          <h4 className="font-bold text-lg mb-6 flex items-center justify-between">
            Related Posts
            <Link href="/blogs" className="text-primary text-sm font-medium">See All</Link>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.category?.slug || item.categorySlug || 'uncategorized'}/${item.slug}`}
                className="group block rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow hover:shadow-lg transition-all border border-slate-100 dark:border-slate-800"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {item.hero?.featured_image?.url && (
                    <StrapiImage
                      media={item.hero.featured_image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {item.author?.name && (
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                        {item.author?.name}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 ml-auto">{formatDate(item.publishedAt)}</span>
                  </div>
                  <h5 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h5>
                  {item.excerpt && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.excerpt}</p>
                  )}
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors cursor-pointer">
                      Read more
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateMetadata(
  props: { params: { category: string; detail: string } }
) {
  const { params } = props;
  // SEO-first: fetch post detail để lấy metadata động
  const post: BlogPostDetail | null = await fetchBlogDetailBySlug(params.detail);
  if (!post) {
    return {
      title: 'Blog Detail',
      description: '',
      alternates: { canonical: `/blogs/${params.category}/${params.detail}` },
    };
  }
  const seo = post.seo || {} as BlogSEO;
  return {
    title: seo.title || post.title,
    description: seo.description || post.excerpt || '',
    alternates: { canonical: `/blogs/${params.category}/${params.detail}` },
    openGraph: {
      title: seo.title || post.title,
      description: seo.description || post.excerpt || '',
      url: `/blogs/${params.category}/${params.detail}`,
      type: 'article',
      images: post.hero?.featured_image?.url ? [post.hero.featured_image.url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title || post.title,
      description: seo.description || post.excerpt || '',
      images: post.hero?.featured_image?.url ? [post.hero.featured_image.url] : undefined,
    },
  };
}
