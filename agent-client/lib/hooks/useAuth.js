import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { getBrandId, setBrandId, isAuthenticated } from '@/lib/utils';

/**
 * Custom hook for authentication state management
 */
export function useAuth() {
  const [userData, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user appears to be authenticated
        if (!isAuthenticated()) {
          setUser(null);
          return;
        }

        const data = await apiClient.auth.getProfile();
        setUser(data.user);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const setActiveBrand = async (brandId) => {
    try {
      await apiClient.auth.setActiveBrand(brandId);
      setBrandId(brandId);
      // Optionally refetch user data to get updated brand info
      const data = await apiClient.auth.getProfile();
      setUser(data.user);
    } catch (err) {
      console.error('Failed to set active brand:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setBrandId(null);
    // Clear any other auth-related data
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  };

  return {
    userData,
    loading,
    error,
    isAuthenticated: !!userData,
    setActiveBrand,
    logout,
  };
}
