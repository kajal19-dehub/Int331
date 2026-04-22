import React, { useState, useEffect } from 'react';
import { 
  Users, Building2, Shield, AlertTriangle,
  TrendingUp, DollarSign, CheckCircle, XCircle,
  Eye, Star, MessageSquare, Settings,
  Search, Filter, Download, MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1245,
    totalBusinesses: 567,
    pendingVerifications: 23,
    reportedIssues: 12,
    revenue: 12500,
    growthRate: 25.5
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBusinesses, setRecentBusinesses] = useState([]);
  const [reportedIssues, setReportedIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // Mock data
      setRecentUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', joined: '2 hours ago' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'business', joined: '5 hours ago' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', joined: '1 day ago' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'business', joined: '2 days ago' }
      ]);

      setRecentBusinesses([
        { id: 1, name: 'Tech Solutions Inc', category: 'Service', status: 'verified', created: '1 hour ago' },
        { id: 2, name: 'The Coffee Corner', category: 'Restaurant', status: 'pending', created: '3 hours ago' },
        { id: 3, name: 'Digital Marketing Pro', category: 'Service', status: 'verified', created: '1 day ago' },
        { id: 4, name: 'Health & Wellness', category: 'Health', status: 'rejected', created: '2 days ago' }
      ]);

      setReportedIssues([
        { id: 1, type: 'Review', description: 'Inappropriate content', reportedBy: 'User123', status: 'pending' },
        { id: 2, type: 'Business', description: 'False information', reportedBy: 'User456', status: 'resolved' },
        { id: 3, type: 'User', description: 'Spam account', reportedBy: 'User789', status: 'pending' }
      ]);

    } catch (error) {
      console.error('Error fetching admin data:', error);
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage users, businesses, and platform activities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12.5% growth</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Businesses</p>
                <p className="text-2xl font-bold">{stats.totalBusinesses.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Building2 className="text-green-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8.2% growth</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verifications</p>
                <p className="text-2xl font-bold">{stats.pendingVerifications}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="text-yellow-600" size={24} />
              </div>
            </div>
            <div className="mt-2">
              <a href="#verifications" className="text-sm text-blue-600 hover:text-blue-700">
                Review now →
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{stats.growthRate}% growth</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Users</h2>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">User</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Role</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Joined</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800'
                            : user.role === 'business'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{user.joined}</td>
                      <td className="py-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-center">
              <a href="/admin/users" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Users →
              </a>
            </div>
          </div>

          {/* Recent Businesses */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Business Verifications</h2>
              <div className="flex items-center space-x-2">
                <Filter size={18} className="text-gray-400" />
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Verified</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentBusinesses.map((business) => (
                <div key={business.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">{business.name}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span className="px-2 py-1 bg-gray-100 rounded mr-2">{business.category}</span>
                      <span>{business.created}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {business.status === 'pending' ? (
                      <>
                        <button className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                          <CheckCircle size={16} className="mr-1" />
                          Verify
                        </button>
                        <button className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                          <XCircle size={16} className="mr-1" />
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-lg text-sm ${
                        business.status === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <a href="/admin/businesses" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Manage All Businesses →
              </a>
            </div>
          </div>
        </div>

        {/* Reported Issues */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Reported Issues</h2>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download size={18} />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Type</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Description</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Reported By</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportedIssues.map((issue) => (
                  <tr key={issue.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        issue.type === 'Review' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : issue.type === 'Business'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {issue.type}
                      </span>
                    </td>
                    <td className="py-4">
                      <p className="font-medium">{issue.description}</p>
                    </td>
                    <td className="py-4 text-sm text-gray-600">{issue.reportedBy}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        issue.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                          View
                        </button>
                        {issue.status === 'pending' && (
                          <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                            Resolve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <Eye className="mr-2" size={20} />
              Platform Activity
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Active Users</span>
                <span className="font-bold">1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Visits</span>
                <span className="font-bold">45,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Session Duration</span>
                <span className="font-bold">4m 23s</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <Star className="mr-2" size={20} />
              Content Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Reviews</span>
                <span className="font-bold">12,456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Rating</span>
                <span className="font-bold">4.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Reviews Today</span>
                <span className="font-bold">128</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <Settings className="mr-2" size={20} />
              System Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Server Uptime</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Response Time</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">45ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;