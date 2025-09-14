const Integration = require('../models/integrationSchema');
const Post = require('../models/postSchema');
const postingService = require('../services/postingService');
const queueService = require('../services/queueService');
const FacebookService = require('../services/integrations/facebookService');
const InstagramService = require('../services/integrations/instagramService');
const WordPressService = require('../services/integrations/wordpressService');
const MediumService = require('../services/integrations/mediumService');

// Platform service mapping
const platformServices = {
  facebook: FacebookService,
  instagram: InstagramService,
  wordpress: WordPressService,
  medium: MediumService
};

// Get all integrations for the current brand
const getIntegrations = async (req, res) => {
  try {
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    const integrations = await Integration.findActiveByBrand(brandId);

    res.status(200).json({
      message: 'Integrations fetched successfully',
      integrations
    });
  } catch (error) {
    console.error('Error fetching integrations:', error);
    res.status(500).json({ error: 'Failed to fetch integrations' });
  }
};

// Get integration details (including connection status)
const getIntegrationDetails = async (req, res) => {
  try {
    const { platform } = req.params;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    const integration = await Integration.findOne({
      brandId,
      userId: req.user._id,
      platform: platform
    });

    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    // Check if token is still valid
    const ServiceClass = platformServices[platform];
    if (ServiceClass) {
      try {
        const service = new ServiceClass();
        const { accessToken } = integration.getDecryptedTokens();
        const isValid = await service.validateToken(accessToken);
        
        if (!isValid && integration.refreshToken) {
          // Try to refresh the token
          const { refreshToken } = integration.getDecryptedTokens();
          const refreshedTokens = await service.refreshAccessToken(refreshToken);
          integration.accessToken = refreshedTokens.accessToken;
          integration.refreshToken = refreshedTokens.refreshToken;
          integration.expiresAt = refreshedTokens.expiresIn ? 
            new Date(Date.now() + refreshedTokens.expiresIn * 1000) : null;
          integration.status = 'active';
          await integration.save();
        }
      } catch (error) {
        console.error(`Token validation failed for ${platform}:`, error);
        integration.status = 'error';
        integration.lastError = {
          message: error.message,
          occurredAt: new Date(),
          errorCode: 'VALIDATION_FAILED'
        };
        await integration.save();
      }
    }

    // Return integration details without sensitive tokens
    const integrationData = {
      _id: integration._id,
      platform: integration.platform,
      accountId: integration.accountId,
      accountName: integration.accountName,
      accountUsername: integration.accountUsername,
      connectedAt: integration.connectedAt,
      lastUsedAt: integration.lastUsedAt,
      status: integration.status,
      expiresAt: integration.expiresAt,
      isTokenExpired: integration.isTokenExpired(),
      needsRefresh: integration.needsRefresh()
    };

    res.status(200).json({
      message: 'Integration details fetched successfully',
      integration: integrationData
    });
  } catch (error) {
    console.error('Error fetching integration details:', error);
    res.status(500).json({ error: 'Failed to fetch integration details' });
  }
};

// Initiate OAuth flow for a platform
const initiateOAuth = async (req, res) => {
  try {
    const { platform } = req.params;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    if (!platformServices[platform]) {
      return res.status(400).json({ error: 'Unsupported platform' });
    }

    const ServiceClass = platformServices[platform];
    const service = new ServiceClass();
    
    // Generate state parameter for security
    const state = `${req.user._id}_${brandId}_${Date.now()}`;
    
    const authURL = service.generateAuthURL(state);
    
    res.status(200).json({
      message: 'OAuth URL generated successfully',
      authURL,
      state
    });
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    res.status(500).json({ error: 'Failed to initiate OAuth flow' });
  }
};

