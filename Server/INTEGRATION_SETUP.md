# Platform Integration Setup Guide

This guide explains how to set up the platform integrations for the Marketing Agent webapp.

## Required Environment Variables

Add these environment variables to your `.env` file:

```env
# Facebook/Instagram Integration
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# WordPress Integration
WORDPRESS_CLIENT_ID=your-wordpress-client-id
WORDPRESS_CLIENT_SECRET=your-wordpress-client-secret

# Medium Integration
MEDIUM_CLIENT_ID=your-medium-client-id
MEDIUM_CLIENT_SECRET=your-medium-client-secret
```

## Platform Setup Instructions

### 1. Facebook Integration

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add the following products:
   - Facebook Login
   - Instagram Basic Display (for Instagram integration)
4. Configure OAuth redirect URIs:
   - `http://localhost:3000/integrations/callback/facebook`
   - `http://localhost:3000/integrations/callback/instagram`
5. Get your App ID and App Secret from the app settings

**Required Permissions:**
- `pages_manage_posts`
- `pages_read_engagement`
- `pages_show_list`
- `publish_to_groups`
- `instagram_basic`
- `instagram_content_publish`

### 2. Instagram Integration

Instagram integration uses the same Facebook app as Facebook integration.

**Requirements:**
- Instagram Business account
- Instagram account must be connected to a Facebook page
- Facebook page must be connected to your Facebook app

### 3. WordPress Integration

1. Go to [WordPress.com Applications](https://developer.wordpress.com/apps/)
2. Create a new application
3. Set the redirect URI to: `http://localhost:3000/integrations/callback/wordpress`
4. Get your Client ID and Client Secret

**Required Scopes:**
- `global`
- `posts`

### 4. Medium Integration

1. Go to [Medium Developer Tools](https://medium.com/me/applications)
2. Create a new integration
3. Set the redirect URI to: `http://localhost:3000/integrations/callback/medium`
4. Get your Client ID and Client Secret

**Required Scopes:**
- `basicProfile`
- `publishPost`

## API Endpoints

### Integration Management

- `GET /integrations` - Get all integrations for current brand
- `GET /integrations/:platform` - Get integration details for specific platform
- `POST /integrations/:platform/connect` - Initiate OAuth flow
- `GET /integrations/callback/:platform` - Handle OAuth callback
- `DELETE /integrations/:platform` - Disconnect integration
- `POST /integrations/:platform/test` - Test connection
- `POST /integrations/:platform/publish` - Publish content

### Publishing Content

```javascript
// Example: Publish to Facebook
const result = await apiClient.integrations.publish('facebook', {
  content: 'Your post content here',
  mediaUrls: ['https://example.com/image.jpg']
});
```

## Frontend Components

### IntegrationCard
Displays platform connection status and allows users to connect/disconnect platforms.

### ContentPublisher
Allows users to publish content to multiple connected platforms simultaneously.

### useIntegrations Hook
Provides integration management functionality:
- `connectPlatform(platform)` - Initiate OAuth flow
- `disconnectPlatform(platform)` - Disconnect platform
- `publishContent(platform, content, mediaUrls)` - Publish content
- `getIntegrationStatus(platform)` - Get connection status

## Database Schema

The `SocialIntegration` model stores:
- `brand` - Reference to brand
- `user` - Reference to user
- `platform` - Platform name (facebook, instagram, wordpress, medium)
- `accountId` - Platform account ID
- `accessToken` - OAuth access token
- `refreshToken` - OAuth refresh token (if supported)
- `tokenExpiry` - Token expiration date
- `connectedAt` - Connection timestamp
- `isActive` - Connection status

## Security Considerations

1. **Token Storage**: Access tokens are stored securely in the database
2. **Token Refresh**: Automatic token refresh for platforms that support it
3. **Token Validation**: Regular validation of token status
4. **OAuth State**: State parameter used to prevent CSRF attacks
5. **HTTPS**: All OAuth flows should use HTTPS in production

## Testing

1. Set up test accounts for each platform
2. Test OAuth flows for each platform
3. Test content publishing functionality
4. Test token refresh mechanisms
5. Test error handling for expired/invalid tokens

## Troubleshooting

### Common Issues

1. **OAuth Redirect URI Mismatch**
   - Ensure redirect URIs match exactly in platform settings
   - Check for trailing slashes and protocol (http vs https)

2. **Token Expiration**
   - Facebook/Instagram tokens don't refresh automatically
   - WordPress/Medium tokens can be refreshed

3. **Instagram Business Account Required**
   - Personal Instagram accounts cannot be used
   - Must be connected to a Facebook page

4. **Permission Issues**
   - Ensure all required permissions are granted
   - Check platform-specific permission requirements

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` to see detailed OAuth flow information.
