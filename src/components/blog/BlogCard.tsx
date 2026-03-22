import type { BlogPostSummary } from '@/types/blog';

/**
 * BlogCard: Card for a single blog post (used in grid/list)
 * Props: post
 */
export function BlogCard({ post }: { post: BlogPostSummary }) {
  // TODO: Render blog card UI
  return <article>{post.title}</article>;
}
