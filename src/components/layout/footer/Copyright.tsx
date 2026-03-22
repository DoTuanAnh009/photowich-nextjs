/**
 * Copyright Component
 */

export function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-white/10 pt-8 flex flex-col gap-4 items-center">
      <p className="text-xs text-slate-500">
        © {currentYear} PhotoWitch Service. All rights reserved.
      </p>
    </div>
  );
}
