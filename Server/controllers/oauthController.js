const Integration = require('../models/integrationSchema');
const FacebookService = require('../services/integrations/facebookService');
const InstagramService = require('../services/integrations/instagramService');
const WordPressService = require('../services/integrations/wordpressService');
const MediumService = require('../services/integrations/mediumService');
const LinkedInService = require('../services/integrations/linkedinService');

// Platform service mapping
const platformServices = {
  facebook: FacebookService,
  instagram: InstagramService,
  wordpress: WordPressService,
  medium: MediumService,
  linkedin: LinkedInService
};

// Platform-specific OAuth configurations
const oauthConfigs = {
  facebook: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scopes: [
      'pages_manage_posts',
      'pages_read_engagement', 
      'pages_show_list',
      'publish_to_groups'
    ],
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token'
  },
  instagram: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scopes: [
      'instagram_basic',
      'instagram_content_publish',
      'pages_show_list',
      'pages_read_engagement'
    ],
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token'
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scopes: [
      'r_liteprofile',
      'r_emailaddress',
      'w_member_social'
    ],
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken'
  },
  wordpress: {
    authUrl: 'https://public-api.wordpress.com/oauth2/authorize',
    scopes: [
      'global',
      'posts'
    ],
    tokenUrl: 'https://public-api.wordpress.com/oauth2/token'
  },
  medium: {
    authUrl: 'https://medium.com/m/oauth/authorize',
    scopes: [
      'basicProfile',
      'publishPost'
    ],
    tokenUrl: 'https://api.medium.com/v1/tokens'
  }
};

/**
 * Initiate OAuth flow for a platform
 */
const initiateOAuth = async (req, res) => {
  try {
    const { platform } = req.params;
    const userId = req.user._id;
    const brandId = req.user.brandId;
    
    if (!brandId) {
      return res.status(400).json({ 
        error: 'No active brand selected. Please select a brand first.' 
      });
    }

    if (!oauthConfigs[platform]) {
      return res.status(400).json({ 
        error: 'Unsupported platform',
        supportedPlatforms: Object.keys(oauthConfigs)
      });
    }

    // Generate secure state parameter
    const state = Buffer.from(JSON.stringify({
      userId: userId.toString(),
      brandId: brandId.toString(),
      timestamp: Date.now(),
      nonce: Math.random().toString(36).substring(7)
    })).toString('base64');

    const config = oauthConfigs[platform];
    const params = new URLSearchParams({
      client_id: getClientId(platform),
      redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/${platform}`,
      response_type: 'code',
      scope: config.scopes.join(','),
      state: state
    });

    const authUrl = `${config.authUrl}?${params.toString()}`;

    res.status(200).json({
      message: 'OAuth URL generated successfully',
      authUrl,
      platform,
      state
    });
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    res.status(500).json({ 
      error: 'Failed to initiate OAuth flow',
      details: error.message 
    });
  }
};

/**
 * Handle OAuth callback and exchange code for tokens
 */
const handleOAuthCallback = async (req, res) => {
  try {
    const { platform } = req.params;
    const { code, state, error } = req.query;
    
    if (error) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?tab=integrations&error=${encodeURIComponent(error)}`);
    }

    if (!code || !state) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?tab=integrations&error=missing_parameters`);
    }

    // Decode and validate state
    let stateData;
    try {
      stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    } catch (err) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?tab=integrations&error=invalid_state`);
    }

    const { userId, brandId, timestamp } = stateData;
    
    // Validate state timestamp (should be within last 10 minutes)
    if (Date.now() - timestamp > 10 * 60 * 1000) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?tab=integrations&error=expired_state`);
    }

    if (!userId || !brandId) {
      return res.redirect(`${process.env.CLIENT_URL}/settings?tab=integrations&error=invalid_state_data`);
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(platform, code);
    
    // Get user profile/account info
    const accountInfo = await getAccountInfo(platform, tokens.accessToken);
    
    // Create or update integration
    const integration = await createOrUpdateIntegration({
      userId,
      brandId,
      platform,
      accountInfo,
      tokens
    });

    res.redirect(`${process.env.CLIENT_URL}/settings?tab=integrations&success=${platform}_connected`);
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    res.redirect(`${process.env.CLIENT_URL}/settings?tab=integrations&error=connection_failed`);
  }
};

/**
 * Exchange authorization code for access and refresh tokens
 */
const exchangeCodeForTokens = async (platform, code) => {
  const config = oauthConfigs[platform];
  const clientId = getClientId(platform);
  const clientSecret = getClientSecret(platform);
  const redirectUri = `${process.env.CLIENT_URL}/integrations/callback/${platform}`;

  const tokenData = {
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri
  };

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(tokenData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Token exchange failed: ${errorData.error || response.statusText}`);
  }

  const data = await response.json();
  
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    tokenType: data.token_type || 'Bearer'
  };
};

