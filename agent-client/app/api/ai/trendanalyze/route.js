import { handleApiRoute } from "@/lib/api-utils";
import { NextResponse } from 'next/server';

/**
 * GET /api/ai/trendanalyze
 * Get trends data with Next.js caching to prevent multiple API calls
 * Cache for 5 minutes with stale-while-revalidate
 */
export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  const response = await handleApiRoute('/trends', {
    method: 'GET',
    next: { revalidate: 300 } // Cache for 5 minutes
  });
  
  // Add cache headers for better performance
  if (response instanceof NextResponse) {
    response.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=60');
    response.headers.set('ETag', `"trends-${Date.now()}"`);
  }
  
  return response;
}
