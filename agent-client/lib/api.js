/**
 * Centralized API client for making requests to our backend
 */

class ApiClient {
  constructor() {
    this.baseUrl = '/api';
    this.isRefreshing = false;
    this.refreshPromise = null;
  }

  /**
   * Generic request method with error handling and automatic token refresh
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
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
          console.error('Token refresh failed:', refreshError);
          // If refresh fails, redirect to login or handle as needed
          this.handleAuthFailure();
          throw new Error('Authentication failed. Please log in again.');
        }
      }
      
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const backendMessage = payload?.message || payload?.error || payload?.errors?.[0] || payload?.detail;
        const composed = backendMessage || `HTTP ${response.status}: ${response.statusText}`;
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
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return await response.json();
  }

  /**
   * Handle authentication failure (redirect to login, clear storage, etc.)
   */
  handleAuthFailure() {
    // Clear any stored authentication data
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('brandId');
        localStorage.removeItem('selectedBrandId');
        // Redirect to login page
        window.location.href = '/login';
      } catch (error) {
        console.error('Error clearing auth data:', error);
      }
    }
  }

  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Auth API methods
  auth = {
    /**
     * Get user profile
     */
    getProfile: () => this.get('/auth/profile'),

    /**
     * Set active brand
     */
    setActiveBrand: (brandId) => this.post('/auth/brand', { brandId }),

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
    get: () => this.get('/brand'),

    /**
     * Create or update brand settings
     */
    save: (brandData) => this.post('/brand', brandData),

    /**
     * Invite a team member by email
     */
    inviteMember: (email) => this.post('/invite', { addTeamMemberEmail: email }),
  };
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;
