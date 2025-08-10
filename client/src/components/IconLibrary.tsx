import React from 'react';

// This component serves as a placeholder for the icon library
// The actual icons are exported from utils/icons.ts to maintain Fast Refresh compatibility
const IconLibrary: React.FC = () => {
  return (
    <div className="hidden">
      <p>Icon Library - Icons are available through utils/icons.ts</p>
    </div>
  );
};

export default IconLibrary;