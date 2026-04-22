const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock users data
const users = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    profileImage: '/default-avatar.png',
    businessId: '1',
    createdAt: new Date()
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'business',
    profileImage: '/default-avatar.png',
    businessId: null,
    createdAt: new Date()
  }
];

// Get user profile
router.get('/profile', auth, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  
  // Don't send password
  const { password, ...userData } = user;
  res.json(userData);
});

// Update user profile
router.put('/profile', auth, (req, res) => {
  const index = users.findIndex(u => u.id === req.user.id);
  
  if (index === -1) {
    return res.status(404).json({ msg: 'User not found' });
  }
  
  users[index] = {
    ...users[index],
    ...req.body,
    updatedAt: new Date()
  };
  
  // Don't send password
  const { password, ...userData } = users[index];
  res.json(userData);
});

// Save business
router.post('/save-business/:businessId', auth, (req, res) => {
  res.json({ 
    msg: 'Business saved successfully',
    businessId: req.params.businessId 
  });
});

// Get saved businesses
router.get('/saved-businesses', auth, (req, res) => {
  // Mock saved businesses
  const savedBusinesses = [
    {
      id: '1',
      name: 'The Coffee Corner',
      description: 'Cozy coffee shop with artisanal brews and pastries',
      category: 'restaurant',
      rating: 4.8,
      reviews: 124,
      address: {
        city: 'New York',
        state: 'NY'
      }
    },
    {
      id: '2',
      name: 'Tech Solutions Inc',
      description: 'Professional IT services and computer repair',
      category: 'service',
      rating: 4.9,
      reviews: 89,
      address: {
        city: 'San Francisco',
        state: 'CA'
      }
    }
  ];
  
  res.json(savedBusinesses);
});

module.exports = router;