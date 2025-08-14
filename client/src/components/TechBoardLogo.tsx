const TechBoardLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        {`.cap-main { fill: #4a7c59; }
         .cap-highlight { fill: #ffffff; }
         .circuit-lines { fill: none; stroke: #ffffff; stroke-width: 3; stroke-linecap: round; }
         .circuit-nodes { fill: #ffffff; }`}
      </style>
    </defs>
    
    {/* Graduation Cap */}
    <g transform="translate(100, 80)">
      {/* Main cap hexagon */}
      <path d="M-40,-20 L-20,-35 L20,-35 L40,-20 L40,20 L20,35 L-20,35 L-40,20 Z" className="cap-main"/>
      
      {/* Tassel */}
      <g transform="translate(42, -17)">
        <rect x="0" y="0" width="4" height="30" rx="2" className="cap-highlight"/>
        <ellipse cx="2" cy="32" rx="6" ry="4" className="cap-highlight"/>
      </g>
      
      {/* Circuit board pattern inside cap */}
      <g className="circuit-lines">
        {/* Horizontal lines */}
        <line x1="-25" y1="-10" x2="-5" y2="-10"/>
        <line x1="5" y1="-10" x2="25" y2="-10"/>
        <line x1="-25" y1="0" x2="-5" y2="0"/>
        <line x1="5" y1="0" x2="25" y2="0"/>
        <line x1="-15" y1="10" x2="15" y2="10"/>
        
        {/* Vertical connections */}
        <line x1="-15" y1="-10" x2="-15" y2="0"/>
        <line x1="15" y1="-10" x2="15" y2="0"/>
        <line x1="0" y1="0" x2="0" y2="10"/>
      </g>
      
      {/* Circuit nodes */}
      <g className="circuit-nodes">
        <circle cx="-25" cy="-10" r="3"/>
        <circle cx="-5" cy="-10" r="3"/>
        <circle cx="5" cy="-10" r="3"/>
        <circle cx="25" cy="-10" r="3"/>
        <circle cx="-25" cy="0" r="3"/>
        <circle cx="-5" cy="0" r="3"/>
        <circle cx="5" cy="0" r="3"/>
        <circle cx="25" cy="0" r="3"/>
        <circle cx="-15" cy="10" r="3"/>
        <circle cx="0" cy="10" r="3"/>
        <circle cx="15" cy="10" r="3"/>
      </g>
    </g>
    
    {/* Tech Board Text */}
    <text x="100" y="140" textAnchor="middle" fill="#1e3a5f" style={{fontFamily: 'Arial, sans-serif', fontSize: '16px', fontWeight: 'bold'}}>
      Tech Board
    </text>
  </svg>
);

export default TechBoardLogo;