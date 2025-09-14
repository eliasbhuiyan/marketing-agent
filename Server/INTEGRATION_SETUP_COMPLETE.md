# Complete Integration System Setup Guide

This guide provides step-by-step instructions for setting up the comprehensive platform integration system.

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB 5.0+
- Redis 6.0+ (for queue system)
- HTTPS domain (required for OAuth)

## 🔧 Environment Variables

Create a `.env` file in your server directory with the following variables:

```bash
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/marketing-agent

# Redis (for queue system)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_DB=0

# Encryption
ENCRYPTION_KEY=your_32_character_encryption_key_here

# Facebook/Instagram OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# WordPress OAuth
WORDPRESS_CLIENT_ID=your_wordpress_client_id
WORDPRESS_CLIENT_SECRET=your_wordpress_client_secret

# Medium OAuth
MEDIUM_CLIENT_ID=your_medium_client_id
MEDIUM_CLIENT_SECRET=your_medium_client_secret

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
```

## 🚀 Platform OAuth Setup

### 1. Facebook/Instagram Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app → "Business" type
3. Add "Facebook Login" and "Instagram Basic Display" products
4. Configure OAuth redirect URIs:
   - `https://yourdomain.com/integrations/callback/facebook`
   - `https://yourdomain.com/integrations/callback/instagram`
5. Add required permissions:
   - `pages_manage_posts`
   - `pages_read_engagement`
   - `pages_show_list`
   - `instagram_basic`
   - `instagram_content_publish`

### 2. LinkedIn Setup

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add "Sign In with LinkedIn" product
4. Configure OAuth redirect URI:
   - `https://yourdomain.com/integrations/callback/linkedin`
5. Request access to:
   - `r_liteprofile`
   - `r_emailaddress`
   - `w_member_social`

### 3. WordPress Setup

