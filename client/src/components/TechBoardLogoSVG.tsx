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
      {/* Background for better visibility */}
      <rect width="400" height="200" fill="#f8f9fa" rx="10"/>
      
      {/* Graduation Cap */}
      <g transform="translate(200, 85)">
        {/* Cap shadow for depth */}
        <path 
          d="M-55,-25 L-25,-45 L35,-45 L65,-25 L65,35 L35,55 L-25,55 L-55,35 Z" 
          fill="#3a6249" opacity="0.3" transform="translate(3, 3)"
        />
        
        {/* Main cap hexagon */}
        <path 
          d="M-55,-25 L-25,-45 L35,-45 L65,-25 L65,35 L35,55 L-25,55 L-55,35 Z" 
          fill={colors.primary}
        />
        
        {/* Cap border highlight */}
        <path 
          d="M-55,-25 L-25,-45 L35,-45 L65,-25 L65,35 L35,55 L-25,55 L-55,35 Z" 
          fill="none" stroke={colors.secondary} strokeWidth="2" opacity="0.6"
        />
        
        {/* Tassel */}
        <g transform="translate(68, -20)">
          <rect x="0" y="0" width="5" height="50" rx="2.5" fill={colors.secondary}/>
          <ellipse cx="2.5" cy="55" rx="12" ry="8" fill={colors.secondary}/>
          {/* Tassel strands */}
          <g fill={colors.secondary} opacity="0.8">
            <rect x="-3" y="50" width="1.5" height="12" rx="0.75"/>
            <rect x="0" y="52" width="1.5" height="10" rx="0.75"/>
            <rect x="3" y="51" width="1.5" height="11" rx="0.75"/>
            <rect x="6" y="50" width="1.5" height="12" rx="0.75"/>
          </g>
        </g>
        
        {/* Circuit board pattern inside cap */}
        <g fill="none" stroke={colors.secondary} strokeWidth="3.5" strokeLinecap="round">
          {/* Main horizontal lines */}
          <line x1="-35" y1="-12" x2="-5" y2="-12"/>
          <line x1="5" y1="-12" x2="35" y2="-12"/>
          <line x1="-35" y1="5" x2="-5" y2="5"/>
          <line x1="5" y1="5" x2="35" y2="5"/>
          <line x1="-20" y1="22" x2="20" y2="22"/>
          
          {/* Vertical connections */}
          <line x1="-20" y1="-12" x2="-20" y2="5"/>
          <line x1="20" y1="-12" x2="20" y2="5"/>
          <line x1="0" y1="5" x2="0" y2="22"/>
          
          {/* Connecting bridges */}
          <line x1="-5" y1="-12" x2="5" y2="-12"/>
          <line x1="-5" y1="5" x2="5" y2="5"/>
        </g>
        
        {/* Circuit nodes */}
        <g fill={colors.secondary}>
          <circle cx="-35" cy="-12" r="4"/>
          <circle cx="-5" cy="-12" r="4"/>
          <circle cx="5" cy="-12" r="4"/>
          <circle cx="35" cy="-12" r="4"/>
          <circle cx="-35" cy="5" r="4"/>
          <circle cx="-5" cy="5" r="4"/>
          <circle cx="5" cy="5" r="4"/>
          <circle cx="35" cy="5" r="4"/>
          <circle cx="-20" cy="22" r="4"/>
          <circle cx="0" cy="22" r="4"/>
          <circle cx="20" cy="22" r="4"/>
        </g>
      </g>

      {/* Tech Board Text */}
      <text
        x="200"
        y="170"
        textAnchor="middle"
        fontSize="28"
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