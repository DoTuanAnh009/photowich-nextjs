export default function EraserIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <rect x="6" y="18" width="20" height="6" rx="2"/>
      <rect x="10" y="8" width="12" height="10" rx="2"/>
      <path d="M10 8l12 10"/>
    </svg>
  );
}
