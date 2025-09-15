import { NextResponse } from 'next/server';
import { handleApiRoute } from '@/lib/api-utils';

/**
 * GET /api/integrations
 * Get all integrations for the current brand
 * Uses Next.js caching to prevent unnecessary API calls
 */
export async function GET() {
  return handleApiRoute('/integrations', {
    next: { revalidate: 300 } // Cache for 5 minutes
  });
}