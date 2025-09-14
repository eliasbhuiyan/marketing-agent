const BaseIntegrationService = require('./baseIntegrationService');

class InstagramService extends BaseIntegrationService {
  constructor() {
    super('instagram', {
      baseURL: 'https://graph.facebook.com/v18.0',
      clientId: process.env.FACEBOOK_APP_ID, // Instagram uses Facebook app
      clientSecret: process.env.FACEBOOK_APP_SECRET
    });
  }

  generateAuthURL(state) {
    const scopes = [
      'instagram_basic',
      'instagram_content_publish',
      'pages_show_list',
      'pages_read_engagement'
    ];
    
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/instagram`,
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
        redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/instagram`,
        code: code
      });

      const response = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?${params}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        accessToken: data.access_token,
        refreshToken: null, // Instagram doesn't provide refresh tokens
        expiresIn: data.expires_in
      };
    } catch (error) {
      throw new Error(`Failed to exchange code for token: ${error.message}`);
    }
  }

  async getUserProfile(accessToken) {
    try {
      // Get Facebook pages that have Instagram accounts
      const params = new URLSearchParams({
        access_token: accessToken,
        fields: 'id,name,instagram_business_account'
      });

      const pagesResponse = await fetch(`${this.baseURL}/me/accounts?${params}`, {
        method: 'GET'
      });

      if (!pagesResponse.ok) {
        throw new Error(`HTTP error! status: ${pagesResponse.status}`);
      }

      const pagesData = await pagesResponse.json();
      const instagramPages = pagesData.data.filter(page => page.instagram_business_account);
      
      if (instagramPages.length === 0) {
        throw new Error('No Instagram Business accounts found. Please connect an Instagram Business account to a Facebook page.');
      }

      const page = instagramPages[0];
      const instagramAccount = page.instagram_business_account;

      return {
        id: instagramAccount.id,
        name: page.name,
        instagramAccount: instagramAccount
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
      // Get Instagram Business account
      const params = new URLSearchParams({
        access_token: accessToken,
        fields: 'id,name,instagram_business_account'
      });

      const pagesResponse = await fetch(`${this.baseURL}/me/accounts?${params}`, {
        method: 'GET'
      });

      if (!pagesResponse.ok) {
        throw new Error(`HTTP error! status: ${pagesResponse.status}`);
      }

      const pagesData = await pagesResponse.json();
      const instagramPages = pagesData.data.filter(page => page.instagram_business_account);
      
      if (instagramPages.length === 0) {
        throw new Error('No Instagram Business accounts found. Please connect an Instagram Business account to a Facebook page.');
      }

      const page = instagramPages[0];
      const instagramAccountId = page.instagram_business_account.id;

      if (mediaUrls.length === 0) {
        throw new Error('Instagram requires at least one image or video to post.');
      }

      // For Instagram, we need to create a media container first
      let mediaContainerId;
      
      if (mediaUrls.length === 1) {
        // Single image/video
        const isVideo = mediaUrls[0].match(/\.(mp4|mov|avi|mkv)$/i);
        
        const containerResponse = await fetch(`${this.baseURL}/${instagramAccountId}/media`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image_url: isVideo ? undefined : mediaUrls[0],
            video_url: isVideo ? mediaUrls[0] : undefined,
            caption: content,
            access_token: accessToken
          })
        });

        if (!containerResponse.ok) {
          throw new Error(`HTTP error! status: ${containerResponse.status}`);
        }

        const containerData = await containerResponse.json();
        mediaContainerId = containerData.id;
      } else {
        // Multiple images - create carousel
        const mediaIds = [];
        
        for (const mediaUrl of mediaUrls) {
          const containerResponse = await fetch(`${this.baseURL}/${instagramAccountId}/media`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image_url: mediaUrl,
              is_carousel_item: true,
              access_token: accessToken
            })
          });

          if (!containerResponse.ok) {
            throw new Error(`HTTP error! status: ${containerResponse.status}`);
          }

          const containerData = await containerResponse.json();
          mediaIds.push(containerData.id);
        }

        // Create carousel container
        const carouselResponse = await fetch(`${this.baseURL}/${instagramAccountId}/media`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            media_type: 'CAROUSEL',
            children: mediaIds.join(','),
            caption: content,
            access_token: accessToken
          })
        });

        if (!carouselResponse.ok) {
          throw new Error(`HTTP error! status: ${carouselResponse.status}`);
        }

        const carouselData = await carouselResponse.json();
        mediaContainerId = carouselData.id;
      }

      // Publish the media container
      const publishResponse = await fetch(`${this.baseURL}/${instagramAccountId}/media_publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creation_id: mediaContainerId,
          access_token: accessToken
        })
      });

      if (!publishResponse.ok) {
        throw new Error(`HTTP error! status: ${publishResponse.status}`);
      }

      const publishData = await publishResponse.json();

      return {
        postId: publishData.id,
        instagramAccountId: instagramAccountId,
        pageName: page.name,
        url: `https://www.instagram.com/p/${publishData.id}/`
      };
    } catch (error) {
      throw new Error(`Failed to publish to Instagram: ${error.message}`);
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
      console.error('Failed to revoke Instagram token:', error);
    }
  }
}

module.exports = InstagramService;
