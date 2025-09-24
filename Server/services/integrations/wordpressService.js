const BaseIntegrationService = require("./baseIntegrationService");

class WordPressService extends BaseIntegrationService {
  constructor({ siteUrl, username, appPassword }) {
    // siteUrl: e.g., "https://dev-marketingblogsite.pantheonsite.io"
    // username: WordPress username
    // appPassword: WordPress Application Password
    super("wordpress", {
      baseURL: `${siteUrl}/wp-json/wp/v2`,
      username,
      appPassword,
    });
  }

  // Encode credentials for Basic Auth
  getAuthHeader() {
    const token = Buffer.from(`${this.username}:${this.appPassword}`).toString(
      "base64"
    );
    return `Basic ${token}`;
  }

  // No OAuth, so generateAuthURL and exchangeCodeForToken are not needed
  async publishContent({ content, mediaUrls = [] }) {
    try {
      let postContent = content;

      // Append media URLs to content
      if (mediaUrls.length > 0) {
        let mediaContent = "\n\n";
        for (const mediaUrl of mediaUrls) {
          const isImage = mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
          if (isImage) {
            mediaContent += `<img src="${mediaUrl}" alt="Post image" style="max-width:100%;height:auto;" />\n`;
          } else {
            mediaContent += `<a href="${mediaUrl}">Media File</a>\n`;
          }
        }
        postContent += mediaContent;
      }

      const response = await fetch(`${this.baseURL}/posts`, {
        method: "POST",
        headers: {
          Authorization: this.getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: content.substring(0, 100), // first 100 chars as title
          content: postContent,
          status: "publish",
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errText}`);
      }

      const data = await response.json();
      return {
        postId: data.id,
        url: data.link,
        title: data.title.rendered,
      };
    } catch (error) {
      throw new Error(`Failed to publish to WordPress: ${error.message}`);
    }
  }

  // Optional: validate credentials
  async validateCredentials() {
    try {
      const response = await fetch(`${this.baseURL}/posts?per_page=1`, {
        method: "GET",
        headers: {
          Authorization: this.getAuthHeader(),
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

module.exports = WordPressService;
