import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone, Clock } from 'lucide-react';

const BusinessCard = ({ business, view = 'grid' }) => {
  if (view === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={business.images?.[0]?.url || '/default-business.png'}
            alt={business.businessName}
            className="w-full md:w-48 h-48 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold mb-2">{business.businessName}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={18} className="mr-2" />
                  <span>{business.address?.city}, {business.address?.state}</span>
                </div>
              </div>
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <Star size={16} className="mr-1" />
                <span>{business.averageRating?.toFixed(1) || 'N/A'}</span>
                <span className="ml-1">({business.totalReviews || 0})</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {business.category}
              </span>
              {business.subcategory?.slice(0, 2).map((sub, index) => (
                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {sub}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {business.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <span>{business.phone}</span>
                </div>
              )}
              {business.hours && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>Open Now</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={business.userId?.profileImage || '/default-avatar.png'}
                  alt={business.userId?.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">By {business.userId?.name}</span>
              </div>
              <Link
                to={`/business/${business._id}`}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (default)
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={business.images?.[0]?.url || '/default-business.png'}
          alt={business.businessName}
          className="w-full h-48 object-cover"
        />
        {business.isVerified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Verified
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold line-clamp-1">{business.businessName}</h3>
          <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            <Star size={14} className="mr-1" />
            <span>{business.averageRating?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-2" />
          <span className="text-sm">{business.address?.city}, {business.address?.state}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{business.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
            {business.category}
          </span>
          <Link
            to={`/business/${business._id}`}
            className="text-blue-600 text-sm font-semibold hover:text-blue-700"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;