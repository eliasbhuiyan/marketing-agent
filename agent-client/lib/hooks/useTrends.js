import { useState, useEffect, useCallback, useRef } from 'react';
import apiClient from '@/lib/api';

/**
 * Custom hook for trends data management
 * Implements Next.js payload store pattern for caching and refreshing trends data
 * Prevents multiple API calls and implements process-level caching
 */

// Process-level cache to prevent multiple API calls across component instances
let processCache = {
  data: null,
  timestamp: null,
  promise: null
};

export function useTrends() {
  const [trendsData, setTrendsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const isMountedRef = useRef(true);

  // Cache expiration time (5 minutes)
  const CACHE_EXPIRY_MS = 5 * 60 * 1000;

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

  // Get data from sessionStorage with cache validation
  const getFromSession = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('trends_data');
        if (stored) {
          const { data, timestamp } = JSON.parse(stored);
          const cacheTime = new Date(timestamp).getTime();
          const now = new Date().getTime();
          
          // Check if cache is still valid
          if (now - cacheTime < CACHE_EXPIRY_MS) {
            setLastFetched(new Date(timestamp));
            return data;
          } else {
            // Cache expired, remove it
            sessionStorage.removeItem('trends_data');
          }
        }
      } catch (err) {
        console.error('Error retrieving trends from sessionStorage:', err);
        // Clear corrupted cache
        sessionStorage.removeItem('trends_data');
      }
    }
    return null;
  };

  // Check if process cache is valid
  const isProcessCacheValid = () => {
    if (!processCache.data || !processCache.timestamp) return false;
    const now = new Date().getTime();
    return (now - processCache.timestamp.getTime()) < CACHE_EXPIRY_MS;
  };

  // Fetch trends data from API with process-level caching
  const fetchTrends = useCallback(async (forceRefresh = false) => {
    try {
      setError(null);

      // Check process cache first (prevents multiple API calls)
      if (!forceRefresh && isProcessCacheValid()) {
        if (isMountedRef.current) {
          setTrendsData(processCache.data);
          setLastFetched(processCache.timestamp);
          setLoading(false);
        }
        return processCache.data;
      }

      // Check if there's already a pending request
      if (processCache.promise) {
        const data = await processCache.promise;
        if (isMountedRef.current) {
          setTrendsData(data);
          setLastFetched(processCache.timestamp);
          setLoading(false);
        }
        return data;
      }

      // No valid cache or forced refresh - fetch fresh data
      if (isMountedRef.current) {
        setLoading(true);
      }

      // Create a promise for the API call and store it to prevent duplicates
      processCache.promise = fetchFreshData();
      
      try {
        const data = await processCache.promise;
        
        // Update process cache
        processCache.data = data;
        processCache.timestamp = new Date();
        processCache.promise = null;
        
        if (isMountedRef.current) {
          setTrendsData(data);
          setLastFetched(processCache.timestamp);
        }
        
        return data;
      } catch (err) {
        processCache.promise = null;
        throw err;
      }
    } catch (err) {
      console.error("Error fetching trends:", err);
      if (isMountedRef.current) {
        setError(err.message || 'Failed to fetch trends');
        setLoading(false);
      }
      return null;
    }
  }, []);

  // Helper function to fetch fresh data from API
  const fetchFreshData = async () => {
    try {
      const response = await apiClient.ai.getTrends();
      
      // Handle the response structure from server
      const data = response.trend?.data || response.data || [];
      
      // Store in session storage
      storeInSession(data);
      
      return data;
    } catch (err) {
      console.error("Error fetching fresh trends:", err);
      throw err;
    }
  };

  // Initial data fetch with session storage check
  useEffect(() => {
    // Check session storage first for immediate data
    const sessionData = getFromSession();
    if (sessionData) {
      setTrendsData(sessionData);
      setLoading(false);
    }
    
    // Then fetch fresh data
    fetchTrends();
    
    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
    };
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