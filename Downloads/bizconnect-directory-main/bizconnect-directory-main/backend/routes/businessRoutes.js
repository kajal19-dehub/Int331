const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
//const auth = require('../middleware/auth');
const auth = require('../middleware/testAuth');
const multer = require('multer');
const path = require('path');

// Simple upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ✅ FIXED ROUTE: Create Business (handles both JSON and FormData)
router.post('/', auth, upload.any(), async (req, res) => {
  try {
    console.log('📥 Received request to create business');
    console.log('Request body:', req.body);
    console.log('Files received:', req.files);

    // Extract data from req.body (FormData sends everything as strings)
    const businessData = {
      businessName: req.body.businessName,
      description: req.body.description,
      category: req.body.category,
      email: req.body.email,
      phone: req.body.phone,
      website: req.body.website || '',
      owner: req.user.id
    };

    // Parse address if it's a JSON string
    if (req.body.address && typeof req.body.address === 'string') {
      try {
        businessData.address = JSON.parse(req.body.address);
      } catch (e) {
        // Try to get address from individual fields
        businessData.address = {
          street: req.body['address[street]'] || req.body.street || '',
          city: req.body['address[city]'] || req.body.city || '',
          state: req.body['address[state]'] || req.body.state || '',
          zipCode: req.body['address[zipCode]'] || req.body.zipCode || '',
          country: req.body['address[country]'] || req.body.country || 'USA'
        };
      }
    }

    // Parse other JSON strings
    const parseIfString = (field) => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        try {
          return JSON.parse(req.body[field]);
        } catch (e) {
          return {};
        }
      }
      return req.body[field] || {};
    };

    businessData.subcategory = parseIfString('subcategory');
    businessData.socialMedia = parseIfString('socialMedia');
    businessData.services = parseIfString('services');
    businessData.hours = parseIfString('hours');

    // Handle uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (file.fieldname === 'logo') {
          businessData.logo = `/uploads/${file.filename}`;
        } else if (file.fieldname === 'images') {
          if (!businessData.images) businessData.images = [];
          businessData.images.push(`/uploads/${file.filename}`);
        }
      });
    }

    // ✅ SIMPLIFIED VALIDATION - just check main fields
    const requiredFields = ['businessName', 'description', 'category', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!businessData[field] || businessData[field].trim() === '') {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Create and save business
    const business = new Business(businessData);
    await business.save();

    res.status(201).json({
      success: true,
      message: 'Business created successfully!',
      business: business
    });

  } catch (error) {
    console.error('❌ Error creating business:', error.message);
    
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
  
});