export default function MarketingIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <rect x="8" y="8" width="16" height="16" rx="4"/>
      <path d="M16 12v8M12 16h8" stroke="#1a365d" strokeWidth="2"/>
    </svg>
  );
}
