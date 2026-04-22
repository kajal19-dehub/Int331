import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Star, Bookmark, Edit, Calendar, 
  TrendingUp, MessageSquare, Settings, Bell,
  ChevronRight, Eye, ThumbsUp, MapPin
} from 'lucide-react';
import api from '../../utils/api';
import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    reviews: 0,
    savedBusinesses: 0,
    totalViews: 0,
    notifications: []
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setUserData({
        reviews: 12,
        savedBusinesses: 8,
        totalViews: 245,
        notifications: [
          { id: 1, message: 'Your review was marked helpful', time: '2 hours ago' },
          { id: 2, message: 'New business in your area', time: '1 day ago' },
          { id: 3, message: 'Reply to your review', time: '2 days ago' },
        ]
      });

      setRecentActivities([
        {
          id: 1,
          type: 'review',
          title: 'Posted a review for Tech Solutions Inc.',
          time: '2 hours ago',
          businessName: 'Tech Solutions Inc.',
          rating: 5
        },
        {
          id: 2,
          type: 'save',
          title: 'Saved The Coffee Corner',
          time: '1 day ago',
          businessName: 'The Coffee Corner'
        },
        {
          id: 3,
          type: 'visit',
          title: 'Visited Digital Marketing Pro',
          time: '3 days ago',
          businessName: 'Digital Marketing Pro'
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}! Here's what's happening with your account.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <Star className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">My Reviews</p>
                    <p className="text-2xl font-bold">{userData.reviews}</p>
                  </div>
                </div>
                <Link
                  to="/my-reviews"
                  className="mt-4 flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <Bookmark className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Saved Businesses</p>
                    <p className="text-2xl font-bold">{userData.savedBusinesses}</p>
                  </div>
                </div>
                <Link
                  to="/saved-businesses"
                  className="mt-4 flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg mr-4">
                    <Eye className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profile Views</p>
                    <p className="text-2xl font-bold">{userData.totalViews}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="mt-4 flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Profile <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Link to="/activity" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="mr-4">
                      {activity.type === 'review' && (
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Star className="text-blue-600" size={20} />
                        </div>
                      )}
                      {activity.type === 'save' && (
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Bookmark className="text-green-600" size={20} />
                        </div>
                      )}
                      {activity.type === 'visit' && (
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Eye className="text-purple-600" size={20} />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar size={14} className="mr-1" />
                        {activity.time}
                      </div>
                    </div>
                    
                    {activity.rating && (
                      <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        <Star size={14} className="mr-1" />
                        {activity.rating}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/businesses"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                >
                  <Building2 className="text-blue-600 mr-3" size={24} />
                  <div>
                    <p className="font-medium">Find Businesses</p>
                    <p className="text-sm text-gray-600">Discover new businesses</p>
                  </div>
                </Link>
                
                {user?.role === 'business' ? (
                  <Link
                    to="/business/dashboard"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition"
                  >
                    <TrendingUp className="text-green-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium">Business Dashboard</p>
                      <p className="text-sm text-gray-600">Manage your business</p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/business/create"
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition"
                  >
                    <Edit className="text-green-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium">List Your Business</p>
                      <p className="text-sm text-gray-600">Get started for free</p>
                    </div>
                  </Link>
                )}
                
                <Link
                  to="/my-reviews"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition"
                >
                  <MessageSquare className="text-yellow-600 mr-3" size={24} />
                  <div>
                    <p className="font-medium">Write Reviews</p>
                    <p className="text-sm text-gray-600">Share your experiences</p>
                  </div>
                </Link>
                
                <Link
                  to="/profile"
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition"
                >
                  <Settings className="text-purple-600 mr-3" size={24} />
                  <div>
                    <p className="font-medium">Account Settings</p>
                    <p className="text-sm text-gray-600">Update your profile</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center">
                  <Bell className="mr-2" size={20} />
                  Notifications
                </h3>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {userData.notifications.length} new
                </span>
              </div>
              
              <div className="space-y-4">
                {userData.notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Mark All as Read
              </button>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Profile Summary</h3>
              
              <div className="flex items-center mb-6">
                <img
                  src={user?.profileImage || '/default-avatar.png'}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {user?.role}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Verification</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {user?.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <Link
                to="/profile"
                className="w-full mt-6 block text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Edit Profile
              </Link>
            </div>

            {/* Popular in Your Area */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Popular in Your Area</h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                  <img
                    src="/default-business.png"
                    alt="Business"
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-medium">The Coffee Corner</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      <span>0.5 mi away</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">4.8</span>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition">
                  <img
                    src="/default-business.png"
                    alt="Business"
                    className="w-12 h-12 object-cover rounded-lg mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-medium">Tech Solutions Inc</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      <span>1.2 mi away</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">4.6</span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/businesses"
                className="w-full mt-4 block text-center text-blue-600 py-2 border border-blue-200 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;