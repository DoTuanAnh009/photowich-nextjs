/**
 * Footer Logo Component
 */

import Link from 'next/link';

export function FooterLogo() {
  return (
    <div className="flex flex-col gap-6 max-w-xs">
      <Link href="/" className="flex items-center gap-3">
        <div className="logo-container scale-75 origin-left">
          <div className="logo-backdrop" />
          <div className="logo-house-shape">
            <div className="logo-camera-lens">
              <div className="logo-lens-inner" />
            </div>
          </div>
        </div>
        <span className="text-white text-2xl font-bold">PhotoWitch</span>
      </Link>
      <p className="text-sm leading-relaxed text-slate-300">
        Leading specialist in Real Estate and eCommerce post-production with
        professional workflow and record delivery speeds.
      </p>

      {/* Social Media Icons */}
      <div className="flex gap-4 items-center">
        <a
          href="https://www.facebook.com/photoswitchvn/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-2 rounded-lg hover:bg-primary transition-all duration-300 group"
          aria-label="Facebook"
        >
          <svg className="size-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437h-3.066v-3.49h3.066v-2.66c0-3.025 1.792-4.697 4.542-4.697 1.316 0 2.693.235 2.693.235v2.963h-1.518c-1.493 0-1.96.93-1.96 1.88v2.279h3.34l-.534 3.49h-2.806V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
        </a>
        <a
          href="https://www.instagram.com/photoswitchvn/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-2 rounded-lg hover:bg-pink-600 transition-all duration-300 group"
          aria-label="Instagram"
        >
          <svg className="size-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
        </a>
        <a
          href="https://www.tiktok.com/@photoswitch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 p-2 rounded-lg hover:bg-slate-700 transition-all duration-300 group"
          aria-label="TikTok"
        >
          <svg className="size-5 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.776 8.776 0 0 1-1.81-1.35c-.13 3.41-.03 6.82-.04 10.23-.05 1.05-.15 2.1-.53 3.1-.4 1.06-1.13 2.01-2.13 2.6-1.06.63-2.3.91-3.52.88-1.28-.06-2.58-.45-3.62-1.25-1.05-.82-1.78-2.03-2.01-3.34-.33-1.62.06-3.37 1.13-4.65.98-1.18 2.45-1.92 3.96-2 1.41-.08 2.87.23 4.1 1.08.01-1.57.01-3.14.01-4.71-1.75-.41-3.51-.31-5.18.36-1.68.68-3.09 1.95-3.83 3.6-.57 1.1-.81 2.32-.78 3.53.03 1.22.28 2.44.82 3.5 1.17 2.27 3.59 3.66 6.07 3.6 2.41-.05 4.54-1.32 5.76-3.39.73-1.2.98-2.59.93-3.97V.02z" /></svg>
        </a>
      </div>

      {/* Contact Info Footer */}
      <div className="flex flex-col gap-3 mt-2">
        <a href="mailto:witchphoto99@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-primary transition-colors text-sm group">
          <span className="material-symbols-outlined size-5 text-primary group-hover:scale-110 transition-transform">mail</span>
          witchphoto99@gmail.com
        </a>
        <a href="https://wa.me/84388421452" className="flex items-center gap-3 text-slate-300 hover:text-[#25D366] transition-colors text-sm group">
          <svg className="size-5 fill-primary group-hover:fill-[#25D366] group-hover:scale-110 transition-all" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.222-3.666c1.603.951 3.563 1.454 5.617 1.455h.003c5.422 0 9.832-4.412 9.835-9.835.001-2.627-1.023-5.1-2.885-6.963-1.862-1.863-4.334-2.888-6.963-2.889-5.424 0-9.835 4.412-9.837 9.835-.001 2.109.668 4.167 1.932 5.867l-1.026 3.744 3.834-1.005zm10.709-7.53c-.273-.137-1.62-.8-1.871-.892-.252-.092-.435-.137-.617.137-.182.274-.707.892-.867 1.074-.16.182-.32.206-.593.069-.273-.137-1.155-.426-2.2-1.358-.812-.724-1.36-1.618-1.52-1.892-.16-.274-.017-.422.12-.559.123-.122.273-.32.41-.48.137-.16.183-.274.274-.457.091-.183.046-.343-.023-.48-.069-.137-.617-1.486-.845-2.035-.221-.531-.462-.459-.617-.466l-.526-.008c-.183 0-.48.069-.731.343-.251.274-.959.937-.959 2.286 0 1.348.982 2.651 1.119 2.835.137.183 1.933 2.951 4.682 4.138.654.282 1.165.451 1.563.578.658.209 1.258.179 1.732.109.529-.078 1.62-.663 1.85-.303.229-.64.229-1.188.16-.134-.07-.133-.271-.27-.409-.137-.138-.409-.274-.682z" /></svg>
          (+84)388421452
        </a>
      </div>
    </div>
  );
}
