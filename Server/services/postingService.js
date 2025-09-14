const Integration = require('../models/integrationSchema');
const Post = require('../models/postSchema');
const FacebookService = require('./integrations/facebookService');
const InstagramService = require('./integrations/instagramService');
const WordPressService = require('./integrations/wordpressService');
const MediumService = require('./integrations/mediumService');
const LinkedInService = require('./integrations/linkedinService');

// Platform service mapping
const platformServices = {
  facebook: FacebookService,
  instagram: InstagramService,
  wordpress: WordPressService,
  medium: MediumService,
  linkedin: LinkedInService
};

class PostingService {
  constructor() {
    this.maxRetries = 3;
    this.retryDelay = 5000; // 5 seconds
  }

  /**
   * Post content to a specific platform
   */
  async postToPlatform(platform, content, mediaUrls = [], scheduledAt = null, userId = null, brandId = null) {
    try {
      // Validate input
      this.validatePostData(platform, content, mediaUrls);

      // If scheduledAt is provided, create a scheduled post
      if (scheduledAt && new Date(scheduledAt) > new Date()) {
        return await this.createScheduledPost({
          platform,
          content,
          mediaUrls,
          scheduledAt,
          userId,
          brandId
        });
      }

      // Post immediately
      return await this.publishImmediately(platform, content, mediaUrls, userId, brandId);

    } catch (error) {
      console.error('Error in postToPlatform:', error);
      throw error;
    }
  }

