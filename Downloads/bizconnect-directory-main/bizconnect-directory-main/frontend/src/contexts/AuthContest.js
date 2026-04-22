import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = () => {
    window.location.href =
      'https://bizconnect-directory-4.onrender.com/api/auth/google';
  };

  const signInWithGithub = () => {
    console.warn('GitHub login is not configured yet.');
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signOut,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};