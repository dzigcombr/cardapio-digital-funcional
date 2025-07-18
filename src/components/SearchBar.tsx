import React, { useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onFilterClick, 
  className = '' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className={`flex items-stretch gap-[13px] text-lg text-[rgba(60,47,47,1)] font-medium whitespace-nowrap ${className}`}>
      <form onSubmit={handleSubmit} className="bg-white shadow-[0px_4px_19px_rgba(0,0,0,0.15)] flex flex-col justify-center grow shrink-0 basis-0 w-fit px-[68px] py-5 rounded-[20px]">
        <input
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search"
          className="bg-transparent outline-none border-none text-[rgba(60,47,47,1)] placeholder:text-[rgba(60,47,47,1)]"
          aria-label="Search for food items"
        />
      </form>
      <button
        type="button"
        onClick={onFilterClick}
        className="aspect-[1] w-[60px] shrink-0 rounded-[0px_0px_0px_0px] border-none bg-transparent p-0"
        aria-label="Open filter options"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/46e4896b41454ef4b14a371cd3a4a983/af60e931f3e5adf4c4f78f878327f3a1ee98fa4f?placeholderIfAbsent=true"
          alt="Filter"
          className="aspect-[1] object-contain w-full h-full rounded-[0px_0px_0px_0px]"
        />
      </button>
    </div>
  );
};
