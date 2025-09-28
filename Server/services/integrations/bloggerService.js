const BaseIntegrationService = require("./baseIntegrationService");

class BloggerService extends BaseIntegrationService {
  constructor() {
    super("blogger", {
      baseURL: "https://www.googleapis.com/blogger/v3",
      clientId: process.env.BLOGGER_CLIENT_ID,
      clientSecret: process.env.BLOGGER_CLIENT_SECRET,
    });
    // Ensure OAuth credentials are available as instance properties
    this.clientId = process.env.BLOGGER_CLIENT_ID;
    this.clientSecret = process.env.BLOGGER_CLIENT_SECRET;
  }

  generateAuthURL(state) {
    const scopes = [
      "https://www.googleapis.com/auth/blogger", // full blogger access
    ];

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/blogger`,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope: scopes.join(" "),
      state,
    });
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.CLIENT_URL}/integrations/callback/blogger`,
      }),
    });

    if (!response.ok) throw new Error("Failed to exchange token");

    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
  }

  async getUserProfile(accessToken) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!response.ok) throw new Error("Failed to get user profile");
    return await response.json();
  }

  async validateToken(accessToken) {
    try {
      const resp = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return resp.ok;
    } catch (_) {
      return false;
    }
  }

  async refreshAccessToken(refreshToken) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });
    if (!response.ok) throw new Error("Failed to refresh token");
    const data = await response.json();
    return {
      accessToken: data.access_token,
      refreshToken: refreshToken,
      expiresIn: data.expires_in,
    };
  }

  async publishContent({ blogId, title, content, accessToken }) {
    const response = await fetch(
      `${this.baseURL}/blogs/${blogId}/posts/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kind: "blogger#post",
          title,
          content,
        }),
      }
    );
    if (!response.ok) throw new Error("Failed to publish content");
    return await response.json();
  }
}

module.exports = BloggerService;
