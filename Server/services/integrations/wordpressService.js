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
  async publishContent({ content, scheduledTime }) {
    try {
      
      let postContent = content;

      // Determine publish status and date based on scheduledTime
      let status = "publish";
      let date = undefined;
      if (scheduledTime) {
        const scheduledDate = new Date(scheduledTime);
        if (!isNaN(scheduledDate.getTime()) && scheduledDate.getTime() > Date.now()) {
          status = "future";
          // WordPress expects site timezone or ISO; we pass ISO string
          date = scheduledDate.toISOString();
        }
      }

      // Extract the first <h1> heading from the content to use as slug
      let slug = undefined;
      const h1Match = postContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
      if (h1Match && h1Match[1]) {
        slug = h1Match[1]
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      
      const response = await fetch(`${this.baseURL}/posts`, {
        method: "POST",
        headers: {
          Authorization: this.getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: slug,
          content: postContent,
          status,
          ...(date ? { date } : {}),
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
