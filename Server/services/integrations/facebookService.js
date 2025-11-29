const BaseIntegrationService = require('./baseIntegrationService');

class FacebookService extends BaseIntegrationService {
  constructor() {
    super('facebook', {
      baseURL: 'https://graph.facebook.com/v18.0',
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET
    });
    // Ensure OAuth credentials are available as instance properties
    this.clientId = process.env.FACEBOOK_APP_ID;
    this.clientSecret = process.env.FACEBOOK_APP_SECRET;
  }

  async validateAppCredentials(appId, appSecret) {
    try {
      const params = new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        grant_type: 'client_credentials'
      });
      const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?${params}`, {
        method: 'GET'
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.error?.message || 'Invalid app credentials or app disabled';
        throw new Error(message);
      }
      const data = await response.json();
      return !!data.access_token;
    } catch (error) {
      throw new Error(`Facebook app validation failed: ${error.message}`);
    }
  }

  generateAuthURL(state) {
    const scopes = [
      'pages_manage_posts',
      'pages_read_engagement',
      'pages_show_list',
      'publish_to_groups'
    ];
    
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${process.env.SERVER_URL || 'http://localhost:8000'}/integrations/callback/facebook`,
      response_type: 'code',
      scope: scopes.join(','),
      state: state
    });
    
    return `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      const params = new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: `${process.env.SERVER_URL || 'http://localhost:8000'}/integrations/callback/facebook`,
        code: code
      });

      const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?${params}`, {
        method: 'GET'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return {
        accessToken: data.access_token,
        refreshToken: null, // Facebook doesn't provide refresh tokens
        expiresIn: data.expires_in
      };
    } catch (error) {
      throw new Error(`Failed to exchange code for token: ${error.message}`);
    }
  }

  async getUserProfile(accessToken) {
    try {
      const params = new URLSearchParams({
        access_token: accessToken,
        fields: 'id,name,email'
      });

      const response = await fetch(`${this.baseURL}/me?${params}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        id: data.id,
        name: data.name,
        email: data.email
      };
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error.message}`);
    }
  }

  async validateToken(accessToken) {
    try {
      const params = new URLSearchParams({
        access_token: accessToken,
        fields: 'id'
      });

      const response = await fetch(`${this.baseURL}/me?${params}`, {
        method: 'GET'
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.id ? true : false;
    } catch (error) {
      return false;
    }
  }

  async publishContent({ content, mediaUrls = [], accessToken }) {
    try {
      // Get user's pages
      const params = new URLSearchParams({
        access_token: accessToken
      });

      const pagesResponse = await fetch(`${this.baseURL}/me/accounts?${params}`, {
        method: 'GET'
      });

      if (!pagesResponse.ok) {
        throw new Error(`HTTP error! status: ${pagesResponse.status}`);
      }

      const pagesData = await pagesResponse.json();

      if (!pagesData.data || pagesData.data.length === 0) {
        throw new Error('No Facebook pages found. Please create a page first.');
      }

      // Use the first page for posting
      const page = pagesData.data[0];
      const pageAccessToken = page.access_token;

      let postData = {
        message: content,
        access_token: pageAccessToken
      };

      // If there are media URLs, add them
      if (mediaUrls.length > 0) {
        if (mediaUrls.length === 1) {
          // Single image/video
          postData.link = mediaUrls[0];
        } else {
          // Multiple images - create album
          const albumResponse = await fetch(`${this.baseURL}/${page.id}/albums`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'Marketing Agent Posts',
              access_token: pageAccessToken
            })
          });

          if (!albumResponse.ok) {
            throw new Error(`HTTP error! status: ${albumResponse.status}`);
          }

          const albumData = await albumResponse.json();
          const albumId = albumData.id;
          
          // Add photos to album
          for (const mediaUrl of mediaUrls) {
            const photoResponse = await fetch(`${this.baseURL}/${albumId}/photos`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                url: mediaUrl,
                access_token: pageAccessToken
              })
            });

            if (!photoResponse.ok) {
              throw new Error(`HTTP error! status: ${photoResponse.status}`);
            }
          }

          postData.link = `https://www.facebook.com/${albumId}`;
        }
      }

      const response = await fetch(`${this.baseURL}/${page.id}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      return {
        postId: responseData.id,
        pageId: page.id,
        pageName: page.name,
        url: `https://www.facebook.com/${responseData.id}`
      };
    } catch (error) {
      throw new Error(`Failed to publish to Facebook: ${error.message}`);
    }
  }

  async revokeToken(accessToken) {
    try {
      const params = new URLSearchParams({
        access_token: accessToken
      });

      await fetch(`${this.baseURL}/me/permissions?${params}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Failed to revoke Facebook token:', error);
    }
  }
}

module.exports = FacebookService;
