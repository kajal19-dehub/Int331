const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'business', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: ''
  },
  phone: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  googleId: {
    type: String
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  savedBusinesses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);