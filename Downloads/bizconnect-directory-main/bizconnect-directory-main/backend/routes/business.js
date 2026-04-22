const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Mock data
const businesses = [
  {
    id: '1',
    userId: 'user1',
    businessName: 'The Coffee Corner',
    description: 'Cozy coffee shop with artisanal brews and pastries',
    category: 'restaurant',
    email: 'coffee@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    averageRating: 4.8,
    totalReviews: 124,
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    userId: 'user2',
    businessName: 'Tech Solutions Inc',
    description: 'Professional IT services and computer repair',
    category: 'service',
    email: 'tech@example.com',
    phone: '+1 (555) 987-6543',
    address: {
      street: '456 Tech Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107'
    },
    averageRating: 4.9,
    totalReviews: 89,
    images: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Get all businesses
router.get('/', (req, res) => {
  const { category, search, city, minRating, page = 1, limit = 10 } = req.query;
  
  let filtered = [...businesses];
  
  // Apply filters
  if (category) {
    filtered = filtered.filter(b => b.category === category);
  }
  
  if (city) {
    filtered = filtered.filter(b => b.address.city.toLowerCase().includes(city.toLowerCase()));
  }
  
  if (minRating) {
    filtered = filtered.filter(b => b.averageRating >= parseFloat(minRating));
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(b => 
      b.businessName.toLowerCase().includes(searchLower) ||
      b.description.toLowerCase().includes(searchLower)
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginated = filtered.slice(startIndex, endIndex);
  
  res.json({
    businesses: paginated,
    totalPages: Math.ceil(filtered.length / limit),
    currentPage: parseInt(page),
    total: filtered.length
  });
});

// Get business by ID
router.get('/:id', (req, res) => {
  const business = businesses.find(b => b.id === req.params.id);
  
  if (!business) {
    return res.status(404).json({ msg: 'Business not found' });
  }
  
  // Mock reviews
  const reviews = [
    {
      id: '1',
      businessId: req.params.id,
      userId: 'user1',
      userName: 'John Doe',
      userImage: '/default-avatar.png',
      rating: 5,
      comment: 'Excellent service! Highly recommended.',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      businessId: req.params.id,
      userId: 'user2',
      userName: 'Jane Smith',
      userImage: '/default-avatar.png',
      rating: 4,
      comment: 'Good quality but a bit pricey.',
      createdAt: new Date('2024-01-10')
    }
  ];
  
  res.json({ business, reviews });
});

// Create business
router.post('/', [
  auth,
  [
    check('businessName', 'Business name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty()
  ]
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const businessData = req.body;
  businessData.id = Date.now().toString();
  businessData.owner = req.user ? req.user.id : 'test-user-id-123';
  businessData.averageRating = 0;
  businessData.totalReviews = 0;
  businessData.createdAt = new Date();
  businessData.updatedAt = new Date();
  
  businesses.push(businessData);
  
  res.status(201).json(businessData);
});

// Update business
router.put('/:id', auth, (req, res) => {
  const index = businesses.findIndex(b => b.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ msg: 'Business not found' });
  }
  
  // Check if user owns the business
  if (businesses[index].userId !== req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  
  businesses[index] = {
    ...businesses[index],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(businesses[index]);
});

// Delete business
router.delete('/:id', auth, (req, res) => {
  const index = businesses.findIndex(b => b.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ msg: 'Business not found' });
  }
  
  // Check if user owns the business
  if (businesses[index].userId !== req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  
  businesses.splice(index, 1);
  
  res.json({ msg: 'Business removed' });
});

module.exports = router;