// Handle OAuth callback
const handleOAuthCallback = async (req, res) => {
  try {
    const { platform } = req.params;
    const { code, state, error } = req.query;
    
    if (error) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?error=${encodeURIComponent(error)}`);
    }

    if (!code || !state) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?error=missing_parameters`);
    }

    // Parse state to get user and brand info
    const [userId, brandId, timestamp] = state.split('_');
    
    if (!userId || !brandId) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?error=invalid_state`);
    }

    const ServiceClass = platformServices[platform];
    if (!ServiceClass) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?error=unsupported_platform`);
    }

    const service = new ServiceClass();
    
    // Exchange code for tokens
    const tokens = await service.exchangeCodeForToken(code);
    
    // Get user profile to get account ID
    const userProfile = await service.getUserProfile(tokens.accessToken);
    
    // Check if integration already exists
    let integration = await SocialIntegration.findOne({
      brand: brandId,
      user: userId,
      platform: platform
    });

    const integrationData = {
      brand: brandId,
      user: userId,
      platform: platform,
      accountId: userProfile.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenExpiry: tokens.expiresIn ? new Date(Date.now() + tokens.expiresIn * 1000) : null,
      isActive: true
    };

    if (integration) {
      // Update existing integration
      Object.assign(integration, integrationData);
      await integration.save();
    } else {
      // Create new integration
      integration = await SocialIntegration.create(integrationData);
    }

    res.redirect(`${process.env.CLIENT_URL}/settings?success=${platform}_connected`);
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    res.redirect(`${process.env.CLIENT_URL}/settings?error=connection_failed`);
  }
};

// Disconnect an integration
const disconnectIntegration = async (req, res) => {
  try {
    const { platform } = req.params;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    const integration = await SocialIntegration.findOne({
      brand: brandId,
      user: req.user._id,
      platform: platform
    });

    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    // Optionally revoke the token with the platform
    try {
      const ServiceClass = platformServices[platform];
      if (ServiceClass) {
        const service = new ServiceClass();
        await service.revokeToken(integration.accessToken);
      }
    } catch (error) {
      console.error(`Failed to revoke token for ${platform}:`, error);
      // Continue with deletion even if revocation fails
    }

    await SocialIntegration.findByIdAndDelete(integration._id);

    res.status(200).json({
      message: 'Integration disconnected successfully'
    });
  } catch (error) {
    console.error('Error disconnecting integration:', error);
    res.status(500).json({ error: 'Failed to disconnect integration' });
  }
};

// Publish content to a platform
const publishContent = async (req, res) => {
  try {
    const { platform } = req.params;
    const { content, mediaUrls = [] } = req.body;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const integration = await SocialIntegration.findOne({
      brand: brandId,
      user: req.user._id,
      platform: platform,
      isActive: true
    });

    if (!integration) {
      return res.status(404).json({ error: 'Active integration not found for this platform' });
    }

    const ServiceClass = platformServices[platform];
    if (!ServiceClass) {
      return res.status(400).json({ error: 'Unsupported platform' });
    }

    const service = new ServiceClass();
    
    // Check and refresh token if needed
    let accessToken = integration.accessToken;
    if (integration.refreshToken) {
      try {
        const isValid = await service.validateToken(accessToken);
        if (!isValid) {
          const refreshedTokens = await service.refreshAccessToken(integration.refreshToken);
          accessToken = refreshedTokens.accessToken;
          integration.accessToken = refreshedTokens.accessToken;
          integration.refreshToken = refreshedTokens.refreshToken;
          integration.tokenExpiry = new Date(Date.now() + refreshedTokens.expiresIn * 1000);
          await integration.save();
        }
      } catch (error) {
        console.error(`Token refresh failed for ${platform}:`, error);
        return res.status(401).json({ error: 'Authentication failed' });
      }
    }

    // Publish content
    const result = await service.publishContent({
      content,
      mediaUrls,
      accessToken
    });

    res.status(200).json({
      message: 'Content published successfully',
      result
    });
  } catch (error) {
    console.error('Error publishing content:', error);
    res.status(500).json({ error: 'Failed to publish content' });
  }
};

