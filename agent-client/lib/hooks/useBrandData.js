import { useState, useEffect, useCallback } from "react";
import apiClient from "../api";

/**
 * Custom hook for managing brand data with caching
 */
export const useBrandData = () => {
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBrandData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.brand.get();
      setBrandData(data.brand);
      return data.brand;
    } catch (err) {
      console.error("Failed to fetch brand data:", err);
      setError(err.message || "Failed to fetch brand data");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBrandData = useCallback((newData) => {
    setBrandData(newData);
  }, []);

 const refrashBrand = async () => {
    const data = await apiClient.brand.get('true');
    setBrandData(data.brand);
  };

  // Initial load
  useEffect(() => {
    fetchBrandData();
  }, [fetchBrandData]);

  return {
    brandData,
    loading,
    error,
    fetchBrandData,
    updateBrandData,
    refrashBrand,
  };
};
