"use client";

import React from "react";

export default function SocialActionButtons({ postTitle }: { postTitle: string }) {
  return (
    <div className="flex gap-4 mb-2 justify-center">
      {/* Share */}
      <button
        type="button"
        aria-label="Share"
        onClick={async () => {
          if (navigator.share) {
            await navigator.share({
              title: postTitle,
              url: window.location.href,
            });
          } else {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied!");
          }
        }}
        className="size-10 rounded-full bg-[#4285F4] flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-xl">share</span>
      </button>
      {/* Save/Read Later */}
      <button
        type="button"
        aria-label="Save for later"
        onClick={() => alert("Coming soon!")}
        className="size-10 rounded-full bg-[#22C7FA] flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-xl">hourglass_empty</span>
      </button>
      {/* Email */}
      <button
        type="button"
        aria-label="Send by email"
        className="size-10 rounded-full bg-[#22C55E] flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
        onClick={() => {
          if (typeof window !== "undefined") {
            const subject = encodeURIComponent(postTitle);
            const body = encodeURIComponent(window.location.href);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
          }
        }}
      >
        <span className="material-symbols-outlined text-xl">mail</span>
      </button>
    </div>
  );
}
