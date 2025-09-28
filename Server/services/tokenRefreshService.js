const Integration = require('../models/integrationSchema');
const FacebookService = require('./integrations/facebookService');
const InstagramService = require('./integrations/instagramService');
const WordPressService = require('./integrations/wordpressService');
const LinkedInService = require('./integrations/linkedinService');

// Platform service mapping
const platformServices = {
  facebook: FacebookService,
  instagram: InstagramService,
  wordpress: WordPressService,
  linkedin: LinkedInService
};

class TokenRefreshService {
  constructor() {
    this.isRunning = false;
    this.refreshInterval = 5 * 60 * 1000; // Check every 5 minutes
    this.intervalId = null;
  }

  /**
   * Start the token refresh service
   */
  start() {
    if (this.isRunning) {
      console.log('Token refresh service is already running');
      return;
    }

    console.log('Starting token refresh service...');
    this.isRunning = true;
    
    // Run immediately on start
    this.refreshExpiredTokens();
    
    // Set up interval
    this.intervalId = setInterval(() => {
      this.refreshExpiredTokens();
    }, this.refreshInterval);
  }

  /**
   * Stop the token refresh service
   */
  stop() {
    if (!this.isRunning) {
      return;
    }

    console.log('Stopping token refresh service...');
    this.isRunning = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Refresh tokens that are about to expire
   */
  async refreshExpiredTokens() {
    try {
      console.log('Checking for tokens needing refresh...');
      
      // Find integrations that need token refresh
      const integrations = await Integration.findNeedingRefresh();
      
      if (integrations.length === 0) {
        console.log('No tokens need refresh at this time');
        return;
      }

      console.log(`Found ${integrations.length} tokens needing refresh`);

      // Process each integration
      const refreshPromises = integrations.map(integration => 
        this.refreshIntegrationToken(integration)
      );

      const results = await Promise.allSettled(refreshPromises);
      
      // Log results
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      
      console.log(`Token refresh completed: ${successful} successful, ${failed} failed`);
      
      // Log failed refreshes
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Failed to refresh token for ${integrations[index].platform}:`, result.reason);
        }
      });

    } catch (error) {
      console.error('Error in token refresh service:', error);
    }
  }

  /**
   * Refresh token for a specific integration
   */
  async refreshIntegrationToken(integration) {
    try {
      const { accessToken, refreshToken } = integration.getDecryptedTokens();
      
      if (!refreshToken) {
        console.log(`No refresh token available for ${integration.platform} integration ${integration._id}`);
        await this.markTokenAsExpired(integration, 'No refresh token available');
        return;
      }

      const ServiceClass = platformServices[integration.platform];
      if (!ServiceClass) {
        throw new Error(`No service found for platform: ${integration.platform}`);
      }

      const service = new ServiceClass();
      
      // Attempt to refresh the token
      const refreshedTokens = await service.refreshAccessToken(refreshToken);
      
      // Update the integration with new tokens
      integration.accessToken = refreshedTokens.accessToken;
      integration.refreshToken = refreshedTokens.refreshToken;
      integration.expiresAt = refreshedTokens.expiresIn ? 
        new Date(Date.now() + refreshedTokens.expiresIn * 1000) : null;
      integration.lastRefreshedAt = new Date();
      integration.status = 'active';
      integration.retryCount = 0; // Reset retry count on successful refresh
      integration.lastError = undefined; // Clear any previous errors
      
      await integration.save();
      
      console.log(`Successfully refreshed token for ${integration.platform} integration ${integration._id}`);
      
    } catch (error) {
      console.error(`Failed to refresh token for ${integration.platform} integration ${integration._id}:`, error);
      
      // Handle refresh failure
      await this.handleRefreshFailure(integration, error);
    }
  }

  /**
   * Handle token refresh failure
   */
  async handleRefreshFailure(integration, error) {
    integration.retryCount = (integration.retryCount || 0) + 1;
    integration.lastError = {
      message: error.message,
      occurredAt: new Date(),
      errorCode: error.code || 'REFRESH_FAILED'
    };

    // If max retries exceeded, mark as expired
    if (integration.retryCount >= integration.maxRetries) {
      await this.markTokenAsExpired(integration, `Max retries exceeded: ${error.message}`);
    } else {
      // Keep as active but with error for retry
      integration.status = 'active';
      await integration.save();
    }
  }

  /**
   * Mark token as expired
   */
  async markTokenAsExpired(integration, reason) {
    integration.status = 'expired';
    integration.lastError = {
      message: reason,
      occurredAt: new Date(),
      errorCode: 'TOKEN_EXPIRED'
    };
    
    await integration.save();
    
    console.log(`Marked ${integration.platform} integration ${integration._id} as expired: ${reason}`);
  }

  /**
   * Manually refresh a specific integration's token
   */
  async refreshSpecificIntegration(integrationId) {
    try {
      const integration = await Integration.findById(integrationId);
      
      if (!integration) {
        throw new Error('Integration not found');
      }

      if (integration.status !== 'active') {
        throw new Error(`Integration status is ${integration.status}, cannot refresh`);
      }

      await this.refreshIntegrationToken(integration);
      
      return {
        success: true,
        message: 'Token refreshed successfully',
        integration: {
          id: integration._id,
          platform: integration.platform,
          status: integration.status,
          expiresAt: integration.expiresAt
        }
      };
      
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error: error
      };
    }
  }

  /**
   * Get token refresh statistics
   */
  async getRefreshStats() {
    try {
      const stats = await Integration.aggregate([
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

      const needingRefresh = await Integration.findNeedingRefresh().countDocuments();
      
      return {
        platformStats: stats,
        needingRefresh,
        serviceStatus: {
          isRunning: this.isRunning,
          refreshInterval: this.refreshInterval,
          lastCheck: new Date()
        }
      };
      
    } catch (error) {
      throw new Error(`Failed to get refresh stats: ${error.message}`);
    }
  }

  /**
   * Validate all active tokens
   */
  async validateAllTokens() {
    try {
      console.log('Starting token validation...');
      
      const activeIntegrations = await Integration.find({ status: 'active' });
      
      if (activeIntegrations.length === 0) {
        console.log('No active integrations to validate');
        return { validated: 0, invalid: 0 };
      }

      console.log(`Validating ${activeIntegrations.length} active integrations`);

      const validationPromises = activeIntegrations.map(integration => 
        this.validateIntegrationToken(integration)
      );

      const results = await Promise.allSettled(validationPromises);
      
      const valid = results.filter(r => r.status === 'fulfilled' && r.value === true).length;
      const invalid = results.filter(r => r.status === 'rejected' || r.value === false).length;
      
      console.log(`Token validation completed: ${valid} valid, ${invalid} invalid`);
      
      return { validated: valid, invalid };
      
    } catch (error) {
      console.error('Error in token validation:', error);
      throw error;
    }
  }

  /**
   * Validate a specific integration's token
   */
  async validateIntegrationToken(integration) {
    try {
      const { accessToken } = integration.getDecryptedTokens();
      
      const ServiceClass = platformServices[integration.platform];
      if (!ServiceClass) {
        throw new Error(`No service found for platform: ${integration.platform}`);
      }

      const service = new ServiceClass();
      const isValid = await service.validateToken(accessToken);
      
      if (!isValid) {
        await this.markTokenAsExpired(integration, 'Token validation failed');
      }
      
      return isValid;
      
    } catch (error) {
      console.error(`Token validation failed for ${integration.platform}:`, error);
      await this.markTokenAsExpired(integration, `Validation error: ${error.message}`);
      return false;
    }
  }
}

// Create singleton instance
const tokenRefreshService = new TokenRefreshService();

module.exports = tokenRefreshService;
