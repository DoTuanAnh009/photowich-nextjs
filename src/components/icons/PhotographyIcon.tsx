export default function PhotographyIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <rect x="5" y="10" width="22" height="14" rx="3"/>
      <circle cx="16" cy="17" r="4"/>
      <rect x="12" y="7" width="8" height="4" rx="1"/>
    </svg>
  );
}
