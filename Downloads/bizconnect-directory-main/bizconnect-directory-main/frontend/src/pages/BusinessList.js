import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Search, Filter, MapPin, Phone, Mail, Globe,
  Star, Clock, ChevronRight, Building2, Tag,
  CheckCircle, XCircle, Calendar, Users
} from 'lucide-react';
import api from '../utils/api'; // Changed from '../../utils/api'

const BusinessList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const categories = [
    'All', 'Restaurant', 'Retail', 'Service', 'Health', 'Education', 'Entertainment', 'Other'
  ];

  const statusOptions = [
    'All', 'Active', 'Pending', 'Inactive'
  ];

  // Fetch businesses on component mount
  useEffect(() => {
    fetchBusinesses();
  }, []);

  // Show success message if redirected from create business
  useEffect(() => {
    if (location.state?.showSuccess) {
      setSuccessMessage(`Business "${location.state.businessName}" created successfully!`);
      
      // Clear message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
        navigate('/businesses', { replace: true, state: {} });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Try to fetch from API first
      const response = await api.get('/businesses', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      console.log('Fetched businesses:', response.data);
      
      // Handle different response structures
      const businessesData = response.data.businesses || response.data || [];
      setBusinesses(businessesData);
      setFilteredBusinesses(businessesData);
      
    } catch (error) {
      console.error('Error fetching businesses:', error);
      
      // Use mock data if API fails
      const mockBusinesses = getMockBusinesses();
      setBusinesses(mockBusinesses);
      setFilteredBusinesses(mockBusinesses);
      
    } finally {
      setLoading(false);
    }
  };

  const getMockBusinesses = () => {
    return [
      {
        _id: '1',
        businessName: 'Sunset Cafe',
        description: 'Cozy coffee shop with artisanal brews and pastries',
        category: 'Restaurant',
        subcategory: ['Coffee Shop', 'Bakery'],
        email: 'contact@sunsetcafe.com',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Main Street',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94107',
          country: 'USA'
        },
        website: 'https://sunsetcafe.com',
        socialMedia: {
          facebook: 'facebook.com/sunsetcafe',
          instagram: 'instagram.com/sunsetcafe'
        },
        services: [
          { name: 'Coffee Brewing', description: 'Artisanal coffee brewing', price: '4.50' },
          { name: 'Pastry Selection', description: 'Freshly baked pastries', price: '3.50' }
        ],
        hours: {
          monday: { open: '07:00', close: '20:00' },
          tuesday: { open: '07:00', close: '20:00' },
          wednesday: { open: '07:00', close: '20:00' },
          thursday: { open: '07:00', close: '20:00' },
          friday: { open: '07:00', close: '21:00' },
          saturday: { open: '08:00', close: '21:00' },
          sunday: { open: '08:00', close: '18:00' }
        },
        status: 'Active',
        createdAt: '2024-01-15T10:30:00Z',
        logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=400&h=300&fit=crop'
        ],
        rating: 4.5,
        reviewCount: 128
      },
      {
        _id: '2',
        businessName: 'Tech Solutions Inc.',
        description: 'IT consulting and software development services',
        category: 'Service',
        subcategory: ['IT Consulting', 'Software Development'],
        email: 'info@techsolutions.com',
        phone: '+1 (555) 987-6543',
        address: {
          street: '456 Tech Avenue',
          city: 'San Jose',
          state: 'CA',
          zipCode: '95113',
          country: 'USA'
        },
        website: 'https://techsolutions.com',
        socialMedia: {
          linkedin: 'linkedin.com/company/techsolutions',
          twitter: 'twitter.com/techsolutions'
        },
        services: [
          { name: 'Web Development', description: 'Custom website development', price: '5000' },
          { name: 'IT Consulting', description: 'Business IT solutions', price: '150' }
        ],
        hours: {
          monday: { open: '09:00', close: '17:00' },
          tuesday: { open: '09:00', close: '17:00' },
          wednesday: { open: '09:00', close: '17:00' },
          thursday: { open: '09:00', close: '17:00' },
          friday: { open: '09:00', close: '17:00' },
          saturday: { open: '', close: '' },
          sunday: { open: '', close: '' }
        },
        status: 'Active',
        createdAt: '2024-01-10T14:20:00Z',
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
        images: [],
        rating: 4.8,
        reviewCount: 56
      },
      {
        _id: '3',
        businessName: 'Green Thumb Nursery',
        description: 'Plant nursery and gardening supplies',
        category: 'Retail',
        subcategory: ['Plants', 'Gardening'],
        email: 'plants@greenthumb.com',
        phone: '+1 (555) 456-7890',
        address: {
          street: '789 Garden Lane',
          city: 'Oakland',
          state: 'CA',
          zipCode: '94607',
          country: 'USA'
        },
        website: 'https://greenthumbnursery.com',
        socialMedia: {
          facebook: 'facebook.com/greenthumb',
          instagram: 'instagram.com/greenthumb'
        },
        services: [
          { name: 'Plant Consultation', description: 'Expert plant care advice', price: '75' },
          { name: 'Garden Design', description: 'Custom garden planning', price: '200' }
        ],
        hours: {
          monday: { open: '09:00', close: '18:00' },
          tuesday: { open: '09:00', close: '18:00' },
          wednesday: { open: '09:00', close: '18:00' },
          thursday: { open: '09:00', close: '18:00' },
          friday: { open: '09:00', close: '18:00' },
          saturday: { open: '09:00', close: '17:00' },
          sunday: { open: '10:00', close: '16:00' }
        },
        status: 'Pending',
        createdAt: '2024-01-20T09:15:00Z',
        logo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w-400&h=300&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop'
        ],
        rating: 4.3,
        reviewCount: 89
      }
    ];
  };

  // Filter businesses based on search and filters
  useEffect(() => {
    let results = businesses;

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(business =>
        business.businessName.toLowerCase().includes(term) ||
        (business.description && business.description.toLowerCase().includes(term)) ||
        business.category.toLowerCase().includes(term) ||
        business.address.city.toLowerCase().includes(term) ||
        business.email.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter(business => business.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'All') {
      results = results.filter(business => business.status === selectedStatus);
    }

    setFilteredBusinesses(results);
  }, [searchTerm, selectedCategory, selectedStatus, businesses]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setShowFilters(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={14} /> },
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={14} /> },
      'Inactive': { color: 'bg-red-100 text-red-800', icon: <XCircle size={14} /> }
    };

    const config = statusConfig[status] || statusConfig['Active'];

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        <span className="ml-1">{status}</span>
      </span>
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Restaurant': 'bg-red-50 text-red-700 border-red-200',
      'Retail': 'bg-blue-50 text-blue-700 border-blue-200',
      'Service': 'bg-purple-50 text-purple-700 border-purple-200',
      'Health': 'bg-green-50 text-green-700 border-green-200',
      'Education': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Entertainment': 'bg-pink-50 text-pink-700 border-pink-200',
      'Other': 'bg-gray-50 text-gray-700 border-gray-200'
    };

    return colors[category] || colors['Other'];
  };

  const handleViewDetails = (businessId) => {
    navigate(`/businesses/${businessId}`);
  };

  const handleEditBusiness = (businessId) => {
    navigate(`/businesses/${businessId}/edit`);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const getTodayHours = (hours) => {
    if (!hours) return 'Hours not available';
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    const todayHours = hours[today];
    
    if (!todayHours || !todayHours.open || !todayHours.close) {
      return 'Closed Today';
    }
    
    return `Open ${todayHours.open} - ${todayHours.close}`;
  };

  const handleRefresh = () => {
    fetchBusinesses();
  };

  const handleCreateBusiness = () => {
    navigate('/create-business');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Directory</h1>
              <p className="text-gray-600">Manage and view all your business listings</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={handleCreateBusiness}
                className="inline-flex items-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Building2 size={20} className="mr-2" />
                Add New Business
              </button>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" size={20} />
                <p className="text-green-800 font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search businesses by name, category, or location..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} className="mr-2" />
                Filters
                {(selectedCategory !== 'All' || selectedStatus !== 'All') && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </button>

              {/* Clear Filters */}
              {(selectedCategory !== 'All' || selectedStatus !== 'All' || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            selectedCategory === category
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map(status => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(status)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            selectedStatus === status
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Building2 className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Businesses</p>
                  <p className="text-2xl font-bold">{filteredBusinesses.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold">
                    {businesses.filter(b => b.status === 'Active').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">
                    {businesses.filter(b => b.status === 'Pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Users className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold">
                    {[...new Set(businesses.map(b => b.category))].length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading businesses...</span>
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Building2 className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All'
                ? 'Try adjusting your filters or search terms'
                : 'Get started by creating your first business listing'}
            </p>
            <button
              onClick={handleCreateBusiness}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Building2 size={20} className="mr-2" />
              Create Business
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBusinesses.map(business => (
              <div
                key={business._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Business Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {/* Logo */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {business.logo ? (
                          <img
                            src={business.logo}
                            alt={business.businessName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(business.businessName)}&background=random`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <Building2 className="text-gray-400" size={24} />
                          </div>
                        )}
                      </div>
                      
                      {/* Business Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">
                            {business.businessName}
                          </h3>
                          {getStatusBadge(business.status)}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded border ${getCategoryColor(business.category)}`}>
                            {business.category}
                          </span>
                          
                          {business.subcategory && business.subcategory.length > 0 && (
                            <span className="flex items-center text-gray-500 text-sm">
                              <Tag size={12} className="mr-1" />
                              {business.subcategory.slice(0, 2).join(', ')}
                              {business.subcategory.length > 2 && '...'}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {business.description || 'No description available'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    {business.rating && (
                      <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
                        <Star className="text-yellow-500 mr-1" size={16} fill="currentColor" />
                        <span className="font-bold">{business.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">
                          ({business.reviewCount || 0})
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span className="truncate">
                        {business.address?.city || 'N/A'}, {business.address?.state || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      <span className="truncate">{business.phone || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      <span className="truncate">{business.email || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Business Details */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Services */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Services</h4>
                      <div className="space-y-2">
                        {business.services?.slice(0, 3).map((service, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 truncate">{service.name}</span>
                            {service.price && (
                              <span className="font-medium text-gray-900">
                                ${parseFloat(service.price).toFixed(2)}
                              </span>
                            )}
                          </div>
                        )) || <p className="text-gray-500 text-sm">No services listed</p>}
                        {business.services && business.services.length > 3 && (
                          <p className="text-sm text-blue-600">
                            +{business.services.length - 3} more services
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Hours & Info */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Today's Hours</h4>
                      <div className="flex items-center mb-4">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm font-medium">
                          {getTodayHours(business.hours)}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span>Created: {formatDate(business.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-3">
                      {business.website && (
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Globe size={16} className="mr-1" />
                          Website
                        </a>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(business._id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        View Details
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                      
                      <button
                        onClick={() => handleEditBusiness(business._id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && filteredBusinesses.length > 0 && (
          <div className="mt-6 text-center text-gray-600 text-sm">
            Showing {filteredBusinesses.length} of {businesses.length} businesses
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessList;