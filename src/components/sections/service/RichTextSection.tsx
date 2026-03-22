// Basic renderer for Strapi v5 Rich text (Blocks)
function renderRichTextBlocks(blocks: any[]) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={idx} className="mb-4 text-sm">{block.children?.map((child: any, i: number) => child.text).join('')}</p>;
      case 'heading':
        // heading.level: 1,2,3...
        const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return <Tag key={idx} className="font-bold text-xl mt-6 mb-2">{block.children?.map((child: any) => child.text).join('')}</Tag>;
      case 'list':
        if (block.format === 'unordered') {
          return <ul key={idx} className="list-disc pl-6 mb-4">{block.children?.map((li: any, i: number) => <li key={i}>{li.children?.map((c: any) => c.text).join('')}</li>)}</ul>;
        } else {
          return <ol key={idx} className="list-decimal pl-6 mb-4">{block.children?.map((li: any, i: number) => <li key={i}>{li.children?.map((c: any) => c.text).join('')}</li>)}</ol>;
        }
      case 'quote':
        return <blockquote key={idx} className="border-l-4 border-primary pl-4 italic text-slate-600 mb-4">{block.children?.map((child: any) => child.text).join('')}</blockquote>;
      case 'image':
        return <img key={idx} src={block.url} alt={block.alt || ''} className="my-4 max-w-full rounded" />;
      default:
        return null;
    }
  });
}
import type { RichTextSection as RichTextSectionType } from '@/types/service';
import { JSX } from 'react';

export function RichTextSection({ heading, content }: RichTextSectionType) {
  if (!heading && !content) return null;
  return (
    <section className="max-w-4xl mx-auto px-6 mt-6">
      {heading && <h2 className="text-2xl text-center md:text-3xl font-bold text-primary dark:text-white mb-4">{heading}</h2>}
      {content && (
        <div className="prose dark:prose-invert text-lg">
          {renderRichTextBlocks(content)}
        </div>
      )}
    </section>
  );
}
