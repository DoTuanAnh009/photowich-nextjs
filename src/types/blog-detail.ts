import type { BlogAuthor, BlogCategory, BlogSEO, BlogPostHero, BlogTag, BlogContentBlock } from './blog';

export interface BlogPostDetail {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  content: BlogContentBlock[];
  author?: BlogAuthor | null;
  hero?: BlogPostHero | null;
  category?: BlogCategory | null;
  seo?: BlogSEO | null;
  tags?: BlogTag[];
}
