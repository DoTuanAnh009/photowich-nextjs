import type { BlogCategory, BlogHero } from '@/types/blog';

interface BlogHeroProps {
  hero: BlogHero;
  categories?: BlogCategory[];
  activeSlug?: string;
}

export function BlogHero({ hero, categories = [], activeSlug = 'all' }: BlogHeroProps) {
  // Split title into array of chars, preserving spaces
  const chars = (hero.title || 'Blogs').split(/(\s+)/);
  const isServer = typeof window === "undefined";

  const descDelay = chars.length * 40 + 200;
  console.log('BlogHero Rendered with title:', hero.link_url);
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 h-[400px] md:h-[420px] lg:h-[480px] w-full overflow-hidden"
    >
      {hero.link_url ? (
        hero.link_url.includes('youtube.com') || hero.link_url.includes('youtu.be') ? (
          <iframe
            src={(() => {
              let url = hero.link_url || '';
              if (url.includes('watch?v=')) {
                url = url.replace('watch?v=', 'embed/');
              } else if (url.includes('youtu.be/')) {
                url = url.replace('youtu.be/', 'youtube.com/embed/');
              }
              const hasParams = url.includes('?');
              const videoIdMatch = url.match(/embed\/([^?&]+)/);
              const videoId = videoIdMatch ? videoIdMatch[1] : '';
              return `${url}${hasParams ? '&' : '?'}autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
            })()}
            title={hero.title}
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[400px] min-w-[712px] md:min-h-[420px] md:min-w-[747px] lg:min-h-[480px] lg:min-w-[854px] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none object-cover"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <video
            src={hero.link_url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )
      ) : (
        <></>
      )}

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight flex flex-wrap justify-center gap-x-1 gap-y-2 select-none">
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

        {/* Category buttons - Only show on main blog page (when no activeSlug is provided) */}
        {!activeSlug || activeSlug === 'all' ? (
          <div
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 opacity-0 animate-fadein-desc"
            style={{ animationDelay: `${descDelay - 100}ms` }}
          >
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/blogs/${cat.slug}`}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-sm hover:shadow-md"
              >
                {cat.title}
              </a>
            ))}
          </div>
        ) : null}

        {/* Description appears after title animation */}
        {hero.excerpt && (
          <p
            className="text-white/90 text-lg max-w-2xl font-light leading-relaxed transition-opacity duration-500 opacity-0 animate-fadein-desc"
            style={{ animationDelay: `${descDelay}ms`, animationFillMode: 'forwards' }}
          >
            {hero.excerpt}
          </p>
        )}
      </div>
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
