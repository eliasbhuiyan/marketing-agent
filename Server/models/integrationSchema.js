const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const integrationSchema = new mongoose.Schema(
  {
    // References
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BrandSettings",
      required: true,
      index: true,
    },

    // Platform Information
    platform: {
      type: String,
      enum: ["facebook", "instagram", "linkedin", "wordpress", "blogger"],
      required: true,
      index: true,
    },

    // Account Details
    accountId: { type: String, required: true, index: true },
    accountName: { type: String },
    accountUsername: { type: String },

    // Hashed credentials (not reversible)
    accessToken: { type: String, required: true, select: false },
    refreshToken: { type: String, select: false },

    // Token Management
    expiresAt: { type: Date, index: true },
    lastRefreshedAt: { type: Date, default: Date.now },

    // Status Management
    status: {
      type: String,
      enum: ["active", "revoked", "expired", "error"],
      default: "active",
      index: true,
    },

    // Connection Metadata
    connectedAt: { type: Date, default: Date.now },
    lastUsedAt: { type: Date, default: Date.now },

    // Platform-specific Data
    platformData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Error Tracking
    lastError: {
      message: String,
      occurredAt: Date,
      errorCode: String,
    },

    // Retry Logic
    retryCount: { type: Number, default: 0 },
    maxRetries: { type: Number, default: 3 },
  },
  { timestamps: true }
);

// Pre-save middleware to hash sensitive values
integrationSchema.pre("save", async function (next) {
  if (this.isModified("accessToken") && this.accessToken) {
    this.accessToken = await bcrypt.hash(this.accessToken, 10);
  }
  if (this.isModified("refreshToken") && this.refreshToken) {
    this.refreshToken = await bcrypt.hash(this.refreshToken, 10);
  }
  next();
});

// Instance method: compare access token
integrationSchema.methods.compareAccessToken = async function (plainToken) {
  if (!this.accessToken) return false;
  return bcrypt.compare(plainToken, this.accessToken);
};

// Instance method: compare refresh token
integrationSchema.methods.compareRefreshToken = async function (plainToken) {
  if (!this.refreshToken) return false;
  return bcrypt.compare(plainToken, this.refreshToken);
};

// Static method to find active integrations for a brand
integrationSchema.statics.findActiveByBrand = function (brandId) {
  return this.find({ brandId, status: "active" }).select(
    "-accessToken -refreshToken"
  );
};

// Ensure unique integration per user-brand-platform combination
integrationSchema.index({ userId: 1, brandId: 1, platform: 1 }, { unique: true });

module.exports = mongoose.model("Integration", integrationSchema);
