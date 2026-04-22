import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Edit, Trash2, Calendar, Building2, ChevronRight } from 'lucide-react';
import api from '../../utils/api';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      // Mock data - replace with actual API call
      const mockReviews = [
        {
          id: 1,
          businessName: 'The Coffee Corner',
          rating: 5,
          comment: 'Excellent coffee and service!',
          date: '2024-01-15',
          businessCategory: 'Restaurant'
        },
        {
          id: 2,
          businessName: 'Tech Solutions Inc',
          rating: 4,
          comment: 'Good service but a bit pricey',
          date: '2024-01-10',
          businessCategory: 'Service'
        },
        {
          id: 3,
          businessName: 'GreenLeaf Spa',
          rating: 5,
          comment: 'Amazing massage therapy',
          date: '2024-01-05',
          businessCategory: 'Health'
        }
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (reviewId) => {
    console.log('Edit review:', reviewId);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
          <p className="text-gray-600 mt-2">
            Manage your reviews and ratings
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <Star size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">No reviews yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't written any reviews yet. Share your experiences with businesses!
            </p>
            <Link
              to="/businesses"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore Businesses
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Building2 size={24} className="text-gray-400 mr-3" />
                    <div>
                      <h3 className="text-xl font-bold">{review.businessName}</h3>
                      <div className="flex items-center mt-1">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {review.businessCategory}
                        </span>
                        <div className="flex items-center ml-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditReview(review.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{review.comment}</p>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>Reviewed on {review.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;