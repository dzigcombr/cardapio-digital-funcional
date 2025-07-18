import React from 'react';

interface FoodDisplayProps {
  selectedCategory?: string;
  searchQuery?: string;
  className?: string;
}

export const FoodDisplay: React.FC<FoodDisplayProps> = ({ 
  selectedCategory = 'all', 
  searchQuery = '', 
  className = '' 
}) => {
  return (
    <main className={`${className}`} role="main">
      <section aria-label="Featured food items">
        <img
          src="https://api.builder.io/api/v1/image/assets/46e4896b41454ef4b14a371cd3a4a983/7083539cd6d179e1aaeec348b15f1ad4d0cc1cb7?placeholderIfAbsent=true"
          alt="Featured food items and menu"
          className="aspect-[0.81] object-contain w-full rounded-[0px_0px_0px_0px]"
        />
      </section>
    </main>
  );
};
