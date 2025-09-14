class BaseIntegrationService {
  constructor(platform, config) {
    this.platform = platform;
    this.config = config;
    this.baseURL = config.baseURL;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
  }

  generateAuthURL(state, scopes = []) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/${this.platform}`,
      response_type: "code",
      scope: scopes.join(","),
      state: state
    });
    
    return `${this.baseURL}/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    try {
      const response = await fetch(`${this.baseURL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/${this.platform}`
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
        tokenType: data.token_type
      };
    } catch (error) {
      throw new Error(`Failed to exchange code for token: ${error.message}`);
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const response = await fetch(`${this.baseURL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token"
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

  async makeRequest(endpoint, method = "GET", data = null, accessToken) {
    try {
      const config = {
        method,
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      };

      if (data) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  async publishContent(content, accessToken) {
    throw new Error("publishContent method must be implemented by platform-specific service");
  }

  async getUserProfile(accessToken) {
    throw new Error("getUserProfile method must be implemented by platform-specific service");
  }

  async validateToken(accessToken) {
    throw new Error("validateToken method must be implemented by platform-specific service");
  }
}

module.exports = BaseIntegrationService;
