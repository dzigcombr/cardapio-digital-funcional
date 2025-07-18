import React, { useState } from 'react';

interface Category {
  id: string;
  label: string;
  width: string;
}

interface CategoryTabsProps {
  onCategoryChange?: (categoryId: string) => void;
  className?: string;
}

const categories: Category[] = [
  { id: 'all', label: 'All', width: 'w-[75px]' },
  { id: 'combos', label: 'Combos', width: 'w-[120px]' },
  { id: 'sliders', label: 'Sliders', width: 'w-[120px]' },
  { id: 'classic', label: 'Classic', width: 'w-[110px]' },
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  onCategoryChange, 
  className = '' 
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <nav className={`flex gap-3.5 text-base text-[rgba(106,106,106,1)] font-medium whitespace-nowrap -mr-14 ${className}`} role="tablist">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`${category.width} rounded-[20px] border-none p-0`}
          role="tab"
          aria-selected={activeCategory === category.id}
          aria-label={`Filter by ${category.label}`}
        >
          <div
            className={`flex flex-col items-stretch justify-center px-2 py-4 rounded-[20px] ${
              activeCategory === category.id
                ? 'bg-[rgba(239,42,57,1)] shadow-[0px_10px_18px_-1px_rgba(0,0,0,0.25)] text-neutral-100'
                : 'bg-gray-100 text-[rgba(106,106,106,1)]'
            } ${category.id === 'combos' || category.id === 'sliders' ? 'px-3' : ''} ${category.id === 'classic' ? 'px-[11px]' : ''}`}
          >
            <span>{category.label}</span>
          </div>
        </button>
      ))}
    </nav>
  );
};
