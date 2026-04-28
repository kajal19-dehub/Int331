const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  requiredSkills: {
    type: [String],
    required: true
  },

  duration: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["open", "closed", "in-progress"],
    default: "open"
  },

  ngo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("Opportunity", opportunitySchema);