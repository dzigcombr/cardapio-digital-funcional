import React from 'react';

interface BottomNavigationProps {
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ className = '' }) => {
  return (
    <nav className={`${className}`} role="navigation" aria-label="Bottom navigation">
      <img
        src="https://api.builder.io/api/v1/image/assets/46e4896b41454ef4b14a371cd3a4a983/a6d5d5e536ef471621896536e87bfe0f7e6f30ef?placeholderIfAbsent=true"
        alt="Navigation menu"
        className="aspect-[5.65] object-contain w-full"
      />
    </nav>
  );
};
