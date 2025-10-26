/**
 * Centralized API client for making requests to our backend
 */

class ApiClient {
  constructor() {
    this.baseUrl = "/api";
    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  /**
   * Generic request method with error handling and automatic token refresh
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const isFormDataBody =
      options &&
      options.body &&
      typeof FormData !== "undefined" &&
      options.body instanceof FormData;

    const headers = {
      ...options.headers,
    };

    // Only set JSON content-type when not sending FormData and content-type not already provided
    if (!isFormDataBody && !("Content-Type" in headers)) {
      headers["Content-Type"] = "application/json";
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      // If unauthorized and we haven't tried refreshing yet, attempt refresh
      if (response.status === 401 && !options._retried) {
        try {
          await this.refreshToken();
          // Retry the original request with refreshed token
          return this.request(endpoint, { ...options, _retried: true });
        } catch (refreshError) {
          // If refresh fails, redirect to login or handle as needed
          this.handleAuthFailure();
          throw new Error("Authentication failed. Please log in again.");
        }
      }

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const backendMessage =
          payload?.message ||
          payload?.error ||
          payload?.errors?.[0] ||
          payload?.detail;
        const composed =
          backendMessage || `HTTP ${response.status}: ${response.statusText}`;
        const err = new Error(composed);
        err.status = response.status;
        err.payload = payload;
        throw err;
      }

      return payload;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Refresh access token with retry logic
   */
  async refreshToken() {
    // If already refreshing, return the existing promise
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this._performRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Internal method to perform the actual refresh
   */
  async _performRefresh() {
    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    return await response.json();
  }

  /**
   * Handle authentication failure (redirect to login, clear storage, etc.)
   */
  handleAuthFailure() {
    // Clear any stored authentication data
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("selectedBrandId");
        // Redirect to login page
        window.location.href = "/login";
      } catch (error) {
        console.error("Error clearing auth data:", error);
      }
    }
  }

  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    return this.request(endpoint, {
      method: "POST",
      body: isFormData ? data : JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  // Auth API methods
  auth = {
    /**
     * Get user profile
     */
    getProfile: () => this.get("/auth/profile"),

    /**
     * Set active brand
     */
    setActiveBrand: (brandId) => this.post("/auth/brand", { brandId }),

    /**
     * Manually refresh access token (usually not needed as it's automatic)
     */
    refreshToken: () => this.refreshToken(),
  };

  // Brand API methods
  brand = {
    /**
     * Get brand settings
     */
    get: () => this.get("/brand"),

    /**
     * Create or update brand settings
     */
    save: (brandData) => this.post("/brand", brandData),

    /**
     * Invite a team member by email
     */
    inviteMember: (email) =>
      this.post("/invite", { addTeamMemberEmail: email }),
  };

  // Integration API methods
  integrations = {
    /**
     * Get all integrations for the current brand
     */
    getAll: (date) => this.get(`/integrations${date ? "?t=" + date : ""}`),

    /**
     * Get details for a specific platform integration
     */
    getDetails: (platform) => this.get(`/integrations/${platform}`),

    /**
     * Initiate OAuth flow for a platform
     */
    connect: (platform, data) =>
      this.post(`/integrations/${platform}/connect`, data || {}),

    /**
     * Disconnect an integration
     */
    disconnect: (platform) => this.delete(`/integrations/${platform}`),

    /**
     * Publish content to a platform
     */
    publish: (platform, content, scheduledTime) =>
      this.post(`/integrations/${platform}/publish`, {
        content,
        scheduledTime,
      }),

    /**
     * Test connection for a platform
     */
    testConnection: (platform) => this.post(`/integrations/${platform}/test`),
  };

  // Invite API methods
  invite = {
    /**
     * Accept an invitation
     */
    accept: (token) => this.get(`/invite/${token}`),
  };
  removemember = {
    remove: (brandId, memberId) =>
      this.post(`/removemember`, {
        brandId,
        memberId,
      }),
  };

  ai = {
    intelligentPosterDesign: (formData) => {
      return this.post(`/ai/intelligentposterdesign`, formData);
    },
    posterDesign: (productImg, modelImg, customPrompt) => {
      const formData = new FormData();
      // Expecting File/Blob instances
      if (productImg)
        formData.append(
          "productImg",
          productImg,
          productImg.name || "product.jpg"
        );
      if (modelImg)
        formData.append("modelImg", modelImg, modelImg.name || "model.jpg");
      if (customPrompt) formData.append("customPrompt", customPrompt);
      return this.post(`/ai/posterdesign`, formData);
    },
    // Poster Caption
    posterCaption: ({
      productDescription,
      tone,
      platform,
      keywords,
      language,
    }) =>
      this.post(`/ai/postercaption`, {
        productDescription,
        tone,
        platform,
        keywords,
        language,
      }),
    // Normal Caption Generator
    captionGenerator: ({
      productDescription,
      targetAudience,
      tone,
      platform,
      language,
    }) =>
      this.post(`/ai/captiongenerator`, {
        productDescription,
        targetAudience,
        tone,
        platform,
        language,
      }),

    blogheadings: ({
      blogTopic,
      writingStyle,
      seoKeywords,
      numberOfHeadings,
      outputLanguage,
    }) =>
      this.post(`/ai/blogheadings`, {
        blogTopic,
        writingStyle,
        seoKeywords,
        numberOfHeadings,
        outputLanguage,
      }),
    blogGenerator: ({
      blogTopic,
      blogLength,
      writingStyle,
      seoKeywords,
      outputLanguage,
      headings,
    }) =>
      this.post(`/ai/bloggenerator`, {
        blogTopic,
        blogLength,
        writingStyle,
        seoKeywords,
        outputLanguage,
        headings,
      }),
    keywordHashtagGenerator: ({ industry, numKeywords, platform }) =>
      this.post(`/ai/hashtagkeywords`, {
        industry,
        numKeywords,
        platform,
      }),
    productDescription: ({
      productName,
      keyFeatures,
      descriptionLength,
      includeKeywords,
      outputLanguage,
    }) =>
      this.post(`/ai/productdescription`, {
        productName,
        keyFeatures,
        descriptionLength,
        includeKeywords,
        outputLanguage,
      }),
    // Trend analyzer
    getTrends: () => {
      return this.get("/ai/trendanalyze");
    },
    // Script generator
    generateScript: ({
      videoTopic,
      videoLength,
      targetAudience,
      videoGoal,
      tone,
      outputLanguage,
    }) =>
      this.post(`/ai/scriptgenerator`, {
        videoTopic,
        videoLength,
        targetAudience,
        videoGoal,
        tone,
        outputLanguage,
      }),
    thumbnailGenerator: (formDataToSend) => {
      return this.post(`/ai/thumbnail`, formDataToSend);
    },
    virtualTryOn: (formDataToSend) => {
      return this.post(`/ai/virtualtryon`, formDataToSend);
    },
  };
  // Library
  library = {
    getLibraryImages: () => this.get("/library"),

    deleteLibraryImage: (imageId) => this.delete(`/library/${imageId}`),
  };
  // Usage History
  usageHistory = {
    getUsageHistory: (page = 1, limit = 10, type = '') => this.get(`/usagehistory?page=${page}&limit=${limit}${type ? `&type=${type}` : ''}`),
  };
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;