1. Go to [WordPress.com Applications](https://developer.wordpress.com/apps/)
2. Create a new application
3. Set redirect URI:
   - `https://yourdomain.com/integrations/callback/wordpress`
4. Request scopes:
   - `global`
   - `posts`

### 4. Medium Setup

1. Go to [Medium Developers](https://medium.com/me/applications)
2. Create a new integration
3. Set redirect URI:
   - `https://yourdomain.com/integrations/callback/medium`
4. Request scopes:
   - `basicProfile`
   - `publishPost`

## 📦 Installation

### 1. Install Dependencies

```bash
# Server dependencies
npm install mongoose crypto ioredis bullmq

# Client dependencies (if not already installed)
npm install @radix-ui/react-dialog @radix-ui/react-select
```

### 2. Database Setup

```bash
# Start MongoDB
mongod

# Start Redis
redis-server
```

### 3. Initialize Services

Add to your server startup file (`server.js` or `app.js`):

```javascript
const queueService = require('./services/queueService');
const tokenRefreshService = require('./services/tokenRefreshService');

// Initialize queue service
queueService.initialize().then(() => {
  console.log('Queue service initialized');
  
  // Start recurring jobs
  queueService.refreshExpiredTokens();
  queueService.validateAllTokens();
  queueService.processScheduledPosts();
});

// Start token refresh service
tokenRefreshService.start();
```

## 🔄 Queue System Configuration

### BullMQ Setup

The queue system uses BullMQ with Redis for:
- **Posting Queue**: Handles immediate and scheduled posts
- **Token Refresh Queue**: Manages token refresh operations
- **Notifications Queue**: Sends user notifications

### Queue Workers

Workers automatically process:
- Scheduled posts at their designated time
- Token refresh operations every 5 minutes
- Token validation every 30 minutes
- Failed post retries

## 🛡️ Security Features

### Token Encryption

- All access and refresh tokens are encrypted using AES-256-GCM
- Tokens are never returned in API responses
- Encryption key should be stored securely

### OAuth Security

- State parameter validation prevents CSRF attacks
- Token expiry tracking and automatic refresh
- Secure redirect URI validation

### Access Control

- User-brand-platform isolation
- JWT-based authentication
- Rate limiting on all endpoints

## 📊 API Endpoints

### Integration Management

```bash
# Get all integrations
GET /integrations

# Get specific integration details
GET /integrations/:platform

# Connect platform (initiate OAuth)
POST /integrations/:platform/connect

# Disconnect platform
DELETE /integrations/:platform

# Test connection
POST /integrations/:platform/test
```

### Posting

```bash
# Publish to single platform
POST /posts/publish
{
  "platform": "facebook",
  "content": "Hello world!",
  "mediaUrls": ["https://example.com/image.jpg"],
  "scheduledAt": "2024-01-01T12:00:00Z" // optional
}

# Publish to multiple platforms
POST /posts/publish-multiple
{
  "platforms": ["facebook", "instagram", "linkedin"],
  "content": "Cross-platform post!",
  "mediaUrls": ["https://example.com/image.jpg"],
  "scheduledAt": "2024-01-01T12:00:00Z" // optional
}

# Get posting statistics
GET /posts/stats?startDate=2024-01-01&endDate=2024-01-31

# Get brand posts
GET /posts?status=published&platform=facebook&limit=20&page=1

# Cancel scheduled post
DELETE /posts/:postId/cancel
```

### Queue Management

```bash
# Get queue statistics
GET /queue/stats
```

## 🎯 Frontend Integration

### Settings Page Integration

The settings page now includes a comprehensive integrations tab where users can:

1. **View Available Platforms**: Facebook, Instagram, LinkedIn, WordPress, Medium
2. **Connect Accounts**: Click "Connect" to start OAuth flow
3. **View Status**: See connection status, account details, and token expiry
4. **Disconnect**: Remove platform connections
5. **Error Handling**: Clear error messages for connection issues

### Content Publishing

Users can publish content from the content generation page:

1. **Generate Content**: Create posts using AI
2. **Select Platforms**: Choose which platforms to publish to
3. **Schedule Posts**: Set future publication times
4. **Add Media**: Include images and videos
5. **Monitor Status**: Track publication success/failure

## 🔍 Monitoring & Analytics

### Token Management

- Automatic token refresh before expiry
- Token validation and error tracking
- Integration status monitoring

### Post Analytics

- Publication success rates
- Platform-specific statistics
- Scheduled post management
- Error tracking and retry logic

### Queue Monitoring

- Job processing statistics
- Failed job tracking
- Performance metrics

## 🚨 Error Handling

### Common Issues

1. **Token Expired**: Automatic refresh or user reconnection required
2. **Rate Limits**: Implemented with exponential backoff
3. **Network Errors**: Retry logic with configurable attempts
4. **Invalid Permissions**: Clear error messages for scope issues

### Debugging

Enable detailed logging by setting:
```bash
NODE_ENV=development
DEBUG=integration:*
```

## 📈 Performance Optimization

### Database Indexes

The system includes optimized indexes for:
- User-brand-platform queries
- Token expiry lookups
- Scheduled post processing
- Status-based filtering

### Caching

- Integration status caching
- Token validation caching
- Queue job result caching

### Rate Limiting

- Platform-specific rate limits
- User-based rate limiting
- API endpoint protection

## 🔧 Maintenance

### Regular Tasks

1. **Monitor Queue Health**: Check queue statistics regularly
2. **Token Refresh**: Ensure automatic refresh is working
3. **Error Logs**: Review failed operations
4. **Database Cleanup**: Remove old completed jobs

### Scaling Considerations

- **Horizontal Scaling**: Multiple worker instances
- **Database Sharding**: By brand or user
- **Redis Clustering**: For high availability
- **Load Balancing**: Multiple server instances

## 🆘 Troubleshooting

### Common Problems

1. **OAuth Redirect Issues**: Verify redirect URIs match exactly
2. **Token Refresh Failures**: Check platform API changes
3. **Queue Processing**: Ensure Redis is running
4. **Database Connections**: Verify MongoDB connectivity

### Support Resources

- Platform API Documentation
- OAuth 2.0 Specification
- BullMQ Documentation
- MongoDB Best Practices

---

## 🎉 You're Ready!

Your comprehensive integration system is now set up with:

✅ **Secure OAuth flows** for 5 platforms  
✅ **Automatic token management** with refresh  
✅ **Scheduled posting** with queue system  
✅ **Multi-platform publishing**  
✅ **Real-time monitoring** and analytics  
✅ **Error handling** and retry logic  
✅ **Frontend integration** in settings  

The system is production-ready with enterprise-grade security, scalability, and monitoring capabilities!
