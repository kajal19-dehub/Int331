import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import OAuthCallback from './pages/OAuthCallback';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';

// Public Pages
import Home from './pages/Home';
import BusinessList from './pages/BusinessList';
import BusinessDetail from './pages/BusinessDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import About from './pages/About';
import Contact from './pages/Contact';

// User Pages
import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import SavedBusinesses from './pages/user/SavedBusinesses';
import MyReviews from './pages/user/MyReviews';

// Business Pages
import BusinessDashboard from './pages/business/Dashboard';
import CreateBusiness from './pages/business/CreateBusiness';
import EditBusiness from './pages/business/EditBusiness';
import BusinessAnalytics from './pages/business/Analytics';
import Categories from './pages/Categories';

// Admin Page
import AdminDashboard from './pages/admin/Dashboard';

// Private Route Component
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
          <Navbar />
          <Alert />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/businesses" element={<BusinessList />} />
               <Route path="/businesses/:id" element={<BusinessDetail />} />
              <Route path="/businesses/:id/edit" element={<EditBusiness />} />
              <Route path="/saved-businesses" element={<SavedBusinesses />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/oauth/callback" element={<OAuthCallback />} />

              {/* User Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute><Dashboard /></PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute><Profile /></PrivateRoute>
              } />
              <Route path="/saved-businesses" element={
                <PrivateRoute><SavedBusinesses /></PrivateRoute>
              } />
              <Route path="/my-reviews" element={
                <PrivateRoute><MyReviews /></PrivateRoute>
              } />

              {/* Business Routes */}
              <Route path="/business/dashboard" element={
                <PrivateRoute role="business"><BusinessDashboard /></PrivateRoute>
              } />
              <Route path="/business/create" element={
                <PrivateRoute><CreateBusiness /></PrivateRoute>
              } />
              <Route path="/business/edit/:id" element={
                <PrivateRoute><EditBusiness /></PrivateRoute>
              } />
              <Route path="/business/analytics" element={
                <PrivateRoute role="business"><BusinessAnalytics /></PrivateRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>
              } />
              <Route path="/" element={
            <div className="p-8">
              <h1 className="text-3xl font-bold">Home</h1>
              <a href="/saved-businesses" className="text-blue-600">Go to Saved Businesses</a>
            </div>
          } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;