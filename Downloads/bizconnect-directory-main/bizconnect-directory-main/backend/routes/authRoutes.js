const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-change-this';

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};
// Verify OAuth token endpoint
router.post('/verify-oauth', (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ 
        success: false, 
        message: 'Token is required' 
      });
    }

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret-change-this');
      
      // Return success with decoded data
      res.json({
        success: true,
        user: {
          _id: decoded.id,
          email: decoded.email,
          name: decoded.name
        },
        token: token
      });
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});
// Google OAuth
router.get('/google', (req, res, next) => {
  console.log('🔗 Google OAuth initiated');
  next();
}, passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

// Google Callback
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:3000/login?error=oauth_failed',
    failureMessage: true
  }),
  (req, res) => {
    try {
      console.log('✅ Google OAuth successful for:', req.user.email);
      
      const token = generateToken(req.user);
      const userData = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      };
      
      const redirectUrl = `http://localhost:3000/oauth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
      
      console.log('🔄 Redirecting to:', redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('❌ Google callback error:', error);
      res.redirect('http://localhost:3000/login?error=server_error');
    }
  }
);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth API is working' });
});

module.exports = router;