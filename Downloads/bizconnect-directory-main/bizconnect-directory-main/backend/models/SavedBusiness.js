const mongoose = require('mongoose');

const SavedBusinessSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure a user can save a business only once
SavedBusinessSchema.index({ user: 1, business: 1 }, { unique: true });

module.exports = mongoose.model('SavedBusiness', SavedBusinessSchema);