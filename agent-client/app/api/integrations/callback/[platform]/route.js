import { NextResponse } from 'next/server';
import { handleApiRoute } from '@/lib/api-utils';

/**
 * GET /api/integrations/callback/:platform
 * Handle OAuth callback from platforms
 */
export async function GET(request, { params }) {
  const { platform } = params;
  const searchParams = request.nextUrl.searchParams;
  
  // Forward all query parameters to the backend
  const queryString = searchParams.toString();
  const endpoint = `/integrations/callback/${platform}${queryString ? `?${queryString}` : ''}`;
  
  // Handle the callback and redirect to the appropriate page
  const response = await handleApiRoute(endpoint);
  
  // Check if we need to redirect
  const data = await response.json();
  
  if (data.redirectUrl) {
    return NextResponse.redirect(data.redirectUrl);
  }
  
  // Default redirect to integrations page
  return NextResponse.redirect(new URL('/dashboard/integrations', request.url));
}