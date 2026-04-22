const express = require('express');
const router = express.Router();

// SUPER SIMPLE TEST ENDPOINT - NO VALIDATION, NO AUTH
router.post('/test-create', async (req, res) => {
  console.log("📥 Received at /test-create");
  console.log("Body:", req.body);
  
  // Accept ANY data, no validation
  const business = {
    _id: Date.now(),
    businessName: req.body.businessName || "Test Business",
    description: req.body.description || "Test",
    category: req.body.category || "Test",
    email: req.body.email || "test@test.com",
    phone: req.body.phone || "0000000000",
    address: req.body.address || {},
    createdAt: new Date()
  };
  
  console.log("✅ Created:", business);
  
  res.json({
    success: true,
    message: "Business created!",
    business: business
  });
});

// Test endpoint with NO validation
router.post('/create-business', (req, res) => {
  console.log("✅ SIMPLE CREATE HIT!");
  console.log("Headers:", req.headers['content-type']);
  console.log("Body received:", req.body);
  
  // Accept ANYTHING
  res.json({
    success: true,
    received: req.body,
    message: "Received your data successfully!"
  });
});

module.exports = router;