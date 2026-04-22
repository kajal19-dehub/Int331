import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { businessCategories } from '../data/categories';
import api from '../utils/api'; 

const Home = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchFeaturedBusinesses();
  }, []);

  const fetchFeaturedBusinesses = async () => {
    try {
      const response = await api.get('/businesses?isFeatured=true&limit=6');
      setFeaturedBusinesses(response.data.businesses);
    } catch (error) {
      console.error('Error fetching featured businesses:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm || location) {
      window.location.href = `/businesses?search=${searchTerm}&city=${location}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="text-white relative"
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Discover the Best Local Businesses
            </h1>
            <p className="text-xl mb-8">
              Find trusted services, read reviews, and connect with businesses in your community
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center">
                <Search className="text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="flex-1 p-3 outline-none text-gray-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center">
                <MapPin className="text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="City, State, or ZIP"
                  className="flex-1 p-3 outline-none text-gray-800"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {businessCategories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              to={`/businesses?category=${category.id}`}
              className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.count} listings</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/categories"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
          >
            View All Categories
            <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
      </div>

      {/* Featured Businesses */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Businesses</h2>
            <Link to="/businesses" className="text-blue-600 font-semibold hover:text-blue-700">
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <div key={business._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {business.images?.[0] && (
                  <img
                    src={business.images[0].url}
                    alt={business.businessName}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{business.businessName}</h3>
                    <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      <Star size={16} className="mr-1" />
                      <span>{business.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={18} className="mr-2" />
                    <span>{business.address?.city}, {business.address?.state}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold px-3 py-1 bg-gray-100 rounded-full">
                      {business.category}
                    </span>
                    <Link
                      to={`/business/${business._id}`}
                      className="text-blue-600 font-semibold hover:text-blue-700"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1,000+</div>
            <div className="text-gray-600">Businesses Listed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">25,000+</div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">Cities Covered</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="text-white py-16 relative"
        style={{
          backgroundImage: 'url(/bg2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Are You a Business Owner?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            List your business for free, reach more customers, and grow your business with our platform
          </p>
          <Link
            to="/business/create"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
          >
            List Your Business
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;