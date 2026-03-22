export default function VideographyIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <rect x="6" y="8" width="16" height="16" rx="3"/>
      <polygon points="24,12 30,16 24,20" fill="#1a365d"/>
    </svg>
  );
}
