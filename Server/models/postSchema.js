const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
  integrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Integration",
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
  
  // Content
  content: {
    type: String,
    required: true,
    maxlength: 2000 // Platform-specific limits will be enforced in services
  },
  
  // Media
  mediaUrls: [{
    type: String,
    validate: {
      validator: function(url) {
        return /^https?:\/\/.+/.test(url);
      },
      message: 'Media URL must be a valid HTTP/HTTPS URL'
    }
  }],
  
  // Scheduling
  scheduledAt: {
    type: Date,
    required: true,
    index: true
  },
  publishedAt: {
    type: Date,
    index: true
  },
  
  // Status Management
  status: {
    type: String,
    enum: ["scheduled", "publishing", "published", "failed", "cancelled"],
    default: "scheduled",
    index: true
  },
  
  // Publishing Results
  platformPostId: {
    type: String, // ID returned by the platform (e.g., Facebook post ID)
    index: true
  },
  platformPostUrl: {
    type: String // URL to the published post
  },
  
  // Error Handling
  error: {
    message: String,
    code: String,
    occurredAt: Date,
    retryCount: {
      type: Number,
      default: 0
    },
    maxRetries: {
      type: Number,
      default: 3
    }
  },
  
  // Analytics (populated after publishing)
  analytics: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    lastUpdatedAt: Date
  },
  
  // Metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { 
  timestamps: true,
  indexes: [
    { userId: 1, brandId: 1 }, // User's posts per brand
    { scheduledAt: 1, status: 1 }, // Scheduled posts to process
    { status: 1, createdAt: 1 }, // Recent posts by status
    { platform: 1, status: 1 }, // Platform-specific queries
    { integrationId: 1, status: 1 } // Posts per integration
  ]
});

// Instance method to check if post is ready to publish
postSchema.methods.isReadyToPublish = function() {
  return this.status === 'scheduled' && new Date() >= this.scheduledAt;
};

// Instance method to mark as publishing
postSchema.methods.markAsPublishing = function() {
  this.status = 'publishing';
  return this.save();
};

// Instance method to mark as published
postSchema.methods.markAsPublished = function(platformPostId, platformPostUrl) {
  this.status = 'published';
  this.publishedAt = new Date();
  this.platformPostId = platformPostId;
  this.platformPostUrl = platformPostUrl;
  this.error = undefined; // Clear any previous errors
  return this.save();
};

// Instance method to mark as failed
postSchema.methods.markAsFailed = function(errorMessage, errorCode) {
  this.status = 'failed';
  this.error = {
    message: errorMessage,
    code: errorCode,
    occurredAt: new Date(),
    retryCount: (this.error?.retryCount || 0) + 1
  };
  return this.save();
};

// Static method to find posts ready to publish
postSchema.statics.findReadyToPublish = function() {
  return this.find({
    status: 'scheduled',
    scheduledAt: { $lte: new Date() }
  }).populate('integrationId');
};

// Static method to find posts by brand
postSchema.statics.findByBrand = function(brandId, options = {}) {
  const query = { brandId };
  
  if (options.status) {
    query.status = options.status;
  }
  
  if (options.platform) {
    query.platform = options.platform;
  }
  
  if (options.dateRange) {
    query.scheduledAt = {
      $gte: options.dateRange.start,
      $lte: options.dateRange.end
    };
  }
  
  return this.find(query)
    .populate('integrationId', 'platform accountName accountUsername')
    .sort({ scheduledAt: -1 })
    .limit(options.limit || 50);
};

// Static method to get posting statistics
postSchema.statics.getPostingStats = function(brandId, dateRange) {
  const matchStage = { brandId };
  
  if (dateRange) {
    matchStage.scheduledAt = {
      $gte: dateRange.start,
      $lte: dateRange.end
    };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          platform: '$platform',
          status: '$status'
        },
        count: { $sum: 1 }
      }
    },
    {
      $group: {
        _id: '$_id.platform',
        statuses: {
          $push: {
            status: '$_id.status',
            count: '$count'
          }
        },
        total: { $sum: '$count' }
      }
    }
  ]);
};

module.exports = mongoose.model("Post", postSchema);
