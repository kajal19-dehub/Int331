import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Eye, DollarSign, Star, 
  Calendar, Download, Filter, Share2, Clock,
  BarChart3, PieChart, LineChart, MapPin
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BusinessAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState({
    overview: {
      totalVisitors: 2450,
      newCustomers: 128,
      conversionRate: 5.2,
      averageRating: 4.7,
      revenue: 15200,
      engagement: 78
    },
    traffic: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [65, 78, 66, 89, 96, 112, 98]
    },
    sources: [
      { name: 'Direct', value: 40, color: '#3B82F6' },
      { name: 'Search', value: 30, color: '#10B981' },
      { name: 'Social', value: 20, color: '#8B5CF6' },
      { name: 'Referral', value: 10, color: '#F59E0B' }
    ],
    demographics: [
      { age: '18-24', value: 25 },
      { age: '25-34', value: 40 },
      { age: '35-44', value: 20 },
      { age: '45-54', value: 10 },
      { age: '55+', value: 5 }
    ],
    peakHours: [
      { hour: '9 AM', visitors: 45 },
      { hour: '12 PM', visitors: 89 },
      { hour: '3 PM', visitors: 67 },
      { hour: '6 PM', visitors: 112 },
      { hour: '9 PM', visitors: 78 }
    ]
  });

  const trafficChartData = {
    labels: analytics.traffic.labels,
    datasets: [
      {
        label: 'Website Visits',
        data: analytics.traffic.data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const sourceChartData = {
    labels: analytics.sources.map(s => s.name),
    datasets: [
      {
        data: analytics.sources.map(s => s.value),
        backgroundColor: analytics.sources.map(s => s.color),
        borderWidth: 1
      }
    ]
  };

  const demographicChartData = {
    labels: analytics.demographics.map(d => d.age),
    datasets: [
      {
        label: 'Age Distribution',
        data: analytics.demographics.map(d => d.value),
        backgroundColor: 'rgba(139, 92, 246, 0.7)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1
      }
    ]
  };

  const exportAnalytics = () => {
    // Logic to export analytics data
    alert('Exporting analytics data...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Analytics</h1>
            <p className="text-gray-600 mt-2">
              Detailed insights about your business performance
            </p>
          </div>
          
          <div className="flex space-x-3 mt-4 md:mt-0">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Filter size={18} className="ml-3 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 bg-transparent outline-none"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            
            <button
              onClick={exportAnalytics}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Download size={18} className="mr-2" />
              Export
            </button>
            
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Share2 size={18} className="mr-2" />
              Share Report
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visitors</p>
                <p className="text-2xl font-bold">{analytics.overview.totalVisitors.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Eye className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12.5%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Customers</p>
                <p className="text-2xl font-bold">{analytics.overview.newCustomers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8.2%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">{analytics.overview.conversionRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+2.1%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold">{analytics.overview.averageRating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">Based on 245 reviews</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">${analytics.overview.revenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <DollarSign className="text-pink-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+15.3%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement</p>
                <p className="text-2xl font-bold">{analytics.overview.engagement}%</p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <LineChart className="text-indigo-600" size={24} />
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">Customer interaction</div>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <LineChart className="mr-2" size={20} />
                Website Traffic
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg">
                  Weekly
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Monthly
                </button>
              </div>
            </div>
            <div className="h-64">
              <Line data={trafficChartData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} />
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <PieChart className="mr-2" size={20} />
                Traffic Sources
              </h2>
              <div className="text-sm text-gray-600">Last 30 days</div>
            </div>
            <div className="h-64">
              <Pie data={sourceChartData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right'
                  }
                }
              }} />
            </div>
          </div>
        </div>

        {/* Secondary Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Demographics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Customer Demographics</h2>
            <div className="h-64">
              <Bar data={demographicChartData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} />
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Peak Business Hours</h2>
            <div className="space-y-4">
              {analytics.peakHours.map((hour, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16">
                    <span className="font-medium">{hour.hour}</span>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full"
                          style={{ width: `${(hour.visitors / 112) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-4 font-medium">{hour.visitors}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-6 text-sm text-gray-600">
              <Clock size={16} className="mr-2" />
              <span>Most visitors come between 6 PM - 9 PM</span>
            </div>
          </div>
        </div>

        {/* Geographical Data */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <MapPin className="mr-2" size={20} />
            Geographical Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Local Customers</p>
              <p className="text-2xl font-bold">65%</p>
              <p className="text-xs text-gray-500">Within 10 miles</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">State Customers</p>
              <p className="text-2xl font-bold">25%</p>
              <p className="text-xs text-gray-500">Within state</p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">National Customers</p>
              <p className="text-2xl font-bold">8%</p>
              <p className="text-xs text-gray-500">Across country</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">International</p>
              <p className="text-2xl font-bold">2%</p>
              <p className="text-xs text-gray-500">Global reach</p>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Key Insights & Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <h3 className="font-bold text-green-800 mb-2">Strength</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• High customer satisfaction (4.7/5 rating)</li>
                <li>• Strong local presence (65% local customers)</li>
                <li>• Excellent conversion rate (5.2%)</li>
              </ul>
            </div>
            
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-yellow-800 mb-2">Opportunity</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Increase social media traffic (currently 20%)</li>
                <li>• Expand to national market (only 8%)</li>
                <li>• Improve mobile engagement</li>
              </ul>
            </div>
            
            <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">Recommendations</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Run targeted social media campaigns</li>
                <li>• Optimize for mobile users</li>
                <li>• Launch referral program</li>
                <li>• Add online booking system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;