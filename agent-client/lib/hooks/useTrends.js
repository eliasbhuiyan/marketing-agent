import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/lib/api';

/**
 * Custom hook for trends data management
 * Implements Next.js payload store pattern for caching and refreshing trends data
 */
export function useTrends() {
  const [trendsData, setTrendsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  // Store data in sessionStorage to persist between page navigations
  const storeInSession = (data) => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('trends_data', JSON.stringify({
          data,
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        console.error('Error storing trends in sessionStorage:', err);
      }
    }
  };

  // Get data from sessionStorage
  const getFromSession = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('trends_data');
        if (stored) {
          const { data, timestamp } = JSON.parse(stored);
          setLastFetched(new Date(timestamp));
          return data;
        }
      } catch (err) {
        console.error('Error retrieving trends from sessionStorage:', err);
      }
    }
    return null;
  };

  // Fetch trends data from API
  const fetchTrends = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have cached data and it's not a forced refresh
      if (!forceRefresh) {
        const cachedData = getFromSession();
        if (cachedData) {
          setTrendsData(cachedData);
          setLoading(false);
          return cachedData;
        }
      }

      // Fetch fresh data from API
      const response = await apiClient.ai.getTrends();
      
      // Handle the response structure from server
      const data = response.trend?.data || response.data || [];
      
      // Update state and store in session
      setTrendsData(data);
      storeInSession(data);
      setLastFetched(new Date());
      
      return data;
    } catch (err) {
      console.error("Error fetching trends:", err);
      setError(err.message || 'Failed to fetch trends');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  // Refresh trends data
  const refreshTrends = async () => {
    return fetchTrends(true);
  };

  // Filter trends by platform
  const filterByPlatform = (platform) => {
    if (!trendsData || platform === 'all') {
      return trendsData;
    }
    
    return trendsData.filter(trend => 
      trend.platform?.toLowerCase() === platform.toLowerCase()
    );
  };

  return {
    trendsData,
    loading,
    error,
    lastFetched,
    refreshTrends,
    filterByPlatform
  };
}