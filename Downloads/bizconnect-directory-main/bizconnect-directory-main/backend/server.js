require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); 
const passport = require('passport');
require('./config/passport'); // Add this line
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const testRoutes = require('./routes/testRoutes');
// Load environment variables


const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bizconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'BizConnect API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      businesses: '/api/businesses',
      reviews: '/api/reviews',
      users: '/api/users'
    }
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/businesses', require('./routes/business'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: 'The requested API endpoint does not exist'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Server error',
    message: 'Something went wrong on the server'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📄 API Documentation: http://localhost:${PORT}`);
  console.log(`🔗 API Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/businesses`);
  console.log(`   GET  http://localhost:${PORT}/api/businesses/:id`);
  console.log(`   POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
});