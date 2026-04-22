import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setUserFromOAuth } from '../redux/slices/authSlice'; // Import new action

const OAuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOAuthCallback = () => {
      console.log('🔑 OAuth Callback - Starting...');
      
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      const encodedUser = queryParams.get('user');
      
      if (!token) {
        console.error('❌ No token received');
        navigate('/login', { state: { error: 'Authentication failed' } });
        return;
      }
      
      try {
        // Decode user data
        let user = null;
        if (encodedUser) {
          try {
            user = JSON.parse(decodeURIComponent(encodedUser));
            console.log('✅ Decoded user:', user);
          } catch (error) {
            console.warn('⚠️ Could not decode user data:', error);
          }
        }
        
        // If no user data, extract from JWT
        if (!user && token) {
          try {
            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            user = {
              _id: decodedPayload.id,
              email: decodedPayload.email,
              name: decodedPayload.name
            };
            console.log('✅ Extracted user from JWT:', user);
          } catch (error) {
            console.warn('⚠️ Could not extract user from JWT:', error);
          }
        }
        
        // Store in localStorage
        localStorage.setItem('token', token);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        
        // Update Redux store
        if (user && token) {
          dispatch(setUserFromOAuth({
            user: user,
            token: token
          }));
          console.log('✅ Redux store updated with OAuth user');
        }
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
        
      } catch (error) {
        console.error('❌ OAuth callback error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { 
          state: { 
            error: 'Login failed. Please try again.'
          } 
        });
      }
    };

    handleOAuthCallback();
  }, [dispatch, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing login...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;