const mongoose = require("mongoose");
const crypto = require("crypto");

// Encryption utility functions
const algorithm = 'aes-256-gcm';
const secretKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, secretKey);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    encrypted,
    iv: iv.toString('hex')
  };
}

function decrypt(encryptedData) {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const integrationSchema = new mongoose.Schema({
  // References
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BrandSettings", 
    required: true,
    index: true
  },
  
  // Platform Information
  platform: {
    type: String,
    enum: ["facebook", "instagram", "linkedin", "wordpress", "medium"],
    required: true,
    index: true
  },
  
  // Account Details
  accountId: { 
    type: String, 
    required: true,
    index: true // Page ID, user ID, or site ID depending on platform
  },
  accountName: {
    type: String, // Human-readable account name (e.g., "My Facebook Page")
    required: false
  },
  accountUsername: {
    type: String, // Username or handle (e.g., "@mybrand")
    required: false
  },
  
  // Encrypted Tokens
  accessToken: { 
    type: String, 
    required: true,
    select: false // Don't include in default queries for security
  },
  refreshToken: { 
    type: String,
    select: false // Don't include in default queries for security
  },
  
  // Token Management
  expiresAt: { 
    type: Date,
    index: true // Index for efficient expiry queries
  },
  lastRefreshedAt: {
    type: Date,
    default: Date.now
  },
  
  // Status Management
  status: {
    type: String,
    enum: ["active", "revoked", "expired", "error"],
    default: "active",
    index: true
  },
  
  // Connection Metadata
  connectedAt: { 
    type: Date, 
    default: Date.now 
  },
  lastUsedAt: {
    type: Date,
    default: Date.now
  },
  
  // Platform-specific Data
  platformData: {
    type: mongoose.Schema.Types.Mixed, // Store platform-specific info like page permissions, etc.
    default: {}
  },
  
  // Error Tracking
  lastError: {
    message: String,
    occurredAt: Date,
    errorCode: String
  },
  
  // Retry Logic
  retryCount: {
    type: Number,
    default: 0
  },
  maxRetries: {
    type: Number,
    default: 3
  }
}, { 
  timestamps: true,
  // Compound indexes for efficient queries
  indexes: [
    { userId: 1, brandId: 1, platform: 1 }, // Unique per user-brand-platform
    { brandId: 1, status: 1 }, // Active integrations per brand
    { expiresAt: 1, status: 1 }, // Expired tokens to refresh
    { platform: 1, status: 1 } // Platform-specific queries
  ]
});

// Pre-save middleware to encrypt tokens
integrationSchema.pre('save', function(next) {
  if (this.isModified('accessToken') && this.accessToken) {
    const encrypted = encrypt(this.accessToken);
    this.accessToken = JSON.stringify(encrypted);
  }
  
  if (this.isModified('refreshToken') && this.refreshToken) {
    const encrypted = encrypt(this.refreshToken);
    this.refreshToken = JSON.stringify(encrypted);
  }
  
  next();
});

// Instance method to decrypt tokens
integrationSchema.methods.getDecryptedTokens = function() {
  let accessToken = null;
  let refreshToken = null;
  
  try {
    if (this.accessToken) {
      const encryptedData = JSON.parse(this.accessToken);
      accessToken = decrypt(encryptedData);
    }
    
    if (this.refreshToken) {
      const encryptedData = JSON.parse(this.refreshToken);
      refreshToken = decrypt(encryptedData);
    }
  } catch (error) {
    console.error('Token decryption failed:', error);
  }
  
  return { accessToken, refreshToken };
};

// Instance method to check if token is expired
integrationSchema.methods.isTokenExpired = function() {
  if (!this.expiresAt) return false;
  return new Date() >= this.expiresAt;
};

// Instance method to check if token needs refresh (refresh 1 hour before expiry)
integrationSchema.methods.needsRefresh = function() {
  if (!this.expiresAt) return false;
  const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
  return oneHourFromNow >= this.expiresAt;
};

// Static method to find active integrations for a brand
integrationSchema.statics.findActiveByBrand = function(brandId) {
  return this.find({ 
    brandId, 
    status: 'active' 
  }).select('-accessToken -refreshToken'); // Exclude sensitive data
};

// Static method to find integrations needing token refresh
integrationSchema.statics.findNeedingRefresh = function() {
  return this.find({
    status: 'active',
    expiresAt: { $lte: new Date(Date.now() + 60 * 60 * 1000) }, // Expires within 1 hour
    refreshToken: { $exists: true, $ne: null }
  });
};

// Ensure unique integration per user-brand-platform combination
integrationSchema.index({ userId: 1, brandId: 1, platform: 1 }, { unique: true });

module.exports = mongoose.model("Integration", integrationSchema);
