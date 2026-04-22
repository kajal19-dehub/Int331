import React from 'react';
import { Link } from 'react-router-dom';
import { businessCategories } from '../../data/categories';

const CategoryFilter = ({ selectedCategory = '' }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Filter by Category</h3>
      <div className="space-y-2">
        <Link
          to="/businesses"
          className={`flex items-center p-3 rounded-lg transition ${
            !selectedCategory
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
            <span>🏢</span>
          </div>
          <span className="font-medium">All Categories</span>
        </Link>
        
        {businessCategories.map((category) => (
          <Link
            key={category.id}
            to={`/businesses?category=${category.id}`}
            className={`flex items-center p-3 rounded-lg transition ${
              selectedCategory === category.id
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
              <span>{category.icon}</span>
            </div>
            <div className="flex-1">
              <span className="font-medium">{category.name}</span>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.subcategories.slice(0, 2).join(', ')}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {category.count}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;