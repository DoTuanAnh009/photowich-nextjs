export default function Image360Icon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" fill="none" viewBox="0 0 32 32" stroke="#1a365d" strokeWidth="2">
      <ellipse cx="16" cy="24" rx="10" ry="4"/>
      <rect x="6" y="8" width="20" height="12" rx="4"/>
      <text x="16" y="20" textAnchor="middle" fontSize="8" fill="#1a365d">360°</text>
    </svg>
  );
}
