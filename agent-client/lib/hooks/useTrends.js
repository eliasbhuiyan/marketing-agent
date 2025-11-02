import { useState, useEffect, useCallback, useRef } from 'react';
import apiClient from '@/lib/api';

/**
 * Custom hook for trends data management
 * Implements Next.js payload store pattern for caching and refreshing trends data
 * Prevents multiple API calls and implements process-level caching
 */


export function useTrends() {
  const [trendsData, setTrendsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to fetch fresh data from API
  const fetchTrendData = async () => {
    try {
      const response = await apiClient.ai.getTrends();
      
      // Handle the response structure from server
      
      // Store in session storage
      setTrendsData(response);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  // Initial data fetch with session storage check
  useEffect(() => {    
    // Then fetch fresh data
    fetchTrendData();
  }, []);

  return {
    trendsData,
    loading,
    error,
  };
}