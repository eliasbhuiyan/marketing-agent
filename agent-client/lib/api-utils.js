import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Utility function to forward cookies from client to backend and back
 */
export function createApiResponse(data, backendResponse) {
  const nextResponse = NextResponse.json(data);
  
  // Forward new cookies from backend to client
  const setCookieHeaders = backendResponse.headers.getSetCookie();
  if (setCookieHeaders) {
    setCookieHeaders.forEach(cookie => {
      nextResponse.headers.append('Set-Cookie', cookie);
    });
  }
  
  return nextResponse;
}

/**
 * Get cookie header from client request
 */
export function getCookieHeader() {
  const cookieStore = cookies();
  return cookieStore.toString();
}

/**
 * Make request to backend with proper cookie handling
 */
export async function makeBackendRequest(endpoint, options = {}) {
  const cookieHeader = getCookieHeader();

  const isAuthProfileGet = endpoint === '/auth/profile' && (options.method || 'GET') === 'GET';
  const isIntegrationsGet = endpoint === '/integrations' && (options.method || 'GET') === 'GET';
  
  // Determine caching strategy based on endpoint
  // If options.next is provided (e.g., for brand with tags), use it directly
  // Otherwise, set defaults for specific endpoints
  let nextConfig = options.next;
  if (!nextConfig) {
    if (isAuthProfileGet) {
      nextConfig = { revalidate: 60 }; // Cache profile for 1 minute
    } else if (isIntegrationsGet) {
      // Always fetch fresh integrations to reflect immediate changes after connect/disconnect
      nextConfig = { revalidate: 0 };
    }
    // For brand endpoint, if tags are provided in options.next, they will be used above
  }

  // Ensure tags are preserved when nextConfig is provided
  // This is especially important for brand endpoint which uses tags: ['brand-data']
  if (nextConfig && nextConfig.tags) {
    console.log(`Cache tags applied for ${endpoint}:`, nextConfig.tags);
  }

  // Destructure to exclude next from options to avoid duplication, then explicitly set it
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { next: _unused, ...optionsWithoutNext } = options;
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...optionsWithoutNext,
    headers: {
      'Cookie': cookieHeader,
      ...options.headers,
    },
    // Explicitly set next config to ensure tags are properly applied
    // If options.next was provided (e.g., { tags: ['brand-data'], revalidate: 300 }), use it
    // Otherwise, use the computed nextConfig for default endpoints
    next: nextConfig,
    cache: isIntegrationsGet ? 'no-store' : options.cache,
  });
  
  return response;
}

/**
 * Handle API route with automatic cookie forwarding
 */
export async function handleApiRoute(endpoint, options = {}) {
    console.log("=================endpointhandelapi",endpoint, options);
  try {
    const response = await makeBackendRequest(endpoint, options);
    
    // Parse JSON body if present; fall back to text, then empty object
    let data;
    try {
      data = await response.json();
    } catch {
      try {
        const text = await response.text();
        data = text ? { message: text } : {};
      } catch {
        data = {};
      }
    }

    const nextResponse = NextResponse.json(data, { status: response.status });

    // Forward new cookies from backend to client (even on error)
    const setCookieHeaders = response.headers.getSetCookie();
    if (setCookieHeaders) {
      setCookieHeaders.forEach((cookie) => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }

    // Apply cache headers for GET endpoints to enable short-lived private caching
    if ((options.method || 'GET') === 'GET') {
      if (endpoint === '/auth/profile') {
        nextResponse.headers.set('Cache-Control', 'private, max-age=60, stale-while-revalidate=300');
      } else if (endpoint === '/integrations') {
        nextResponse.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=600');
      }
    }

    return nextResponse;
  } catch (error) {
    console.error(`API route error for ${endpoint}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}