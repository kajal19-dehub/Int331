import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Users, Star, Eye, Calendar,
  DollarSign, MessageSquare, BarChart3, Settings,
  Edit, Bell, Share2, Download
} from 'lucide-react';
import api from '../../utils/api';
import { useSelector } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BusinessDashboard = () => {
  const [business, setBusiness] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalViews: 1245,
    newCustomers: 45,
    revenue: 12500,
    rating: 4.8,
    reviews: 24,
    performance: 12.5
  });
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      if (user?.businessId) {
        const response = await api.get(`/businesses/${user.businessId}`);
        setBusiness(response.data.business);
      }

      // Mock analytics data
      setRecentReviews([
        {
          id: 1,
          userName: 'John Doe',
          rating: 5,
          comment: 'Excellent service! Highly recommended.',
          date: '2 hours ago'
        },
        {
          id: 2,
          userName: 'Jane Smith',
          rating: 4,
          comment: 'Good quality but a bit pricey.',
          date: '1 day ago'
        },
        {
          id: 3,
          userName: 'Bob Johnson',
          rating: 5,
          comment: 'Will definitely come back!',
          date: '2 days ago'
        }
      ]);

    } catch (error) {
      console.error('Error fetching business data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Website Visits',
        data: [65, 78, 66, 89, 96, 112],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3
      },
      {
        label: 'Customer Enquiries',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3
      }
    ]
  };

  const revenueData = {
    labels: ['Services', 'Products', 'Consulting', 'Other'],
    datasets: [
      {
        label: 'Revenue',
        data: [65, 25, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
      }
    ]
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
            <p className="text-gray-600 mt-2">
              {business ? business.businessName : 'Manage your business performance'}
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Link
              to={business ? `/business/edit/${business._id}` : '/business/create'}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Edit size={18} className="mr-2" />
              {business ? 'Edit Business' : 'Create Business'}
            </Link>
            <Link
              to="/business/analytics"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <BarChart3 size={18} className="mr-2" />
              View Analytics
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12.5% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Customers</p>
                <p className="text-2xl font-bold">{analytics.newCustomers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8 from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold">{analytics.rating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="text-yellow-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Based on {analytics.reviews} reviews</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">${analytics.revenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{analytics.performance}% growth</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Traffic Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Performance Overview</h2>
                <div className="flex space-x-2">
                  <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                    <option>Last month</option>
                  </select>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
            </div>

            {/* Revenue Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">Revenue Distribution</h2>
              <div className="h-64">
                <Bar data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold flex items-center">
                  <MessageSquare className="mr-2" size={20} />
                  Recent Reviews
                </h3>
                <Link to="/reviews" className="text-blue-600 hover:text-blue-700 text-sm">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.userName}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < review.rating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                  </div>
                ))}
              </div>
              
              <Link
                to="/reviews"
                className="w-full mt-4 block text-center border border-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                See All Reviews
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Business Insights</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Profile Completion</span>
                  <span className="font-bold text-blue-600">85%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Response Rate</span>
                  <span className="font-bold text-green-600">92%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Customer Satisfaction</span>
                  <span className="font-bold text-yellow-600">94%</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Listing Visibility</span>
                  <span className="font-bold text-purple-600">High</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Bell size={18} className="mr-3 text-gray-600" />
                  <span className="font-medium">Update Business Hours</span>
                </button>
                
                <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Edit size={18} className="mr-3 text-gray-600" />
                  <span className="font-medium">Add New Services</span>
                </button>
                
                <button className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                  <Share2 size={18} className="mr-3 text-gray-600" />
                  <span className="font-medium">Share Business Profile</span>
                </button>
                
                <Link
                  to="/business/analytics"
                  className="w-full flex items-center p-3 border border-blue-200 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <Settings size={18} className="mr-3 text-blue-600" />
                  <span className="font-medium text-blue-600">Advanced Analytics</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Notifications & Alerts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Bell className="text-yellow-600 mr-2" size={20} />
                <h4 className="font-bold">Profile Update</h4>
              </div>
              <p className="text-sm text-gray-600">
                Complete your business profile to increase visibility by 40%
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Calendar className="text-blue-600 mr-2" size={20} />
                <h4 className="font-bold">Upcoming Promotion</h4>
              </div>
              <p className="text-sm text-gray-600">
                Summer promotion starts in 2 weeks. Update your special offers.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="text-green-600 mr-2" size={20} />
                <h4 className="font-bold">Performance Peak</h4>
              </div>
              <p className="text-sm text-gray-600">
                Your business had 30% more views this week compared to last week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;