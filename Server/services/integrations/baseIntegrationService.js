class BaseIntegrationService {
  constructor(platform, config) {
    this.platform = platform;
    this.config = config;
    this.baseURL = config.baseURL; // e.g., https://yoursite.com/wp-json/wp/v2
    this.username = config.username;
    this.appPassword = config.appPassword;
  }

  // Build Basic Auth header
  getAuthHeader() {
    const token = Buffer.from(
      `${this.username}:${this.appPassword}`
    ).toString("base64");
    return `Basic ${token}`;
  }

  // Generic request method
  async makeRequest(endpoint, method = "GET", data = null) {
    try {
      const config = {
        method,
        headers: {
          Authorization: this.getAuthHeader(),
          "Content-Type": "application/json",
        },
      };

      if (data) {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  // To be implemented by child services
  async publishContent(content) {
    throw new Error(
      "publishContent method must be implemented by platform-specific service"
    );
  }

  async getUserProfile() {
    throw new Error(
      "getUserProfile method must be implemented by platform-specific service"
    );
  }

  async validateCredentials() {
    throw new Error(
      "validateCredentials method must be implemented by platform-specific service"
    );
  }
}

module.exports = BaseIntegrationService;