/**
 * Get account information from platform
 */
const getAccountInfo = async (platform, accessToken) => {
  const ServiceClass = platformServices[platform];
  if (!ServiceClass) {
    throw new Error(`No service found for platform: ${platform}`);
  }

  const service = new ServiceClass();
  return await service.getUserProfile(accessToken);
};

/**
 * Create or update integration record
 */
const createOrUpdateIntegration = async ({ userId, brandId, platform, accountInfo, tokens }) => {
  const integrationData = {
    userId,
    brandId,
    platform,
    accountId: accountInfo.id,
    accountName: accountInfo.name || accountInfo.display_name,
    accountUsername: accountInfo.username || accountInfo.email,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresAt: tokens.expiresIn ? new Date(Date.now() + tokens.expiresIn * 1000) : null,
    status: 'active',
    platformData: {
      tokenType: tokens.tokenType,
      scopes: oauthConfigs[platform].scopes
    }
  };

  // Use upsert to create or update
  const integration = await Integration.findOneAndUpdate(
    { userId, brandId, platform },
    integrationData,
    { upsert: true, new: true, runValidators: true }
  );

  return integration;
};

/**
 * Revoke integration and disconnect account
 */
const revokeIntegration = async (req, res) => {
  try {
    const { platform } = req.params;
    const userId = req.user._id;
    const brandId = req.user.brandId;

    const integration = await Integration.findOne({
      userId,
      brandId,
      platform
    });

    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }

    // Revoke token with platform if possible
    try {
      const { accessToken } = integration.getDecryptedTokens();
      await revokePlatformToken(platform, accessToken);
    } catch (error) {
      console.error(`Failed to revoke ${platform} token:`, error);
      // Continue with deletion even if revocation fails
    }

    // Mark integration as revoked
    integration.status = 'revoked';
    await integration.save();

    res.status(200).json({
      message: 'Integration revoked successfully',
      platform
    });
  } catch (error) {
    console.error('Error revoking integration:', error);
    res.status(500).json({ 
      error: 'Failed to revoke integration',
      details: error.message 
    });
  }
};

/**
 * Revoke token with platform
 */
const revokePlatformToken = async (platform, accessToken) => {
  const revokeUrls = {
    facebook: `https://graph.facebook.com/v18.0/me/permissions?access_token=${accessToken}`,
    linkedin: `https://www.linkedin.com/oauth/v2/revoke`,
    wordpress: null, // WordPress doesn't support token revocation
    medium: null, // Medium doesn't support token revocation
    instagram: `https://graph.facebook.com/v18.0/me/permissions?access_token=${accessToken}`
  };

  const revokeUrl = revokeUrls[platform];
  if (!revokeUrl) {
    return; // Platform doesn't support revocation
  }

  await fetch(revokeUrl, {
    method: 'DELETE'
  });
};

/**
 * Get client ID for platform
 */
const getClientId = (platform) => {
  const clientIds = {
    facebook: process.env.FACEBOOK_APP_ID,
    instagram: process.env.FACEBOOK_APP_ID, // Instagram uses Facebook app
    linkedin: process.env.LINKEDIN_CLIENT_ID,
    wordpress: process.env.WORDPRESS_CLIENT_ID,
    medium: process.env.MEDIUM_CLIENT_ID
  };
  
  const clientId = clientIds[platform];
  if (!clientId) {
    throw new Error(`Client ID not configured for platform: ${platform}`);
  }
  
  return clientId;
};

/**
 * Get client secret for platform
 */
const getClientSecret = (platform) => {
  const clientSecrets = {
    facebook: process.env.FACEBOOK_APP_SECRET,
    instagram: process.env.FACEBOOK_APP_SECRET, // Instagram uses Facebook app
    linkedin: process.env.LINKEDIN_CLIENT_SECRET,
    wordpress: process.env.WORDPRESS_CLIENT_SECRET,
    medium: process.env.MEDIUM_CLIENT_SECRET
  };
  
  const clientSecret = clientSecrets[platform];
  if (!clientSecret) {
    throw new Error(`Client secret not configured for platform: ${platform}`);
  }
  
  return clientSecret;
};

module.exports = {
  initiateOAuth,
  handleOAuthCallback,
  revokeIntegration,
  exchangeCodeForTokens,
  getAccountInfo,
  createOrUpdateIntegration
};
