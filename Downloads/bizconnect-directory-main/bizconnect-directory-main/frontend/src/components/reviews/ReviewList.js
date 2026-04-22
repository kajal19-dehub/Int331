import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ReviewList = ({ reviews }) => {
  const handleHelpful = (reviewId, type) => {
    // API call to mark review as helpful/not helpful
    console.log(`${type} clicked for review ${reviewId}`);
  };

  const handleReport = (reviewId) => {
    // API call to report review
    console.log(`Report review ${reviewId}`);
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="text-gray-400 mb-4">📝</div>
        <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
        <p className="text-gray-600">Be the first to review this business!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <img
                src={review.userId?.profileImage || '/default-avatar.png'}
                alt={review.userId?.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">{review.userId?.name}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  {format(new Date(review.createdAt), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < review.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold">{review.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

          {/* Review Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex space-x-2 mb-4 overflow-x-auto">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Review ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={() => window.open(image.url, '_blank')}
                />
              ))}
            </div>
          )}

          {/* Review Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div className="flex space-x-4">
              <button
                onClick={() => handleHelpful(review._id, 'helpful')}
                className="flex items-center text-gray-600 hover:text-green-600"
              >
                <ThumbsUp size={18} className="mr-1" />
                <span>Helpful ({review.helpful || 0})</span>
              </button>
              <button
                onClick={() => handleHelpful(review._id, 'notHelpful')}
                className="flex items-center text-gray-600 hover:text-red-600"
              >
                <ThumbsDown size={18} className="mr-1" />
                <span>Not Helpful ({review.notHelpful || 0})</span>
              </button>
            </div>
            
            <button
              onClick={() => handleReport(review._id)}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <Flag size={18} className="mr-1" />
              <span>Report</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;