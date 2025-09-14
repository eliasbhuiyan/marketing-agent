const BaseIntegrationService = require('./baseIntegrationService');

class LinkedInService extends BaseIntegrationService {
  constructor() {
    super('linkedin', {
      baseURL: 'https://api.linkedin.com/v2',
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    });
  }

  generateAuthURL(state) {
    const scopes = [
      'r_liteprofile',
      'r_emailaddress',
      'w_member_social'
    ];
    
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/linkedin`,
      response_type: 'code',
      scope: scopes.join(','),
      state: state
    });
    
    return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/linkedin`,
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
      // Get basic profile info
      const profileResponse = await fetch(`${this.baseURL}/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!profileResponse.ok) {
        throw new Error(`HTTP error! status: ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();

      // Get email address
      const emailResponse = await fetch(`${this.baseURL}/emailAddress?q=members&projection=(elements*(handle~))`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      let email = null;
      if (emailResponse.ok) {
        const emailData = await emailResponse.json();
        email = emailData.elements?.[0]?.['handle~']?.emailAddress;
      }

      return {
        id: profileData.id,
        name: `${profileData.firstName?.localized?.en_US || ''} ${profileData.lastName?.localized?.en_US || ''}`.trim(),
        email: email,
        username: email
      };
    } catch (error) {
      throw new Error(`Failed to get user profile: ${error.message}`);
    }
  }

  async validateToken(accessToken) {
    try {
      const response = await fetch(`${this.baseURL}/people/~`, {
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
      return data.id ? true : false;
    } catch (error) {
      return false;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
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
      // LinkedIn requires specific format for posts
      const postData = {
        author: `urn:li:person:${await this.getPersonUrn(accessToken)}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: mediaUrls.length > 0 ? 'IMAGE' : 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };

      // Add media if provided
      if (mediaUrls.length > 0) {
        const mediaElements = await Promise.all(
          mediaUrls.map(url => this.createMediaElement(url, accessToken))
        );
        
        postData.specificContent['com.linkedin.ugc.ShareContent'].media = mediaElements;
      }

      const response = await fetch(`${this.baseURL}/ugcPosts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`LinkedIn API error: ${errorData.message || response.statusText}`);
      }

      const responseData = await response.json();
      
      return {
        postId: responseData.id,
        url: `https://www.linkedin.com/feed/update/${responseData.id}`,
        platform: 'linkedin'
      };
    } catch (error) {
      throw new Error(`Failed to publish to LinkedIn: ${error.message}`);
    }
  }

  async getPersonUrn(accessToken) {
    try {
      const response = await fetch(`${this.baseURL}/people/~`, {
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
      return data.id;
    } catch (error) {
      throw new Error(`Failed to get person URN: ${error.message}`);
    }
  }

  async createMediaElement(imageUrl, accessToken) {
    try {
      // Register the image with LinkedIn
      const registerResponse = await fetch(`${this.baseURL}/assets?action=registerUpload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:person:${await this.getPersonUrn(accessToken)}`,
            serviceRelationships: [{
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent'
            }]
          }
        })
      });

      if (!registerResponse.ok) {
        throw new Error(`Failed to register image upload: ${registerResponse.statusText}`);
      }

      const registerData = await registerResponse.json();
      
      // Upload the image
      const uploadResponse = await fetch(registerData.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/octet-stream'
        },
        body: await fetch(imageUrl).then(res => res.arrayBuffer())
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
      }

      return {
        status: 'READY',
        description: {
          text: 'Image uploaded via Marketing Agent'
        },
        media: registerData.value.asset,
        title: {
          text: 'Marketing Agent Post'
        }
      };
    } catch (error) {
      throw new Error(`Failed to create media element: ${error.message}`);
    }
  }

  async revokeToken(accessToken) {
    try {
      await fetch(`https://www.linkedin.com/oauth/v2/revoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          token: accessToken
        })
      });
    } catch (error) {
      console.error('Failed to revoke LinkedIn token:', error);
    }
  }
}

module.exports = LinkedInService;
