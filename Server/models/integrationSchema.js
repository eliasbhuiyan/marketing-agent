const mongoose = require("mongoose");

const SocialIntegrationSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BrandSettings",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  platform: {
    type: String,
    enum: ["facebook", "instagram", "linkedin", "wordpress", "medium"],
    required: true
  },
  accountId: { 
    type: String, 
    required: true // Page ID, user ID, or site ID depending on platform
  },
  accessToken: { 
    type: String, 
    required: true 
  },
  refreshToken: { 
    type: String // optional, if platform supports refresh tokens
  },
  tokenExpiry: { 
    type: Date // to track when token will expire
  },
  connectedAt: { 
    type: Date, 
    default: Date.now 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("SocialIntegration", SocialIntegrationSchema);
