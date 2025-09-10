import { useState, useEffect, useCallback, useRef } from 'react';
import apiClient from '../api';
import { getBrandId } from '../utils';

/**
 * Custom hook for managing brand data with caching
 */
export const useBrandData = () => {
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  
  // Cache duration: 5 minutes
  const CACHE_DURATION = 5 * 60 * 1000;
  const cacheRef = useRef(new Map());

  const isCacheValid = useCallback((cacheKey) => {
    const cached = cacheRef.current.get(cacheKey);
    if (!cached) return false;
    
    const now = Date.now();
    return (now - cached.timestamp) < CACHE_DURATION;
  }, []);

  const getCacheKey = useCallback(() => {
    const brandId = getBrandId();
    return `brand-${brandId || 'no-brand'}`;
  }, []);

  const fetchBrandData = useCallback(async (forceRefresh = false) => {
    const activeBrandId = getBrandId();
    // If no active brand is selected, skip fetching (user likely wants to create one)
    if (!activeBrandId) {
      setBrandData(null);
      setError(null);
      return null;
    }

    const cacheKey = getCacheKey();
    
    // Check cache first (unless force refresh)
    if (!forceRefresh && isCacheValid(cacheKey)) {
      const cached = cacheRef.current.get(cacheKey);
      setBrandData(cached.data);
      setError(null);
      return cached.data;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.brand.get();
      
      // Update cache
      cacheRef.current.set(cacheKey, {
        data: data.brand,
        timestamp: Date.now()
      });
      
      setBrandData(data.brand);
      setLastFetch(Date.now());
      return data.brand;
    } catch (err) {
      console.error('Failed to fetch brand data:', err);
      setError(err.message || 'Failed to fetch brand data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getCacheKey, isCacheValid]);

  const invalidateCache = useCallback(() => {
    const cacheKey = getCacheKey();
    cacheRef.current.delete(cacheKey);
  }, [getCacheKey]);

  const updateBrandData = useCallback((newData) => {
    const cacheKey = getCacheKey();
    
    // Update cache with new data
    cacheRef.current.set(cacheKey, {
      data: newData,
      timestamp: Date.now()
    });
    
    setBrandData(newData);
    setLastFetch(Date.now());
  }, [getCacheKey]);

  // Initial load
  useEffect(() => {
    fetchBrandData();
  }, [fetchBrandData]);

  return {
    brandData,
    loading,
    error,
    lastFetch,
    fetchBrandData,
    invalidateCache,
    updateBrandData,
    isCacheValid: isCacheValid(getCacheKey())
  };
};
