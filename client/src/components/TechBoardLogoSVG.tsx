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
    primary: '#4a7c59',
    secondary: '#ffffff',
    accent: '#1e3a5f'
  }
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 400 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      {/* Graduation Cap */}
      <g transform="translate(200, 80)">
        {/* Main cap hexagon */}
        <path 
          d="M-60,-30 L-30,-50 L30,-50 L60,-30 L60,30 L30,50 L-30,50 L-60,30 Z" 
          fill={colors.primary}
        />
        
        {/* Tassel */}
        <g transform="translate(63, -25)">
          <rect x="0" y="0" width="6" height="45" rx="3" fill={colors.secondary}/>
          <ellipse cx="3" cy="48" rx="9" ry="6" fill={colors.secondary}/>
        </g>
        
        {/* Circuit board pattern inside cap */}
        <g fill="none" stroke={colors.secondary} strokeWidth="4" strokeLinecap="round">
          {/* Horizontal lines */}
          <line x1="-37" y1="-15" x2="-7" y2="-15"/>
          <line x1="7" y1="-15" x2="37" y2="-15"/>
          <line x1="-37" y1="0" x2="-7" y2="0"/>
          <line x1="7" y1="0" x2="37" y2="0"/>
          <line x1="-22" y1="15" x2="22" y2="15"/>
          
          {/* Vertical connections */}
          <line x1="-22" y1="-15" x2="-22" y2="0"/>
          <line x1="22" y1="-15" x2="22" y2="0"/>
          <line x1="0" y1="0" x2="0" y2="15"/>
        </g>
        
        {/* Circuit nodes */}
        <g fill={colors.secondary}>
          <circle cx="-37" cy="-15" r="4"/>
          <circle cx="-7" cy="-15" r="4"/>
          <circle cx="7" cy="-15" r="4"/>
          <circle cx="37" cy="-15" r="4"/>
          <circle cx="-37" cy="0" r="4"/>
          <circle cx="-7" cy="0" r="4"/>
          <circle cx="7" cy="0" r="4"/>
          <circle cx="37" cy="0" r="4"/>
          <circle cx="-22" cy="15" r="4"/>
          <circle cx="0" cy="15" r="4"/>
          <circle cx="22" cy="15" r="4"/>
        </g>
      </g>

      {/* Tech Board Text */}
      <text
        x="200"
        y="160"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill={colors.accent}
        fontFamily="Arial, sans-serif"
      >
        Tech Board
      </text>
    </svg>
  );
};

export default TechBoardLogoSVG;