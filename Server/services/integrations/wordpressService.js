const BaseIntegrationService = require('./baseIntegrationService');

class WordPressService extends BaseIntegrationService {
  constructor() {
    super('wordpress', {
      baseURL: 'https://public-api.wordpress.com/rest/v1.1',
      clientId: process.env.WORDPRESS_CLIENT_ID,
      clientSecret: process.env.WORDPRESS_CLIENT_SECRET
    });
  }

  generateAuthURL(state) {
    const scopes = [
      'global',
      'posts'
    ];
    
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/wordpress`,
      response_type: 'code',
      scope: scopes.join(','),
      state: state
    });
    
    return `https://public-api.wordpress.com/oauth2/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      const response = await fetch('https://public-api.wordpress.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/wordpress`,
          code: code,
          grant_type: 'authorization_code'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in
      };
    } catch (error) {
      throw new Error(`Failed to exchange code for token: ${error.message}`);
    }
  }

  async getUserProfile(accessToken) {
    try {
      const response = await fetch(`${this.baseURL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        id: data.ID.toString(),
        name: data.display_name,
        email: data.email,
        username: data.username
      };
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error.message}`);
    }
  }

  async validateToken(accessToken) {
    try {
      const response = await fetch(`${this.baseURL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.ID ? true : false;
    } catch (error) {
      return false;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch('https://public-api.wordpress.com/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken,
        expiresIn: data.expires_in
      };
    } catch (error) {
      throw new Error(`Failed to refresh token: ${error.message}`);
    }
  }

  async publishContent({ content, mediaUrls = [], accessToken }) {
    try {
      // Get user's sites
      const sitesResponse = await fetch(`${this.baseURL}/me/sites`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!sitesResponse.ok) {
        throw new Error(`HTTP error! status: ${sitesResponse.status}`);
      }

      const sitesData = await sitesResponse.json();

      if (!sitesData.sites || sitesData.sites.length === 0) {
        throw new Error('No WordPress sites found. Please create a site first.');
      }

      // Use the first site for posting
      const site = sitesData.sites[0];
      const siteId = site.ID;

      // Prepare post data
      let postData = {
        title: content.substring(0, 100), // Use first 100 chars as title
        content: content,
        status: 'publish',
        format: 'standard'
      };

      // If there are media URLs, add them to the content
      if (mediaUrls.length > 0) {
        let mediaContent = '\n\n';
        for (const mediaUrl of mediaUrls) {
          const isImage = mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
          if (isImage) {
            mediaContent += `<img src="${mediaUrl}" alt="Post image" style="max-width: 100%; height: auto;" />\n`;
          } else {
            mediaContent += `<a href="${mediaUrl}">Media File</a>\n`;
          }
        }
        postData.content += mediaContent;
      }

      const response = await fetch(`${this.baseURL}/sites/${siteId}/posts/new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      return {
        postId: responseData.ID,
        siteId: siteId,
        siteName: site.name,
        siteUrl: site.URL,
        url: responseData.URL
      };
    } catch (error) {
      throw new Error(`Failed to publish to WordPress: ${error.message}`);
    }
  }

  async revokeToken(accessToken) {
    try {
      // WordPress.com doesn't have a specific revoke endpoint
      // The token will expire naturally
      console.log('WordPress token revocation not supported by API');
    } catch (error) {
      console.error('Failed to revoke WordPress token:', error);
    }
  }
}

module.exports = WordPressService;
