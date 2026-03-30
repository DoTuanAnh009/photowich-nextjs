import { StrapiImage } from '@/components/ui/StrapiImage';
import type { BlogCategory, BlogHero } from '@/types/blog';

interface BlogHeroProps {
  hero: BlogHero;
  categories?: BlogCategory[];
}

export function BlogHero({ hero, categories = [] }: BlogHeroProps) {
  // Split title into array of chars, preserving spaces
  const chars = (hero.title || 'Blogs').split(/(\s+)/);
const isServer = typeof window === "undefined";

  const descDelay = chars.length * 40 + 200;

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 h-[400px] md:h-[420px] lg:h-[480px] w-full overflow-hidden"
    >
      <StrapiImage
        media={hero.featured_image}
        alt={hero.title}
        className="absolute inset-0 w-full h-full object-cover z-0"
        fill/>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight flex flex-wrap justify-center gap-x-1 gap-y-2 select-none">
        {chars.map((char, i) => (
          <span
            key={i}
            className={char === ' ' ? 'inline-block w-2 md:w-3' : ''}
            style={{
              opacity: 0,
              animation: `fadeInChar 0.4s cubic-bezier(0.4,0,0.2,1) forwards`,
              animationDelay: `${i * 40}ms`,
              transition: 'opacity 0.2s',
            }}
          >
            {char}
          </span>
        ))}
      </h1>
      {/* Category buttons */}
      
      {/* Description appears after title animation */}
      {hero.excerpt && (
        <p
          className="text-white/90 text-lg max-w-2xl font-light leading-relaxed mt-6 transition-opacity duration-500 opacity-0 animate-fadein-desc"
          style={{ animationDelay: `${descDelay}ms`, animationFillMode: 'forwards' }}
        >
          {hero.excerpt}
        </p>
      )}
      {categories.length > 0 && (
        <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl px-4">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/blog/${cat.slug}`}
              className="px-5 py-2.5 bg-white text-primary rounded shadow-sm text-sm font-bold hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {cat.title}
            </a>
          ))}
        </div>
      )}
      <style>{`
        @keyframes fadeInChar {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fadein-desc {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadein-desc {
          animation: fadein-desc 0.6s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </section>
  );
}

export default BlogHero;
