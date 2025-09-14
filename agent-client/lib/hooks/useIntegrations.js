import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';

/**
 * Custom hook for managing platform integrations
 */
export function useIntegrations() {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.integrations.getAll();
      setIntegrations(data.integrations || []);
    } catch (err) {
      console.error('Failed to fetch integrations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const connectPlatform = async (platform) => {
    try {
      const data = await apiClient.integrations.connect(platform);
      // Redirect to OAuth URL
      window.location.href = data.authURL;
    } catch (err) {
      console.error(`Failed to connect ${platform}:`, err);
      throw err;
    }
  };

  const disconnectPlatform = async (platform) => {
    try {
      await apiClient.integrations.disconnect(platform);
      // Refresh integrations list
      await fetchIntegrations();
    } catch (err) {
      console.error(`Failed to disconnect ${platform}:`, err);
      throw err;
    }
  };

  const testConnection = async (platform) => {
    try {
      const data = await apiClient.integrations.testConnection(platform);
      return data.isConnected;
    } catch (err) {
      console.error(`Failed to test ${platform} connection:`, err);
      return false;
    }
  };

  const publishContent = async (platform, content, mediaUrls = []) => {
    try {
      const data = await apiClient.integrations.publish(platform, content, mediaUrls);
      return data.result;
    } catch (err) {
      console.error(`Failed to publish to ${platform}:`, err);
      throw err;
    }
  };

  const getIntegrationStatus = (platform) => {
    const integration = integrations.find(int => int.platform === platform);
    return {
      isConnected: !!integration,
      isActive: integration?.isActive || false,
      connectedAt: integration?.connectedAt,
      accountId: integration?.accountId
    };
  };

  return {
    integrations,
    loading,
    error,
    connectPlatform,
    disconnectPlatform,
    testConnection,
    publishContent,
    getIntegrationStatus,
    refreshIntegrations: fetchIntegrations
  };
}

/**
 * Hook for managing a specific platform integration
 */
export function usePlatformIntegration(platform) {
  const [integration, setIntegration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (platform) {
      fetchIntegrationDetails();
    }
  }, [platform]);

  const fetchIntegrationDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.integrations.getDetails(platform);
      setIntegration(data.integration);
    } catch (err) {
      console.error(`Failed to fetch ${platform} integration details:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const connect = async () => {
    try {
      const data = await apiClient.integrations.connect(platform);
      window.location.href = data.authURL;
    } catch (err) {
      console.error(`Failed to connect ${platform}:`, err);
      throw err;
    }
  };

  const disconnect = async () => {
    try {
      await apiClient.integrations.disconnect(platform);
      setIntegration(null);
    } catch (err) {
      console.error(`Failed to disconnect ${platform}:`, err);
      throw err;
    }
  };

  const testConnection = async () => {
    try {
      const data = await apiClient.integrations.testConnection(platform);
      return data.isConnected;
    } catch (err) {
      console.error(`Failed to test ${platform} connection:`, err);
      return false;
    }
  };

  return {
    integration,
    loading,
    error,
    connect,
    disconnect,
    testConnection,
    refreshIntegration: fetchIntegrationDetails
  };
}
