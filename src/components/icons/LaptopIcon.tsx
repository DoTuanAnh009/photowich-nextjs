export default function LaptopIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <rect x="6" y="10" width="20" height="10" rx="2"/>
      <rect x="2" y="22" width="28" height="4" rx="2"/>
      <circle cx="16" cy="17" r="1.5"/>
    </svg>
  );
}
