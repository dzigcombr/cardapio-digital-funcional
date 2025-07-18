import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryTabs } from '@/components/CategoryTabs';
import { FoodDisplay } from '@/components/FoodDisplay';
import { BottomNavigation } from '@/components/BottomNavigation';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterClick = () => {
    // Handle filter functionality
    console.log('Filter clicked');
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="bg-white max-w-[480px] w-full overflow-hidden mx-auto pt-7 rounded-[35px] min-h-screen">
      <div className="flex w-full flex-col pl-[19px]">
        <Header />
        
        <SearchBar 
          onSearch={handleSearch}
          onFilterClick={handleFilterClick}
          className="mt-[47px]"
        />
        
        <CategoryTabs 
          onCategoryChange={handleCategoryChange}
          className="mt-[41px]"
        />
        
        <FoodDisplay 
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          className="mt-[41px]"
        />
      </div>
      
      <BottomNavigation className="mt-5" />
    </div>
  );
};

export default Index;
