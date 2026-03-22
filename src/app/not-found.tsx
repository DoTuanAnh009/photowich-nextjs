import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background-light dark:bg-background-dark font-display text-navy-brand transition-colors duration-300 min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto">
      {/* Hero Image Section (Missing Element Effect) */}
      <div className="w-full py-3">
        <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3] shadow-lg">
          {/* Background blurred real estate interior */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover filter blur-[2px]"
            aria-label="Blurred professional real estate interior photo"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFcruhlztvDp2pCd6vcv3HaP7ypD6WjuDWU0rL830YmvZ-3L5xiWAgxM1fJ7y-dows_HdqNmzdh6hO-pj3kLGu9LIJThpXWSVKOZGcL7VOFSFKowyNeDkDWVXR9ate-1xvmds0qvPOINELBtUMRonKmnqbxZfFSMkk2eWtmdUk55EOyevie7rQonx2BCjCkunafrPJz-u-vUGee4dsPmx-N4HRVB6nWCwLemTwosILt4XepOxr8DjH4PLcMQoeoDHEpoOym31V94Gk")',
            }}
          ></div>
          {/* Overlay with "Missing Element" ghost effect */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-32 h-32 border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white/40 text-5xl">image_not_supported</span>
            </div>
          </div>
          {/* Subtle brand gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/40 to-transparent"></div>
        </div>
      </div>
      {/* 404 Headline */}
      <h1 className="text-navy-brand dark:text-white tracking-tighter text-[84px] font-extrabold leading-none pt-8 pb-2">404</h1>
      {/* Message Title */}
      <h2 className="text-navy-brand dark:text-white text-xl font-bold leading-tight tracking-tight text-center px-2 pb-2">
        Oops! This page has been retouched out of existence.
      </h2>
      {/* Message Body */}
      <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-relaxed text-center px-6 pb-10">
        The link might be broken or the page moved. Our editors are great, but even they can't find this one.
      </p>
      {/* CTA Buttons */}
      <div className="w-full flex flex-col gap-3 px-4">
        <Link href="/" legacyBehavior>
          <a className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98] text-center">
            RETURN TO HOMEPAGE
          </a>
        </Link>
        <Link href="/contact" legacyBehavior>
          <a className="w-full bg-transparent border-2 border-navy-brand/10 dark:border-white/10 text-navy-brand dark:text-white font-bold py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-[0.98] text-center">
            CONTACT SUPPORT
          </a>
        </Link>
      </div>
      {/* Simple Footer */}
      <footer className="mt-auto py-8 border-t border-gray-100 dark:border-gray-800 w-full">
        <div className="flex justify-center gap-6 mb-4">
          <a className="text-gray-400 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">camera</span>
          </a>
          <a className="text-gray-400 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">palette</span>
          </a>
          <a className="text-gray-400 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined text-xl">share</span>
          </a>
        </div>
        <p className="text-center text-gray-400 text-xs font-medium tracking-wide">
          © 2026 PHOTOWITCH EDITING SERVICES
        </p>
      </footer>
    </main>
  );
}
