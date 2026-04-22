const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-change-this';
const FRONTEND_URL =
  process.env.FRONTEND_URL || 'http://localhost:3000';

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
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-jwt-secret-change-this'
      );

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

router.get(
  '/google',
  (req, res, next) => {
    console.log('🔗 Google OAuth initiated');
    next();
  },
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/login?error=oauth_failed`,
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

      const redirectUrl = `${FRONTEND_URL}/oauth/callback?token=${token}&user=${encodeURIComponent(
        JSON.stringify(userData)
      )}`;

      console.log('🔄 Redirecting to:', redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('❌ Google callback error:', error);
      res.redirect(`${FRONTEND_URL}/login?error=server_error`);
    }
  }
);

router.get('/test', (req, res) => {
  res.json({ message: 'Auth API is working' });
});

module.exports = router;