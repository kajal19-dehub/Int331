import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Globe, Star, Clock, 
  Facebook, Twitter, Instagram, Linkedin, Share2,
  Heart, CheckCircle, ChevronRight, Users, Award,
  Edit, ArrowLeft, Bookmark, X, User
} from 'lucide-react';
import api from '../utils/api';

const BusinessDetail = () => {
  const { id } = useParams();
  console.log('BusinessDetail ID:', id);
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [user, setUser] = useState(null);
  
  // New review form state
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    title: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  
  useEffect(() => {
    fetchBusinessDetails();
    fetchUserData();
  }, [id]);

  const fetchUserData = () => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      setUser(JSON.parse(userData));
      checkIfSaved();
    }
  };

  const fetchBusinessDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/businesses/${id}`);
      if (response.data.success) {
        setBusiness(response.data.business);
        setReviews(response.data.reviews || []);
      } else {
        throw new Error('Failed to fetch business details');
      }
    } catch (error) {
      console.error('Error fetching business details:', error);
      // Fallback to mock data
      const mockBusiness = getMockBusiness();
      setBusiness(mockBusiness);
      setReviews(getMockReviews());
    } finally {
      setLoading(false);
    }
  };

  const getMockBusiness = () => {
    return {
      _id: id,
      businessName: 'The Coffee Corner',
      description: 'Cozy coffee shop with artisanal brews and pastries. We source our beans from local farmers and roast them daily. Our baristas are trained to craft the perfect cup every time.',
      category: 'Restaurant',
      averageRating: 4.8,
      totalReviews: 124,
      email: 'info@coffeecorner.com',
      phone: '+91 9876543210',
      website: 'https://coffeecorner.example.com',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001'
      },
      socialMedia: {
        facebook: 'https://facebook.com/coffeecorner',
        instagram: 'https://instagram.com/coffeecorner'
      },
      services: [
        { name: 'Espresso', description: 'Single or double shot of our finest espresso', price: 3.50 },
        { name: 'Cappuccino', description: 'Perfectly balanced with steamed milk', price: 4.50 },
        { name: 'Cold Brew', description: '12-hour steeped cold brew coffee', price: 4.00 }
      ],
      hours: {
        monday: { open: '07:00', close: '21:00' },
        tuesday: { open: '07:00', close: '21:00' },
        wednesday: { open: '07:00', close: '21:00' },
        thursday: { open: '07:00', close: '22:00' },
        friday: { open: '07:00', close: '23:00' },
        saturday: { open: '08:00', close: '23:00' },
        sunday: { open: '08:00', close: '20:00' }
      },
      images: [],
      logo: null,
      isVerified: true,
      isFeatured: true,
      owner: 'user123',
      createdAt: '2024-01-15'
    };
  };

  const getMockReviews = () => {
    return [
      {
        _id: '1',
        user: { name: 'John Doe', avatar: null },
        rating: 5,
        title: 'Amazing Experience!',
        comment: 'Best coffee shop in town! The atmosphere is cozy and the staff is friendly.',
        date: '2024-03-15',
        helpful: 12,
        reply: null
      },
      {
        _id: '2',
        user: { name: 'Jane Smith', avatar: null },
        rating: 4,
        title: 'Great pastries',
        comment: 'Love their pastries, coffee could be better. Will definitely come back for the croissants!',
        date: '2024-03-10',
        helpful: 5,
        reply: {
          businessName: 'The Coffee Corner',
          comment: 'Thank you for your feedback! We\'re working on improving our coffee blend.',
          date: '2024-03-11'
        }
      },
      {
        _id: '3',
        user: { name: 'Mike Johnson', avatar: null },
        rating: 5,
        title: 'Perfect spot for remote work',
        comment: 'Fast WiFi, plenty of outlets, and great coffee. My go-to spot for working remotely.',
        date: '2024-03-05',
        helpful: 8,
        reply: null
      }
    ];
  };

  const checkIfSaved = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await api.get(`/businesses/${id}/check-save`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSaveBusiness = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to save businesses');
      navigate('/login');
      return;
    }
    
    try {
      if (isSaved) {
        await api.delete(`/businesses/${id}/save`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setIsSaved(false);
        alert('Removed from saved businesses');
      } else {
        await api.post(`/businesses/${id}/save`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setIsSaved(true);
        alert('Added to saved businesses');
      }
    } catch (error) {
      console.error('Error saving business:', error);
      alert('Failed to save business');
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/business/${id}`;
    if (navigator.share) {
      navigator.share({
        title: business?.businessName || 'Business',
        text: `Check out ${business?.businessName} on BizConnect!`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const isBusinessOwner = () => {
    return user && business && business.owner === user.id;
  };

  // Review Functions
  const handleStarClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const submitReview = async () => {
    if (!newReview.rating || !newReview.comment.trim()) {
      alert('Please provide a rating and comment');
      return;
    }

    if (!user) {
      alert('Please login to submit a review');
      navigate('/login');
      return;
    }

    setSubmittingReview(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const newReviewObj = {
          _id: Date.now().toString(),
          user: { 
            name: user.name || 'Anonymous',
            avatar: user.avatar || null
          },
          rating: newReview.rating,
          title: newReview.title || 'Great Experience',
          comment: newReview.comment,
          date: new Date().toISOString().split('T')[0],
          helpful: 0,
          reply: null
        };

        // Add to reviews list
        setReviews(prev => [newReviewObj, ...prev]);
        
        // Update business rating
        if (business) {
          const newTotalReviews = business.totalReviews + 1;
          const newAverageRating = (
            (business.averageRating * business.totalReviews) + newReview.rating
          ) / newTotalReviews;
          
          setBusiness(prev => ({
            ...prev,
            averageRating: parseFloat(newAverageRating.toFixed(1)),
            totalReviews: newTotalReviews
          }));
        }

        // Reset form
        setNewReview({
          rating: 0,
          comment: '',
          title: ''
        });
        setShowReviewForm(false);
        
        alert('Thank you for your review!');
      }, 1000);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const markHelpful = (reviewId) => {
    setReviews(prev => prev.map(review => 
      review._id === reviewId 
        ? { ...review, helpful: (review.helpful || 0) + 1 }
        : review
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Business not found</h2>
        <Link to="/businesses" className="text-blue-600 hover:text-blue-700">
          ← Back to Businesses
        </Link>
      </div>
    );
  }

  const workingHours = business.hours || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      </div>

      {/* Business Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Business Logo/Image */}
            <div className="lg:w-1/4">
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl shadow-lg flex items-center justify-center">
                  {business.logo ? (
                    <img
                      src={business.logo}
                      alt={business.businessName}
                      className="w-48 h-48 object-cover rounded-full border-4 border-white"
                    />
                  ) : (
                    <div className="text-white text-6xl font-bold">
                      {business.businessName.charAt(0)}
                    </div>
                  )}
                </div>
                {business.isVerified && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                    <CheckCircle size={16} className="mr-1" />
                    Verified
                  </div>
                )}
                {business.isFeatured && (
                  <div className="absolute top-4 left-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 mt-4">
                <button
                  onClick={handleSaveBusiness}
                  className={`py-2 px-4 rounded-lg flex items-center justify-center ${
                    isSaved 
                      ? 'bg-red-100 text-red-600 border border-red-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Bookmark size={20} className="mr-2 fill-red-600" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Heart size={20} className="mr-2" />
                      Save Business
                    </>
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="py-2 px-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 flex items-center justify-center"
                >
                  <Share2 size={20} className="mr-2" />
                  Share
                </button>
                {isBusinessOwner() && (
                  <Link
                    to={`/business/edit/${id}`}
                    className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                  >
                    <Edit size={20} className="mr-2" />
                    Edit Business
                  </Link>
                )}
              </div>
            </div>

            {/* Business Info */}
            <div className="lg:w-3/4">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{business.businessName}</h1>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${
                            i < Math.floor(business.averageRating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-semibold">
                        {business.averageRating.toFixed(1)}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({business.totalReviews} reviews)
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      {business.category}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4 md:mt-0"
                >
                  Write a Review
                </button>
              </div>

              <p className="text-gray-600 text-lg mb-6">{business.description}</p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600">
                        {business.address?.street}<br />
                        {business.address?.city}, {business.address?.state} {business.address?.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <a href={`tel:${business.phone}`} className="text-blue-600 hover:text-blue-700">
                        {business.phone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail size={20} className="text-gray-400 mr-3" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href={`mailto:${business.email}`} className="text-blue-600 hover:text-blue-700">
                        {business.email}
                      </a>
                    </div>
                  </div>
                  {business.website && (
                    <div className="flex items-center">
                      <Globe size={20} className="text-gray-400 mr-3" />
                      <div>
                        <p className="font-semibold">Website</p>
                        <a 
                          href={business.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {business.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Media */}
              {business.socialMedia && (
                <div className="mb-6">
                  <p className="font-semibold mb-2">Follow Us</p>
                  <div className="flex space-x-4">
                    {business.socialMedia.facebook && (
                      <a 
                        href={business.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <Facebook size={24} />
                      </a>
                    )}
                    {business.socialMedia.twitter && (
                      <a 
                        href={business.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-400"
                      >
                        <Twitter size={24} />
                      </a>
                    )}
                    {business.socialMedia.instagram && (
                      <a 
                        href={business.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600"
                      >
                        <Instagram size={24} />
                      </a>
                    )}
                    {business.socialMedia.linkedin && (
                      <a 
                        href={business.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-700"
                      >
                        <Linkedin size={24} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex border-b overflow-x-auto">
          {['overview', 'services', 'reviews', 'photos', 'hours'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">About {business.businessName}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{business.description}</p>
                
                {business.services && business.services.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Popular Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {business.services.slice(0, 4).map((service, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{service.name}</h4>
                            {service.price && (
                              <span className="font-bold text-blue-600">
                                ${service.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Users className="mx-auto mb-2 text-blue-600" size={24} />
                    <div className="text-2xl font-bold">{business.totalReviews}+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Award className="mx-auto mb-2 text-green-600" size={24} />
                    <div className="text-2xl font-bold">{business.averageRating.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <CheckCircle className="mx-auto mb-2 text-yellow-600" size={24} />
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <Star className="mx-auto mb-2 text-purple-600" size={24} />
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && business.services && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Our Services</h2>
                <div className="space-y-4">
                  {business.services.map((service, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                        {service.price && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              ${service.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">per service</div>
                          </div>
                        )}
                      </div>
                      <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                        Book Now <ChevronRight size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Form */}
                {showReviewForm && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Write a Review</h3>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Rating Stars */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Your Rating *
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleStarClick(star)}
                              className="p-1"
                            >
                              <Star
                                size={32}
                                className={`${
                                  star <= newReview.rating
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                } hover:text-yellow-400`}
                              />
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {newReview.rating > 0 ? `You rated: ${newReview.rating} star${newReview.rating > 1 ? 's' : ''}` : 'Select your rating'}
                        </p>
                      </div>

                      {/* Review Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Review Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={newReview.title}
                          onChange={handleReviewChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Summarize your experience"
                        />
                      </div>

                      {/* Review Comment */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Review *
                        </label>
                        <textarea
                          name="comment"
                          value={newReview.comment}
                          onChange={handleReviewChange}
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Share details of your experience..."
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowReviewForm(false)}
                          className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={submitReview}
                          disabled={submittingReview || !newReview.rating || !newReview.comment.trim()}
                          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submittingReview ? 'Submitting...' : 'Submit Review'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews List */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Customer Reviews</h2>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Write a Review
                    </button>
                  </div>

                  {/* Reviews Summary */}
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="text-5xl font-bold mr-4">
                        {business.averageRating.toFixed(1)}
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={`${
                                i < Math.floor(business.averageRating)
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">
                          Based on {business.totalReviews} review{business.totalReviews !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review._id} className="bg-white rounded-xl shadow-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                {review.user?.avatar ? (
                                  <img
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className="w-12 h-12 rounded-full"
                                  />
                                ) : (
                                  <User size={24} className="text-blue-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold">{review.user?.name || 'Anonymous'}</h4>
                                <div className="flex items-center mt-1">
                                  <div className="flex">
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
                                  <span className="ml-2 text-sm text-gray-500">
                                    {formatDate(review.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => markHelpful(review._id)}
                              className="text-sm text-gray-500 hover:text-blue-600"
                            >
                              Helpful ({review.helpful || 0})
                            </button>
                          </div>

                          {review.title && (
                            <h5 className="font-semibold text-lg mb-2">{review.title}</h5>
                          )}
                          <p className="text-gray-600 mb-4">{review.comment}</p>

                          {/* Business Reply */}
                          {review.reply && (
                            <div className="mt-6 pt-6 border-t border-gray-100">
                              <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center mb-2">
                                  <span className="font-semibold text-blue-700">
                                    Response from {review.reply.businessName}
                                  </span>
                                  <span className="text-sm text-gray-500 ml-2">
                                    {formatDate(review.reply.date)}
                                  </span>
                                </div>
                                <p className="text-gray-700">{review.reply.comment}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                        <Star size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold mb-2">No Reviews Yet</h3>
                        <p className="text-gray-600 mb-6">
                          Be the first to share your experience with this business!
                        </p>
                        <button
                          onClick={() => setShowReviewForm(true)}
                          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                          Write the First Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'photos' && business.images && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Photos</h2>
                {business.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {business.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url || image}
                        alt={`${business.businessName} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                        onClick={() => window.open(image.url || image, '_blank')}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No photos available</p>
                )}
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
                <div className="space-y-3">
                  {Object.entries(workingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <Clock size={20} className="text-gray-400 mr-3" />
                        <span className="font-medium capitalize">{day}</span>
                      </div>
                      {hours.open && hours.close ? (
                        <span className="font-semibold">
                          {hours.open} - {hours.close}
                        </span>
                      ) : (
                        <span className="text-red-500">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <div className="h-64 bg-gray-200 rounded-lg mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={48} className="text-red-500" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin size={20} className="text-gray-400 mr-3" />
                  <div>
                    <p className="font-semibold">{business.address?.city}, {business.address?.state}</p>
                    <p className="text-gray-600 text-sm">{business.address?.street}</p>
                  </div>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(business.businessName + ' ' + business.address?.street + ' ' + business.address?.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Contact Business</h3>
              <div className="space-y-3">
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center justify-center bg-green-100 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-200 transition"
                >
                  <Phone size={20} className="mr-2" />
                  Call Now
                </a>
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center justify-center bg-blue-100 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-200 transition"
                >
                  <Mail size={20} className="mr-2" />
                  Send Email
                </a>
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition"
                  >
                    <Globe size={20} className="mr-2" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>

            {/* Save Business Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Save for Later</h3>
              <p className="text-gray-600 mb-4">Save this business to your collection to easily find it later.</p>
              <button
                onClick={handleSaveBusiness}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center ${
                  isSaved
                    ? 'bg-red-100 text-red-600 border border-red-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSaved ? (
                  <>
                    <Bookmark size={20} className="mr-2 fill-red-600" />
                    Remove from Saved
                  </>
                ) : (
                  <>
                    <Heart size={20} className="mr-2" />
                    Save to Collection
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;