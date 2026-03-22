import type { BlogHero, BlogCategory } from '@/types/blog';

export function HeroSlideService(hero: BlogHero) {
  // Get background image url
  const bgUrl = hero.featured_image?.url
    ? process.env.NEXT_PUBLIC_STRAPI_URL
      ? process.env.NEXT_PUBLIC_STRAPI_URL.replace(/\/$/, '') + hero.featured_image.url
      : hero.featured_image.url
    : undefined;

  // Split title into array of chars, preserving spaces
  const chars = (hero.title || 'Blogs').split(/(\s+)/);
  const descDelay = chars.length * 50 + 200;

  return (
    <section
      className="relative w-full h-[400px] md:h-[420px] lg:h-[480px] overflow-hidden"
      style={bgUrl ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)),url('${bgUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: '#1a365d' }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight flex flex-wrap justify-center gap-x-1 gap-y-2 select-none">
          {chars.map((char, i) => (
            <span
              key={i}
              className={char === ' ' ? 'inline-block w-2 md:w-3' : ''}
              style={{
                opacity: 0,
                animation: `fadeInChar 0.5s cubic-bezier(0.4,0,0.2,1) forwards`,
                animationDelay: `${i * 50}ms`,
                transition: 'opacity 0.2s',
              }}
            >
              {char}
            </span>
          ))}
        </h2>
        {/* Category buttons nếu có */}
        {hero.excerpt && (
          <p
            className="text-white/90 text-lg max-w-2xl font-light leading-relaxed mt-2 opacity-0 animate-fadein-desc"
            style={{ animationDelay: `${descDelay}ms`, animationFillMode: 'forwards' }}
          >
            {hero.excerpt}
          </p>
        )}
        <a
          href="/bulk-order"
          className="inline-block mt-6 px-6 py-2 pointer-events-auto rounded-lg bg-primary text-white font-semibold shadow transition-all duration-300 ease-in-out transform hover:bg-orange hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 text-base"
          style={{ opacity: 0, animation: `fadein-desc 0.6s cubic-bezier(0.4,0,0.2,1) forwards`, animationDelay: `${descDelay + 400}ms`, animationFillMode: 'forwards' }}
        >
          Place Order
        </a>
      </div>
      {/* Overlay để đảm bảo text nổi bật */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
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
