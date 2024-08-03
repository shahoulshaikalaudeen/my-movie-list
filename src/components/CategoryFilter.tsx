import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (categoryId: number) => void;
  allSelected: boolean;
  onAllToggle: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategories, onCategoryChange, allSelected, onAllToggle }) => {
  
  const handleCategoryChange = (categoryId: number) => {
    if (allSelected) {
      onAllToggle(); // Uncheck "All" if a specific category is selected
    }
    onCategoryChange(categoryId);
  };

  return (
    <div className="mb-6">
      <label className="block text-lg font-semibold mb-2 text-gray-700">Filter by Category:</label>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="category-all"
            checked={allSelected}
            onChange={onAllToggle}
            className="form-checkbox text-blue-500"
          />
          <label htmlFor="category-all" className="ml-2 text-sm text-gray-800">All</label>
        </div>
        {categories.map(category => (
          <div key={category.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="form-checkbox text-blue-500"
            />
            <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-800">{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
