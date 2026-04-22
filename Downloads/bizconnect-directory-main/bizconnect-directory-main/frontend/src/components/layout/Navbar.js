import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, User, Menu, X, Bell, Home, 
  Building2, Star, Bookmark, LogOut,
  CheckCircle, AlertCircle, Info, MessageSquare,
  ExternalLink
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const fetchNotifications = () => {
    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Welcome to BizConnect!',
        message: 'Get started by exploring local businesses in your area.',
        time: '2 hours ago',
        read: false,
        icon: <CheckCircle size={18} />,
        link: '/'
      },
      {
        id: 2,
        type: 'info',
        title: 'New Businesses Nearby',
        message: '3 new businesses have been listed in your city this week.',
        time: '1 day ago',
        read: false,
        icon: <Info size={18} />,
        link: '/businesses'
      },
      {
        id: 3,
        type: 'alert',
        title: 'Complete Your Profile',
        message: 'Complete your profile to get personalized recommendations.',
        time: '2 days ago',
        read: true,
        icon: <AlertCircle size={18} />,
        link: '/profile'
      },
      {
        id: 4,
        type: 'message',
        title: 'New Review Received',
        message: 'Someone left a review on your saved business.',
        time: '3 days ago',
        read: true,
        icon: <MessageSquare size={18} />,
        link: '/my-reviews'
      },
      {
        id: 5,
        type: 'info',
        title: 'New Feature Available',
        message: 'You can now save businesses to collections.',
        time: '4 days ago',
        read: true,
        icon: <Info size={18} />,
        link: '/saved-businesses'
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/businesses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
    if (!isNotificationMenuOpen) {
      markAllAsRead();
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'alert': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'message': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      setIsNotificationMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Businesses', path: '/businesses', icon: <Building2 size={20} /> },
    { name: 'Categories', path: '/categories', icon: <Menu size={20} /> },
    { name: 'About', path: '/about', icon: <Star size={20} /> },
  ];

  const userMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'My Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Saved Businesses', path: '/saved-businesses', icon: <Bookmark size={20} /> },
    { name: 'My Reviews', path: '/my-reviews', icon: <Star size={20} /> },
    { name: 'Business Dashboard', path: '/business/dashboard', icon: <Building2 size={20} /> },
    { name: 'Logout', action: handleLogout, icon: <LogOut size={20} /> },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">BizConnect</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search businesses..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </form>
           
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={toggleNotificationMenu}
                    className="relative p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <Bell size={22} className="text-gray-600" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotificationMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsNotificationMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                        {/* Notifications Header */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Notifications</h3>
                            <div className="flex items-center space-x-2">
                              {unreadCount > 0 && (
                                <button
                                  onClick={markAllAsRead}
                                  className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                  Mark all as read
                                </button>
                              )}
                              {notifications.length > 0 && (
                                <button
                                  onClick={clearAllNotifications}
                                  className="text-sm text-red-600 hover:text-red-800"
                                >
                                  Clear all
                                </button>
                              )}
                              <button
                                onClick={() => setIsNotificationMenuOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                <X size={18} className="text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                              {notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                                    !notification.read ? 'bg-blue-50' : ''
                                  }`}
                                  onClick={() => handleNotificationClick(notification)}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-start">
                                      <div className={`p-2 rounded-full mr-3 ${getNotificationColor(notification.type)}`}>
                                        {notification.icon}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                          <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                                          {!notification.read && (
                                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                          )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                        <div className="flex justify-between items-center mt-3">
                                          <span className="text-xs text-gray-500">{notification.time}</span>
                                          <div className="flex space-x-2">
                                            {!notification.read && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  markAsRead(notification.id);
                                                }}
                                                className="text-xs text-blue-600 hover:text-blue-800"
                                              >
                                                Mark as read
                                              </button>
                                            )}
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                deleteNotification(notification.id);
                                              }}
                                              className="text-xs text-red-600 hover:text-red-800"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-8 text-center">
                              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                              <p className="text-gray-500">No notifications yet</p>
                              <p className="text-sm text-gray-400 mt-2">
                                We'll notify you when something important happens
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Notifications Footer */}
                        {notifications.length > 0 && (
                          <div className="p-4 border-t border-gray-200">
                            <Link
                              to="/notifications"
                              className="flex items-center justify-center text-blue-600 hover:text-blue-800 font-medium"
                              onClick={() => setIsNotificationMenuOpen(false)}
                            >
                              View All Notifications
                              <ExternalLink size={16} className="ml-2" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50">
                        <div className="px-4 py-3 border-b">
                          <p className="font-semibold">{user?.name}</p>
                          <p className="text-sm text-gray-600">{user?.email}</p>
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                            {user?.role}
                          </span>
                        </div>
                        {userMenu.map((item) => (
                          item.path ? (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                              onClick={() => setIsProfileMenuOpen(false)}
                            >
                              {item.icon}
                              <span className="ml-3">{item.name}</span>
                            </Link>
                          ) : (
                            <button
                              key={item.name}
                              onClick={item.action}
                              className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition text-left"
                            >
                              {item.icon}
                              <span className="ml-3">{item.name}</span>
                            </button>
                          )
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 px-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search businesses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-3">{link.name}</span>
                </Link>
              ))}

              {/* Mobile Notifications (for logged in users) */}
              {isAuthenticated && notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full mr-2 ${getNotificationColor(notification.type)}`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {notifications.length > 3 && (
                    <Link
                      to="/notifications"
                      className="block text-center mt-3 text-blue-600 text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View all notifications →
                    </Link>
                  )}
                </div>
              )}

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold mr-3">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                    
                    {userMenu.map((item) => (
                      item.path ? (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center py-3 text-gray-700 hover:text-blue-600 transition"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </Link>
                      ) : (
                        <button
                          key={item.name}
                          onClick={() => {
                            item.action();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center w-full py-3 text-gray-700 hover:text-blue-600 transition text-left"
                        >
                          {item.icon}
                          <span className="ml-3">{item.name}</span>
                        </button>
                      )
                    ))}
                  </div>
                </>
              ) : (
                <div className="px-4 border-t border-gray-200 pt-4">
                  <Link
                    to="/login"
                    className="block w-full text-center py-2 border border-blue-600 text-blue-600 rounded-lg font-medium mb-2 hover:bg-blue-50 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;