import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bookmark, Star, MapPin, Phone, Clock,
  Filter, Search, Trash2, Share2, Edit,
  Grid, List, ChevronRight, Heart, Eye
} from 'lucide-react';

const SavedBusinesses = () => {
  const navigate = useNavigate();
  const [savedBusinesses, setSavedBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(false); // Changed to false for testing
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Mock data with proper IDs
  const mockData = [
    {
      id: '1',
      _id: 'business-1',
      businessName: 'The Coffee Corner',
      description: 'Cozy coffee shop with artisanal brews and pastries',
      category: 'Restaurant',
      rating: 4.8,
      reviews: 124,
      address: {
        street: '123 Main St',
        city: 'Delhi',
        state: 'India'
      },
      phone: '+91 98765 43210',
      hours: {
        monday: { open: '08:00', close: '21:00' }
      },
      logo: null,
      owner: 'user-123'
    },
  ];

  // Get unique categories
  const categories = ['Restaurant', 'Service', 'Health', 'Retail', 'Education', 'Entertainment'];

  useEffect(() => {
    // Load mock data immediately
    setSavedBusinesses(mockData);
    setFilteredBusinesses(mockData);
  }, []);

  useEffect(() => {
    filterBusinesses();
  }, [searchTerm, selectedCategories]);

  const filterBusinesses = () => {
    let filtered = [...mockData];
    
    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(business =>
        selectedCategories.includes(business.category)
      );
    }
    
    setFilteredBusinesses(filtered);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const removeSavedBusiness = (businessId) => {
    setSavedBusinesses(prev => prev.filter(business => business._id !== businessId));
    alert('Business removed from saved list');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };

  const shareBusiness = (business) => {
    const url = `${window.location.origin}/business/${business._id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  // Get full address
  const getFullAddress = (address) => {
    if (!address) return 'Address not specified';
    return `${address.street || ''}, ${address.city || ''}, ${address.state || ''}`.trim();
  };

  // Get today's hours
  const getTodaysHours = (hours) => {
    if (!hours) return 'Hours not specified';
    return 'Open 9 AM - 6 PM'; // Simplified for demo
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Bookmark className="text-blue-600 mr-3" size={32} fill="currentColor" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Businesses</h1>
              <p className="text-gray-600 mt-2">
                {savedBusinesses.length} saved businesses
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search saved businesses..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`px-4 py-2 ${
                    view === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 ${
                    view === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <Filter size={18} className="text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedCategories.includes(category)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredBusinesses.length} of {savedBusinesses.length} saved businesses
          </p>
        </div>

        {/* ✅ FIXED: Business Cards with WORKING Links */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <div key={business._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Business Image */}
                <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">
                    {business.businessName?.charAt(0) || 'B'}
                  </div>
                  <button
                    onClick={() => removeSavedBusiness(business._id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 text-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      {business.category}
                    </span>
                  </div>
                </div>

                {/* Business Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{business.businessName}</h3>
                    <div className="flex items-center">
                      <Heart size={18} className="text-red-500 fill-red-500 mr-1" />
                      <span className="text-gray-600 text-sm">Saved</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>

                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      <span>{getFullAddress(business.address)}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      <span>{getTodaysHours(business.hours)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-medium">{business.rating}</span>
                      <span className="text-gray-500 ml-2">({business.reviews} reviews)</span>
                    </div>
                    
                    {/* ✅ FIXED ACTION BUTTONS */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => shareBusiness(business)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition"
                        title="Share"
                      >
                        <Share2 size={20} />
                      </button>
                      
                      {/* ✅ VIEW DETAILS BUTTON - WORKING */}
                      <Link
                        to={`/business/${business._id}`}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Eye size={18} className="mr-1" />
                        View
                      </Link>
                      
                      {/* ✅ EDIT BUTTON - WORKING */}
                      <Link
                        to={`/business/${business._id}/edit`}
                        className="flex items-center text-green-600 hover:text-green-700 font-medium"
                      >
                        <Edit size={18} className="mr-1" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-6">
            {filteredBusinesses.map((business) => (
              <div key={business._id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Business Image */}
                  <div className="relative md:w-48">
                    <div className="h-48 md:h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">
                        {business.businessName?.charAt(0) || 'B'}
                      </div>
                    </div>
                    <button
                      onClick={() => removeSavedBusiness(business._id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Business Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{business.businessName}</h3>
                        <div className="flex items-center mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mr-3">
                            {business.category}
                          </span>
                          <div className="flex items-center">
                            <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="font-medium">{business.rating}</span>
                            <span className="text-gray-500 ml-1">({business.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => shareBusiness(business)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition"
                      >
                        <Share2 size={20} />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-6">{business.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center">
                        <MapPin size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{getFullAddress(business.address)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">{business.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Hours</p>
                          <p className="font-medium">{getTodaysHours(business.hours)}</p>
                        </div>
                      </div>
                    </div>

                    {/* ✅ FIXED: Action Buttons in List View */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div className="flex items-center text-green-600">
                        <Heart size={18} className="fill-current mr-2" />
                        <span className="text-sm font-medium">Saved to your collection</span>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => removeSavedBusiness(business._id)}
                          className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition"
                        >
                          Remove
                        </button>
                        
                        {/* ✅ VIEW DETAILS BUTTON */}
                        <Link
                          to={`/business/${business._id}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                        >
                          <Eye size={18} className="mr-1" />
                          View Details
                        </Link>
                        
                        {/* ✅ EDIT BUTTON */}
                        <Link
                          to={`/business/${business._id}/edit`}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center"
                        >
                          <Edit size={18} className="mr-1" />
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Test Links at Bottom */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Test Links (Click to verify):</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/business/business-1" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Test Business 1 Details
            </Link>
            <Link 
              to="/business/business-1/edit" 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Test Business 1 Edit
            </Link>
            <Link 
              to="/business/business-2" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Test Business 2 Details
            </Link>
            <Link 
              to="/business/business-2/edit" 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Test Business 2 Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedBusinesses;