import React from 'react';

interface LotusLogoProps {
  className?: string;
  size?: number;
}

export const LotusLogo: React.FC<LotusLogoProps> = ({ className = '', size = 44 }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-amber-500/10 border border-amber-500/30 shadow-sm flex-shrink-0 ${className}`}
    >
      <img
        src="/images/logo.png"
        alt="Ebun D Foodie Logo"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback if image fails to render
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.parentElement) {
            target.parentElement.innerHTML = '<span class="text-xl">🍲</span>';
          }
        }}
      />
    </div>
  );
};
