const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Mock reviews data
const reviews = [
  {
    id: '1',
    businessId: '1',
    userId: 'user1',
    rating: 5,
    comment: 'Excellent coffee and service!',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    businessId: '2',
    userId: 'user2',
    rating: 4,
    comment: 'Good service but a bit pricey',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
];

// Get reviews for a business
router.get('/business/:businessId', (req, res) => {
  const businessReviews = reviews.filter(review => review.businessId === req.params.businessId);
  
  // Add mock user data
  const reviewsWithUsers = businessReviews.map(review => ({
    ...review,
    userId: {
      id: review.userId,
      name: review.userId === 'user1' ? 'John Doe' : 'Jane Smith',
      profileImage: '/default-avatar.png'
    }
  }));
  
  res.json(reviewsWithUsers);
});

// Create a review
router.post('/', [
  auth,
  [
    check('businessId', 'Business ID is required').not().isEmpty(),
    check('rating', 'Rating must be between 1 and 5').isInt({ min: 1, max: 5 }),
    check('comment', 'Comment is required').not().isEmpty()
  ]
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { businessId, rating, comment } = req.body;

  // Check if user already reviewed this business
  const existingReview = reviews.find(review => 
    review.businessId === businessId && review.userId === req.user.id
  );

  if (existingReview) {
    return res.status(400).json({ msg: 'You have already reviewed this business' });
  }

  // Create new review
  const review = {
    id: Date.now().toString(),
    businessId,
    userId: req.user.id,
    rating,
    comment,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  reviews.push(review);

  res.status(201).json({
    ...review,
    userId: {
      id: req.user.id,
      name: 'Current User',
      profileImage: '/default-avatar.png'
    }
  });
});

// Update review
router.put('/:id', auth, (req, res) => {
  const index = reviews.findIndex(review => review.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ msg: 'Review not found' });
  }
  
  // Check if user owns the review
  if (reviews[index].userId !== req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  
  reviews[index] = {
    ...reviews[index],
    ...req.body,
    updatedAt: new Date()
  };
  
  res.json(reviews[index]);
});

// Delete review
router.delete('/:id', auth, (req, res) => {
  const index = reviews.findIndex(review => review.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ msg: 'Review not found' });
  }
  
  // Check if user owns the review
  if (reviews[index].userId !== req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  
  reviews.splice(index, 1);
  
  res.json({ msg: 'Review removed' });
});

module.exports = router;
