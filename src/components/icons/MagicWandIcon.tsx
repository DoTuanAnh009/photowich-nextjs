export default function MagicWandIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <path d="M8 8l16 16" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2" fill="#1a365d"/>
      <circle cx="24" cy="24" r="2" fill="#1a365d"/>
      <path d="M4 4l2 2M26 26l2 2" strokeLinecap="round"/>
    </svg>
  );
}
