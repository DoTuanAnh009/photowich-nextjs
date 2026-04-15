
interface SiteLogoProps {
  size?: number;
  lensColor?: string;
  className?: string;
  showBackground?: boolean;
  textColor?: string;
  iconColor?: string;
}

/**
 * SiteLogo Component (Master)
 * 
 * Supports flexible color control for icons and text.
 */
export function SiteLogoHeader({
  size = 44,
  lensColor = "#2094f3", // Brand Blue
  className = "",
  showBackground = true,
  textColor = "currentColor",
  iconColor = "currentColor",
}: SiteLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Graphical Icon Part - Scaled down for elegance */}
      <g transform="translate(50, 70) scale(0.85) translate(-50, -70)">
        {/* Semi-circle background (Sunrise shape) - Brand Orange */}
        {showBackground && (
          <path
            d="M 10,70 A 40,40 0 0 1 90,70 L 10,70 Z"
            fill="#f5a623"
          />
        )}

        {/* Viewfinder Corners */}
        <path
          d="M 22,58 V 50 H 30"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 70,50 H 78 V 58"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Small recording dot */}
        <circle cx="75" cy="53" r="1.2" fill={iconColor} />

        {/* House shape - Aligned to base y=70, wider profile */}
        <path
          d="M 32,70 V 54 L 50,44 L 68,54 V 70 Z"
          fill={iconColor}
        />

        {/* Camera Aperture / Lens - Centered in house */}
        <g transform="translate(50, 59)">
          <path
            d="M-5.2,-9 L5.2,-9 L10.4,0 L5.2,9 L-5.2,9 L-10.4,0 Z"
            fill="none"
          />
          {/* Aperture segments */}
          <path d="M-9,0 L-4.5,-7.8 L4.5,-7.8 L-4.5,0 Z" fill={lensColor} />
          <path d="M-9,0 L-4.5,7.8 L-9,0 L-4.5,7.8 L4.5,7.8 L-4.5,0 Z" fill={lensColor} transform="rotate(180)" />
          
          <path d="M-9,0 L-4.5,-7.8 L4.5,-7.8 L-4.5,0 Z" fill={lensColor} transform="rotate(60)" />
          <path d="M-9,0 L-4.5,-7.8 L4.5,-7.8 L-4.5,0 Z" fill={lensColor} transform="rotate(120)" />
          <path d="M-9,0 L-4.5,-7.8 L4.5,-7.8 L-4.5,0 Z" fill={lensColor} transform="rotate(240)" />
          <path d="M-9,0 L-4.5,-7.8 L4.5,-7.8 L-4.5,0 Z" fill={lensColor} transform="rotate(300)" />
          
          {/* Center small hexagon gap */}
          <path
            d="M-2.6,-4.5 L2.6,-4.5 L5.2,0 L2.6,4.5 L-2.6,4.5 L-5.2,0 Z"
            fill={iconColor}
          />
        </g>
      </g>

      {/* Brand Name - Bold Impact Style */}
      <text
        x="50"
        y="95"
        textAnchor="middle"
        fill={textColor}
        style={{
          fontSize: '20px',
          fontWeight: '1000',
          fontFamily: '"Arial Black", Arial, sans-serif',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase'
        }}
      >
        PHOTOWICH
      </text>

      {/* Slogan */}
      <text
        x="50"
        y="108"
        textAnchor="middle"
        fill={textColor}
        style={{
          fontSize: '6px',
          fontWeight: '900',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}
      >
        PROFESSIONAL PHOTO EDITING
      </text>
    </svg>
  );
}
