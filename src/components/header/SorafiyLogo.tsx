import React from 'react';

interface SorafiyLogoProps {
  size?: number;
  className?: string;
}

const SorafiyLogo: React.FC<SorafiyLogoProps> = ({ 
  size = 24, 
  className = "" 
}) => {
  return (
    <div 
      className={`flex items-center justify-center rounded-full bg-primary/10 text-primary ${className}`}
      style={{ 
        width: size, 
        height: size, 
        fontSize: size * 0.5 
      }}
    >
      <div className="arabic-text font-bold" style={{ lineHeight: 1 }}>س</div>
    </div>
  );
};

export default SorafiyLogo;