// Simple test middleware - bypasses auth for testing
module.exports = function(req, res, next) {
  console.log('🔑 Test auth middleware - Bypassing authentication');
  
  // Create a fake user for testing
  req.user = {
    id: 'test-user-id-123',
    name: 'Test User',
    email: 'test@example.com'
  };
  
  next();
};