// Test integration connection
const testConnection = async (req, res) => {
  try {
    const { platform } = req.params;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    const integration = await SocialIntegration.findOne({
      brand: brandId,
      user: req.user._id,
      platform: platform
    });

    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    const ServiceClass = platformServices[platform];
    if (!ServiceClass) {
      return res.status(400).json({ error: 'Unsupported platform' });
    }

    const service = new ServiceClass();
    const isValid = await service.validateToken(integration.accessToken);

    res.status(200).json({
      message: 'Connection test completed',
      isConnected: isValid,
      platform: platform
    });
  } catch (error) {
    console.error('Error testing connection:', error);
    res.status(500).json({ error: 'Failed to test connection' });
  }
};

// Enhanced publish content with scheduling support
const publishContentEnhanced = async (req, res) => {
  try {
    const { platform, content, mediaUrls = [], scheduledAt } = req.body;
    const userId = req.user._id;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Use posting service for enhanced functionality
    const result = await postingService.postToPlatform(
      platform,
      content,
      mediaUrls,
      scheduledAt,
      userId,
      brandId
    );

    res.status(200).json({
      message: 'Content published successfully',
      result
    });
  } catch (error) {
    console.error('Error publishing content:', error);
    res.status(500).json({ error: 'Failed to publish content', details: error.message });
  }
};

// Publish to multiple platforms
const publishToMultiplePlatforms = async (req, res) => {
  try {
    const { platforms, content, mediaUrls = [], scheduledAt } = req.body;
    const userId = req.user._id;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    if (!platforms || platforms.length === 0) {
      return res.status(400).json({ error: 'At least one platform is required' });
    }

    const result = await postingService.postToMultiplePlatforms(
      platforms,
      content,
      mediaUrls,
      scheduledAt,
      userId,
      brandId
    );

    res.status(200).json({
      message: 'Content published to multiple platforms',
      result
    });
  } catch (error) {
    console.error('Error publishing to multiple platforms:', error);
    res.status(500).json({ error: 'Failed to publish content', details: error.message });
  }
};

// Get posting statistics
const getPostingStats = async (req, res) => {
  try {
    const brandId = req.user.brandId;
    const { startDate, endDate } = req.query;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    const dateRange = startDate && endDate ? {
      start: new Date(startDate),
      end: new Date(endDate)
    } : null;

    const stats = await postingService.getPostingStats(brandId, dateRange);

    res.status(200).json({
      message: 'Posting statistics fetched successfully',
      stats
    });
  } catch (error) {
    console.error('Error fetching posting stats:', error);
    res.status(500).json({ error: 'Failed to fetch posting statistics' });
  }
};

// Get brand posts
const getBrandPosts = async (req, res) => {
  try {
    const brandId = req.user.brandId;
    const { status, platform, limit = 50, page = 1 } = req.query;
    
    if (!brandId) {
      return res.status(400).json({ error: 'No active brand selected' });
    }

    const options = {
      status,
      platform,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    };

    const posts = await postingService.getBrandPosts(brandId, options);

    res.status(200).json({
      message: 'Posts fetched successfully',
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: posts.length
      }
    });
  } catch (error) {
    console.error('Error fetching brand posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Cancel scheduled post
const cancelScheduledPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const result = await postingService.cancelScheduledPost(postId, userId);

    res.status(200).json({
      message: 'Post cancelled successfully',
      result
    });
  } catch (error) {
    console.error('Error cancelling scheduled post:', error);
    res.status(500).json({ error: 'Failed to cancel post', details: error.message });
  }
};

// Get queue statistics
const getQueueStats = async (req, res) => {
  try {
    const stats = await queueService.getQueueStats();

    res.status(200).json({
      message: 'Queue statistics fetched successfully',
      stats
    });
  } catch (error) {
    console.error('Error fetching queue stats:', error);
    res.status(500).json({ error: 'Failed to fetch queue statistics' });
  }
};

module.exports = {
  getIntegrations,
  getIntegrationDetails,
  initiateOAuth,
  handleOAuthCallback,
  disconnectIntegration,
  publishContent,
  publishContentEnhanced,
  publishToMultiplePlatforms,
  getPostingStats,
  getBrandPosts,
  cancelScheduledPost,
  getQueueStats,
  testConnection
};
