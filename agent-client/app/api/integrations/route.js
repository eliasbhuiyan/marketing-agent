import { NextResponse } from 'next/server';
import { handleApiRoute } from '@/lib/api-utils';

/**
 * GET /api/integrations
 * Get all integrations for the current brand
 * Uses Next.js caching to prevent unnecessary API calls
 */
export async function GET() {
  // Force no-store on the proxy to avoid disk cache
  return handleApiRoute('/integrations', {
    next: { revalidate: 0 },
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0' }
  });
}