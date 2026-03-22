export default function SunIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <circle cx="16" cy="16" r="6"/>
      <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6.93 6.93l2.83 2.83M22.24 22.24l2.83 2.83M6.93 25.07l2.83-2.83M22.24 9.76l2.83-2.83"/>
    </svg>
  );
}
