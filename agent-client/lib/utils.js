import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Utility functions for localStorage and other common operations
 */

/**
 * Safely get item from localStorage
 */
export function getLocalStorageItem(key, defaultValue = null) {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely set item in localStorage
 */
export function setLocalStorageItem(key, value) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

/**
 * Safely remove item from localStorage
 */
export function removeLocalStorageItem(key) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Get brand ID from localStorage (checks both possible keys)
 */
export function getBrandId() {
  return getLocalStorageItem('brandId') || getLocalStorageItem('selectedBrandId');
}

/**
 * Set brand ID in localStorage
 */
export function setBrandId(brandId) {
  if (brandId) {
    setLocalStorageItem('brandId', brandId);
    setLocalStorageItem('selectedBrandId', brandId);
  } else {
    removeLocalStorageItem('brandId');
    removeLocalStorageItem('selectedBrandId');
  }
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error) {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
}

/**
 * Debounce function for performance optimization
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Handle authentication failure by redirecting to login
 */
export function redirectToLogin() {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

/**
 * Check if user is authenticated (basic check)
 */
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if we have any auth-related data in localStorage
    const brandId = getBrandId();
    return !!brandId || document.cookie.includes('_optimise_access_token');
  } catch {
    return false;
  }
}