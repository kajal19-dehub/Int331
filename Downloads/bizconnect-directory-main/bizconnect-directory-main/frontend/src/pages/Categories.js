import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, MapPin, Star } from 'lucide-react';
import { businessCategories, popularCategories } from '../data/categories';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSubcategories, setShowSubcategories] = useState(false);

  // Filter categories based on search
  const filteredCategories = businessCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get featured businesses for selected category
  const getFeaturedBusinesses = (categoryId) => {
    const mockBusinesses = {
      restaurant: [
        { id: 1, name: 'The Italian Kitchen', rating: 4.8, reviews: 245, distance: '0.5 mi' },
        { id: 2, name: 'Sushi Master', rating: 4.9, reviews: 189, distance: '1.2 mi' },
        { id: 3, name: 'Burger Palace', rating: 4.5, reviews: 156, distance: '0.8 mi' }
      ],
      retail: [
        { id: 4, name: 'Fashion Mall', rating: 4.7, reviews: 312, distance: '2.1 mi' },
        { id: 5, name: 'Tech Store', rating: 4.6, reviews: 98, distance: '3.4 mi' }
      ],
      // Add more mock data as needed
    };
    return mockBusinesses[categoryId] || [];
  };

  const totalBusinesses = businessCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="text-white relative"
        style={{
          backgroundImage: 'url(/bg3.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Browse Businesses by Category</h1>
            <p className="text-xl mb-8">
              Discover {totalBusinesses.toLocaleString()} businesses across {businessCategories.length} categories
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl"></div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search categories or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{totalBusinesses.toLocaleString()}</div>
            <div className="text-gray-600">Total Businesses</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{businessCategories.length}</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">156</div>
            <div className="text-gray-600">Cities</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600">4.8</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Most Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map(catId => {
              const category = businessCategories.find(c => c.id === catId);
              if (!category) return null;
              
              return (
                <Link
                  key={category.id}
                  to={`/businesses?category=${category.id}`}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} listings</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
              <div className="text-gray-600">
                Showing {filteredCategories.length} of {businessCategories.length} categories
              </div>
            </div>

            <div className="space-y-4">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{category.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                <Link to={`/businesses?category=${category.id}`} className="hover:text-blue-600">
                                  {category.name}
                                </Link>
                              </h3>
                              <p className="text-gray-600 mt-1">{category.description}</p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                              {category.count} listings
                            </span>
                          </div>
                          
                          {/* Subcategories */}
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                              {category.subcategories.slice(0, 5).map((sub, index) => (
                                <Link
                                  key={index}
                                  to={`/businesses?search=${encodeURIComponent(sub)}`}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition"
                                >
                                  {sub}
                                </Link>
                              ))}
                              {category.subcategories.length > 5 && (
                                <button
                                  onClick={() => setShowSubcategories(!showSubcategories)}
                                  className="px-3 py-1 text-blue-600 text-sm hover:underline"
                                >
                                  +{category.subcategories.length - 5} more
                                </button>
                              )}
                            </div>
                            
                            {/* Expanded subcategories */}
                            {showSubcategories && (
                              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                                {category.subcategories.slice(5).map((sub, index) => (
                                  <Link
                                    key={index}
                                    to={`/businesses?search=${encodeURIComponent(sub)}`}
                                    className="px-3 py-2 bg-gray-50 text-gray-600 text-sm rounded-lg hover:bg-gray-100 transition"
                                  >
                                    {sub}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* Quick Actions */}
                          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                            <div className="flex space-x-3">
                              <Link
                                to={`/businesses?category=${category.id}&sort=rating`}
                                className="flex items-center text-blue-600 hover:text-blue-700"
                              >
                                <Star size={16} className="mr-1" />
                                Top Rated
                              </Link>
                              <Link
                                to={`/businesses?category=${category.id}&sort=newest`}
                                className="flex items-center text-gray-600 hover:text-gray-700"
                              >
                                <Filter size={16} className="mr-1" />
                                Newest
                              </Link>
                            </div>
                            <Link
                              to={`/businesses?category=${category.id}`}
                              className="flex items-center text-blue-600 font-medium hover:text-blue-700"
                            >
                              Explore All
                              <ChevronRight size={20} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Top Categories</h3>
              <div className="space-y-3">
                {businessCategories
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((category, index) => (
                    <Link
                      key={category.id}
                      to={`/businesses?category=${category.id}`}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900">{category.name}</p>
                          <p className="text-sm text-gray-500">{category.count} listings</p>
                        </div>
                      </div>
                      <div className="text-gray-400">#{index + 1}</div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Quick Search */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Can't Find What You Need?</h3>
              <p className="mb-6">Search across all categories and services</p>
              <Link
                to="/businesses"
                className="block w-full text-center bg-white text-blue-600 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Advanced Search
              </Link>
            </div>

            {/* Business Listing CTA */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">List Your Business</h3>
              <p className="text-gray-600 mb-6">
                Get discovered by thousands of customers searching in your category
              </p>
              <Link
                to="/business/create"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Add Your Business
              </Link>
            </div>

            {/* Category Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Category Statistics</h3>
              <div className="space-y-4">
                {businessCategories
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 3)
                  .map(category => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{category.name}</span>
                        <span className="text-sm font-medium">{category.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(category.count / totalBusinesses) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;