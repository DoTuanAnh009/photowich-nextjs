export default function SofaIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <rect x="4" y="14" width="24" height="8" rx="3"/>
      <rect x="7" y="10" width="7" height="6" rx="2"/>
      <rect x="18" y="10" width="7" height="6" rx="2"/>
      <rect x="6" y="22" width="20" height="3" rx="1.5"/>
    </svg>
  );
}
