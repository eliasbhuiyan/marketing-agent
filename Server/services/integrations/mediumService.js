const BaseIntegrationService = require('./baseIntegrationService');

class MediumService extends BaseIntegrationService {
  constructor() {
    super('medium', {
      baseURL: 'https://api.medium.com/v1',
      clientId: process.env.MEDIUM_CLIENT_ID,
      clientSecret: process.env.MEDIUM_CLIENT_SECRET
    });
  }

  generateAuthURL(state) {
    const scopes = [
      'basicProfile',
      'publishPost'
    ];
    
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/medium`,
      response_type: 'code',
      scope: scopes.join(','),
      state: state
    });
    
    return `https://medium.com/m/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      const response = await fetch('https://api.medium.com/v1/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/medium`
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
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        id: data.data.id,
        name: data.data.name,
        username: data.data.username,
        url: data.data.url
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
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.data.id ? true : false;
    } catch (error) {
      return false;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch('https://api.medium.com/v1/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
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
      // Get user's publications
      const userResponse = await fetch(`${this.baseURL}/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!userResponse.ok) {
        throw new Error(`HTTP error! status: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      const userId = userData.data.id;

      // Get user's publications
      const publicationsResponse = await fetch(`${this.baseURL}/users/${userId}/publications`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!publicationsResponse.ok) {
        throw new Error(`HTTP error! status: ${publicationsResponse.status}`);
      }

      const publicationsData = await publicationsResponse.json();

      // Prepare content with media
      let formattedContent = content;
      
      if (mediaUrls.length > 0) {
        formattedContent += '\n\n';
        for (const mediaUrl of mediaUrls) {
          const isImage = mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
          if (isImage) {
            formattedContent += `<figure><img src="${mediaUrl}" alt="Post image" /></figure>\n`;
          } else {
            formattedContent += `<p><a href="${mediaUrl}">Media File</a></p>\n`;
          }
        }
      }

      // Convert plain text to HTML format for Medium
      formattedContent = formattedContent
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
      formattedContent = `<p>${formattedContent}</p>`;

      // Create post data
      const postData = {
        title: content.substring(0, 100), // Use first 100 chars as title
        contentFormat: 'html',
        content: formattedContent,
        publishStatus: 'public'
      };

      // Try to publish to user's personal profile first
      let response;
      try {
        response = await fetch(`${this.baseURL}/users/${userId}/posts`, {
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
      } catch (error) {
        // If personal profile fails, try publications
        if (publicationsData.data && publicationsData.data.length > 0) {
          const publication = publicationsData.data[0];
          response = await fetch(`${this.baseURL}/publications/${publication.id}/posts`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...postData,
              userId: userId
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          throw error;
        }
      }

      const responseData = await response.json();

      return {
        postId: responseData.data.id,
        userId: userId,
        url: responseData.data.url,
        title: responseData.data.title
      };
    } catch (error) {
      throw new Error(`Failed to publish to Medium: ${error.message}`);
    }
  }

  async revokeToken(accessToken) {
    try {
      // Medium doesn't have a specific revoke endpoint
      // The token will expire naturally
      console.log('Medium token revocation not supported by API');
    } catch (error) {
      console.error('Failed to revoke Medium token:', error);
    }
  }
}

module.exports = MediumService;