  /**
   * Post to multiple platforms simultaneously
   */
  async postToMultiplePlatforms(platforms, content, mediaUrls = [], scheduledAt = null, userId = null, brandId = null) {
    try {
      const results = await Promise.allSettled(
        platforms.map(platform => 
          this.postToPlatform(platform, content, mediaUrls, scheduledAt, userId, brandId)
        )
      );

      const successful = [];
      const failed = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successful.push({
            platform: platforms[index],
            result: result.value
          });
        } else {
          failed.push({
            platform: platforms[index],
            error: result.reason.message
          });
        }
      });

      return {
        successful,
        failed,
        total: platforms.length
      };

    } catch (error) {
      console.error('Error in postToMultiplePlatforms:', error);
      throw error;
    }
  }

  /**
   * Create a scheduled post
   */
  async createScheduledPost({ platform, content, mediaUrls, scheduledAt, userId, brandId }) {
    try {
      // Find active integration for the platform
      const integration = await this.findActiveIntegration(platform, userId, brandId);

      // Create post record
      const post = new Post({
        userId,
        brandId,
        integrationId: integration._id,
        platform,
        content,
        mediaUrls,
        scheduledAt: new Date(scheduledAt),
        status: 'scheduled'
      });

      await post.save();

      // Add to queue for processing
      await this.addToQueue(post);

      return {
        success: true,
        postId: post._id,
        scheduledAt: post.scheduledAt,
        status: 'scheduled',
        message: 'Post scheduled successfully'
      };

    } catch (error) {
      console.error('Error creating scheduled post:', error);
      throw error;
    }
  }

  /**
   * Publish content immediately
   */
  async publishImmediately(platform, content, mediaUrls, userId, brandId) {
    try {
      // Find active integration
      const integration = await this.findActiveIntegration(platform, userId, brandId);

      // Create post record
      const post = new Post({
        userId,
        brandId,
        integrationId: integration._id,
        platform,
        content,
        mediaUrls,
        scheduledAt: new Date(),
        status: 'publishing'
      });

      await post.save();

      // Publish immediately
      const result = await this.publishPost(post);

      return result;

    } catch (error) {
      console.error('Error publishing immediately:', error);
      throw error;
    }
  }

  /**
   * Publish a post using the appropriate platform service
   */
  async publishPost(post) {
    try {
      // Mark as publishing
      await post.markAsPublishing();

      // Get integration with decrypted tokens
      const integration = await Integration.findById(post.integrationId);
      if (!integration) {
        throw new Error('Integration not found');
      }

      const { accessToken } = integration.getDecryptedTokens();
      if (!accessToken) {
        throw new Error('No access token available');
      }

      // Get platform service
      const ServiceClass = platformServices[post.platform];
      if (!ServiceClass) {
        throw new Error(`No service found for platform: ${post.platform}`);
      }

      const service = new ServiceClass();

      // Publish content
      const publishResult = await service.publishContent({
        content: post.content,
        mediaUrls: post.mediaUrls,
        accessToken
      });

      // Mark as published
      await post.markAsPublished(
        publishResult.postId || publishResult.id,
        publishResult.url
      );

      // Update integration last used
      integration.lastUsedAt = new Date();
      await integration.save();

      return {
        success: true,
        postId: post._id,
        platformPostId: publishResult.postId || publishResult.id,
        platformPostUrl: publishResult.url,
        publishedAt: post.publishedAt,
        status: 'published'
      };

    } catch (error) {
      console.error('Error publishing post:', error);
      
      // Mark as failed
      await post.markAsFailed(error.message, error.code || 'PUBLISH_FAILED');

      throw error;
    }
  }

  /**
   * Process scheduled posts (called by queue worker)
   */
  async processScheduledPosts() {
    try {
      console.log('Processing scheduled posts...');

      const scheduledPosts = await Post.findReadyToPublish();
      
      if (scheduledPosts.length === 0) {
        console.log('No posts ready to publish');
        return { processed: 0, successful: 0, failed: 0 };
      }

      console.log(`Found ${scheduledPosts.length} posts ready to publish`);

      const results = await Promise.allSettled(
        scheduledPosts.map(post => this.publishPost(post))
      );

      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      console.log(`Scheduled posts processed: ${successful} successful, ${failed} failed`);

      return {
        processed: scheduledPosts.length,
        successful,
        failed
      };

    } catch (error) {
      console.error('Error processing scheduled posts:', error);
      throw error;
    }
  }

  /**
   * Retry failed posts
   */
  async retryFailedPosts() {
    try {
      const failedPosts = await Post.find({
        status: 'failed',
        'error.retryCount': { $lt: 3 } // Less than max retries
      }).populate('integrationId');

      if (failedPosts.length === 0) {
        console.log('No failed posts to retry');
        return { retried: 0, successful: 0, failed: 0 };
      }

      console.log(`Retrying ${failedPosts.length} failed posts`);

      const results = await Promise.allSettled(
        failedPosts.map(post => this.publishPost(post))
      );

      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;

      console.log(`Failed posts retried: ${successful} successful, ${failed} still failed`);

      return {
        retried: failedPosts.length,
        successful,
        failed
      };

    } catch (error) {
      console.error('Error retrying failed posts:', error);
      throw error;
    }
  }

  /**
   * Get posting statistics
   */
  async getPostingStats(brandId, dateRange = null) {
    try {
      const stats = await Post.getPostingStats(brandId, dateRange);
      
      const totalPosts = await Post.countDocuments({ brandId });
      const scheduledPosts = await Post.countDocuments({ 
        brandId, 
        status: 'scheduled',
        scheduledAt: { $gte: new Date() }
      });

      return {
        platformStats: stats,
        totalPosts,
        scheduledPosts,
        dateRange
      };

    } catch (error) {
      throw new Error(`Failed to get posting stats: ${error.message}`);
    }
  }

  /**
   * Find active integration for platform
   */
  async findActiveIntegration(platform, userId, brandId) {
    const integration = await Integration.findOne({
      userId,
      brandId,
      platform,
      status: 'active'
    });

    if (!integration) {
      throw new Error(`No active ${platform} integration found for this brand`);
    }

    // Check if token is expired
    if (integration.isTokenExpired()) {
      throw new Error(`${platform} integration token has expired. Please reconnect your account.`);
    }

    return integration;
  }

  /**
   * Validate post data
   */
  validatePostData(platform, content, mediaUrls) {
    if (!content || content.trim().length === 0) {
      throw new Error('Content is required');
    }

    // Platform-specific validation
    const platformLimits = {
      facebook: { maxLength: 63206, maxMedia: 10 },
      instagram: { maxLength: 2200, maxMedia: 10, requiresMedia: true },
      linkedin: { maxLength: 3000, maxMedia: 9 },
      wordpress: { maxLength: 10000, maxMedia: 0 },
      medium: { maxLength: 10000, maxMedia: 0 }
    };

    const limits = platformLimits[platform];
    if (!limits) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    if (content.length > limits.maxLength) {
      throw new Error(`Content exceeds ${platform} limit of ${limits.maxLength} characters`);
    }

    if (limits.requiresMedia && mediaUrls.length === 0) {
      throw new Error(`${platform} requires at least one media file`);
    }

    if (mediaUrls.length > limits.maxMedia) {
      throw new Error(`Too many media files for ${platform}. Maximum: ${limits.maxMedia}`);
    }

    // Validate media URLs
    mediaUrls.forEach((url, index) => {
      if (!this.isValidUrl(url)) {
        throw new Error(`Invalid media URL at index ${index}: ${url}`);
      }
    });
  }

  /**
   * Validate URL
   */
  isValidUrl(url) {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  }

  /**
   * Add post to queue (placeholder for queue system)
   */
  async addToQueue(post) {
    // This would integrate with your queue system (BullMQ, Agenda, etc.)
    console.log(`Added post ${post._id} to queue for ${post.scheduledAt}`);
    
    // For now, we'll use a simple setTimeout for demonstration
    const delay = post.scheduledAt.getTime() - Date.now();
    if (delay > 0) {
      setTimeout(async () => {
        try {
          await this.publishPost(post);
        } catch (error) {
          console.error(`Failed to publish scheduled post ${post._id}:`, error);
        }
      }, delay);
    }
  }

  /**
   * Cancel a scheduled post
   */
  async cancelScheduledPost(postId, userId) {
    try {
      const post = await Post.findOne({
        _id: postId,
        userId,
        status: 'scheduled'
      });

      if (!post) {
        throw new Error('Scheduled post not found or already processed');
      }

      post.status = 'cancelled';
      await post.save();

      return {
        success: true,
        message: 'Post cancelled successfully'
      };

    } catch (error) {
      throw new Error(`Failed to cancel post: ${error.message}`);
    }
  }

  /**
   * Get posts for a brand
   */
  async getBrandPosts(brandId, options = {}) {
    try {
      const posts = await Post.findByBrand(brandId, options);
      return posts;
    } catch (error) {
      throw new Error(`Failed to get brand posts: ${error.message}`);
    }
  }
}

// Create singleton instance
const postingService = new PostingService();

module.exports = postingService;
