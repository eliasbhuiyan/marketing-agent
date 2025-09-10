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
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Cookie': cookieHeader,
      ...options.headers,
    },
  });
  
  return response;
}

/**
 * Handle API route with automatic cookie forwarding
 */
export async function handleApiRoute(endpoint, options = {}) {
  try {
    const response = await makeBackendRequest(endpoint, options);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Request failed' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return createApiResponse(data, response);
  } catch (error) {
    console.error(`API route error for ${endpoint}:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
