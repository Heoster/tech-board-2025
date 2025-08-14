import React from 'react';

interface TechBoardLogoSVGProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

const TechBoardLogoSVG: React.FC<TechBoardLogoSVGProps> = ({
  className = '',
  width = 120,
  height = 60,
  colors = {
    primary: '#E67914',
    secondary: '#F4C005',
    accent: '#3A3633'
  }
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      {/* Main circular background */}
      <circle
        cx="256"
        cy="140"
        r="120"
        fill={colors.primary}
        opacity="0.9"
      />

      {/* Secondary circle */}
      <circle
        cx="256"
        cy="140"
        r="90"
        fill={colors.secondary}
        opacity="0.8"
      />

      {/* Tech Board Text */}
      <text
        x="256"
        y="130"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill={colors.accent}
        fontFamily="Arial, sans-serif"
      >
        TECH
      </text>

      <text
        x="256"
        y="155"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill={colors.accent}
        fontFamily="Arial, sans-serif"
      >
        BOARD
      </text>

      {/* Decorative elements */}
      <circle cx="200" cy="100" r="8" fill={colors.accent} opacity="0.6" />
      <circle cx="312" cy="100" r="8" fill={colors.accent} opacity="0.6" />
      <circle cx="200" cy="180" r="8" fill={colors.accent} opacity="0.6" />
      <circle cx="312" cy="180" r="8" fill={colors.accent} opacity="0.6" />

      {/* Central star/gear element */}
      <polygon
        points="256,120 260,130 270,130 262,138 266,148 256,142 246,148 250,138 242,130 252,130"
        fill={colors.accent}
        opacity="0.8"
      />
    </svg>
  );
};

export default TechBoardLogoSVG;